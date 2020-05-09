import React, { Component } from "react";

class GenerateScrambles extends Component {
  state = {};
  render() {
    return (
      <form>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              @
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </form>
    );
  }
}

export default GenerateScrambles;
