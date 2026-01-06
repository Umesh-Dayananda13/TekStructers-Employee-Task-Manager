import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  User,
  Calendar,
  Flag,
  Clock,
  BarChart3,
  CheckCircle,
} from "lucide-react";

const priorities = ["Low", "Medium", "High", "Critical"];
const statuses = ["Pending", "In Progress", "Completed"];

const priorityStyle = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

const statusStyle = {
  Pending: "bg-slate-200 text-slate-800",
  "In Progress": "bg-blue-200 text-blue-800",
  Completed: "bg-emerald-200 text-emerald-800",
};

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tekstructers-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    title: "",
    assignee: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tekstructers-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitTask() {
    if (!form.title.trim()) return;

    if (editingId) {
      setTasks(tasks.map(t => (t.id === editingId ? { ...t, ...form } : t)));
      setEditingId(null);
    } else {
      setTasks([{ id: Date.now(), ...form }, ...tasks]);
    }

    setForm({
      title: "",
      assignee: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });
  }

  function editTask(task) {
    setForm(task);
    setEditingId(task.id);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 Graph data
  const pending = tasks.filter(t => t.status === "Pending").length;
  const progress = tasks.filter(t => t.status === "In Progress").length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const max = Math.max(pending, progress, completed, 1);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-100 to-cyan-100 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full bg-blue-600">
            <CheckCircle className="text-white" size={16} />
            <span className="text-white font-extrabold text-base sm:text-lg">
              TEKSTRUCTERS
            </span>
          </div>
          <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
            Employee Task Manager
          </h1>
        </div>

        {/* Graph */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-blue-900 mb-4">
            <BarChart3 /> Task Status Overview
          </h2>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end h-32 sm:h-40">
            <Bar label="Pending" value={pending} max={max} color="bg-slate-400" />
            <Bar label="Progress" value={progress} max={max} color="bg-blue-500" />
            <Bar label="Done" value={completed} max={max} color="bg-emerald-500" />
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Input icon={Flag} placeholder="Task title" name="title" value={form.title} onChange={handleChange} className="md:col-span-2" />
          <Input icon={User} placeholder="Employee" name="assignee" value={form.assignee} onChange={handleChange} />
          <select name="priority" value={form.priority} onChange={handleChange} className="input">
            {priorities.map(p => <option key={p}>{p}</option>)}
          </select>
          <select name="status" value={form.status} onChange={handleChange} className="input">
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <Input icon={Calendar} type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
          <button
            onClick={submitTask}
            className="sm:col-span-2 md:col-span-5 h-11
                       bg-linear-to-r from-blue-600 to-indigo-600
                       text-white rounded-lg flex items-center justify-center gap-2"
          >
            <Plus />
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="input mb-6"
        />

        {/* Task Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className="rounded-xl p-4 bg-linear-to-br from-white to-blue-50
                         border border-blue-200 shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-blue-900 text-sm sm:text-base">
                    {task.title}
                  </h3>
                  <p className="flex items-center gap-1 text-xs sm:text-sm text-blue-600">
                    <User size={14} /> {task.assignee}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editTask(task)} className="text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className={`px-2 py-1 rounded-full ${priorityStyle[task.priority]}`}>
                  <Flag size={12} className="inline mr-1" />
                  {task.priority}
                </span>
                <span className={`px-2 py-1 rounded-full ${statusStyle[task.status]}`}>
                  <Clock size={12} className="inline mr-1" />
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <p className="text-center text-blue-700 mt-6">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className={`relative ${className}`}>
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
      <input {...props} className="input pl-10" />
    </div>
  );
}

function Bar({ label, value, max, color }) {
  return (
    <div className="flex flex-col items-center justify-end h-full">
      <div
        className={`w-8 sm:w-12 md:w-14 rounded-t-lg ${color}`}
        style={{ height: `${(value / max) * 100}%` }}
      />
      <p className="mt-2 text-xs sm:text-sm font-semibold text-blue-900">{label}</p>
      <p className="text-xs text-blue-700">{value}</p>
    </div>
  );
}
