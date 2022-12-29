import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { destroy, toggle } from "../features/todos/todosSlice";
const TodoList = () => {
  const items = useSelector(state => state.todos.items);
  const dispatch = useDispatch();
  const handleDestroy = id => {
    window.confirm("Are you sure you want to delete this item?") &&
      dispatch(destroy(id));
  };
  return (
    <ul className="todo-list">
      {items.map(item => (
        <li className={item.completed ? "completed" : "view"} key={item.id}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button
              onClick={() => handleDestroy(item.id)}
              className="destroy"
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
