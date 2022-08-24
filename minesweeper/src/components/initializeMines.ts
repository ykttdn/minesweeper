// 0 以上 val 未満の整数乱数を返す
const random = (val: number) => Math.floor(Math.random() * val);

export const initializeMines = (
  rowSize: number | undefined,
  columnSize: number | undefined,
  rowFirstClicked: number,
  columnFirstClicked: number,
  mineNumber: number | undefined,
  isMineHiddenIn: boolean[][]
) => {
  console.log(rowFirstClicked, columnFirstClicked);
  if (
    rowSize === undefined ||
    columnSize === undefined ||
    mineNumber === undefined
  ) {
    console.log("error");
    return isMineHiddenIn;
  }
  for (let k = 0; k < mineNumber; k++) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const rowPickedRandomly = random(rowSize);
      const columnPickedRandomly = random(columnSize);
      if (
        !isMineHiddenIn[rowPickedRandomly][columnPickedRandomly] &&
        !(
          rowFirstClicked === rowPickedRandomly &&
          columnFirstClicked === columnPickedRandomly
        )
      ) {
        isMineHiddenIn[rowPickedRandomly][columnPickedRandomly] = true;
        break;
      }
    }
  }
  return isMineHiddenIn;
};
