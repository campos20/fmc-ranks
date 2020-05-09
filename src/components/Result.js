import { avg, single } from "../util/result.util";

export class Result {
  constructor(results, name) {
    this.avg = avg(results);
    this.single = single(results);
    this.results = results;
    this.name = name;
  }
}

export function compareResults(a, b) {
  if (a.avg < b.avg) {
    return -1;
  }
  if (a.avg > b.avg) {
    return 1;
  }
  if (a.single < b.single) {
    return -1;
  }
  if (a.single > b.single) {
    return 1;
  }
  return 0;
}
