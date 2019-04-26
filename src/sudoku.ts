import readline from 'readline';
import { SudokuLogic } from './sudokuLogic';
import { Position2D } from './Define';

console.log('hello sudoku !!');

const logic = new SudokuLogic();

const ci = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

ci.on('line', function (line) {

});

ci.on('close', function () {
});

