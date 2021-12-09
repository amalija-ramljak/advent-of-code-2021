import fs from 'fs';
const puzzleInput = fs.readFileSync('day03/my.puzzle.txt', { encoding: 'utf8', flag: 'r' }).split("\n");
const transposedPuzzleInput: string[][] = [];
puzzleInput.forEach((code, idx) => {
    code.split('').forEach((bit, bitIdx) => {
        if (idx === 0) {
            transposedPuzzleInput.push([bit]);
        } else {
            transposedPuzzleInput[bitIdx].push(bit);
        }
    });
});

// Part 1 variables
let result1;
let gamma_rate = '';
let epsilon_rate = '';

// Part 2 variables
let result2;
let oxygen_generator = puzzleInput;
let co2_scrubber = puzzleInput;
const filterCodes = (arr: string[], position: number, crit: 'most' | 'least') => {
    if (arr.length > 1) {
        let ones_count = 0;
        arr.forEach((code) => {
            if (code[position] === '1') {
                ones_count++;
            }
        })
        let value = '1';
        if (ones_count > arr.length / 2) {
            value = crit === 'most' ? '1' : '0';
        } else if (ones_count < arr.length / 2) {
            value = crit === 'most' ? '0' : '1';
        } else {
            value = crit === 'most' ? '1' : '0';
        }
        return arr.filter((el) => el[position] === value);
    } else {
        return arr;
    }
}

transposedPuzzleInput.forEach((position_values, position_idx) => {
    let count = 0;
    position_values.forEach((value) => {
        if (value === '1') count++;
    })
    if (count > puzzleInput.length / 2) {
        gamma_rate += '1';
        epsilon_rate += '0';
    } else {
        gamma_rate += '0';
        epsilon_rate += '1';
    }
});

for (let pos = 0; pos < puzzleInput[0].length; pos++) {
    oxygen_generator = filterCodes(oxygen_generator, pos, 'most');
    co2_scrubber = filterCodes(co2_scrubber, pos, 'least');
}

result1 = parseInt(gamma_rate, 2) * parseInt(epsilon_rate, 2);
result2 = parseInt(oxygen_generator[0], 2) * parseInt(co2_scrubber[0], 2);

console.log(`Day 3 / Part 1\n\tResult: ${result1}`);
console.log(`Day 3 / Part 2\n\tResult: ${result2}`);
