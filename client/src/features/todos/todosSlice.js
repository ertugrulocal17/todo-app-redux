import { nanoid, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodoAsync = createAsyncThunk("todos/getTodoAsync", async () => {
  const res = await axios.get("http://localhost:8080/todos");
  return res.data;
});
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        };
      },
    },
    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter(item => item.id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: state => {
      const filtered = state.items.filter(item => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {
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
export const { changeActiveFilter, addTodo, toggle, destroy, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
