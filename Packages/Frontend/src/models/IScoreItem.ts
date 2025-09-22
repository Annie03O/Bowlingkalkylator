export interface IScoreItem {
    frameScore: number;
    cumulative: number;
}

export interface IApiResponse {
    frames: unknown[];
    rounds: {
        results: number;
        firstTry: number;
        secondTry?: number;
        thirdTry?: number;
    }[]; 
    perFrame: IScoreItem[];
    total: number;
}