// tests/CommodityTrading.test.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Commodity Trading", function () {
  // We define a fixture to reuse the same setup in every test.
  async function deployTradingFixture() {
    const [owner, trader1, trader2] = await ethers.getSigners();

    const CommodityToken = await ethers.getContractFactory("CommodityToken");
    const commodityToken = await CommodityToken.deploy("Maize", "MAIZE");
    await commodityToken.deployed();

    const CommoditiesMarketTicker = await ethers.getContractFactory("CommoditiesMarketTicker");
    const marketTicker = await CommoditiesMarketTicker.deploy();
    await marketTicker.deployed();

    // Grant the CommoditiesMarketTicker contract the MINTER_ROLE
    const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"));
    await commodityToken.grantRole(MINTER_ROLE, marketTicker.address);

    return { commodityToken, marketTicker, owner, trader1, trader2 };
  }

  describe("CommodityToken Deployment", function () {
    it("Should have the correct name and symbol", async function () {
      const { commodityToken } = await loadFixture(deployTradingFixture);
      expect(await commodityToken.name()).to.equal("Maize");
      expect(await commodityToken.symbol()).to.equal("MAIZE");
    });
  });

  describe("CommoditiesMarketTicker Deployment", function () {
    it("Should create orders and match them correctly", async function () {
      const { marketTicker, trader1, trader2, commodityToken } = await loadFixture(deployTradingFixture);

      // Traders place orders
      await marketTicker.connect(trader1).placeOrder(commodityToken.address, 100, 1, true); // Buy order
      await marketTicker.connect(trader2).placeOrder(commodityToken.address, 100, 1, false); // Sell order

      // Check if orders are matched and tokens are minted and burned correctly
      // ... (You'll need to implement the event checking and balance checks here)
    });

    it("Should only allow trading for registered commodities", async function () {
      const { marketTicker, trader1, commodityToken } = await loadFixture(deployTradingFixture);

      // Create a new commodity
      await marketTicker.createCommodity("Wheat", "WHT");

      // Try to place an order for a non-registered commodity
      await expect(
        marketTicker.connect(trader1).placeOrder(ethers.constants.AddressZero, 100, 1, true)
      ).to.be.revertedWith("Token is not a valid commodity");

      // Place an order for a registered commodity
      await expect(
        marketTicker.connect(trader1).placeOrder(commodityToken.address, 100, 1, true)
      ).not.to.be.reverted;
    });
  });

  // Additional tests for matching logic, trade execution, and other functionalities can be added here
});
