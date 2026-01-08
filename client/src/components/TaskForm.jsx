import { Plus, User, Calendar, Flag } from "lucide-react";
import { useEffect, useState } from "react";
import Input from "./Input";

const priorities = ["Low", "Medium", "High", "Critical"];
const statuses = ["Pending", "In Progress", "Completed"];

export default function TaskForm({ onSave, editingTask }) {
  const [form, setForm] = useState({
    title: "",
    assignee: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) setForm(editingTask);
  }, [editingTask]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit() {
    if (!form.title.trim()) return;
    onSave(form);
    setForm({
      title: "",
      assignee: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
      <Input
        icon={Flag}
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        className="md:col-span-2"
      />
      <Input
        icon={User}
        name="assignee"
        placeholder="Employee"
        value={form.assignee}
        onChange={handleChange}
      />
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="input"
      >
        {priorities.map(p => (
          <option key={p}>{p}</option>
        ))}
      </select>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="input"
      >
        {statuses.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <Input
        icon={Calendar}
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <button
        onClick={submit}
        className="md:col-span-5 h-11 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}
