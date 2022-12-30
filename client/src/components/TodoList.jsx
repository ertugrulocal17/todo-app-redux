import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import {
  selectFilteredTodos,
  removeTodoAsync,
  toggleTodoAsync,
  getTodoAsync,
} from "../features/todos/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector(state => state.todos.isLoading);
  const error = useSelector(state => state.todos.error);
  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  const handleDestroy = async id => {
    window.confirm("Are you sure you want to delete this item?") &&
      (await dispatch(removeTodoAsync(id)));
  };

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };
  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <ul className="todo-list">
      {filteredTodos.map(item => (
        <li className={item.completed ? "completed" : "view"} key={item.id}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={item.completed}
              onChange={() => handleToggle(item.id, !item.completed)}
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
