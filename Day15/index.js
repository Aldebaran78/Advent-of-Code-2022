//  PART 1
const fs = require('fs');

//Read the file and transform it into an array with the single solid rock x and y pos
const input = fs.readFileSync('./input.txt', 'utf8').replaceAll('Sensor at x=', ' ')
                                                    .replaceAll(': closest beacon is at x=', ' ')
                                                    .replaceAll(', y=', ' ')
                                                    .split(/\n+/)
                                                    .map(el => el.split(' '));
                                                    
const sensors = [];
const beacons = [];
const distances = [];
const fromTo = [];
const Y = 2000000;

//Copy all the data in 3 arrays, the sensors and the beacon with the coordinates and the calculated manhattan distance
input.forEach(el=> {
    const sensor = [Number(el[1]), Number(el[2])];
    const beacon = [Number(el[3]), Number(el[4])];
    sensors.push(sensor);
    beacons.push(beacon);
    distances.push( Math.abs(sensor[0]-beacon[0]) + Math.abs(sensor[1]-beacon[1]) );
});

//Calculate the engagement of the signal with respect to the Y reference line
sensors.forEach((el, index) => {
    const distFromCenter =  distances[index] - Math.abs(el[1] - Y);
    if (distFromCenter > 0) fromTo.push([el[0] - distFromCenter, el[0] + distFromCenter]);
});

const beaconInSameLine = beacons.filter(el => el[1] === Y).map(el => el[0]);

const min = fromTo.sort((a, b) => a[0]-b[0])[0][0];
const max = fromTo.sort((a, b) => b[1]-a[1])[0][1];

let result = 0;
for (let x = min; x <= max; x++) {
    if (beaconInSameLine.includes(x)) continue;

    if (fromTo.find(el => el[0] <= x && x <= el[1])) result++;
};
    
console.log('PART 1:', result);

// PART 2

const positive = [];
const negative = [];
let pos = 0;
let neg = 0;

sensors.forEach((el, index) => {
    const dist = distances[index];
    negative.push(el[0] + el[1] - dist, el[0] + el[1] + dist);
    positive.push(el[0] - el[1] - dist, el[0] - el[1] + dist);
});

for (let i = 0; i < 2 * sensors.length; i++) {
    for (let j = i+1; j < 2 * sensors.length; j++){

        if (Math.abs(positive[i] - positive[j]) === 2)
            pos = Math.min(positive[i], positive[j]) + 1;

        if (Math.abs(negative[i] - negative[j]) === 2)
            neg = Math.min(negative[i], negative[j]) + 1;
    }
};

const frequency = Math.floor((pos + neg) / 2) * 4000000 + Math.floor((neg - pos) / 2);

console.log('PART 2:', frequency);