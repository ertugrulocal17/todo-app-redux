import React from "react";
const filteredItems = [
  {
    id: 1,
    title: "Item 1",
    completed: false,
  },
  {
    id: 2,
    title: "Item 2",
    completed: false,
  },
  {
    id: 3,
    title: "Item 3",
    completed: false,
  },
];
const TodoList = () => {
  return (
    <ul className="todo-list">
      {filteredItems.map(item => (
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
