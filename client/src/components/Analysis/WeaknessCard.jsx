import { TriangleAlert } from "lucide-react";

export default function WeaknessCard({ weaknesses }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        ⚠ Weaknesses
      </h2>

      <div className="space-y-4">
        {weaknesses.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-slate-700 rounded-xl p-4"
          >
            <TriangleAlert
              className="text-yellow-400 mt-1"
              size={20}
            />

            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}