//  PART 1
const fs = require('fs');
const path = require('path');

//Read the file and transform it into an array with the single elf zone
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const dirName = 'root';
const max = 100000;
const pathFiles = [];
const totalDisk = 70000000;
const emptyDiskSpace = 30000000;
let tmp = 0;

//delete old 'dir' directory
if (fs.existsSync('./'+dirName)) {
    fs.rmSync('./'+dirName, { recursive: true })
};

let dir = '';
//generate the 'dir' directory
input.forEach(el => {
    const splitted = el.split(' ');

    if (splitted[1] === 'cd') {
        if (splitted[2] === '/') dir = `./${dirName}`;
        else if (splitted[2] === '..') dir = dir.split('/').slice(0,-1).join('/')
        else dir += '/' + splitted[2];

    } else if (splitted[0] === 'dir') {
        fs.mkdirSync(path.join(__dirname,dir, splitted[1]), { recursive: true }, err => {
                if (err) return console.error(err);
        });

    } else if (!isNaN(Number(splitted[0]))) {
        fs.writeFileSync(path.join(__dirname, dir, splitted[0]), '', err => {
            if (err) return console.error(err);
        });
    }
});

//Create the pathFiles string array with all the directory paths
function throughDirectory(directory) {
    fs.readdirSync('./'+directory).forEach(file => {
        const absolute = path.join(directory, file);
        
        if (fs.statSync(absolute).isDirectory()) { pathFiles.push(absolute) ; return throughDirectory(absolute) }
        else {
            tmp += Number(file);
            const absolutePath = absolute.split('/').slice(0, -1).join('/');
            if (!pathFiles.includes(absolutePath)) pathFiles.push(absolutePath);
        }
        
    });
};

//cycle all folders and check those smaller than max or those larger to free up space
function cycleFolder() {
    throughDirectory(dirName);
    const result = [];
    const largeDir = [];   //  PART 2
    let freeSpace = 0;   //  PART 2

    pathFiles.forEach((el, index) => {
        tmp = 0; 
        throughDirectory(el);
        if (tmp <= max) result.push(tmp)
        
        //  PART 2  ////////////////////////////////////////////////////
        if (index === 0) freeSpace = tmp - (totalDisk - emptyDiskSpace);  
        else if (tmp >= freeSpace) largeDir.push(tmp)
        ////////////////////////////////////////////////////////////////
    });
    return [ result.reduce((acc, el) => acc + el), Math.min(...largeDir) ]
};

const result = cycleFolder();

console.log(`PART 1: ${result[0]}  - PART 2: ${result[1]}`)
