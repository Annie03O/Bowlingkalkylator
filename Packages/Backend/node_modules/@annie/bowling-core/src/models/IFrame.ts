export type Roll = number;

export interface IFrame {
    index: number;
    rolls: Roll[];
    point?: number;
}
