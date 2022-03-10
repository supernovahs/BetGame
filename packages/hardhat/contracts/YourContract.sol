// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * Supported `sportId`
 * --------------------
 * NCAA Men's Football: 1
 * NFL: 2
 * MLB: 3
 * NBA: 4
 * NCAA Men's Basketball: 5
 * NHL: 6
 * WNBA: 8
 * MLS: 10
 * EPL: 11
 * Ligue 1: 12
 * Bundesliga: 13
 * La Liga: 14
 * Serie A: 15
 * UEFA Champions League: 16
 */

/**
 * Supported `market`
 * --------------------
 * create : Create Market
 * resolve : Resolve Market
 */

/**
 * Supported `statusIds`
 * --------------------
 * 1 : STATUS_CANCELED
 * 2 : STATUS_DELAYED
 * 3 : STATUS_END_OF_FIGHT
 * 4 : STATUS_END_OF_ROUND
 * 5 : STATUS_END_PERIOD
 * 6 : STATUS_FIGHTERS_INTRODUCTION
 * 7 : STATUS_FIGHTERS_WALKING
 * 8 : STATUS_FINAL
 * 9 : STATUS_FINAL_PEN
 * 10 : STATUS_FIRST_HALF
 * 11 : STATUS_FULL_TIME
 * 12 : STATUS_HALFTIME
 * 13 : STATUS_IN_PROGRESS
 * 14 : STATUS_IN_PROGRESS_2
 * 15 : STATUS_POSTPONED
 * 16 : STATUS_PRE_FIGHT
 * 17 : STATUS_RAIN_DELAY
 * 18 : STATUS_SCHEDULED
 * 19 : STATUS_SECOND_HALF
 * 20 : STATUS_TBD
 * 21 : STATUS_UNCONTESTED
 * 22 : STATUS_ABANDONED
 * 23 : STATUS_FORFEIT
 */

/**
 * @title A consumer contract for Therundown API.
 * @author LinkPool.
 * @dev Uses @chainlink/contracts 0.4.0.
 */

contract YourContract is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    /* ========== CONSUMER STATE VARIABLES ========== */

    struct GameCreate {
        bytes32 gameId;
        uint256 startTime;
        string homeTeam;
        string awayTeam;
    }

    struct GameResolve {
        bytes32 gameId;
        uint8 homeScore;
        uint8 awayScore;
        uint8 statusId;
    }

    GameCreate[] public gamecreate;

    GameResolve[] public gameresolve;
    bytes32 public requestIdresolve;
    bytes32 public requestIdcreate;
    bytes32 public resultid;

    struct TeamBet {
        bytes32 GameId;
        uint8 Team;
        uint256 amount;
        bool withdrawn;
    }
    TeamBet[] public teambet;

    mapping(address => TeamBet) public ChoiceBet;
    mapping(bytes => uint256) public GameIdtoArraylength;
    string public aa;

    /* ========== CONSTRUCTOR ========== */

    /**
     * @param _link the LINK token address.
     * @param _oracle the Operator.sol contract address.
     */
    constructor(address _link, address _oracle) {
        setChainlinkToken(_link);
        setChainlinkOracle(_oracle);
    }

    // Maps <RequestId, Result>
    mapping(bytes32 => bytes[]) public requestIdGames;

    /* ========== CONSUMER REQUEST FUNCTIONS ========== */

    /**
     * @notice Returns games for a given date.
     * @dev Result format is array of encoded tuples.
     * @param _payment the LINK amount in Juels (i.e. 10^18 aka 1 LINK).
     * @param _market the type of games we want to query (create or resolve).
     * @param _sportId the sportId of the sport to query.
     * @param _date the date for the games to be queried (format in epoch).
     * @param _gameIds the IDs of the games to query (array of gameId).
     * @param _statusIds the IDs of the statuses to query (array of statusId).
     */

    function requestGamesResolveWithFilters(
        uint256 _payment,
        string memory _market,
        uint256 _sportId,
        uint256 _date,
        string[] memory _statusIds,
        string[] memory _gameIds
    ) public {
        Chainlink.Request memory req = buildChainlinkRequest(
            "9de17351dfa5439d83f5c2f3707ffa9e",
            address(this),
            this.fulfillGames.selector
        );

        req.addUint("date", _date);
        req.add("market", _market);
        req.addUint("sportId", _sportId);
        req.addStringArray("statusIds", _statusIds);
        req.addStringArray("gameIds", _gameIds);
        resultid = sendChainlinkRequest(req, _payment);
    }

    function requestGamesResolve(
        uint256 _payment,
        string memory _market,
        uint256 _sportId,
        uint256 _date
    ) public {
        Chainlink.Request memory req = buildChainlinkRequest(
            "9de17351dfa5439d83f5c2f3707ffa9e",
            address(this),
            this.fulfillGames.selector
        );

        req.addUint("date", _date);
        req.add("market", _market);
        req.addUint("sportId", _sportId);

        requestIdresolve = sendChainlinkRequest(req, _payment);
    }

    function requestGamesCreate(
        uint256 _payment,
        string memory _market,
        uint256 _sportId,
        uint256 _date
    ) public {
        Chainlink.Request memory req = buildChainlinkRequest(
            "9de17351dfa5439d83f5c2f3707ffa9e",
            address(this),
            this.fulfillGames.selector
        );

        req.addUint("date", _date);
        req.add("market", _market);
        req.addUint("sportId", _sportId);

        requestIdcreate = sendChainlinkRequest(req, _payment);
    }

    //     createrequestId = sendChainlinkRequest(req, _payment);

    /* ========== CONSUMER FULFILL FUNCTIONS ========== */

    function fulfillGames(bytes32 _requestId, bytes[] memory _games)
        public
        recordChainlinkFulfillment(_requestId)
    {
        requestIdGames[_requestId] = _games;
    }

    /* ========== OTHER FUNCTIONS ========== */

    function getGamesCreated(bytes32 _requestId, uint256 _idx)
        external
        view
        returns (GameCreate memory)
    {
        GameCreate memory game = abi.decode(
            requestIdGames[_requestId][_idx],
            (GameCreate)
        );

        return game;
    }

    function getGamesResolved(bytes32 _requestId, uint256 _idx)
        public
        view
        returns (GameResolve memory)
    {
        GameResolve memory game = abi.decode(
            requestIdGames[_requestId][_idx],
            (GameResolve)
        );
        // gameresolve.push(game);
        return game;
    }

    function getOracleAddress() external view returns (address) {
        return chainlinkOracleAddress();
    }

    function setOracle(address _oracle) external {
        setChainlinkOracle(_oracle);
    }

    function withdrawLink() public {
        LinkTokenInterface linkToken = LinkTokenInterface(
            chainlinkTokenAddress()
        );
        require(
            linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    function ChooseTeam(
        bytes32 gameid,
        uint8 Team,
        uint256 _amount
    ) public payable {
        require(msg.value == _amount, "Not enough sent");
        teambet.push(TeamBet(gameid, Team, _amount, false));
        ChoiceBet[msg.sender] = teambet[teambet.length - 1];
    }

    function withdraw(bytes32 _gameid, string[] memory statusid) public {
        string memory aa = string(abi.encodePacked(_gameid));
        require(ChoiceBet[msg.sender].GameId == _gameid, "You did not bet ");
        uint8 scoreHometeam = getGamesResolved(resultid, 0).homeScore;
        uint8 scoreAwayteam = getGamesResolved(resultid, 0).awayScore;
        if (scoreHometeam > scoreAwayteam) {
            require(ChoiceBet[msg.sender].Team == 0);
            require(
                ChoiceBet[msg.sender].withdrawn == false,
                "Already withdrawn"
            );
            ChoiceBet[msg.sender].withdrawn = true;
            (bool success, ) = msg.sender.call{
                value: ChoiceBet[msg.sender].amount
            }("");
            require(success, "Not able to send u money");
        } else {
            require(ChoiceBet[msg.sender].Team == 1);
            require(
                ChoiceBet[msg.sender].withdrawn == false,
                "Already withdrawn"
            );
            ChoiceBet[msg.sender].withdrawn = true;
            (bool success, ) = msg.sender.call{
                value: ChoiceBet[msg.sender].amount
            }("");
            require(success, "Not able to send u money");
        }
    }
}
