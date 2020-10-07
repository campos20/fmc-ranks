import React, { Component } from "react";
import { isValid } from "../util/move.util";

import Cube from "../model/Cube";
import AXIS from "../constants/axis.constants";
import Loading from "./Loading";

const MAX_SOLUTION_SIZE = 5;

class EOFinder extends Component {
  state = {
    maxMoves: "4",
    scramble: "",
    eoList: [],
    eosLeft: 0,
    loaded: false,
  };

  handleScrambleChange = (e) => {
    this.setState({ ...this.setState, scramble: e.target.value });
  };

  handleMaxMovesChange = (e) => {
    this.setState({ ...this.setState, maxMoves: e.target.value });
  };

  handleSubmit = () => {
    let keys = Object.keys(AXIS);

    let eoMovesLimit = Number(this.state.maxMoves);

    // Clear EO list for now
    // We use eosLeft to show a spinner
    this.setState({
      ...this.state,
      eoList: [],
      eosLeft: keys.length * eoMovesLimit,
      loaded: false,
    });

    let cube = new Cube();
    cube.applySequence(this.state.scramble);

    // TODO handle cube already oriented
    // We could check if cube.isOriented(axis) and display a F0 or something.

    // Async
    for (let size = 1; size <= eoMovesLimit; size++) {
      keys.forEach((axis) =>
        setTimeout(() => {
          let eoList = cube.getEoList(size, axis);
          this.setState({
            ...this.state,
            eoList: [...this.state.eoList, ...eoList],
            eosLeft: this.state.eosLeft - 1,
            loaded: true,
          });
        }, 0)
      );
    }
  };

  render() {
    let scrambleIsValid = isValid(this.state.scramble);
    let eoList = this.state.eoList;
    let eosFound = eoList.length;

    // Sort by solution size.
    eoList.sort((a, b) => (a.getSize() > b.getSize() ? 1 : -1));
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>EO Finder</h3>
          </div>
        </div>
        <form
          className="row justify-content-center"
          onSubmit={this.handleSubmit}
        >
          <div className="col-12">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Scramble</span>
              </div>
              <input
                type="text"
                className="form-control"
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
              <button type="submit" className="btn btn-group btn-primary">
                Find EOs
              </button>
            </div>
          </div>
        </form>
        {this.state.eosLeft > 0 && <Loading />}
        {this.state.loaded && eosFound === 0 && (
          <div className="alert alert-info">No EOs found.</div>
        )}
        {eosFound > 0 && (
          <React.Fragment>
            <p>Found {eosFound} EOs.</p>
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
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default EOFinder;
