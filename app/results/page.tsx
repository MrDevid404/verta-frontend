"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiFlaskLine, RiPaletteLine, RiBarChartLine, RiGraduationCapLine } from "react-icons/ri";

// ── Types ────────────────────────────────────────────────────────────────────

interface JSSResult {
  level: "JSS";
  recommended_department: string;
  scores: Record<string, string>;
  message: string;
}

interface JSSTieResult {
  level: "JSS";
  recommended_department: null;
  tied_departments: string[];
  scores: Record<string, string>;
  message: string;
}

interface SSSMatch {
  course_id: number;
  course_name: string;
}

interface SSSResult {
  level: "SSS";
  top_matches: SSSMatch[];
  message: string;
}

type AptitudeResult = JSSResult | JSSTieResult | SSSResult;

// ── Helpers ──────────────────────────────────────────────────────────────────

const DEPT_META: Record<string, { icon: React.ReactNode; color: string; desc: string }> = {
  Science: {
    icon: <RiFlaskLine size={28} />,
    color: "#39D825",
    desc: "You have a strong analytical mind. You'll thrive in Medicine, Engineering, Computer Science, and other science-based courses.",
  },
  Arts: {
    icon: <RiPaletteLine size={28} />,
    color: "#a855f7",
    desc: "You're creative and expressive. Law, Mass Communication, English, Theatre Arts, and History are great fits for you.",
  },
  Commercial: {
    icon: <RiBarChartLine size={28} />,
    color: "#f59e0b",
    desc: "You have a head for numbers and business. Accounting, Economics, Banking & Finance, and Marketing suit you well.",
  },
};

function ArrowIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ScoreBar({ label, value, color }: { label: string; value: string; color: string }) {
  const pct = parseFloat(value);
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#666] text-sm font-medium">{label}</span>
        <span className="text-[#111] text-sm font-bold">{pct.toFixed(0)}%</span>
      </div>
      <div className="w-full h-2 bg-[#F2F2F0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ── JSS Clear Winner ─────────────────────────────────────────────────────────

function JSSWinner({ result }: { result: JSSResult }) {
  const meta = DEPT_META[result.recommended_department] ?? {
    icon: <RiGraduationCapLine size={28} />,
    color: "#39D825",
    desc: "",
  };

  return (
    <div className="w-full max-w-[640px] mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[#39D825] font-semibold text-[13px] uppercase tracking-[2px] mb-4">
          Your Result
        </p>
        <h1 className="text-[#111] font-extrabold text-[clamp(28px,5vw,48px)] leading-[1.1] tracking-tight mb-4">
          You're a perfect fit for
          <br />
          <span style={{ color: meta.color }}>{result.recommended_department}</span>
        </h1>
        <p className="text-[#666] text-base leading-relaxed max-w-[480px] mx-auto">
          {meta.desc}
        </p>
      </div>

      {/* Department card */}
      <div
        className="rounded-2xl p-8 mb-6 border"
        style={{
          background: `${meta.color}08`,
          borderColor: `${meta.color}25`,
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `${meta.color}15`, color: meta.color }}
          >
            {meta.icon}
          </div>
          <div>
            <div className="text-[#666] text-xs font-bold uppercase tracking-[2px] mb-1">
              Recommended Department
            </div>
            <div className="text-[#111] font-extrabold text-2xl tracking-tight">
              {result.recommended_department}
            </div>
          </div>
        </div>
        <p className="text-[#444] text-sm leading-relaxed border-t border-[#EFEFEF] pt-5">
          {result.message}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="bg-[#F8F8F8] rounded-2xl p-6 border border-[#EFEFEF] mb-8">
        <p className="text-[#888] text-xs font-bold uppercase tracking-[2px] mb-5">
          Score Breakdown
        </p>
        {Object.entries(result.scores).map(([dept, score]) => (
          <ScoreBar
            key={dept}
            label={dept}
            value={score}
            color={DEPT_META[dept]?.color ?? "#39D825"}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/chat"
          className="flex-1 inline-flex items-center justify-center gap-3 bg-[#39D825] rounded-full py-4 px-6 no-underline hover:bg-[#2fbd1e] transition-colors"
        >
          <span className="text-white font-bold text-base">Ask Olu About This</span>
          <ArrowIcon color="white" />
        </Link>
        <Link
          href="/level-select"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-[#E8E8E8] rounded-full py-4 px-6 no-underline hover:border-[#111]/30 hover:text-[#111] transition-colors"
        >
          <span className="text-[#666] font-semibold text-base">Retake Quiz</span>
        </Link>
      </div>
    </div>
  );
}

// ── JSS Tie ──────────────────────────────────────────────────────────────────

function JSSTie({ result }: { result: JSSTieResult }) {
  return (
    <div className="w-full max-w-[640px] mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[#f59e0b] font-semibold text-[13px] uppercase tracking-[2px] mb-4">
          It's a Tie!
        </p>
        <h1 className="text-[#111] font-extrabold text-[clamp(28px,5vw,48px)] leading-[1.1] tracking-tight mb-4">
          You scored equally in
          <br />
          <span className="text-[#f59e0b]">
            {result.tied_departments.join(" & ")}
          </span>
        </h1>
        <p className="text-[#666] text-base leading-relaxed max-w-[420px] mx-auto">
          {result.message}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="bg-[#F8F8F8] rounded-2xl p-6 border border-[#EFEFEF] mb-8">
        <p className="text-[#888] text-xs font-bold uppercase tracking-[2px] mb-5">
          Score Breakdown
        </p>
        {Object.entries(result.scores).map(([dept, score]) => (
          <ScoreBar
            key={dept}
            label={dept}
            value={score}
            color={DEPT_META[dept]?.color ?? "#39D825"}
          />
        ))}
      </div>

      {/* Pick one */}
      <p className="text-[#666] text-sm text-center mb-5">
        Which of these interests you more? Pick one to explore.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {result.tied_departments.map((dept) => {
          const meta = DEPT_META[dept] ?? { icon: <RiGraduationCapLine size={28} />, color: "#39D825", desc: "" };
          return (
            <Link
              key={dept}
              href="/chat"
              className="group rounded-2xl p-6 border-2 no-underline transition-all hover:-translate-y-1 hover:shadow-sm"
              style={{
                borderColor: `${meta.color}25`,
                background: `${meta.color}05`,
              }}
            >
              <div className="mb-3" style={{ color: meta.color }}>{meta.icon}</div>
              <div className="text-[#111] font-extrabold text-xl mb-2">{dept}</div>
              <p className="text-[#666] text-sm leading-relaxed line-clamp-2">{meta.desc}</p>
              <div className="mt-4 flex items-center gap-2" style={{ color: meta.color }}>
                <span className="text-sm font-semibold">Explore {dept}</span>
                <ArrowIcon color={meta.color} />
              </div>
            </Link>
          );
        })}
      </div>

      <Link
        href="/level-select"
        className="w-full inline-flex items-center justify-center border border-[#E8E8E8] rounded-full py-4 px-6 no-underline hover:border-[#111]/30 hover:text-[#111] transition-colors"
      >
        <span className="text-[#666] font-semibold text-base">Retake Quiz</span>
      </Link>
    </div>
  );
}

// ── SSS Results ──────────────────────────────────────────────────────────────

const MATCH_LABELS = ["Best Match", "Strong Match", "Good Match"];
const MATCH_COLORS = ["#39D825", "#a855f7", "#f59e0b"];

function SSSMatches({ result }: { result: SSSResult }) {
  return (
    <div className="w-full max-w-[720px] mx-auto">
      <div className="text-center mb-10">
        <p className="text-[#39D825] font-semibold text-[13px] uppercase tracking-[2px] mb-4">
          Your Top Matches
        </p>
        <h1 className="text-[#111] font-extrabold text-[clamp(28px,5vw,48px)] leading-[1.1] tracking-tight mb-4">
          Here are your
          <br />
          <span className="text-[#39D825]">top 3 course matches</span>
        </h1>
        <p className="text-[#666] text-base leading-relaxed max-w-[460px] mx-auto">
          {result.message}
        </p>
      </div>

      <div className="flex flex-col gap-5 mb-8">
        {result.top_matches.map((match, i) => {
          const color = MATCH_COLORS[i] ?? "#39D825";
          const label = MATCH_LABELS[i] ?? "Match";
          return (
            <Link
              key={match.course_id}
              href={`/course/${match.course_id}`}
              className="group flex items-center gap-5 rounded-2xl p-6 border-2 no-underline transition-all hover:-translate-y-1 hover:shadow-sm"
              style={{
                borderColor: i === 0 ? `${color}40` : "#EFEFEF",
                background: i === 0 ? `${color}05` : "#F8F8F8",
              }}
            >
              {/* Rank */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg flex-shrink-0"
                style={{ background: `${color}15`, color }}
              >
                {i + 1}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-bold uppercase tracking-[2px] mb-1"
                  style={{ color }}
                >
                  {label}
                </div>
                <div className="text-[#111] font-extrabold text-xl tracking-tight truncate">
                  {match.course_name}
                </div>
              </div>

              {/* Arrow */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ background: `${color}10` }}
              >
                <ArrowIcon color={color} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/chat"
          className="flex-1 inline-flex items-center justify-center gap-3 bg-[#39D825] rounded-full py-4 px-6 no-underline hover:bg-[#2fbd1e] transition-colors"
        >
          <span className="text-white font-bold text-base">Ask Olu Anything</span>
          <ArrowIcon color="white" />
        </Link>
        <Link
          href="/level-select"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-[#E8E8E8] rounded-full py-4 px-6 no-underline hover:border-[#111]/30 hover:text-[#111] transition-colors"
        >
          <span className="text-[#666] font-semibold text-base">Retake Quiz</span>
        </Link>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AptitudeResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("verta_result");
    if (!raw) {
      router.replace("/level-select");
      return;
    }
    try {
      setResult(JSON.parse(raw) as AptitudeResult);
    } catch {
      router.replace("/level-select");
    } finally {
      setReady(true);
    }
  }, [router]);

  if (!ready || !result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#39D825] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111]">

      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-6 md:px-10 h-[70px] border-b border-[#E8E8E8] flex-shrink-0">
        <Link href="/" className="font-extrabold text-xl text-[#111] tracking-tight no-underline">
          VERTA
        </Link>
        <span className="text-[#39D825] text-sm font-medium">Results</span>
        <Link href="/chat" className="text-[#666] text-sm hover:text-[#111] transition-colors no-underline">
          Ask Olu
        </Link>
      </nav>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {result.level === "JSS" && result.recommended_department !== null && (
          <JSSWinner result={result as JSSResult} />
        )}
        {result.level === "JSS" && result.recommended_department === null && (
          <JSSTie result={result as JSSTieResult} />
        )}
        {result.level === "SSS" && (
          <SSSMatches result={result as SSSResult} />
        )}
      </main>

      {/* ── FOOTER ── */}
      <div className="px-6 md:px-10 py-5 border-t border-[#E8E8E8] flex justify-between items-center flex-wrap gap-3">
        <span className="text-[#888] text-xs">© 2026 Verta</span>
        <span className="text-[#888] text-xs">Free for all Nigerian students</span>
      </div>
    </div>
  );
}