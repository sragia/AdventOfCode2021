import { readFile } from "fs";

const target = 2020;

const mapInput = (input: number[]) => {
    const map: { [index: number]: number } = {}

    input.forEach(value => {
        map[value] = map[value] ? map[value] + 1 : 1;
    });

    return map;
}

const find2020Sumof2 = (input: number[]) => {
    const map: { [index: number]: number } = mapInput(input);

    for (const value of input) {
        const valueToFind = target - value
        if (map[valueToFind]) {
            return value * valueToFind
        }
    }

    return 'wat';
}


const find2020Sumof3 = (input: number[]) => {
    const map: { [index: number]: number } = mapInput(input);

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
    console.log('from 2:', find2020Sumof2(input))
    console.log('from 3:', find2020Sumof3(input))
});
