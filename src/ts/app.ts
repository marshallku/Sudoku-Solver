import startSolving from "./solver";

export let grid: sudokuGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const inputGrid: HTMLInputElement[][] = [];

function resetGrid() {
    grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    updateGrid();
}

function renderGrid(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const handleChange = (i: number, j: number, input: HTMLInputElement) => {
        const value = +input.value;

        grid[i][j] = value || value > 9 ? 9 : 0;
        if (i === 8 && j === 8) {
            input.blur();
        } else {
            const nextElem =
                inputGrid[j === 8 ? i + 1 : i][j === 8 ? 0 : j + 1];

            nextElem.focus();
        }
    };
    const handleFocus = (e: FocusEvent) => {
        const target = e.target as HTMLInputElement;

        target.value = "";
    };

    grid.forEach((row, i) => {
        const rowDiv = document.createElement("div");
        const inputRow: HTMLInputElement[] = [];

        row.forEach((number, j) => {
            const div = document.createElement("div");
            const input = document.createElement("input");

            input.type = "number";
            input.min = "1";
            input.max = "9";
            input.value = `${number}`;

            input.addEventListener("focus", handleFocus, { passive: true });
            input.addEventListener(
                "keyup",
                () => {
                    handleChange(i, j, input);
                },
                { passive: true }
            );
            input.addEventListener(
                "change",
                () => {
                    handleChange(i, j, input);
                },
                { passive: true }
            );

            inputRow.push(input);

            div.classList.add("sudoku__row__box");
            div.append(input);
            rowDiv.append(div);
        });

        inputGrid.push(inputRow);

        rowDiv.classList.add("sudoku__row");
        fragment.append(rowDiv);
    });

    return fragment;
}

function renderButtons(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const solveBtn = document.createElement("button");
    const resetBtn = document.createElement("button");
    const errorText = document.createElement("div");

    solveBtn.innerText = "Solve";
    resetBtn.innerText = "Reset";

    solveBtn.classList.add("button");
    resetBtn.classList.add("button");

    solveBtn.addEventListener("click", () => {
        const result = startSolving(grid);

        if (result === "Success") {
            updateGrid();
        } else {
            updateGrid();
            errorText.innerText = result;
        }
    });
    resetBtn.addEventListener("click", resetGrid);

    fragment.append(errorText);
    fragment.append(solveBtn);
    fragment.append(resetBtn);

    return fragment;
}

export function updateGrid() {
    grid.forEach((row, i) => {
        row.forEach((number, j) => {
            inputGrid[i][j].value = `${number || 0}`;
        });
    });
}

function app() {
    const elem = document.getElementById("app");
    const sudokuGrid = document.createElement("div");

    sudokuGrid.classList.add("sudoku");
    sudokuGrid.append(renderGrid());
    elem.append(sudokuGrid);
    elem.append(renderButtons());
}

app();
