
export {};

// Assignment 4 - TypeScript Type Safety Tests
// Damla Günendi - 2200004319

// Test 1: Tuple types
const examResult: [number, string] = [95, "passed"];

// @ts-expect-error A tuple requires exactly two elements
const invalidTuple: [number, string] = [95];

// Test 2: Object property checking
type Student = {
  name: string;
  age: number;
};

const student: Student = {
  name: "Damla",
  age: 22
};

const { name: studentName } = student;

// @ts-expect-error Department does not exist on Student
const { department } = student;

// Test 3: Optional properties
type Course = {
  credits?: number;
};

const course: Course = {};
const { credits = 3 } = course;

const safeCredits: number = credits;

// @ts-expect-error Optional property may be undefined
const unsafeCredits: number = course.credits;

// Test 4: Readonly tuples
const coordinates = [41.01, 28.97] as const;
const [latitude, longitude] = coordinates;

// @ts-expect-error Readonly tuples cannot be modified
coordinates[0] = 40;

// Test 5: Computed keys with keyof
const grades = {
  midterm: 80,
  final: 95
};

type GradeKey = keyof typeof grades;

const validKey: GradeKey = "final";
const { [validKey]: selectedGrade } = grades;

// @ts-expect-error Homework is not a valid grade key
const invalidKey: GradeKey = "homework";

void [
  examResult,
  invalidTuple,
  studentName,
  department,
  safeCredits,
  unsafeCredits,
  latitude,
  longitude,
  selectedGrade,
  invalidKey
];
