import { readFile } from "fs";

const findLeftRight = (input: number[], position: number) => {
    let right = 0;
    let left = 0;

    input.forEach(xPos => {
        if (xPos >= position) {
            right++;
        } else {
            left++;
        }
    })

    return {right,left};
}

const calculateFuelAtPosition = (input: number[], position: number, isPart2 = false) => {
    return input.reduce((prev, curr) => {
        if (isPart2) {
            const diff =  Math.abs(curr - position);

            return prev + ((diff * (diff + 1)) / 2)
        }
        return prev + Math.abs(curr - position)
    }, 0);
}

const findPosition = (input: number[]) => {
    let min = 9999;
    let max = 0;
    input.forEach(xPos => {
        if (xPos > max) {
            max = xPos;
        }
        if (xPos < min) {
            min = xPos;
        }
    })
console.log(min, max);
    const middle = Math.round(min + (max - min) / 2);

    const initial = findLeftRight(input, middle);
    if (initial.left === initial.right) {
        return middle;
    }
    const direction = initial.left < initial.right ? 1 : -1;
    let position = middle + direction;
    while (true) {

        const dist = findLeftRight(input, position);
        if (
            dist.right === dist.left ||
            (direction > 0 && dist.right < dist.left) ||
            (direction < 0 && dist.left < dist.right)
        ) {
            break;
        }
        position += direction;
    }

    console.log('Final Position', position);
    return position;
}

const fuckItBruteForcePart2 = (input: number[]) => {
    input.sort((a,b) => a - b);

    let minFuel = 99999999999999999999999;
    for (let position = input[0]; position <= input[input.length -1]; position++) {
        const fuel = calculateFuelAtPosition(input, position, true);
        if (fuel > minFuel) {
            return minFuel;
        }

        minFuel = fuel;
    }
}

readFile(__dirname + '/input.txt', "utf8", (_, data) => {
    console.time('runtime');
    const input = data.split(",").map(item => parseInt(item.trim(), 10));
    
    console.log('Part 1', calculateFuelAtPosition(input, findPosition(input)));
    console.log('Part 2', fuckItBruteForcePart2(input));

    console.timeEnd('runtime');
});
