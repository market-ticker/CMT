// Commodity.sol
pragma solidity ^0.8.0;

contract Commodity {
    uint256 public id;
    string public name;
    uint256 public price;
    uint256 public quantity;
    string public category;

    constructor(uint256 _id, string memory _name, uint256 _price, uint256 _quantity, string memory _category) {
        id = _id;
        name = _name;
        price = _price;
        quantity = _quantity;
        category = _category;
    }
    
    // Additional methods as required...
}
