"use client";

import Link from "next/link";
import { useState } from "react";
import {
  RiArrowRightUpLine,
  RiBookOpenLine,
  RiShieldCheckLine,
  RiRobot2Line,
  RiRoadMapLine,
  RiGlobalLine,
  RiVerifiedBadgeLine,
  RiGiftLine,
  RiAddLine,
  RiSubtractLine,
  RiCheckLine,
} from "react-icons/ri";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PROBLEMS = [
  {
    icon: <RiBookOpenLine size={20} />,
    title: "Wrong JAMB Combinations",
    desc: "Students pick subjects that disqualify them before they even apply.",
    dark: true,
  },
  {
    icon: <RiGlobalLine size={20} />,
    title: "Hours Wasted Searching",
    desc: "Information is scattered, outdated, irrelevant to Nigerian education.",
    dark: false,
  },
  {
    icon: <RiRobot2Line size={20} />,
    title: "No Access to Guidance",
    desc: "Public school students have no counsellor. Private school students ask peers who also don't know.",
    dark: false,
  },
];

const FEATURES = [
  {
    icon: <RiBookOpenLine size={20} />,
    title: "Aptitude Assessment",
    desc: "15–20 questions mapping your strengths to the right department or course. JSS and SSS supported.",
  },
  {
    icon: <RiShieldCheckLine size={20} />,
    title: "Course & JAMB Guide",
    desc: "Exact JAMB subject combinations, UTME cutoffs, and Post-UTME scores for every course.",
  },
  {
    icon: <RiRobot2Line size={20} />,
    title: "Olu AI Counsellor",
    desc: "Ask anything in plain English. Nigerian-specific answers powered by Gemini AI.",
  },
  {
    icon: <RiRoadMapLine size={20} />,
    title: "Skill Pathways",
    desc: "Practical skills to start building now based on your matched course.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Choose Your Level",
    desc: "Tell us if you're JSS or SSS.",
  },
  {
    num: "02",
    title: "Take the Quiz",
    desc: "Answer 15–20 questions about your interests.",
  },
  {
    num: "03",
    title: "Explore Courses",
    desc: "See matches with full JAMB combos and university options.",
  },
  {
    num: "04",
    title: "Ask Olu",
    desc: "Get Nigerian-specific answers instantly.",
  },
];

const WHY = [
  {
    icon: <RiGlobalLine size={20} />,
    title: "Built for Nigeria",
    desc: "Every data point — JAMB combos, cutoffs, salaries — sourced from verified Nigerian institutions.",
  },
  {
    icon: <RiVerifiedBadgeLine size={20} />,
    title: "Verified Information",
    desc: "JAMB combinations from the official 2026 brochure. Cutoffs verified from each institution's site.",
  },
  {
    icon: <RiGiftLine size={20} />,
    title: "Completely Free",
    desc: "No subscription. No account. No hidden charges. Always free for secondary school students.",
  },
];

const FAQS = [
  {
    q: "How does Verta determine my recommendation?",
    a: "Verta uses a weighted aptitude scoring algorithm. Each answer carries weights across different academic departments. Your total scores determine your best match.",
  },
  {
    q: "Is Verta only for secondary school students?",
    a: "Yes. Verta is designed for JSS and SSS students navigating department selection and course choices in the Nigerian secondary school system.",
  },
  {
    q: "Are the JAMB subject combinations accurate?",
    a: "Yes. All JAMB combinations are sourced from the official JAMB 2026 brochure at jamb.gov.ng and verified by our data team.",
  },
  {
    q: "Is it free to use?",
    a: "Completely free. No account required, no payment, no hidden charges.",
  },
  {
    q: "What makes Verta different from searching on Google?",
    a: "Google gives scattered, outdated results. Verta gives a personalised match based on your actual strengths, with verified Nigerian data all in one place.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="py-[22px] border-b border-[#E8E8E8] cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <span className="text-[15px] font-medium text-[#111]">{q}</span>
        <span
          className={`w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
            open ? "bg-[#39D825] text-white" : "bg-[#F2F2F0] text-[#888]"
          }`}
        >
          {open ? <RiSubtractLine size={14} /> : <RiAddLine size={14} />}
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm text-[#666] leading-relaxed animate-fade-in">
          {a}
        </p>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="font-sans bg-white text-[#111] overflow-x-hidden">
      <Navbar />

      {/* ── HERO — light bg, green pop ── */}
      <section className="min-h-screen pt-16 flex items-center bg-white">
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-20 w-full">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 bg-[#39D825]/10 border border-[#39D825]/20 rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39D825] inline-block animate-pulse" />
            <span className="text-xs font-semibold text-[#39D825]">
              Free for all Nigerian students
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-['Instrument_Serif',_Georgia,_serif] text-[clamp(48px,7.5vw,92px)] leading-[1.05] -tracking-[0.025em] text-[#111] mb-8 max-w-[760px]">
            Discover your ideal{" "}
            <span className="italic text-[#39D825]">academic path</span>
          </h1>

          <p className="text-[17px] text-[#666] leading-relaxed max-w-[500px] mb-12">
            Take a quick aptitude test, get personalised course recommendations,
            explore JAMB requirements, and chat with Olu — an AI counsellor
            built for Nigerian students.
          </p>

          <div className="flex flex-wrap gap-3.5 items-center">
            <Link
              href="/level-select"
              className="inline-flex items-center bg-[#39D825] hover:bg-[#2fbd1e] rounded-full py-1.5 pl-6 pr-1.5 font-bold text-sm md:text-base text-white transition-colors duration-150"
            >
              Find Your Path
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black ml-4 shadow-sm">
                <RiArrowRightUpLine size={18} />
              </span>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center border border-[#E8E8E8] hover:border-[#111]/30 rounded-full px-6 py-3 text-sm font-medium text-[#666] hover:text-[#111] transition-all duration-150"
            >
              See how it works
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 mt-20 pt-12 border-t border-[#E8E8E8]">
            {[
              { val: "17", label: "courses tracked" },
              { val: "15+", label: "universities per course" },
              { val: "100%", label: "free, always" },
            ].map((s) => (
              <div key={s.val}>
                <div className="font-['Instrument_Serif',_serif] text-4xl md:text-5xl text-[#111] leading-none">
                  {s.val}
                </div>
                <div className="text-xs md:text-sm text-[#666] mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM — white bg ── */}
      <section className="py-24 px-6 md:px-12 bg-white border-t border-[#F0F0F0]">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start mb-16">
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#39D825] mb-4">
                The Problem
              </p>
              <h2 className="font-['Instrument_Serif',_serif] text-[clamp(28px,4vw,48px)] leading-[1.1] text-[#111] margin-0">
                The right information<br />
                <em className="italic">shouldn't be hard to find</em>
              </h2>
            </div>
            <div className="md:pt-2">
              <p className="text-[15px] text-[#666] leading-relaxed mb-3.5">
                Every year, thousands of students make critical academic
                decisions without reliable guidance. Wrong JAMB combinations cost
                them admission. Wrong course choices lead to careers they hate.
              </p>
              <p className="text-sm font-semibold text-[#39D825]">
                How we solve them →
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROBLEMS.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 border bg-[#F8F8F8] border-[#EFEFEF]"
              >
                <span
                  className="inline-flex w-11 h-11 rounded-xl items-center justify-center mb-5 bg-[#39D825]/10 text-[#39D825]"
                >
                  {p.icon}
                </span>
                <h3
                  className="font-bold text-base mb-2.5 text-[#111]"
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-[#888]"
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — light green tint bg ── */}
      <section
        id="features"
        className="py-24 px-6 md:px-12 bg-[#F2FFF0] border-y border-[#E0F5DC]"
      >
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#39D825] mb-3.5">
              What Verta offers
            </p>
            <h2 className="font-['Instrument_Serif',_serif] text-[clamp(28px,4vw,48px)] text-[#111] margin-0">
              Everything you need, <em className="italic">in one place</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-[#E8F5E4] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(57,216,37,0.12)] transition-all duration-200"
              >
                <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center bg-[#39D825]/10 text-[#39D825] mb-4.5">
                  {f.icon}
                </span>
                <h3 className="font-bold text-[15px] text-[#111] mb-2">
                  {f.title}
                </h3>
                <p className="text-xs md:text-sm text-[#777] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — white ── */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#39D825] mb-3.5">
              The process
            </p>
            <h2 className="font-['Instrument_Serif',_serif] text-[clamp(28px,4vw,48px)] text-[#111] margin-0">
              Your journey to <em className="italic text-[#39D825]">excellence</em>
            </h2>
            <p className="text-[#888] text-sm md:text-base mt-3.5 max-w-[400px] mx-auto">
              Four steps from confusion to clarity. No account needed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="relative">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-[19px] left-[46px] right-[-16px] h-[1px] bg-[#EFEFEF]" />
                )}
                <div
                  className={`w-[38px] h-[38px] rounded-full flex items-center justify-center font-bold text-xs mb-4.5 relative z-10 ${
                    i === 0
                      ? "bg-[#39D825] text-white"
                      : "bg-[#F2F2F2] text-[#aaa]"
                  }`}
                >
                  {i === 0 ? <RiCheckLine size={16} /> : s.num}
                </div>
                <h3 className="font-bold text-[15px] text-[#111] mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs md:text-sm text-[#888] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              href="/level-select"
              className="inline-flex items-center bg-[#39D825] hover:bg-[#2fbd1e] rounded-full py-1.5 pl-6 pr-1.5 font-bold text-sm md:text-base text-white transition-colors duration-150"
            >
              Start now — it's free
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black ml-4 shadow-sm">
                <RiArrowRightUpLine size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY TRUST — light gray ── */}
      <section className="py-24 px-6 md:px-12 bg-[#F8F8F8] border-y border-[#EFEFEF]">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#39D825] mb-3.5">
              Why Verta
            </p>
            <h2 className="font-['Instrument_Serif',_serif] text-[clamp(28px,4vw,48px)] text-[#111] margin-0">
              Why trust <em className="italic text-[#39D825]">Verta</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHY.map((w, i) => (
              <div
                key={i}
                className="bg-white border border-[#EFEFEF] rounded-2xl p-8"
              >
                <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center bg-[#39D825]/10 text-[#39D825] mb-5">
                  {w.icon}
                </span>
                <h3 className="font-bold text-base text-[#111] mb-2.5">
                  {w.title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ — white ── */}
      <section id="faqs" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#39D825] mb-3.5">
              Got questions?
            </p>
            <h2 className="font-['Instrument_Serif',_serif] text-[clamp(28px,4vw,48px)] text-[#111] margin-0">
              Frequently asked <em className="italic">questions</em>
            </h2>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA — light green bg ── */}
      <section className="py-24 px-6 md:px-12 bg-[#F2FFF0] border-t border-[#E0F5DC] text-center">
        <div className="max-w-[620px] mx-auto">
          <h2 className="font-['Instrument_Serif',_serif] text-[clamp(32px,5vw,60px)] text-[#111] mb-5 leading-[1.1] margin-0">
            Your future deserves <em className="italic">better guidance</em>
          </h2>
          <p className="text-base text-[#555] leading-relaxed mb-11">
            Over 1.5 million students take JAMB every year. Thousands fail due to
            wrong subject combinations. Start your journey with Verta — free,
            instant, built for you.
          </p>
          <Link
            href="/level-select"
            className="inline-flex items-center bg-[#39D825] hover:bg-[#2fbd1e] rounded-full py-1.5 pl-6 pr-1.5 font-bold text-sm md:text-base text-white transition-colors duration-150"
          >
            Find your path
            <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black ml-4 shadow-sm">
              <RiArrowRightUpLine size={18} />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}