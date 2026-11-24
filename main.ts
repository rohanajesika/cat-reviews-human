// cat-reviews-human — Make the AI Judge Laugh: Cat Reviews Its Human
// (make.fun bounty u-motasimfuad-make-the-ai-judge-laugh-cat-reviews-its-42a34990)
//
// When run, this program writes exactly one review — a single-line,
// one-star review written by a house cat about its human, under 200
// characters — to /output/entry.txt. The review is a fixed, hand-written
// string: no network, no randomness, no clock, so every run produces
// byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The review. Deadpan one-star shape, specific complaint (the laptop
// keyboard, named in the brief), feline voice throughout: the human's
// "work" is judged by cat standards, and the sting lands in the last
// few words — the cat gets blamed for sitting on the keyboard.
const REVIEW =
  "One star. The human stares at a glowing box all day and calls it work. I sat on the keyboard once and he called ME unprofessional.";

// The competition gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space, and a single line.
const MAX_CHARS = 200;

function validateReview(review: string): void {
  if (review.length === 0 || review.trim().length === 0) {
    throw new Error("review must not be empty");
  }
  if (review.length > MAX_CHARS) {
    throw new Error(`review is ${review.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (review.includes("\n") || review.includes("\r")) {
    throw new Error("review must be a single line");
  }
  if (review.includes("\u2028") || review.includes("\u2029")) {
    throw new Error("review must not contain Unicode line separators");
  }
}

function main(): void {
  validateReview(REVIEW);
  // /output is a bind-mount in the grader: create it if missing, but never
  // remove it. Only the file inside it is written.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", REVIEW, "utf8");
  // Read the file back so a silent write failure cannot pass unnoticed.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== REVIEW) {
    throw new Error("verification failed: /output/entry.txt does not match the review");
  }
  console.log(`wrote ${REVIEW.length}-character review to /output/entry.txt`);
}

main();
