import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { nanoid } from "nanoid";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json());
const todos = [
  { id: nanoid(), title: "Learn React", completed: true },
  { id: nanoid(), title: "Learn Redux", completed: false },
  { id: nanoid(), title: "Learn Redux Toolkit", completed: false },
  { id: nanoid(), title: "Learn Express", completed: false },
  { id: nanoid(), title: "Learn Node", completed: false },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todos = { title: req.body.title, completed: false, id: nanoid() };
  todos.push(todos);
  return res.send(todos);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(todo => todo.id === id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(todo => todo.id === id);
  if (index > -1) {
    todos.splice(index, 1);
  }
  return res.send(todos);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
