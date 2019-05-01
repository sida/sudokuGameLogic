import readline from 'readline';
import { SudokuLogic } from './sudokuLogic';

const sudoku: number[][] = [
  [1, 2, 3, 0, 0, 0, 0, 0, 2],
  [4, 5, 6, 0, 0, 0, 0, 0, 0],
  [7, 8, 9, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 1, 2, 1, 0, 0, 0],
  [0, 0, 0, 2, 1, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0],

  [0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 4],
];

const logic = new SudokuLogic(sudoku);

const ci = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('hello sudoku !!');

viewAll();

ci.on('line', function (line) {

  viewAll();
  const c = logic.createDuplicateList();
  console.log(c);
});

ci.on('close', function () {
});


// helper
function viewAll() {
  var red     = '\u001b[31m';
  var reset   = '\u001b[0m';
  let vDisp : string[][] = [];

  // copy
  for (let iy = 0; iy < 9; iy++) {
    for (let ix = 0; ix < 9; ix++) {
      let b: string = logic.getBoardDataFromPosition({ x: ix, y: iy }).toString(10);
      if (b === "0") {
        b = "-";
      }
      if (!vDisp[ix]) {
        vDisp[ix] = [];
      }
      vDisp[ix][iy] = b;
    }
  }
  // 重複チェック＆色つけ
  const dupPosList = logic.createDuplicateList();
  dupPosList.forEach(pos => {
    vDisp[pos.x][pos.y] = red + vDisp[pos.x][pos.y] + reset;
  });
  // 表示
  view(vDisp);
}

function view(vDisp : string[][]) {
  for (let iy = 0; iy < 9; iy++) {
    let line = "";
    for (let ix = 0; ix < 9; ix++) {
      let b = vDisp[ix][iy];
      line += b;
    }
    console.log(line);
  }
}
