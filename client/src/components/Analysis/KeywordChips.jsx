export default function KeywordChips({ keywords }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        🔍 Missing Keywords
      </h2>

      <div className="flex flex-wrap gap-3">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-full"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}