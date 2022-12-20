//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single pair of signals
const input = fs.readFileSync('./input.txt', 'utf8').split('\n\n').map(el => el.split('\n')).map(el => [ eval(el[0]), eval(el[1]) ]);


function compare (left, right) {
        
    if(typeof left === 'number') {

        if (typeof right === 'number') {
            if(left === right) return 0
            else if (left < right) return 1
            else return -1 //PART 2 (added -1)

        } else if (Array.isArray(right)) return compare([left], right);
    
    } else if (Array.isArray(left)) {
            
        if (typeof right === 'number') return compare(left, [right])
        else if (Array.isArray(right)) {
            let i = 0;

            while (i < left.length && i < right.length) {
                const result = compare(left[i], right[i]);
                if (result !== 0) return result;
                i++;
            }

            if (i=== left.length) {
                if (left.length === right.length) return 0
                else return 1
            } else return -1 //PART 2
        }
    }
};

let result = [];

input.forEach((el, index) => {
    if(compare(el[0], el[1]) === 1 ) result.push(index+1)
});

console.log('PART 1:',result.reduce((a,b) => a+b));

//  PART 2
const input2 = [];

input.forEach(el => {
    input2.push(el[0], el[1])
});

input2.push([[2]], [[6]]);

input2.sort((a,b) => compare(a,b)).reverse();

const index = input2.findIndex(el => JSON.stringify(el) === JSON.stringify([[2]])) + 1;
const index2 = input2.findIndex(el => JSON.stringify(el) === JSON.stringify([[6]])) + 1;

console.log('PART 2:',index * index2)