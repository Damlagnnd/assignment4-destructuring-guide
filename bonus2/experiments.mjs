
// Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - Bonus 2: Advanced Destructuring Experiments

// Experiment 1: Custom iterable destructuring
const numberGenerator = {
  *[Symbol.iterator]() {
    yield 10;
    yield 20;
    yield 30;
    yield 40;
  }
};

const [first, second, ...remaining] = numberGenerator;

console.log("B2 experiment 1:", first, second, remaining);

// Experiment 2: Default expressions run only when needed
let defaultCalls = 0;

function generateDefault() {
  defaultCalls++;
  return 99;
}

const [valueA = generateDefault()] = [15];
const [valueB = generateDefault()] = [undefined];

console.log("B2 experiment 2:", valueA, valueB, defaultCalls);

// Experiment 3: Getter evaluation order
const accessLog = [];

const data = {
  get first() {
    accessLog.push("first getter");
    return "A";
  },
  get second() {
    accessLog.push("second getter");
    return "B";
  }
};

const { second: letterB, first: letterA } = data;

console.log("B2 experiment 3 values:", letterA, letterB);
console.log("B2 experiment 3 order:", accessLog);

// Experiment 4: Destructuring an error in catch
try {
  throw new Error("Invalid task status");
} catch ({ name, message }) {
  console.log("B2 experiment 4:", name, message);
}

// Experiment 5: Nested defaults and null
const settings = {
  appearance: undefined
};

const {
  appearance: { theme = "dark" } = {}
} = settings;

console.log("B2 experiment 5:", theme);

// Experiment 6: Object rest is a shallow copy
const original = {
  id: 1,
  details: {
    completed: false
  }
};

const { id, ...copied } = original;
copied.details.completed = true;

console.log("B2 experiment 6:", id, original.details.completed);
