//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single numbers
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');
let result = 0;

input.forEach(el => {
    const compart1 = el.slice(0, el.length/2);

    for (char of compart1) {
        if(el.includes(char, el.length/2)) {
            if (char.charCodeAt() > 96) result += char.charCodeAt()- 96;
            else result += char.charCodeAt() - 38;
            break
        }
    }
})

console.log(result)

//  PART 2
let result2 = 0;

input.forEach((el, index) => {
    if (index % 3 === 0 || index === 0) {
        let ind = index
        const second = input[++ind];
        const third = input[++ind];

        for (char of el) {
            if (second.includes(char)) {
                if (third.includes(char)) {
                    if (char.charCodeAt() > 96) result2 += char.charCodeAt()- 96;
                    else result2 += char.charCodeAt() - 38;
                    break
                }
            }
        }
    }
})

console.log(result2)
