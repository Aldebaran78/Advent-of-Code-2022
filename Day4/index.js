//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single elf zone
const input = fs.readFileSync('./input.txt', 'utf8').split(/[\n,]/);
let result = 0;
let result2 = 0;

input.forEach((el, index) => {
    if (index === 0 || index %2 === 0) {
        const elf1 = el.split('-').map(el => Number(el));
        const elf2 = input[++index].split('-').map(el => Number(el));

        if(elf1[0] >= elf2[0] && elf1[0] <= elf2[1] && elf1[1] >= elf2[0] && elf1[1] <= elf2[1]) result++;
        else if(elf2[0] >= elf1[0] && elf2[0] <= elf1[1] && elf2[1] >= elf1[0] && elf2[1] <= elf1[1]) result++;

        //  PART 2
        else if(elf1[0] >= elf2[0] && elf1[0] <= elf2[1] || elf2[0] >= elf1[0] && elf2[0] <= elf1[1]) result2++;
    }
});

console.log('PART1', result);
console.log('PART2', result+result2);

