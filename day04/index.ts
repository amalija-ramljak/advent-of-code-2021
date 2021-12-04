import fs from 'fs';

const puzzleInput = fs.readFileSync('day04/puzzleInput.txt', { encoding: 'utf8', flag: 'r' }).split('\n\n');

// cleanup input
const numbers_called = puzzleInput[0].split(',');
const boards = puzzleInput.slice(1).map(board => board.split('\n').map(row => row.split(' ').filter(Boolean)));
const MARKED = 'x';

// Part 1 variables
let result1;

const checkLine = (board: string[][], line_type: 'row' | 'col', line_length: number, fixed_index: number) => {
    let isFull = true;
    for (let idx = 0; idx < line_length; idx++) {
        let curr_val = line_type === 'row' ? board[fixed_index][idx] : board[idx][fixed_index];

        if (curr_val !== MARKED) {
            isFull = false;
            break;
        }
    }
    return isFull;
}

const checkBoard = (board: string[][], changed_position: { x: number, y: number }): boolean => {
    let isFullRow = checkLine(board, 'row', board[0].length, changed_position.x);
    let isFullCol = checkLine(board, 'col', board.length, changed_position.y);

    return isFullCol || isFullRow;
}

const calculateUnmarked = (board: string[][]): number => {
    let unmarked_sum = 0;
    board.forEach((row) => {
        row.forEach((num_on_board) => {
            if (num_on_board !== MARKED) {
                unmarked_sum += parseInt(num_on_board);
            }
        });
    });
    return unmarked_sum;
}

// Part 2 variables
let result2;
let boards_won = new Set();

loop:
for (let called_idx = 0; called_idx < numbers_called.length; called_idx++) {
    let called_number = numbers_called[called_idx];
    for (let board_idx = 0; board_idx < boards.length; board_idx++) {
        let changed_position = {
            x: -1,
            y: -1,
        };
        boards[board_idx] = boards[board_idx].map((row, ridx) => {
            return row.map((num_on_board, cidx) => {
                if (num_on_board === called_number) {
                    changed_position.x = ridx;
                    changed_position.y = cidx;
    
                    return MARKED;
                } else {
                    return num_on_board;
                }
            });
        });
        if (changed_position.x > -1) {
            if (checkBoard(boards[board_idx], changed_position)) {
                if (!result1) {
                    result1 = calculateUnmarked(boards[board_idx]) * parseInt(called_number);
                }
                boards_won.add(board_idx);
                if (boards_won.size === boards.length) {
                    result2 = calculateUnmarked(boards[board_idx]) * parseInt(called_number);
                    break loop;
                }
            }
        }
    }
}

console.log(`Day 4 / Part 1\n\tResult: ${result1}`);
console.log(`Day 4 / Part 2\n\tResult: ${result2}`);
