import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Support() {
  return (
    <section className="bg-slate-950 text-white py-28">
        <section id="support"></section>
      <div className="max-w-5xl mx-auto text-center px-8">

        <span className="uppercase tracking-[5px] text-blue-400 font-semibold">
          SUPPORT
        </span>

        <h2 className="text-5xl font-black mt-5">
          Need Help?
        </h2>

        <p className="text-slate-400 mt-6 text-xl">
          If you have any questions, suggestions, or encounter any issues,
          feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-20">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-10">

            <Mail className="mx-auto text-blue-400" size={40} />

            <h3 className="mt-6 text-2xl font-bold">
              Email
            </h3>

            <p className="mt-4 text-slate-300">
              sinan191941@gmail.com
            </p>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-10">

            <Phone className="mx-auto text-blue-400" size={40} />

            <h3 className="mt-6 text-2xl font-bold">
              Phone
            </h3>

            <p className="mt-4 text-slate-300">
              +91 9513872451
            </p>

          </div>

        </div>

        <div className="mt-12 flex justify-center items-center gap-3 text-slate-400">

          <MessageCircle size={18} />

          Usually replies within 24 hours.

        </div>

      </div>

    </section>
  );
}