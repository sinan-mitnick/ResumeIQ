import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import FAQ from "../components/landing/FAQ";
import Support from "../components/landing/Support";
import Footer from "../components/landing/Footer";
import ProductPreview from "../components/landing/ProductPreview";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <FAQ />

      <Support />

      <Footer />

    </div>
  );
}