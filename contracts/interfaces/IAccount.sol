// IAccount.sol
pragma solidity ^0.8.0;

//TODO 
//maybe a more general Account contract that would inherit this interface 
//so that buyer and seller could
//be based off of it

interface IAccount {
    function getId() external view returns (uint256);
    function getInfo() external view returns (string memory);
    function getAccountType() external view returns (string memory);
    function isProducer() external view returns (bool);
}
