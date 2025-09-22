"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  buildFrames: () => buildFrames,
  nextNRolls: () => nextNRolls,
  randomInt: () => randomInt,
  scoreFrames: () => scoreFrames,
  simulatorGame: () => simulatorGame,
  toRounds: () => toRounds
});
module.exports = __toCommonJS(src_exports);
var buildFrames = (rolls, points) => {
  const frames = [];
  let i = 0;
  for (let f = 1; f <= 10; f++) {
    if (f < 10) {
      const firstTry = rolls[i];
      const isStrike = firstTry === 10;
      const frameRolls = isStrike ? [firstTry] : [firstTry, rolls[i + 1]];
      frames.push({ index: f, rolls: frameRolls, point: points?.[f - 1] });
      i += isStrike ? 1 : 2;
    } else {
      const firstTry = rolls[i];
      const secondTry = rolls[i + 1];
      const isStrike = firstTry === 10;
      const isSpare = firstTry + secondTry === 10;
      const frameRolls = isStrike || isSpare ? [firstTry, secondTry, rolls[i + 2]] : [firstTry, secondTry];
      frames.push({ index: f, rolls: frameRolls, point: points?.[9] });
      i += isStrike || isSpare ? 3 : 2;
    }
  }
  return frames;
};
var nextNRolls = (allRolls, start, n) => {
  return allRolls.slice(start, start + n);
};
var randomInt = (maxInclusive) => {
  return Math.floor(Math.random() * (maxInclusive + 1));
};
var scoreFrames = (frames) => {
  const results = frames.flatMap((f) => f.rolls);
  const perFrame = [];
  let rollCursor = 0;
  let cumulative = 0;
  for (let f = 0; f < frames.length; f++) {
    const frame = frames[f];
    let frameScore = 0;
    const frameRollLen = frame.rolls.length === 1;
    const firstRoll = frame.rolls[0] === 10;
    if (frame.index < 10) {
      if (frameRollLen && firstRoll) {
        const bonus = nextNRolls(results, rollCursor + 1, 2).reduce((a, b) => a + b, 0);
        frameScore = 10 + bonus;
        rollCursor += 1;
      } else {
        const base = frame.rolls[0] + frame.rolls[1];
        if (base === 10) {
          const bonus = nextNRolls(results, rollCursor + 2, 1).reduce((a, b) => a + b, 0);
          frameScore = 10 + bonus;
        } else {
          frameScore = base;
        }
        rollCursor += 2;
      }
    } else {
      frameScore = frame.rolls.reduce((a, b) => a + b, 0);
      rollCursor += frame.rolls.length;
    }
    cumulative += frameScore;
    perFrame.push({ frameScore, cumulative });
  }
  return perFrame;
};
var simulatorGame = () => {
  const frames = [];
  const firstTry = randomInt(9);
  const remaining = 10 - firstTry;
  const first10 = Math.random() > 0.15 ? 10 : randomInt(remaining);
  for (let i = 1; i <= 9; i++) {
    const secondTry = Math.random() < 0.25 ? remaining : randomInt(remaining);
    Math.random() < 0.15 ? frames.push({ index: 1, rolls: [10] }) : frames.push({ index: i, rolls: [firstTry, secondTry] });
  }
  if (first10 === 10) {
    const extra1 = randomInt(10);
    let extra2;
    extra1 === 10 ? extra2 = randomInt(10) : extra2 = randomInt(10 - extra1);
  } else {
    const remaining2 = 10 - first10;
    const second10 = randomInt(remaining2);
    const extra = randomInt(10);
    first10 + second10 === 10 ? frames.push({ index: 10, rolls: [first10, second10, extra] }) : frames.push({ index: 10, rolls: [first10, second10] });
  }
  return frames;
};
var toRounds = (frames) => {
  const scored = scoreFrames(frames);
  return frames.map((f, i) => {
    const [a, b, c] = f.rolls;
    return {
      id: f.index,
      results: scored[i].cumulative,
      firstTry: a ?? 0,
      secondTry: b,
      thirdTry: c
    };
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildFrames,
  nextNRolls,
  randomInt,
  scoreFrames,
  simulatorGame,
  toRounds
});
