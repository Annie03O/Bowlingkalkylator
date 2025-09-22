import { IFrame, Roll } from "./models/IFrame";
import { IRoundRow } from "./models/IRoundRow";
export declare const buildFrames: (rolls: Roll[], points?: number[]) => IFrame[];
export declare const nextNRolls: (allRolls: Roll[], start: number, n: number) => Roll[];
export declare const randomInt: (maxInclusive: number) => number;
export declare const scoreFrames: (frames: IFrame[]) => {
    frameScore: number;
    cumulative: number;
}[];
export declare const simulatorGame: () => IFrame[];
export declare const toRounds: (frames: IFrame[]) => IRoundRow[];
