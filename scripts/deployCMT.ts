// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  // Deploy the Commodity contract
  const CommodityFactory = await ethers.getContractFactory("Commodity");
  const commodity = await CommodityFactory.deploy(
    1, "Maize", 1, 1000, "Grain"
  );
  // Assuming waitForDeployment is a custom method provided by your environment
  await commodity.waitForDeployment();
  console.log("Commodity deployed to:", commodity.target);

  // Deploy the Buyer contract
  const BuyerFactory = await ethers.getContractFactory("Buyer");
  const buyer = await BuyerFactory.deploy(1, "Buyer Information");
  // Assuming waitForDeployment is a custom method provided by your environment
  await buyer.waitForDeployment();
  console.log("Buyer deployed to:", buyer.target);

  // Deploy the Seller contract
  const SellerFactory = await ethers.getContractFactory("Seller");
  const seller = await SellerFactory.deploy(1, "Seller Information");
  // Assuming waitForDeployment is a custom method provided by your environment
  await seller.waitForDeployment();
  console.log("Seller deployed to:", seller.target);

  // Deploy the CommoditiesMarketTicker contract
  const CMTFactory = await ethers.getContractFactory("CommoditiesMarketTicker");
  const cmt = await CMTFactory.deploy();
  // Assuming waitForDeployment is a custom method provided by your environment
  await cmt.waitForDeployment();
  console.log("CommoditiesMarketTicker deployed to:", cmt.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
