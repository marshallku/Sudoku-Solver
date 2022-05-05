const MAX = 9;
const SUB_MAX = Math.floor(MAX / 3);
let GRID: SudokuGrid;

function isInRow(row: number, num: number): boolean {
    for (let i = 0; i < MAX; i++) {
        if (num === GRID[row][i]) return true;
    }

    return false;
}

function isInCol(col: number, num: number): boolean {
    for (let i = 0; i < MAX; i++) {
        if (num === GRID[i][col]) return true;
    }

    return false;
}

function isInSubGrid(startRow: number, startCol: number, num: number): boolean {
    for (let i = startRow; i < startRow + SUB_MAX; i++) {
        for (let j = startCol; j < startCol + SUB_MAX; j++) {
            if (GRID[i][j] === num) return true;
        }
    }

    return false;
}

function isValid(row: number, col: number, num: number): boolean {
    return (
        !isInRow(row, num) &&
        !isInCol(col, num) &&
        !isInSubGrid(row - (row % SUB_MAX), col - (col % SUB_MAX), num)
    );
}

function hasEmptyBox(coord: { row: number; col: number }): boolean {
    for (coord.row = 0; coord.row < MAX; coord.row++) {
        for (coord.col = 0; coord.col < MAX; coord.col++) {
            if (GRID[coord.row][coord.col] == 0) return true;
        }
    }

    return false;
}

function isSolvable(): boolean {
    let filled = 0;

    for (let row = 0; row < MAX; row++) {
        for (let col = 0; col < MAX; col++) {
            if (GRID[row][col] != 0) filled++;
        }
    }

    return filled >= 17;
}

function solve(): boolean {
    const coord = {
        row: 0,
        col: 0,
    };

    if (!hasEmptyBox(coord)) return true;

    for (let num = 1; num <= MAX; num++) {
        if (isValid(coord.row, coord.col, num)) {
            GRID[coord.row][coord.col] = num;
            if (solve()) return true;
            GRID[coord.row][coord.col] = 0;
        }
    }

    return false;
}

export default function solver(newGrid: SudokuGrid): boolean {
    GRID = newGrid;

    if (!isSolvable()) {
        return false;
    } else {
        if (solve()) {
            return true;
        } else {
            return false;
        }
    }
}
