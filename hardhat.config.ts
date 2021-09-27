import 'hardhat-prettier';
import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';

const { alchemyApiKey, mnemonic } = require('./secrets.json');

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    rinkeby: {
      gasMultiplier: 2,
      url: `https://rinkeby.infura.io/v3/${alchemyApiKey}`,
      accounts: [mnemonic],
    },
  },
};

export default config;
