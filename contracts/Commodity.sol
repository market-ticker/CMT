
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Commodity is ERC1155 {
    address public commodityMarketContract;

    constructor(address _commodityMarketContract) ERC1155("ipfs://ipfs://QmZ63KyKkTdm9RdTyb1PBtbJyro8AefoJcNxh2eVqsDpBN") {
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
