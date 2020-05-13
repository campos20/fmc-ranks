import { avg, single } from "../util/result.util";

export class Result {
  constructor(results, name, trim) {
    this.avg = avg(results, trim);
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
