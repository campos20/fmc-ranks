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

const positionStyle = {
  backgroundColor: "rgb(57, 181, 90)",
};

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

    let numberOfLines = Math.ceil(data.length / this.props.columns);

    let tfoot = (
      <tfoot>
        <tr>
          {this.props.columns === 1 && <th />}
          <th>Woaj</th>
          {woajs.map((r, i) => (
            <th key={i} style={woajStyle[0]}>
              {r}
            </th>
          ))}
          <th style={woajStyle[0]}>{outputFormat(woajMean)}</th>
        </tr>
      </tfoot>
    );

    let tableClass = "table table-condensed table-bordered m-0 p-0";

    return (
      <React.Fragment>
        <table className={tableClass}>
          <thead className="bg-secondary text-white">
            <tr>
              {Array.from({ length: this.props.columns }).map((_, k) => {
                return (
                  <React.Fragment key={k}>
                    <th style={posStyle}>Pos</th>
                    <th style={nameStyle}>Name</th>
                    {[
                      ...Array.apply(null, { length: this.props.attempts }),
                    ].map((_, i) => (
                      <th key={i} style={resultStyle}>{`R${i + 1}`}</th>
                    ))}
                    <th style={resultStyle}>Mean</th>
                  </React.Fragment>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numberOfLines }).map((_, i) => {
              return (
                <tr key={i}>
                  {Array.from({ length: this.props.columns }).map((_, j) => {
                    let dataIndex = j * numberOfLines + i;
                    if (dataIndex >= data.length) {
                      return null;
                    }
                    let result = data[dataIndex];
                    return (
                      <React.Fragment key={j}>
                        <th style={positionStyle}>{dataIndex + 1}</th>
                        <td>{result.name}</td>
                        {result.results.map((r, k) => {
                          let woajIndex = woaj[k].indexOf(r);
                          let style = {};
                          if (woajIndex < woajStyle.length) {
                            style = woajStyle[woajIndex];
                          }
                          return (
                            <td key={k} style={style}>
                              {r}
                            </td>
                          );
                        })}
                        <td>{outputFormat(result.avg)}</td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {this.props.columns === 1 && tfoot}
        </table>
        {this.props.columns > 1 && <table class={tableClass}>{tfoot}</table>}
      </React.Fragment>
    );
  }
}

export default Rank;
