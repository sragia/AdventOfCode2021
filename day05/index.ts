import { readFile } from "fs";
import { exit } from "process";

const GRID_SIZE = 1000;

const createInitialGrid = (): number[][] => {
    const grid = new Array(GRID_SIZE);
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = new Array(GRID_SIZE).fill(0);
    }
    return grid;
}

const drawLine = (grid: number[][], line: { start: number[], end: number[] }, onlyStraightLines = true) => {
    // console.log(line);

    if (onlyStraightLines && line.start[0] !== line.end[0] && line.start[1] !== line.end[1]) {
        return grid;
    }

    const xDiff = Math.abs(line.start[0] - line.end[0]);
    const yDiff = Math.abs(line.start[1] - line.end[1]);

    if (xDiff === 0) {
        const x = line.start[0];
        for (let y = Math.min(line.start[1], line.end[1]); y <= Math.max(line.start[1], line.end[1]); y++) {
            grid[y][x] += 1;
        }
    } else if (yDiff === 0) {
        const y = line.start[1];
        for (let x = Math.min(line.start[0], line.end[0]); x <= Math.max(line.start[0], line.end[0]); x++) {
            grid[y][x] += 1;
        }
    } else {
        // diagonal - just works for 45 degree diagonal lines
        const yStart = line.start[0] < line.end[0] ? line.start[1] : line.end[1];
        const yEnd = line.start[0] < line.end[0] ? line.end[1] : line.start[1];
        let currentY = yStart;

        for (let x = Math.min(line.start[0], line.end[0]); x <= Math.max(line.start[0], line.end[0]); x++) {
            grid[currentY][x] += 1;    
            currentY += yStart < yEnd ? 1 : -1;
        }
    }

    return grid;
}

const findCrossingLineAmount = (grid: number[][]) => {
    let amount = 0;
    let checked = 0;
    grid.forEach(row => {
        row.forEach(column => {
            checked++;
            if (column > 1) {
                amount++;
            }
        })
    })

    return amount;
}

const partOne = (input) => {
    const grid = createInitialGrid();

    input.forEach(row => {
        const parts = row.split('->');
        const start = parts[0].split(',').map(part => parseInt(part.trim(), 10));
        const end = parts[1].split(',').map(part => parseInt(part.trim(), 10));

        const line =     {
            start,
            end
        }

        drawLine(grid, line);
    })
    console.log('Part 1 - Crossing lines - Only Straight', findCrossingLineAmount(grid));
}

const partTwo = (input) => {
    const grid = createInitialGrid();

    input.forEach(row => {
        const parts = row.split('->');
        const start = parts[0].split(',').map(part => parseInt(part.trim(), 10));
        const end = parts[1].split(',').map(part => parseInt(part.trim(), 10));

        const line = {
            start,
            end
        }

        drawLine(grid, line, false);
    })
    console.log('Part 2 - Crossing lines - With Diagonal', findCrossingLineAmount(grid));
}

readFile(__dirname + '/input.txt', "utf8", (_, data) => {
    console.time('runtime');
    const input = data.split("\n").map(item => item.trim());
    
    partOne(input);
    partTwo(input);

    console.timeEnd('runtime');
});
