import React, { Component } from "react";
import {
  getName,
  getConsecutiveValids,
  isValidLine,
  outputFormat,
} from "../util/result.util";
import { Result, compareResults } from "./Result";

class Rank extends Component {
  render() {
    let data = this.props.data
      .filter((line) => isValidLine(line, this.props.attempts))
      .map((line) => {
        let name = getName(line);
        let results = getConsecutiveValids(line, this.props.attempts);
        return new Result(results, name);
      })
      .sort(compareResults);

    return (
      <table class="table table-condensed table-bordered">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Name</th>
            {[...Array.apply(null, { length: this.props.attempts })].map(
              (e, i) => (
                <th key={i}>{`R${i + 1}`}</th>
              )
            )}
            <th>Mean</th>
          </tr>
        </thead>
        <tbody>
          {data.map((result, i) => {
            return (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{result.name}</td>
                {result.results.map((r, j) => (
                  <td key={j}>{r}</td>
                ))}
                <th>{outputFormat(result.avg)}</th>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Woaj</th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default Rank;
