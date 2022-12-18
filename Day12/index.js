//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single command
const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(el => el.split(''));

const initialPosition = [];  //S position
const finish = [];           //E position
const allRoad = [];          //all paths to inspect
const visited = [];          //all paths visited
const shortestWay = [];      //dedicated array with all visited streets for finding the shortest street
const inputClone = JSON.parse(JSON.stringify(input));      //clone of input to display shortest way
const inputClone2 = JSON.parse(JSON.stringify(input));     //clone of input to display shortest way - PART 2

function part1 () {
    //Take coordinates of the start point and the end point, the current value set to 'a' and end point to 'z'
    input.forEach((row, indexRow) => {
        row.forEach((column, indexCol) => {

            if (column === 'S') {   // S position
                initialPosition.push(indexRow, indexCol);
                input[indexRow][indexCol] = 'a';
                allRoad.push([ initialPosition[0], initialPosition[1], 1 ]);
                visited.push(`${initialPosition[0]},${initialPosition[1]}`);
            } 

            if (column === 'E') {   // E position
                finish.push(indexRow, indexCol);
                input[indexRow][indexCol] = 'z';
            }  
        })
    });

    while (allRoad.length) {
        const [row, column, steps] = allRoad.shift();

        const next = [ [row + 1, column], [row - 1, column], [row, column + 1], [row, column - 1] ];

        for (el of next) {

            if (el[0] < 0 || el[1] < 0 || el[0] >= input.length || el[1] >= input[0].length) continue

            if (visited.find(way => way === `${el[0]},${el[1]}`)) continue

            if (input[el[0]][el[1]].charCodeAt() - input[row][column].charCodeAt() > 1) continue

            if (el[0] == finish[0] && el[1] == finish[1]) {
                const rightWay = getShortestWay(row, column, steps);
                console.log(print(rightWay, inputClone));
                console.log('PART 1:',steps);
            }
            visited.push(`${el[0]},${el[1]}`);
            allRoad.push([ el[0], el[1], steps +1 ]);
            shortestWay.push([ el[0], el[1], steps +1 ]);
        }
    }
};

//  PART 2
function part2 () {
    allRoad.length = 0;
    visited.length = 0;
    shortestWay.length = 0

    allRoad.push([ finish[0], finish[1], 1 ]);
    visited.push(`${finish[0]},${finish[1]}`);

    while (allRoad.length) {
        const [row, column, steps] = allRoad.shift();

        const next = [ [row + 1, column], [row - 1, column], [row, column + 1], [row, column - 1] ];

        for (el of next) {

            if (el[0] < 0 || el[1] < 0 || el[0] >= input.length || el[1] >= input[0].length) continue

            if (visited.find(way => way === `${el[0]},${el[1]}`)) continue

            if (input[el[0]][el[1]].charCodeAt() - input[row][column].charCodeAt() < -1) continue

            if (input[el[0]][el[1]] === 'a') {
                const rightWay = getShortestWay(row, column, steps);
                console.log('\n', print(rightWay, inputClone2));
                console.log('PART 2:',steps);
                return
            }
            visited.push(`${el[0]},${el[1]}`);
            allRoad.push([ el[0], el[1], steps +1 ]);
            shortestWay.push([ el[0], el[1], steps +1 ]);
        }
    }
};

//prints the drawing with the shortest path
function print (arr, input) {
    arr.forEach(el =>  input[el[0]][el[1]] = '.' );
    return input.reduce((str, el) => str + el.join('') + '\n', '');
};

//Identify the shortest way by searching from the end to the beginning
function getShortestWay (row, column, steps) {
    const result = [ [row, column] ];
    const next = (r, c) => [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]];

    for (let i = --steps; i > 1; i--) {
        const prev = shortestWay.filter(el => el[2] === i).map(el => [el[0],el[1]]);

        prev.forEach(elem => {
            next(result.at(-1)[0], result.at(-1)[1]).some(el => {
                if (JSON.stringify(el) === JSON.stringify(elem)) {
                    result.push(elem);
                return true
                }
            })
        })
    }
    return result;
};

part1();
part2();