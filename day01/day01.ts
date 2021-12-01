import { readFile } from "fs";
import { inputToArray } from "../helper";

const findNumOfIncreases = (input: number[]) => {
    let increases = 0;

    input.forEach((value, index) => {
        if (index !== 0 && value > input[index - 1]) {
            increases += 1;
        }
    });

    return increases;
}

const createMeasurementBuckets = (input: number[]): number[] => {
    const buckets = [];

    input.forEach((value, index) => {
        for (let i = index; i >= Math.max(index - 2, 0); i--) {
            buckets[i] = buckets[i] ? buckets[i] + value : value;
        }
    });
    /**
     * 0 - 0
     * 1 - 0 1
     * 2 - 0 1 2
     * 3 - 1 2 3
     * 4 - 2 3 4
     * 5 - 3 4 5
     * 
     */
    return buckets;
}


inputToArray(__dirname + '/input1.txt', (data: any[]) => {
    const input = data.map(item => parseInt(item, 10)).filter(Boolean);

    console.log('Increases: ', findNumOfIncreases(input));
    console.log('Sliding Window increases', findNumOfIncreases(createMeasurementBuckets(input)));
});
