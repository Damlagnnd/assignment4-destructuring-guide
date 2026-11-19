
// Full name: Damla Günendi
// Student number: 2200004319
// Assignment 4 - React Props and Children Tests

import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const h = React.createElement;

// Test 1: Props object
test("props object renders title and children", () => {
  function Card(props) {
    return h(
      "section",
      null,
      h("h2", null, props.title),
      props.children
    );
  }

  const html = renderToStaticMarkup(
    h(Card, { title: "Tasks" }, "Hello")
  );

  assert.equal(
    html,
    "<section><h2>Tasks</h2>Hello</section>"
  );
});

// Test 2: Destructured props
test("destructured props produce the same HTML", () => {
  function Card({ title, children }) {
    return h(
      "section",
      null,
      h("h2", null, title),
      children
    );
  }

  const html = renderToStaticMarkup(
    h(Card, { title: "Tasks" }, "Hello")
  );

  assert.equal(
    html,
    "<section><h2>Tasks</h2>Hello</section>"
  );
});

// Test 3: Children as an explicit prop
test("children can be passed as a prop", () => {
  function Box({ children }) {
    return h("div", null, children);
  }

  const html = renderToStaticMarkup(
    h(Box, { children: "Hello" })
  );

  assert.equal(html, "<div>Hello</div>");
});

// Test 4: Number child
test("number children render as text", () => {
  assert.equal(
    renderToStaticMarkup(h("div", null, 42)),
    "<div>42</div>"
  );
});

// Test 5: Null and undefined
test("null and undefined children render nothing", () => {
  assert.equal(
    renderToStaticMarkup(h("div", null, null)),
    "<div></div>"
  );

  assert.equal(
    renderToStaticMarkup(h("div", null, undefined)),
    "<div></div>"
  );
});

// Test 6: False child
test("false children render nothing", () => {
  assert.equal(
    renderToStaticMarkup(h("div", null, false)),
    "<div></div>"
  );
});

// Test 7: Multiple elements
test("multiple children render in order", () => {
  const html = renderToStaticMarkup(
    h(
      "div",
      null,
      h("span", null, "A"),
      h("span", null, "B")
    )
  );

  assert.equal(
    html,
    "<div><span>A</span><span>B</span></div>"
  );
});

// Test 8: Rest props
test("rest props are forwarded to HTML elements", () => {
  function Panel({ title, children, ...rest }) {
    return h(
      "section",
      rest,
      h("h3", null, title),
      children
    );
  }

  const html = renderToStaticMarkup(
    h(
      Panel,
      { title: "Tasks", id: "panel" },
      "Content"
    )
  );

  assert.equal(
    html,
    '<section id="panel"><h3>Tasks</h3>Content</section>'
  );
});

// Test 9: Spread override order
test("later props override earlier props", () => {
  function Button(props) {
    return h(
      "button",
      { ...props, type: "button" },
      "Save"
    );
  }

  const html = renderToStaticMarkup(
    h(Button, { type: "submit" })
  );

  assert.equal(html, '<button type="button">Save</button>');
});

// Test 10: Default props
test("default applies to undefined but not null", () => {
  function Badge({ label = "Pending" }) {
    return h("span", null, label);
  }

  assert.equal(
    renderToStaticMarkup(h(Badge, { label: undefined })),
    "<span>Pending</span>"
  );

  assert.equal(
    renderToStaticMarkup(h(Badge, { label: null })),
    "<span></span>"
  );
});
