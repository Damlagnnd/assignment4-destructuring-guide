
// Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - Automated Destructuring Tests

import test from "node:test";
import assert from "node:assert/strict";

// Test 1: Array destructuring
test("array destructuring extracts values in order", () => {
  const grades = [85, 92];
  const [midterm, finalExam] = grades;

  assert.equal(midterm, 85);
  assert.equal(finalExam, 92);
});

// Test 2: Skipping and rest
test("array rest collects remaining elements", () => {
  const languages = ["Python", "JavaScript", "TypeScript"];
  const [, second, ...rest] = languages;

  assert.equal(second, "JavaScript");
  assert.deepEqual(rest, ["TypeScript"]);
});

// Test 3: Swapping
test("destructuring swaps two values", () => {
  let first = 70;
  let second = 95;

  [first, second] = [second, first];

  assert.equal(first, 95);
  assert.equal(second, 70);
});

// Test 4: Default values
test("defaults apply to undefined but not null", () => {
  const { a = 10 } = { a: undefined };
  const { b = 20 } = { b: null };

  assert.equal(a, 10);
  assert.equal(b, null);
});

// Test 5: Renaming
test("object properties can be renamed", () => {
  const student = { name: "Damla" };
  const { name: studentName } = student;

  assert.equal(studentName, "Damla");
});

// Test 6: Object rest
test("object rest separates remaining properties", () => {
  const project = {
    name: "Task Manager",
    language: "TypeScript",
    framework: "React",
  };

  const { name, ...details } = project;

  assert.equal(name, "Task Manager");
  assert.deepEqual(details, {
    language: "TypeScript",
    framework: "React",
  });
});

// Test 7: Nested destructuring
test("nested destructuring extracts inner values", () => {
  const university = {
    location: { city: "Istanbul" },
    courses: ["Web Programming"],
  };

  const {
    location: { city },
    courses: [firstCourse],
  } = university;

  assert.equal(city, "Istanbul");
  assert.equal(firstCourse, "Web Programming");
});

// Test 8: Computed property
test("computed keys select the correct property", () => {
  const grades = { midterm: 80, final: 95 };
  const selectedExam = "final";

  const { [selectedExam]: selectedGrade } = grades;

  assert.equal(selectedGrade, 95);
});

// Test 9: Parameter destructuring
test("function parameters use defaults", () => {
  function createTask({ title = "Untitled", status = "todo" } = {}) {
    return { title, status };
  }

  assert.deepEqual(createTask(), {
    title: "Untitled",
    status: "todo",
  });

  assert.deepEqual(createTask({ title: "Study React" }), {
    title: "Study React",
    status: "todo",
  });
});

// Test 10: Map destructuring
test("Map entries can be destructured", () => {
  const statuses = new Map([
    ["Task A", "todo"],
    ["Task B", "done"],
  ]);

  const result = [...statuses].map(([task, status]) => ({
    task,
    status,
  }));

  assert.deepEqual(result, [
    { task: "Task A", status: "todo" },
    { task: "Task B", status: "done" },
  ]);
});

// Test 11: Missing elements
test("missing array elements become undefined", () => {
  const [first, second] = [90];

  assert.equal(first, 90);
  assert.equal(second, undefined);
});

// Test 12: Shallow copy
test("object rest preserves nested references", () => {
  const original = {
    id: 1,
    details: { completed: false },
  };

  const { id, ...copy } = original;

  assert.equal(id, 1);
  assert.equal(copy.details, original.details);
});
