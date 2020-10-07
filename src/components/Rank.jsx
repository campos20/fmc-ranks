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

const dnfStyle = {
  backgroundColor: "rgb(230, 0, 0)",
};

const dnsStyle = {
  backgroundColor: "rgb(0, 138, 230)",
};

class Rank extends Component {
  render() {
    let trim = this.props.trim;

    // Clear results and sort by avg then single
    let data = this.props.data
      .filter((line) => isValidLine(line, this.props.attempts))
      .map((line) => {
        let name = getName(line);
        let results = getConsecutiveValids(line, this.props.attempts);
        return new Result(results, name, trim);
      })
      .sort(compareResults);

    if (data.length === 0) {
      return null;
    }

    // Woajs for formatting
    let woaj = []; // List of lists with ordered results
    for (let i = 0; i < this.props.attempts; i++) {
      woaj.push(
        [...new Set(data.map((result) => result.results[i]))]
          .filter((x) => !isNaN(x)) // This prevents DNF, DNS from being tagged as woaj
          .sort()
      );
    }
    let woajs = woaj.map((r) => r[0]); // Best result of each attempt
    let woajMean = avg(woajs, trim); // Mean of the best results

    // Ordered list with all woajs
    let woajMeanList = [...new Set(data.map((result) => result.avg))]
      .filter((x) => isFinite(x)) // Prevents DNF, DNS from being tagged as woaj
      .sort();

    // Fixed style
    let resultWidth = 50.0 / (this.props.attempts + 1); // +1 for mean
    let posWidth = 50 * 0.2;
    let nameWidth = 50 - posWidth;

    let resultStyle = { width: `${resultWidth / this.props.columns}%` };
    let posStyle = { width: `${posWidth / this.props.columns}%` };
    let nameStyle = { width: `${nameWidth / this.props.columns}%` };

    let numberOfLines = Math.ceil(data.length / this.props.columns);

    let sortedWoajs = [...woajs].sort();
    let woajsToTrim = [
      ...sortedWoajs.slice(0, trim),
      ...sortedWoajs.slice(sortedWoajs.length - trim, sortedWoajs.length),
    ];

    // Using this we can detach tfoot in case of multiple columns
    let tfoot = (
      <tfoot>
        <tr style={woajStyle[0]}>
          {this.props.columns === 1 && <th />}
          <th>Woaj</th>
          {woajs.map((r, i) => {
            let parenthesis = false;
            let indexInWoajsToTrim = woajsToTrim.indexOf(r);
            if (indexInWoajsToTrim >= 0) {
              parenthesis = true;
              woajsToTrim.splice(indexInWoajsToTrim, 1);
            }
            let toPrint = r || "-"; // Prevents all DNF from being blank

            return <th key={i}>{parenthesis ? `(${toPrint})` : toPrint}</th>;
          })}
          <th style={woajStyle[0]}>{outputFormat(woajMean)}</th>
        </tr>
      </tfoot>
    );

    let tableClass = "table table-condensed table-bordered m-0 p-0";

    return (
      <React.Fragment>
        <table className={tableClass}>
          <thead className="bg-dark text-white">
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
                    <th style={resultStyle}>{trim === 0 ? "Mean" : "Avg"}</th>
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

                    let sortedResults = [...result.results].sort();
                    let resultsToTrim = [
                      ...sortedResults.slice(0, trim),
                      ...sortedResults.slice(
                        sortedResults.length - trim,
                        sortedResults.length
                      ),
                    ];

                    let resultsAvg = result.avg;
                    let woajAvgIndex = woajMeanList.indexOf(resultsAvg);
                    let meanStyle = {};
                    if (woajAvgIndex < woajStyle.length) {
                      meanStyle = woajStyle[woajAvgIndex];
                    }
                    return (
                      <React.Fragment key={j}>
                        <th style={positionStyle}>
                          {dataIndex === 0 || // Print "-"" in case of ties
                          compareResults(
                            data[dataIndex],
                            data[dataIndex - 1]
                          ) !== 0
                            ? dataIndex + 1
                            : "-"}
                        </th>
                        <td>{result.name}</td>
                        {result.results.map((r, k) => {
                          let woajIndex = woaj[k].indexOf(r);
                          let style = {};

                          // Print with parenthesis if ignored during the average
                          let parenthesis = false;
                          let indexInResultsToTrim = resultsToTrim.indexOf(r);
                          if (indexInResultsToTrim >= 0) {
                            parenthesis = true;
                            resultsToTrim.splice(indexInResultsToTrim, 1);
                          }

                          if (r.toUpperCase() === "DNF") {
                            style = dnfStyle;
                          } else if (r.toUpperCase() === "DNS") {
                            style = dnsStyle;
                          } else if (woajIndex < woajStyle.length) {
                            style = woajStyle[woajIndex];
                          }
                          return (
                            <td key={k} style={style}>
                              {parenthesis ? `(${r})` : r}
                            </td>
                          );
                        })}
                        <td style={meanStyle}>{outputFormat(result.avg)}</td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {this.props.columns === 1 && tfoot}
        </table>
        {this.props.columns > 1 && (
          <table className={tableClass}>{tfoot}</table>
        )}
      </React.Fragment>
    );
  }
}

export default Rank;
