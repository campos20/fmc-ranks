import React, { Component } from "react";
import { getName, getConsecutiveValids } from "../util/result.util";

class Rank extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Name</th>
            {[...Array.apply(0, { length: this.props.attempts })].map(
              (e, i) => (
                <th>{`R${i + 1}`}</th>
              )
            )}
            <th>Mean</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((line, i) => {
            let name = getName(line);
            let results = getConsecutiveValids(line, this.props.attempts);
            return (
              <tr>
                <th>{i + 1}</th>
                <td>{name}</td>
                {results.map((r) => (
                  <td>{r}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Rank;
