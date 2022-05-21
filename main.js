const height = 9;
const width = 9;
const mines = Math.min(10, Math.floor(height*width*0.3));

// m 行 n 列の2次元配列を生成
function gen2DArray(m, n, val) {
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

// 0 以上 val 未満の整数乱数を返す
function rand(val) {
  return Math.floor(Math.random()*val);
}

const board2 = document.getElementsByClassName('board')[1];
const df2 = document.createDocumentFragment();

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

    cell.addEventListener('click', initMines2);
    cell.addEventListener('click', openCell2);
    cell.addEventListener('contextmenu', toggleFlag2);

    row.appendChild(cell);
  }
  df2.appendChild(row);
}
board2.appendChild(df2);

function strToInt(str) {
  return parseInt(str, 10);
}

function initMines2(e) {
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

function openCell2(e) {
  const cell = e.target;
  const i = strToInt(cell.dataset.col);
  const j = strToInt(cell.dataset.row);

  if (!isCellOpen[i][j] && !isMarkedWithFlag[i][j]) {
    if (isMineHidden[i][j]) {
      cell.className = 'cell cell--exploded'
    } else {
      openSafeCell2(i, j);
      searchMines2(i, j);
    }
  }
}

function openSafeCell2(i, j) {
  const cell = document.getElementById(`cell-${i}-${j}`);
  isCellOpen[i][j] = true;
  cell.className = 'cell cell--open';
}

function searchMines2(i, j) {
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
  } else {
    if (i-1 >= 0 && j-1 >= 0 && !isCellOpen[i-1][j-1]) {
      openSafeCell2(i-1, j-1);
      searchMines2(i-1, j-1);
    }
    if (i-1 >= 0 && j >= 0 && !isCellOpen[i-1][j]) {
      openSafeCell2(i-1, j);
      searchMines2(i-1, j);
    }
    if (i-1 >= 0 && j+1 < width && !isCellOpen[i-1][j+1]) {
      openSafeCell2(i-1, j+1);
      searchMines2(i-1, j+1);
    }
    if (i >= 0 && j-1 >= 0 && !isCellOpen[i][j-1]) {
      openSafeCell2(i, j-1);
      searchMines2(i, j-1);
    }
    if (i >= 0 && j+1 < width && !isCellOpen[i][j+1]) {
      openSafeCell2(i, j+1);
      searchMines2(i, j+1);
    }
    if (i+1 < height && j-1 >= 0 && !isCellOpen[i+1][j-1]) {
      openSafeCell2(i+1, j-1);
      searchMines2(i+1, j-1);
    }
    if (i+1 < height && j >= 0 && !isCellOpen[i+1][j]) {
      openSafeCell2(i+1, j);
      searchMines2(i+1, j);
    }
    if (i+1 < height && j+1 < width && !isCellOpen[i+1][j+1]) {
      openSafeCell2(i+1, j+1);
      searchMines2(i+1, j+1);
    }
  }
}

function toggleFlag2(e) {
  e.preventDefault();

  const cell = e.target;
  const i = strToInt(cell.dataset.col);
  const j = strToInt(cell.dataset.row);
  if (!isCellOpen[i][j]) {
    if (!isMarkedWithFlag[i][j]) {
      isMarkedWithFlag[i][j] = true;
      cell.className = 'cell cell--unopen cell--flagged';
    } else {
      isMarkedWithFlag[i][j] = false;
      cell.className = 'cell cell--unopen'
    }
  }
}