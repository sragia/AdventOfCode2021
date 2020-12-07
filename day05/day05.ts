import { readFile } from "fs";

type SeatType = {
    column: number;
    row: number;
    seatId: number;
}

const parseInput = (data: string) => {
    const lines = data.split('\n');

    return lines;
}

const getValue = (input: string, options: {
    min: number;
    max: number;
    low: string;
    high: string;
}) => {
    let max = options.max;
    let min = options.min;
    for (const letter of input.split('')) {
        const diff = max - min + 1
        if (letter === options.low) {
            // Bottom Half
            max -= diff / 2
        } else if (letter === options.high) {
            // Top Half
            min += diff / 2
        }
    }

    return min;
}

const getSeat = (seatId: string): SeatType => {
    const rowString = seatId.substr(0, 7);
    const colString = seatId.substr(seatId.length - 3, 3);

    const column = getValue(colString, {
        min: 0,
        max: 7,
        low: 'L',
        high: 'R'
    });
    const row = getValue(rowString, {
        min: 0,
        max: 127,
        low: 'F',
        high: 'B'
    })

    return {
        column,
        row,
        seatId: row * 8 + column
    }
}

const parseData = (data: string[]) => {
    let highestSeatId = 0;
    const seats = [];
    for (const pass of data) {
        const seat = getSeat(pass);
        if (seat.seatId > highestSeatId) {
            highestSeatId = seat.seatId
        }

        seats.push(seat);
    }

    return { seats, highestSeatId };
}

const findMySeatId = (seats: SeatType[]) => {
    seats.sort((a, b) => a.seatId - b.seatId);

    let previousSeatId: number | null;
    for (const seat of seats) {
        if (previousSeatId && (seat.seatId - previousSeatId) === 2) {
            return seat.seatId - 1;
        }
        previousSeatId = seat.seatId;
    }
}


readFile(__dirname + '/input.txt', 'utf8', (_, data) => {
    const passes = parseInput(data);

    const seatsData = parseData(passes);
    console.log('[PART 1]');
    console.log('Highest Seat ID', seatsData.highestSeatId);


    console.log('[PART 2]');
    console.log('My Seat ID', findMySeatId(seatsData.seats));

})