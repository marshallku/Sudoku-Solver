import { grid } from "../app";

const inputGrid: HTMLInputElement[][] = [];

export function resetGrid() {
    grid.forEach((row) => {
        row.fill(0);
    });

    updateGrid();
}
export default function Grid(): HTMLDivElement {
    const div = document.createElement("div");
    const handleChange = (i: number, j: number, input: HTMLInputElement) => {
        const value = +input.value;
        const limited = Math.min(9, value);

        grid[i][j] = limited;
        input.value = `${limited}`;
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
            input.min = "0";
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
        div.append(rowDiv);
    });

    div.classList.add("sudoku");

    return div;
}

export function updateGrid() {
    grid.forEach((row, i) => {
        row.forEach((number, j) => {
            inputGrid[i][j].value = `${number || 0}`;
        });
    });
}
