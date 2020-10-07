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
    result.push(this.moves.join(" "));
    if (this.preMoves.length !== 0) {
      result.push("(" + this.preMoves.join(" ") + ")");
    }

    return result.join(" ");
  }

  isValid() {
    return areValidMoves(this.moves) && areValidMoves(this.preMoves);
  }

  getSize() {
    return this.moves.length + this.preMoves.length;
  }
}
