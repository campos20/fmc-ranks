import React from "react";
import GenerateRank from "./GenerateRank";
import GenerateScrambles from "./GenerateScrambles";

const Home = () => {
  return (
    <div className="container">
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
  );
};

export default Home;
