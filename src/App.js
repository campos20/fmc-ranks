import React from "react";
import "./App.css";
import GenerateScrambles from "./components/GenerateScrambles";
import GenerateRank from "./components/GenerateRank";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import About from "./components/About";
import ScrambleImage from "./components/ScrambleImage";
import { HashRouter, Switch, Route } from "react-router-dom";

const baseLink = "/";
const rankLink = "/rank";
const scrambleLink = "/scramble";
const scrambleImageLink = "/scramble-image";
const aboutLink = "/about";

function App() {
  return (
    <HashRouter basename={baseLink}>
      <div className="App">
        <NavBar
          baseLink={baseLink}
          rankLink={rankLink}
          scrambleLink={scrambleLink}
          scrambleImageLink={scrambleImageLink}
          aboutLink={aboutLink}
        />
        <Switch>
          <Route exact path={baseLink} component={Home} />
          <Route path={rankLink} component={GenerateRank} />
          <Route path={scrambleLink} component={GenerateScrambles} />
          <Route path={scrambleImageLink} component={ScrambleImage} />
          <Route path={aboutLink} component={About} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
