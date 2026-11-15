
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - Function Parameters and Loops

// Form 11: Destructuring function parameters with defaults
function createTask({ title = "Untitled", status = "todo" } = {}) {
  return { title, status };
}

console.log("form 11a:", createTask({
  title: "Complete Assignment 4",
  status: "in-progress",
}));

console.log("form 11b:", createTask({ title: "Study React" }));

console.log("form 11c:", createTask());

// Form 12: Destructuring in loops with Object.entries
const courseGrades = {
  JavaScript: 90,
  TypeScript: 95,
  React: 88,
};

for (const [course, grade] of Object.entries(courseGrades)) {
  console.log("form 12 object:", course, grade);
}

// Form 12: Destructuring Map entries
const taskStatuses = new Map([
  ["Assignment 4", "in-progress"],
  ["Study React", "todo"],
]);

for (const [task, status] of taskStatuses) {
  console.log("form 12 map:", task, status);
}
