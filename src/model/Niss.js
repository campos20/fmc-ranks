import Cube from "./Cube";
import { areValidMoves } from "../util/move.util";
import { invert } from "../util/move.util";

export default class Niss {
  constructor(preMoves, moves) {
    this.preMoves = preMoves || [];
    this.moves = moves || [];
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
    result.add(String.join(" ", this.moves));
    if (this.preMoves.length !== 0) {
      result.add("(" + String.join(" ", this.preMoves) + ")");
    }

    return String.join(" ", result).trim();
  }

  isValid() {
    return areValidMoves(this.moves) && areValidMoves(this.preMoves);
  }

  getSize() {
    return this.moves.length + this.preMoves.length;
  }
}
