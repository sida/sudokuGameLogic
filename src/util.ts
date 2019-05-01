import { Direction, Position2D, AreaPosition } from "./Define";

let dirList: Position2D[] = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];

export namespace support {
  export function calNextPost(pos: Position2D, dir: Direction): Position2D {
    return { x: pos.x + dirList[dir].x, y: pos.y + dirList[dir].y };
  }

  export function equalPos(pos1: Position2D, pos2: Position2D): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  // export function Pos2Area(pos2d:Position2D):AreaPosition {
  //   // area
  //   const area = Math.floor(pos2d.y / 3) * 3 + Math.floor(pos2d.x / 3);
  //   // pos
  //   const pos = (pos2d.y % 3) * 3 + pos2d.x % 3;
  //   return {area:area,pos:pos};
  // }

  export function Area2Pos(area:AreaPosition):Position2D {
    const x = ((area.area % 3) * 3) + (area.pos % 3);
    const y = Math.floor(area.area / 3) * 3 + Math.floor(area.pos / 3);
    return {x:x,y:y};
  }

  export function createUniqPosList(listList : Position2D[][]):Position2D[] {
    let buff = new Map<number,Position2D>();
    listList.forEach(list => {
      list.forEach(pos2D => {
        let key = pos2D.x + pos2D.y * 10;
        buff.set(key,pos2D);
      });
    });
    return Array.from(buff.values());
  }
}
