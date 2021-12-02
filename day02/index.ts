import fs from 'fs';

const puzzleInput = fs.readFileSync('day02/puzzleInput.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

type DirectionType = 'up' | 'down' | 'forward';
const DIRECTIONS_1 = {
    up: { distance: 0, depth: -1 },
    down: { distance: 0, depth: 1 },
    forward: { distance: 1, depth: 0 },
}
const DIRECTIONS_2 = {
    up: { distance: 0, aim: -1 },
    down: { distance: 0, aim: 1 },
    forward: { distance: 1, aim: 0 },
}

// Part 1 variables
let result1;
let current_distance_1 = 0;
let current_depth_1 = 0;

// Part 2 variables
let current_aim = 0;
let current_distance_2 = 0;
let current_depth_2 = 0;
let result2;

puzzleInput.forEach((command) => {
    const [direction, num] = command.split(' ');
    const amount = parseInt(num);
    const { distance: distance_1, depth: depth_1 } = DIRECTIONS_1[direction as DirectionType];

    current_depth_1 += depth_1 * amount;
    current_distance_1 += distance_1 * amount;
    
    const { distance: distance_2, aim } = DIRECTIONS_2[direction as DirectionType];
    current_aim += aim * amount
    current_distance_2 += distance_2 * amount;
    if (direction === 'forward') {
        current_depth_2 += current_aim * amount;
    }
});

result1 = current_depth_1 * current_distance_1;
result2 = current_depth_2 * current_distance_2;

console.log(`Day 2 / Part 1\n\tResult: ${result1}`);
console.log(`Day 2 / Part 2\n\tResult: ${result2}`);
