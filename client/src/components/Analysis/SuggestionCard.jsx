import { Lightbulb } from "lucide-react";

export default function SuggestionCard({ suggestions }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        💡 AI Suggestions
      </h2>

      <div className="space-y-4">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 bg-slate-700 rounded-xl p-4"
          >
            <Lightbulb
              className="text-yellow-400 mt-1"
              size={20}
            />

            <p>{item.replace(/\*\*/g, "")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}