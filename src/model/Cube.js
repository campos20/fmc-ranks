import breakEoOnAxis from "../util/niss.util";
import { willChangeEo } from "../util/move.util";

import {
  U_MOVE,
  R_MOVE,
  F_MOVE,
  D_MOVE,
  L_MOVE,
  B_MOVE,
  UD_GOOD,
  RL_GOOD,
  FB_GOOD,
  UD_BAD,
  RL_BAD,
  FB_BAD,
} from "../constants/sticker.constants";
import AXIS from "../constants/axis.constants";

export default class Cube {
  static ALLOWED_MOVES = [
    "U2",
    "R2",
    "F2",
    "D2",
    "L2",
    "B2",
    "U'",
    "R'",
    "F'",
    "D'",
    "L'",
    "B'",
    "U",
    "R",
    "F",
    "D",
    "L",
    "B",
  ];

  static uColor = 0;
  static rColor = 1;
  static fColor = 2;
  static dColor = 3;
  static lColor = 4;
  static bColor = 5;

  static oppositeColorsUD = [Cube.uColor, Cube.dColor];
  static oppositeColorsRL = [Cube.rColor, Cube.lColor];
  static oppositeColorsFB = [Cube.fColor, Cube.bColor];

  static FACE_ORDER = "URFDLB";
  static FACE_SIZE = 9; // Each face has 9 stickers
  static FACES = 6;
  static STICKERS = Cube.FACE_SIZE * Cube.FACES;

  // Face order: U R F D L B
  // Each face is written using the reading order
  // state = [0, ..., 53]
  state = Array.from(Array(Cube.STICKERS).keys());

  /**
   * Distance = 1, regular move, distance = 2, double move, distance = -1, counter
   * clockwise
   *
   */
  applyMoveWithDistance(permutation, distance) {
    let c = [...this.state];
    permutation.permutations.forEach((perm) => {
      let length = perm.length;
      for (let i = length - 1; i >= 0; i--) {
        this.state[perm[i]] = c[perm[(i - distance + length) % length]];
      }
    });
  }

  // No checks, but it's ok for now
  applyMove = (move) => {
    let face = move[0];
    let modifier = move[move.length - 1];

    let distance = modifier === "2" ? 2 : modifier === "'" ? -1 : 1;

    switch (face) {
      case "U": {
        this.applyMoveWithDistance(U_MOVE, distance);
        break;
      }
      case "R": {
        this.applyMoveWithDistance(R_MOVE, distance);
        break;
      }
      case "F": {
        this.applyMoveWithDistance(F_MOVE, distance);
        break;
      }
      case "D": {
        this.applyMoveWithDistance(D_MOVE, distance);
        break;
      }
      case "L": {
        this.applyMoveWithDistance(L_MOVE, distance);
        break;
      }
      default: {
        // B
        this.applyMoveWithDistance(B_MOVE, distance);
        break;
      }
    }
  };

  // Performs "R U R' U'"
  applySequence(sequence) {
    sequence.split(" ").forEach(this.applyMove);
  }

  // Performs "[R, U, R', U']"
  applyMoves = (moves) => {
    moves.forEach((move) => {
      this.applyMove(move);
    });
  };

  // No checks in favor of spped, but state.length === cube,length
  // Apply a cube state into another cube
  applyCubeState(state) {
    let c = [...this.state];
    for (let i = 0; i < this.state.length; i++) {
      this.state[i] = c[state[i]];
    }
  }

  isOriented(axis) {
    let goodEdges = Cube.getGoodEdgesIndex(axis);
    let badEdges = Cube.getBadEdgesIndex(axis);

    let goodColors = Cube.getGoodColors(axis);
    let badColors = Cube.getBadColors(axis);

    for (let i = 0; i < goodEdges.length; i++) {
      for (let j = 0; j < goodEdges[i].length; j++) {
        let color = Cube.shortToFace(this.state[goodEdges[i][j]]);
        let attachedColor = Cube.shortToFace(this.state[badEdges[i][j]]);

        if (color === badColors[0] || color === badColors[1]) {
          return false;
        } else if (
          attachedColor === goodColors[0] ||
          attachedColor === goodColors[1]
        ) {
          return false;
        }
      }
    }
    return true;
  }

  static getGoodColors(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return Cube.oppositeColorsFB;
      case AXIS.RL_AXIS:
        return Cube.oppositeColorsUD;
      default:
        return Cube.oppositeColorsUD;
    }
  }

  static getBadColors(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return Cube.oppositeColorsRL;
      case AXIS.RL_AXIS:
        return Cube.oppositeColorsFB;
      default:
        return Cube.oppositeColorsRL;
    }
  }

  static getGoodEdgesIndex(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return UD_GOOD;
      case AXIS.RL_AXIS:
        return RL_GOOD;
      default:
        return FB_GOOD;
    }
  }

  static getBadEdgesIndex(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return UD_BAD;
      case AXIS.RL_AXIS:
        return RL_BAD;
      default:
        return FB_BAD;
    }
  }

  // Faces are 012...8
  // Each face 0 has stickers 0-8, face 1 has 9-17. We convert this number to its face
  static shortToFace(c) {
    return Math.floor(c / this.FACE_SIZE);
  }

  getEoList(size, axis) {
    let eoMoves = [];

    // Using the reminder, we can get every possible move sequence
    for (let i = 0; i < Math.pow(Cube.ALLOWED_MOVES.length, size); i++) {
      let currentMoves = Cube.makeNumberIntoMoves(i, size);

      let lastMove = currentMoves[currentMoves.length - 1];

      if (!willChangeEo(lastMove, axis)) {
        continue;
      }

      breakEoOnAxis(currentMoves, axis).forEach((niss) => {
        let cube = niss.apply(this);
        if (cube.isOriented(axis)) {
          eoMoves.push(niss);
        }
      });
    }
    return eoMoves;
  }

  // Helps into generating every possible move sequence up to n moves
  static makeNumberIntoMoves(n, size) {
    let result = [];
    while (result.length < size) {
      let index = n % this.ALLOWED_MOVES.length;
      result.unshift(this.ALLOWED_MOVES[index]);

      n = Math.floor(n / this.ALLOWED_MOVES.length);
    }
    return result;
  }
}
