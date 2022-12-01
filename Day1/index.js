//  PART 1

const fs = require('fs');

//Read the file and transform it into an array with the single numbers
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

//Add all the numbers up to the empty item, create an array with all the calories added up for each elf
let tmp = 0;
const elfTotal = input.reduce((acc, kcal) => {
    if (kcal !== '') { tmp += Number(kcal); return acc}
    else { acc.push(tmp); tmp = 0; return acc }
}, []);

//I find the elf with the most calories
let result = Math.max(...elfTotal)

console.log('elf with the most calories',result)

// ----------------------------------
//  PART 2

let sum = result;

for (let i = 0; i < 2; i++) {
    elfTotal.splice(elfTotal.indexOf(result), 1);
    result = Math.max(...elfTotal);
    sum += result
};

console.log('sum of the calories of the 3 elves who have the most',sum)

