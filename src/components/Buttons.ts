import { grid } from "../app";
import { updateGrid, resetGrid } from "./Grid";
import solver from "../util/solver";

export default function Buttons(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const buttons = document.createElement("div");
    const solveBtn = document.createElement("button");
    const resetBtn = document.createElement("button");
    const sudoku = <HTMLElement>document.querySelector(".sudoku");

    solveBtn.innerText = "Solve";
    resetBtn.innerText = "Reset";

    solveBtn.classList.add("button");
    resetBtn.classList.add("button");

    solveBtn.addEventListener("click", () => {
        const result = solver(grid);

        if (result) {
            sudoku.style.setProperty("--bg", "rgba(153, 231, 255, 0.25)");
            updateGrid();
        } else {
            sudoku.style.setProperty("--bg", "rgba(255, 66, 91, 0.25)");
            updateGrid();
        }
        sudoku.classList.add("reveal-status");
        setTimeout(() => {
            sudoku.classList.remove("reveal-status");
        }, 500);
    });
    resetBtn.addEventListener("click", resetGrid);

    buttons.classList.add("buttons");

    buttons.append(solveBtn);
    buttons.append(resetBtn);
    fragment.append(buttons);

    return fragment;
}
