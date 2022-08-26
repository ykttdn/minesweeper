class Cell {
  isMineHiddenIn: boolean;

  isOpened: boolean;

  isFlagged: boolean;

  constructor() {
    this.isMineHiddenIn = false;
    this.isOpened = false;
    this.isFlagged = false;
  }
}

export default Cell;
