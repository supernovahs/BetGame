import { Select, Button, Row, Col } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import Card from "../components/Card";
import { useTokenList } from "eth-hooks/dapps/dex";
import { Address, AddressInput } from "../components";
const { ethers } = require("ethers");
const { Option } = Select;

export default function Hints({
  yourLocalBalance,
  mainnetProvider,
  price,
  address,
  readContracts,
  writeContracts,
  blockExplorer,
  tx,
}) {
  const [gameArray, setGameArray] = useState([]);

  // const firstgamehometeam = firstgame[2];
  return (
    <div>
      <Button
        onClick={async () => {
          const requestid = await readContracts["YourContract"].requestIdcreate();
          console.log(requestid);
          setGameArray([]);

          const fun = async () => {
            let arr = [];
            for (let i = 0; i < 5; i++) {
              const gamearr = await readContracts["YourContract"].getGamesCreated(requestid, i);
              console.log(gamearr);
              arr.push(gamearr);
            }
            setGameArray(arr);
          };

          fun();

          // const lengthGames = await readContracts["YourContract"].getGamesCreated(requestid, 0);
          // console.log(lengthGames);
          // const gameid = lengthGames[0];
          // const starttime = lengthGames[1];
          // console.log(gameid);
          // console.log(starttime);
          // const formatgameid = ethers.BigNumber.from(starttime).toNumber();
          // console.log(formatgameid);
          // const homeTeam = lengthGames[2];
          // const awayteam = lengthGames[3];
          // console.log(homeTeam);
          // console.log(awayteam);
          // GameArray.push({ lengthGames });
          // const id = GameArray[0];
          // console.log(id.lengthGames[1]);
        }}
      >
        Get Games List
      </Button>

      <div style={{ margin: 16, padding: 8, display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {gameArray.map((game, index) => (
          <div key={index} className="card-wrapper">
            <Card game={game} key={index} price={price} />
          </div>
        ))}
      </div>
    </div>
  );
}
