import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTodoAsync } from "../features/todos/todosSlice";
import Error from "./Error";
import Loading from "./Loading";
const Form = () => {
  const [title, setTitle] = useState("");
  const isLoading = useSelector(state => state.todos.addNewTodoIsLoading);
  const error = useSelector(state => state.todos.addNewTodoError);
  const dispatch = useDispatch();
  const handleSubmit = async e => {
    if (!title) return;
    e.preventDefault();

    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  return (
    <form
      style={{ display: "flex", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <input
        disabled={isLoading}
        autoFocus
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
    </form>
  );
};

export default Form;
