import React, { Component } from "react";

class Rank extends Component {
  render() {
    return (
      <div className="container">
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
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default Rank;
