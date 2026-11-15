
// Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - Bonus 2: Advanced TypeScript Experiments

export {};

// Experiment 7: Conditional types with infer
type ArrayElement<T> =
  T extends readonly (infer U)[] ? U : never;

type Course = {
  name: string;
  credits: number;
};

type CourseElement = ArrayElement<Course[]>;

const selectedCourse: CourseElement = {
  name: "Advanced Web Programming",
  credits: 4
};

const { name: courseName, credits } = selectedCourse;

console.log("B2 experiment 7:", courseName, credits);

// Experiment 8: Extracting a function return type
type FunctionResult<T> =
  T extends (...args: never[]) => infer R ? R : never;

function getStudent(): { name: string; department: string } {
  return {
    name: "Damla",
    department: "Computer Engineering"
  };
}

type StudentResult = FunctionResult<typeof getStudent>;

const { name: studentName, department }: StudentResult = getStudent();

console.log("B2 experiment 8:", studentName, department);

// Experiment 9: Tuple destructuring with as const
const coordinates = [41.01, 28.97] as const;

const [latitude, longitude] = coordinates;

console.log("B2 experiment 9:", latitude, longitude);

// Experiment 10: satisfies and destructuring
type TaskStatus = "todo" | "in-progress" | "done";

type TaskConfig = {
  title: string;
  status: TaskStatus;
};

const task = {
  title: "Complete Assignment 4",
  status: "in-progress"
} satisfies TaskConfig;

const { title, status } = task;

console.log("B2 experiment 10:", title, status);

// Experiment 11: Generic tuple-returning function
function createPair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const [taskId, taskTitle] = createPair(101, "Study TypeScript");

console.log("B2 experiment 11:", taskId, taskTitle);
