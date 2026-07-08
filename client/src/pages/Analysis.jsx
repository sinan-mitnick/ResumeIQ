import {
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";

import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function Analysis() {

  const { state } = useLocation();

  if (!state?.analysis) {
    return <Navigate to="/dashboard" replace />;
  }

  const data = state.analysis.analysis;

  const score = data.atsScore;

  const scoreColor =
    score >= 80
      ? "text-green-600"
      : score >= 60
      ? "text-yellow-500"
      : "text-red-500";

  const scoreLabel =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Needs Improvement"
      : "Poor";

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">

      <div className="max-w-7xl mx-auto px-8">

        {/* HERO */}

        <div className="bg-white rounded-[32px] shadow-xl border border-slate-200 p-10">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

            <div>

              <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-blue-700 font-semibold">

                AI Resume Analysis

              </span>

              <h1 className="mt-6 text-5xl font-black text-slate-900">

                Resume Analysis Report

              </h1>

              <p className="mt-4 text-lg text-slate-500 max-w-xl">

                ResumeIQ analyzed your resume using AI,
                ATS compatibility checks and keyword
                optimization.

              </p>

            </div>

            <div className="text-center">

              <div className="h-52 w-52 rounded-full border-[14px] border-blue-500 bg-blue-50 flex flex-col items-center justify-center">

                <h2 className={`text-6xl font-black ${scoreColor}`}>

                  {score}%

                </h2>

                <p className="text-slate-600 mt-1">

                  ATS Score

                </p>

              </div>

              <span className="mt-6 inline-block rounded-full bg-slate-100 px-6 py-3 font-semibold">

                {scoreLabel}

              </span>

            </div>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="mt-10 bg-white rounded-[32px] shadow-lg border border-slate-200 p-8">

          <div className="flex items-center gap-3">

            <Sparkles
              className="text-blue-600"
              size={30}
            />

            <h2 className="text-3xl font-bold text-slate-900">

              Professional Summary

            </h2>

          </div>

          <p className="mt-8 text-lg leading-9 text-slate-600">

            {data.summary}

          </p>

        </div>

        {/* STRENGTHS + WEAKNESSES */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Strengths */}

          <div className="bg-white rounded-[32px] shadow-lg border border-green-100 p-8">

            <div className="flex items-center gap-3">

              <CheckCircle2
                className="text-green-600"
                size={30}
              />

              <h2 className="text-3xl font-bold">

                Strengths

              </h2>

            </div>

            <div className="mt-8 space-y-4">

              {data.strengths.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl bg-green-50 border border-green-100 p-5"
                >

                  <p className="leading-7 text-slate-700">

                    {item}

                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Weaknesses */}

          <div className="bg-white rounded-[32px] shadow-lg border border-red-100 p-8">

            <div className="flex items-center gap-3">

              <XCircle
                className="text-red-600"
                size={30}
              />

              <h2 className="text-3xl font-bold">

                Weaknesses

              </h2>

            </div>

            <div className="mt-8 space-y-4">

              {data.weaknesses.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl bg-red-50 border border-red-100 p-5"
                >

                  <p className="leading-7 text-slate-700">

                    {item}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>
                {/* MISSING KEYWORDS */}

        <div className="mt-10 bg-white rounded-[32px] shadow-lg border border-slate-200 p-8">

          <h2 className="text-3xl font-bold text-slate-900">

            Missing Keywords

          </h2>

          <p className="mt-3 text-slate-500">

            Adding these keywords can improve your ATS compatibility.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            {data.missingKeywords.map((item, index) => (

              <span
                key={index}
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-white font-medium shadow-md"
              >

                {item}

              </span>

            ))}

          </div>

        </div>

        {/* AI SUGGESTIONS */}

        <div className="mt-10 bg-white rounded-[32px] shadow-lg border border-slate-200 p-8">

          <h2 className="flex items-center gap-3 text-3xl font-bold">

            <Sparkles
              className="text-yellow-500"
              size={30}
            />

            AI Suggestions

          </h2>

          <div className="mt-10 space-y-6">

            {data.suggestions.map((item, index) => (

              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-7 hover:shadow-lg transition"
              >

                <div className="flex items-start gap-5">

                  <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

                    {index + 1}

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-slate-900">

                      Recommendation {index + 1}

                    </h3>

                    <p className="mt-3 leading-8 text-slate-600">

                      {item.replace(/\*\*/g, "")}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* QUICK SUMMARY */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <h2 className="text-5xl font-black text-blue-600">

              {data.strengths.length}

            </h2>

            <p className="mt-3 text-slate-500">

              Strengths Found

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <h2 className="text-5xl font-black text-red-500">

              {data.weaknesses.length}

            </h2>

            <p className="mt-3 text-slate-500">

              Improvement Areas

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <h2 className="text-5xl font-black text-indigo-600">

              {data.missingKeywords.length}

            </h2>

            <p className="mt-3 text-slate-500">

              Missing Keywords

            </p>

          </div>

        </div>

        {/* ACTION BUTTONS */}

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white hover:bg-black transition"
          >

            <ArrowLeft size={20} />

            Back to Dashboard

          </Link>

          <Link
            to="/dashboard"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-xl hover:scale-105 transition"
          >

            Analyze Another Resume

          </Link>

        </div>

      </div>

    </div>

  );

}