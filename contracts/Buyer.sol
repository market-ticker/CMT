// Buyer.sol
pragma solidity ^0.8.0;

import "./interfaces/IAccount.sol";

contract Buyer is IAccount {
    uint256 private id;
    string private info;

    constructor(uint256 _id, string memory _info) {
        id = _id;
        info = _info;
    }

    function getId() external view override returns (uint256) {
        return id;
    }

    function getInfo() external view override returns (string memory) {
        return info;
    }

    function getAccountType() external pure override returns (string memory) {
        return "Buyer";
    }
}
