// contracts/Commodity.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Commodity is Ownable {
    uint256 public immutable id;
    string public name;
    uint256 public price;
    uint256 public quantity;
    address public owner;

    event CommodityUpdated(uint256 indexed id, string name, uint256 price, uint256 quantity);
    event OwnershipTransferred(uint256 indexed id, address indexed previousOwner, address indexed newOwner);

    constructor(uint256 _id, string memory _name, uint256 _price, uint256 _quantity) {
        id = _id;
        name = _name;
        price = _price;
        quantity = _quantity;
        owner = msg.sender;

        emit CommodityUpdated(_id, _name, _price, _quantity);
        emit OwnershipTransferred(_id, address(0), msg.sender);
    }

    function updateCommodity(string memory _newName, uint256 _newPrice, uint256 _newQuantity) external onlyOwner {
        name = _newName;
        price = _newPrice;
        quantity = _newQuantity;

        emit CommodityUpdated(id, _newName, _newPrice, _newQuantity);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid new owner address");
        require(_newOwner != owner, "The new owner is the current owner");

        address previousOwner = owner;
        owner = _newOwner;

        emit OwnershipTransferred(id, previousOwner, _newOwner);
    }
}
