import { readFile } from "fs";

const target = 2020;

const findExpense2020 = (input: number[]) => {
    const map: { [index: number]: true } = {}

    input.forEach(value => {
        map[value] = true;
    })

    for (const value of input) {
        for (const value2 of input) {
            if (value2 !== value) {
                const valueToFind = target - value - value2;
                if (map[valueToFind] && valueToFind !== value && valueToFind !== value2) {
                    return value * valueToFind * value2
                }
            }
        }
    }

    return 'wat';
}

readFile(__dirname + '/input1.txt', "utf8", (_, data) => {
    const input = data.split("\n").map(value => parseInt(value, 10));
    console.log(findExpense2020(input))
});
