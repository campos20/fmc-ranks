import React, { Component } from "react";
import ScrambleImagesTable from "./ScrambleImagesTable";
import isValid from "../util/move.util";

class ScrambleImage extends Component {
  state = { content: "", validScrambles: [] };

  handleContentChange = (e) => {
    this.setState({ ...this.state, content: e.target.value });
  };

  handleClick = () => {
    let validScrambles = this.state.content.split("\n").filter(isValid);
    this.setState({ ...this.state, validScrambles });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="p-2">Generate Scramble Images</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="input-group">
              <textarea
                className="form-control"
                value={this.state.content}
                onChange={this.handleContentChange}
                placeholder="Place scrambles 1 each line"
                required
                rows="8"
              />
            </div>
          </div>
        </div>

        <div className="btn-group m-2" role="group">
          <button
            className="btn btn-group btn-primary"
            onClick={this.handleClick}
          >
            Generate Images
          </button>
        </div>
        <ScrambleImagesTable scrambles={this.state.validScrambles} />
      </div>
    );
  }
}

export default ScrambleImage;
