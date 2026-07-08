
export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "bg-indigo-500",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold text-slate-800 mt-2">
          {value}
        </h2>
      </div>

      <div className={`${color} p-4 rounded-xl text-white text-2xl`}>
        <Icon />
      </div>
    </div>
  );
}