class Round {
    constructor(id, results, firstTry, secondTry, thirdTry) {
        this.id = id;
        this.results = results;
        this.firstTry = firstTry;
        this.secondTry = secondTry;
        this.thirdTry = thirdTry;
        this.id = id;
        this.firstTry = firstTry;
        this.secondTry = secondTry;
        this.thirdTry = thirdTry;
        this.results = results;
    }
}
export const series = [
    new Round(1, 8, 3, 5), // 3+5 = 8, totalt 8
    new Round(2, 17, 4, 5), // 4+5 = 9, totalt 8+9 = 17
    new Round(3, 30, 3, 7), // spärr (3+7=10) + bonus = nästa kast (3) → 13, totalt 17+13 = 30
    new Round(4, 38, 3, 5), // 3+5 = 8, totalt 30+8 = 38
    new Round(5, 67, 10), // strike = 10 + nästa två kast (10 + 9) = 29, totalt 38+29 = 67
    new Round(6, 87, 10), // strike = 10 + nästa två kast (9 + 1) = 20, totalt 67+20 = 87
    new Round(7, 107, 9, 1), // spärr (9+1=10) + bonus = nästa kast (10) → 20, totalt 87+20 = 107
    new Round(8, 137, 10), // strike = 10 + nästa två kast (10 + 10) = 30, totalt 107+30 = 137
    new Round(9, 167, 10), // strike = 10 + nästa två kast (10 + 10) = 30, totalt 137+30 = 167
    new Round(10, 197, 10, 10, 10), // strike i ruta 10 → två extrakast (10,10), 10+10+10 = 30, totalt 167+30 = 197
];
