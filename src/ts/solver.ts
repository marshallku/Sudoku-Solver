const Max = 9;
const SubMax = Math.floor(Max / 3);
let grid: sudokuGrid;

function isInRow(row: number, num: number): boolean {
    for (let i = 0; i < Max; i++) {
        if (num === grid[row][i]) return true;
    }

    return false;
}

function isInCol(col: number, num: number): boolean {
    for (let i = 0; i < Max; i++) {
        if (num === grid[i][col]) return true;
    }

    return false;
}

function isInSubGrid(startRow: number, startCol: number, num: number): boolean {
    for (let i = startRow; i < startRow + SubMax; i++) {
        for (let j = startCol; j < startCol + SubMax; j++) {
            if (grid[i][j] === num) return true;
        }
    }

    return false;
}

function isValid(row: number, col: number, num: number): boolean {
    return (
        !isInRow(row, num) &&
        !isInCol(col, num) &&
        !isInSubGrid(row - (row % SubMax), col - (col % SubMax), num)
    );
}

function hasEmptyBox(coord: { row: number; col: number }): boolean {
    for (coord.row = 0; coord.row < Max; coord.row++) {
        for (coord.col = 0; coord.col < Max; coord.col++) {
            if (grid[coord.row][coord.col] == 0) return true;
        }
    }

    return false;
}

function isSolvable(): boolean {
    let filled = 0;

    for (let row = 0; row < Max; row++) {
        for (let col = 0; col < Max; col++) {
            if (grid[row][col] != 0) filled++;
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

    for (let num = 1; num <= Max; num++) {
        if (isValid(coord.row, coord.col, num)) {
            grid[coord.row][coord.col] = num;
            if (solve()) return true;
            grid[coord.row][coord.col] = 0;
        }
    }

    return false;
}

export default function startSolving(newGrid: sudokuGrid): boolean {
    grid = newGrid;

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
