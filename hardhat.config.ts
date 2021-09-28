import dotenv from 'dotenv';
dotenv.config();
import 'hardhat-prettier';
import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
const config: HardhatUserConfig = {
  solidity: '0.8.4',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    rinkeby: {
      gasMultiplier: 2,
      url: `https://rinkeby.infura.io/v3/${process.env.alchemyApiKey}`,
      accounts: [process.env.mnemonic ?? ''],
    },
  },
};

export default config;
