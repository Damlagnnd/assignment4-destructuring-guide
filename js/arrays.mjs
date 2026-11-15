
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - Array Destructuring

// Form 1: Destructuring a function return value
function getExamResults() {
  return [85, 92];
}

const [midterm, finalExam] = getExamResults();

console.log("form 1:", midterm, finalExam);

// Form 2: Skipping an element and collecting the rest
const programmingLanguages = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
];

const [, secondLanguage, ...otherLanguages] = programmingLanguages;

console.log("form 2:", secondLanguage, otherLanguages);

// Form 3: Swapping two variables
let firstScore = 70;
let secondScore = 95;

[firstScore, secondScore] = [secondScore, firstScore];

console.log("form 3:", firstScore, secondScore);

// Form 4: Default values
const availableScores = [88];

const [quizScore = 0, projectScore = 100] = availableScores;

console.log("form 4:", quizScore, projectScore);
