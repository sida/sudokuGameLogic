

// let count = checkRow([1,2,0,0,5,1,7,0,0]);

// function checkRow(list:number[]):number[][] {

//   let count:number[][] = [];
//   list.forEach((num,index) => {
//     if (!count[num]) {
//       count[num] = [];
//     }
//     count[num].push(index);
//   });
//   console.log(count);
//   return count;
// }


import * as util from "./util";
import { Position2D } from "./Define";

p({x:0,y:0});
p({x:1,y:1});
p({x:2,y:8});
p({x:3,y:3});
p({x:4,y:7});
p({x:8,y:8});

function p(pos:Position2D) {
  console.log(pos);
  // const area = util.support.Pos2Area(pos);
  // console.log(area);
  // console.log(util.support.Area2Pos(area));
  console.log("------");
}
