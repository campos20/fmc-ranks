import React, { Component } from "react";
import { getFmcScrambles } from "../api/scramble.web.api";
import ScrambleImagesTable from "./ScrambleImagesTable";

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
        <ScrambleImagesTable scrambles={this.state.scrambles} />
      </div>
    );
  }
}

export default GenerateScrambles;
