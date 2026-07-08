import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[88vh] flex items-center">

            {/* Background Blobs */}

            <div className="absolute -top-40 right-0 h-[700px] w-[700px] rounded-full bg-blue-300 blur-[220px] opacity-20"></div>

            <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-violet-300 blur-[200px] opacity-15"></div>

            <div className="relative max-w-[1500px] mx-auto w-full px-12 grid lg:grid-cols-[46%_54%] gap-20 items-center">

                {/* LEFT */}

                <div className="max-w-2xl">

                    <span className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-200 px-5 py-2 text-sm font-semibold text-blue-700 shadow-md">

                        ✨ Trusted AI Resume Analyzer

                    </span>

                    <h1 className="mt-8 text-7xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.95] text-slate-900">

                        Build resumes

                        <br />

                        recruiters

                        <br />

                        <span className="text-blue-600">

                            actually notice.

                        </span>

                    </h1>

                    <p className="mt-10 max-w-xl text-xl leading-10 text-slate-600">

                        Improve your ATS score, discover missing keywords,
                        receive AI-powered feedback, and create resumes that
                        recruiters actually want to read.

                    </p>

                    <div className="mt-12 flex items-center gap-5">

                        <Link
                            to="/login"
                            className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105"
                        >
                            Create Account
                            <ArrowRight size={18} />
                        </Link>

                    </div>

                    <div className="mt-12 flex flex-wrap gap-8 text-slate-700 font-medium">

                        <div className="flex items-center gap-2">
                            <ShieldCheck size={18} className="text-blue-600" />
                            ATS Optimized
                        </div>

                        <div className="flex items-center gap-2">
                            <ShieldCheck size={18} className="text-blue-600" />
                            AI Powered
                        </div>

                        <div className="flex items-center gap-2">
                            <ShieldCheck size={18} className="text-blue-600" />
                            Secure Resume Storage
                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="relative flex justify-center">

                    <div className="absolute w-[760px] h-[500px] rounded-full bg-blue-300 blur-[160px] opacity-20"></div>

                    <div className="relative rotate-[-1deg] overflow-hidden rounded-[38px] border border-white/70 bg-white shadow-[0_35px_90px_rgba(15,23,42,.18)] transition-all duration-500 hover:rotate-0 hover:scale-[1.02]">

                        <div className="flex gap-2 border-b border-slate-200 bg-slate-100 px-6 py-4">

                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>

                        </div>

                        <img
                            src="/dashboard-preview.png"
                            alt="ResumeIQ Dashboard"
                            className="w-[760px] object-cover"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}