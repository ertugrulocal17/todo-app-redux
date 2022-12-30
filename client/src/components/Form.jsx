import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTodo } from "../features/todos/todosSlice";
const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = e => {
    if (!title) return;
    e.preventDefault();
    dispatch(addTodo({ title }));
    setTitle("");
  };
  return (
    <form
      style={{ display: "flex", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <input
        autoFocus
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {/* {isLoading && <span style={{ paddingRight: 10 }}>Loading...</span>} */}
    </form>
  );
};

export default Form;
