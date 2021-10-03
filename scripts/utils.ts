import { ethers } from 'hardhat';
import web3 from 'web3';
import {
  MockV3Aggregator,
  MockV3Aggregator__factory,
  VRFCoordinatorMock,
  VRFCoordinatorMock__factory,
} from '../typechain';
import {
  LinkToken,
  LinkToken__factory,
  LinkTokenInterface,
} from '../typechain';

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

export const deployLinkTokenMock = async (): Promise<string> => {
  const MockV3Aggregator = (await ethers.getContractFactory(
    'LinkToken'
  )) as LinkToken__factory;

  const mockV3Aggregator = (await MockV3Aggregator.deploy()) as LinkToken;
  await mockV3Aggregator.deployed();
  return mockV3Aggregator.address;
};

export const deployVRFMock = async (link: string): Promise<string> => {
  const MockV3Aggregator = (await ethers.getContractFactory(
    'VRFCoordinatorMock'
  )) as VRFCoordinatorMock__factory;

  const mockV3Aggregator = (await MockV3Aggregator.deploy(
    link
  )) as VRFCoordinatorMock;
  await mockV3Aggregator.deployed();
  return mockV3Aggregator.address;
};

export const fundWithLink = async ({
  contractAddress,
  linkToken,
  amount = '100000000000000000',
}: {
  contractAddress: string;
  accountAddress: string;
  linkToken: string;
  amount?: string;
}) => {
  const [deployer] = await ethers.getSigners();

  const link = LinkToken__factory.getContract(
    linkToken,
    LinkToken__factory.createInterface(),
    deployer
  ) as LinkToken;

  return await link.transfer(contractAddress, amount, {
    from: deployer.address,
  });
};
