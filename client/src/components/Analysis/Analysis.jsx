import { Navigate, useLocation } from "react-router-dom";

import ATSCard from "../components/analysis/ATSCard";
import SummaryCard from "../components/analysis/SummaryCard";
import StrengthCard from "../components/analysis/StrengthCard";
import WeaknessCard from "../components/analysis/WeaknessCard";
import KeywordChips from "../components/analysis/KeywordChips";
import SuggestionCard from "../components/analysis/SuggestionCard";

export default function Analysis() {
  const { state } = useLocation();

  if (!state?.analysis) {
    return <Navigate to="/dashboard" replace />;
  }

  const data = state.analysis.analysis;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold text-center mb-12">
        Resume Analysis Report
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        <ATSCard score={data.atsScore} />

        <SummaryCard summary={data.summary} />

        <StrengthCard strengths={data.strengths} />

        <WeaknessCard weaknesses={data.weaknesses} />

      </div>

      <div className="mt-8">
        <KeywordChips
          keywords={data.missingKeywords}
        />
      </div>

      <div className="mt-8">
        <SuggestionCard
          suggestions={data.suggestions}
        />
      </div>

    </div>
  );
}