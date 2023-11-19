
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CommodityToken.sol";

contract CommoditiesMarketTicker {
    // Mapping from token address to a boolean to manage commodities
    mapping(address => bool) public commodities;

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

    event CommodityCreated(address token);
    event OrderPlaced(uint256 id, address user, uint256 amount, uint256 price, bool isBuyOrder);
    event OrderMatched(uint256 buyOrderId, uint256 sellOrderId, uint256 matchedAmount, uint256 matchedPrice);
    event OrderRemoved(uint256 orderId);

    function createCommodity(string memory name, string memory symbol) public {
        CommodityToken newCommodity = new CommodityToken(name, symbol);
        commodities[address(newCommodity)] = true;
        emit CommodityCreated(address(newCommodity));
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
}
