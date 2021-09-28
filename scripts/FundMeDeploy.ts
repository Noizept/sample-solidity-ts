import { ethers } from 'hardhat';
import { FundMe, FundMe__factory } from '../typechain';

const deploy = async () => {

  const signers = await ethers.getSigners();
  const FundMe = (await ethers.getContractFactory(
    'FundMe',signers[0]
  )) as FundMe__factory;
  const fundMe = (await FundMe.deploy('0x8A753747A1Fa494EC906cE90E9f37563A8AF630e')) as FundMe;
  await fundMe.deployed();
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
