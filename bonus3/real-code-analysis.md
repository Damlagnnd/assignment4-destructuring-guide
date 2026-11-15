
# Bonus 3 — Real Code Destructuring Analysis

**Student:** Damla Günendi  
**Student Number:** 2200004319  
**Assignment:** Destructuring Field Guide

## Source Project

Repository: https://github.com/Damlagnnd/assignment3-task-manager

Project: Assignment 3 — React Task Manager

The following examples were taken from my previous React and TypeScript Task Manager project.

All five examples were identified by searching the actual source files. File paths and line numbers refer to the local version inspected during this assignment.

The examples demonstrate how destructuring is used in real React components rather than isolated exercises.

---

## Case 1 — AddForm Props Destructuring

**File:** `src/App.tsx`  
**Line:** 22  
**Form:** Object destructuring in function parameters (Form 11)

### Original Code

```tsx
function AddForm({ dispatch }: { dispatch: Dispatch<Action> }) {
```

### Without Destructuring

```tsx
function AddForm(props: { dispatch: Dispatch<Action> }) {
  const dispatch = props.dispatch;
}
```

### Analysis

The `AddForm` component receives a props object containing the `dispatch` function.

Destructuring extracts `dispatch` directly in the function parameter.

The component uses this function to send an `add` action when a new task is submitted.

### Why Destructuring Helps

It avoids repeatedly writing `props.dispatch`.

Since the component needs only one property, the destructuring pattern is short and readable.

### Watch Out

The TypeScript annotation belongs after the destructuring pattern.

The syntax `{ dispatch: Dispatch<Action> }` inside a type annotation describes the expected prop type.

---

## Case 2 — FilterBar Multiple Props

**File:** `src/App.tsx`  
**Lines:** 52–60  
**Form:** Multiple object properties in function parameters (Form 11)

### Original Code

```tsx
function FilterBar({
  activeFilter,
  counts,
  dispatch,
}: {
  activeFilter: Filter;
  counts: Record<Filter, number>;
  dispatch: Dispatch<Action>;
}) {
```

### Without Destructuring

```tsx
function FilterBar(props: {
  activeFilter: Filter;
  counts: Record<Filter, number>;
  dispatch: Dispatch<Action>;
}) {
  const activeFilter = props.activeFilter;
  const counts = props.counts;
  const dispatch = props.dispatch;
}
```

### Analysis

The `FilterBar` component receives three props:

- `activeFilter`: the currently selected task filter
- `counts`: the number of tasks in each filter
- `dispatch`: the function that updates application state

Inside the component, `FILTERS.map()` creates buttons for selecting different filters.

The destructured values are used to highlight the active filter, display task counts, and dispatch `setFilter` actions.

### Why Destructuring Helps

The component needs all three properties several times.

Extracting them in the parameter list avoids repeating the `props` prefix throughout the JSX.

### Watch Out

Large destructuring patterns combined with inline TypeScript annotations can become difficult to read.

A separate `FilterBarProps` type could make the function signature shorter.

---

## Case 3 — TaskList Props Destructuring

**File:** `src/App.tsx`  
**Lines:** 102–108  
**Form:** Object destructuring in function parameters (Form 11)

### Original Code

```tsx
function TaskList({
  tasks,
  dispatch,
}: {
  tasks: Task[];
  dispatch: Dispatch<Action>;
}) {
```

### Without Destructuring

```tsx
function TaskList(props: {
  tasks: Task[];
  dispatch: Dispatch<Action>;
}) {
  const tasks = props.tasks;
  const dispatch = props.dispatch;
}
```

### Analysis

The `TaskList` component receives the visible task array and the dispatch function.

It checks whether the task array is empty.

If tasks exist, it uses `tasks.map()` to render a `TaskRow` component for each task.

The `dispatch` function is passed through callbacks that handle advancing or removing tasks.

### Why Destructuring Helps

Both `tasks` and `dispatch` are used repeatedly.

Destructuring makes the JSX code shorter and keeps the component focused on its input values.

### Watch Out

Destructuring the props object does not clone the `tasks` array.

The `tasks` variable still refers to the original array passed to the component.

---

## Case 4 — React useReducer Tuple

**File:** `src/App.tsx`  
**Lines:** 139–142  
**Form:** Array destructuring from a function return value (Form 1)

### Original Code

```tsx
const [state, dispatch] = useReducer(
  taskReducer,
  initialState
);
```

### Without Destructuring

```tsx
const reducerResult = useReducer(
  taskReducer,
  initialState
);

const state = reducerResult[0];
const dispatch = reducerResult[1];
```

### Analysis

React's `useReducer` hook returns a pair containing:

1. The current application state
2. A dispatch function for updating the state

Array destructuring assigns these values to `state` and `dispatch`.

The application uses `state.tasks` and `state.filter` to calculate the visible tasks and filter counts.

### Why Destructuring Helps

The return values have a fixed order.

Array destructuring is the natural and commonly used way to access the two values returned by `useReducer`.

It is shorter and clearer than using numeric indexes.

### Watch Out

Array destructuring depends on position.

Swapping the variable names would not change the order of the returned values.

The first item represents state, and the second represents the dispatch function.

---

## Case 5 — TaskRow Props Destructuring

**File:** `src/TaskRow.tsx`  
**Lines:** 3–12  
**Form:** Object destructuring in React component parameters (Form 11)

### Original Code

```tsx
type TaskRowProps = {
  task: Task;
  onNext: () => void;
  onDelete: () => void;
};

export default function TaskRow({
  task,
  onNext,
  onDelete
}: TaskRowProps) {
  return (
    <li>
      <span>{task.title}</span>
      <em>{task.status}</em>
      <button onClick={onNext}>Next</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
```

The original component also contains inline styling, omitted here to focus on the destructuring behavior.

### Without Destructuring

```tsx
export default function TaskRow(props: TaskRowProps) {
  return (
    <li>
      <span>{props.task.title}</span>
      <em>{props.task.status}</em>
      <button onClick={props.onNext}>Next</button>
      <button onClick={props.onDelete}>Delete</button>
    </li>
  );
}
```

### Analysis

The component receives one task and two callback functions.

Destructuring extracts the three values directly.

The component displays the task title and status, and provides buttons for advancing or deleting the task.

### Why Destructuring Helps

The callback names become easier to use in JSX.

Instead of writing `props.onNext` and `props.onDelete`, the component uses `onNext` and `onDelete` directly.

### Watch Out

Destructuring `task` does not automatically destructure its nested properties.

The component still accesses `task.title` and `task.status`.

---

## When Destructuring Can Make Code Worse

Destructuring is not always the best solution.

Consider this alternative version of `TaskRow`:

```tsx
function TaskRow({
  task: {
    title,
    status
  },
  onNext,
  onDelete
}: TaskRowProps) {
  return (
    <li>
      <span>{title}</span>
      <em>{status}</em>
      <button onClick={onNext}>Next</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
```

This code uses nested destructuring to extract `title` and `status`.

Although the JSX becomes shorter, the function signature becomes more complicated.

It also removes the local `task` variable, which could be useful if the component later needs the complete task object.

In this situation, the original version:

```tsx
function TaskRow({ task, onNext, onDelete }: TaskRowProps)
```

is easier to understand and maintain.

**Conclusion:** Destructuring is helpful when it reduces repetition, but excessive nested destructuring can reduce readability.

---

## Comparison of the Five Cases

| Case | Location | Pattern | Main Benefit |
|---|---|---|---|
| 1 | App.tsx:22 | Function parameter object | Direct access to dispatch |
| 2 | App.tsx:52–60 | Multiple object properties | Shorter filter JSX |
| 3 | App.tsx:102–108 | Function parameter object | Simplifies task rendering |
| 4 | App.tsx:139–142 | Array destructuring | Clean useReducer tuple |
| 5 | TaskRow.tsx:5 | React props destructuring | Shorter callback access |

## What I Learned

Analyzing my previous project helped me understand how frequently destructuring appears in React applications.

I noticed that function parameter destructuring is especially common in components because React passes props as an object.

I also observed that hooks such as `useReducer` use array destructuring because they return values in a fixed order.

The most important lesson was that destructuring should improve readability rather than simply make code shorter.

## References

Source repository:

https://github.com/Damlagnnd/assignment3-task-manager

Files inspected:

- `src/App.tsx`
- `src/TaskRow.tsx`

The file paths and line numbers were verified against the local project files during this assignment.
