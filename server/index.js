require("dotenv").config(); // 🔑 load .env first

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// -----------------------------
// In-memory todo storage
// -----------------------------
let todos = [];
let idCounter = 1;

// -----------------------------
// GET → fetch all todos
// -----------------------------
app.get("/todos", (req, res) => {
  res.json(todos);
});

// -----------------------------
// POST → add new todo
// -----------------------------
app.post("/todos", (req, res) => {
  const todo = {
    id: idCounter++,
    title: req.body.title,
    assignee: req.body.assignee,
    priority: req.body.priority,
    status: req.body.status,
    dueDate: req.body.dueDate,
  };

  todos.unshift(todo);
  res.json(todo);
});

// -----------------------------
// PUT → update existing todo
// -----------------------------
app.put("/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);

  const index = todos.findIndex(t => t.id === todoId);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

// -----------------------------
// DELETE → remove todo
// -----------------------------
app.delete("/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.json({ success: true });
});

// -----------------------------
// ✅ Render-compatible PORT
// -----------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("✅ Backend running on port", PORT);
});
