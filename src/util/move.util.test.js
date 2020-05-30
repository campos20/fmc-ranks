import isValid from "./move.util";

test("Checks if valid moves are computed correctly", () => {
  expect(isValid("U R F B L D U' R' F' B' L' D' U2 R2 F2 B2 L2 D2")).toBe(true);
  expect(isValid("x y z x' y' z' x2 y2 z2 M S E M' S' E' M2 S2 E2")).toBe(true);
  expect(
    isValid("Uw Rw Fw Bw Lw Dw Uw' Rw' Fw' Bw' Lw' Dw' Uw2 Rw2 Fw2 Bw2 Lw2 Dw2")
  ).toBe(true);

  expect(isValid("R X")).toBe(false);
  expect(isValid("X")).toBe(false);
  expect(isValid("invalid")).toBe(false);
  expect(isValid("URF")).toBe(false);
});
