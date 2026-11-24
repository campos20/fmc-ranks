import React from "react";
import "./App.css";
import GenerateScrambles from "./components/GenerateScrambles";
import NavBar from "./components/NavBar";
import About from "./components/About";
import ScrambleImage from "./components/ScrambleImage";
import { HashRouter, Switch, Route } from "react-router-dom";

const baseLink = "/";
const scrambleLink = "/scramble";
const scrambleImageLink = "/scramble-image";
const aboutLink = "/about";

function App() {
  return (
    <HashRouter basename={baseLink}>
      <div className="App">
        <NavBar
          baseLink={baseLink}
          scrambleLink={scrambleLink}
          scrambleImageLink={scrambleImageLink}
          aboutLink={aboutLink}
        />
        <Switch>
          <Route exact path={baseLink}>
            <GenerateScrambles />
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
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
