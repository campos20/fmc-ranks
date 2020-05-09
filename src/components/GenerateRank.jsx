import React, { Component } from "react";
import { isValidLine } from "../util/result.util";
import Rank from "./Rank";

class GenerateRank extends Component {
  state = {
    attempts: 3,
    content: `Teh Keng Foo 24, 20, 25 = 23.00
  Oculte ou denuncie isso
  Curtir
   · Responder · 3 d
  Henrique Vasconcelos
  Henrique Vasconcelos 29, 28, 25 = 27.33
  Oculte ou denuncie isso
  Curtir
   · Responder · 2 d
  Lucas Morton
  Lucas Morton 23, 20, 28=23.67
  Oculte ou denuncie isso
  Curtir
   · Responder · 2 d
  Tommy Kiprillis
  Tommy Kiprillis 21, 19, 20 = 20.00 :D :D :D :D
  9
  Oculte ou denuncie isso
  Curtir
   · Responder · 2 d
  Jonas Rongé
  Jonas Rongé 30, 23, 29 = 27.33
  Oculte ou denuncie isso
  Curtir
   · Responder · 2 d
  Tommy Kiprillis
  Tommy Kiprillis Ben Baron ?
  Oculte ou denuncie isso
  Curtir
   · Responder · 2 d
  Chong WenOnline agora
  Chong Wen 23,20,21=21.33
  Oculte ou denuncie isso
  Curtir
   · Responder · 2 d
  Ben Baron
  Ben Baron 23, 24, 25=24.00, not bad
  Oculte ou denuncie isso
  Curtir
   · Responder · 2 d
  Ben Baron
  Ben Baron Tommy Kiprillis?
  Oculte ou denuncie isso
  Curtir
   · Responder · 2 d
  Cale Schoon
  Cale Schoon 23, 21, 25 = 23.00
  1
  Oculte ou denuncie isso
  Curtir
   · Responder · 1 d
  Tommy Kiprillis
  Tommy Kiprillis Ben Baron you reacted to my comment when you hadn’t even finished the mean
  Oculte ou denuncie isso
  Curtir
   · Responder · 1 d
  Guido Dipietro
  Guido Dipietro 23, 27, 25 = 25.00, not very good bc, well, that damn 27 on the easy scramble
  Oculte ou denuncie isso
  Curtir
   · Responder · 1 d
  Jay McNeill
  Jay McNeill 24, 26, 30 = 26.67
  Even though I shat the bed on 2 of these attempts I've definitely progressed from even a week ago
  Oculte ou denuncie isso
  Curtir
   · Responder · 1 d
  Wojtek Rogoziński
  Wojtek Rogoziński 26, 26, 29 = 27.00
  Oculte ou denuncie isso
  Curtir
   · Responder · 22 h
  Krish Shah-Nathwani
  Krish Shah-Nathwani 24, 21, 27 = 24.00
  Oculte ou denuncie isso
  Curtir
   · Responder · 21 h
  Kerry Creech
  Kerry Creech 25, 20, 27 = 24.00 😀
  Oculte ou denuncie isso
  Curtir
   · Responder · 19 h
  Dohyun Kim
  Dohyun Kim 27, 26, DNF = DNF
  Oculte ou denuncie isso
  Curtir
   · Responder · `,
  };

  handleAttemptsChange = (e) => {
    this.setState({ ...this.state, attempts: e.target.value });
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
          </div>
        </form>
        <div className="row justify-content-center">
          <div class="col-12">
            <Rank attempts={this.state.attempts} data={this.state.data || []} />
          </div>
        </div>
      </div>
    );
  }
}

export default GenerateRank;
