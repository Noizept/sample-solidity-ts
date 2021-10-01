import { ethers } from 'hardhat';
import { expect } from 'chai';
import { deploy } from '../scripts/FundMeDeploy';
import { FundMe } from '../typechain/FundMe';
import { FundMe__factory } from '../typechain';
import { deployV3AgrretatorMock } from '../scripts/utils';

describe('Fund me', async function () {
  let fundMe: FundMe;
  beforeEach(async function () {
    const signers = await ethers.getSigners();
    const FundMe = (await ethers.getContractFactory(
      'FundMe',
      signers[0]
    )) as FundMe__factory;

    const priceFeedAddress = await deployV3AgrretatorMock();

    fundMe = (await FundMe.deploy(priceFeedAddress)) as FundMe;
    await fundMe.deployed();
  });

  it('Should transfer funds and whithdraw', async function () {
    const signers = await ethers.getSigners();

    const entranceFee = await fundMe.getEntranceFee();
    let tx = await fundMe.fund({
      from: signers[0].address,
      value: entranceFee.toHexString(),
    });
    tx.wait();
    const currentFunds = await fundMe.addressToAmountFunded(signers[0].address);
    expect(currentFunds).to.eq(entranceFee.toHexString());
    tx = await fundMe.withdraw({
      from: signers[0].address,
    });
    tx.wait();
    expect(await fundMe.addressToAmountFunded(signers[0].address)).to.eq(0);
  });
});
