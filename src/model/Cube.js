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
  UD_FACES,
  RL_FACES,
  FB_FACES,
} from "../constants/sticker.constants";
import AXIS from "../constants/axis.constants";

export default class Cube {
  ALLOWED_MOVES = [
    "U2",
    "F2",
    "R2",
    "D2",
    "B2",
    "L2",
    "U'",
    "F'",
    "R'",
    "D'",
    "B'",
    "L'",
    "U",
    "F",
    "R",
    "D",
    "B",
    "L",
  ];

  uColor;
  rColor;
  fColor;
  dColor;
  lColor;
  bColor;

  oppositeColorsUD;
  oppositeColorsRL;
  oppositeColorsFB;

  stickers = 54;
  FACE_ORDER = "URFDLB";
  FACE_SIZE = 9; // Each face has 9 stickers
  FACES = 6;

  // Face order: U R F D L B
  // Each face is written using the reading order
  state;

  constructor() {
    this.buildInitialState();
    this.updateReferenceColors();
  }

  /*
  constructor(state) {
    this.state = [...state];
    updateReferenceColors();
  }

  constructor(niss, scramble) {
    buildInitialState();

    this.applySequence(MoveUtil.invert(niss.getPreMoves()));
    this.applySequence(scramble);
    this.applySequence(niss.getMoves());
    updateReferenceColors();
  }
*/

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

  buildInitialState = () => {
    let state = [];
    for (let i = 0; i < this.stickers; i++) {
      state[i] = i;
    }
    this.state = state;
  };

  updateReferenceColors = () => {
    this.uColor = this.shortToFace(this.state[4]);
    this.rColor = this.shortToFace(this.state[13]);
    this.fColor = this.shortToFace(this.state[22]);
    this.dColor = this.shortToFace(this.state[31]);
    this.lColor = this.shortToFace(this.state[40]);
    this.bColor = this.shortToFace(this.state[49]);

    this.oppositeColorsUD = [this.uColor, this.dColor];
    this.oppositeColorsRL = [this.rColor, this.lColor];
    this.oppositeColorsFB = [this.fColor, this.bColor];
  };

  // Performs "R U R' U'"
  applySequence(sequence) {
    sequence.split(" ").forEach(this.applyMove);
  }

  applyMoves = (moves) => {
    moves.forEach((move) => {
      this.applyMove(move);
    });
  };

  // No checks in favor of spped, but state.length == cube,length
  applyCubeState(state) {
    let c = [...this.state];
    for (let i = 0; i < this.state.length; i++) {
      this.state[i] = c[state[i]];
    }
  }

  isOriented(axis) {
    let goodEdges = this.getGoodEdgesIndex(axis);
    let badEdges = this.getBadEdgesIndex(axis);

    let goodColors = this.getGoodColors(axis);
    let badColors = this.getBadColors(axis);

    for (let i = 0; i < goodEdges.length; i++) {
      for (let j = 0; j < goodEdges[i].length; j++) {
        let color = this.shortToFace(this.state[goodEdges[i][j]]);
        let attachedColor = this.shortToFace(this.state[badEdges[i][j]]);

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

  getGoodColors(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return this.oppositeColorsFB;
      case AXIS.RL_AXIS:
        return this.oppositeColorsUD;
      default:
        return this.oppositeColorsUD;
    }
  }

  getBadColors(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return this.oppositeColorsRL;
      case AXIS.RL_AXIS:
        return this.oppositeColorsFB;
      default:
        return this.oppositeColorsRL;
    }
  }

  getGoodEdgesIndex(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return UD_GOOD;
      case AXIS.RL_AXIS:
        return RL_GOOD;
      default:
        return FB_GOOD;
    }
  }

  getBadEdgesIndex(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return UD_BAD;
      case AXIS.RL_AXIS:
        return RL_BAD;
      default:
        return FB_BAD;
    }
  }

  getStickers(axis) {
    switch (axis) {
      case AXIS.UD_AXIS:
        return UD_FACES;
      case AXIS.RL_AXIS:
        return RL_FACES;
      default:
        return FB_FACES;
    }
  }

  shortToFace(c) {
    return Math.floor(c / this.FACE_SIZE);
  }

  getEoList(size, axis) {
    let eoMoves = [];

    // Using the reminder, we can get every possible move sequence
    for (let i = 0; i < Math.pow(this.ALLOWED_MOVES.length, size); i++) {
      let currentMoves = this.makeNumberIntoMoves(i, size);

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
  makeNumberIntoMoves(n, size) {
    let result = [];
    while (result.length < size) {
      let index = n % this.ALLOWED_MOVES.length;
      result.unshift(this.ALLOWED_MOVES[index]);

      n = Math.floor(n / this.ALLOWED_MOVES.length);
    }
    return result;
  }
}
