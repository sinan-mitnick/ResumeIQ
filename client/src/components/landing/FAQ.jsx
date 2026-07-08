import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is ResumeIQ free to use?",
    answer:
      "Yes. ResumeIQ allows you to analyze your resume and receive AI-powered feedback for free.",
  },
  {
    question: "How is the ATS Score calculated?",
    answer:
      "Our AI evaluates formatting, keyword optimization, readability, and resume structure to estimate ATS compatibility.",
  },
  {
    question: "Is my resume stored securely?",
    answer:
      "Absolutely. Your uploaded resumes are securely stored and only accessible by your account.",
  },
  {
    question: "Can I delete my uploaded resumes?",
    answer:
      "Yes. You can delete any uploaded resume permanently from your dashboard.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
id="faq"
className="bg-slate-50 py-28"
>
      <div className="max-w-4xl mx-auto px-8">

        <div className="text-center mb-20">

          <span className="uppercase tracking-[5px] text-blue-600 font-semibold">
            FAQ
          </span>

          <h2 className="text-5xl font-black mt-4 text-slate-900">
            Frequently Asked Questions
          </h2>

        </div>

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="mb-5 rounded-3xl border border-slate-200 overflow-hidden"
          >

            <button
              onClick={() => setOpen(open === index ? -1 : index)}
              className="w-full flex justify-between items-center p-8 text-left"
            >

              <span className="text-xl font-semibold text-slate-900">
                {faq.question}
              </span>

              <ChevronDown
                className={`transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />

            </button>

            {open === index && (

              <div className="px-8 pb-8 text-slate-500 leading-8">

                {faq.answer}

              </div>

            )}

          </div>

        ))}

      </div>

    </section>
  );
}