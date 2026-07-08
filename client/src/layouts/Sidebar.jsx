import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUpload, FiFileText, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/authContext";

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-2xl font-bold text-indigo-400">
                    ResumeIQ
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    AI Resume Analyzer
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-2">

                <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
                >
                    <FiHome />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
                >
                    <FiUpload />
                    Upload
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
                >
                    <FiFileText />
                    History
                </NavLink>

            </nav>

            <button
                onClick={handleLogout}
                className="m-4 flex items-center gap-3 rounded-lg bg-red-500 px-4 py-3 hover:bg-red-600 transition"
            >
                <FiLogOut />
                Logout
            </button>

        </aside>
    );
}