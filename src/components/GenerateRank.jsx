import React, { Component } from "react";

class GenerateRank extends Component {
  state = { attempts: 3, content: "" };

  handleAttemptsChange = (e) => {
    this.setState({ ...this.state, attempts: e.target.value });
  };

  handleContentChange = (e) => {
    this.setState({ ...this.state, content: e.target.value });
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
                <div className="input-group-prepend">
                  <span className="input-group-text">Raw content</span>
                </div>
                <textarea
                  className="form-control"
                  value={this.state.content}
                  onChange={this.handleContentChange}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Attempts</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={this.state.attempts}
                  onChange={(e) => this.handleAttemptsChange(e)}
                  min={1}
                />
              </div>
              <div className="btn-group m-2" role="group">
                <button
                  type="submit"
                  className="btn btn-group btn-success"
                  onClick={this.handleClick}
                >
                  Generate
                </button>
                <button
                  type="button"
                  className="btn btn-group btn-primary"
                  onClick={this.handleClick}
                >
                  Shrink Data
                </button>
                <button
                  type="reset"
                  className="btn btn-group btn-warning"
                  onClick={this.handleClick}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default GenerateRank;
