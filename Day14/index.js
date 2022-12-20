//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single solid rock x and y pos
const input = fs.readFileSync('./input.txt', 'utf8').split('\n')
                                                    .map(el => el.split(' -> '))
                                                    .map(el => el.map(ele => ele.split(',')))
                                                    .map(el => el.map(ele => [Number(ele[0]), Number(ele[1])]));

const xLength = [];
const yLength = [];

input.forEach(el => {
    el.forEach(elem => {
        xLength.push(elem[0]);
        yLength.push(elem[1]);
    })
});

xLength.sort((a,b) => b-a);
yLength.sort((a,b) => b-a);

const delta = xLength.at(-1)-1;
const xRange = xLength[0] - delta +1;

const caveDraw = [...Array(Number(yLength[0]) +3)].map(_ => new Array(xRange+1).fill('.'));

let sandPoint = 500-delta;
caveDraw[0][sandPoint] = '+';

input.forEach(el => {
    el.forEach((elem, index) => {
        if (el[index+1] === undefined) return;
        else {
            let xMin = el[index+1][0]-delta, xMax = elem[0]-delta;
            let yMin = el[index+1][1], yMax = elem[1];
            if (elem[0] < el[index+1][0]) [xMax, xMin] = [xMin, xMax];
            if (elem[1] < el[index+1][1]) [yMax, yMin] = [yMin, yMax];

            if (elem[0] === el[index+1][0])
                for (let i = yMin; i <= yMax; i++) caveDraw[i][elem[0]-delta] = '#';
            else
                for (let i = xMin; i <= xMax; i++) caveDraw[elem[1]][i] = '#';
        }
    })
});

let result = 0;
let pointY = 0;
let pointX = sandPoint;
//  PART 2  //////////////////////////////////////////////////////////////////
const caveDrawClone = JSON.parse(JSON.stringify(caveDraw));
caveDrawClone.at(-1).forEach((el, index) => caveDrawClone.at(-1)[index] = '#');
//////////////////////////////////////////////////////////////////////////////

while (pointY < yLength[0]+1) {

    if (caveDraw[pointY+1][pointX] === '.') pointY++;

    else {
        if (caveDraw[pointY+1][pointX-1] === '.') { pointY++; pointX-- }
        else if (caveDraw[pointY+1][pointX+1] === '.') { pointY++; pointX++ }
        else { result += 1; caveDraw[pointY][pointX] = 'o'; pointY = 0, pointX = sandPoint }
    }
};

console.log(caveDraw.reduce((str, el) => str + el.join('') + '\n', ''));
console.log('PART 1:', result);

//  PART 2
result = 0;
pointY = 0;
pointX = sandPoint;

while (caveDrawClone[0][sandPoint] !== 'o') {

    if (caveDrawClone[pointY+1][pointX] === '.') pointY++;

    else {
        if (pointX === 0) { 
            caveDrawClone.forEach((el, index) => {
                caveDrawClone.length -1 !== index ? caveDrawClone[index].unshift('.') : caveDrawClone[index].unshift('#')
            }); 
            sandPoint++;
        }
        if (pointX === caveDrawClone[0].length -1) {
            caveDrawClone.forEach((el, index) => {
                caveDrawClone.length -1 !== index ? caveDrawClone[index].push('.') : caveDrawClone[index].push('#');
            });
        }
        if (caveDrawClone[pointY+1][pointX-1] === '.') { pointY++; pointX-- }
        else if (caveDrawClone[pointY+1][pointX+1] === '.') { pointY++; pointX++ }
        else { result += 1; caveDrawClone[pointY][pointX] = 'o'; pointY = 0, pointX = sandPoint }
    }
};

console.log(caveDrawClone.reduce((str, el) => str + el.join('') + '\n', ''));
console.log('PART 2:', result);