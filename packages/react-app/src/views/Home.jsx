import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { DatePicker, Button } from "antd";
import { useState } from "react";
import { moment } from "moment";
import { useHistory } from "react-router-dom";
import ugames from "../components/sampledata.json";
import Card from "../components/Card";
import "./Home.css";
/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({
  yourLocalBalance,
  tx,
  writeContracts,
  readContracts,
  blockExplorer,
  userSigner,
  mainnetProvider,
  contractConfig,
}) {
  const [date, setdate] = useState(null);
  console.log(date);
  const history = useHistory();

  return (
    <div>
      <div className="selection">
        <h2>Select Date of the NBA Game</h2>
        <div className="date-picker">
          <DatePicker onChange={setdate} format="MMMM Do YYYY" />
        </div>

        <div>
          <button
            className="confirm"
            onClick={async () => {
              // var utcdate = date.utc();
              // console.log(utcdate);
              console.log(date);
              const ts = date.unix();
              console.log(ts);

              await tx(
                writeContracts["YourContract"].requestGamesCreate(ethers.utils.parseEther("0.1"), "create", 4, ts),
              );
              // console.log(requestgamestx);
              // console.log(requestid);
              setTimeout(() => {
                history.push("/hints");
              }, 777);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
      <div className="upcoming-games">
        <h1 className="ug-head">UPCOMING GAMES</h1>
        {ugames.map(day => (
          <div className="game-day">
            <h3>{day.date}</h3>
            {day.games.map(game => (
              <div className="game">
                <h2>{game.homeTeam}</h2>
                <div>
                  <h2>VS</h2>
                  <h2>{game.time}</h2>
                </div>
                <h2>{game.awayTeam}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
