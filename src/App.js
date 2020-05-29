import React from "react";
import "./App.css";
import GenerateScrambles from "./components/GenerateScrambles";
import GenerateRank from "./components/GenerateRank";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
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
