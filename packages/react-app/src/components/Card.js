import React, { useState } from "react";
import "./Card.css";
import teams from "./teams.json";
import { EtherInput } from ".";
import { Button } from "antd";
const { ethers } = require("ethers");

const epochToDate = epoch => {
  const date = new Date(0);
  date.setUTCSeconds(epoch);
  return date.toLocaleString();
};

const Card = ({
  game,
  index,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) => {
  const homeImg = teams.find(team => team.name === game.homeTeam);
  const awayImg = teams.find(team => team.name === game.awayTeam);

  const [selected, setSelected] = useState(null);
  const [value, setvalue] = useState("0");

  return (
    <div>
      {/* // <div className="card-wrapper" key={index}> */}
      <div className="game-data">
        <div
          className={`team ${selected === game.homeTeam ? "selected" : ""}`}
          onClick={() => setSelected(game.homeTeam)}
        >
          {homeImg && <img height={200} width={200} src={homeImg.image} alt="" />}
          <h1>{game.homeTeam}</h1>
        </div>
        <div className="vs">
          <h1>VS</h1>
        </div>
        <div
          className={`team ${selected === game.awayTeam ? "selected" : ""}`}
          onClick={() => setSelected(game.awayTeam)}
        >
          {awayImg && <img height={200} width={200} src={awayImg.image} alt="" />}
          <h1>{game.awayTeam}</h1>
        </div>
      </div>
      <div className="time">{epochToDate(ethers.BigNumber.from(game.startTime).toNumber())}</div>
      <div className="betting">
        <div className="amount">
          <EtherInput price={price} />
        </div>
        <button
          className="bet"
          onClick={async () => {
            await tx(writeContracts["YourContract"].ChooseTeam(game.gameId, 0, { value: value * 10 ** 18 }));
          }}
        >
          PlaceBet
        </button>
      </div>
    </div>
  );
};

export default Card;
