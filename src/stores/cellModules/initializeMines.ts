import type { BoardParams } from "@/types/boardParams";
import type { Cell } from "@/types/cell";
import { random } from "@/utils/random";

export const initializeMines = (
  { rowSize, columnSize, mineNumber }: BoardParams,
  rowClickedFirst: number,
  columnClickedFirst: number,
  cells: Cell[][]
): Cell[][] => {
  const newCells = structuredClone(cells);

  for (let i = 0; i < mineNumber; i++) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const rowPickedRandomly = random(rowSize);
      const columnPickedRandomly = random(columnSize);
      if (
        !newCells[rowPickedRandomly][columnPickedRandomly].isMineHiddenIn &&
        !(
          rowClickedFirst === rowPickedRandomly &&
          columnClickedFirst === columnPickedRandomly
        )
      ) {
        newCells[rowPickedRandomly][columnPickedRandomly].isMineHiddenIn = true;
        break;
      }
    }
  }

  return newCells;
};
