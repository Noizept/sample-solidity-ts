import { ethers } from 'hardhat';
import web3 from 'web3';
import { MockV3Aggregator, MockV3Aggregator__factory } from '../typechain';

export const deployV3AgrretatorMock = async (): Promise<string> => {
  const MockV3Aggregator = (await ethers.getContractFactory(
    'MockV3Aggregator'
  )) as MockV3Aggregator__factory;

  const mockV3Aggregator = (await MockV3Aggregator.deploy(
    18,
    web3.utils.toWei('2000', 'ether')
  )) as MockV3Aggregator;
  await mockV3Aggregator.deployed();
  return mockV3Aggregator.address;
};
