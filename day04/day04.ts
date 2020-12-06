import { readFile } from "fs";

const EYE_COLORS = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const numberValidator = (value: string, min: number, max: number) => {
    const num = parseInt(value, 10);
    if (num && num >= min && num <= max) {
        return true;
    }
    return false;
}

const REQUIRED_FIELDS = {
    byr: (value: string) => {
        return numberValidator(value, 1920, 2002);
    },
    iyr: (value: string) => {
        return numberValidator(value, 2010, 2020);
    },
    eyr: (value: string) => {
        return numberValidator(value, 2020, 2030);
    },
    hgt: (value: string) => {
        const unit = value.substr(value.length - 2, 2);
        const numericValue = value.match(/[0-9]+/g)[0];
        switch (unit) {
            case 'cm':
                return numberValidator(numericValue, 150, 193);
            case 'in':
                return numberValidator(numericValue, 59, 76);
            default:
                return false;
        }
    },
    hcl: (value: string) => {
        const regex = /^#[0-9a-f]{6}$/g
        if (value.match(regex)) {

            return true
        }
        return false;
    },
    ecl: (value: string) => {
        return EYE_COLORS.includes(value);
    },
    pid: (value: string) => {
        const regex = /^[0-9]{9}$/g
        if (value.match(regex)) {
            return true;
        }
        return false;
    }
};

const parseInput = (data: string) => {
    const lines = data.split('\n');
    const passports = [];

    let passport = {};
    for (const line of lines) {
        if (line === '') {
            // end of passport
            passports.push(passport);
            passport = {};
            continue;
        }

        const fields = line.split(' ');
        for (const field of fields) {
            const f = field.split(':');

            passport[f[0]] = f[1];
        }
    }

    return passports;
}

const validatePassport = (passport: any) => {
    for (const field in REQUIRED_FIELDS) {
        if (REQUIRED_FIELDS.hasOwnProperty(field)) {
            if (!passport[field]) {
                return false
            }
        }
    }

    return true;
}

const validatePassportComplex = (passport: any) => {
    for (const field in REQUIRED_FIELDS) {
        if (REQUIRED_FIELDS.hasOwnProperty(field)) {
            if (!passport[field] || !REQUIRED_FIELDS[field](passport[field])) {
                return false
            }
        }
    }

    return true;
}

const validatePassports = (passports: any[], validator: any) => {
    let valid = 0;
    for (const passport of passports) {
        if (validator(passport)) {
            valid++;
        }
    }

    return valid;
}


readFile(__dirname + '/input.txt', 'utf8', (_, data) => {
    const passports = parseInput(data);

    console.log('[Part 1] Valid Passports:', validatePassports(passports, validatePassport));
    console.log('[Part 2] Valid Passports:', validatePassports(passports, validatePassportComplex));
})