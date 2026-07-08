import { CheckCircle2 } from "lucide-react";

export default function StrengthCard({ strengths }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        💪 Strengths
      </h2>

      <div className="space-y-4">
        {strengths.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-slate-700 rounded-xl p-4"
          >
            <CheckCircle2
              className="text-green-400 mt-1"
              size={20}
            />

            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}