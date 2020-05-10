import React from "react";
import "./App.css";
import GenerateScrambles from "./components/GenerateScrambles";
import GenerateRank from "./components/GenerateRank";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>FMC Ranks</h1>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <GenerateRank />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <GenerateScrambles />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
