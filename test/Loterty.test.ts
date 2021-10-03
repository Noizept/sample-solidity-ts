import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Lottery, Lottery__factory } from '../typechain';
import { deployV3AgrretatorMock } from '../scripts/utils';

describe('Lottery Testing', function () {
  let lottery: Lottery;
  beforeEach(async function () {
    const signers = await ethers.getSigners();
    const FundMe = (await ethers.getContractFactory(
      'FundMe',
      signers[0]
    )) as Lottery__factory;

    const priceFeedAddress = await deployV3AgrretatorMock();

    lottery = (await FundMe.deploy(priceFeedAddress)) as Lottery;
    await lottery.deployed();
  });

  it('Should return 0 when retrieve value', async function () {
    
  });
});
