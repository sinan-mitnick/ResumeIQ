import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Lock, UserPlus } from "lucide-react";

import api from "../api/api";
import { useAuth } from "../context/authContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await api.post("/auth/login", form);

            login(res.data.user, res.data.token);

            navigate("/dashboard");

        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

            {/* Background */}

            <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-pink-300 blur-[170px] opacity-20"></div>

            <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-blue-300 blur-[170px] opacity-20"></div>

            <div className="max-w-7xl mx-auto px-8 py-20 relative">

                {/* Welcome */}

                <div className="text-center mb-16">

                    <h1 className="text-6xl font-black text-slate-900">
                        Welcome Back
                    </h1>

                    <p className="mt-4 text-slate-600 text-xl">
                        Continue building resumes recruiters actually notice.
                    </p>

                </div>

                {/* Login + Signup */}

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Login */}

                    <div className="rounded-3xl bg-white p-10 shadow-2xl border border-slate-200">

                        <div className="flex items-center gap-4">

                            <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                                <Lock className="text-blue-600" />

                            </div>

                            <div>

                                <h2 className="text-3xl font-bold">
                                    Login
                                </h2>

                                <p className="text-slate-500">
                                    Access your dashboard
                                </p>

                            </div>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
                            />

                            <input
    type="password"
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
/>

<div className="flex justify-end -mt-2">
    <Link
        to="/forgot-password"
        className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
    >
        Forgot Password?
    </Link>
</div>

{error && (
    <p className="text-red-600">
        {error}
    </p>
)}

                            <button
                                disabled={loading}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-white font-semibold hover:scale-[1.02] transition"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                        </form>

                    </div>

                    {/* Signup */}

                    <Link
                        to="/signup"
                        className="group rounded-3xl bg-white border border-slate-200 p-10 shadow-2xl hover:-translate-y-2 transition-all"
                    >

                        <div className="flex items-center gap-4">

                            <div className="h-14 w-14 rounded-2xl bg-violet-100 flex items-center justify-center">

                                <UserPlus className="text-violet-600" />

                            </div>

                            <div>

                                <h2 className="text-3xl font-bold">
                                    Create Account
                                </h2>

                                <p className="text-slate-500">
                                    New to ResumeIQ?
                                </p>

                            </div>

                        </div>

                        <p className="mt-10 text-lg text-slate-600 leading-8">

                            Create your account to upload resumes,
                            receive AI-powered feedback, improve your ATS
                            score, and track every version from one place.

                        </p>

                        <div className="mt-12 flex items-center text-blue-600 font-semibold">

                            Get Started

                            <ArrowRight className="ml-2 group-hover:translate-x-2 transition" />

                        </div>

                    </Link>

                </div>

                {/* ATS Section */}

                <div className="mt-24">

                    <h2 className="text-5xl font-black text-center text-slate-900">

                        Why should your resume be ATS friendly?

                    </h2>

                    <p className="text-center text-slate-600 mt-4 text-lg">

                        More than 90% of companies use Applicant Tracking Systems before a recruiter even sees your resume.

                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-14">

                        {[
                            {
                                title: "AI Resume Analysis",
                                desc: "Receive detailed AI-powered suggestions to improve every section of your resume.",
                            },
                            {
                                title: "ATS Compatibility",
                                desc: "Optimize formatting, keywords, and structure to pass Applicant Tracking Systems.",
                            },
                            {
                                title: "Keyword Detection",
                                desc: "Discover missing keywords recruiters expect to see.",
                            },
                            {
                                title: "Track Progress",
                                desc: "Store multiple resume versions and monitor your ATS score over time.",
                            },
                        ].map((item) => (

                            <div
                                key={item.title}
                                className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200"
                            >

                                <h3 className="text-2xl font-bold">

                                    {item.title}

                                </h3>

                                <p className="mt-4 text-slate-600 leading-8">

                                    {item.desc}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}