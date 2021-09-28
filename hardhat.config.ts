import dotenv from 'dotenv';
dotenv.config();
import 'hardhat-prettier';
import { HardhatUserConfig } from 'hardhat/types';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';

import '@nomiclabs/hardhat-waffle';
import 'hardhat-dependency-compiler';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: '0.8.4' }, { version: '0.6.6' }],
  },
  defaultNetwork: 'hardhat',
  // networks: {
  //   rinkeby: {
  //     gasMultiplier: 2,
  //     url: `https://rinkeby.infura.io/v3/${process.env.alchemyApiKey}`,
  //     accounts: [process.env.account1 ?? '',process.env.account2??''],
  //   },
  // },
  etherscan:{
    apiKey: process.env.ether_scan_token
  },
  dependencyCompiler: {
    paths: [
      '@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol',
      '@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol',
    ],
  },
};

export default config;
