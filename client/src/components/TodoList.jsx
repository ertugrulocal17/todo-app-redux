import React from "react";
import { useSelector } from "react-redux";

const TodoList = () => {
  const items = useSelector(state => state.todos.items);
  return (
    <ul className="todo-list">
      {items.map(item => (
        <li className={item.completed ? "completed" : "view"} key={item.id}>
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>{item.title}</label>
            <button className="destroy"></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
