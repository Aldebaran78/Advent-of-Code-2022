//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single elf zone
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

//to make the program work even if the height or the number of stacks changes, 
//Take the index of the empty line that separates the graph from the commands
const separator = input.indexOf('');

const startingStacks = input
                        .slice(0,separator)
                        .map(el => el.replaceAll(/[\[\]]/g, ' ')
                        .replace(' ',''))
                        .reverse();

const commands = input.slice(separator+1);

//Transform the graph into an object, key is the number of stacks of crates, value is an array with all the crates
const stack = startingStacks.reduce((obj, line, index) => {
    if(index === 0) {
        for (char of line.replaceAll(' ', '')) obj = {...obj, [Number(char)] : []};
        return obj;

    } else {
        let tmp = 1;
        [...line].forEach((char, ind) => {
            if(ind % 4 === 0) {
                if (char !== ' ') obj = {...obj, [tmp] : obj[tmp].concat(char)};
                tmp++}
        })
        return obj
    }
}, {});

//  PART 2  ////////////////////////////////////////
const stackClone = JSON.parse(JSON.stringify(stack))
////////////////////////////////////////////////////

//Transform the commands into an array made up of 3 numbers: how many crates from where to where
//then i move the crates using pop and push on stack object values
commands.forEach((command,idex) => {
    commToArr = command
                    .replace('move ', '')
                    .replace(' from ', ',')
                    .replace(' to ', ',')
                    .split(',')
                    .map(num => Number(num));
    let i = 0;

    while (i < commToArr[0]) {
        const move = stack[commToArr[1]].pop();
        stack[commToArr[2]].push(move)
        i++
    };

    //  PART2  ///////////////////////////////////////////////////////
    const move2 = stackClone[commToArr[1]].splice(-commToArr[0]);
    stackClone[commToArr[2]] = stackClone[commToArr[2]].concat(move2);
    //////////////////////////////////////////////////////////////////
});

//I take the last element of each array
const result = Object.values(stack).map(el => el.at(-1)).join('');
const result2 = Object.values(stackClone).map(el => el.at(-1)).join('');

console.log('PART 1:',result, ' - PART 2:', result2)