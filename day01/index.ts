import fs from 'fs';

const fileContent = fs.readFileSync('day01/puzzleInput.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

// Part 1 variables
let localIncreases = 0;

fileContent.reduce((previousDepth, currentDepth) => {
    if (parseInt(currentDepth) > parseInt(previousDepth)) {
        localIncreases++;
    }
    return currentDepth;
})

console.log(`Day 1 / Part 1\n\tResult: ${localIncreases}`);
