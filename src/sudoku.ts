import readline from 'readline';
import { SudokuLogic } from './sudokuLogic';
import { Position2D } from './Define';

const sudoku: number[][] = [
  [1, 2, 3, 0, 0, 0, 0, 0, 2],
  [4, 5, 6, 0, 0, 0, 0, 0, 0],
  [7, 8, 9, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

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

console.log(logic.createDuplicateListRow(0));


// ci.on('line', function (line) {

//   viewAll();
//   const c = logic.createDuplicateList();
//   console.log(c);
// });

// ci.on('close', function () {
// });


// helper
function viewAll() {
  for (let iy = 0; iy < 9; iy++) {
    let line = "";
    for (let ix = 0; ix < 9; ix++) {
      let b: string = logic.getBoardDataFromPosition({ x: ix, y: iy }).toString(10);
      if (b === "0") {
        b = "-";
      }
      line += b;
    }
    console.log(line);
  }
}
