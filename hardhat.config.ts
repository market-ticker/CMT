import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY; // Replace with your Alchemy API key
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY; // Replace with your Sepolia account private key
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; // Replace with your Sepolia account private key
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: `${ETHERSCAN_API_KEY}`
    }
  }
};

export default config;
