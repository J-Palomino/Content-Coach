import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const { Configuration, OpenAIApi } = require("openai");

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  const [PostInput, setPostInput] = useState();
  const [aiResults, setAIResults] = useState({});
  const [loadingState, setLoadingState] = useState();
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const getResults = async () => {
    try {
      setLoadingState("Loading...");
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Create 3 different short form twitter posts based on this piece of writing I write:\n\n" + PostInput,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      let data = await res.JSON;

      setAIResults(data);
      return res;
    } catch (error) {
      setLoadingState("Error");
      console.log(error);
    }
  };

  const handleClick = () => {
    getResults().then(res => setAIResults(res));
    console.log("AIRESULTS", aiResults);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}></span>
        Welcome to Content Coach
      </div>
      <div style={{ margin: 32 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ width: "100%", color: "#FFFFFF" }}>
            <TextField
              style={{ width: "100%" }}
              inputProps={{ style: { color: "whitesmoke" } }}
              id="filled-multiline-static"
              multiline
              rows={8}
              defaultValue="The Phoenix Suns are hiring Detroit Pistons executive Josh Bartelstein as the team's new CEO, sources told ESPN on Saturday.
New owner Mat Ishbia targeted Bartelstein as CEO to help him overhaul a troubled post-Robert Sarver organizational culture and now they'll work together to oversee the franchise's business and basketball divisions, sources said.

Suns president of basketball operations and general manager James Jones will continue to lead basketball operations and report directly to Ishbia, sources said.
Bartelstein, 33, has ascended quickly in his executive career, spending seven years working his way to executive VP of business and basketball operations under Palace Sports and Entertainment vice chairman Arn Tellem. Bartelstein worked on number of major projects, including the franchise's relocation to a new downtown arena. He moved over to basketball operations as an assistant general manager in 2022, working with GM Troy Weaver. That transition gave Bartelstein a fuller résumé to move into a CEO role.
After buying a majority share of the Sunsat a $4 billion valuation earlier this year, Ishbia brings on Bartelstein to replace former Suns CEO Jason Rowley, whom some employees placed at the center of allegations of verbal abuse, retaliation and intimidation in the workplace under Sarver.
Ishbia, the billionaire CEO of United Wholesale Mortgage in Michigan, has vowed to transform the Suns' troubled workplace culture under Sarver and Rowley.
Bartelstein's playing background mirrors that of Ishbia, who was a walk-on at Michigan State. Bartelstein spent four seasons as a walk-on for the University of Michigan, including the 2012-2013 season as one of the team's captains.
He is also the son of Mark Bartelstein, one of the league's most prominent player representatives and the CEO of Priority Sports and Entertainment based in Chicago.
"
              variant="filled"
              value={PostInput}
              onChange={e => setPostInput(e.target.value)}
            />
          </div>
        </Box>
        <Button variant="contained" onClick={e => handleClick()}>
          Generate AI Posts
        </Button>
        <div>{aiResults && <p> {aiResults?.data?.choices[0].text.split("\\n[0-9]+.")}</p>}</div>
      </div>
    </div>
  );
}

export default Home;
