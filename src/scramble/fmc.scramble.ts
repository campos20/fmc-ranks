import { randomScrambleForEvent } from "cubing/scramble";

/**
 * Generates a random-state FMC scramble (WCA format, with R' U' F padding).
 * Runs in a web worker provided by cubing.js, entirely in the browser.
 */
export const generateFmcScramble = async (): Promise<string> =>
  (await randomScrambleForEvent("333fm")).toString();
