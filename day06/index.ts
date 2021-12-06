import { readFile } from "fs";

const simulate = (startInput: number[], days: number) => {
    let fishBuckets = new Array(9).fill(0);
    for (let i = 0; i < fishBuckets.length; i++) {
        fishBuckets[i] = startInput.filter(fish => fish === i).length;
    }

    for (let i = 0; i < days; i++) {
       const smolFish = fishBuckets[0];
       const yungMomma = fishBuckets[0];
        
       for (let k = 0; k < 8; k++) {
        fishBuckets[k] = fishBuckets[k+1];
        if (k === 6) {
            fishBuckets[k] += yungMomma;
        }
       }
       fishBuckets[8] = smolFish
    }

    return fishBuckets.reduce((prev, curr) => prev + curr, 0);
}

readFile(__dirname + '/input.txt', "utf8", (_, data) => {
    console.time('runtime');
    const input = data.split(",").map(item => parseInt(item.trim(), 10));
    
    console.log('Part 1 - 80 days', simulate(input, 80))
    console.log('Part 2 - 256 days', simulate(input, 256))
    console.log('Part 3 - 100000 days', simulate(input, 10000)) // for fun

    console.timeEnd('runtime');
});
