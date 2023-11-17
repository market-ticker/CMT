// Marketplace.sol
pragma solidity ^0.8.0;

import "./Commodity.sol";

contract Marketplace {
    mapping(uint256 => Commodity) public commodities;
    uint256 private nextCommodityId = 1;

    event TradeExecuted(uint256 indexed commodityId, address indexed buyer, uint256 quantity, uint256 totalPrice);

    function createCommodity(string memory name, uint256 price, uint256 quantity) external {
        uint256 commodityId = nextCommodityId++;
        Commodity newCommodity = new Commodity(commodityId, name, price, quantity);
        commodities[commodityId] = newCommodity;
    }

    function executeTrade(uint256 commodityId, uint256 quantity) external payable {
        Commodity commodity = commodities[commodityId];
        require(commodity.quantity >= quantity, "Not enough quantity available");
        require(msg.value == quantity * commodity.price, "Incorrect payment amount");

        // Transfer commodity ownership and update quantity
        commodity.updateCommodity(commodity.price, commodity.quantity - quantity);

        // Transfer payment to the seller
        payable(commodity.owner()).transfer(msg.value);

        // Emit trade event
        emit TradeExecuted(commodityId, msg.sender, quantity, msg.value);
    }

    // Additional methods as required...
}
