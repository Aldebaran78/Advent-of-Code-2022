//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single command
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

class Monkey {
    constructor (startingItems, operation, test, testTrue, testFalse) {
        this.startingItems = startingItems,
        this.operation = operation,
        this.test = test,
        this.testTrue = testTrue,
        this.testFalse = testFalse
    }
    //cycle through all the monkey objects and return an array with the objects and the monkey index they go to
    thrownToMonkey (divideBy3, dividend) {
        const thrown = [];
        this.startingItems.forEach(items => {
            if (this.operation[1] === 'old') {
                if (this.operation[0] === '*') items *= items;
                if (this.operation[0] === '+') items += items;
                    
            } else {
                if (this.operation[0] === '*') items *= this.operation[1];
                if (this.operation[0] === '+') items += this.operation[1];
            }
            (divideBy3) ? items = Math.floor(items / 3) : items = items % dividend;  //PART2

            (items % this.test === 0) ? thrown.push([this.testTrue, items]) : thrown.push([this.testFalse, items]);
        })
        this.startingItems = [];
        return thrown
    }

    getItems (item) {
        this.startingItems.push(item)
    }
}

//Create all the instances by inserting the data from the input file
function createInstances () {
    const monkeys = [];
    let startingItems = [];
    let operation = [];
    let test = 0;
    let testTrue = 0;
    let testFalse = 0;

    input.forEach(line => {
        const splittedLine = line.split(':');
        const numberSplit = (num) => Number(splittedLine[1].split(' ')[num]);
        
        if (splittedLine[0] === '  Starting items') startingItems.push(...splittedLine[1].replaceAll(' ', '').split(',').map(el => Number(el)))
        else if (splittedLine[0] === '  Operation') operation.push(splittedLine[1].split(' ')[4], isNaN(numberSplit(5)) ? 'old' : numberSplit(5))
        else if (splittedLine[0] === '  Test') test = numberSplit(3);
        else if (splittedLine[0].replaceAll(' ','') === 'Iftrue') testTrue = numberSplit(4);
        else if (splittedLine[0].replaceAll(' ','') === 'Iffalse') testFalse = numberSplit(4);
        else if (splittedLine[0] === '') {
            monkeys.push(new Monkey(startingItems, operation, test, testTrue, testFalse));
            startingItems =[]; operation = []
        } 
    })
    return monkeys
};

//runs n cycles on all the monkeys
function playMonkeys (cycle, divideBy3) {
    const monkeys = createInstances();
    const nLaunch = [...Array(monkeys.length)].fill(0);
    const dividend = monkeys.map(monkey => monkey.test).reduce((a, b) => a * b, 1);  //PART2

    while(cycle--) { 
        monkeys.forEach((monkey, index) => {
            const thrown = monkey.thrownToMonkey(divideBy3, dividend);
            thrown.forEach(launch => monkeys[launch[0]].getItems(launch[1]));
            nLaunch[index] += thrown.length;
        })
    };
    return nLaunch.sort((a,b) => b-a);
};

const nLaunch = playMonkeys(20, true);
const nLaunch2 = playMonkeys(10000, false); //PART2

const result = nLaunch[0] * nLaunch[1];
const result2 = nLaunch2[0] * nLaunch2[1];  //PART2

console.log('PART 1:', result, 'PART 2:', result2)

