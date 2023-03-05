import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}></span>
        Welcome to Content Coach
      </div>
      <div style={{ margin: 32 }}></div>
      <div style={{ margin: 32 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="filled-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Post Here"
              variant="filled"
            />
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Home;
