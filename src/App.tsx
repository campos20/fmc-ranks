import { HashRouter, Route, Routes } from "react-router";
import "./App.css";
import About from "./components/About";
import GenerateScrambles from "./components/GenerateScrambles";
import NavBar from "./components/NavBar";
import ScrambleImage from "./components/ScrambleImage";
import { routes } from "./routes";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path={routes.base} element={<GenerateScrambles />} />
          <Route path={routes.scramble} element={<GenerateScrambles />} />
          <Route path={routes.scrambleImage} element={<ScrambleImage />} />
          <Route path={routes.about} element={<About />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
