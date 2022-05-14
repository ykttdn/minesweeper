const height = 9;
const width = 9;

// m 行 n 列の2次元配列を生成
function gen2DArray(m, n, val) {
  let table = new Array(m);
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(n).fill(val);
  }
  return table;
}

let isCellOpen = gen2DArray(height, width, false);

const board = document.getElementsByClassName('board')[0];

for (let i = 0; i < height; i++) {
  let row = document.createElement('div');
  row.className = 'row';
  board.appendChild(row);
  for (let j = 0; j < width; j++) {
    const cell = document.createElement('div');
    cell.className = 'cell cell--unopen';
    cell.addEventListener('click', function(){
      if (!isCellOpen[i][j]) {
        isCellOpen[i][j] = true;
        this.className = 'cell cell--open'
      }
    });
    row.appendChild(cell);
  }
}