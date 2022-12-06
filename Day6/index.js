//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single elf zone
const input = fs.readFileSync('./input.txt', 'utf8').split('');

for (const [index, el] of input.entries()) {
    if (index > 2) {
        const fourChar = [input[index-3], input[index-2], input[index-1], el];
        const fourCharSet = new Set(fourChar);

        if (fourChar.length === fourCharSet.size) {console.log('PART 1:',index+1); break}
    }
};

//  PART2
for (const [index, el] of input.entries()) {
    if (index > 12) {
        const fourteenChar = [];
        for (let i=index-13; i <= index; i++) fourteenChar.push(input[i])
        const fourteenCharSet = new Set(fourteenChar);

        if (fourteenChar.length === fourteenCharSet.size) {console.log('PART 2:',index+1); break}
    }
};