export interface Size2D{
  width:number;
  height:number;
}

export interface Position2D{
  x:number;
  y:number;
}

export interface AreaPosition{
  area:number;
  pos:number;
}

export enum Direction {
  none=0,up,down,left,right
}
