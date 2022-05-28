const heightEasy = 9;
const heightNormal = 16;
const heightHard = 16;
const widthEasy = 9;
const widthNormal = 16;
const widthHard = 30;
const minesEasy = 10;
const minesNormal = 40;
const minesHard = 99;

let height = heightEasy;
let width = widthEasy;
let mines = minesEasy;

const selector = document.getElementsByTagName('select')[0];
selector.addEventListener('change', function (e) {
  const level = e.target.value;
  if (level === 'easy') {
    height = heightEasy;
    width = widthEasy;
    mines = minesEasy;
  } else if (level === 'normal') {
    height = heightNormal;
    width = widthNormal;
    mines = minesNormal;
  } else {
    height = heightHard;
    width = widthHard;
    mines = minesHard;
  }

  initGame();
});

let isMineHidden = gen2DArray(height, width, false);
let isCellOpen = gen2DArray(height, width, false);
let isMarkedWithFlag = gen2DArray(height, width, false);

let hasGameStarted = false;
let hasOpenedMinedCell = false;
let hasOpenedAllSafeCells = false;
let safeCellCount = height*width-mines;
let remainingMines = mines;

const remains = document.getElementsByClassName('remains')[0];
remains.textContent = remainingMines;

const timer = document.getElementsByClassName('timer')[0];
let intervalId;

const faceNormal = '<i class="fa-solid fa-face-smile"></i>';
const faceSuccess = '<i class="fa-solid fa-face-laugh-squint"></i>';
const faceFailure = '<i class="fa-solid fa-face-dizzy"></i>';

const resetBtn = document.getElementsByClassName('reset-btn')[0];
resetBtn.innerHTML = faceNormal;
resetBtn.addEventListener('click', initGame);

const board = document.getElementsByClassName('board')[0];
const df = document.createDocumentFragment();

initBoard();

const switchBtn = document.getElementsByClassName('switch')[0];
switchBtn.addEventListener('click', function (e) {
  switchBtn.classList.toggle('switch--on');
})

// m 行 n 列の2次元配列を生成
function gen2DArray(m, n, val) {
  let table = new Array(m);
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(n).fill(val);
  }
  return table;
}

function touchCell(e) {
  if (!hasGameStarted) {
    initMines(e);
    openCell(e);

    if (!intervalId) {
      intervalId = setInterval(advanceTimer, 1000);
    }
  } else {
    const cell = e.target;
    const i = strToInt(cell.dataset.col);
    const j = strToInt(cell.dataset.row);

    if (!isCellOpen[i][j]) {
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
        resetBtn.innerHTML = faceFailure;
      } else {
        resetBtn.innerHTML = faceSuccess;
        remains.textContent = 0;
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            if (isMineHidden[i][j] && !isMarkedWithFlag[i][j]) {
              const cell = document.getElementById(`cell-${i}-${j}`);
              cell.className = 'cell cell--unopen cell--flagged'
            }
          }
        }
      }
    }
  }
}

function initMines(e) {
  const cell = e.target;
  const i = strToInt(cell.dataset.col);
  const j = strToInt(cell.dataset.row);

  if (!hasGameStarted) {
    hasGameStarted = true;
    for (let k = 0; k < mines; k++) {
      while (true) {
        const row = rand(height);
        const col = rand(width);
        if (!isMineHidden[row][col] && !(i === row && j === col)) {
          // (row, col)成分に爆弾が埋められていない，かつ，(row, col)成分が最初に開いたcellでないとき
          isMineHidden[row][col] = true;
          break;
        }
      }

      /*
      let row = rand(height);
      let col = rand(width);
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
function rand(val) {
  return Math.floor(Math.random()*val);
}

function openCell(e) {
  const cell = e.target;
  const i = strToInt(cell.dataset.col);
  const j = strToInt(cell.dataset.row);

  if (!isCellOpen[i][j] && !isMarkedWithFlag[i][j]) {
    if (isMineHidden[i][j]) {
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
  cell.className = 'cell cell--open';

  safeCellCount--;
}

function searchMines(i, j) {
  let cnt = 0;
  if (i-1 >= 0 && j-1 >= 0 && isMineHidden[i-1][j-1]) {
    cnt++;
  }
  if (i-1 >= 0 && j >= 0 && isMineHidden[i-1][j]) {
    cnt++;
  }
  if (i-1 >= 0 && j+1 < width && isMineHidden[i-1][j+1]) {
    cnt++;
  }
  if (i >= 0 && j-1 >= 0 && isMineHidden[i][j-1]) {
    cnt++;
  }
  if (i >= 0 && j+1 < width && isMineHidden[i][j+1]) {
    cnt++;
  }
  if (i+1 < height && j-1 >= 0 && isMineHidden[i+1][j-1]) {
    cnt++;
  }
  if (i+1 < height && j >= 0 && isMineHidden[i+1][j]) {
    cnt++;
  }
  if (i+1 < height && j+1 < width && isMineHidden[i+1][j+1]) {
    cnt++;
  }

  if (cnt > 0) {
    const cell = document.getElementById(`cell-${i}-${j}`);
    cell.textContent = cnt;
    cell.classList.add(`cnt-${cnt}`);
  } else if (!hasOpenedMinedCell) {
    if (i-1 >= 0 && j-1 >= 0 && !isCellOpen[i-1][j-1]) {
      openSafeCell(i-1, j-1);
      searchMines(i-1, j-1);
    }
    if (i-1 >= 0 && j >= 0 && !isCellOpen[i-1][j]) {
      openSafeCell(i-1, j);
      searchMines(i-1, j);
    }
    if (i-1 >= 0 && j+1 < width && !isCellOpen[i-1][j+1]) {
      openSafeCell(i-1, j+1);
      searchMines(i-1, j+1);
    }
    if (i >= 0 && j-1 >= 0 && !isCellOpen[i][j-1]) {
      openSafeCell(i, j-1);
      searchMines(i, j-1);
    }
    if (i >= 0 && j+1 < width && !isCellOpen[i][j+1]) {
      openSafeCell(i, j+1);
      searchMines(i, j+1);
    }
    if (i+1 < height && j-1 >= 0 && !isCellOpen[i+1][j-1]) {
      openSafeCell(i+1, j-1);
      searchMines(i+1, j-1);
    }
    if (i+1 < height && j >= 0 && !isCellOpen[i+1][j]) {
      openSafeCell(i+1, j);
      searchMines(i+1, j);
    }
    if (i+1 < height && j+1 < width && !isCellOpen[i+1][j+1]) {
      openSafeCell(i+1, j+1);
      searchMines(i+1, j+1);
    }
  }
}

function toggleFlag(e) {
  e.preventDefault();

  const cell = e.target;
  const i = strToInt(cell.dataset.col);
  const j = strToInt(cell.dataset.row);
  if (!isCellOpen[i][j]) {
    if (!isMarkedWithFlag[i][j]) {
      isMarkedWithFlag[i][j] = true;
      cell.className = 'cell cell--unopen cell--flagged';

      remainingMines--;
      remains.textContent = remainingMines;
    } else {
      isMarkedWithFlag[i][j] = false;
      cell.className = 'cell cell--unopen';

      remainingMines++;
      remains.textContent = remainingMines;
    }
  }
}

function exeChording(e) {
  const cell = e.target;
  const i = strToInt(cell.dataset.col);
  const j = strToInt(cell.dataset.row);

  if (isCellOpen[i][j]) {
    const mineCount = strToInt(cell.textContent);

    let flagCount = 0;
    if (i-1 >= 0 && j-1 >= 0 && isMarkedWithFlag[i-1][j-1]) {
      flagCount++;
    }
    if (i-1 >= 0 && j >= 0 && isMarkedWithFlag[i-1][j]) {
      flagCount++;
    }
    if (i-1 >= 0 && j+1 < width && isMarkedWithFlag[i-1][j+1]) {
      flagCount++;
    }
    if (i >= 0 && j-1 >= 0 && isMarkedWithFlag[i][j-1]) {
      flagCount++;
    }
    if (i >= 0 && j+1 < width && isMarkedWithFlag[i][j+1]) {
      flagCount++;
    }
    if (i+1 < height && j-1 >= 0 && isMarkedWithFlag[i+1][j-1]) {
      flagCount++;
    }
    if (i+1 < height && j >= 0 && isMarkedWithFlag[i+1][j]) {
      flagCount++;
    }
    if (i+1 < height && j+1 < width && isMarkedWithFlag[i+1][j+1]) {
      flagCount++;
    }

    if (mineCount === flagCount) {
      let canExeChording = false;
      if (i-1 >= 0 && j-1 >= 0 && isMarkedWithFlag[i-1][j-1] && !isMineHidden[i-1][j-1]) {
      } else if (i-1 >= 0 && j >= 0 && isMarkedWithFlag[i-1][j] && !isMineHidden[i-1][j]) {
      } else if (i-1 >= 0 && j+1 < width && isMarkedWithFlag[i-1][j+1] && !isMineHidden[i-1][j+1]) {
      } else if (i >= 0 && j-1 >= 0 && isMarkedWithFlag[i][j-1] && !isMineHidden[i][j-1]) {
      } else if (i >= 0 && j+1 < width && isMarkedWithFlag[i][j+1] && !isMineHidden[i][j+1]) {
      } else if (i+1 < height && j-1 >= 0 && isMarkedWithFlag[i+1][j-1] && !isMineHidden[i+1][j-1]) {
      } else if (i+1 < height && j >= 0 && isMarkedWithFlag[i+1][j] && !isMineHidden[i+1][j]) {
      } else if (i+1 < height && j+1 < width && isMarkedWithFlag[i+1][j+1] && !isMineHidden[i+1][j+1]) {
      } else {
        canExeChording = true;
      }

      if (canExeChording) {
        if (i-1 >= 0 && j-1 >= 0 && !isCellOpen[i-1][j-1] && !isMarkedWithFlag[i-1][j-1]) {
          openSafeCell(i-1, j-1);
          searchMines(i-1, j-1);
        }
        if (i-1 >= 0 && j >= 0 && !isCellOpen[i-1][j] && !isMarkedWithFlag[i-1][j]) {
          openSafeCell(i-1, j);
          searchMines(i-1, j);
        }
        if (i-1 >= 0 && j+1 < width && !isCellOpen[i-1][j+1] && !isMarkedWithFlag[i-1][j+1]) {
          openSafeCell(i-1, j+1);
          searchMines(i-1, j+1);
        }
        if (i >= 0 && j-1 >= 0 && !isCellOpen[i][j-1] && !isMarkedWithFlag[i][j-1]) {
          openSafeCell(i, j-1);
          searchMines(i, j-1);
        }
        if (i >= 0 && j+1 < width && !isCellOpen[i][j+1] && !isMarkedWithFlag[i][j+1]) {
          openSafeCell(i, j+1);
          searchMines(i, j+1);
        }
        if (i+1 < height && j-1 >= 0 && !isCellOpen[i+1][j-1] && !isMarkedWithFlag[i+1][j-1]) {
          openSafeCell(i+1, j-1);
          searchMines(i+1, j-1);
        }
        if (i+1 < height && j >= 0 && !isCellOpen[i+1][j] && !isMarkedWithFlag[i+1][j]) {
          openSafeCell(i+1, j);
          searchMines(i+1, j);
        }
        if (i+1 < height && j+1 < width && !isCellOpen[i+1][j+1] && !isMarkedWithFlag[i+1][j+1]) {
          openSafeCell(i+1, j+1);
          searchMines(i+1, j+1);
        }
      } else {
        hasOpenedMinedCell = true;
        if (i-1 >= 0 && j-1 >= 0 && !isCellOpen[i-1][j-1]) {
          const c = document.getElementById(`cell-${i-1}-${j-1}`);
          if (isMarkedWithFlag[i-1][j-1] && !isMineHidden[i-1][j-1]) {
            // cell-${i-1}-${j-1}に爆弾がないのにflagが立てられているとき
            c.className = 'cell cell--unopen cell--flagged cell--flagged-wrongly';
          } else if (!isMarkedWithFlag[i-1][j-1] && isMineHidden[i-1][j-1]) {
            // cell-${i-1}-${j-1}に爆弾があるのにflagが立っていないとき
            c.className = 'cell cell--exploded';
          } else if (!isMarkedWithFlag[i-1][j-1]) {
            // cell-${i-1}-${j-1}に爆弾がなくてflagも立っていないとき
            openSafeCell(i-1, j-1);
            searchMines(i-1, j-1);
          }
        }
        if (i-1 >= 0 && j >= 0 && !isCellOpen[i-1][j]) {
          const c = document.getElementById(`cell-${i-1}-${j}`);
          if (isMarkedWithFlag[i-1][j] && !isMineHidden[i-1][j]) {
            c.className = 'cell cell--unopen cell--flagged cell--flagged-wrongly';
          } else if (!isMarkedWithFlag[i-1][j] && isMineHidden[i-1][j]) {
            c.className = 'cell cell--exploded';
          } else if (!isMarkedWithFlag[i-1][j]) {
            openSafeCell(i-1, j);
            searchMines(i-1, j);
          }
        }
        if (i-1 >= 0 && j+1 < width && !isCellOpen[i-1][j+1]) {
          const c = document.getElementById(`cell-${i-1}-${j+1}`);
          if (isMarkedWithFlag[i-1][j+1] && !isMineHidden[i-1][j+1]) {
            c.className = 'cell cell--unopen cell--flagged cell--flagged-wrongly';
          } else if (!isMarkedWithFlag[i-1][j+1] && isMineHidden[i-1][j+1]) {
            c.className = 'cell cell--exploded';
          } else if (!isMarkedWithFlag[i-1][j+1]) {
            openSafeCell(i-1, j+1);
            searchMines(i-1, j+1);
          }
        }
        if (i >= 0 && j-1 >= 0 && !isCellOpen[i][j-1]) {
          const c = document.getElementById(`cell-${i}-${j-1}`);
          if (isMarkedWithFlag[i][j-1] && !isMineHidden[i][j-1]) {
            c.className = 'cell cell--unopen cell--flagged cell--flagged-wrongly';
          } else if (!isMarkedWithFlag[i][j-1] && isMineHidden[i][j-1]) {
            c.className = 'cell cell--exploded';
          } else if (!isMarkedWithFlag[i][j-1]) {
            openSafeCell(i, j-1);
            searchMines(i, j-1);
          }
        }
        if (i >= 0 && j+1 < width && !isCellOpen[i][j+1]) {
          const c = document.getElementById(`cell-${i}-${j+1}`);
          if (isMarkedWithFlag[i][j+1] && !isMineHidden[i][j+1]) {
            c.className = 'cell cell--unopen cell--flagged cell--flagged-wrongly';
          } else if (!isMarkedWithFlag[i][j+1] && isMineHidden[i][j+1]) {
            c.className = 'cell cell--exploded';
          } else if (!isMarkedWithFlag[i][j+1]) {
            openSafeCell(i, j+1);
            searchMines(i, j+1);
          }
        }
        if (i+1 < height && j-1 >= 0 && !isCellOpen[i+1][j-1]) {
          const c = document.getElementById(`cell-${i+1}-${j-1}`);
          if (isMarkedWithFlag[i+1][j-1] && !isMineHidden[i+1][j-1]) {
            c.className = 'cell cell--unopen cell--flagged cell--flagged-wrongly';
          } else if (!isMarkedWithFlag[i+1][j-1] && isMineHidden[i+1][j-1]) {
            c.className = 'cell cell--exploded';
          } else if (!isMarkedWithFlag[i+1][j-1]) {
            openSafeCell(i+1, j-1);
            searchMines(i+1, j-1);
          }
        }
        if (i+1 < height && j >= 0 && !isCellOpen[i+1][j]) {
          const c = document.getElementById(`cell-${i+1}-${j}`);
          if (isMarkedWithFlag[i+1][j] && !isMineHidden[i+1][j]) {
            c.className = 'cell cell--unopen cell--flagged cell--flagged-wrongly';
          } else if (!isMarkedWithFlag[i+1][j] && isMineHidden[i+1][j]) {
            c.className = 'cell cell--exploded';
          } else if (!isMarkedWithFlag[i+1][j]) {
            openSafeCell(i+1, j);
            searchMines(i+1, j);
          }
        }
        if (i+1 < height && j+1 < width && !isCellOpen[i+1][j+1]) {
          const c = document.getElementById(`cell-${i+1}-${j+1}`);
          if (isMarkedWithFlag[i+1][j+1] && !isMineHidden[i+1][j+1]) {
            c.className = 'cell cell--unopen cell--flagged cell--flagged-wrongly';
          } else if (!isMarkedWithFlag[i+1][j+1] && isMineHidden[i+1][j+1]) {
            c.className = 'cell cell--exploded';
          } else if (!isMarkedWithFlag[i+1][j+1]) {
            openSafeCell(i+1, j+1);
            searchMines(i+1, j+1);
          }
        }
      }
    }
  }
}

function advanceTimer() {
  let now = strToInt(timer.textContent);
  now++;
  timer.textContent = now;
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function initGame(e) {
  isMineHidden = gen2DArray(height, width, false);
  isCellOpen = gen2DArray(height, width, false);
  isMarkedWithFlag = gen2DArray(height, width, false);

  hasGameStarted = false;
  hasOpenedMinedCell = false;
  hasOpenedAllSafeCells = false;
  safeCellCount = height*width-mines;
  remainingMines = mines;
  remains.textContent = remainingMines;
  resetBtn.innerHTML = faceNormal;
  timer.textContent = 0;
  stopTimer();

  initBoard();
}

function initBoard() {
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
  
      cell.className = 'cell cell--unopen';
  
      cell.dataset.col = i;
      cell.dataset.row = j;
  
      cell.addEventListener('click', touchCell);
      cell.addEventListener('contextmenu', toggleFlag);
  
      row.appendChild(cell);
    }
    df.appendChild(row);
  }
  board.appendChild(df);
}