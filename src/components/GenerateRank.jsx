import React, { Component } from "react";
import { isValidLine } from "../util/result.util";
import Rank from "./Rank";

const getMaxTrim = (n) => Math.max(0, Math.floor((n - 1) / 2));

class GenerateRank extends Component {
  /*componentDidMount() {
    // simulates a click to generate. Helps developing
    let f = () => null;
    this.handleGenerate({ preventDefault: f });
  }*/

  state = {
    attempts: 3,
    columns: 1,
    trim: 0,
    data: [],
    content: ``, // Paste the raw data here for developing
  };

  handleAttemptsChange = (e) => {
    let attempts = Number(e.target.value);
    this.setState({
      ...this.state,
      attempts: attempts,
      trim: Math.min(this.state.trim, getMaxTrim(attempts)), // In case we change attempts, we update trim
    });
  };

  handleContentChange = (e) => {
    this.setState({ ...this.state, content: e.target.value });
  };

  handleShrinkData = () => {
    let out = [];
    this.state.content.split("\n").forEach((line) => {
      if (isValidLine(line, this.state.attempts)) {
        out.push(line.trim());
      }
    });

    // Change the raw content to the valid one
    this.setState({ ...this.state, content: out.join("\n") });
  };

  handleGenerate = (e) => {
    e.preventDefault();
    this.handleShrinkData();

    // Split the content into lines to generate
    this.setState({ ...this.state, data: this.state.content.split("\n") });
  };

  handleReset = () => {
    this.setState({ ...this.state, content: "" });
  };

  handleColumnsChange = (e) => {
    this.setState({ ...this.state, columns: Number(e.target.value) });
  };

  handleTrimChange = (e) => {
    this.setState({ ...this.state, trim: Number(e.target.value) });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Generate Rank</h3>
          </div>
        </div>
        <form>
          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <textarea
                  className="form-control"
                  value={this.state.content}
                  onChange={this.handleContentChange}
                  placeholder="Raw content"
                  required
                  rows="8"
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="btn-group m-2" role="group">
                <button
                  type="submit"
                  className="btn btn-group btn-success"
                  onClick={this.handleGenerate}
                >
                  Generate
                </button>
                <button
                  type="button"
                  className="btn btn-group btn-primary"
                  onClick={this.handleShrinkData}
                >
                  Shrink Data
                </button>
                <button
                  type="reset"
                  className="btn btn-group btn-warning"
                  onClick={this.handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="row">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Attempts</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={this.state.attempts}
                  onChange={this.handleAttemptsChange}
                  min={1}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">Columns</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={this.state.columns}
                  onChange={this.handleColumnsChange}
                  min={1}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">Trim</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={this.state.trim}
                  onChange={this.handleTrimChange}
                  min={0}
                  max={getMaxTrim(this.state.attempts)}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="row justify-content-center">
          <div className="col-12">
            <Rank
              attempts={this.state.attempts}
              data={this.state.data}
              columns={this.state.columns}
              trim={this.state.trim}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GenerateRank;
