import React, { Component } from "react";
import { getFmcScrambles } from "../api/scramble.web.api";
import { ScrambleDisplay } from "scramble-display";

class GenerateScrambles extends Component {
  state = {
    scrambles: [
      "R' U' F U2 R' F2 U' L' D F D' B R' B U2 D2 R D2 L2 B2 L2 F2 D2 R' U' F",
      "R' U' F R' F R' L2 U2 L F B L' U R2 F2 D2 R' B2 D2 R L2 U2 F' R' U' F",
      "R' U' F L2 U' B2 D2 F D2 R2 F L2 U2 F2 L2 D R F2 U2 L' U2 L' F2 R' U' F",
    ],
    numberOfScrambles: 3,
    loading: false,
    error: "",
  };

  handleNumberOfScramblesChange = (e) => {
    this.setState({ ...this.state, numberOfScrambles: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setLoading(true);
    getFmcScrambles(this.state.numberOfScrambles)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          ...this.state,
          scrambles: data.scrambles,
          loading: false,
          error: "",
        })
      )
      .catch((error) => {
        console.log(error);
        this.setLoading(false);
        this.setError("Error while generating scrambles.");
      });
  };

  setLoading = (flag) => {
    this.setState({ ...this.state, loading: flag });
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
            <div className="btn-group m-2" role="group">
              <button
                type="submit"
                className="btn btn-group btn-primary"
                onClick={this.handleClick}
              >
                Generate Scrambles
              </button>
            </div>
          </div>
        </form>

        {this.state.loading && (
          <div className="row m-3">
            <div className="col-12">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}

        {!!this.state.error && (
          <div className="row m-3">
            <div className="col-12">
              <div className="bg-danger text-white">
                <span>{this.state.error}</span>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12">
            <table className="table table-condensed">
              <tbody>
                {!!this.state.scrambles &&
                  this.state.scrambles.map((scramble, i) => {
                    return (
                      <tr key={i}>
                        <td className="align-middle">{`${
                          i + 1
                        }. ${scramble}`}</td>
                        <td className="text-left">
                          <scramble-display event="333fm" scramble={scramble} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default GenerateScrambles;
