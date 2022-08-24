export const generate2dArray = (
  rowSize: number | undefined,
  columnSize: number | undefined,
  contents: boolean
) => {
  return JSON.parse(
    JSON.stringify(
      new Array(rowSize).fill(new Array(columnSize).fill(contents))
    )
  );
};
