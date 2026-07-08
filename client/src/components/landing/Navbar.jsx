import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">

      <div className="max-w-[1600px] mx-auto h-24 px-12 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="group"
        >
          <h1 className="text-5xl lg:text-6xl font-black tracking-[-0.05em] select-none">

            <span className="text-slate-900 group-hover:text-slate-800 transition">
              Resume
            </span>

            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              IQ
            </span>

          </h1>
        </Link>

        {/* Center Menu */}

        <nav className="hidden md:flex items-center gap-12">

          <a
            href="#features"
            className="relative font-semibold text-slate-600 transition hover:text-blue-600
            after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
            after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Features
          </a>

          <a
            href="#faq"
            className="relative font-semibold text-slate-600 transition hover:text-blue-600
            after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
            after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            FAQ
          </a>

          <a
            href="#support"
            className="relative font-semibold text-slate-600 transition hover:text-blue-600
            after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
            after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Support
          </a>

        </nav>

        {/* Right */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="rounded-xl px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </header>
  );
}