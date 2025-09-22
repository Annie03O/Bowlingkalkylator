declare class Round {
    id: number;
    results: number;
    firstTry: number;
    secondTry?: number | undefined;
    thirdTry?: number | undefined;
    constructor(id: number, results: number, firstTry: number, secondTry?: number | undefined, thirdTry?: number | undefined);
}
export declare const series: Round[];
export {};
