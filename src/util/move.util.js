import AXIS from "../constants/axis.constants";

const UD = "UD";
const RL = "RL";
const FB = "FB";
const PRIME = "'";

// TODO find a better way to validate scrambles
// I'm sure I'm not the first who needs it

export const isValid = (scramble) => {
  return scramble
    .trim()
    .split(" ")
    .map(isValidMove)
    .reduce((a, b) => a && b, true);
};

const allowedMoves = "UFRDLB";
const allowedModifiers = "'2";
const allowedSlices = "MSE";
const allowedRotations = "xyz";

const isValidGeneralMove = (move) => {
  if (!move) {
    return false;
  }

  if (move.length === 0 || move.length > 3) {
    return false;
  }

  return true;
};

const isFaceMove = (move) => {
  if (move.length === 1) {
    return allowedMoves.indexOf(move) >= 0;
  }

  if (move.length === 2) {
    return (
      allowedMoves.indexOf(move[0]) >= 0 &&
      allowedModifiers.indexOf(move[1]) >= 0
    );
  }

  return false;
};

export const isValidFaceMoves = (sequence) => {
  return sequence
    .trim()
    .split(" ")
    .map(isFaceMove)
    .reduce((a, b) => a && b, true);
};

const isValidMove = (move) => {
  if (!isValidGeneralMove(move)) {
    return false;
  }

  if (move.length === 1 && !isValidSingleMove(move)) {
    return false;
  }

  if (move.length === 2) {
    if (!isValidSingleMove(move[0])) {
      return false;
    }
    if (!allowedModifiers.includes(move[1]) && move[1] !== "w") {
      return false;
    }
  }

  // Uw'
  if (move.length === 3) {
    if (move[1] !== "w") {
      return false;
    }
    if (!allowedModifiers.includes(move[2])) {
      return false;
    }
    if (!isValidSingleMove(move[0])) {
      return false;
    }
  }

  return true;
};

// moved.length === 1
const isValidSingleMove = (move) =>
  allowedMoves.includes(move) ||
  allowedRotations.includes(move) ||
  allowedSlices.includes(move);

// Avoid U U2 or U D U2 on sequence
export const areValidMoves = (moves) => {
  // Check for U U2
  for (let i = 1; i < moves.length; i++) {
    if (extractFace(moves[i]) === extractFace(moves[i - 1])) {
      return false;
    }
  }

  // Check for R L2 R'
  for (let i = 2; i < moves.length; i++) {
    if (
      areParallel(moves[i], moves[i - 1]) &&
      areParallel(moves[i - 1], moves[i - 2])
    ) {
      return false;
    }
  }

  return true;
};

export const areParallel = (move1, move2) => {
  let face1 = extractFace(move1);
  let face2 = extractFace(move2);

  if (UD.indexOf(face1) >= 0) {
    return UD.indexOf(face2) >= 0;
  }

  if (RL.indexOf(face1) >= 0) {
    return RL.indexOf(face2) >= 0;
  }

  if (FB.indexOf(face1) >= 0) {
    return FB.indexOf(face2) >= 0;
  }

  throw new Error("Not mapped moves");
};

const extractFace = (move) => move[0];

export const willChangeEo = (lastMove, axis) => {
  switch (axis) {
    case AXIS.UD_AXIS:
      return willChangeUDEo(lastMove);
    case AXIS.RL_AXIS:
      return willChangeRLEo(lastMove);
    default:
      // FB
      return willChangeFBEo(lastMove);
  }
};

const willChangeFBEo = (lastMove) => {
  return willChangeEoFace(lastMove, "F", "B");
};

const willChangeUDEo = (lastMove) => {
  return willChangeEoFace(lastMove, "U", "D");
};

const willChangeRLEo = (lastMove) => {
  return willChangeEoFace(lastMove, "R", "L");
};

const willChangeEoFace = (lastMove, face1, face2) => {
  let face = extractFace(lastMove);
  if (face !== face1 && face !== face2) {
    return false;
  }
  return !isDouble(lastMove);
};

const isDouble = (move) => lastChar(move) === "2";

const lastChar = (move) => move[move.length - 1];

export const invert = (moves) => {
  let result = [];
  for (let i = moves.length - 1; i >= 0; i--) {
    result.push(invertMove(moves[i]));
  }
  return result;
};

const invertMove = (move) => {
  if (isDouble(move)) return move;

  return "" + move[0] + (isPrime(move) ? "" : PRIME);
};

const isPrime = (move) => lastChar(move) === PRIME;
