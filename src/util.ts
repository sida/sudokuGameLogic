import { Direction, Position2D } from "./Define";

let dirList: Position2D[] = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];

export namespace support {
  export function calNextPost(pos: Position2D, dir: Direction): Position2D {
    return { x: pos.x + dirList[dir].x, y: pos.y + dirList[dir].y };
  }

  export function equalPos(pos1: Position2D, pos2: Position2D): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

}
