import React, { Component } from "react";
import { ScrambleDisplay } from "scramble-display"; // Actually, this is used

class ScrambleImagesTable extends Component {
  state = { copiedToClipboardIndex: null, image3d: false };

  setCopiedToClipboard = (i) => {
    this.setState({ ...this.state, copiedToClipboardIndex: i });

    // Copy to clipboard
    var scramble = document.createElement("textarea");
    document.body.appendChild(scramble);
    scramble.value = i + 1 + ". " + this.props.scrambles[i];
    scramble.select();
    document.execCommand("copy");
    document.body.removeChild(scramble);
  };

  handleImage3d = () => {
    this.setState({ ...this.state, image3d: !this.state.image3d });
  };

  render() {
    if (!this.props.scrambles) {
      return null;
    }

    return (
      <React.Fragment>
        {this.props.scrambles.length > 0 && (
          <div className="row">
            <div className="col-6 text-left text-muted">
              You can click to copy
            </div>
            <div className="form-check col-6 text-right">
              <input
                type="checkbox"
                className="form-check-input"
                value={this.state.image3d}
                onClick={this.handleImage3d}
                id="image3dcheck"
              />
              <label className="form-check-label" htmlFor="image3dcheck">
                3D image
              </label>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12">
            <table className="table table-condensed">
              <tbody>
                {this.props.scrambles.map((scramble, i) => {
                  return (
                    <tr key={i}>
                      <td
                        className="align-middle"
                        onClick={(e) => this.setCopiedToClipboard(i)}
                      >
                        <div className="row text-center">{`${
                          i + 1
                        }. ${scramble}`}</div>
                        <div className="row text-right text-muted">
                          &nbsp;
                          {this.state.copiedToClipboardIndex === i
                            ? "Copied"
                            : ""}
                        </div>
                      </td>
                      <td className="text-left">
                        <scramble-display
                          event="333"
                          scramble={scramble}
                          visualization={this.state.image3d ? "3D" : "2D"}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ScrambleImagesTable;
