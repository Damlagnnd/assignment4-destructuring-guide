
// Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - Destructuring Pitfalls

// Pitfall 1: Destructuring undefined or null
try {
  const { title } = undefined;
  console.log(title);
} catch (error) {
  console.log("pitfall 1:", error.name, "-", error.message);
}

// Pitfall 2: Defaults do not replace null
const task = { title: null };
const { title = "Untitled" } = task;

console.log("pitfall 2:", title);

// Pitfall 3: Renaming does not create the original variable
try {
  const student = { name: "Damla" };
  const { name: studentName } = student;

  console.log("renamed value:", studentName);
  console.log(name);
} catch (error) {
  console.log("pitfall 3:", error.name, "-", error.message);
}

// Pitfall 4: Object destructuring assignment needs parentheses
let status = "todo";
const updatedTask = { status: "done" };

({ status } = updatedTask);

console.log("pitfall 4:", status);

// Pitfall 5: Array destructuring can return undefined
const grades = [90];
const [firstGrade, secondGrade] = grades;

console.log("pitfall 5:", firstGrade, secondGrade);
