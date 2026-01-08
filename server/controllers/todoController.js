let todos = [];
let idCounter = 1;

// GET
exports.getTodos = (req, res) => {
  res.json(todos);
};

// POST
exports.createTodo = (req, res) => {
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
};

// PUT
exports.updateTodo = (req, res) => {
  const todoId = Number(req.params.id);
  const index = todos.findIndex(t => t.id === todoId);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
};

// DELETE
exports.deleteTodo = (req, res) => {
  const todoId = Number(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.json({ success: true });
};
