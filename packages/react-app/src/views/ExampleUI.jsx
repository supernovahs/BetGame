import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";
const { ethers } = require("ethers");

export default function ExampleUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  return (
    <div>
      <Button
        onClick={async () => {
          const a = await tx(
            writeContracts["YourContract"].updateResult(ethers.utils.parseEther("0.1"), "resolve", 4, 1646764789),
          );
          console.log(a);

          const id = await tx(readContracts["YourContract"].requestIdresolve());
          console.log(id);
          for (let i = 0; i < 3; i++) {
            const res = await tx(readContracts["YourContract"].getGamesResolved(id, i));
            console.log(res);
          }
        }}
      >
        Get Results
      </Button>
    </div>
  );
}
