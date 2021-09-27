import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
const { alchemyApiKey, mnemonic } = require("./secrets.json");

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      gasMultiplier: 2,
      url: `https://rinkeby.infura.io/v3/${alchemyApiKey}`,
      accounts: [mnemonic],
    },
  },
};

export default config;
