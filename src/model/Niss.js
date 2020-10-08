import Cube from "./Cube";
import { areValidMoves } from "../util/move.util";
import { invert, areParallel } from "../util/move.util";

export default class Niss {
  constructor(preMoves, moves) {
    this.preMoves = preMoves;
    this.moves = moves;
  }

  apply(cube) {
    let c = new Cube();

    c.applyMoves(invert(this.preMoves));
    c.applyCubeState(cube.state);
    c.applyMoves(this.moves);

    return c;
  }

  toString() {
    let result = [];
    result.push(this.moves.join(" "));
    if (this.preMoves.length !== 0) {
      result.push("(" + this.preMoves.join(" ") + ")");
    }

    return result.join(" ");
  }

  isValid() {
    if (!areValidMoves(this.moves)) {
      return false;
    }

    if (!areValidMoves(this.preMoves)) {
      return false;
    }

    // Since this is used just for EO checking, we exclude B2 F
    if (
      this.moves.length > 1 &&
      areParallel(
        this.moves[this.moves.length - 1],
        this.moves[this.moves.length - 2]
      )
    ) {
      return false;
    }

    if (
      this.preMoves.length > 1 &&
      areParallel(
        this.preMoves[this.preMoves.length - 1],
        this.preMoves[this.preMoves.length - 2]
      )
    ) {
      return false;
    }

    return true;
  }

  getSize() {
    return this.moves.length + this.preMoves.length;
  }
}
