import { useState, useEffect } from "react";

import {
    getMyResumes,
} from "../services/resumeService";

import {
    saveNotes,
    getNotes,
} from "../services/notesService";
import {
  FileText,
  Building2,
  CalendarDays,
  Save,
  Search,
} from "lucide-react";

export default function Notes() {

 const [resumes, setResumes] = useState([]);

const [selectedResume, setSelectedResume] = useState(null);

const [company, setCompany] = useState("");

const [interviewDate, setInterviewDate] = useState("");

const [applicationStatus, setApplicationStatus] =
    useState("Applied");

const [notes, setNotes] = useState("");

const [saving, setSaving] = useState(false);
useEffect(() => {

    async function loadResumes() {

        try {

            const data = await getMyResumes();

            setResumes(data.resumes);

            if (data.resumes.length > 0) {

                setSelectedResume(data.resumes[0]);

            }

        }

        catch (err) {

            console.log(err);

        }

    }

    loadResumes();

}, []);
useEffect(() => {

    if (!selectedResume) return;

    async function loadResumeNotes() {

        try {

            const res = await getNotes(selectedResume.id);

            if (res.notes) {

                setCompany(res.notes.company_name || "");

                setInterviewDate(
                    res.notes.interview_date || ""
                );

                setApplicationStatus(
                    res.notes.application_status || "Applied"
                );

                setNotes(
                    res.notes.notes || ""
                );

            }

            else {

                setCompany("");

                setInterviewDate("");

                setApplicationStatus("Applied");

                setNotes("");

            }

        }

        catch (err) {

            console.log(err);

        }

    }

    loadResumeNotes();

}, [selectedResume]);
const handleSave = async () => {

    if (!selectedResume) return;

    try {

        setSaving(true);

        await saveNotes({

            resumeId: selectedResume.id,

            companyName: company,

            interviewDate,

            applicationStatus,

            notes,

        });

        alert("✅ Notes saved successfully!");

    }

    catch (err) {

        console.log(err);

        alert("Failed to save notes.");

    }

    finally {

        setSaving(false);

    }

};
  return (

    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-black text-slate-900">

            Resume Notes

          </h1>

          <p className="text-slate-500 mt-2">

            Keep track of applications, interviews and personal notes.

          </p>

        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            placeholder="Search Resume..."
            className="pl-11 pr-5 py-3 rounded-xl border border-slate-300 bg-white w-72 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow">

          <h2 className="text-4xl font-black text-blue-600">

            3

          </h2>

          <p className="text-slate-500">

            Uploaded Resumes

          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <h2 className="text-4xl font-black text-green-600">

            2

          </h2>

          <p className="text-slate-500">

            Active Applications

          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <h2 className="text-4xl font-black text-orange-500">

            1

          </h2>

          <p className="text-slate-500">

            Interviews Scheduled

          </p>

        </div>

      </div>

      {/* Workspace */}

      <div className="grid grid-cols-[330px_1fr] gap-8">

        {/* LEFT */}

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">

            Uploaded Resumes

          </h2>

          <div className="space-y-4">

            {resumes.map((resume) => (

              <div
                key={resume.id}
                onClick={() => setSelectedResume(resume)}
                className={`cursor-pointer rounded-2xl border p-5 transition ${
                selectedResume?.id === resume.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-blue-400"
                }`}
              >

                <div className="flex gap-4">

                  <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">

                    <FileText className="text-blue-600" />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">
    {resume.file_name}
</h3>

                    <p className="text-sm text-slate-500 mt-1">

                      ATS Score

                    </p>

                    <span className="font-bold text-blue-600">
    {resume.ats_score}%
</span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT */}

      {selectedResume && (

<div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-3xl font-black">

           {selectedResume.file_name}

          </h2>

          <p className="text-slate-500 mt-2">

            ATS Score :
            <span className="text-blue-600 font-bold">

              {" "}
              {selectedResume.ats_score}%

            </span>

          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div>

              <label className="font-semibold flex items-center gap-2">

                <Building2 size={18} />

                Company Applied

              </label>

              <input
    value={company}
    onChange={(e) => setCompany(e.target.value)}
    placeholder="Google"
    className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
/>
            </div>

            <div>

              <label className="font-semibold flex items-center gap-2">

                <CalendarDays size={18} />

                Interview Date

              </label>

            <input
    type="date"
    value={interviewDate}
    onChange={(e) => setInterviewDate(e.target.value)}
    className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
/>

            </div>

          </div>

          <div className="mt-8">

            <label className="font-semibold">

              Application Status

            </label>

           <select
    value={applicationStatus}
    onChange={(e) => setApplicationStatus(e.target.value)}
    className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
>
              <option>Applied</option>
              <option>Interview Scheduled</option>
              <option>Technical Round</option>
              <option>HR Round</option>
              <option>Offer Received</option>
              <option>Rejected</option>

            </select>

          </div>

          <div className="mt-8">

            <label className="font-semibold">

              Personal Notes

            </label>

            <textarea
    rows={12}
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    placeholder="Write interview notes, reminders, things to improve..."
    className="mt-3 w-full rounded-2xl border border-slate-300 p-5 resize-none"
/>
          </div>

          <div className="flex justify-end mt-8">

           <button
    onClick={handleSave}
    disabled={saving}
    className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white font-semibold shadow-lg hover:scale-105 transition disabled:opacity-60"
>
              <Save size={18} />

{saving ? "Saving..." : "Save Notes"}
            </button>

          </div>

        </div>
      )}
      </div>

    </div>

  );

}