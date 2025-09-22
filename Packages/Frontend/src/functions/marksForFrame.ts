// Funktion som omvandlar poäng till symboler (X, / eller siffra)
export const marksForFrame = (first: number, second?: number, third?: number): string[] => {
  const marks: string[] = [];

  // Strike (första kastet 10)
  if (first === 10) {
    marks.push("X");
    if (second !== undefined) marks.push(second === 10 ? "X" : String(second));
    if (third !== undefined)  marks.push(third === 10 ? "X" : String(third));
  } else {
    // Första kastet
    marks.push(String(first));
    // Andra kastet (spärr om first+second === 10)
    if (second !== undefined) marks.push(first + second === 10 ? "/" : String(second));
    // Tredje kastet (bara i ruta 10)
    if (third !== undefined)  marks.push(third === 10 ? "X" : String(third));
  }

  return marks;
};
