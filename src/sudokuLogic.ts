import * as Define from "./Define";
import * as util from "./util";

export class SudokuLogic {

  /**
   * 数独の進行状況（9x9の配列でそのまま数独の表を表す）
   *
   * @private
   * @type {number[][]}
   * @memberof SudokuLogic
   */
  private board!: number[][];

  /**
   * 数独の初期状態（書き換え不能位置を算出する）
   *
   * @private
   * @type {number[][]}
   * @memberof SudokuLogic
   */
  private originBoard!: number[][];

  constructor(sudokuData: number[][]) {
    this.board = sudokuData;
    this.originBoard = util.support.deepCopy(sudokuData);
  }

  /**
   * 値が重複した座標一覧を作成
   *
   * @returns {Define.Position2D[]}
   * @memberof SudokuLogic
   */
  createDuplicateList(): Define.Position2D[] {
    let dupListList: Define.Position2D[] = [];
    for (let ix = 0; ix < 9; ix++) {
      dupListList = dupListList.concat(this.createDuplicateListRow(ix));
    }
    for (let iy = 0; iy < 9; iy++) {
      dupListList = dupListList.concat(this.createDuplicateListCol(iy));
    }
    for (let ia = 0; ia < 9; ia++) {
      dupListList = dupListList.concat(this.createDuplicateListArea(ia));
    }
    return util.support.createUniqPosList(dupListList);
  }

  private createDuplicateListRow(row: number): Define.Position2D[] {
    if (row < 0 || row > 8) {
      return [];
    }
    const rowlist = this.getRow(row);
    if (rowlist.length != 9) {
      throw new Error("データ不整合 row:" + row);
    }
    const dupList = this.checkDuplication(rowlist);

    let pos2DList: Define.Position2D[] = [];
    dupList.forEach((rowDupList, num) => {
      if (rowDupList && rowDupList.length > 1) {
        rowDupList.forEach(col => {
          pos2DList.push({ x: col, y: row });
        });
      }
    });
    return pos2DList;
  }

  private createDuplicateListCol(col: number): Define.Position2D[] {
    if (col < 0 || col > 8) {
      return [];
    }
    const collist = this.getCol(col);
    if (collist.length != 9) {
      throw new Error("データ不整合 col:" + col);
    }
    const dupList = this.checkDuplication(collist);

    let pos2DList: Define.Position2D[] = [];
    dupList.forEach((colDupList, num) => {
      if (colDupList && colDupList.length > 1) {
        colDupList.forEach(row => {
          pos2DList.push({ x: col, y: row });
        });
      }
    });
    return pos2DList;
  }

  private createDuplicateListArea(area: number): Define.Position2D[] {
    if (area < 0 || area > 8) {
      return [];
    }
    const arealist = this.getArea(area);
    if (arealist.length != 9) {
      throw new Error("データ不整合 area:" + area);
    }
    const dupList = this.checkDuplication(arealist);

    let pos2DList: Define.AreaPosition[] = [];
    dupList.forEach((areaPosDupList, num) => {
      if (areaPosDupList && areaPosDupList.length > 1) {
        areaPosDupList.forEach(pos => {
          pos2DList.push({ area: area, pos: pos });
        });
      }
    });
    if (!pos2DList) {
      return [];
    }
    return pos2DList.map(pos2D => { return util.support.Area2Pos(pos2D); })
  }

  private checkDuplication(list: number[]): number[][] {
    let count: number[][] = [];
    list.forEach((num, index) => {
      if (!count[num]) {
        count[num] = [];
      }
      if (num) {
        // 0（空）以外
        count[num].push(index);
      }
    });
    return count;
  }

  /**
   * 指定列を取得
   *
   * @private
   * @param {number} col
   * @returns {number[]}
   * @memberof SudokuLogic
   */
  private getCol(col: number): number[] {
    let ret: number[] = [];
    for (let iy = 0; iy < 9; iy++) {
      const pos: Define.Position2D = { x: col, y: iy };
      ret.push(this.getBoardDataFromPosition(pos));
    }
    return ret;
  }

  /**
   * 指定行を取得
   *
   * @private
   * @param {number} row
   * @returns {number[]}
   * @memberof SudokuLogic
   */
  private getRow(row: number): number[] {
    let ret: number[] = [];
    for (let ix = 0; ix < 9; ix++) {
      const pos: Define.Position2D = { x: ix, y: row };
      ret.push(this.getBoardDataFromPosition(pos));
    }
    return ret;
  }

  /**
   * 指定エリア（9x9に分割した位置）の取得
   *
   * @private
   * @param {number} area
   * @returns {number[]}
   * @memberof SudokuLogic
   */
  private getArea(area: number): number[] {
    if (area < 0 || area > 8) {
      return [];
    }
    let ret: number[] = [];
    for (let pos = 0; pos < 9; pos++) {
      const ap: Define.AreaPosition = { area: area, pos: pos };
      ret.push(this.getBoardDataFromAreaPositon(ap));
    }
    return ret;
  }

  private getBoardDataFromAreaPositon(ap: Define.AreaPosition): number {
    if (ap.area < 0 || ap.area > 8) {
      throw new Error("intput error area:" + ap.area);
    }
    if (ap.pos < 0 || ap.pos > 8) {
      throw new Error("intput error area.pos:" + ap.pos);
    }
    let pos2d = util.support.Area2Pos(ap);
    return this.getBoardDataFromPosition(pos2d);
  }

  /**
   * 指定位置の値を取得
   *
   * @param {Define.Position2D} pos
   * @returns {number}
   * @memberof SudokuLogic
   */
  getBoardDataFromPosition(pos: Define.Position2D): number {
    if (pos.x < 0 || pos.x > 8) {
      throw new Error("intput error x:" + pos.x);
    }
    if (pos.y < 0 || pos.y > 8) {
      throw new Error("intput error y:" + pos.y);
    }
    return this.board[pos.y][pos.x];
  }

  /**
   * 入力が可能かの判定
   *
   * @param {Define.Position2D} pos
   * @returns {boolean}
   * @memberof SudokuLogic
   */
  isAbleSetData(pos: Define.Position2D): boolean {
    if (pos.x < 0 || pos.x > 8) {
      return false;
    }
    if (pos.y < 0 || pos.y > 8) {
      return false;
    }
    return this.originBoard[pos.y][pos.x] === 0;
  }

  /**
   * 数独の問題に数字を入力
   *
   * @param {number} num 値
   * @param {Define.Position2D} pos 位置
   * @returns {boolean} 成否
   * @memberof SudokuLogic
   */
  setBoardData(num: number, pos: Define.Position2D): boolean {
    if (!this.isAbleSetData(pos)) {
      return false;
    }
    if (pos.x < 0 || pos.x > 8) {
      return false;
    }
    if (pos.y < 0 || pos.y > 8) {
      return false;
    }
    if (num < 0 || num > 8) {
      return false;
    }
    this.board[pos.y][pos.x] = num;
    return true;
  }

  /**
   * 完了判定
   *
   * @returns {boolean}
   * @memberof SudokuLogic
   */
  isSolved(): boolean {
    if (!this.isAllSettingBoardData()) {
      return false;
    }
    const dupList = this.createDuplicateList();
    if (dupList.length > 0) {
      return false;
    }
    return true;
  }

  private isAllSettingBoardData(): boolean {
    for (let ix = 0; ix < 9; ix++) {
      for (let iy = 0; iy < 9; iy++) {
        if (this.getBoardDataFromPosition({ x: ix, y: iy }) === 0) {
          return false;
        }
      }
    }
    return true;
  }
}
