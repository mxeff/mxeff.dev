declare module '@11ty/eleventy' {
    export interface Result {
        content: string;
        inputPath: string;
        outputPath: string;
        url: string;
    }

    export default class Eleventy {
        toJSON(): Promise<Result[]>;
    }
}
