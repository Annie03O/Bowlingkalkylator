import { scoreFrames, toRounds } from "@annie/bowling-core"
import type { IFrame } from "../../Bowling-core/dist/models/IFrame"

export const compute = (frames: IFrame[]) => {
    const perFrame = scoreFrames(frames);
    const rounds = toRounds(frames);
    const total = rounds.at(-1)?.results ?? 0;

    return {frames, rounds, perFrame, total}
}