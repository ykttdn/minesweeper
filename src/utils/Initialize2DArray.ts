export const initialize2DArray = (
  rowSize: number,
  columnSize: number,
  content: boolean
) =>
  JSON.parse(
    JSON.stringify(new Array(rowSize).fill(new Array(columnSize).fill(content)))
  );
