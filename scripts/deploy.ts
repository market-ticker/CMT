// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the CommodityMarket contract first
  const CMTFactory = await ethers.getContractFactory("CommodityMarket");
  const commoditiesMarketTicker = await CMTFactory.deploy(7703); // Assuming constructor requires subscription ID
  await commoditiesMarketTicker.waitForDeployment();
  console.log("CommodityMarket deployed to:", commoditiesMarketTicker.target);

  // Deploy the UserToken contract with the address of CommodityMarket
  const UserTokenFactory = await ethers.getContractFactory("UserToken");
  const userToken = await UserTokenFactory.deploy(commoditiesMarketTicker.target);
  await userToken.waitForDeployment();
  console.log("UserToken deployed to:", userToken.target);

  // Deploy the Commodity contract with the address of CommodityMarket
  const CommodityFactory = await ethers.getContractFactory("Commodity");
  const commodity = await CommodityFactory.deploy(commoditiesMarketTicker.target);
  await commodity.waitForDeployment();
  console.log("Commodity deployed to:", commodity.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
