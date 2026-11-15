
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - TypeScript Destructuring Topics

export {};

// T1: Renaming versus type annotations
const task = { title: "Complete Assignment 4" };

const { title: taskTitle } = task;
console.log("T1 renamed:", taskTitle);

// The type annotation belongs after the entire pattern.
const { title: typedTitle }: { title: string } = task;
console.log("T1 typed:", typedTitle);

// T2: Tuple return types and as const
function getResult(): [number, string] {
  return [95, "passed"];
}

const [score, result] = getResult();
console.log("T2 tuple:", score, result);

const coordinates = [41.01, 28.97] as const;
const [latitude, longitude] = coordinates;

console.log("T2 as const:", latitude, longitude);

// T3: noUncheckedIndexedAccess
const grades: number[] = [85, 90];

const [firstGrade] = grades;

// firstGrade has type number | undefined.
if (firstGrade !== undefined) {
  console.log("T3 first grade:", firstGrade);
}

const emptyGrades: number[] = [];
const [missingGrade = 0] = emptyGrades;

console.log("T3 default:", missingGrade);

// T4: Optional fields and defaults
type CourseOptions = {
  credits?: number;
};

const courseOptions: CourseOptions = {};

const { credits: optionalCredits } = courseOptions;
console.log("T4 optional:", optionalCredits);

const { credits = 3 } = courseOptions;
console.log("T4 default:", credits);

// T5: Compile error and correction
const student = { name: "Damla", age: 22 };

// This property does not exist on the object.
// @ts-expect-error Property 'department' does not exist
const { department } = student;

console.log("T5 invalid:", department);

// Correct version
const { name: studentName } = student;
console.log("T5 fixed:", studentName);
