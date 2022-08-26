/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */

import { UNOPENED_CELL } from "./CellState";

const board = document.getElementsByClassName("board")[0];
const documentFragment = document.createDocumentFragment();

const initializeBoard = (rowSize: number, columnSize: number) => {
  if (board === undefined) {
    return;
  }

  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  for (let i = 0; i < rowSize; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < columnSize; j++) {
      const cell = document.createElement("div");

      const cellID = `cell-${i}-${j}`;
      cell.id = cellID;

      cell.className = UNOPENED_CELL;

      cell.dataset.row = `${i}`;
      cell.dataset.col = `${j}`;

      cell.addEventListener("click", touchCell);
      cell.addEventListener("contextmenu", toggleFlag);

      row.appendChild(cell);
    }
    documentFragment.appendChild(row);
  }
  board.appendChild(documentFragment);
};

export default initializeBoard;
