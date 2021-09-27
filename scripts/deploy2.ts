import hre from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

const deploy = async () => {
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");

  const simpleStorage = await SimpleStorage.deploy();
  await simpleStorage.deployed();
  const addr = simpleStorage.address;
  console.log(addr);
  await simpleStorage.store(15);
  await simpleStorage.deployed();
  const result = await simpleStorage.retrieve();
  console.log(result);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
