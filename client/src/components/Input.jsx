export default function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className={`relative ${className}`}>
      <Icon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
        size={16}
      />
      <input {...props} className="input pl-10" />
    </div>
  );
}
