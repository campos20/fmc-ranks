import React, { Component } from "react";
import { isValid } from "../util/move.util";

import Cube from "../model/Cube";
import AXIS from "../constants/axis.constants";

const MAX_SOLUTION_SIZE = 7;

class EOFinder extends Component {
  state = {
    maxMoves: "4",
    scramble:
      "R' U' F D2 F2 L2 R2 D L2 D B2 R' F2 L2 B' L2 B D' U' L R' F' R' U' F",
  };

  componentDidMount() {
    this.handleClick();
  }

  handleScrambleChange = (e) => {
    this.setState({ ...this.setState, scramble: e.target.value });
  };

  handleMaxMovesChange = (e) => {
    this.setState({ ...this.setState, maxMoves: e.target.value });
  };

  handleClick = () => {
    let cube = new Cube();
    cube.applySequence(this.state.scramble);

    let eoMovesLimit = Number(this.state.maxMoves);
    console.log(cube.getEoList(eoMovesLimit, AXIS.UD_AXIS));
  };

  render() {
    let scrambleIsValid = isValid(this.state.scramble);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>EO Finder</h3>
          </div>
        </div>
        <form className="row justify-content-center">
          <div className="col-12">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Scramble</span>
              </div>
              <input
                type="text"
                className={
                  "form-control" + (!scrambleIsValid ? " bg-danger" : "")
                }
                required
                value={this.state.scramble}
                onChange={this.handleScrambleChange}
                min={1}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  Maximum number of moves
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                required
                value={this.state.maxMoves}
                onChange={this.handleMaxMovesChange}
                min={1}
                max={MAX_SOLUTION_SIZE}
              />
            </div>
            <div className="btn-group m-2" role="group">
              <button
                type="submit"
                className="btn btn-group btn-primary"
                onClick={this.handleClick}
                disabled={!scrambleIsValid}
                title={scrambleIsValid ? "" : "Invalid scramble"}
              >
                Find EOs
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EOFinder;
