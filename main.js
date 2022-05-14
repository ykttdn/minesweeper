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

let hasGameStarted = false;

const board = document.getElementsByClassName('board')[0];

for (let i = 0; i < height; i++) {
  let row = document.createElement('div');
  row.className = 'row';
  board.appendChild(row);
  for (let j = 0; j < width; j++) {
    const cell = document.createElement('div');
    cell.className = 'cell cell--unopen';

    cell.addEventListener('click', function initMines() {
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
    });

    cell.addEventListener('click', function(){
      if (!isCellOpen[i][j]) {
        isCellOpen[i][j] = true;
        this.className = 'cell cell--open'
      }
    });
    row.appendChild(cell);
  }
}

// 0 以上 val 未満の整数乱数を返す
function rand(val) {
  return Math.floor(Math.random()*val);
}