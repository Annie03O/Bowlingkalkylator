import { IFrame, Roll } from "./models/IFrame";
import { IRoundRow } from "./models/IRoundRow";

export const buildFrames = (rolls: Roll[], points?: number[]): IFrame[] => {
  const frames: IFrame[] = []; //Innehåller 'index: number; rolls: Roll[]; point?: number;'

  let i = 0; //'i' börjar på noll och flyttas ett steg per runda (eller 2 steg i öppet/spärr /3 steg vide strike/spärr

    //'f' = frameIndex alltså rutnummret, vilket börjar på ett och slutar vid 10 
    for(let f = 1; f <= 10; f++) {

        //Om rutnummret är mindre än 10, alltså 1-9
        if (f < 10) {
            const firstTry = rolls[i]; //Första försöket per runda
            const isStrike = firstTry === 10; //10 poäng på första försöket alltså en strike

            const frameRolls = isStrike
              ? [firstTry] // Om det blir 10 poäng på första försöket, blir det en strike 
              : [firstTry, rolls[i + 1]];  //Om det blir 10p på två slag blir det en spärr

            frames.push({index: f, rolls: frameRolls, point: points?.[f - 1]});  //Lägger till poängen   
            i += isStrike ? 1 : 2;
        }
        else {  //Annars är runtnummret 10
            const firstTry = rolls[i];
            const secondTry = rolls[i + 1];
            const isStrike = firstTry === 10;
            const isSpare = firstTry + secondTry === 10;

            const third = rolls[i + 2];
            const frameRolls = (isStrike || isSpare) //Om en frameroll är aningen en strike eller spärr 
              ? [firstTry, secondTry, ...(third !== undefined ? [third] : [])] //Eftersom ruta tio har tre försök lägger man till två istället för ett vid spärr
              : [firstTry, secondTry];  //Annars körs öppet i ruta 10 och skapar array med två kast

            frames.push({ index: f, rolls: frameRolls, point: points?.[9]});
            i += (isStrike || isSpare) ? 3 : 2;  //Vid strike eller spärr läggs tre poäng till, annars läggs 2 poäng till
          
        }
    }

    return frames;  //Returnerar en lista med start, gånger och poäng
}

 export const nextNRolls = (allRolls: Roll[], start: number, n: number): Roll[] => {
     return allRolls.slice(start, start + n); //Startar från första omgången och fyller på med poäng
 }

// Tilldelar heltar från 0-maxInclusive
export const randomInt = (maxInclusive: number) => {
    return Math.floor(Math.random() * (maxInclusive + 1))  
}

// Tar emot listan frames från "IFrame", samt ett objekt med både separata och ihoppslagna poäng från varje runda
export const scoreFrames = (frames: IFrame[]): {frameScore: number, cumulative: number}[] => {
  //Hämtar poängen från IFrame och lägger in resultaten i en ny array   
  const rolls = frames.flatMap(f => f.rolls);
  let i = 0; 
  const perFrame: {frameScore: number, cumulative: number}[] = [];  //Variabeln som beskriver objektet med poäng från varje runda
  let cumulative = 0; //Den totala poängen börjar alltid på 0

  //Loop för alla frames och tar emot ett värde
  for (let f = 0; f < frames.length; f++) {
    const first = rolls[i] ?? 0;
    const second = rolls[i + 1] ?? 0;

    let frameScore = 0;

    //Om man är i en ruta under tio
    if(first === 10) {
        // ✅ Strike = 10 + nästkommande två kast
        const bonus1 = rolls[i + 1] ?? 0;
        const bonus2 = rolls[i + 2] ?? 0;
        frameScore = 10 + bonus1 + bonus2;
        i += 1;
    } else if (first + second === 10) {
        //Spärr = 10 + näskommande kast
        const bonus = rolls[i + 2] ?? 0;
        frameScore = 10 + bonus;
        i += 2;
    } else {
        //Om det inte är en strike, lägg ihop poängen
        frameScore = first + second;
        i += 2;
    }

    //Sumerar alla poäng och lägger till den
    cumulative += frameScore;
    perFrame.push({frameScore, cumulative})
  }
  
  //Returnerar rutorna
  return perFrame;
}

export const simulatorGame = (): IFrame[] => {
  const frames: IFrame[] = [];

  // Rutor 1–9
  for (let i = 1; i <= 9; i++) {
    const strike = Math.random() < 0.25; // valfri sannolikhet
    if (strike) {
      frames.push({ index: i, rolls: [10] }); // ✅ korrekt index
    } else {
      const first = Math.floor(Math.random() * 10);            // 0..9
      const second = Math.floor(Math.random() * (10 - first)); // 0..(10-first)
      frames.push({ index: i, rolls: [first, second] });
    }
  }

  // Ruta 10
  const first10 = Math.floor(Math.random() * 11); // 0..10
  if (first10 === 10) {
    const extra1 = Math.floor(Math.random() * 11); // 0..10
    const extra2 = extra1 === 10
      ? Math.floor(Math.random() * 11)             // 0..10 (dubbelstrike)
      : Math.floor(Math.random() * (11 - extra1)); // 0..(10-extra1)
    frames.push({ index: 10, rolls: [10, extra1, extra2] }); // ✅ PUSH alltid
  } else {
    const second10 = Math.floor(Math.random() * (11 - first10)); // 0..(10-first10)
    if (first10 + second10 === 10) {
      const extra = Math.floor(Math.random() * 11); // 0..10
      frames.push({ index: 10, rolls: [first10, second10, extra] });
    } else {
      frames.push({ index: 10, rolls: [first10, second10] });
    }
  }

  return frames;
};


export const toRounds = (frames: IFrame[]): IRoundRow[] => {
    //Beräknar poäng per ruta och lägger in resultatet i en ny lista
    const scored = scoreFrames(frames);

    //Loopar igenom listan och returnerar ett objekt med resultat och kast för varje runda
    return frames.map((f, i) => {
        const [a, b, c] = f.rolls;
        return {
            results: scored[i].cumulative,
            firstTry: a ?? 0,
            secondTry: b,
            thirdTry: c,
        };
    })
}
