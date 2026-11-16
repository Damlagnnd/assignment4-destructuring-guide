# Destructuring Field Guide

**GitHub repository:** https://github.com/Damlagnnd/assignment4-destructuring-guide

**Name:** Damla Günendi

**Student number:** 2200004319

**Bonuses claimed:** Bonus 1 - LaTeX/PDF; Bonus 2 - Advanced Experiments; Bonus 3 - Real Code Analysis

**Course:** Advanced Web Programming

**Languages:** JavaScript and TypeScript

**Framework:** React (server-side static rendering examples)

## 1. Overview and setup

This field guide demonstrates 12 JavaScript destructuring forms and their typed TypeScript counterparts, five JavaScript pitfalls, five TypeScript typing topics (T1–T5), and React props/children behavior (P1–P7). Examples use course grades, university data, and a task-management application.

From the starter project directory:

```bash
npm install
npm run all
npm run check
```

`npm run all` executes the JavaScript and TypeScript demonstrations. `npm run check` runs TypeScript's type checker without emitting output. To regenerate the captured terminal output, use the following PowerShell command:

```powershell
npm run all > output.txt
```

The generated `output.txt` contains the real output from the project's `npm run all` run. All examples below correspond to the implemented files in `js/` and `ts/`.

## 2. The twelve destructuring forms

### Form 1 — Destructure a function's returned array

**Syntax:** `const [x, y] = functionReturningArray();`

**Example (`js/arrays.mjs`, `ts/arrays.ts`):**

```js
function getExamResults() {
return [85, 92];
}
const [midterm, finalExam] = getExamResults();
console.log("form 1:", midterm, finalExam);
```

**Real output:** `form 1: 85 92`

**Use it when:** A function returns related values in a fixed order, such as a midterm and final exam score.

**Watch out:** The names of the variables do not matter to array destructuring; their **positions** do. TypeScript uses a `[number, number]` return tuple in the corresponding example to enforce two numeric elements.

### Form 2 — Skip elements and collect the remainder

**Syntax:** `const [, second, ...others] = list;`

**Example (`js/arrays.mjs`, `ts/arrays.ts`):**

```js
const languages = ["Python", "JavaScript", "TypeScript", "Java"];
const [, secondLanguage, ...otherLanguages] = languages;
console.log("form 2:", secondLanguage, otherLanguages);
```

**Real output:** `form 2: JavaScript [ 'TypeScript', 'Java' ]`

**Use it when:** You want a particular array position and the elements that follow it.

**Watch out:** The rest element must be last. If the array is too short, a selected element may be `undefined`.

### Form 3 — Swap variables without a temporary variable

**Syntax:** `[a, b] = [b, a];`

**Example (`js/arrays.mjs`, `ts/arrays.ts`):**

```js
let firstScore = 70;
let secondScore = 95;
[firstScore, secondScore] = [secondScore, firstScore];
console.log("form 3:", firstScore, secondScore);
```

**Real output:** `form 3: 95 70`

**Use it when:** Swapping two existing variables, for example when comparing or sorting scores.

**Watch out:** Existing variables must be declared with `let` if their values will change. This is assignment, not a new declaration.

### Form 4 — Provide array defaults

**Syntax:** `const [a = 1, b = 2] = array;`

**Example (`js/arrays.mjs`, `ts/arrays.ts`):**

```js
const availableScores = [88];
const [quizScore = 0, projectScore = 100] = availableScores;
console.log("form 4:", quizScore, projectScore);
```

**Real output:** `form 4: 88 100`

**Use it when:** An array may contain fewer values than expected.

**Watch out:** Defaults apply when a value is `undefined`, not when it is `null` or `0`.

### Form 5 — Extract object properties by name

**Syntax:** `const { title, status } = object;`

**Example (`js/objects.mjs`, `ts/objects.ts`):**

```js
const task = { title: "Finish web assignment", status: "in-progress" };
const { title, status } = task;
console.log("form 5:", title, status);
```

**Real output:** `form 5: Finish web assignment in-progress`

**Use it when:** An object contains multiple fields you need, such as task details.

**Watch out:** Object keys, unlike array positions, determine which values are extracted. Destructuring `null` or `undefined` causes an error.

### Form 6 — Rename a property

**Syntax:** `const { name: studentName } = student;`

**Example (`js/objects.mjs`, `ts/objects.ts`):**

```js
const student = { name: "Damla", department: "Computer Engineering" };
const { name: studentName } = student;
console.log("form 6:", studentName);
```

**Real output:** `form 6: Damla`

**Use it when:** The original property name conflicts with an existing variable or a more descriptive local name is useful.

**Watch out:** This creates `studentName`, not a local variable called `name`. Writing `{ name: string }` inside a destructuring pattern is a **rename** to `string`, not a TypeScript type annotation.

### Form 7 — Object property defaults

**Syntax:** `const { credits = 4 } = course;`

**Example (`js/objects.mjs`, `ts/objects.ts`):**

```js
const course = { name: "Advanced Web Programming", credits: undefined };
const { credits = 4 } = course;
console.log("form 7:", credits);
```

**Real output:** `form 7: 4`

**Use it when:** Optional configuration fields should have a sensible fallback.

**Watch out:** `null` is an explicit value and does not trigger this default.

### Form 8 — Collect remaining object properties

**Syntax:** `const { projectName, ...projectDetails } = project;`

**Example (`js/objects.mjs`, `ts/objects.ts`):**

```js
const project = {
projectName: "Task Manager",
language: "TypeScript",
framework: "React",
};
const { projectName, ...projectDetails } = project;
console.log("form 8:", projectName, projectDetails);
```

**Real output:** `form 8: Task Manager { language: 'TypeScript', framework: 'React' }`

**Use it when:** Separating a key field from the rest of an object's properties, especially in React props.

**Watch out:** Object rest creates a new shallow object. It does not deeply clone nested objects.

### Form 9 — Nested object and array patterns

**Syntax:** `const { location: { city }, courses: [firstCourse] } = university;`

**Example (`js/objects.mjs`, `ts/objects.ts`):**

```js
const university = {
location: { city: "Istanbul", campus: "Atakoy" },
courses: ["Web Programming", "Operating Systems"],
};
const { location: { city }, courses: [firstCourse] } = university;
console.log("form 9:", city, firstCourse);
```

**Real output:** `form 9: Istanbul Web Programming`

**Use it when:** Reading selected values from structured responses, such as university or API data.

**Watch out:** If a nested object is missing, accessing a nested property may throw a runtime error. TypeScript's example types `courses` as a two-element tuple.

### Form 10 — Computed property names

**Syntax:** `const { [key]: value } = object;`

**Example (`js/objects.mjs`, `ts/objects.ts`):**

```js
const grades = { midterm: 80, final: 95 };
const selectedExam = "final";
const { [selectedExam]: selectedGrade } = grades;
console.log("form 10:", selectedGrade);
```

**Real output:** `form 10: 95`

**Use it when:** A property to read is selected at runtime.

**Watch out:** Square brackets are needed for a computed key. In TypeScript, `keyof Grades` can constrain the key to allowed property names.

### Form 11 — Destructure function arguments with defaults

**Syntax:** `function createTask({ title = "Untitled", status = "todo" } = {}) { ... }`

**Example (`js/params.mjs`, `ts/params.ts`):**

```js
function createTask({ title = "Untitled", status = "todo" } = {}) {
return { title, status };
}
console.log("form 11a:", createTask({ title: "Complete Assignment 4", status: "in-progress" }));
console.log("form 11b:", createTask({ title: "Study React" }));
console.log("form 11c:", createTask());
```

**Real output:**

```text
form 11a: { title: 'Complete Assignment 4', status: 'in-progress' }
form 11b: { title: 'Study React', status: 'todo' }
form 11c: { title: 'Untitled', status: 'todo' }
```

**Use it when:** Designing flexible functions with named, optional options.

**Watch out:** The outer `= {}` protects calls with no argument; individual defaults protect omitted properties. Passing `null` still causes destructuring to fail.

### Form 12 — Destructure entries in loops

**Syntax:** `for (const [key, value] of Object.entries(object)) { ... }`

**Example (`js/params.mjs`, `ts/params.ts`):**

```js
const courseGrades = { JavaScript: 90, TypeScript: 95, React: 88 };
for (const [course, grade] of Object.entries(courseGrades)) {
console.log("form 12 object:", course, grade);
}
const taskStatuses = new Map([
["Assignment 4", "in-progress"],
["Study React", "todo"],
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

**Use it when:** Iterating over object or Map key/value pairs.

**Watch out:** `Object.entries()` yields an array of pairs; a `Map` is directly iterable over pairs. On TypeScript, the examples use `Record<string, number>` and `Map<string, string>`.

## 3. Five JavaScript pitfalls

These are actual outputs from `node js/pitfalls.mjs`, also present in `output.txt`.
| Pitfall | Demonstration | Real output | Explanation / prevention |
|---|---|---|---|
| 1. Destructuring `undefined` | `const { title } = undefined` inside `try/catch` | `pitfall 1: TypeError - Cannot destructure property 'title' of 'undefined' as it is undefined.` | Destructuring needs an object; validate the value or use a fallback object. |
| 2. `null` ignores a default | `{ title = "Untitled" } = { title: null }` | `pitfall 2: null` | Defaults only replace `undefined`; use `??` separately if both `null` and `undefined` need a fallback. |
| 3. Renaming hides the original local name | `{ name: studentName } = student`, then reference `name` | `renamed value: Damla` followed by `pitfall 3: ReferenceError - name is not defined` | `name` is the property to read; `studentName` is the declared variable. |
| 4. Existing object assignment requires parentheses | `({ status } = updatedTask)` | `pitfall 4: done` | The working example shows the **corrected** syntax. Without parentheses, a standalone `{ ... }` is parsed as a block instead of the intended assignment. The invalid version was not run in this experiment. |
| 5. Missing array elements | `const [firstGrade, secondGrade] = [90]` | `pitfall 5: 90 undefined` | Missing positions give `undefined`; add defaults or check existence. |

## 4. TypeScript typing topics: T1–T5

All demonstrations are implemented in `ts/types.ts`; the following results are from the actual `npx tsx ts/types.ts` run.

### T1 — Rename is not a type annotation

```ts
const task = { title: "Complete Assignment 4" };
const { title: taskTitle } = task; // rename
const { title: typedTitle }: { title: string } = task; // type the pattern
```

**Real output:**

```text
T1 renamed: Complete Assignment 4
T1 typed: Complete Assignment 4
```

**Lesson:** In `{ title: otherName }`, `otherName` is a new variable name. A type annotation follows the whole destructuring pattern.

### T2 — Tuples and `as const`

```ts
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

**Lesson:** A tuple carries per-position types. `as const` infers a readonly tuple with literal element types.

### T3 — `noUncheckedIndexedAccess`

```ts
const grades: number[] = [85, 90];
const [firstGrade] = grades;
if (firstGrade !== undefined) console.log("T3 first grade:", firstGrade);
const emptyGrades: number[] = [];
const [missingGrade = 0] = emptyGrades;
console.log("T3 default:", missingGrade);
```

**Real output:**

```text
T3 first grade: 85
T3 default: 0
```

**Lesson:** When `noUncheckedIndexedAccess` is enabled, indexing a regular array can produce `number | undefined`. A guard or default handles that possibility. This behavior depends on the TypeScript configuration.

### T4 — Optional properties and default values

```ts
type CourseOptions = { credits?: number };
const courseOptions: CourseOptions = {};
const { credits: optionalCredits } = courseOptions;
const { credits = 3 } = courseOptions;
```

**Real output:**

```text
T4 optional: undefined
T4 default: 3
```

**Lesson:** An optional property may be `undefined`. Providing a default yields a usable value when the property is missing.

### T5 — Compile-time error, runtime result, and fix

The file `ts/types.ts` intentionally includes an annotated invalid property access:

```ts
const student = { name: "Damla", age: 22 };
// @ts-expect-error Property 'department' does not exist
const { department } = student;
console.log("T5 invalid:", department);
const { name: studentName } = student;
console.log("T5 fixed:", studentName);
```

**Actual runtime output:**

```text
T5 invalid: undefined
T5 fixed: Damla
```

**Separate compiler experiment:** A temporary `ts/t5-error-demo.ts` was created **without** `@ts-expect-error` and checked with:

```powershell
npx tsc --noEmit --strict --skipLibCheck --target es2022 ts/t5-error-demo.ts
```

**Actual compiler output (significant lines):**

```text
ts/t5-error-demo.ts:2:9 - error TS2339: Property 'department' does not exist on type '{ name:string; age: number; }'.
Found 1 error in ts/t5-error-demo.ts:2
```

The temporary file was deleted afterward. `npm run check` then passed. **Fix:** Access an existing field or extend the type/object to include the intended field. `@ts-expect-error` is used only for this intentional T5 demonstration, not to suppress ordinary project errors.

## 5. React props and children: P1–P7

JavaScript examples are in `js/props.jsx`, and typed counterparts are in `ts/props.tsx`. Both use `renderToStaticMarkup` so the output is observable without a browser. The logs below were actually produced by the two files.

### P1 — The props object versus destructuring

```jsx
function CardA(props) {
return <section><h2>{props.title}</h2>{props.children}</section>;
}
function CardB({ title, children }) {
return <section><h2>{title}</h2>{children}</section>;
}
```

**Real output (JS and TS):**

```text
P1 A: <section><h2>Study Plan</h2>React</section>
P1 B: <section><h2>Study Plan</h2>React</section>
```

**Why it matters:** React passes one props object to components. Destructuring changes how fields are accessed, not the produced markup. In TS, `CardProps` describes `title: string` and `children?: ReactNode`.

### P2 — `children` is also a prop

Compare `<CardB title="Notes">Hello</CardB>` with `<CardB title="Notes" children="Hello" />`.

**Real output:**

```text
P2 nested: <section><h2>Notes</h2>Hello</section>
P2 attribute: <section><h2>Notes</h2>Hello</section>
```

**Why it matters:** JSX content nested inside a component becomes its `children` prop. Most code uses the nested syntax for readability.

### P3 — What can be a child?

| Value | Real static HTML |
|---|---|
| String | `P3 string: <div>Hello</div>` |
| Number | `P3 number: <div>42</div>` |
| Element | `P3 element: <div><strong>Important</strong></div>` |
| Multiple elements | `P3 multiple: <div><span>A</span><span>B</span></div>` |
| `undefined` | `P3 undefined: <div></div>` |
| `null` | `P3 null: <div></div>` |
| `false` | `P3 false: <div></div>` |
| Function invoked for text | `P3 function called: <div>Hello from function</div>` |
The JavaScript file also logged `P3 function value type: function`. **A function itself is not a renderable React child**; call it to obtain a string or element. In TypeScript, `children?: ReactNode` accepts the supported renderable values but rejects a plain function value.

### P4 — Rest props and override order

```jsx
function Panel({ title, children, ...rest }) {
return <section {...rest}><h3>{title}</h3>{children}</section>;
}
function ButtonExample(props) {
return <button {...props} type="button">Save</button>;
}
```

**Real output:**

```text
P4 rest: <section id="task-panel" class="panel"><h3>Tasks</h3>Current tasks</section>
P4 override: <button type="button">Save</button>
```

**Why it matters:** `...rest` forwards remaining props; `title` and `children` are removed from that remainder. In the button, `type="button"` appears **after** `{...props}` so it overrides the supplied `type="submit"`. Reversing the order would let the spread value win.

### P5 — Named slots (`header`/`footer`) versus `children`

One layout receives `header`, `footer`, and `children` separately; another receives one `children` tree containing `<header>`, `<main>`, and `<footer>`.

**Real output (both versions):**

```text
P5 props: <article><header>My Tasks</header><main>Task list</main><footer>3 tasks</footer></article>
P5 children: <article><header>My Tasks</header><main>Task list</main><footer>3 tasks</footer></article>
```

**Why it matters:** Named props are useful when a component controls specific page regions; general children allow a more flexible structure.

### P6 — Default applies to `undefined` but not `null`

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

**Why it matters:** An omitted/`undefined` prop triggers the default. `null` is not replaced, and React renders no visible text for it. The TS version allows `label?: string | null` so both calls are type-correct.

### P7 — TypeScript types for children and HTML props

```tsx
import type { ReactNode, PropsWithChildren, ComponentProps } from "react";
type CardProps = { title: string; children?: ReactNode };
type ButtonProps = ComponentProps<"button">;
type ActionButtonProps = ButtonProps & { label: string };
```

- `ReactNode` describes values that React can render. A plain function is not a `ReactNode`.
- `PropsWithChildren` adds an optional `children?: ReactNode` to a props type.
- `ComponentProps<"button">` supplies standard native button prop types, such as `disabled` and `type`.
- **Allowed examples:** a string child, a React element child, `<ActionButton label="Save task" disabled />`.
- **Rejected examples (type-level, not executed):** using `<ActionButton disabled />` without its required `label`; supplying a plain `() => "text"` as `children` typed `ReactNode`; passing a number to the required string `label`. These are explanations of TypeScript constraints, not claims that separate compilation experiments were run for these examples.

**Real TypeScript output:**

```text
P7 ComponentProps: <button disabled="">Save task</button>
P7 PropsWithChildren: <article><strong>Task details</strong></article>
```

The JavaScript file prints `P7: See ts/props.tsx for ReactNode and prop types.` because P7 focuses on TypeScript.

## 6. JavaScript vs TypeScript — comparison table

| Topic | JavaScript | TypeScript |
|---|---|---|
| Array extraction | Values are assigned at runtime | Inferred types and explicit tuple types describe elements |
| Tuple results (Form 1) | Return value is an ordinary array | `[number, number]` communicates length and element types |
| Skipped element (Form 2) | Missing values can become `undefined` | `noUncheckedIndexedAccess` can flag possible missing elements |
| Object extraction (Form 5) | Any key is attempted at runtime | Object types can reject nonexistent property names |
| Rename (Form 6 / T1) | `property: alias` renames a variable | The same syntax renames; a type annotation belongs after the pattern |
| Optional default (Form 7 / T4) | Default is applied at runtime to `undefined` | Optional types make missing values explicit during checking |
| Nested data (Form 9) | Access depends on the runtime shape | Nested types and tuples describe the expected data shape |
| Dynamic key (Form 10) | Any dynamic key can be attempted | `keyof Grades` restricts the selected key |
| Function options (Form 11) | Defaults work without parameter types | `TaskOptions` defines allowed option properties |
| Map iteration (Form 12) | Key/value types are not declared | `Map<string, string>` defines both kinds of values |
| React children (P3/P7) | Invalid children may surface as runtime warnings/errors | `ReactNode` rejects non-renderable values at type-check time |
| HTML props (P4/P7) | Props can be forwarded dynamically | `ComponentProps<"button">` checks native HTML prop names/types |
**Observation:** TypeScript generally does not change the generated HTML or destructuring runtime result. Its extra value is checking the shapes of data and component props before execution.

## 7. My own log — five actual observations and experiments

The entries below describe exercises actually run during this assignment. Not every experiment caused an unexpected exception; an observed behavior is identified as such rather than presented as a personal mistake.

1\. **Destructuring `undefined` failed at runtime.** Running `node js/pitfalls.mjs` produced `TypeError - Cannot destructure property 'title' of 'undefined' as it is undefined.` I learned that an object must exist before its properties can be destructured.

2\. **A default did not replace `null`.** The real output was `pitfall 2: null`, even though the destructuring declaration contained `title = "Untitled"`. I learned that defaults respond to `undefined` rather than all empty-looking values.

3\. **The renamed property could not be accessed using its old local name.** The file printed `renamed value: Damla` and then `pitfall 3: ReferenceError - name is not defined`. I learned the difference between an object key and a new local variable.

4\. **A missing array position produced `undefined`, not an error.** The actual output was `pitfall 5: 90 undefined`. I learned to use defaults or checks when reading optional positions.

5\. **The compiler caught a missing object property even though running JavaScript gave `undefined`.** `npx tsx ts/types.ts` printed `T5 invalid: undefined`. In a separate temporary file without `@ts-expect-error`, `npx tsc --noEmit --strict --skipLibCheck --target es2022 ts/t5-error-demo.ts` produced `TS2339: Property 'department' does not exist on type '{ name:string; age: number; }'.` The temporary file was removed and `npm run check` passed afterward. I learned the distinction between TypeScript static checks and JavaScript runtime behavior.

**Additional observation:** `P4 override: <button type="button">Save</button>` showed that JSX prop spread order determines which value wins. `P6 undefined: <span>Pending</span>` versus `P6 null: <span></span>` reinforced the rule about defaults.

## 8. Files and verification

```text
starter/
├── js/
│   ├── arrays.mjs
│   ├── objects.mjs
│   ├── params.mjs
│   ├── pitfalls.mjs
│   └── props.jsx
├── ts/
│   ├── arrays.ts
│   ├── objects.ts
│   ├── params.ts
│   ├── types.ts
│   └── props.tsx
├── README.md
├── output.txt
├── package.json
└── tsconfig.json
```

**Verification performed:**

- `node js/arrays.mjs`, `node js/objects.mjs`, `node js/params.mjs`, and `node js/pitfalls.mjs` produced the documented outputs.
- `npx tsx ts/arrays.ts`, `npx tsx ts/objects.ts`, `npx tsx ts/params.ts`, and `npx tsx ts/types.ts` produced the documented outputs.
- `npx tsx js/props.jsx` and `npx tsx ts/props.tsx` produced the documented static HTML outputs.
- `npm run all > output.txt` created the captured output file.
- `npm run check` passed after the T5 temporary compiler experiment was removed.

## 9. Optional bonus work

## Bonus 1: LaTeX/PDF Field Guide

I created a separate field guide using LaTeX.

Files:
- `bonus1/Destructuring_Field_Guide.tex`
- `bonus1/Destructuring_Field_Guide.pdf`

The document includes a table of contents, JavaScript and TypeScript destructuring forms, real output examples, common pitfalls, React props and children, and comparison tables.

The PDF was generated from the LaTeX source using pdflatex.

To rebuild the PDF:

```bash
cd bonus1
pdflatex Destructuring_Field_Guide.tex
pdflatex Destructuring_Field_Guide.tex
```


## Bonus 2: Advanced Destructuring Experiments

I completed 11 additional experiments to investigate advanced JavaScript and TypeScript behavior.

### JavaScript Experiments

File: `bonus2/experiments.mjs`

| Experiment | Topic | Observation |
|---|---|---|
| 1 | Custom iterables | Array destructuring works with custom iterable objects. |
| 2 | Default evaluation | Default expressions execute only when the extracted value is undefined. |
| 3 | Getter evaluation order | Properties are accessed in destructuring pattern order. |
| 4 | Catch destructuring | Error properties can be extracted directly in a catch parameter. |
| 5 | Nested defaults | Nested object destructuring supports fallback objects and values. |
| 6 | Shallow copies | Object rest does not deeply copy nested objects. |

### TypeScript Experiments

File: `bonus2/types.ts`

| Experiment | Topic | Observation |
|---|---|---|
| 7 | Conditional types and infer | Extracted the element type of an array. |
| 8 | Function return type inference | Extracted a function's return type and destructured its result. |
| 9 | Readonly tuples | Used as const to preserve tuple element types. |
| 10 | satisfies | Checked an object against a type while retaining inferred information. |
| 11 | Generic tuple functions | Created and destructured a tuple containing different types. |

### Execution

```bash
node bonus2/experiments.mjs
npx tsx bonus2/types.ts
```

### Type Checking

```bash
npx tsc --noEmit --strict --skipLibCheck --target es2022 --module nodenext --moduleResolution nodenext bonus2/types.ts
```

### Output

The file `bonus2/output.txt` contains the real execution results of all 11 experiments.

### What I Learned

These experiments showed that destructuring involves more than simply assigning values.

For example, getters are evaluated in the order specified by the destructuring pattern, and default expressions are evaluated only when necessary.

I also learned that TypeScript conditional types and generics can provide stronger type information for values that are later destructured.


## Bonus 3: Real Code Destructuring Analysis

I analyzed five destructuring examples from my previous React Task Manager project.

Source repository:
https://github.com/Damlagnnd/assignment3-task-manager

Analysis file:
`bonus3/real-code-analysis.md`

The analysis includes:

- Five verified examples with file paths and line numbers
- Original code and equivalent code without destructuring
- Explanations of how each example works
- Benefits and potential problems
- A case where excessive nested destructuring reduces readability
- A React useReducer array destructuring example
- Multiple React props destructuring examples

The examples were taken from `src/App.tsx` and `src/TaskRow.tsx` in the original project.



## Bonus 4: GitHub Repository

Repository:
https://github.com/Damlagnnd/assignment4-destructuring-guide

The repository contains the complete Assignment 4 project, including:

- JavaScript and TypeScript source files
- README documentation
- Captured execution output
- Bonus 1 LaTeX source and PDF
- Bonus 2 advanced experiments
- Bonus 3 real-code analysis

The `.gitignore` file excludes `node_modules` and temporary build files.

The repository was initialized with Git and pushed to the `main` branch.

Commit history:
- `9ddc197` — Initial commit: destructuring field guide and bonus implementations

The additional commit-history requirement is still in progress.


## Automated Destructuring Tests

I added 12 automated tests using Node.js's built-in test runner.

**Test file:** `tests/destructuring.test.mjs`

The tests cover:
- Array destructuring and rest syntax
- Variable swapping
- Default values and null behavior
- Object renaming and rest properties
- Nested destructuring
- Computed property names
- Function parameter defaults
- Map entry destructuring
- Missing array elements
- Shallow copy behavior

### Running the Tests

```bash
node --test tests/destructuring.test.mjs
```

### Test Results

- Total tests: 12
- Passed: 12
- Failed: 0
- Skipped: 0

The actual test output is saved in `tests/test-results.txt`.

These tests were added as an additional improvement to verify destructuring behavior automatically.
