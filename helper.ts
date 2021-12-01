import { readFile } from "fs";

export const inputToArray = (filePath: string, callback: (array: any[]) => void) => {
    readFile(filePath, "utf8", (_, data) => {
        const input = data.split("\n").map(item => item.trim());
        callback(input);
    });
}