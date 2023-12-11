
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract UserToken is ERC1155 {
    address public commodityMarketContract;

    constructor(address _commodityMarketContract) ERC1155("ipfs://QmNNFXTgxbJHLQVbfrFtvshjK1126pXQmLQRAxNFejNiCz") {
        commodityMarketContract = _commodityMarketContract;
    }

    modifier onlyCommodityMarket() {
        require(msg.sender == commodityMarketContract, "Caller is not the CommodityMarket contract");
        _;
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyCommodityMarket {
        _mint(account, id, amount, data);
    }

}
import "./CommodityToken.sol";

contract CommoditiesMarketTicker {
    // Mapping from token address to a boolean to manage commodities
    mapping(address => bool) public commodities;
   // Mapping users to their nft
    mapping(address => uint256) private users;

    uint256[] public requestIds;

    event UserEvent(address userAddress, string name, string userType, string location, bool verificationStatus, uint256 uid);

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 100000;
    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 2;
    // For this example, retrieve 1 random values in one request.
    // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
    uint32 numWords = 1;

   // Address LINK - hardcoded for Sepolia
    address linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

    // address WRAPPER - hardcoded for Sepolia
    address wrapperAddress = 0xab18414CD93297B0d12ac29E63Ca20f515b3DB46;

    uint256 public constant ADMINS = 0;
    uint256 public constant PRODUCER = 1;
    uint256 public constant TRADER = 2;
    uint256 public constant EXPORTER = 3;


    struct Order {
        uint256 id;
        address user;
        address token;
        uint256 amount;
        uint256 price;
        bool isBuyOrder;
    }

    uint256 private nextOrderId = 0;
    Order[] public buyOrders;
    Order[] public sellOrders;

    event CommodityCreated(address token, string name, string symbol);
    event OrderPlaced(uint256 id, address user, uint256 amount, uint256 price, bool isBuyOrder);
    event OrderMatched(uint256 buyOrderId, uint256 sellOrderId, uint256 matchedAmount, uint256 matchedPrice);
    event OrderRemoved(uint256 orderId);

    function createCommodity(string memory name, string memory symbol) public {
        CommodityToken newCommodity = new CommodityToken(name, symbol);
        commodities[address(newCommodity)] = true;
        emit CommodityCreated(address(newCommodity), name, symbol);
    }

    function mintCommodityTokens(address token, uint256 amount) public {
        require(commodities[token], "Token is not a registered commodity");
        CommodityToken(token).mint(msg.sender, amount);
    }

    function placeOrder(address token, uint256 amount, uint256 price, bool isBuyOrder) public {
        require(commodities[token], "Token is not a valid commodity");

        uint256 orderId = nextOrderId++;
        Order memory newOrder = Order(orderId, msg.sender, token, amount, price, isBuyOrder);
        
        if (isBuyOrder) {
            matchOrder(newOrder, sellOrders);
            buyOrders.push(newOrder);
        } else {
            matchOrder(newOrder, buyOrders);
            sellOrders.push(newOrder);
        }
        emit OrderPlaced(orderId, msg.sender, amount, price, isBuyOrder);
    }

    function matchOrder(Order memory newOrder, Order[] storage oppositeOrders) internal {
        for (uint i = 0; i < oppositeOrders.length; i++) {
            if ((newOrder.isBuyOrder && newOrder.price >= oppositeOrders[i].price) || 
                (!newOrder.isBuyOrder && newOrder.price <= oppositeOrders[i].price)) {
                executeTrade(newOrder, oppositeOrders[i]);
                removeOrder(i, oppositeOrders);
                return;
            }
        }
    }

    function executeTrade(Order memory buyOrder, Order memory sellOrder) internal {
        CommodityToken(buyOrder.token).mint(buyOrder.user, buyOrder.amount);
        CommodityToken(sellOrder.token).burn(sellOrder.user, sellOrder.amount);
        emit OrderMatched(buyOrder.id, sellOrder.id, buyOrder.amount, buyOrder.price);
    }

    function removeOrder(uint index, Order[] storage orders) internal {
        require(index < orders.length, "Index out of bounds");
        emit OrderRemoved(orders[index].id);
        for (uint i = index; i < orders.length - 1; i++) {
            orders[i] = orders[i + 1];
        }
        orders.pop();
    }

  function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
       require(requestIds[_requestId] , "request not found");
       address userAddress = requestIds[_requestId];
       uint256 uid = _randomWords;
       users[userAddress] = uid;
    }
    /*
    * create a user, mint a nft, and push data on thegraph, also generate a uid, that will be used later in the verification and irl process
    */
    function requestNewUser(string memory name, uint256 memory userType, string memory location, bool verificationStatus) public returns (uint256 requestId) {
       
         requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );   
       return requestId;
        requestIds[requestId] = msg.caller; // Store other details as needed

           // Mint the token to the user's address
        userToken.mint(msg.caller, tokenType, 1, "");
       
        emit UserEvent(msg.caller, name, userType, location, verificationStatus, 0);
    }
}
