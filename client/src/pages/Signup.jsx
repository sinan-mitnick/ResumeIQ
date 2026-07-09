import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, UserPlus, Sparkles } from "lucide-react";

import api from "../api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

        const res = await api.post("/auth/register", form);

        navigate("/verify-email", {
            state: {
                email: form.email,
            },
        });

    } catch (err) {

        setError(
            err.response?.data?.message ||
            err.message ||
            "Registration failed"
        );

    } finally {

        setLoading(false);

    }
};
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Background */}

      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-pink-300 blur-[170px] opacity-20"></div>

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-300 blur-[170px] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-200 px-5 py-2 text-blue-700 font-semibold shadow">

              <Sparkles size={18} />

              Join ResumeIQ

            </span>

            <h1 className="mt-8 text-6xl font-black leading-tight text-slate-900">

              Start building resumes
              <br />

              <span className="text-blue-600">
                recruiters notice.
              </span>

            </h1>

            <p className="mt-8 text-xl text-slate-600 leading-9 max-w-xl">

              Upload resumes, improve your ATS score,
              receive AI-powered suggestions,
              and manage every version from one dashboard.

            </p>

            <div className="grid grid-cols-2 gap-5 mt-12">

              {[
                "AI Resume Analysis",
                "ATS Optimization",
                "Keyword Detection",
                "Resume History",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white border border-slate-200 p-5 shadow-lg font-semibold text-slate-700"
                >
                  {item}
                </div>
              ))}

            </div>

          </div>

          {/* Right */}

          <div className="rounded-3xl bg-white border border-slate-200 shadow-2xl p-10">

            <h2 className="text-4xl font-black text-slate-900">

              Create Account

            </h2>

            <p className="text-slate-500 mt-2">

              Join ResumeIQ in less than a minute.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
              />

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

              {error && (
                <p className="text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            <div className="mt-8 border-t pt-6">

              <p className="text-center text-slate-500">

                Already have an account?

              </p>

              <Link
                to="/login"
                className="mt-4 flex items-center justify-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                <ArrowLeft size={18} />

                Back to Login

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}