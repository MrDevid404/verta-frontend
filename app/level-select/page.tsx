"use client";

import Link from "next/link";
import { useState } from "react";
import { RiBookOpenLine, RiGraduationCapLine } from "react-icons/ri";

type Level = "JSS" | "SSS" | null;

export default function LevelSelectPage() {
  const [selected, setSelected] = useState<Level>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111]">

      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-6 md:px-10 h-[70px] border-b border-[#E8E8E8]">
        <Link href="/" className="font-extrabold text-xl text-[#111] tracking-tight no-underline">
          VERTA
        </Link>
        <Link
          href="/"
          className="text-[#666] text-sm font-medium hover:text-[#111] transition-colors no-underline flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back home
        </Link>
      </nav>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#39D825] flex items-center justify-center text-white text-xs font-bold">1</div>
            <span className="text-[#111] text-sm font-medium">Choose Level</span>
          </div>
          <div className="w-8 h-px bg-[#E8E8E8]" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#F2F2F0] border border-[#E8E8E8] flex items-center justify-center text-[#888] text-xs font-bold">2</div>
            <span className="text-[#888] text-sm font-medium">Take Quiz</span>
          </div>
          <div className="w-8 h-px bg-[#E8E8E8]" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#F2F2F0] border border-[#E8E8E8] flex items-center justify-center text-[#888] text-xs font-bold">3</div>
            <span className="text-[#888] text-sm font-medium">Get Results</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <p className="text-[#39D825] font-semibold text-[13px] uppercase tracking-[2px] mb-4">
            Step 1 of 3
          </p>
          <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold text-[#111] leading-[1.1] tracking-tight mb-4">
            What's your current
            <br />
            <span className="text-[#39D825]">school level?</span>
          </h1>
          <p className="text-[#666] text-base max-w-[420px] mx-auto leading-relaxed">
            This helps us tailor your quiz and recommendations to match exactly
            where you are in your education.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-[640px] mt-12">

          {/* JSS Card */}
          <button
            onClick={() => setSelected("JSS")}
            className={`group relative text-left rounded-2xl p-8 border-2 transition-all duration-200 cursor-pointer bg-transparent outline-none ${
              selected === "JSS"
                ? "border-[#39D825] bg-[#39D825]/5"
                : "border-[#EFEFEF] hover:border-[#39D825]/50 hover:bg-[#F8F8F8]"
            }`}
          >
            {/* Selected indicator */}
            {selected === "JSS" && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#39D825] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
              selected === "JSS" ? "bg-[#39D825]/10 text-[#39D825]" : "bg-[#F2F2F0] text-[#666] group-hover:bg-[#E8E8E8]"
            }`}>
              <RiBookOpenLine size={24} />
            </div>

            <div className={`text-xs font-bold uppercase tracking-[2px] mb-2 ${
              selected === "JSS" ? "text-[#39D825]" : "text-[#888]"
            }`}>
              Junior Secondary
            </div>

            <h2 className="text-[#111] font-extrabold text-2xl mb-3 tracking-tight">
              JSS 1 – 3
            </h2>

            <p className="text-[#666] text-sm leading-relaxed">
              Still exploring subjects and interests? We'll help you discover
              which department fits you — Science, Arts, or Commercial.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Science", "Arts", "Commercial"].map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                    selected === "JSS"
                      ? "bg-[#39D825]/10 text-[#39D825]"
                      : "bg-[#F2F2F0] text-[#666]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>

          {/* SSS Card */}
          <button
            onClick={() => setSelected("SSS")}
            className={`group relative text-left rounded-2xl p-8 border-2 transition-all duration-200 cursor-pointer bg-transparent outline-none ${
              selected === "SSS"
                ? "border-[#39D825] bg-[#39D825]/5"
                : "border-[#EFEFEF] hover:border-[#39D825]/50 hover:bg-[#F8F8F8]"
            }`}
          >
            {selected === "SSS" && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#39D825] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
              selected === "SSS" ? "bg-[#39D825]/10 text-[#39D825]" : "bg-[#F2F2F0] text-[#666] group-hover:bg-[#E8E8E8]"
            }`}>
              <RiGraduationCapLine size={24} />
            </div>

            <div className={`text-xs font-bold uppercase tracking-[2px] mb-2 ${
              selected === "SSS" ? "text-[#39D825]" : "text-[#888]"
            }`}>
              Senior Secondary
            </div>

            <h2 className="text-[#111] font-extrabold text-2xl mb-3 tracking-tight">
              SSS 1 – 3
            </h2>

            <p className="text-[#666] text-sm leading-relaxed">
              Preparing for JAMB and university? We'll match you to specific
              courses with JAMB combos, cutoffs, and career paths.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["JAMB Combos", "Cutoff Scores", "Universities"].map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                    selected === "SSS"
                      ? "bg-[#39D825]/10 text-[#39D825]"
                      : "bg-[#F2F2F0] text-[#666]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          {selected ? (
            <Link
              href={`/quiz?level=${selected}`}
              className="inline-flex items-center gap-0 bg-[#39D825] rounded-full pl-7 pr-[6px] py-[6px] no-underline transition-all hover:bg-[#2fbd1e]"
            >
              <span className="text-white font-bold text-base mr-4">
                Start {selected} Quiz
              </span>
              <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </Link>
          ) : (
            <div className="inline-flex items-center gap-0 bg-[#F2F2F0] rounded-full pl-7 pr-[6px] py-[6px] cursor-not-allowed opacity-60">
              <span className="text-[#999] font-bold text-base mr-4">
                Select a level to continue
              </span>
              <span className="w-11 h-11 rounded-full bg-[#E8E8E8] flex items-center justify-center text-[#999] flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </div>
          )}

          <p className="text-[#888] text-xs">
            Takes about 5 minutes · No account required
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <div className="px-6 md:px-10 py-5 border-t border-[#E8E8E8] flex justify-between items-center flex-wrap gap-3">
        <span className="text-[#888] text-xs">© 2026 Verta</span>
        <span className="text-[#888] text-xs">Free for all Nigerian students</span>
      </div>
    </div>
  );
}
