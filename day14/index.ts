import fs from 'fs';

const [template, rule_list] = fs
  .readFileSync('day14/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n\n');

const rules: Record<string, string> = {};
rule_list.split('\n').forEach((row) => {
  const [pair, insert] = row.split(' -> ');
  rules[pair] = insert;
});

// Part 1 variables
let result1;
let counter10: Record<string, number> = {};

// Part 2 variables
let result2;

let i = 0;
let insert = '';
let key = '';
let key1 = '';
let key2 = '';
let newKey = '';

let current_template_dict: Record<string, number> = {};
let next_template_dict: Record<string, number> = {};
const letterCounter: Record<string, number> = {};

for (i = 0; i < template.length - 1; i++) {
  if (template[i] in letterCounter) {
    letterCounter[template[i]] += 1;
  } else {
    letterCounter[template[i]] = 1;
  }

  key = `${template[i]}${template[i + 1]}`;
  if (key in current_template_dict) {
    current_template_dict[key] += 1;
  } else {
    current_template_dict[key] = 1;
  }
}

if (template[i] in letterCounter) {
  letterCounter[template[i]] += 1;
} else {
  letterCounter[template[i]] = 1;
}

i = 0;

next_template_dict = { ...current_template_dict };

for (i = 1; i <= 40; i++) {
  for (key in current_template_dict) {
    if (!current_template_dict[key]) continue;

    insert = rules[key];

    // count letters as they come
    if (insert in letterCounter) {
      letterCounter[insert] += current_template_dict[key];
    } else {
      letterCounter[insert] = current_template_dict[key];
    }

    next_template_dict[key] -= current_template_dict[key];

    [key1, key2] = key.split('');

    newKey = `${key1}${insert}`;
    if (newKey in next_template_dict) {
      next_template_dict[newKey] += current_template_dict[key];
    } else {
      next_template_dict[newKey] = current_template_dict[key];
    }

    newKey = `${insert}${key2}`;
    if (newKey in next_template_dict) {
      next_template_dict[newKey] += current_template_dict[key];
    } else {
      next_template_dict[newKey] = current_template_dict[key];
    }
  }

  current_template_dict = { ...next_template_dict };

  if (i === 10) {
    counter10 = { ...letterCounter };
  }
}

let most = 0;
let least = Infinity;

for (key in counter10) {
  if (counter10[key] > most) most = counter10[key];
  if (counter10[key] < least) least = counter10[key];
}
result1 = most - least;

most = 0;
least = Infinity;
for (key in letterCounter) {
  if (letterCounter[key] > most) most = letterCounter[key];
  if (letterCounter[key] < least) least = letterCounter[key];
}

result2 = most - least;

console.log(`Day 14 / Part 1\n\tResult: ${result1}`);
console.log(`Day 14 / Part 2\n\tResult: ${result2}`);
