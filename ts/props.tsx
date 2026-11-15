
 // Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - React Props and Children (TypeScript)

import type {
  ReactNode,
  PropsWithChildren,
  ComponentProps,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";

// P1: Props is one object
type CardProps = {
  title: string;
  children?: ReactNode;
};

function CardA(props: CardProps) {
  return (
    <section>
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
}

function CardB({ title, children }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

console.log(
  "P1 A:",
  renderToStaticMarkup(<CardA title="Study Plan">React</CardA>),
);

console.log(
  "P1 B:",
  renderToStaticMarkup(<CardB title="Study Plan">React</CardB>),
);

// P2: children as a prop
console.log(
  "P2 nested:",
  renderToStaticMarkup(<CardB title="Notes">Hello</CardB>),
);

console.log(
  "P2 attribute:",
  renderToStaticMarkup(<CardB title="Notes" children="Hello" />),
);

// P3: Different values of children
function ChildBox({ children }: { children?: ReactNode }) {
  return <div>{children}</div>;
}

const childExamples: [string, ReactNode][] = [
  ["string", "Hello"],
  ["number", 42],
  ["element", <strong>Important</strong>],
  [
    "multiple",
    [
      <span key="a">A</span>,
      <span key="b">B</span>,
    ],
  ],
  ["undefined", undefined],
  ["null", null],
  ["false", false],
];

for (const [label, child] of childExamples) {
  console.log(
    `P3 ${label}:`,
    renderToStaticMarkup(<ChildBox>{child}</ChildBox>),
  );
}

// A function cannot be directly used as ReactNode.
const messageFunction = (): string => "Hello from function";

console.log(
  "P3 function called:",
  renderToStaticMarkup(
    <ChildBox>{messageFunction()}</ChildBox>,
  ),
);

// P4: Rest props and spreading
type PanelProps = {
  title: string;
  children?: ReactNode;
} & ComponentProps<"section">;

function Panel({ title, children, ...rest }: PanelProps) {
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
    </Panel>,
  ),
);

// Explicit props after a spread override earlier values.
function ButtonExample(props: ComponentProps<"button">) {
  return (
    <button {...props} type="button">
      Save
    </button>
  );
}

console.log(
  "P4 override:",
  renderToStaticMarkup(
    <ButtonExample type="submit" />,
  ),
);

// P5: Named props versus children
type LayoutProps = {
  header: ReactNode;
  footer: ReactNode;
  children?: ReactNode;
};

function LayoutWithProps({
  header,
  footer,
  children,
}: LayoutProps) {
  return (
    <article>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </article>
  );
}

function LayoutWithChildren({
  children,
}: PropsWithChildren) {
  return <article>{children}</article>;
}

console.log(
  "P5 props:",
  renderToStaticMarkup(
    <LayoutWithProps header="My Tasks" footer="3 tasks">
      Task list
    </LayoutWithProps>,
  ),
);

console.log(
  "P5 children:",
  renderToStaticMarkup(
    <LayoutWithChildren>
      <header>My Tasks</header>
      <main>Task list</main>
      <footer>3 tasks</footer>
    </LayoutWithChildren>,
  ),
);

// P6: Defaults and optional props
type BadgeProps = {
  label?: string | null;
};

function StatusBadge({ label = "Pending" }: BadgeProps) {
  return <span>{label}</span>;
}

console.log(
  "P6 undefined:",
  renderToStaticMarkup(
    <StatusBadge label={undefined} />,
  ),
);

console.log(
  "P6 null:",
  renderToStaticMarkup(
    <StatusBadge label={null} />,
  ),
);

// P7: ReactNode, PropsWithChildren and ComponentProps
type ActionButtonProps = ComponentProps<"button"> & {
  label: string;
};

function ActionButton({
  label,
  ...buttonProps
}: ActionButtonProps) {
  return <button {...buttonProps}>{label}</button>;
}

console.log(
  "P7 ComponentProps:",
  renderToStaticMarkup(
    <ActionButton label="Save task" disabled />,
  ),
);

console.log(
  "P7 PropsWithChildren:",
  renderToStaticMarkup(
    <LayoutWithChildren>
      <strong>Task details</strong>
    </LayoutWithChildren>,
  ),
);
