// IAccount.sol
pragma solidity ^0.8.0;

interface IAccount {
    function getId() external view returns (uint256);
    function getInfo() external view returns (string memory);
    function getAccountType() external view returns (string memory);
}
