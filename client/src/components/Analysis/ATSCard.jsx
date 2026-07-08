import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ATSCard({ score }) {
  let color = "#ef4444";

  if (score >= 80) color = "#22c55e";
  else if (score >= 60) color = "#f59e0b";

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">

      <h2 className="text-2xl font-bold mb-6">
        ATS Score
      </h2>

      <div className="w-48 h-48">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: color,
            trailColor: "#334155",
          })}
        />
      </div>

      <p className="mt-6 text-gray-400">
        {score >= 80
          ? "Excellent Resume"
          : score >= 60
          ? "Good Resume"
          : "Needs Improvement"}
      </p>

    </div>
  );
}