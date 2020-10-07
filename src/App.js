import React from "react";
import "./App.css";
import GenerateScrambles from "./components/GenerateScrambles";
import GenerateRank from "./components/GenerateRank";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import About from "./components/About";
import ScrambleImage from "./components/ScrambleImage";
import EOFinder from "./components/EOFinder";
import { HashRouter, Switch, Route } from "react-router-dom";

const baseLink = "/";
const rankLink = "/rank";
const scrambleLink = "/scramble";
const scrambleImageLink = "/scramble-image";
const aboutLink = "/about";
const eOFinderLink = "/eo-finder";

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
          eOFinderLink={eOFinderLink}
        />
        <Switch>
          <Route exact path={baseLink}>
            <Home />
          </Route>
          <Route path={rankLink}>
            <GenerateRank />
          </Route>
          <Route path={scrambleLink}>
            <GenerateScrambles />
          </Route>
          <Route path={scrambleImageLink}>
            <ScrambleImage />
          </Route>
          <Route path={aboutLink}>
            <About />
          </Route>
          <Route path={eOFinderLink}>
            <EOFinder />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
