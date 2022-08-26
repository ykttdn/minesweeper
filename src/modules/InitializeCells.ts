// eslint-disable-next-line import/no-unresolved, import/extensions
import Cell from "./Cell";

const initializeCells = (rowSize: number, columnSize: number): Cell[][] =>
  JSON.parse(
    JSON.stringify(
      new Array(rowSize).fill(new Array(columnSize).fill(new Cell()))
    )
  );

export default initializeCells;
