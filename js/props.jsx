
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - React Props and Children (JavaScript)

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// P1: Props is one object
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

console.log(
  "P1 A:",
  renderToStaticMarkup(<CardA title="Study Plan">React</CardA>)
);
console.log(
  "P1 B:",
  renderToStaticMarkup(<CardB title="Study Plan">React</CardB>)
);

// P2: children is a normal prop
console.log(
  "P2 nested:",
  renderToStaticMarkup(<CardB title="Notes">Hello</CardB>)
);

console.log(
  "P2 attribute:",
  renderToStaticMarkup(<CardB title="Notes" children="Hello" />)
);

// P3: Different children values
function ChildBox({ children }) {
  return <div>{children}</div>;
}

const examples = [
  ["string", "Hello"],
  ["number", 42],
  ["element", <strong>Important</strong>],
  ["multiple", [<span key="a">A</span>, <span key="b">B</span>]],
  ["undefined", undefined],
  ["null", null],
  ["false", false],
];

for (const [label, child] of examples) {
  console.log(
    `P3 ${label}:`,
    renderToStaticMarkup(<ChildBox>{child}</ChildBox>)
  );
}

const renderMessage = () => "Hello from function";

console.log(
  "P3 function value type:",
  typeof renderMessage
);

// React cannot render a function directly as a child.
// The function must be called to produce a renderable value.
console.log(
  "P3 function called:",
  renderToStaticMarkup(<ChildBox>{renderMessage()}</ChildBox>)
);

// P4: Separating props and children with rest
function Panel({ title, children, ...rest }) {
  return (
    <section {...rest}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

console.log(
  "P4 rest:",
  renderToStaticMarkup(
    <Panel title="Tasks" id="task-panel" className="panel">
      Current tasks
    </Panel>
  )
);

// Explicit attributes override a preceding spread.
function ButtonExample(props) {
  return <button {...props} type="button">Save</button>;
}

console.log(
  "P4 override:",
  renderToStaticMarkup(<ButtonExample type="submit" />)
);

// P5: Header and footer as props versus children
function LayoutWithProps({ header, footer, children }) {
  return (
    <article>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </article>
  );
}

function LayoutWithChildren({ children }) {
  return <article>{children}</article>;
}

console.log(
  "P5 props:",
  renderToStaticMarkup(
    <LayoutWithProps header="My Tasks" footer="3 tasks">
      Task list
    </LayoutWithProps>
  )
);

console.log(
  "P5 children:",
  renderToStaticMarkup(
    <LayoutWithChildren>
      <header>My Tasks</header>
      <main>Task list</main>
      <footer>3 tasks</footer>
    </LayoutWithChildren>
  )
);

// P6: Defaults apply to undefined, not null
function StatusBadge({ label = "Pending" }) {
  return <span>{label}</span>;
}

console.log(
  "P6 undefined:",
  renderToStaticMarkup(<StatusBadge label={undefined} />)
);

console.log(
  "P6 null:",
  renderToStaticMarkup(<StatusBadge label={null} />)
);

// P7 is explored in TypeScript because it concerns types.
console.log("P7: See ts/props.tsx for ReactNode and prop types.");
