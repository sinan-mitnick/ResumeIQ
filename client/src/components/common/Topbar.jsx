import { useAuth } from "../../context/authContext";
import { LogOut } from "lucide-react";

export default function Topbar() {

  const { user, logout } = useAuth();

  return (

    <header className="mx-8 mt-6 rounded-3xl bg-white border border-slate-200 shadow-lg px-10 py-6 flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-black text-slate-900">

          Welcome back, {user?.name} 👋

        </h1>

        <p className="text-slate-500 mt-2 text-lg">

          AI Powered Resume Analyzer

        </p>

      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-red-600 transition"
      >

        <LogOut size={18} />

        Logout

      </button>

    </header>

  );
}