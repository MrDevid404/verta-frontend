"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RiErrorWarningLine } from "react-icons/ri";

// ── Types ────────────────────────────────────────────────────────────────────

interface Option {
  id: number;
  option_text: string;
}

interface Question {
  id: number;
  question_text: string;
  category: string;
  options: Option[];
}

interface Answer {
  question_id: number;
  option_id: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// ── Page Content ─────────────────────────────────────────────────────────────

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = (searchParams.get("level") ?? "JSS") as "JSS" | "SSS";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  // loading states
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch questions ──────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoadingQuestions(true);
        setError(null);
        const res = await fetch(
          `${BASE_URL}/api/aptitude/questions?level=${level}`
        );
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Failed to load questions");
        }
        const data = await res.json();
        setQuestions(data.questions);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Could not load questions"
        );
      } finally {
        setLoadingQuestions(false);
      }
    }
    fetchQuestions();
  }, [level]);

  // Reset selected when question changes
  useEffect(() => {
    const existing = answers.find(
      (a) => questions[current] && a.question_id === questions[current].id
    );
    setSelected(existing?.option_id ?? null);
  }, [current, questions]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleSelect(optionId: number) {
    setSelected(optionId);
  }

  function handleNext() {
    if (selected === null || !questions[current]) return;

    const q = questions[current];
    const updated = [
      ...answers.filter((a) => a.question_id !== q.id),
      { question_id: q.id, option_id: selected },
    ];
    setAnswers(updated);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      submitAnswers(updated);
    }
  }

  function handleBack() {
    if (current > 0) setCurrent(current - 1);
  }

  async function submitAnswers(finalAnswers: Answer[]) {
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch(`${BASE_URL}/api/aptitude/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, answers: finalAnswers }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Submission failed");
      }
      const result = await res.json();
      // Store result in sessionStorage, pass level for context
      sessionStorage.setItem("verta_result", JSON.stringify({ ...result, level }));
      router.push("/results");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
      setSubmitting(false);
    }
  }

  // ── Derived ──────────────────────────────────────────────────────────────

  const progress =
    questions.length > 0
      ? Math.round(((current + 1) / questions.length) * 100)
      : 0;

  const isLastQuestion = current === questions.length - 1;

  // ── Render: loading ──────────────────────────────────────────────────────

  if (loadingQuestions) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <div className="w-10 h-10 rounded-full border-2 border-[#39D825] border-t-transparent animate-spin" />
        <p className="text-[#666] text-sm">Loading your questions…</p>
      </div>
    );
  }

  // ── Render: error fetching questions ─────────────────────────────────────

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6 text-center">
        <RiErrorWarningLine size={48} className="text-yellow-500" />
        <p className="text-[#111] font-semibold text-lg">{error}</p>
        <p className="text-[#666] text-sm">
          Make sure the backend is running at{" "}
          <span className="text-[#39D825]">{BASE_URL}</span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-[#39D825] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#2fbd1e] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = questions[current];

  // ── Render: submitting ───────────────────────────────────────────────────

  if (submitting) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#39D825] border-t-transparent animate-spin" />
        <p className="text-[#111] font-semibold text-lg">Analysing your answers…</p>
        <p className="text-[#666] text-sm max-w-[320px]">
          Our algorithm is finding your best academic match. This takes a few seconds.
        </p>
      </div>
    );
  }

  // ── Render: quiz ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111]">

      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-6 md:px-10 h-[70px] border-b border-[#E8E8E8] flex-shrink-0">
        <Link
          href="/"
          className="font-extrabold text-xl text-[#111] tracking-tight no-underline"
        >
          VERTA
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[#666] text-sm">
            {level} Quiz
          </span>
          <span className="w-px h-4 bg-[#E8E8E8]" />
          <span className="text-[#39D825] text-sm font-medium">
            {current + 1} / {questions.length}
          </span>
        </div>
        <Link
          href="/level-select"
          className="text-[#666] text-sm hover:text-[#111] transition-colors no-underline"
        >
          Exit
        </Link>
      </nav>

      {/* ── PROGRESS BAR ── */}
      <div className="w-full h-1 bg-[#F2F2F0] flex-shrink-0">
        <div
          className="h-full bg-[#39D825] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[680px]">

          {/* Category badge */}
          <div className="mb-6">
            <span className="text-[#39D825] text-xs font-bold uppercase tracking-[2px]">
              {q.category}
            </span>
          </div>

          {/* Question */}
          <h1 className="text-[#111] font-extrabold text-[clamp(22px,4vw,36px)] leading-[1.2] tracking-tight mb-10">
            {q.question_text}
          </h1>

          {/* Options */}
          <div className="flex flex-col gap-4">
            {q.options.map((opt, i) => {
              const isSelected = selected === opt.id;
              const letters = ["A", "B", "C", "D"];
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full text-left rounded-2xl p-5 border-2 transition-all duration-150 outline-none flex items-center gap-4 cursor-pointer ${
                    isSelected
                      ? "border-[#39D825] bg-[#39D825]/5"
                      : "border-[#EFEFEF] bg-[#F8F8F8] hover:border-[#39D825]/40 hover:bg-[#F2FFF0]/25"
                  }`}
                >
                  {/* Letter badge */}
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#39D825] text-white"
                        : "bg-[#E8E8E8] text-[#666]"
                    }`}
                  >
                    {letters[i] ?? i + 1}
                  </span>
                  <span
                    className={`text-base font-medium leading-snug transition-colors ${
                      isSelected ? "text-[#111] font-semibold" : "text-[#444]"
                    }`}
                  >
                    {opt.option_text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Submission error */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-10">
            {/* Back */}
            <button
              onClick={handleBack}
              disabled={current === 0}
              className={`flex items-center gap-2 font-semibold text-sm px-5 py-3 rounded-full border transition-all ${
                current === 0
                  ? "border-[#F2F2F0] text-[#ccc] cursor-not-allowed"
                  : "border-[#E8E8E8] text-[#666] hover:border-[#111]/30 hover:text-[#111]"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Previous
            </button>

            {/* Next / Submit */}
            <button
              onClick={handleNext}
              disabled={selected === null}
              className={`inline-flex items-center gap-0 rounded-full pl-6 pr-[6px] py-[6px] transition-all font-sans ${
                selected !== null
                  ? "bg-[#39D825] cursor-pointer hover:bg-[#2fbd1e]"
                  : "bg-[#F2F2F0] cursor-not-allowed opacity-50"
              }`}
            >
              <span className={`font-bold text-sm mr-3 ${selected !== null ? "text-white" : "text-[#999]"}`}>
                {isLastQuestion ? "See My Results" : "Next Question"}
              </span>
              <span className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${selected !== null ? "bg-white text-black" : "bg-[#E8E8E8] text-[#999]"}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-[6px] mt-10 flex-wrap">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 h-2 bg-[#39D825]"
                    : answers.find((a) => a.question_id === questions[i]?.id)
                    ? "w-2 h-2 bg-[#39D825]/40"
                    : "w-2 h-2 bg-[#E8E8E8]"
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <div className="w-10 h-10 rounded-full border-2 border-[#39D825] border-t-transparent animate-spin" />
        <p className="text-[#666] text-sm">Loading your questions…</p>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}