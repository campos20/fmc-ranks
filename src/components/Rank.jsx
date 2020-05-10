import React, { Component } from "react";
import {
  getName,
  getConsecutiveValids,
  isValidLine,
  outputFormat,
  avg,
} from "../util/result.util";
import { Result, compareResults } from "./Result";

const woajStyle = [
  { fontWeight: "bold", backgroundColor: "rgb(255, 204, 0)" },
  { fontWeight: "bold", backgroundColor: "rgb(180, 180, 180)" },
  { fontWeight: "bold", backgroundColor: "rgb(230, 77, 0)" },
];

// At leas 10 results so we can split columns
const MINIMUM_SPLIT_POINT = 10;

class Rank extends Component {
  render() {
    // Clear results and sort by avg then single
    let data = this.props.data
      .filter((line) => isValidLine(line, this.props.attempts))
      .map((line) => {
        let name = getName(line);
        let results = getConsecutiveValids(line, this.props.attempts);
        return new Result(results, name);
      })
      .sort(compareResults);

    // Woajs for formatting
    let woaj = []; // List of lists with ordered results
    for (let i = 0; i < this.props.attempts; i++) {
      woaj.push([...new Set(data.map((result) => result.results[i]))].sort());
    }
    let woajs = woaj.map((r) => r[0]); // Best result of each attempt
    let woajMean = avg(woajs); // Mean of the best results

    // Fixed style
    let resultWidth = 50.0 / (this.props.attempts + 1); // +1 for mean
    let posWidth = 50 * 0.2;
    let nameWidth = 50 - posWidth;

    let resultStyle = { width: `${resultWidth / this.props.columns}%` };
    let posStyle = { width: `${posWidth / this.props.columns}%` };
    let nameStyle = { width: `${nameWidth / this.props.columns}%` };

    return (
      <table className="table table-condensed table-bordered">
        <thead className="bg-secondary text-white">
          <tr>
            {Array.from({ length: this.props.columns }).map((e, k) => {
              console.log(e, k);
              return (
                <React.Fragment key={k}>
                  <th style={posStyle}>Pos</th>
                  <th style={nameStyle}>Name</th>
                  {[...Array.apply(null, { length: this.props.attempts })].map(
                    (_, i) => (
                      <th key={i} style={resultStyle}>{`R${i + 1}`}</th>
                    )
                  )}
                  <th style={resultStyle}>Mean</th>
                </React.Fragment>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((result, i) => {
            return (
              <tr key={i}>
                <th>
                  {i === 0 || compareResults(data[i], data[i - 1]) !== 0
                    ? i + 1
                    : "-"}
                </th>
                <td>{result.name}</td>
                {result.results.map((r, j) => {
                  // Highlight first 3
                  let woajIndex = woaj[j].indexOf(r);
                  let style = {};
                  if (woajIndex < woajStyle.length) {
                    style = woajStyle[woajIndex];
                  }
                  return (
                    <td key={j} style={style}>
                      {r}
                    </td>
                  );
                })}
                <th>{outputFormat(result.avg)}</th>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th />
            <th>Woaj</th>
            {woajs.map((r, i) => (
              <th key={i} style={woajStyle[0]}>
                {r}
              </th>
            ))}
            <th style={woajStyle[0]}>{outputFormat(woajMean)}</th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default Rank;
