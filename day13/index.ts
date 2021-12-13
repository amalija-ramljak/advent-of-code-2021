import fs from 'fs';

const [dots, folds] = fs
  .readFileSync('day13/my.puzzle', { encoding: 'utf8', flag: 'r' })
  .split('\n\n')
  .map((section, idx) => {
    if (idx === 0) {
      return section.split('\n').map((pt) => {
        let [x, y] = pt.split(',');
        return { x: parseInt(x), y: parseInt(y) };
      });
    } else {
      return section.split('\n').map((fold) => {
        const [axis, value] = fold.split(' ')[2].split('=');
        return {
          x: axis === 'x' ? parseInt(value) : 0,
          y: axis === 'y' ? parseInt(value) : 0,
        };
      });
    }
  });

// Part 1 variables
let result1;

// Part 2 variables
let result2 = '';

type Dot = { x: number; y: number };
let currentDots: Dot[] = dots.slice();
let newDots: Dot[] = [];
let foldStep = 0;
for (let fold of folds) {
  newDots = [];
  currentDots.forEach((dot) => {
    if (fold.x !== 0 && dot.x > fold.x) {
      dot.x -= 2 * Math.abs(dot.x - fold.x);
    } else if (fold.y !== 0 && dot.y > fold.y) {
      dot.y -= 2 * Math.abs(dot.y - fold.y);
    }
    if (!newDots.find((newDot) => newDot.x === dot.x && newDot.y === dot.y)) {
      newDots.push(dot);
    }
  });
  currentDots = newDots;
  foldStep++;
  if (foldStep === 1) {
    result1 = currentDots.length;
  }
}

console.log(`Day 13 / Part 1\n\tResult: ${result1}`);
console.log('Day 13 / Part 2\n\tResult: in file day13/part2.output');

let max_x = 0, max_y = 0;
currentDots.forEach(dot => {
    if (dot.x > max_x) max_x = dot.x;
    if (dot.y > max_y) max_y = dot.y;
});
for (let row = 0; row <= max_y; row++) {
  for (let col = 0; col <= max_x; col++) {
    if (!currentDots.find((dot) => dot.x === col && dot.y === row)) {
      result2 += '.';
    } else {
      result2 += '#';
    }
  }
  result2 += '\n';
}
fs.writeFileSync('day13/part2.output', result2);
