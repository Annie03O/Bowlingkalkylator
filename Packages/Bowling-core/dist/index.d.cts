type Roll = number;
interface IFrame {
    index: number;
    rolls: Roll[];
    point?: number;
}

interface IRoundRow {
    id: number;
    results: number;
    firstTry: number;
    secondTry?: number;
}

declare const buildFrames: (rolls: Roll[], points?: number[]) => IFrame[];
declare const nextNRolls: (allRolls: Roll[], start: number, n: number) => Roll[];
declare const randomInt: (maxInclusive: number) => number;
declare const scoreFrames: (frames: IFrame[]) => {
    frameScore: number;
    cumulative: number;
}[];
declare const simulatorGame: () => IFrame[];
declare const toRounds: (frames: IFrame[]) => IRoundRow[];

export { buildFrames, nextNRolls, randomInt, scoreFrames, simulatorGame, toRounds };
