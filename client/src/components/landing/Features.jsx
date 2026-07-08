import {
  Brain,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    title: "AI Resume Analysis",
    description:
      "ResumeIQ intelligently scans your resume, evaluates every section, and provides actionable recommendations to help you stand out from the competition. Get a complete breakdown of your strengths and improvement areas in seconds.",
    icon: <Brain size={42} />,
    color: "text-purple-600",
    border: "border-purple-500",
    bg: "bg-purple-50",
    image: "/analysis-card.png",
  },
  {
    title: "ATS Compatibility Score",
    description:
      "Discover how Applicant Tracking Systems view your resume. ResumeIQ highlights formatting issues, missing keywords, and optimization opportunities to maximize your chances of getting shortlisted.",
    icon: <ShieldCheck size={42} />,
    color: "text-green-600",
    border: "border-green-500",
    bg: "bg-green-50",
    image: "/ats-card.png",
  },
  {
    title: "Smart Job Matching",
    description:
      "Compare your resume against a specific job description. Instantly identify missing skills, important keywords, and see how well your resume aligns with the role you're targeting.",
    icon: <Target size={42} />,
    color: "text-orange-500",
    border: "border-orange-500",
    bg: "bg-orange-50",
    image: "/jobmatch-card.png",
  },
  {
    title: "Track Your Progress",
    description:
      "Every uploaded resume is securely stored so you can compare versions, monitor ATS improvements, and continuously refine your resume as your career grows.",
    icon: <TrendingUp size={42} />,
    color: "text-blue-600",
    border: "border-blue-500",
    bg: "bg-blue-50",
    image: "/progress-card.png",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-28 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <span className="inline-block rounded-full bg-blue-100 px-6 py-2 text-blue-700 font-semibold tracking-wide">
            WHY RESUMEIQ
          </span>

          <h2 className="mt-6 text-6xl font-black text-slate-900">
            More than an
            <span className="text-blue-600"> ATS </span>
            checker.
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-slate-500">
            ResumeIQ combines Artificial Intelligence, ATS optimization,
            keyword analysis and personalized suggestions into one
            powerful platform.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-slate-50 rounded-[36px] border-l-4 ${feature.border}
              shadow-lg shadow-xl
hover:shadow-[0_30px_60px_rgba(15,23,42,.12)]
              p-10 flex flex-col justify-between min-h-[620px]`}
            >

              <div>

                <div
                  className={`w-20 h-20 rounded-2xl ${feature.bg}
                  flex items-center justify-center ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <h3 className="mt-8 text-3xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-6 text-slate-600 leading-8 text-lg">
                  {feature.description}
                </p>

              </div>

              <div className="mt-10">

                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-2xl shadow-lg border border-slate-200"
                />

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}