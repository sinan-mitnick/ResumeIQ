import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import ResumeUpload from "../components/ResumeUpload";
import ResumeHistory from "../components/Dashboard/ResumeHistory";
import StatsCard from "../components/Dashboard/StatsCard";

import { getResumeStats } from "../services/resumeService";

import {
    FiFileText,
    FiAward,
    FiTrendingUp,
    FiClock,
} from "react-icons/fi";

export default function Dashboard() {

    const [stats, setStats] = useState({
        totalResumes: 0,
        highestATS: 0,
        averageATS: 0,
        latestResume: "No Resume",
    });

    useEffect(() => {

        async function loadStats() {

            try {

                const data = await getResumeStats();
                setStats(data.stats);

            } catch (err) {

                console.error(err);

            }

        }

        loadStats();

    }, []);

    return (

        <DashboardLayout>

            <div className="space-y-10">

                {/* Heading */}

                <div>

                    <h1 className="text-4xl font-black text-slate-900">

                        Dashboard

                    </h1>

                    <p className="mt-2 text-lg text-slate-500">

                        Monitor your resume performance and ATS score.

                    </p>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

                    <StatsCard
                        title="Total Resumes"
                        value={stats.totalResumes}
                        icon={FiFileText}
                        color="bg-gradient-to-r from-indigo-500 to-blue-600"
                    />

                    <StatsCard
                        title="Highest ATS"
                        value={`${stats.highestATS}%`}
                        icon={FiAward}
                        color="bg-gradient-to-r from-emerald-500 to-green-600"
                    />

                    <StatsCard
                        title="Average ATS"
                        value={`${stats.averageATS}%`}
                        icon={FiTrendingUp}
                        color="bg-gradient-to-r from-orange-500 to-amber-500"
                    />

                    <StatsCard
                        title="Latest Resume"
                        value={stats.latestResume}
                        icon={FiClock}
                        color="bg-gradient-to-r from-pink-500 to-rose-500"
                    />

                </div>

                {/* Upload Card */}

                <section className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

                    <h2 className="text-2xl font-bold text-slate-900">

                        Upload Resume

                    </h2>

                    <p className="text-slate-500 mt-2 mb-6">

                        Upload a new resume to receive AI analysis,
                        ATS compatibility score and personalized suggestions.

                    </p>

                    <ResumeUpload />

                </section>

                {/* Resume History */}

                <section>

                    <h2 className="text-2xl font-bold text-slate-900 mb-6">

                        Resume History

                    </h2>

                    <ResumeHistory />

                </section>

            </div>

        </DashboardLayout>

    );

}