import { isAddress } from '@ethersproject/address';
import hre, { ethers, network } from 'hardhat';
import { Lottery, Lottery__factory } from '../typechain';
import {
  deployV3AgrretatorMock,
  deployLinkTokenMock,
  deployVRFMock,
} from './utils';

const deploy = async () => {
  const [deployer] = await ethers.getSigners();
  const Lottery = (await ethers.getContractFactory(
    'Lottery',
    deployer
  )) as Lottery__factory;

  let priceFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  let vrfCoordinatorLink = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B';
  let linkToken = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  let keyHash =
    '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311';
  if (network.name === 'hardhat') {
    priceFeedAddress = await deployV3AgrretatorMock();
    linkToken = await deployLinkTokenMock();
    vrfCoordinatorLink = await deployVRFMock(linkToken);
  }
  // Deploy Contract
  const lottery = (await Lottery.deploy(
    priceFeedAddress,
    vrfCoordinatorLink,
    linkToken,
    1,
    keyHash
  )) as Lottery;
  await lottery.deployed();

  // Start Lottery
  let tx = await lottery.startLottery({
    from: deployer.address,
  });
  tx.wait();

  //Get Entrance Fee and Enter Lottery
  const entranceFee = await lottery.getEntranceFee();
  tx = await lottery.enter({
    from: deployer.address,
    value: entranceFee,
  });

  // if (network.name !== 'hardhat') {
  //   await hre.run('verify:verify', {
  //     address: lottery.address,
  //     constructorArguments: [
  //       priceFeedAddress,
  //       vrfCoordinatorLink,
  //       linkToken,
  //       1,
  //       keyHash,
  //     ],
  //   });
  // }
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
