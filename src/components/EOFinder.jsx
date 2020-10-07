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
    eoList: [],
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

    Object.keys(AXIS).forEach((axis) =>
      cube.getEoList(eoMovesLimit, axis).then((eoList) =>
        this.setState({
          ...this.state,
          eoList: [...this.state.eoList, ...eoList],
        })
      )
    );

    /*    cube
      .getEoList(eoMovesLimit, AXIS.UD_AXIS)
      .then((eoList) =>
        this.setState({
          ...this.state,
          eoList: [...this.state.eoList, ...eoList],
        })
      );
    cube.getEoList(eoMovesLimit, AXIS.RL_AXIS);
    cube.getEoList(eoMovesLimit, AXIS.FB_AXIS);*/
  };

  render() {
    let scrambleIsValid = isValid(this.state.scramble);
    let eoList = [...this.state.eoList];
    eoList.sort((a, b) => (a.getSize() > b.getSize() ? 1 : -1));
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
        {eoList.length > 0 && (
          <table className="table table-striped table-hover table-bordered">
            <thead className="thead thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Size</th>
                <th scioe="col">EO</th>
              </tr>
            </thead>
            <tbody>
              {eoList.map((eo, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{eo.getSize()}</td>
                  <td>{eo.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default EOFinder;
