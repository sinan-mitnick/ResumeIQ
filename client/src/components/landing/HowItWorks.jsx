import {
  UploadCloud,
  BrainCircuit,
  BarChart3,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "Upload Resume",
    description:
      "Upload your resume securely in PDF format within seconds.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "ResumeIQ analyzes your resume using AI and ATS standards.",
  },
  {
    icon: BarChart3,
    title: "ATS Score",
    description:
      "Receive your ATS score along with missing keywords and insights.",
  },
  {
    icon: Rocket,
    title: "Improve & Apply",
    description:
      "Optimize your resume and confidently apply for your dream job.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">
          <span className="text-blue-600 font-semibold uppercase tracking-[5px]">
            HOW IT WORKS
          </span>

          <h2 className="mt-4 text-5xl font-black text-slate-900">
            Your Resume.
            <span className="text-blue-600"> Smarter.</span>
          </h2>

          <p className="mt-6 text-slate-500 text-xl max-w-3xl mx-auto">
            ResumeIQ transforms your resume into an ATS-friendly,
            recruiter-ready document in just four simple steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-slate-500 leading-8">
                  {step.description}
                </p>

                <div className="mt-8 text-6xl font-black text-slate-100">
                  0{index + 1}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}