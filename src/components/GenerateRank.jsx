import React, { Component } from "react";
import { isValidLine } from "../util/result.util";
import Rank from "./Rank";

const getMaxTrim = (n) => Math.max(0, Math.floor((n - 1) / 2));

class GenerateRank extends Component {
  componentDidMount() {
    // simulates a click to generate. Helps developing
    let f = () => null;
    this.handleGenerate({ preventDefault: f });
  }

  state = {
    attempts: 12,
    columns: 1,
    trim: 0,
    data: [],
    content: `Carter Kucala 19, 23, 26, 21, 21, 20, 23, 24, 23, 22, 21, 22 = 22.0
    4
    Oculte ou denuncie isso
    Curtir
     · Responder · 1 sem · Editado
    Jack Love
    Jack Love 24, (21), 30, 23, 26, 30, 27, (31), 24, 29, 25, 27 = 26.50
    1
    Oculte ou denuncie isso
    Curtir
     · Responder · 1 sem
    Teh Keng Foo
    Teh Keng Foo 21, 21, (26), 25, 22, 24, 22, 23, 25, 25, (20), 23 = 23.10
    Oculte ou denuncie isso
    Curtir
     · Responder · 1 sem
    Jonas Rongé
    Jonas Rongé 36, 33, 32, 25, 35, 29, 31, 36, 36, 29, 32, 36 = 32.90 not happy at all with the average
    Oculte ou denuncie isso
    Curtir
     · Responder · 1 sem
    Lucas Morton
    Lucas Morton 24, 24, 23, 24, 19, 26, 26, 22, 23, 24, 20, 22 = 23.2 wtf
    Oculte ou denuncie isso
    Curtir
     · Responder · 1 sem · Editado
    Henrique Vasconcelos
    Henrique Vasconcelos 27, 31, 30, 28, DNF, 27, 28, DNF, 31, 28, DNF, 27 = DNF 😭
    Oculte ou denuncie isso
    Curtir
     · Responder · 1 sem · Editado
    Louis Sarthou
    Louis Sarthou 23, 26, 35, 25, 26, 31, 31, 28 [...]
    1
    Oculte ou denuncie isso
    Curtir
     · Responder · 1 sem · Editado
    Cale Schoon
    Cale Schoon 21, 28, 26, 25, 24, 23, 26, 23, 22, 28, 21, 26 = 24.4
    1
    Oculte ou denuncie isso
    Curtir
     · Responder · 1 sem
    Jay McNeill
    Jay McNeill 27.00
    1. 28 …Ver mais
    1
    Oculte ou denuncie isso
    Curtir
     · Responder · 5 d
    Tommy Kiprillis
    Tommy Kiprillis 21, (23), 22, 21, 20, 20, 22, 23, 21, 22, (19), 21 = 21.3 woaah I think that's good
    4
    Oculte ou denuncie isso
    Curtir
     · Responder · 5 d
    Kevin Min
    Kevin Min Tommy Kiprillis when every single attempt is better than the 2nd place mean (so far)
    Oculte ou denuncie isso
    Curtir
     · Responder · 5 d
    Zachary Ochs
    Zachary Ochs 22, 23, 30, 26, 26, 20, 23, 23, 23, 22, 25, 23 = 23.60
    This is PB by a move, not counting it though since i did solves in between this
    Oculte ou denuncie isso
    Curtir
     · Responder · 5 d · Editado
    Owen Widdis
    Owen Widdis 25, 29, (30), 26, 25, 29, 29, 26, 25, 29, 27, (25) = 27.00
    This ao12 isn't very good for me and I had a ton of mistakes throughout. I still have a long way to go.
    Oculte ou denuncie isso
    Curtir
     · Responder · 5 d
    Krish Shah-Nathwani
    Krish Shah-Nathwani 22, 27, 29, DNF, 25,27, 25, 26, 23, 23, 27, 25 = 25.7 ao12
    Oculte ou denuncie isso
    Curtir
     · Responder · 5 d
    Kerry Creech
    Kerry Creech 25, DNF, 32, DNF, 23, DNF, 30, 24, 23, 25, 24, 29 = DNF :(
    Some good solves in there though!`, // Paste the raw data here for developing
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
                ></textarea>
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GenerateRank;
