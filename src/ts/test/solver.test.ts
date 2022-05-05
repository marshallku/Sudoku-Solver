import { performance } from "perf_hooks";
import startSolving from "../util/solver";

const grid: sudokuGrid = [
    [0, 1, 0, 0, 0, 6, 0, 9, 0],
    [5, 0, 0, 1, 0, 0, 6, 0, 0],
    [0, 9, 0, 0, 0, 0, 1, 2, 5],
    [3, 0, 0, 0, 2, 8, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 5, 0, 6, 3, 0, 0, 0, 7],
    [8, 2, 6, 0, 0, 0, 0, 3, 0],
    [0, 0, 5, 0, 0, 4, 0, 0, 1],
    [0, 4, 0, 3, 0, 0, 0, 6, 0],
];

const solved = [
    [4, 1, 2, 8, 5, 6, 7, 9, 3],
    [5, 7, 3, 1, 9, 2, 6, 4, 8],
    [6, 9, 8, 7, 4, 3, 1, 2, 5],
    [3, 6, 7, 5, 2, 8, 4, 1, 9],
    [2, 8, 9, 4, 1, 7, 3, 5, 6],
    [1, 5, 4, 6, 3, 9, 2, 8, 7],
    [8, 2, 6, 9, 7, 1, 5, 3, 4],
    [9, 3, 5, 2, 6, 4, 8, 7, 1],
    [7, 4, 1, 3, 8, 5, 9, 6, 2],
];

const start = performance.now();
startSolving(grid);
const took = performance.now() - start;

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        if (grid[i][j] !== solved[i][j]) throw "Wrong answer";
    }
}

console.log(`Took ${took}ms to solve`);
