import { ArrowRight } from "lucide-react";

export default function ProductPreview() {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="uppercase tracking-[5px] text-blue-600 font-semibold">
            PRODUCT PREVIEW
          </span>

          <h2 className="text-5xl font-black mt-5 text-slate-900">
            Everything you need,
            <br />
            in one beautiful dashboard.
          </h2>

          <p className="mt-8 text-xl text-slate-500 max-w-3xl mx-auto">
            Upload resumes, receive AI-powered insights,
            improve ATS compatibility and manage every resume
            from one intuitive workspace.
          </p>

        </div>

        <div className="mt-20 rounded-[40px] overflow-hidden shadow-2xl border border-slate-200">

          <img
            src="/dashboard-preview.png"
            alt="ResumeIQ Dashboard"
            className="w-full"
          />

        </div>

        <div className="mt-10 text-center">

          <button className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-white font-semibold transition">

            Explore Dashboard

            <ArrowRight size={20}/>

          </button>

        </div>

      </div>

    </section>
  );
}