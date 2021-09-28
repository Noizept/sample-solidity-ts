import { ethers } from 'hardhat';
import { SimpleStorage, SimpleStorage__factory } from '../typechain';

const deploy = async () => {
  const SimpleStorage = (await ethers.getContractFactory(
    'SimpleStorage'
  )) as SimpleStorage__factory;

  const simpleStorage = (await SimpleStorage.deploy()) as SimpleStorage;

  await simpleStorage.deployed();
  const tx = await simpleStorage.store(15);
  await tx.wait();
  const result = await simpleStorage.retrieve();
  console.log(result.toNumber());
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
