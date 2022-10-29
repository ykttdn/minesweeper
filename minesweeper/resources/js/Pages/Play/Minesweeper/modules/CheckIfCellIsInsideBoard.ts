export const checkIfCellIsInsideBoard = (
    row: number,
    col: number,
    rowSize: number,
    columnSize: number
) => 0 <= row && row < rowSize && 0 <= col && col < columnSize;
