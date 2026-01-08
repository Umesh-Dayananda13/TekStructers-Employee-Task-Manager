import { CheckCircle } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600">
        <CheckCircle className="text-white" size={16} />
        <span className="text-white font-extrabold">TEKSTRUCTERS</span>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-blue-900">
        Employee Task Manager
      </h1>
    </div>
  );
}
