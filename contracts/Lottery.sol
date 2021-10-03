// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Lottery is VRFConsumerBase, Ownable {
    enum LOTTERY_STATE {
        OPEN,
        CLOSED,
        CALCULATING_WINNER
    }

    address payable[] public players;
    address payable public recentWinner;
    uint256 public usdFee;
    AggregatorV3Interface public ethUsdPriceFeed;
    uint256 public fee;
    bytes32 public keyHash;
    uint256 public randomness;
    event RequestedRandomness(bytes32 requestId);

    LOTTERY_STATE public lotteryState;

    modifier onlyOpen() {
        require(lotteryState == LOTTERY_STATE.OPEN, 'Lottery Didnt Start');
        _;
    }

    constructor(
        address priceFeed,
        address _vrfCoordinator,
        address _link,
        uint256 _fee,
        bytes32 _keyHash
    ) VRFConsumerBase(_vrfCoordinator, _link) {
        ethUsdPriceFeed = AggregatorV3Interface(priceFeed);
        usdFee = 50 * (10**18);
        lotteryState = LOTTERY_STATE.CLOSED;
        fee = _fee;
        keyHash = _keyHash;
    }

    function getEntranceFee() public view returns (uint256) {
        (, int256 price, , , ) = ethUsdPriceFeed.latestRoundData();
        uint256 adjustedPrice = uint256(price) * 10**10;
        uint256 costToEnter = (usdFee * 10**18) / adjustedPrice;
        return costToEnter;
    }

    function enter() public payable onlyOpen {
        require(lotteryState == LOTTERY_STATE.OPEN, 'Not open yet');
        require(msg.value >= getEntranceFee(), 'need more eth');
        players.push(payable(msg.sender));
    }

    function startLottery() public onlyOwner {
        require(LOTTERY_STATE.CLOSED == lotteryState, 'There is one onGoing');
        lotteryState = LOTTERY_STATE.OPEN;
    }

    function endLottery() public onlyOwner {
        require(LOTTERY_STATE.OPEN == lotteryState, 'Cant Start new One Yet');
        lotteryState = LOTTERY_STATE.CALCULATING_WINNER;
        bytes32 requestId = requestRandomness(keyHash, fee);
        emit RequestedRandomness(requestId);
    }

    function fulfillRandomness(bytes32, uint256 _randomness) internal override {
        require(
            lotteryState == LOTTERY_STATE.CALCULATING_WINNER,
            'not there yet CALCULATING_WINNER'
        );
        require(_randomness > 0, 'not found random');
        randomness = _randomness;
        uint256 indexOfWinner = _randomness % players.length;
        recentWinner = players[indexOfWinner];
        recentWinner.transfer(address(this).balance);
        players = new address payable[](0);
        lotteryState = LOTTERY_STATE.CLOSED;
    }
}
