
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - TypeScript Object Destructuring

export {};

// Form 5: Extracting properties by name
type Task = {
  title: string;
  status: "todo" | "in-progress" | "done";
};

const task: Task = {
  title: "Finish web assignment",
  status: "in-progress",
};

const { title, status } = task;

console.log("form 5:", title, status);

// Form 6: Renaming a property
type Student = {
  name: string;
  department: string;
};

const student: Student = {
  name: "Damla",
  department: "Computer Engineering",
};

const { name: studentName } = student;

console.log("form 6:", studentName);

// Form 7: Default property values
type Course = {
  name: string;
  credits?: number;
};

const course: Course = {
  name: "Advanced Web Programming",
  credits: undefined,
};

const { credits = 4 } = course;

console.log("form 7:", credits);

// Form 8: Object rest
type Project = {
  projectName: string;
  language: string;
  framework: string;
};

const project: Project = {
  projectName: "Task Manager",
  language: "TypeScript",
  framework: "React",
};

const { projectName, ...projectDetails } = project;

console.log("form 8:", projectName, projectDetails);

// Form 9: Nested object and array destructuring
type University = {
  location: {
    city: string;
    campus: string;
  };
  courses: [string, string];
};

const university: University = {
  location: {
    city: "Istanbul",
    campus: "Atakoy",
  },
  courses: ["Web Programming", "Operating Systems"],
};

const {
  location: { city },
  courses: [firstCourse],
} = university;

console.log("form 9:", city, firstCourse);

// Form 10: Computed property names
type Grades = {
  midterm: number;
  final: number;
};

const grades: Grades = {
  midterm: 80,
  final: 95,
};

const selectedExam: keyof Grades = "final";
const { [selectedExam]: selectedGrade } = grades;

console.log("form 10:", selectedGrade);
