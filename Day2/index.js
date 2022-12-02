const fs = require('fs');

//  PART 1
// A & X = rock - B & Y = paper - C & Z = scissors
const point = {
    'AX': 4,
    'AY': 8,
    'AZ': 3,
    'BX': 1,
    'BY': 5,
    'BZ': 9,
    'CX': 7,
    'CY': 2,
    'CZ': 6,
};

//PART 2
// A = rock - B = paper - C = scissors  // Y = draw - X = lose - Z = win
const point2 = {
    'AX': 3,
    'AY': 4,
    'AZ': 8,
    'BX': 1,
    'BY': 5,
    'BZ': 9,
    'CX': 2,
    'CY': 6,
    'CZ': 7,
};

//Read the file and transform it into an array with the single lines
const input = fs.readFileSync('./input.txt', 'utf8').replaceAll(' ', '').split('\n');

//PART1
const result = input.reduce((acc, round) => acc + point[round], 0);
//PART2
const result2 = input.reduce((acc, round) => acc + point2[round], 0);

console.log('PART1:',result,' PART2:',result2)



