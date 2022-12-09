//  PART 1
const fs = require('fs');
const path = require('path');

//Read the file and transform it into an array with the single elf zone
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

let result = 0;
let result2 = [];  //  PART 2

//check if there are equal or bigger numbers in the row and column given a certain position
function checkCoordinate (x, y, val) {
    const row = input[y];
    const indexes = [0,0,0,0];
    const left = row.slice(0, x).split('').map(el => Number(el));
    const leftFree = left.every(el =>  el < val);

    let right = (x === row.length-1) ? row.slice(row.length) : row.slice(-(row.length-x-1));
    right = right.split('').map(el => Number(el)).every((el, index) => { indexes[1]=index+1; return el < val });
    
    const up = input.every((el, index) => !(index < y && Number(el[x]) >= val));
    const down = input.every((el, index) => { indexes[3]=index-y;return !(index > y && Number(el[x]) >= val) });

    //  PART 2  ////////////////////////////////////////////////////////////////////////////////////////////////////
    const up2 = input.slice(0, y).reverse().some((el, index) => { indexes[2]=index+1; return val <= Number(el[x]) });
    const left2 = left.reverse().some((el, index) => { indexes[0]=index+1; return val <= el });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const part1 = [leftFree, right, up, down].some(el => el);
    const part2 = indexes.reduce((acc,el) => acc * el);    //  PART2

    return [part1, part2]
};

//loop through all numbers and if checkCoordinate returns true increment result
input.forEach((row, indexRow) => {
    let indexColumn = row.length;

    while (indexColumn--) {
        const res = checkCoordinate(indexColumn, indexRow, Number(row[indexColumn]));
        if(res[0]) result += 1;
        result2.push(res[1]);
    }
});

console.log('PART 1:', result, '--- PART 2:', Math.max(...result2))