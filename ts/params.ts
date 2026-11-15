
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - TypeScript Parameters and Loops

export {};

// Form 11: Destructuring function parameters
type TaskOptions = {
  title?: string;
  status?: "todo" | "in-progress" | "done";
};

function createTask(
  {
    title = "Untitled",
    status = "todo",
  }: TaskOptions = {},
): { title: string; status: string } {
  return { title, status };
}

console.log(
  "form 11a:",
  createTask({
    title: "Complete Assignment 4",
    status: "in-progress",
  }),
);

console.log(
  "form 11b:",
  createTask({ title: "Study React" }),
);

console.log("form 11c:", createTask());

// Form 12: Destructuring Object.entries
const courseGrades: Record<string, number> = {
  JavaScript: 90,
  TypeScript: 95,
  React: 88,
};

for (const [course, grade] of Object.entries(courseGrades)) {
  console.log("form 12 object:", course, grade);
}

// Form 12: Destructuring Map entries
const taskStatuses = new Map<string, string>([
  ["Assignment 4", "in-progress"],
  ["Study React", "todo"],
]);

for (const [task, status] of taskStatuses) {
  console.log("form 12 map:", task, status);
}
