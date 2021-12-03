import { readFile } from "fs";
import { inputToArray } from "../helper";

const findMostCommonBit = (input: number[][], index: number) => {
    let ones = 0;
    let zeros = 0
    input.forEach((i) => {
        if (i[index] == 0) {
            zeros += 1;
        } else {
            ones += 1;
        }
    });

    return ones > zeros ? 1 : 0;
}

const findBitAndNumber = (input: number[][], index: number) => {
    let ones = [];
    let zeros = [];
    input.forEach((i, inputIndex) => {
        if (i[index] == 0) {
            zeros.push(input[inputIndex]);
        } else {
            ones.push(input[inputIndex]);
        }
    });

    return {
        zeros,
        ones
    };
}

const flipBinary = (binary: string) => {
    const parts = binary.split('');
    let result = '';
    parts.forEach((part) => {
        switch (part) {
            case '0':
                result = `${result}1`;
                break;
            case '1':
                result = `${result}0`;
                break;
        }
    });

    return result;
}

/**
 * done very quick "dumb" way
 */
inputToArray(__dirname + '/input.txt', (data: any[]) => {
    const input = data.map(item => {
        if (item) {
            return item.split('').map(i => parseInt(i, 10))
        }
    }).filter(Boolean);

    const numberLength = input[0].length;

    let gamma = '';
    for (let i = 0; i < numberLength; i++) {
        gamma = `${gamma}${findMostCommonBit(input, i)}`;
    }
    const epsilon = flipBinary(gamma);

    console.log('result 1', parseInt(gamma, 2) * parseInt(epsilon, 2));

    // Oxygen
    let inputArray = input.slice();
    for (let i = 0; i < numberLength; i++) {
        const result = findBitAndNumber(inputArray, i);
        if (result.ones.length > result.zeros.length) {
            // 1 > 0
            inputArray = result.ones;
        } else if (result.zeros.length > result.ones.length) {
            // 0 > 1
            inputArray = result.zeros;
        } else {
            // Equal
            inputArray = result.ones;
        }

        if (inputArray.length === 1) {
            break;
        }
    }
    const oxygen = parseInt(inputArray[0].join(''), 2);

    // CO2
    let inputArrayO = input.slice();
    for (let i = 0; i < numberLength; i++) {
        const result = findBitAndNumber(inputArrayO, i);
        if (result.ones.length > result.zeros.length) {
            // 1 > 0
            inputArrayO = result.zeros;
        } else if (result.zeros.length > result.ones.length) {
            // 0 > 1
            inputArrayO = result.ones;
        } else {
            // Equal
            inputArrayO = result.zeros;
        }

        if (inputArrayO.length === 1) {
            break;
        }
    }
    const co2 = parseInt(inputArrayO[0].join(''), 2);


    console.log('Result 2', oxygen * co2);
    
});
