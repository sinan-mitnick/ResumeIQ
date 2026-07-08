import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="text-slate-500">
          AI Powered Resume Analyzer
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    </header>
  );
}