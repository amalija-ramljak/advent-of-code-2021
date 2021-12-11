import fs from 'fs';

type BracketType = '(' | '[' | '{' | '<' | '>' | '}' | ']' | ')';
const puzzleInput = fs
  .readFileSync('day10/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map((line) => line.split('') as BracketType[]);

type BracketDataType = {
  errorScore: number;
  autocompleteScore: number;
  opening: string;
};
const closingBracketData = {
  ')': {
    errorScore: 3,
    autocompleteScore: 1,
    opening: '(',
  },
  ']': {
    errorScore: 57,
    autocompleteScore: 2,
    opening: '[',
  },
  '}': {
    errorScore: 1197,
    autocompleteScore: 3,
    opening: '{',
  },
  '>': {
    errorScore: 25137,
    autocompleteScore: 4,
    opening: '<',
  },
} as Record<BracketType, BracketDataType>;

const openingBracketPairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
} as Record<BracketType, BracketType>;

const openingBrackets = '([{<';
const isOpeningBracket = (bracket: string) => {
  return openingBrackets.includes(bracket);
};

const closingBrackets = ')]}>';
const isClosingBracket = (bracket: string) => {
  return closingBrackets.includes(bracket);
};

const stack: BracketType[] = [];

// Part 1 variables
let result1 = 0;

// Part 2 variables
let result2 = 0;
let lineScore = 0;
const scores: number[] = [];

let isCorrupt = false;
puzzleInput.forEach((line) => {
  stack.length = 0;
  isCorrupt = false;
  for (let bracket of line) {
    if (isOpeningBracket(bracket)) {
      stack.push(bracket);
    } else {
      if (stack[stack.length - 1] !== closingBracketData[bracket].opening) {
        result1 += closingBracketData[bracket].errorScore;
        isCorrupt = true;
        break;
      } else {
        stack.pop();
      }
    }
  }
  if (!isCorrupt) {
    lineScore = 0;
    for (let i = stack.length - 1; i > -1; i--) {
      lineScore *= 5;
      lineScore +=
        closingBracketData[openingBracketPairs[stack[i]]].autocompleteScore;
      stack.pop();
    }
    scores.push(lineScore);
  }
});

scores.sort((a, b) => b - a);

result2 = scores[Math.floor(scores.length / 2)];

console.log(`Day 10 / Part 1\n\tResult: ${result1}`);
console.log(`Day 10 / Part 2\n\tResult: ${result2}`);
