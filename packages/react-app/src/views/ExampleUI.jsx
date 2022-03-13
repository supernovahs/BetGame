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
          await tx(writeContracts["YourContract"].withdraw(gameid, [""]));
        }}
      >
        Get Results
      </Button>
    </div>
  );
}
