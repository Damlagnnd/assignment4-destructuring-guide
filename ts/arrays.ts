
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - TypeScript Array Destructuring

export {};

// Form 1: Destructuring a typed tuple
function getExamResults(): [number, number] {
  return [85, 92];
}

const [midterm, finalExam] = getExamResults();

console.log("form 1:", midterm, finalExam);

// Form 2: Skipping an element and collecting the rest
const programmingLanguages: string[] = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
];

const [, secondLanguage, ...otherLanguages] = programmingLanguages;

console.log("form 2:", secondLanguage, otherLanguages);

// Form 3: Swapping variables
let firstScore: number = 70;
let secondScore: number = 95;

[firstScore, secondScore] = [secondScore, firstScore];

console.log("form 3:", firstScore, secondScore);

// Form 4: Default values
const availableScores: number[] = [88];

const [quizScore = 0, projectScore = 100] = availableScores;

console.log("form 4:", quizScore, projectScore);
