import Permutation from "../model/Permutation";

export const U_FACE = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export const R_FACE = [9, 10, 11, 12, 13, 14, 15, 16, 17];
export const F_FACE = [18, 19, 20, 21, 22, 23, 24, 25, 26];
export const D_FACE = [27, 28, 29, 30, 31, 32, 33, 34, 35];
export const L_FACE = [36, 37, 38, 39, 40, 41, 42, 43, 44];
export const B_FACE = [45, 46, 47, 48, 49, 50, 51, 52, 53];

export const UD_FACES = [U_FACE, D_FACE];
export const RL_FACES = [R_FACE, L_FACE];
export const FB_FACES = [F_FACE, B_FACE];

export const U_EDGES_1 = [1, 5, 7, 3];
export const U_EDGES_2 = [46, 10, 19, 37]; // Attached to the previous

export const R_EDGES_1 = [10, 14, 16, 12];
export const R_EDGES_2 = [5, 48, 32, 23];

export const F_EDGES_1 = [19, 23, 25, 21];
export const F_EDGES_2 = [7, 12, 28, 41];

export const D_EDGES_1 = [28, 32, 34, 30];
export const D_EDGES_2 = [25, 16, 52, 43];

export const L_EDGES_1 = [37, 41, 43, 39];
export const L_EDGES_2 = [3, 21, 30, 50];

export const B_EDGES_1 = [46, 50, 52, 48];
export const B_EDGES_2 = [1, 39, 34, 14];

export const U_CORNERS_1 = [0, 2, 8, 6];
export const U_CORNERS_2 = [36, 45, 9, 18];
export const U_CORNERS_3 = [47, 11, 20, 38];

export const R_CORNERS_1 = [9, 11, 17, 15];
export const R_CORNERS_2 = [20, 2, 51, 29];
export const R_CORNERS_3 = [8, 45, 35, 26];

export const F_CORNERS_1 = [18, 20, 26, 24];
export const F_CORNERS_2 = [38, 8, 15, 27];
export const F_CORNERS_3 = [6, 9, 29, 44];

export const D_CORNERS_1 = [27, 29, 35, 33];
export const D_CORNERS_2 = [44, 26, 17, 53];
export const D_CORNERS_3 = [24, 15, 51, 42];

export const L_CORNERS_1 = [36, 38, 44, 42];
export const L_CORNERS_2 = [47, 6, 24, 33];
export const L_CORNERS_3 = [0, 18, 27, 53];

export const B_CORNERS_1 = [45, 47, 53, 51];
export const B_CORNERS_2 = [11, 0, 42, 35];
export const B_CORNERS_3 = [2, 36, 33, 17];

// For EO
export const UD_SLICE_1 = [3, 5, 30, 32];
export const UD_SLICE_2 = [37, 10, 43, 16];

export const RL_SLICE_1 = [12, 14, 39, 41];
export const RL_SLICE_2 = [23, 48, 50, 21];

export const FB_SLICE_1 = [21, 23, 48, 50];
export const FB_SLICE_2 = [41, 12, 14, 39];

export const UD_GOOD = [F_EDGES_1, B_EDGES_1, UD_SLICE_1];
export const UD_BAD = [F_EDGES_2, B_EDGES_2, UD_SLICE_2];

export const FB_GOOD = [U_EDGES_1, D_EDGES_1, FB_SLICE_1];
export const FB_BAD = [U_EDGES_2, D_EDGES_2, FB_SLICE_2];

export const RL_GOOD = [U_EDGES_1, D_EDGES_1, RL_SLICE_1];
export const RL_BAD = [U_EDGES_2, D_EDGES_2, RL_SLICE_2];

export const UD_CORNERS = [U_CORNERS_1, D_CORNERS_1];

export const U_MOVE = new Permutation([
  U_EDGES_1,
  U_EDGES_2,
  U_CORNERS_1,
  U_CORNERS_2,
  U_CORNERS_3,
]);

export const R_MOVE = new Permutation([
  R_EDGES_1,
  R_EDGES_2,
  R_CORNERS_1,
  R_CORNERS_2,
  R_CORNERS_3,
]);

export const F_MOVE = new Permutation([
  F_EDGES_1,
  F_EDGES_2,
  F_CORNERS_1,
  F_CORNERS_2,
  F_CORNERS_3,
]);

export const D_MOVE = new Permutation([
  D_EDGES_1,
  D_EDGES_2,
  D_CORNERS_1,
  D_CORNERS_2,
  D_CORNERS_3,
]);

export const L_MOVE = new Permutation([
  L_EDGES_1,
  L_EDGES_2,
  L_CORNERS_1,
  L_CORNERS_2,
  L_CORNERS_3,
]);

export const B_MOVE = new Permutation([
  B_EDGES_1,
  B_EDGES_2,
  B_CORNERS_1,
  B_CORNERS_2,
  B_CORNERS_3,
]);
