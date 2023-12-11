
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./UserToken.sol";
import "./Commodity.sol";
/**
 * THIS IS CONTRACT THAT USES HARDCODED VALUES FOR SIMPLE POC (for the hackathon).
 * wont be used in  CODE IN PRODUCTION.
 */

contract CommodityMarket is ChainlinkClient, VRFConsumerBaseV2, ConfirmedOwner {
    //REGION: user managements
    UserToken public userToken;
    Commodity public commodityContract;
    event UserEvent(address userAddress, string name, string userType, string location, bool verificationStatus, uint256 uid);
    event UIDAssigned(address indexed userAddress, uint256 uid);
    // Mapping users to their nft
    mapping(address => uint256) private users;
    //ENDREGION


    //REGION: VRF (it's used to generate a unique id of eath nft representing a give user profile, used later for offchain purposes)
      uint64 s_subscriptionId;
      struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }
    mapping(uint256 => address) private requestIds;
        mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */
    VRFCoordinatorV2Interface COORDINATOR;
    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/#configurations
    bytes32 keyHash = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
      
    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 150000;
    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 2;
    // For this example, retrieve 1 random values in one request.
    // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
    uint32 numWords = 1;

    //ENDREGION

    //REGION : commodities
    uint256 private nextCommodityId = 0;
    mapping(string => uint256) public commodities;
    event CommodityCreated(uint256 comId, string name, string symbol);
    //ENDREGION

    //REGION: orders
    uint256 private nextOrderId = 0;
        event OrderPlaced(
        uint256 indexed orderId,
        address indexed owner,
        uint256 commodityId,
        string region,
        string country,
        uint256 amount,
        uint256 price,
        string currency,
        uint256 harvestDate,
        uint256 validityPeriod,
        bool isBuyOrder
    );
     mapping(uint256 => address) private orders;
    //ENDREGION


    //REGION: match making
        struct MatchedOrder {
        uint256 orderId;
        address seller;
        address buyer;
        uint256 price; // in USD
        uint256 amount;
    }
    uint256 private nextMatchedOrderId = 1;
    event OrderMatched(uint256 matchedOrderId, address buyer, uint256 price);
    //ENDREGION

    //REGION: price feed (ugx/usd)
    using Chainlink for Chainlink.Request;

    uint256 private constant ORACLE_PAYMENT = (1 * LINK_DIVISIBILITY) / 10; // 0.1 * 10**18
    uint256 public currentPrice = 1000000;
        event RequestEthereumPriceFulfilled(
        bytes32 indexed requestId,
        uint256 indexed price
    );
    //ENDREGION
    /**
     * HARDCODED FOR SEPOLIA
     * COORDINATOR: 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
     */
       /**
     *  Sepolia
     *@dev LINK address in Sepolia network: 0x779877A7B0D9E8603169DdbD7836e478b4624789
     * @dev Check https://docs.chain.link/docs/link-token-contracts/ for LINK address for the right network
     */
    constructor( uint64 subscriptionId)
     ConfirmedOwner(address(this))
        VRFConsumerBaseV2(0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625)
    {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        userToken = new UserToken(address(this));
        commodityContract = new Commodity(address(this));
        s_subscriptionId = subscriptionId;
    }

    //REGION : user registration
    function registerUser(string memory name, string memory userType, string memory location, bool verificationStatus)
        public 
        returns (uint256 requestId)
    {
        //check if user already exists, if yes abort
        uint256 existingUid = users[msg.sender];
        require(existingUid == 0, "User already registered");

        //we mint erc-1155 for the user, as profile 'account'
         uint256 tokenType = _convertUserType(userType);
        userToken.mint(msg.sender, tokenType, 1, "");

        //we request a user unique id
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        requestIds[requestId] = msg.sender; // Store other details as needed
        //we save in thegraph
        emit UserEvent(msg.sender, name, userType, location, verificationStatus, 0);
    }
       

    function _convertUserType(string memory userTypeString) private pure returns (uint256) {
        bytes memory userTypeBytes = bytes(userTypeString);
        // Check if the string has exactly one character (for "1", "2", "3", "4")
        if (userTypeBytes.length == 1) {
            uint256 userTypeInt = uint256(uint8(userTypeBytes[0])) -  uint256(uint8(bytes1('0'))); // Convert char to uint

            // Map the integer to the corresponding token type
            if (userTypeInt == 1) { //PRODUCER_VENDOR
                return 1;
            } else if (userTypeInt == 2) { //FIRST TRADER AGENT
                return 2;
            } else if (userTypeInt == 3) { //EXPORTATER
                return 3;
            }else if (userTypeInt == 4) {
                // Assuming "4" maps to ADMINS
                return 4;
            }
        }
        revert("Invalid user type");
    }

    /*
    * when uid is fullfilled it's updated in thegraph
    */
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
       address userAddress = requestIds[_requestId];
       uint256 uid = _randomWords[0];
       users[userAddress] = uid;
       //we update the uid in the thegraph
       emit UIDAssigned(userAddress, uid);
       delete requestIds[_requestId];
    }
    //ENDREGION


    //REGION : create commoditiy
      function createCommodity(string memory name, string memory symbol) public {
        require(commodities[symbol] == 0, "Commodity is already registered");
        uint256 commodityId = nextCommodityId++;
        commodityContract.mint(address(this), commodityId, 1, "");
        commodities[symbol] = commodityId;
        emit CommodityCreated(commodityId, name, symbol);
    }
    //ENDREGION

    //REGION : place order
    function placeOrder(
        string memory symbolCommodity, string memory region, string memory country, uint256  amount, uint256  price, string memory currency, uint256 harvestDate, uint256 validityPeriod, bool isBuyOrder
    ) public {
        // Check if the user is registered
        uint256 userUid = users[msg.sender];
        require(userUid != 0, "User not registered");

        uint256 commodityId = commodities[symbolCommodity];
        require(commodityId != 0, "Commodity isn't traded");


        // Check if isBuyOrder is false and the user is a producer
            if (!isBuyOrder && userToken.balanceOf(msg.sender, 1) > 0) {
                // Mint the commodity to the user's wallet
                commodityContract.mint(msg.sender, commodityId, amount, "");
            }


        orders[nextOrderId] = msg.sender;
        // Emit the event with order details
        emit OrderPlaced( nextOrderId,msg.sender, commodityId, region, country,  amount, price*currentPrice,  currency, harvestDate, validityPeriod, isBuyOrder);
        nextOrderId++;
    }

   //ENDREGION

   //REGION : matching
   function matchOrder(uint256 orderId, string memory symbolCommodity,  uint256  amount, uint256  price, string memory currency) public {
        // Ensure the order exists and is valid
        address orderOwner = orders[orderId];
        address buyer = msg.sender;
        require(orderOwner != address(0), "Order does not exist");
        require(orderOwner == buyer, "You can not sell to yourself");
        uint256 commodityId = commodities[symbolCommodity];
        require(commodityId != 0, "Commodity isn't traded");

        // Transfer commodity from seller to buyer
        commodityContract.safeTransferFrom(orderOwner, msg.sender, commodityId, amount, "");

        // Create and store the matched order
      
        // Emit the matched order event
        emit OrderMatched(orderId,  buyer, price*currentPrice);

        nextMatchedOrderId++;
    }
    //ENDREGION



    //REGION : Price feed (upkeept) called periodicaly to update the prices
        function requestUgxPrice(
        address _oracle,
        string memory _jobId
    ) public onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillUgxPrice.selector
        );
        req.add(
            "get",
            "https://min-api.cryptocompare.com/data/price?fsym=UGX&tsyms=USD"
        );
        req.add("path", "USD");
        req.addInt("times", 1000000);
        sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function fulfillUgxPrice(
        bytes32 _requestId,
        uint256 _price
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestEthereumPriceFulfilled(_requestId, _price);
        currentPrice = _price;
    }

    function stringToBytes32(
        string memory source
    ) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }
    //ENDREGION
}
