export default function SummaryCard({ summary }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">

      <h2 className="text-2xl font-bold mb-5">
        Professional Summary
      </h2>

      <p className="text-gray-300 leading-8">
        {summary}
      </p>

    </div>
  );
}