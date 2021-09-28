import hre, { ethers, network } from 'hardhat';
import { FundMe, FundMe__factory } from '../typechain';
import { deployV3AgrretatorMock } from './utils';

const deploy = async () => {
  const signers = await ethers.getSigners();
  const FundMe = (await ethers.getContractFactory(
    'FundMe',
    signers[0]
  )) as FundMe__factory;

  let priceFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';

  if (network.name === 'hardhat') {
    console.log('@@@@ - Deploying Mocks');
    priceFeedAddress = await deployV3AgrretatorMock();
  }

  const fundMe = (await FundMe.deploy(priceFeedAddress)) as FundMe;
  await fundMe.deployed();

  if (network.name !== 'hardhat') {
    await hre.run('verify:verify', {
      address: fundMe.address,
      constructorArguments: [priceFeedAddress],
    });
  }
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
