import { readFile } from "fs";
import { inputToArray } from "../helper";

const parseInputDirections = (input: {direction: 'forward' | 'down' | 'up'; value: number}[]): {horizontal: number; depth: number} => {
    let horizontal = 0;
    let depth = 0;

    input.forEach((inp) => {
        switch(inp.direction) {
            case 'down':
                depth += inp.value;
                break;
            case 'forward':
                horizontal += inp.value;
                break;
            case 'up':
                depth -= inp.value;
        }
    })

    return {
        horizontal,
        depth
    };
}

const parseInputDirectionsWithAim = (input: {direction: 'forward' | 'down' | 'up'; value: number}[]): {horizontal: number; depth: number} => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0

    input.forEach((inp) => {
        switch(inp.direction) {
            case 'down':
                aim += inp.value;
                break;
            case 'forward':
                horizontal += inp.value;
                depth += inp.value * aim;
                break;
            case 'up':
                aim -= inp.value;
        }
    })

    return {
        horizontal,
        depth
    };
}


inputToArray(__dirname + '/input.txt', (data: any[]) => {
    console.time('runtime');
    const input = data.map(item => {
        if (item) {
            const parts = item.split(' ');
            return {
                direction: parts[0],
                value: parseInt(parts[1], 10)
            }
        }
    }).filter(Boolean);

    const result = parseInputDirections(input);
    console.log('Result 1 -' , result.depth * result.horizontal, result);

    
    const result2 = parseInputDirectionsWithAim(input);
    console.log('Result 2 -' , result2.depth * result2.horizontal, result2);
    console.timeEnd('runtime');
});
