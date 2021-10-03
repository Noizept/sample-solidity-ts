import { ethers } from 'hardhat';
import { expect } from 'chai';
import {
  Lottery,
  Lottery__factory,
  VRFCoordinatorMock,
  VRFCoordinatorMock__factory,
} from '../../typechain';
import {
  deployLinkTokenMock,
  deployV3AgrretatorMock,
  deployVRFMock,
  fundWithLink,
} from '../../scripts/utils';
import { BytesLike } from '@ethersproject/bytes';

describe('Lottery Testing', function () {
  let lottery: Lottery;
  let linkToken: string;
  let vrfCoordinatorLink: string;
  beforeEach(async function () {
    const signers = await ethers.getSigners();
    const Lottery = (await ethers.getContractFactory(
      'Lottery',
      signers[0]
    )) as Lottery__factory;

    const priceFeedAddress = await deployV3AgrretatorMock();
    linkToken = await deployLinkTokenMock();
    vrfCoordinatorLink = await deployVRFMock(linkToken);
    const keyHash =
      '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311';

    lottery = (await Lottery.deploy(
      priceFeedAddress,
      vrfCoordinatorLink,
      linkToken,
      '100000000000000000',
      keyHash
    )) as Lottery;
  });

  it('Pick Winner Correctly', async function () {
    const [deployer, acc2, acc3] = await ethers.getSigners();

    let tx = await lottery.startLottery();
    const entranceFee = await lottery.getEntranceFee();

    tx = await lottery.enter({ from: deployer.address, value: entranceFee });
    tx = await lottery
      .connect(acc2)
      .enter({ from: acc2.address, value: entranceFee });
    tx = await lottery
      .connect(acc3)
      .enter({ from: acc3.address, value: entranceFee });
    tx = await fundWithLink({
      contractAddress: lottery.address,
      linkToken,
      accountAddress: deployer.address,
    });
    tx = await lottery.endLottery();

    const receipt = await tx.wait();
    const requestId = receipt.events?.filter((x) => {
      return x.event == 'RequestedRandomness';
    })[0].data;
    const staticRNG = 777;

    const vrf = (await VRFCoordinatorMock__factory.getContract(
      vrfCoordinatorLink,
      VRFCoordinatorMock__factory.createInterface(),
      deployer
    )) as VRFCoordinatorMock;

    tx = await vrf.callBackWithRandomness(
      requestId as BytesLike,
      staticRNG,
      lottery.address,
      {
        from: deployer.address,
      }
    );
    tx.wait();
    expect(await lottery.recentWinner()).to.equal(deployer.address);
  });
});
