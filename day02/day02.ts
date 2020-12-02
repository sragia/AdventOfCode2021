import { readFile } from "fs";

type LineType = {
    min: number;
    max: number;
    letter: string;
    password: string;
}

const validate1Input = (input: LineType) => {
    const letterMatch = input.password.match(new RegExp(input.letter, "g"));
    const letterCount = letterMatch ? letterMatch.length : 0;

    if (letterCount >= input.min && letterCount <= input.max) {
        return true
    }

    return false;
}

const validate2Input = (input: LineType) => {
    const letterMin = input.password.substr(input.min, 1);
    const letterMax = input.password.substr(input.max, 1);

    if ((letterMax === input.letter && letterMin !== input.letter)
        || (letterMax !== input.letter && letterMin === input.letter)) {
        return true
    }

    return false;
}

const parseInput = (data: string) => {
    const parsedData: LineType[] = [];
    const lines = data.split('\n');
    for (const line of lines) {
        const d = line.split(":")
        const policy = d[0].split(' ');
        const limitation = policy[0].split('-');

        parsedData.push({
            min: parseInt(limitation[0], 10),
            max: parseInt(limitation[1], 10),
            letter: policy[1],
            password: d[1]
        })
    }

    return parsedData;
}

const validateData = (data: LineType[], validator: (input: LineType) => boolean) => {
    let valid = 0;
    let invalid = 0;
    for (const line of data) {
        if (validator(line)) {
            valid++;
        } else {
            invalid++;
        }
    }

    return { valid, invalid };
}


readFile(__dirname + '/input1.txt', "utf8", (_, data) => {
    const parsedData = parseInput(data);

    const validate1 = validateData(parsedData, validate1Input);
    console.log('part 2');
    console.log('valid', validate1.valid);
    console.log('invalid', validate1.invalid);

    const validate2 = validateData(parsedData, validate2Input);
    console.log('part 2');
    console.log('valid', validate2.valid);
    console.log('invalid', validate2.invalid);
});