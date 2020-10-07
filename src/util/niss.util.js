import { willChangeEo } from "./move.util";
import Niss from "../model/Niss";

const breakEoOnAxis = (moves, axis) => {
  let result = [];

  // In case the last move won't change EO, we return empty list
  if (!willChangeEo(moves[moves.length - 1], axis)) {
    return result;
  }

  let firstNiss = new Niss([], moves);
  result.push(firstNiss);

  let nissPointForEO = [];
  for (let j = 0; j < moves.length; j++) {
    if (willChangeEo(moves[j], axis)) {
      nissPointForEO.push(j);
    }
  }

  for (let j = 0; j < nissPointForEO.length; j++) {
    let nissPoint = nissPointForEO[j] + 1;

    let inverseMoves = moves.slice(0, nissPoint);
    let normalMoves = moves.slice(nissPoint, moves.length);

    let niss = new Niss(inverseMoves, normalMoves);
    result.push(niss);
  }

  return result.filter((niss) => niss.isValid());
};

export default breakEoOnAxis;
