//  PART 1
const fs = require('fs');
const path = require('path');

//Read the file and transform it into an array with the single elf zone
const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(el => [ el.split(' ')[0], Number(el.split(' ')[1]) ]);

let table = [[1]];

function followTheTail (points) {
    input.forEach(command => {
        for (let i=0; i < command[1]; i++){
            switch (command[0]) {
                case 'L' :
                    if (points[0][1] < command[1]) {
                        if (i === 0) {
                            const addLines = command[1]-points[0][1];
                            table.forEach((_, index) => table[index].unshift(...[...Array(addLines)].fill(0)));
                            points.forEach((_, index) => points[index][1] += addLines)
                        }
                        points[0][1] -= 1;
                        move(points);

                    } else { points[0][1] -=1; move(points) }
                    break;

                case 'R' :
                    if (points[0][1] + command[1] > table[points[0][0]].length -1) {
                        if (i === 0) {
                            const arr = [...Array((command[1]+points[0][1]) - (table[points[0][0]].length-1))].fill(0);
                            table.forEach((_, index) => table[index].push(...arr));
                        }
                        points[0][1] += 1;
                        move(points);

                    } else { points[0][1] += 1; move(points) }
                    break;

                case 'U' :
                    if (points[0][0] - command[1] < 0) {
                        if (i === 0) {
                            const addRow = command[1] - points[0][0];
                            table.unshift(...[...Array(addRow)].map(_ => [...Array(table[points[0][0]].length)].fill(0)));
                            points.forEach((_, index) => points[index][0] += addRow);
                        }
                        points[0][0] -= 1;
                        move(points);

                    } else { points[0][0] -= 1; move(points) }
                    break;

                case 'D' :
                    if (points[0][0] + command[1] > table.length-1) {
                        if (i === 0) {
                            const arr = [...Array((points[0][0] + command[1]) - (table.length-1))].map(_ => [...Array(table[points[0][0]].length)].fill(0))
                            table.push(...arr);
                        }
                        points[0][0] += 1;
                        move(points); 

                    } else { points[0][0] += 1; move(points) }
                    break;
            }
        }
    })
};

function move (points) {
    points.forEach((el, indx) => {
        const previous = points[indx-1];
         if (indx > 0) {

            //if there is more than one position of difference both vertically and horizontally
            if (Math.abs(previous[0] - el[0]) > 1 && Math.abs(previous[1] - el[1]) > 1) {
                const leftRight = (el[1] < previous[1]) ? previous[1]-1 : previous[1]+1;
                const upDown = (el[0] > previous[0]) ? previous[0]+1 : previous[0]-1;
                points[indx] = [ upDown, leftRight ];
                if (indx === points.length-1) table[upDown][leftRight]=1;
            }

            //if the point is in the same row as the previous point and is more than 1 position apart
            else if (Math.abs(previous[1] - el[1]) > 1) {
                const [ min, max ] = [ Math.min(previous[1], el[1]), Math.max(previous[1], el[1]) ];
                if (indx === points.length-1) table[el[0]].forEach((_, index) => { if(index > min && index < max) table[previous[0]][index]=1 });
                points[indx] = [ previous[0], (previous[1] > el[1]) ? previous[1]-1 : previous[1]+1 ];
            }

            //if the point is NOT in the same row as the previous point and is more than 1 position away vertically
            else if (previous[0] !== el[0] && Math.abs(previous[0] - el[0]) > 1) {
                const [ min, max ] = [ Math.min(previous[0], el[0]), Math.max(previous[0], el[0]) ];
                if (indx === points.length-1) table.forEach((_, index) => { if(index > min && index < max) table[index][previous[1]]=1 });
                const upDown = (previous[0] === min) ? previous[0]+1 : previous[0]-1;
                points[indx] = [ upDown, previous[1] ];
            } 
        }
    })
};

function showResult (numberPoints, title) {
    const fileName = './' + title + '_graphicsMap.txt';

    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName, (err) => {
            if (err) return console.error(err);
        })
    };
    table = [[1]];
    const points = new Array(numberPoints).fill(0).map(_ => new Array(2).fill(0));
    followTheTail(points);
    const graphicsMap = table.reduce((str, el) => str + el.join('') + '\n', '');
    const result = table.flat().reduce((acc, el) => acc + el);
    fs.writeFileSync(fileName, graphicsMap, err => {
        if (err) return console.error(err);
    });
    console.log(title,':',result)
};

showResult(2, 'PART_1');
showResult(10, 'PART_2');
console.log('\nTo see the map open the files\nPART_1_graphicsMap.txt\nPART_2_graphicsMap.txt\nand decrease zoom to see the whole box')
