import { readFile } from "fs";

const parseInput = (data: string) => {
    const lines = data.split('\n');
    const groups = [];

    let group = [];
    for (const line of lines) {
        if (line === '') {
            // end of passport
            groups.push(group);
            group = [];
            continue;
        }
        group.push(line);
    }
    return groups;
}

const getGroupAnswerCount = (groups: any[]) => {
    let totalCount = 0;
    for (const group of groups) {
        let wholeGroup = group.join('');

        totalCount += wholeGroup.split('').filter((item, pos, self) => {
            return self.indexOf(item) === pos;
        }).join('').length;
    }

    return totalCount;
}

const getGroupAnswerCountEveryone = (groups: any[]) => {
    let totalCount = 0;
    for (const group of groups) {
        let wholeGroup = group.join('');
        const members = group.length;

        const uniques = wholeGroup.split('').filter((item, pos, self) => {
            return self.indexOf(item) === pos;
        });

        for (const unique of uniques) {
            const regex = new RegExp(`[^${unique}]`, 'g')
            if (wholeGroup.replace(regex, "").length === members) {
                totalCount++;
            }
        }
    }

    return totalCount;
}

readFile(__dirname + '/input.txt', 'utf8', (_, data) => {
    const groups = parseInput(data);

    console.log('[PART 1]');
    console.log('Group answer count', getGroupAnswerCount(groups));

    console.log('[PART 2]');
    console.log('Group answer count (everyone yes)', getGroupAnswerCountEveryone(groups));
})