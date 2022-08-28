const OPENED_CELL = "cell cell--opened";

const openCell = (row: number, column: number) => {
  const cellTargeted = document.getElementById(`cell-${row}-${column}`);
  if (cellTargeted === null) {
    return;
  }

  cellTargeted.className = OPENED_CELL;
  console.log(`opened (${row}, ${column})`);
};

export default openCell;
