// TODO find a better way to validate scrambles
// I'm sure I'm not the first who needs it

const isValid = (scramble) => {
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

const isValidMove = (move) => {
  if (!move) {
    return false;
  }
  if (move.length === 0 || move.length > 3) {
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

export default isValid;
