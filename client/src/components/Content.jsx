import React from "react";
import ContentFooter from "./ContentFooter";
import TodoList from "./TodoList";

const Content = () => {
  return (
    <>
      <section className="main">
        <input type="checkbox" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all complete</label>
        <TodoList />
      </section>
      <ContentFooter />
    </>
  );
};

export default Content;
