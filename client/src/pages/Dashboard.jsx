import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todoApi";

import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskGraph from "../components/TaskGraph";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTodos().then(res => setTasks(res.data || []));
  }, []);

  const handleSave = (form) => {
    if (editingTask) {
      updateTodo(editingTask.id, form).then(res => {
        setTasks(tasks.map(t => t.id === editingTask.id ? res.data : t));
        setEditingTask(null);
      });
    } else {
      createTodo(form).then(res => setTasks([res.data, ...tasks]));
    }
  };

  const handleDelete = (id) => {
    deleteTodo(id).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-100 to-cyan-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <Header />
        <TaskGraph tasks={tasks} />
        <TaskForm onSave={handleSave} editingTask={editingTask} />
        <input
          className="input mb-6"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
