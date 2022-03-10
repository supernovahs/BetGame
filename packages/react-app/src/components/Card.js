import React from "react";
import "./Card.css";
import { EtherInput } from ".";
const { ethers } = require("ethers");

const epochToDate = epoch => {
  const date = new Date(0);
  date.setUTCSeconds(epoch);
  return date.toLocaleString();
};

const Card = ({ game, index }) => {
  return (
    <div>
      {/* // <div className="card-wrapper" key={index}> */}
      <div className="game-data">
        <div className="home-team">
          <img src="download.jpeg" alt="" />
          <h1>{game.homeTeam}</h1>
        </div>
        <div className="vs">
          <h1>VS</h1>
        </div>
        <div className="away-team">
          <img src="download.jpeg" alt="" />
          <h1>{game.awayTeam}</h1>
        </div>
      </div>
      <div className="time">{epochToDate(ethers.BigNumber.from(game.startTime).toNumber())}</div>
      <div className="betting">
        <div className="amount">
          <EtherInput />
        </div>
        <div className="bet">PLACE BET</div>
      </div>
    </div>
  );
};

export default Card;
