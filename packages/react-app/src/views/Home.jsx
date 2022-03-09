import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { DatePicker, Button } from "antd";
import { useState } from "react";
import { moment } from "moment";
import { useHistory } from "react-router-dom";
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
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  // const purpose = useContractReader(readContracts, "YourContract", "purpose");
  const [date, setdate] = useState(null);
  console.log(date);
  const history = useHistory();
  // const requestid = useContractReader(readContracts, "YourContract", "requestId");
  return (
    <div>
      <h2>Insert Date of NBA match</h2>
      <div style={{ margin: 2 }}>
        <DatePicker onChange={setdate} format="MMMM Do YYYY" />
      </div>

      <div style={{ padding: 8 }}>
        <Button
          onClick={async () => {
            // var utcdate = date.utc();
            // console.log(utcdate);
            console.log(date);
            const ts = date.unix();
            console.log(ts);

            await tx(writeContracts["YourContract"].requestGames(ethers.utils.parseEther("0.1"), "create", 4, ts));
            // console.log(requestgamestx);
            // console.log(requestid);
            setTimeout(() => {
              history.push("/hints");
            }, 777);
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default Home;
