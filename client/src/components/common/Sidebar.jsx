import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  NotebookPen,
  Upload,
  FileText,
  Brain,
  BadgeCheck,
  Search,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

const flow = [
  { icon: Upload, text: "Upload Resume" },
  { icon: FileText, text: "Extract Text" },
  { icon: Brain, text: "AI Analysis" },
  { icon: BadgeCheck, text: "ATS Score" },
  { icon: Search, text: "Keyword Detection" },
  { icon: Lightbulb, text: "AI Suggestions" },
  { icon: CheckCircle2, text: "Resume Saved" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-80 min-h-screen bg-slate-900 text-white border-r border-slate-800 shadow-2xl flex flex-col">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-800">

        <h1 className="text-5xl font-black tracking-tight">
          Resume<span className="text-blue-500">IQ</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          AI Powered Resume Analyzer
        </p>

      </div>

      {/* Navigation */}

      <div className="px-5 pt-6 space-y-3">

        <Link
          to="/dashboard"
          className={`flex items-center gap-3 rounded-2xl px-5 py-4 font-semibold transition ${
            location.pathname === "/dashboard"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/notes"
          className={`flex items-center gap-3 rounded-2xl px-5 py-4 font-semibold transition ${
            location.pathname === "/notes"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          <NotebookPen size={20} />
          Notes
        </Link>

      </div>

      <div className="mx-6 mt-8 border-t border-slate-700"></div>

      {/* Resume Flow */}

      <div className="px-6 py-8 flex-1 overflow-y-auto">

        <h3 className="text-sm font-bold uppercase tracking-[3px] text-slate-400 mb-10">

          Resume Analyzer Flow

        </h3>

        {flow.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="relative flex gap-4 pb-8"
            >

              {index !== flow.length - 1 && (
                <div className="absolute left-[21px] top-11 h-full w-[2px] bg-slate-700"></div>
              )}

              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/40">

                <Icon size={18} />

              </div>

              <div>

                <p className="font-medium text-slate-100">

                  {item.text}

                </p>

                <p className="text-xs text-slate-400">

                  Step {index + 1}

                </p>

              </div>

            </div>
          );
        })}

      </div>

    </aside>
  );
}