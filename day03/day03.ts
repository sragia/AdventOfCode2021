import { readFile } from "fs";


const parseInput = (input: string) => {
    const layout = [];
    const lines = input.split('\n')
    lines.forEach((line) => {
        layout.push(line.split(""));
    });

    return layout;
}

const traverseLayout = (layout: any[], moveX: number, moveY: number) => {
    const lineLength = layout[0].length - 1;
    const height = layout.length - 1;
    let position = { x: 0, y: 0 }
    let trees = 0;

    while (position.y <= height) {
        if (position.x + moveX > lineLength) {
            position.x = position.x + moveX - lineLength - 1;
        } else {
            position.x += moveX;
        }
        position.y += moveY;

        if (layout[position.y]) {
            const plot = layout[position.y][position.x];

            if (plot === '#') {
                trees++;
            }
        }
    }

    return trees;
}

readFile(__dirname + '/input.txt', 'utf8', (_, data) => {
    const layout = parseInput(data);

    console.log(
        'Part 1: Trees encountered:',
        traverseLayout(layout, 3, 1)
    );

    console.log(
        'Part 2: Multiplied:',
        traverseLayout(layout, 1, 1) *
        traverseLayout(layout, 3, 1) *
        traverseLayout(layout, 5, 1) *
        traverseLayout(layout, 7, 1) *
        traverseLayout(layout, 1, 2)
    );
})