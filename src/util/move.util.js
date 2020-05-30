// TODO find a better way to validate scrambles
// I'm sure I'm not the first who needs it

Array.prototype.contains = (item) => !this.indexOf(item) < 0;

export default isValid = (scramble) => {
  return scramble
    .split(" ")
    .map(isValidMove)
    .reduce((a, b) => a && b, true);
};

const allowedMoves = "UFRDLB";
const allowedModifiers = ["'", "2"];
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
    if (!allowedModifiers.contains(move[1] && !move !== "w")) {
      return false;
    }
  }

  if (
    (move.length === 3 && move[1] != "w") ||
    !allowedMoves.contains(move[0])
  ) {
    // Uw'
    return false;
  }

  return true;
};

const isValidSingleMove = (move) =>
  allowedMoves.contains(move) ||
  allowedRotations.contains(move) ||
  allowedSlices.contains(move);
