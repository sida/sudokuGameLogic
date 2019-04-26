import * as Define from "./Define";
import * as util from "./util";

export class SudokuLogic {

  private board!: number[][]; // [Area][Position] value 0:empty 1-9

  constructor() {
  }


  checkRow(row:number) {
    if (row < 0 || row > 8) {
      return {};
    }

    const list = this.getRow(row);
    if (list.length != 9) {
      throw new Error("データ不整合 row:" + row);
    }
    // todo 途中
  }


  private getRow(row: number): number[] {
    if (row < 0 || row > 8) {
      return [];
    }
    let ret: number[] = [];
    const area1 = Math.floor(row / 3);
    const pos1 = row % 3;
    for (let ii = 0; ii < 3; ii++) {
      for (let jj = 0; jj < 3; jj++) {
        const area = area1 + ii;
        const pos = pos1 + jj;
        const p = this.getBoardData(area, pos);
        ret.push(p);
      }
    }
    return ret;
  }

  private getCol(col: number): number[] {
    if (col < 0 || col > 8) {
      return [];
    }
    let ret: number[] = [];
    const area1 = col % 3;
    const pos1 = Math.floor(col / 3);
    for (let ii = 0; ii < 3; ii++) {
      for (let jj = 0; jj < 3; jj++) {
        const area = area1 + ii * 3;
        const pos = pos1 + jj * 3;
        const p = this.getBoardData(area, pos);
        ret.push(p);
      }
    }
    return ret;
  }

  private getArea(area:number) :number[]  {
    if (area < 0 || area > 8) {
      return [];
    }
    return this.board[area];
  }

  private getBoardData(area: number, pos: number): number {
    if (area < 0 || area > 8) {
      return -1;
    }
    if (pos < 0 || pos > 8) {
      return -1;
    }
    return this.board[area][pos];
  }

}
