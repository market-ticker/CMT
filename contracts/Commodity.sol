// Commodity.sol
pragma solidity ^0.8.0;

contract Commodity {
    uint256 public immutable id;
    string public immutable name;
    uint256 public price;
    uint256 public quantity;
    string public immutable category;

    event CommodityUpdated(uint256 indexed id, string name, uint256 price, uint256 quantity, string category);

    constructor(uint256 _id, string memory _name, uint256 _price, uint256 _quantity, string memory _category) {
        id = _id;
        name = _name;
        price = _price;
        quantity = _quantity;
        category = _category;

        emit CommodityUpdated(_id, _name, _price, _quantity, _category);
    }
    
    function updateCommodity(uint256 _newPrice, uint256 _newQuantity) external {
        require(msg.sender == owner, "Only the owner can update the commodity");
        
        price = _newPrice;
        quantity = _newQuantity;

        emit CommodityUpdated(id, name, price, quantity, category);
    }
    
    // Additional methods as required...
}
