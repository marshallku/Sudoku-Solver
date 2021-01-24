const Max = 9;
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
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) return true;
        }
    }

    return false;
}

function isValid(row: number, col: number, num: number): boolean {
    return (
        !isInRow(row, num) &&
        !isInCol(col, num) &&
        !isInSubGrid(row - (row % 3), col - (col % 3), num)
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

    for (let num = 1; num <= 9; num++) {
        if (isValid(coord.row, coord.col, num)) {
            grid[coord.row][coord.col] = num;
            if (solve()) return true;
            grid[coord.row][coord.col] = 0;
        }
    }

    return false;
}

export default function startSolving(newGrid: sudokuGrid): string {
    grid = newGrid;

    if (!isSolvable()) {
        return "It's undefeatable!";
    } else {
        if (solve()) {
            return "Success";
        } else {
            return "Oops! I can't solve this.";
        }
    }
}
