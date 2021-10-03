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
    compilers: [
      { version: '0.4.11' },
      { version: '0.4.24' },
      { version: '0.6.0' },
      { version: '0.6.6' },
      { version: '0.8.4' },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      gasMultiplier: 2,
      url: `https://rinkeby.infura.io/v3/${process.env.alchemyApiKey}`,
      accounts: [process.env.account1 ?? '', process.env.account2 ?? ''],
    },
  },
  etherscan: {
    apiKey: process.env.ether_scan_token,
  },
  dependencyCompiler: {
    paths: [
      '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol',
      '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol',
      '@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol',
      '@chainlink/contracts/src/v0.6/interfaces/LinkTokenInterface.sol',
      '@chainlink/contracts/src/v0.6/VRFConsumerBase.sol',
      '@openzeppelin/contracts/access/Ownable.sol',
    ],
  },
};

export default config;
