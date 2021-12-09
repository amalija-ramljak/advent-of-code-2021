import fs from 'fs';
import { arraySum } from '../utils/utils';

const puzzleInput = fs.readFileSync('day01/my.puzzle.txt', { encoding: 'utf8', flag: 'r' }).split('\n').map((v) => parseInt(v));

// Part 1 variables
let localIncreases = 0;

// Part 2 variables
let previousWindow = -1;
let currentWindow = -1;
let windowIncreases = 0;

puzzleInput.forEach((currentDepth, index, depthList) => {
    if (index > 0 && currentDepth > depthList[index - 1]) {
        localIncreases++;
    }

    if (index > depthList.length - 2) return;

    if (previousWindow === -1) {
        previousWindow = arraySum(depthList.slice(index, index + 3));
    } else {
        currentWindow = previousWindow - depthList[index - 1] + depthList[index + 2];
        if (currentWindow > previousWindow) {
            windowIncreases++;
        }
        previousWindow = currentWindow;
    }
})

console.log(`Day 1 / Part 1\n\tResult: ${localIncreases}`);
console.log(`Day 1 / Part 2\n\tResult: ${windowIncreases}`);
