import "../App.css";
import { marksForFrame } from "../functions/marksForFrame";
import { useEffect, useState } from "react";
import type { IRoundRow } from "../models/IRoundRow";

type ApiRound = {
  results: number;
  firstTry: number;
  secondTry?: number;
  thirdTry?: number;
};

type ApiResponse = {
  rounds: ApiRound[];
};

export const BowlingSimulator = () => {
  const [rounds, setRounds] = useState<IRoundRow[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/simulate")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        // Lägg till id så att det blir 1–10 och matchar din IRoundRow
        const withId: IRoundRow[] = (data.rounds ?? []).map((r, i) => ({
          id: i + 1,
          ...r,
        }));

        // (Valfritt men robust) Se till att det alltid blir exakt 10 rutor
        const normalized = [...withId];
        while (normalized.length < 10) {
          normalized.push({
            id: normalized.length + 1,
            results: normalized.at(-1)?.results ?? 0,
            firstTry: 0,
          });
        }
        if (normalized.length > 10) normalized.length = 10;

        setRounds(normalized);
      })
      .catch((err) => console.error("Fel vid hämtning:", err));
  }, []);

  return (
    <div className="simulator">
      {rounds.map((r) => {
        const [m1, m2, m3] = marksForFrame(r.firstTry ?? 0, r.secondTry, r.thirdTry);
        const isTenth = r.id === 10;

        return (
          <div key={r.id} className="round">
            <span className="frame">{r.id}</span>

            <div className="points">
              <span className="box1">{m1}</span>
              <span className="box2">{m2}</span>

              {/* Visa alltid tredje rutan i ruta 10 (tom om inget tredje kast) */}
              {isTenth ? (
                <span className="box3">{m3 ?? ""}</span>
              ) : (
                // I rutor 1–9: visa tredje boxen endast om m3 finns
                m3 !== undefined && <span className="box3">{m3}</span>
              )}
            </div>

            {/* Tydlig rad med tredje kastets poäng i ruta 10 */}
            {isTenth && r.thirdTry !== undefined && (
              <span className="extra">Tredje kast: {r.thirdTry}</span>
            )}

            {/* Cumulativ poäng per ruta */}
            <span className="results">{r.results}</span>
          </div>
        );
      })}
    </div>
  );
};
