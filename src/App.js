import React from "react";
import "./App.css";
import GenerateScrambles from "./components/GenerateScrambles";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>FMC Ranks</h1>
          </div>
        </div>
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
