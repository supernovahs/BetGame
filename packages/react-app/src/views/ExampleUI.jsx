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
          let id = await tx(
            readContracts["YourContract"].bytestostringconvert(
              "0x3561356438643037623064386332646335613039363438653561623163346264",
            ),
          );
          console.log(id);
          await tx(
            writeContracts["YourContract"].requestGamesResolveWithFilters(
              ethers.utils.parseEther("0.1"),
              "resolve",
              4,
              1647357166,
              [],
            ),
          );
        }}
      >
        Get Results
      </Button>
      <Button
        onClick={async () => {
          await tx(writeContracts["YourContract"].withdraw());
        }}
      >
        withdraw
      </Button>
    </div>
  );
}
