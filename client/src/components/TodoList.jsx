import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { destroy, toggle } from "../features/todos/todosSlice";
let filteredItems = [];
const TodoList = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.todos.items);
  const activeFilter = useSelector(state => state.todos.activeFilter);
  const handleDestroy = id => {
    window.confirm("Are you sure you want to delete this item?") &&
      dispatch(destroy(id));
  };
  filteredItems = items;
  if (activeFilter !== "all") {
    filteredItems = items.filter(item =>
      activeFilter === "active"
        ? item.completed === false
        : item.completed === true
    );
  }
  return (
    <ul className="todo-list">
      {filteredItems.map(item => (
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
