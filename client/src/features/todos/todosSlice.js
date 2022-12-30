import { createSlice } from "@reduxjs/toolkit";
import {
  getTodoAsync,
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
} from "./services";
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter") || "all",
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: state => {
      const filtered = state.items.filter(item => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {
    // Get TODO
    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // Add TODO
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
    },
    // Toggle TODO
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const item = state.items.find(item => item.id === id);
      item.completed = completed;
    },
    // Remove TODO
    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter(item => item.id !== id);
      state.items = filtered;
    },
  },
});
export const selectTodos = state => state.todos.items;
export const selectFilteredTodos = state => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter(item =>
    state.todos.activeFilter === "active"
      ? item.completed === false
      : item.completed === true
  );
};
export const selectActiveFilter = state => state.todos.activeFilter;
export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
