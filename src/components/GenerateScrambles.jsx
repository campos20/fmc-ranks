import React, { Component } from "react";

import { getFmcScrambles } from "../api/scramble.web.api";

class GenerateScrambles extends Component {
  state = {
    scrambles: [
      "R' U' F L2 B2 L2 B' U2 F U2 F2 U2 L2 D2 F D' L R' F2 D F2 R' U2 R' U' F",
      "R' U' F U2 F2 U2 F2 U B2 L2 D' B' D' F U F' D2 R' U L U B' R' U' F",
      "R' U' F R2 B D' R2 B U' D2 R' F2 R B2 R L U2 D2 B2 L' B L D' R' U' F",
      "R' U' F D2 L2 U2 F2 D B2 U' B' R2 F2 D L D R U2 B' D2 F' R' U' F",
      "R' U' F D2 F' U' L' D L U2 B U B2 D' R2 U L2 D L2 F2 R2 L' B' R' U' F",
      "R' U' F U R' D2 U2 F2 U2 B R2 F2 D2 L' B' D' L2 R D2 L' D B' R' U' F",
      "R' U' F R2 F2 L2 D2 L2 U B R U' R2 F2 U2 F2 L D2 L D2 B D' R' U' F",
      "R' U' F D F' U R' D' L2 B2 U2 B' L F2 U D2 R2 B2 U' R2 U' L2 D' R' U' F",
    ],
    numberOfScrambles: 1,
  };

  handleNumberOfScramblesChange = (e) => {
    this.setState({ ...this.state, numberOfScrambles: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    getFmcScrambles(this.state.numberOfScrambles)
      .then((response) => response.json())
      .then((data) =>
        this.setState({ ...this.state, scrambles: data.scrambles })
      )
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Generate new Scrambles</h3>
          </div>
        </div>
        <form className="row justify-content-center">
          <div className="col-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Number of Scrambles</span>
              </div>
              <input
                type="number"
                className="form-control"
                required
                value={this.state.numberOfScrambles}
                onChange={(e) => this.handleNumberOfScramblesChange(e)}
                min={1}
              />
            </div>
            <div className="btn-group" role="group">
              <button
                type="submit"
                className="btn btn-group btn-primary"
                onClick={this.handleClick}
              >
                Generate
              </button>
            </div>
          </div>
        </form>

        <table className="table">
          <tbody>
            {!!this.state.scrambles &&
              this.state.scrambles.map((scramble, i) => {
                return (
                  <tr key={i}>
                    <td></td>
                    <td>{`${i + 1}. ${scramble}`}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GenerateScrambles;
