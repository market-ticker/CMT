// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  // Deploy the CommodityToken contract

  // Deploy the CommoditiesMarketTicker contract
  const CMTFactory = await ethers.getContractFactory("CommoditiesMarketTicker");
  const commoditiesMarketTicker = await CMTFactory.deploy();
  await commoditiesMarketTicker.waitForDeployment();
  console.log("CommoditiesMarketTicker deployed to:", commoditiesMarketTicker.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
