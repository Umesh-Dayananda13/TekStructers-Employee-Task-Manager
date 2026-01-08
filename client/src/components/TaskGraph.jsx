import { BarChart3 } from "lucide-react";
import Bar from "./Bar";

export default function TaskGraph({ tasks }) {
  const pending = tasks.filter(t => t.status === "Pending").length;
  const progress = tasks.filter(t => t.status === "In Progress").length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const max = Math.max(pending, progress, completed, 1);

  return (
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
  );
}
