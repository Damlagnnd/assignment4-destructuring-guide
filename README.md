
# Destructuring Field Guide

**Name:** Damla Günendi  
**Student Number:** 2200004319  
**Course:** Advanced Web Programming  
**Languages:** JavaScript and TypeScript  
**Framework:** React

**GitHub Repository:**  
https://github.com/Damlagnnd/assignment4-destructuring-guide

**Optional Bonuses:** Bonus 1 - LaTeX/PDF, Bonus 2 - Advanced Experiments, Bonus 3 - Real Code Analysis, Bonus 4 - GitHub Repository

---

## 1. Overview and Setup

This project is a field guide demonstrating destructuring in JavaScript, TypeScript, and React.

The project includes:

- 12 JavaScript destructuring forms
- 12 corresponding TypeScript implementations
- 5 JavaScript destructuring pitfalls
- TypeScript typing topics T1–T5
- React props and children topics P1–P7
- JavaScript and TypeScript comparison
- Real execution outputs and personal observations
- Advanced destructuring experiments
- Real-code destructuring analysis
- 22 automated runtime tests
- 5 additional TypeScript compile-time safety tests
- LaTeX source and PDF documentation
- GitHub repository with meaningful commits

The examples use course grades, university information, task management, and React components.

### Requirements

- Node.js 20.19 or newer
- npm
- TypeScript
- React and React DOM
- tsx

### Installation and Execution

Run the following commands from the project directory:

```bash
npm install
npm run all
npm run check
```

`npm run all` executes the JavaScript and TypeScript demonstrations.

`npm run check` performs TypeScript type checking without generating JavaScript output.

To regenerate the recorded execution output in PowerShell:

```powershell
npm run all > output.txt
```

The `output.txt` file contains the actual outputs produced by the project.

---

## 2. The Twelve Destructuring Forms

### Form 1: Array Destructuring from a Function

**Syntax:**

```javascript
const [x, y] = functionReturningArray();
```

**Example (`js/arrays.mjs`):**

```javascript
function getExamResults() {
  return [85, 92];
}

const [midterm, finalExam] = getExamResults();

console.log("form 1:", midterm, finalExam);
```

**Real output:**

```text
form 1: 85 92
```

**Use it when:** A function returns multiple related values in a fixed order.

**Watch out:** Array destructuring uses positions rather than variable names. Missing positions can produce `undefined`.

**TypeScript:** A tuple return type such as `[number, number]` describes two numeric elements.

---

### Form 2: Skipping Elements and Rest Syntax

**Syntax:**

```javascript
const [, second, ...others] = list;
```

**Example (`js/arrays.mjs`):**

```javascript
const languages = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java"
];

const [, secondLanguage, ...otherLanguages] = languages;

console.log("form 2:", secondLanguage, otherLanguages);
```

**Real output:**

```text
form 2: JavaScript [ 'TypeScript', 'Java' ]
```

**Use it when:** We want to skip an array position and collect the remaining elements.

**Watch out:** Rest syntax must appear at the end of the destructuring pattern.

---

### Form 3: Swapping Variables

**Syntax:**

```javascript
[a, b] = [b, a];
```

**Example (`js/arrays.mjs`):**

```javascript
let firstScore = 70;
let secondScore = 95;

[firstScore, secondScore] = [secondScore, firstScore];

console.log("form 3:", firstScore, secondScore);
```

**Real output:**

```text
form 3: 95 70
```

**Use it when:** Two existing variables need to exchange values without a temporary variable.

**Watch out:** The variables must allow reassignment. Values declared with `const` cannot be reassigned.

---

### Form 4: Default Values in Arrays

**Syntax:**

```javascript
const [a = 1, b = 2] = array;
```

**Example (`js/arrays.mjs`):**

```javascript
const availableScores = [88];

const [quizScore = 0, projectScore = 100] = availableScores;

console.log("form 4:", quizScore, projectScore);
```

**Real output:**

```text
form 4: 88 100
```

**Use it when:** An array may contain fewer elements than expected.

**Watch out:** A default value is applied only when the extracted value is `undefined`, not when it is `null` or `0`.

---

### Form 5: Object Destructuring

**Syntax:**

```javascript
const { title, status } = object;
```

**Example (`js/objects.mjs`):**

```javascript
const task = {
  title: "Finish web assignment",
  status: "in-progress"
};

const { title, status } = task;

console.log("form 5:", title, status);
```

**Real output:**

```text
form 5: Finish web assignment in-progress
```

**Use it when:** We need multiple named properties from the same object.

**Watch out:** Object property names determine the extracted values. Destructuring `null` or `undefined` throws a TypeError.

---

### Form 6: Renaming Object Properties

**Syntax:**

```javascript
const { property: newName } = object;
```

**Example (`js/objects.mjs`):**

```javascript
const student = {
  name: "Damla",
  department: "Computer Engineering"
};

const { name: studentName } = student;

console.log("form 6:", studentName);
```

**Real output:**

```text
form 6: Damla
```

**Use it when:** A property name conflicts with another variable or a more descriptive local variable name is needed.

**Watch out:** `name: studentName` creates a local variable called `studentName`, not `name`.

In TypeScript, this syntax is a rename, not a type annotation.

---

### Form 7: Default Values in Objects

**Syntax:**

```javascript
const { property = defaultValue } = object;
```

**Example (`js/objects.mjs`):**

```javascript
const course = {
  name: "Advanced Web Programming",
  credits: undefined
};

const { credits = 4 } = course;

console.log("form 7:", credits);
```

**Real output:**

```text
form 7: 4
```

**Use it when:** An optional property needs a fallback value.

**Watch out:** Defaults replace `undefined`, but not `null`.

---

### Form 8: Object Rest Properties

**Syntax:**

```javascript
const { property, ...others } = object;
```

**Example (`js/objects.mjs`):**

```javascript
const project = {
  projectName: "Task Manager",
  language: "TypeScript",
  framework: "React"
};

const { projectName, ...projectDetails } = project;

console.log("form 8:", projectName, projectDetails);
```

**Real output:**

```text
form 8: Task Manager { language: 'TypeScript', framework: 'React' }
```

**Use it when:** One property must be separated from the remaining object properties.

**Watch out:** Object rest creates a shallow copy. Nested objects still share references.

This pattern is also useful for forwarding React props.

---

### Form 9: Nested Object and Array Destructuring

**Syntax:**

```javascript
const {
  location: { city },
  courses: [firstCourse]
} = university;
```

**Example (`js/objects.mjs`):**

```javascript
const university = {
  location: {
    city: "Istanbul",
    campus: "Atakoy"
  },
  courses: [
    "Web Programming",
    "Operating Systems"
  ]
};

const {
  location: { city },
  courses: [firstCourse]
} = university;

console.log("form 9:", city, firstCourse);
```

**Real output:**

```text
form 9: Istanbul Web Programming
```

**Use it when:** Values are stored inside nested objects and arrays.

**Watch out:** If an expected nested object is missing, the destructuring operation can throw a runtime error.

TypeScript nested types and tuples help describe the required structure.

---

### Form 10: Computed Property Names

**Syntax:**

```javascript
const { [key]: value } = object;
```

**Example (`js/objects.mjs`):**

```javascript
const grades = {
  midterm: 80,
  final: 95
};

const selectedExam = "final";

const { [selectedExam]: selectedGrade } = grades;

console.log("form 10:", selectedGrade);
```

**Real output:**

```text
form 10: 95
```

**Use it when:** The property name is selected dynamically.

**Watch out:** Computed property names require square brackets. In TypeScript, `keyof` can restrict keys to valid property names.

---

### Form 11: Function Parameter Destructuring

**Syntax:**

```javascript
function createTask({
  title = "Untitled",
  status = "todo"
} = {}) {
  return { title, status };
}
```

**Example (`js/params.mjs`):**

```javascript
function createTask({
  title = "Untitled",
  status = "todo"
} = {}) {
  return { title, status };
}

console.log(
  "form 11a:",
  createTask({
    title: "Complete Assignment 4",
    status: "in-progress"
  })
);

console.log(
  "form 11b:",
  createTask({ title: "Study React" })
);

console.log("form 11c:", createTask());
```

**Real output:**

```text
form 11a: { title: 'Complete Assignment 4', status: 'in-progress' }
form 11b: { title: 'Study React', status: 'todo' }
form 11c: { title: 'Untitled', status: 'todo' }
```

**Use it when:** A function accepts an options object with optional fields.

**Watch out:** The outer `= {}` handles calls with no argument. Individual defaults handle missing properties. Passing `null` as the entire argument still causes an error.

In TypeScript, a `TaskOptions` type describes the expected fields.

---

### Form 12: Destructuring in Loops

**Syntax:**

```javascript
for (const [key, value] of Object.entries(object)) {
  // Use key and value
}
```

**Example (`js/params.mjs`):**

```javascript
const courseGrades = {
  JavaScript: 90,
  TypeScript: 95,
  React: 88
};

for (const [course, grade] of Object.entries(courseGrades)) {
  console.log("form 12 object:", course, grade);
}

const taskStatuses = new Map([
  ["Assignment 4", "in-progress"],
  ["Study React", "todo"]
]);

for (const [task, status] of taskStatuses) {
  console.log("form 12 map:", task, status);
}
```

**Real output:**

```text
form 12 object: JavaScript 90
form 12 object: TypeScript 95
form 12 object: React 88
form 12 map: Assignment 4 in-progress
form 12 map: Study React todo
```

**Use it when:** Iterating over key-value pairs from objects or Maps.

**Watch out:** `Object.entries()` produces an array of pairs, while a Map is directly iterable.

TypeScript can use `Record<string, number>` and `Map<string, string>` to describe key-value types.

---

## 3. Five JavaScript Pitfalls

All five experiments are implemented in `js/pitfalls.mjs`.

Run them with:

```bash
node js/pitfalls.mjs
```

### Pitfall 1: Destructuring Undefined

**Example:**

```javascript
try {
  const { title } = undefined;
  console.log(title);
} catch (error) {
  console.log("pitfall 1:", error.name, "-", error.message);
}
```

**Real output:**

```text
pitfall 1: TypeError - Cannot destructure property 'title' of 'undefined' as it is undefined.
```

**Explanation:** Object destructuring requires a non-nullish value.

**Prevention:** Validate the input or provide a fallback object.

### Pitfall 2: Null Does Not Trigger Defaults

**Example:**

```javascript
const task = { title: null };
const { title = "Untitled" } = task;

console.log("pitfall 2:", title);
```

**Real output:**

```text
pitfall 2: null
```

**Explanation:** Destructuring defaults are applied only to `undefined`.

**Prevention:** Use `??` when `null` and `undefined` should both trigger a fallback.

### Pitfall 3: Renaming Does Not Create the Original Variable

**Example:**

```javascript
try {
  const student = { name: "Damla" };
  const { name: studentName } = student;

  console.log("renamed value:", studentName);
  console.log(name);
} catch (error) {
  console.log("pitfall 3:", error.name, "-", error.message);
}
```

**Real output:**

```text
renamed value: Damla
pitfall 3: ReferenceError - name is not defined
```

**Explanation:** `studentName` is the new local variable.

**Prevention:** Use the renamed variable consistently.

### Pitfall 4: Object Assignment Requires Parentheses

**Example:**

```javascript
let status = "todo";

const updatedTask = {
  status: "done"
};

({ status } = updatedTask);

console.log("pitfall 4:", status);
```

**Real output:**

```text
pitfall 4: done
```

**Explanation:** A standalone object destructuring assignment to an existing variable requires parentheses to avoid being parsed as a block.

**Prevention:**

```javascript
({ status } = updatedTask);
```

The experiment demonstrates the corrected syntax. The invalid version was not executed.

### Pitfall 5: Missing Array Elements

**Example:**

```javascript
const grades = [90];

const [firstGrade, secondGrade] = grades;

console.log("pitfall 5:", firstGrade, secondGrade);
```

**Real output:**

```text
pitfall 5: 90 undefined
```

**Explanation:** Missing array positions produce `undefined`, not an error.

**Prevention:** Use defaults or check whether the requested elements exist.

---

## 4. TypeScript Typing Topics: T1–T5

The TypeScript experiments are implemented in `ts/types.ts`.

### T1: Renaming Versus Type Annotations

**Example:**

```typescript
const task = {
  title: "Complete Assignment 4"
};

const { title: taskTitle } = task;

const { title: typedTitle }: { title: string } = task;
```

**Real output:**

```text
T1 renamed: Complete Assignment 4
T1 typed: Complete Assignment 4
```

**Explanation:** The colon inside a destructuring pattern renames a variable. A type annotation is written after the complete pattern.

---

### T2: Tuple Types and `as const`

**Example:**

```typescript
function getResult(): [number, string] {
  return [95, "passed"];
}

const [score, result] = getResult();

const coordinates = [41.01, 28.97] as const;

const [latitude, longitude] = coordinates;
```

**Real output:**

```text
T2 tuple: 95 passed
T2 as const: 41.01 28.97
```

**Explanation:** Tuples specify types at individual positions. `as const` preserves literal values and creates a readonly tuple.

---

### T3: `noUncheckedIndexedAccess`

**Example:**

```typescript
const grades: number[] = [85, 90];

const [firstGrade] = grades;

if (firstGrade !== undefined) {
  console.log("T3 first grade:", firstGrade);
}

const emptyGrades: number[] = [];

const [missingGrade = 0] = emptyGrades;

console.log("T3 default:", missingGrade);
```

**Real output:**

```text
T3 first grade: 85
T3 default: 0
```

**Explanation:** With `noUncheckedIndexedAccess`, array access can return a type such as `number | undefined`. Guards and defaults handle this possibility.

---

### T4: Optional Fields and Defaults

**Example:**

```typescript
type CourseOptions = {
  credits?: number;
};

const courseOptions: CourseOptions = {};

const { credits: optionalCredits } = courseOptions;

const { credits = 3 } = courseOptions;
```

**Real output:**

```text
T4 optional: undefined
T4 default: 3
```

**Explanation:** Optional properties may be missing. Default values provide a usable value when the property is `undefined`.

---

### T5: Compile-Time Error and Correction

**Example from `ts/types.ts`:**

```typescript
const student = {
  name: "Damla",
  age: 22
};

// @ts-expect-error Property 'department' does not exist
const { department } = student;

console.log("T5 invalid:", department);

const { name: studentName } = student;

console.log("T5 fixed:", studentName);
```

**Real runtime output:**

```text
T5 invalid: undefined
T5 fixed: Damla
```

**Separate compiler experiment:**

A temporary file named `ts/t5-error-demo.ts` was created without the `@ts-expect-error` comment.

```typescript
const student = { name: "Damla", age: 22 };
const { department } = student;
console.log(department);
```

The following command was executed:

```powershell
npx tsc --noEmit --strict --skipLibCheck --target es2022 ts/t5-error-demo.ts
```

**Actual compiler error:**

```text
ts/t5-error-demo.ts:2:9 - error TS2339: Property 'department' does not exist on type '{ name:string; age: number; }'.

Found 1 error in ts/t5-error-demo.ts:2
```

**Explanation:** TypeScript detected a missing object property before runtime.

**Correction:** Access an existing property or add the property to the object and type definition.

The temporary file was removed afterward. `npm run check` passed.

`@ts-expect-error` was used only for the intentional T5 demonstration.

---

## 5. React Props and Children: P1–P7

JavaScript examples are implemented in `js/props.jsx`.

TypeScript counterparts are implemented in `ts/props.tsx`.

Both use `renderToStaticMarkup` from React DOM to generate HTML without a browser.

### P1: Props Object Versus Destructuring

**Example:**

```jsx
function CardA(props) {
  return (
    <section>
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
}

function CardB({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

**Real output:**

```text
P1 A: <section><h2>Study Plan</h2>React</section>
P1 B: <section><h2>Study Plan</h2>React</section>
```

**Explanation:** React passes one props object to each component. Destructuring changes how props are accessed, but the generated HTML remains the same.

In TypeScript, `CardProps` describes the title and children types.

---

### P2: Children as a Prop

**Example:**

```jsx
<CardB title="Notes">Hello</CardB>

<CardB title="Notes" children="Hello" />
```

**Real output:**

```text
P2 nested: <section><h2>Notes</h2>Hello</section>
P2 attribute: <section><h2>Notes</h2>Hello</section>
```

**Explanation:** Nested JSX becomes the `children` prop. It may also be supplied explicitly.

---

### P3: Different Types of Children

**Real output:**

```text
P3 string: <div>Hello</div>
P3 number: <div>42</div>
P3 element: <div><strong>Important</strong></div>
P3 multiple: <div><span>A</span><span>B</span></div>
P3 undefined: <div></div>
P3 null: <div></div>
P3 false: <div></div>
```

**Explanation:** Strings, numbers, and React elements are renderable. `undefined`, `null`, and `false` produce no visible content.

**Function example:**

```jsx
const renderMessage = () => "Hello from function";

<ChildBox>{renderMessage()}</ChildBox>
```

**Real output:**

```text
P3 function value type: function
P3 function called: <div>Hello from function</div>
```

A plain function is not a valid React child. It must first be called to produce a renderable value.

TypeScript's `ReactNode` type helps enforce this restriction.

---

### P4: Rest Props and Spread Order

**Example:**

```jsx
function Panel({ title, children, ...rest }) {
  return (
    <section {...rest}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}
```

**Real output:**

```text
P4 rest: <section id="task-panel" class="panel"><h3>Tasks</h3>Current tasks</section>
```

**Explanation:** Extracted properties are removed from the rest object. Remaining properties can be forwarded to an HTML element.

**Spread order example:**

```jsx
function ButtonExample(props) {
  return <button {...props} type="button">Save</button>;
}
```

**Real output:**

```text
P4 override: <button type="button">Save</button>
```

The explicit `type="button"` overrides an earlier `type="submit"` supplied through the spread.

---

### P5: Named Slots Versus Children

**Named props example:**

```jsx
function LayoutWithProps({ header, footer, children }) {
  return (
    <article>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </article>
  );
}
```

**General children example:**

```jsx
function LayoutWithChildren({ children }) {
  return <article>{children}</article>;
}
```

**Real output:**

```text
P5 props: <article><header>My Tasks</header><main>Task list</main><footer>3 tasks</footer></article>
P5 children: <article><header>My Tasks</header><main>Task list</main><footer>3 tasks</footer></article>
```

**Explanation:** Named slots give a component control over specific regions. General children provide more flexibility. Both approaches produced the same HTML in this experiment.

---

### P6: Undefined Versus Null

**Example:**

```jsx
function StatusBadge({ label = "Pending" }) {
  return <span>{label}</span>;
}
```

**Real output:**

```text
P6 undefined: <span>Pending</span>
P6 null: <span></span>
```

**Explanation:** `undefined` triggers the default value. `null` does not trigger it and renders no visible text.

The TypeScript version allows `label?: string | null`.

---

### P7: TypeScript Types for React Props

**ReactNode:**

```tsx
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children?: ReactNode;
};
```

`ReactNode` describes values that React can render.

**PropsWithChildren:**

```tsx
import type { PropsWithChildren } from "react";

function LayoutWithChildren({
  children
}: PropsWithChildren) {
  return <article>{children}</article>;
}
```

`PropsWithChildren` adds an optional `children` property to a component's props type.

**ComponentProps:**

```tsx
import type { ComponentProps } from "react";

type ActionButtonProps = ComponentProps<"button"> & {
  label: string;
};
```

`ComponentProps<"button">` provides standard HTML button prop types.

**Accepted examples:**

```tsx
<ActionButton label="Save task" disabled />

<LayoutWithChildren>
  <strong>Task details</strong>
</LayoutWithChildren>
```

**Real output:**

```text
P7 ComponentProps: <button disabled="">Save task</button>
P7 PropsWithChildren: <article><strong>Task details</strong></article>
```

**Rejected examples:**

```tsx
// Missing required label
<ActionButton disabled />

// Incorrect label type
<ActionButton label={123} />

// A plain function is not a valid ReactNode
<ChildBox>{() => "Hello"}</ChildBox>
```

These examples illustrate TypeScript restrictions. They were not separately compiled during the original P7 experiment.

**Conclusion:** TypeScript verifies React prop types and helps detect invalid component usage before runtime.

---

## 6. JavaScript vs TypeScript Comparison

| Topic | JavaScript | TypeScript |
|---|---|---|
| Array extraction | Extracts values at runtime | Supports inferred element types |
| Tuple results | Uses ordinary arrays | Tuple types describe positions and element types |
| Missing elements | Can produce `undefined` | Can detect possible missing values |
| Object extraction | Reads properties dynamically | Checks property names against object types |
| Property renaming | Uses `property: alias` | Same syntax; type annotations are separate |
| Optional defaults | Applied at runtime | Optional fields are represented in types |
| Nested destructuring | Depends on runtime data | Nested types describe expected structure |
| Computed keys | Dynamic keys are allowed | `keyof` can restrict valid keys |
| Function parameters | Supports destructured options | Option types describe accepted properties |
| Map iteration | Iterates key-value pairs | Generic types describe keys and values |
| React children | Invalid values may cause runtime issues | `ReactNode` describes valid children |
| HTML props | Props are passed dynamically | `ComponentProps` checks HTML prop types |

**Observation:** JavaScript and TypeScript generally produce the same runtime output for matching examples.

TypeScript adds static type checking and can identify mistakes before execution.

---

## 7. My Own Log

This section describes five experiments and observations from completing the assignment.

### Observation 1: Destructuring Undefined

Running `node js/pitfalls.mjs` produced:

```text
TypeError - Cannot destructure property 'title' of 'undefined' as it is undefined.
```

I learned that an object must exist before its properties can be destructured.

### Observation 2: Default Values and Null

The program printed:

```text
pitfall 2: null
```

I learned that destructuring defaults apply to `undefined`, not `null`.

This matters when handling optional API responses and configuration fields.

### Observation 3: Renaming Variables

The program first printed:

```text
renamed value: Damla
```

Then it produced:

```text
pitfall 3: ReferenceError - name is not defined
```

I learned that renaming a property creates a new local variable.

The original property name is not automatically declared as a separate local variable.

### Observation 4: Missing Array Elements

The experiment printed:

```text
pitfall 5: 90 undefined
```

I learned that missing array elements produce `undefined` without throwing an exception.

Defaults and checks can make the code safer.

### Observation 5: TypeScript Versus Runtime

The runtime experiment printed:

```text
T5 invalid: undefined
```

However, the separate compiler experiment produced:

```text
error TS2339: Property 'department' does not exist on type '{ name:string; age: number; }'.
```

I learned that TypeScript can detect missing object properties at compile time even when JavaScript returns `undefined` at runtime.

The temporary compiler experiment file was removed afterward, and `npm run check` passed.

### Additional Observation: React Spread Order

The React experiment printed:

```text
P4 override: <button type="button">Save</button>
```

This demonstrated that later JSX props override earlier spread values.

The P6 experiment also reinforced the difference between `undefined` and `null`.

---

## 8. Project Structure and Verification

### Project Structure

```text
starter/
|
|-- js/
|   |-- arrays.mjs
|   |-- objects.mjs
|   |-- params.mjs
|   |-- pitfalls.mjs
|   |-- props.jsx
|
|-- ts/
|   |-- arrays.ts
|   |-- objects.ts
|   |-- params.ts
|   |-- types.ts
|   |-- props.tsx
|
|-- bonus1/
|   |-- Destructuring_Field_Guide.tex
|   |-- Destructuring_Field_Guide.pdf
|
|-- bonus2/
|   |-- experiments.mjs
|   |-- types.ts
|   |-- output.txt
|
|-- bonus3/
|   |-- real-code-analysis.md
|
|-- tests/
|   |-- destructuring.test.mjs
|   |-- react-props.test.mjs
|   |-- type-safety.ts
|   |-- test-results.txt
|   |-- all-test-results.txt
|
|-- README.md
|-- output.txt
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- .gitignore
```

### Verification Performed

The following commands were executed successfully:

```powershell
node js/arrays.mjs
node js/objects.mjs
node js/params.mjs
node js/pitfalls.mjs

npx tsx js/props.jsx

npx tsx ts/arrays.ts
npx tsx ts/objects.ts
npx tsx ts/params.ts
npx tsx ts/types.ts
npx tsx ts/props.tsx

npm run all > output.txt
npm run check
```

All required examples produced their documented results.

The TypeScript type check passed.

The separate T5 experiment intentionally produced error TS2339, and the temporary file was removed afterward.

---

## 9. Optional Bonus Work

### Bonus 1: LaTeX/PDF Field Guide

I created a separate field guide using LaTeX.

**Files:**

- `bonus1/Destructuring_Field_Guide.tex`
- `bonus1/Destructuring_Field_Guide.pdf`

The PDF contains:

- A table of contents
- JavaScript and TypeScript destructuring examples
- Actual execution outputs
- Common pitfalls
- React props and children
- Comparison tables

**Rebuild commands:**

```bash
cd bonus1
pdflatex Destructuring_Field_Guide.tex
pdflatex Destructuring_Field_Guide.tex
```

Running the compiler twice updates the table of contents and references.

---

### Bonus 2: Advanced Destructuring Experiments

I completed 11 additional experiments involving advanced JavaScript and TypeScript behavior.

**JavaScript file:** `bonus2/experiments.mjs`

| Experiment | Topic | Observation |
|---|---|---|
| 1 | Custom iterables | Array destructuring works with custom iterable objects |
| 2 | Default evaluation | Defaults execute only when the value is undefined |
| 3 | Getter evaluation order | Properties are accessed in destructuring pattern order |
| 4 | Catch destructuring | Error properties can be extracted in catch parameters |
| 5 | Nested defaults | Nested patterns support fallback objects |
| 6 | Shallow copying | Object rest preserves references to nested objects |

**TypeScript file:** `bonus2/types.ts`

| Experiment | Topic | Observation |
|---|---|---|
| 7 | Conditional types and infer | Extracted an array element type |
| 8 | Function return types | Extracted a function's return type |
| 9 | Readonly tuples | Used `as const` with tuple destructuring |
| 10 | satisfies | Checked object compatibility with a type |
| 11 | Generic tuples | Created and destructured a generic tuple |

**Execution:**

```bash
node bonus2/experiments.mjs
npx tsx bonus2/types.ts
```

**Type checking:**

```bash
npx tsc --noEmit --strict --skipLibCheck --target es2022 --module nodenext --moduleResolution nodenext bonus2/types.ts
```

The file `bonus2/output.txt` contains the actual outputs from these experiments.

**What I learned:**

Destructuring involves more than assigning values.

Getter evaluation order depends on the pattern, while default expressions are evaluated only when necessary.

TypeScript generics and conditional types can provide stronger type information for destructured values.

---

### Bonus 3: Real Code Destructuring Analysis

I analyzed five destructuring examples from my previous React Task Manager project.

**Source repository:**

https://github.com/Damlagnnd/assignment3-task-manager

**Analysis file:**

`bonus3/real-code-analysis.md`

**Cases analyzed:**

1. `src/App.tsx:22` — AddForm props destructuring
2. `src/App.tsx:52` — FilterBar props destructuring
3. `src/App.tsx:102` — TaskList props destructuring
4. `src/App.tsx:139` — useReducer tuple destructuring
5. `src/TaskRow.tsx:5` — TaskRow props destructuring

For each example, the analysis includes:

- Original source code
- Equivalent code without destructuring
- Explanation of the destructuring pattern
- Benefits and limitations
- Readability considerations

The analysis also examines an example where excessive nested destructuring reduces readability.

**What I learned:**

React commonly uses object destructuring for component props.

Hooks such as `useReducer` return ordered values that work naturally with array destructuring.

Destructuring should improve readability rather than simply reduce code length.

---

### Bonus 4: GitHub Repository and Commit History

**Repository:**

https://github.com/Damlagnnd/assignment4-destructuring-guide

The repository contains the JavaScript and TypeScript examples, README documentation, actual execution outputs, tests, and optional bonus files.

The `.gitignore` file excludes `node_modules` and temporary build files.

**Verified commits:**

| Commit | Description |
|---|---|
| `9ddc197` | Initial commit: destructuring field guide and bonus implementations |
| `1efd4a0` | docs: add GitHub repository and bonus documentation |
| `c208616` | test: add 12 automated destructuring tests |
| `10396dc` | test: add 10 React props and children tests |
| `30642b2` | test: add TypeScript compile-time safety tests |

The repository contains five meaningful commits, including documentation improvements, automated runtime tests, and TypeScript type safety checks.

---

## 10. Automated Destructuring Tests

I created 12 automated tests using Node.js's built-in test runner.

**File:** `tests/destructuring.test.mjs`

The tests cover:

- Array destructuring
- Rest syntax
- Variable swapping
- Default values
- Null behavior
- Object renaming
- Object rest
- Nested destructuring
- Computed keys
- Function parameter defaults
- Map iteration
- Missing array elements
- Shallow copying

**Run:**

```bash
node --test tests/destructuring.test.mjs
```

**Verified results:**

```text
Total tests: 12
Passed: 12
Failed: 0
Skipped: 0
```

The actual output is stored in `tests/test-results.txt`.

---

## 11. React Props and Children Tests

I created 10 additional React tests using Node.js and React server-side rendering.

**File:** `tests/react-props.test.mjs`

The tests cover:

- Props object access
- Destructured props
- Explicit children props
- Numeric children
- Null and undefined children
- Boolean children
- Multiple React elements
- Rest props forwarding
- Prop override order
- Default values

### Run All Tests

```bash
node --test tests/*.test.mjs
```

### Actual Verified Results

```text
tests 22
pass 22
fail 0
cancelled 0
skipped 0
todo 0
```

The combined output can be regenerated using:

```powershell
node --test tests/*.test.mjs > tests/all-test-results.txt
```

The file `tests/all-test-results.txt` contains the recorded output from the automated runtime tests.

---

## 12. TypeScript Type Safety Tests

I added five additional compile-time tests to verify TypeScript's type safety.

**File:** `tests/type-safety.ts`

The tests cover:

- Tuple length checking
- Invalid object property access
- Optional properties and undefined values
- Readonly tuple protection
- Computed property keys with `keyof`

The tests use `@ts-expect-error` to verify that TypeScript detects intentionally invalid operations.

### Run the Type Safety Tests

```bash
npx tsc --noEmit --strict --skipLibCheck --target es2022 --module nodenext --moduleResolution nodenext tests/type-safety.ts
```

### Verified Result

The compiler completed successfully, confirming that all five expected type errors were detected and that the remaining code passed type checking.

These compile-time tests complement the 22 runtime tests.

---

## 13. Final Verification

Before submission, run:

```bash
npm install
npm run all
npm run check
node --test tests/*.test.mjs
npx tsc --noEmit --strict --skipLibCheck --target es2022 --module nodenext --moduleResolution nodenext tests/type-safety.ts
```

**Verified results:**

- JavaScript examples executed successfully.
- TypeScript examples executed successfully.
- TypeScript type checking completed without errors.
- All 22 automated runtime tests passed.
- All five expected TypeScript compile-time errors were detected.
- Actual output files were included in the project.

---

## Conclusion

This assignment demonstrated how destructuring is used in JavaScript, TypeScript, and React.

Array destructuring is useful for extracting ordered values, while object destructuring simplifies access to named properties.

Default values, rest syntax, nested patterns, and function parameter destructuring make code more flexible.

TypeScript adds static checking that can identify invalid properties and incompatible types before execution.

The React examples demonstrated how destructuring simplifies component props handling.

The advanced experiments, real-code analysis, and automated tests helped reinforce these concepts through practical examples.
