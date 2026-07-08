import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ResumeUpload() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUpload = async () => {

    if (!file) {
        alert("Please select a PDF.");
        return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("resume", file);

    try {

        setLoading(true);

        const token = localStorage.getItem("token");

const res = await api.post(
    "/resume/upload",
    formData,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    }
);
        navigate("/analysis", {
            state: {
                analysis: res.data,
            },
        });

    } catch (err) {

        console.log("FULL ERROR:", err);
        console.log("RESPONSE:", err.response);
        console.log("DATA:", err.response?.data);
        console.log("STATUS:", err.response?.status);

        alert(
            err.response?.data?.message ||
            "Upload failed"
        );

    } finally {

        setLoading(false);

    }

};

    return (

        <div className="rounded-3xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-12">

            <div className="flex flex-col items-center">

                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">

                    <UploadCloud
                        size={42}
                        className="text-white"
                    />

                </div>

                <h2 className="mt-6 text-3xl font-black text-slate-900">

                    Upload Your Resume

                </h2>

                <p className="mt-3 max-w-xl text-center text-slate-500 leading-7">

                    Upload your PDF resume and let ResumeIQ analyze
                    your ATS score, missing keywords and AI suggestions.

                </p>

                <label className="mt-8 cursor-pointer">

                    <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) =>
                            setFile(e.target.files[0])
                        }
                    />

                    <div className="rounded-2xl bg-white border border-slate-300 px-8 py-4 font-semibold shadow hover:border-blue-500 hover:shadow-lg transition">

                        Choose Resume

                    </div>

                </label>

                {file && (

                    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white border border-green-200 px-6 py-4 shadow">

                        <FileText className="text-blue-600" />

                        <div>

                            <p className="font-semibold">

                                {file.name}

                            </p>

                            <p className="text-sm text-slate-500">

                                Ready for analysis

                            </p>

                        </div>

                    </div>

                )}

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4 text-white font-semibold shadow-xl hover:scale-105 transition disabled:opacity-50"
                >

                    {loading
                        ? "Analyzing Resume..."
                        : "Analyze Resume"}

                </button>

            </div>

        </div>

    );

}