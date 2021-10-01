import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SimpleStorage, SimpleStorage__factory } from '../typechain';

describe('Simple Storage', function () {
  it('Should return 0 when retrieve value', async function () {
    const SimpleStorageFactory = (await ethers.getContractFactory(
      'SimpleStorage'
    )) as SimpleStorage__factory;
    const simpleStorage =
      (await SimpleStorageFactory.deploy()) as SimpleStorage;

    let val = await simpleStorage.retrieve();
    expect(val.toNumber()).to.eq(0);
  });

  it('Should return 15 when retrieve value', async function () {
    const SimpleStorageFactory = (await ethers.getContractFactory(
      'SimpleStorage'
    )) as SimpleStorage__factory;
    const simpleStorage =
      (await SimpleStorageFactory.deploy()) as SimpleStorage;

    const tx = await simpleStorage.store(15);
    await tx.wait();
    const val = await simpleStorage.retrieve();

    expect(val.toNumber()).to.eq(15);
  });
});
