import { useEffect, useState } from "react";
import axios from "axios";
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

const API = import.meta.env.VITE_API_URL; // backend URL

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
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    assignee: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  // 🔵 GET – fetch all todos
  useEffect(() => {
    axios
      .get(`${API}/todos`)
      .then((res) => {
        setTasks(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setTasks([]));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🟢 POST + 🟡 PUT
  function submitTask() {
    if (!form.title.trim()) return;

    if (editingId) {
      // PUT – update
      axios.put(`${API}/todos/${editingId}`, form).then((res) => {
        setTasks(tasks.map((t) => (t.id === editingId ? res.data : t)));
        setEditingId(null);
      });
    } else {
      // POST – add
      axios.post(`${API}/todos`, form).then((res) => {
        setTasks([res.data, ...tasks]);
      });
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

  // 🔴 DELETE
  function deleteTask(id) {
    axios.delete(`${API}/todos/${id}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  }

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 Graph data
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const progress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const max = Math.max(pending, progress, completed, 1);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-100 to-cyan-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600">
            <CheckCircle className="text-white" size={16} />
            <span className="text-white font-extrabold">TEKSTRUCTERS</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-blue-900">
            Employee Task Manager
          </h1>
        </div>

        {/* Graph */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
            <BarChart3 /> Task Status Overview
          </h2>
          <div className="grid grid-cols-3 gap-6 items-end h-40">
            <Bar label="Pending" value={pending} max={max} color="bg-slate-400" />
            <Bar label="Progress" value={progress} max={max} color="bg-blue-500" />
            <Bar label="Done" value={completed} max={max} color="bg-emerald-500" />
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <Input icon={Flag} name="title" value={form.title} onChange={handleChange} placeholder="Task title" className="md:col-span-2" />
          <Input icon={User} name="assignee" value={form.assignee} onChange={handleChange} placeholder="Employee" />
          <select name="priority" value={form.priority} onChange={handleChange} className="input">
            {priorities.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select name="status" value={form.status} onChange={handleChange} className="input">
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
          <Input icon={Calendar} type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
          <button onClick={submitTask} className="md:col-span-5 h-11 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2">
            <Plus size={16} />
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="input mb-6"
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 rounded-xl border shadow bg-white">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-blue-900">{task.title}</h3>
                  <p className="text-sm text-blue-600">{task.assignee}</p>
                </div>
                <div className="flex gap-2">
                  <Edit size={16} className="cursor-pointer text-blue-600" onClick={() => editTask(task)} />
                  <Trash2 size={16} className="cursor-pointer text-red-500" onClick={() => deleteTask(task.id)} />
                </div>
              </div>

              <div className="flex gap-2 mt-3 text-xs">
                <span className={`px-2 py-1 rounded-full ${priorityStyle[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 rounded-full ${statusStyle[task.status]}`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <p className="text-center text-blue-700 mt-6">No tasks found</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

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
      <div className={`w-12 rounded-t-lg ${color}`} style={{ height: `${(value / max) * 100}%` }} />
      <p className="mt-2 text-sm font-semibold">{label}</p>
      <p className="text-xs">{value}</p>
    </div>
  );
}
