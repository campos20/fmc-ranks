import React, { Component } from "react";
import { getFmcScrambles } from "../api/scramble.web.api";
import { ScrambleDisplay } from "scramble-display"; // Actually, this is used

class GenerateScrambles extends Component {
  state = {
    scrambles: [], // Put scrambles here for making developing quicker
    numberOfScrambles: 3,
    loading: false,
    error: "",
    image3d: false,
    copiedToClipboardIndex: null,
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
          copiedToClipboardIndex: null, // In case there was a coppied scramble and we generate more
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
                        <td
                          className="align-middle"
                          onClick={(e) => this.setCopiedToClipboard(i)}
                        >
                          <div className="row text-center">{`${
                            i + 1
                          }. ${scramble}`}</div>
                          <div className="row text-right text-muted">
                            &nbsp;
                            {this.state.copiedToClipboardIndex === i
                              ? "Copied"
                              : ""}
                          </div>
                        </td>
                        <td className="text-left">
                          <scramble-display
                            event="333"
                            scramble={scramble}
                            visualization={this.state.image3d ? "3D" : "2D"}
                          />
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
