
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - Object Destructuring

// Form 5: Extracting properties by name
const task = {
  title: "Finish web assignment",
  status: "in-progress",
};

const { title, status } = task;

console.log("form 5:", title, status);

// Form 6: Renaming a property
const student = {
  name: "Damla",
  department: "Computer Engineering",
};

const { name: studentName } = student;

console.log("form 6:", studentName);

// Form 7: Default property values
const course = {
  name: "Advanced Web Programming",
  credits: undefined,
};

const { credits = 4 } = course;

console.log("form 7:", credits);

// Form 8: Object rest
const project = {
  projectName: "Task Manager",
  language: "TypeScript",
  framework: "React",
};

const { projectName, ...projectDetails } = project;

console.log("form 8:", projectName, projectDetails);

// Form 9: Nested object and array destructuring
const university = {
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
const grades = {
  midterm: 80,
  final: 95,
};

const selectedExam = "final";
const { [selectedExam]: selectedGrade } = grades;

console.log("form 10:", selectedGrade);
