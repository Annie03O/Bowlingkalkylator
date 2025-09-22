import express, { json } from "express";
import cors from "cors";
import { simulatorGame, buildFrames, scoreFrames, toRounds } from "@annie/bowling-core";
import { IFrame } from "../Bowling-core/dist/models/IFrame";
import { compute } from "./functions/compute";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/simulate", (_req, res) => {
    const frames = simulatorGame();
    res.json(compute(frames));
});

app.post("/api/score", (req, res) => {
    const { rolls, frames } = req.body ?? {};
    const isFrames = Array.isArray(frames);
    const isRolls = Array.isArray(rolls);
    const hasInvalidRolls = isRolls && (rolls as unknown[]).some(
        (n) => typeof n !== "number" || (n as number) < 0 || (n as number) > 10
    );  
    try {
        const built: IFrame[] | undefined = isFrames
        ? (frames as IFrame[])
        : isRolls
        ? (hasInvalidRolls ? undefined : buildFrames(rolls as number[]))
        : undefined;

        // skicka fel vid behov via ternary
        return built
          ? (/* fortsätt, t.ex.: */ res.json({ frames: built }))
          : res.status(400).json({
              error: !isFrames && !isRolls
                ? "Skicka antingen { rolls } eller { frames }."
                : "Alla kast måste vara heltal 0–10."
            });
        
    } catch (err:any) {
        console.error(err);
        return res.status(400).json({error: "Ogiltig kastföljd eller frames för en 10-ruta serie."});
    }
})

app.listen(PORT, () => {
    console.log(`Bowling api kör på PORT ${PORT}`);
    
})