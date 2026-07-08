import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Trash2,
  FileText,
  Sparkles,
  Calendar,
} from "lucide-react";

import {
  getMyResumes,
  deleteResume,
} from "../../services/resumeService";

export default function ResumeHistory() {

  const [resumes, setResumes] = useState([]);

  const loadResumes = async () => {

    try {

      const data = await getMyResumes();

      setResumes(data.resumes || []);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadResumes();

  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this resume?")) return;

    try {

      await deleteResume(id);

      loadResumes();

    } catch {

      alert("Failed to delete resume.");

    }

  };

  return (

    <div className="space-y-6">

      {resumes.length === 0 && (

        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-16 text-center">

          <FileText
            className="mx-auto text-slate-400"
            size={60}
          />

          <h2 className="mt-6 text-2xl font-bold">

            No resumes uploaded

          </h2>

          <p className="text-slate-500 mt-2">

            Upload your first resume to begin AI analysis.

          </p>

        </div>

      )}

      {resumes.map((resume) => (

        <div
          key={resume.id}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-7"
        >

          <div className="flex justify-between items-start">

            <div>

              <div className="flex items-center gap-3">

                <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <FileText
                    className="text-blue-600"
                    size={28}
                  />

                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-800">

                    {resume.file_name}

                  </h2>

                  <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">

                    <Calendar size={15} />

                    Uploaded Resume

                  </div>

                </div>

              </div>

            </div>

            <div className="text-right">

              <p className="text-sm text-slate-500">

                ATS Score

              </p>

              <h2 className="text-4xl font-black text-blue-600">

                {resume.ats_score}%

              </h2>

            </div>

          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">

           <div className="rounded-2xl bg-slate-50 p-5">

  <p className="text-sm text-slate-500">
    AI Suggestions
  </p>

  <Link
    to={`/resume/${resume.id}`}
    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-amber-700 font-semibold hover:bg-amber-100 transition"
  >
    <Sparkles
      className="text-amber-500"
      size={18}
    />

    View Detailed Suggestions
  </Link>

</div>
            <div className="rounded-2xl bg-slate-50 p-5">

              <p className="text-sm text-slate-500">

                Resume Status

              </p>

              <span className="inline-flex mt-2 rounded-full bg-green-100 px-4 py-1 text-green-700 font-semibold">

                Analysis Complete

              </span>

            </div>

          </div>

          <div className="mt-8 flex justify-end gap-4">

            <Link
              to={`/resume/${resume.id}`}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >

              <Eye size={18} />

              View Analysis

            </Link>

            <button
              onClick={() => handleDelete(resume.id)}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-white font-semibold hover:bg-red-600 transition"
            >

              <Trash2 size={18} />

              Delete

            </button>

          </div>

        </div>

      ))}

    </div>

  );

}