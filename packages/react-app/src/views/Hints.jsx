import { Select, Button, Card, Row, Col } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";

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
  const GameArray = [];
  let requestid = "";
  let lengthGames = "";
  console.log(GameArray);

  // const firstgamehometeam = firstgame[2];
  return (
    <div>
      <h2>helo</h2>
      <Button
        onClick={async () => {
          requestid = await readContracts["YourContract"].requestId();
          console.log(requestid);

          lengthGames = await readContracts["YourContract"].getGamesCreated(requestid, 0);
          console.log(lengthGames);
          console.log(lengthGames);
          const gameid = lengthGames[0];
          const starttime = lengthGames[1];
          console.log(starttime);
          const formatgameid = ethers.BigNumber.from(starttime).toNumber();
          console.log(formatgameid);
          const homeTeam = lengthGames[2];
          const awayteam = lengthGames[3];
          console.log(homeTeam);
          console.log(awayteam);
          // GameArray.push({ lengthGames });
          // const id = GameArray[0];
          // console.log(id.lengthGames[1]);
          for (let i = 0; i < 6; i++) {
            const gamearr = await readContracts["YourContract"].getGamesCreated(requestid, i);
            GameArray.push(gamearr);
          }
          console.log(GameArray);
        }}
      >
        Click
      </Button>

      <div style={{ padding: 8 }}>
        <Card title="Match 1">
          <div style={{ padding: 8 }}>
            <Row>
              <Col span={8}>{lengthGames}</Col>

              <Col span={8} offset={8}>
                AwayTeam
              </Col>
            </Row>
          </div>
        </Card>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
