//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single command
const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(el => [ el.split(' ')[0], Number(el.split(' ')[1]) ]);

let cycle = 0;
let X = 1;
const signal = [20, 60, 100, 140, 180, 220];
const result = [];

input.forEach(el => {
    if (el[0] === 'addx') { cycle += 2; X += el[1] }
    else cycle +=1;

    if (cycle === signal[0] && isNaN(el[1])) { result.push(signal[0] * X); signal.shift() }
    else if (cycle >= signal[0]) { result.push(signal[0] * (X - el[1])); signal.shift() }
});

const sum = result.reduce((acc, el) => acc + el)
console.log('PART 1:', sum);

//  PART 2

//Create an array of 6 arrays, each with 40 '.' inside of
const display = [...Array(6)].map(_ => new Array(40).fill('.'));
let inputIndex = 0;
let endAddx = false;
let spritePosition = 0;

const result2 = display.map(line => {
    return line.map((point, indexH) => {
        point = (indexH >= spritePosition && indexH <= spritePosition + 2) ? '#' : '.'
            
        if (input[inputIndex][0] === 'addx' && !endAddx) endAddx = true

        else if (endAddx) { spritePosition += input[inputIndex][1]; inputIndex += 1; endAddx = false }

        else if (input[inputIndex][0] === 'noop') { endAddx = false; inputIndex += 1 }

        return point;
    })
});

const graphicsDisplay = result2.reduce((str, el) => str + el.join('') + '\n', '');
console.log('PART 2:')
console.log(graphicsDisplay)