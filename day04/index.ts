import { readFile } from "fs";

const ROW_COLUMN_LENGTH = 5;
const bingoSequence = [93,35,66,15,6,51,49,67,16,77,80,8,1,57,99,92,14,9,13,23,33,11,43,50,60,96,40,25,22,39,56,18,2,7,34,68,26,90,75,41,4,95,71,30,42,5,46,55,27,98,79,12,65,73,29,28,17,48,81,32,59,63,85,91,52,21,38,31,61,83,97,62,44,70,19,69,36,47,74,58,78,24,72,0,10,88,37,87,3,45,82,76,54,84,20,94,86,53,64,89]

const calculateBoard = (numbers: number[][], lastNumber: number, toComplete: number): number => {
    const bingoSequenceFiltered = bingoSequence.slice(0, toComplete);
    let unmarkedSum = 0;
    numbers.forEach(line => {
        line.forEach(lineNumber => {
            if (!bingoSequenceFiltered.includes(lineNumber)) {
                unmarkedSum += lineNumber;
            }
        });
    });

    return unmarkedSum * lastNumber;
}

const getBoardColumns = (rows: number[][]): number[][] => {
    const columns = [[],[],[],[],[]];
    for (let i = 0; i < ROW_COLUMN_LENGTH; i++) {
        rows.forEach(row => columns[i].push(row[i]));
    }
    return columns;
}

const checkInput = (numbers: number[]): {toComplete: number; lastNumber: number} => {
    let found = 0; 
    let toComplete = 0;
    for (const bingoNumber of bingoSequence) {
        toComplete++;
        if (numbers.includes(bingoNumber)) {
            found++;
            if (found === ROW_COLUMN_LENGTH) return {toComplete, lastNumber: bingoNumber};
        }
    }
}

readFile(__dirname + '/input.txt', "utf8", (_, data) => {
    const input = data.split("\n").map(item => item.trim());
    const boards = [];
    let currentBoardIdx = 0;
    console.time('runtime');
    input.forEach(row => {
        if (row === '') {
            boards[currentBoardIdx].columns = getBoardColumns(boards[currentBoardIdx].rows);
            currentBoardIdx++;
            return
        }
        boards[currentBoardIdx] = boards[currentBoardIdx] || {rows: [], columns: []};
        boards[currentBoardIdx].rows.push(row.split(/\s+/).map(number => parseInt(number, 10)))
    });

    let boardFinishes = [];

    boards.forEach((board, index) => {
        // Rows
        let fastestSequenceToFin = null;
        board.rows.forEach((row, rowIndex) => {
            const result = checkInput(row);
            if (!fastestSequenceToFin || fastestSequenceToFin.toComplete > result.toComplete) {
                fastestSequenceToFin = {
                    board: index,
                    row: rowIndex,
                    toComplete: result.toComplete,
                    lastNumber: result.lastNumber
                };
            }
        });

        // Columns
        board.columns.forEach((column, columnIndex) => {
            const result = checkInput(column);
            if (!fastestSequenceToFin || fastestSequenceToFin.toComplete > result.toComplete) {
                fastestSequenceToFin = {
                    board: index,
                    column: columnIndex,
                    toComplete: result.toComplete,
                    lastNumber: result.lastNumber
                };
            }
        });

        boardFinishes[index] = fastestSequenceToFin
    });

    boardFinishes.sort((a,b) => a.toComplete - b.toComplete);

    // Part 1
    let numbers = [];
    if (boardFinishes[0].row) {
        numbers = boards[boardFinishes[0].board].rows
    } else {
        numbers = boards[boardFinishes[0].board].columns
    }
    console.log('First Board to complete', calculateBoard(numbers, boardFinishes[0].lastNumber, boardFinishes[0].toComplete))

    // Part 2
    let numbersSlow = [];
    if (boardFinishes[boardFinishes.length - 1].row) {
        numbersSlow = boards[boardFinishes[boardFinishes.length - 1].board].rows
    } else {
        numbersSlow = boards[boardFinishes[boardFinishes.length - 1].board].columns
    }

    console.log('Last board to complete', calculateBoard(numbersSlow, boardFinishes[boardFinishes.length - 1].lastNumber, boardFinishes[boardFinishes.length - 1].toComplete))
    
    console.timeEnd('runtime');
});
