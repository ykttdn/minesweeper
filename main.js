const HEIGHT_EASY = 9;
const HEIGHT_NORMAL = 16;
const HEIGHT_HARD = 16;
const WIDTH_EASY = 9;
const WIDTH_NORMAL = 16;
const WIDTH_HARD = 30;
const MINES_EASY = 10;
const MINES_NORMAL = 40;
const MINES_HARD = 99;

let height = HEIGHT_EASY;
let width = WIDTH_EASY;
let mines = MINES_EASY;

// m 行 n 列の2次元配列を生成
const gen2DArray = (m, n, val) => {
  let table = new Array(m);
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(n).fill(val);
  }
  return table;
}

let isMineHidden = gen2DArray(height, width, false);
let isCellOpen = gen2DArray(height, width, false);
let isMarkedWithFlag = gen2DArray(height, width, false);

let hasGameStarted = false;
let hasOpenedMinedCell = false;
let hasOpenedAllSafeCells = false;
let safeCellCount = height*width-mines;
let remainingMines = mines;

const remains = document.getElementsByClassName('remains')[0];
if (remainingMines < 10) {
  remains.textContent = `00${remainingMines}`;
} else if (remainingMines < 100) {
  remains.textContent = `0${remainingMines}`;
}


const timer = document.getElementsByClassName('timer')[0];
let intervalId;
const advanceTimer = () => {
  let now = strToInt(timer.textContent);
  now++;
  if (now < 10) {
    timer.textContent = `00${now}`;
  } else if (now < 100) {
    timer.textContent = `0${now}`;
  } else if (now < 1000) {
    timer.textContent = `${now}`;
  } else {
    stopTimer();
  }
}
const stopTimer = () => {
  clearInterval(intervalId);
  intervalId = null;
}

const FACE_NORMAL = twemoji.convert.fromCodePoint('1F642');
const FACE_SUCCESS = twemoji.convert.fromCodePoint('1F60E');
const FACE_FAILURE = twemoji.convert.fromCodePoint('1F635');

const resetButton = document.getElementsByClassName('reset-button')[0];
resetButton.addEventListener('click', initializeGame);
const changeFaceOfResetButton = (face) => {
  resetButton.textContent = face;
  twemoji.parse(resetButton, {
    folder: 'svg',
    ext: '.svg'
  });
}
changeFaceOfResetButton(FACE_NORMAL);

const board = document.getElementsByClassName('board')[0];
const documentFragment = document.createDocumentFragment();

const initializeBoard = () => {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  for (let i = 0; i < height; i++) {
    const row = document.createElement('div');
    row.className ='row';
    for (let j = 0; j < width; j++) {
      const cell = document.createElement('div');
  
      const cellID = `cell-${i}-${j}`;
      cell.id = cellID;
  
      cell.className = 'cell cell--unopened';
  
      cell.dataset.row = i;
      cell.dataset.col = j;
  
      cell.addEventListener('click', touchCell);
      cell.addEventListener('contextmenu', toggleFlag);
  
      row.appendChild(cell);
    }
    documentFragment.appendChild(row);
  }
  board.appendChild(documentFragment);
}

initializeBoard();

const switchButton = document.getElementsByClassName('switch')[0];
let isFlagModeOn = false;
switchButton.addEventListener('click', () => {
  isFlagModeOn = switchButton.classList.toggle('switch--on');
});

function touchCell(e) {
  if (!hasGameStarted && !isFlagModeOn) {
    initializeMines(e);
    openCell(e);

    if (!intervalId) {
      intervalId = setInterval(advanceTimer, 1000);
    }
  } else {
    const cell = e.target;
    const i = strToInt(cell.dataset.row);
    const j = strToInt(cell.dataset.col);

    if (isFlagModeOn && !isCellOpen[i][j]) {
      toggleFlag(e);
      if (!intervalId) {
        intervalId = setInterval(advanceTimer, 1000);
      }
    } else if (!isCellOpen[i][j]) {
      openCell(e);
    } else {
      exeChording(e);
    }

    if (safeCellCount === 0) {
      hasOpenedAllSafeCells = true;
    }

    if (hasOpenedMinedCell || hasOpenedAllSafeCells) {
      stopTimer();
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const cell = document.getElementById(`cell-${i}-${j}`);
          cell.removeEventListener('click', touchCell);
          cell.removeEventListener('contextmenu', toggleFlag);
        }
      }

      if (hasOpenedMinedCell) {
        changeFaceOfResetButton(FACE_FAILURE);
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            if (!isCellOpen[i][j] && isMineHidden[i][j] && !isMarkedWithFlag[i][j]) {
              const cell = document.getElementById(`cell-${i}-${j}`);
              cell.className = 'cell cell--unopened cell--mined';
            } else if (!isCellOpen[i][j] && !isMineHidden[i][j] && isMarkedWithFlag[i][j]) {
              const cell = document.getElementById(`cell-${i}-${j}`);
              cell.className = 'cell cell--unopened cell--flagged cell--flagged-wrongly';
            }
          }
        }
      } else {
        changeFaceOfResetButton(FACE_SUCCESS);
        remains.textContent = '000';
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            if (isMineHidden[i][j] && !isMarkedWithFlag[i][j]) {
              const cell = document.getElementById(`cell-${i}-${j}`);
              cell.className = 'cell cell--unopened cell--flagged'
            }
          }
        }
      }
    }
  }
}

function initializeMines(e) {
  const cell = e.target;
  const i = strToInt(cell.dataset.row);
  const j = strToInt(cell.dataset.col);

  if (!hasGameStarted) {
    hasGameStarted = true;
    for (let k = 0; k < mines; k++) {
      while (true) {
        const row = random(height);
        const col = random(width);
        if (!isMineHidden[row][col] && !(i === row && j === col)) {
          // (row, col)成分に爆弾が埋められていない，かつ，(row, col)成分が最初に開いたcellでないとき
          isMineHidden[row][col] = true;
          break;
        }
      }

      /*
      let row = random(height);
      let col = random(width);
      if (!isMineHidden[row][col] && !(i === row && j === col)) {
        // (row, col)成分に爆弾が埋められていない，かつ，(row, col)成分が最初に開いたcellでないとき
        isMineHidden[row][col] = true;
      } else {
        // (row, col)成分に爆弾が埋められている，または，(row,col)成分が最初に開いたcellのとき
        // (row, col)成分の右隣のcellに移動し続け，そこに爆弾がなければ埋める
        while (true) {
          col++;
          if (col === width) {
            col = 0;
            row++;
            if (row === height) {
              row = 0;
            }
          }
          if (!isMineHidden[row][col] && !(i === row && j === col)) {
            isMineHidden[row][col] = 1;
            break;
          }
        }
      }
      */
    }
  }
}

// 0 以上 val 未満の整数乱数を返す
function random(val) {
  return Math.floor(Math.random()*val);
}

function openCell(e) {
  const cell = e.target;
  const i = strToInt(cell.dataset.row);
  const j = strToInt(cell.dataset.col);

  if (!isCellOpen[i][j] && !isMarkedWithFlag[i][j]) {
    if (isMineHidden[i][j]) {
      isCellOpen[i][j] = true;
      hasOpenedMinedCell = true;
      cell.className = 'cell cell--exploded'
    } else {
      openSafeCell(i, j);
      searchMines(i, j);
    }
  }
}

function strToInt(str) {
  return parseInt(str, 10);
}

function openSafeCell(i, j) {
  const cell = document.getElementById(`cell-${i}-${j}`);
  isCellOpen[i][j] = true;
  cell.className = 'cell cell--opened';

  safeCellCount--;
}

// row 行 col 列のマスの周囲8個のマスの行・列を返す
function getNeighborCellsIndex(row, col) {
  return [[row-1, col-1], [row-1, col], [row-1, col+1],
          [row, col-1],                 [row, col+1],
          [row+1, col-1], [row+1, col], [row+1, col+1]];
}

// row 行 col 列の cell が board に含まれているかを判定
const checkIfCellIsInsideBoard = (row, col) => 0 <= row && row < height && 0 <= col && col < width;

function searchMines(i, j) {
  let cnt = 0;
  const neighborCells = getNeighborCellsIndex(i, j);

  for (const [row, col] of neighborCells) {
    if (checkIfCellIsInsideBoard(row, col) && isMineHidden[row][col]) {
      cnt++;
    }
  }

  if (cnt > 0) {
    const cell = document.getElementById(`cell-${i}-${j}`);
    cell.textContent = cnt;
    cell.classList.add(`cnt-${cnt}`);
  } else if (!hasOpenedMinedCell) {
    for (const [row, col] of neighborCells) {
      if (checkIfCellIsInsideBoard(row, col) && !isCellOpen[row][col]) {
        openSafeCell(row, col);
        searchMines(row, col);
      }
    }
  }
}

function toggleFlag(e) {
  e.preventDefault();

  const cell = e.target;
  const i = strToInt(cell.dataset.row);
  const j = strToInt(cell.dataset.col);
  if (!isCellOpen[i][j]) {
    if (!isMarkedWithFlag[i][j]) {
      isMarkedWithFlag[i][j] = true;
      cell.className = 'cell cell--unopened cell--flagged';

      remainingMines--;
      if (remainingMines < 10) {
        remains.textContent = `00${remainingMines}`;
      } else if (remainingMines < 100) {
        remains.textContent = `0${remainingMines}`;
      }
    } else {
      isMarkedWithFlag[i][j] = false;
      cell.className = 'cell cell--unopened';

      remainingMines++;
      if (remainingMines < 10) {
        remains.textContent = `00${remainingMines}`;
      } else if (remainingMines < 100) {
        remains.textContent = `0${remainingMines}`;
      }
    }
  }
}

function exeChording(e) {
  const cell = e.target;
  const i = strToInt(cell.dataset.row);
  const j = strToInt(cell.dataset.col);

  if (isCellOpen[i][j]) {
    const mineCount = strToInt(cell.textContent);

    let flagCount = 0;
    const neighborCells = getNeighborCellsIndex(i, j);

    for (const [row, col] of neighborCells) {
      if (checkIfCellIsInsideBoard(row, col) && isMarkedWithFlag[row][col]) {
        flagCount++;
      }
    }

    if (mineCount === flagCount) {
      let canExeChording = true;
      for (const [row, col] of neighborCells) {
        if (checkIfCellIsInsideBoard(row, col) && isMarkedWithFlag[row][col] && !isMineHidden[row][col]) {
          canExeChording = false;
        }
      }

      if (canExeChording) {
        for (const [row, col] of neighborCells) {
          if (checkIfCellIsInsideBoard(row, col) && !isCellOpen[row][col] && !isMarkedWithFlag[row][col]) {
            openSafeCell(row, col);
            searchMines(row, col);
          }
        }
      } else {
        hasOpenedMinedCell = true;
        for (const [row, col] of neighborCells) {
          const c = document.getElementById(`cell-${row}-${col}`);
          if (checkIfCellIsInsideBoard(row, col) && !isCellOpen[row][col]) {
            if (isMarkedWithFlag[row][col] && !isMineHidden[row][col]) {
              // cell-${row}-${col}に爆弾がないのにflagが立てられているとき
              c.className = 'cell cell--unopened cell--flagged cell--flagged-wrongly';
            } else if (!isMarkedWithFlag[row][col] && isMineHidden[row][col]) {
              // cell-${row}-${col}に爆弾があるのにflagが立っていないとき
              c.className = 'cell cell--exploded';
            } else if (!isMarkedWithFlag[row][col]) {
              // cell-${row}-${col}に爆弾がなくてflagも立っていないとき
              openSafeCell(row, col);
              searchMines(row, col);
            }
          }
        }
      }
    }
  }
}

function initializeGame(e) {
  isMineHidden = gen2DArray(height, width, false);
  isCellOpen = gen2DArray(height, width, false);
  isMarkedWithFlag = gen2DArray(height, width, false);

  hasGameStarted = false;
  hasOpenedMinedCell = false;
  hasOpenedAllSafeCells = false;
  safeCellCount = height*width-mines;
  remainingMines = mines;
  if (remainingMines < 10) {
    remains.textContent = `00${remainingMines}`;
  } else if (remainingMines < 100) {
    remains.textContent = `0${remainingMines}`;
  }
  changeFaceOfResetButton(FACE_NORMAL);
  timer.textContent = '000';
  stopTimer();

  initializeBoard();
}

const selector = document.getElementsByTagName('select')[0];
selector.addEventListener('change', (e) => {
  const level = e.target.value;
  if (level === 'easy') {
    height = HEIGHT_EASY;
    width = WIDTH_EASY;
    mines = MINES_EASY;
  } else if (level === 'normal') {
    height = HEIGHT_NORMAL;
    width = WIDTH_NORMAL;
    mines = MINES_NORMAL;
  } else {
    height = HEIGHT_HARD;
    width = WIDTH_HARD;
    mines = MINES_HARD;
  }

  initializeGame();
});