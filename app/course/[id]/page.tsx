"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  RiArrowLeftLine,
  RiArrowRightUpLine,
  RiBookOpenLine,
  RiMoneyDollarCircleLine,
  RiBriefcaseLine,
  RiCheckboxCircleLine,
  RiBuildingLine,
  RiMapPinLine,
  RiFilterLine,
} from "react-icons/ri";

interface Course {
  id: number;
  name: string;
  description: string;
  jamb_combination: string;
  salary_range: string;
  career_paths: string;
}

interface University {
  id: number;
  name: string;
  state: string;
  type: "Federal" | "State" | "Private";
  accreditation_status: string;
  utme_cutoff: number;
  post_utme_cutoff: number;
}

interface UniversitiesResponse {
  course_id: number;
  filter: string;
  count: number;
  universities: University[];
}

type UFilter = "all" | "Federal" | "State" | "Private";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Federal: { bg: "bg-[#39D825]/10", text: "text-[#39D825]" },
  State:   { bg: "bg-[#7C3AED]/10", text: "text-[#7C3AED]" },
  Private: { bg: "bg-[#f59e0b]/10",  text: "text-[#f59e0b]" },
};

export default function CourseProfilePage() {
  const params = useParams();
  const courseId = Number(params.id);

  const [course, setCourse] = useState<Course | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [uniCount, setUniCount] = useState(0);
  const [filter, setFilter] = useState<UFilter>("all");

  const [loadingCourse, setLoadingCourse] = useState(true);
  const [loadingUnis, setLoadingUnis] = useState(true);
  const [courseError, setCourseError] = useState<string | null>(null);
  const [uniError, setUniError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    async function load() {
      try {
        setLoadingCourse(true);
        const res = await fetch(`${BASE_URL}/api/courses/${courseId}`);
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.message ?? "Course not found");
        }
        setCourse(await res.json());
      } catch (e: unknown) {
        setCourseError(e instanceof Error ? e.message : "Failed to load course");
      } finally {
        setLoadingCourse(false);
      }
    }
    load();
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    async function load() {
      try {
        setLoadingUnis(true);
        setUniError(null);
        const url = filter === "all"
          ? `${BASE_URL}/api/courses/${courseId}/universities`
          : `${BASE_URL}/api/courses/${courseId}/universities?type=${filter}`;
        const res = await fetch(url);
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.message ?? "No universities found");
        }
        const data: UniversitiesResponse = await res.json();
        setUniversities(data.universities);
        setUniCount(data.count);
      } catch (e: unknown) {
        setUniError(e instanceof Error ? e.message : "Failed to load universities");
        setUniversities([]);
        setUniCount(0);
      } finally {
        setLoadingUnis(false);
      }
    }
    load();
  }, [courseId, filter]);

  if (loadingCourse) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3.5">
      <div className="w-[34px] h-[34px] rounded-full border-2 border-[#39D825] border-t-transparent animate-spin" />
      <p className="text-xs md:text-sm text-[#666]">Loading course profile…</p>
    </div>
  );

  if (courseError || !course) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="font-semibold text-base text-[#111]">{courseError ?? "Course not found"}</p>
      <Link
        href="/results"
        className="inline-flex items-center gap-2 bg-[#39D825] hover:bg-[#2fbd1e] text-white font-bold px-6 py-3 rounded-full transition-colors"
      >
        Back to results
        <RiArrowRightUpLine size={15} />
      </Link>
    </div>
  );

  const careerList = course.career_paths.split(",").map(c => c.trim());
  const jambSubjects = course.jamb_combination.split(",").map(s => s.trim());

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111]">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 md:px-10 h-[70px] border-b border-[#E8E8E8] bg-white flex-shrink-0">
        <Link href="/" className="font-extrabold text-xl text-[#111] tracking-tight no-underline">
          VERTA
        </Link>
        <Link
          href="/results"
          className="text-[#666] text-sm font-medium hover:text-[#111] transition-colors no-underline flex items-center gap-1.5"
        >
          <RiArrowLeftLine size={14} /> Back to results
        </Link>
      </nav>

      <main className="flex-grow max-w-[860px] mx-auto w-full px-6 py-20">

        {/* HERO */}
        <div className="mb-12">
          <p className="text-[#39D825] text-xs font-bold uppercase tracking-[2px] mb-3">
            Course Profile
          </p>
          <h1 className="font-['Instrument_Serif',_serif] text-[clamp(32px,5vw,58px)] text-[#111] leading-[1.08] mb-4 font-normal">
            {course.name}
          </h1>
          <p className="text-base text-[#666] leading-relaxed max-w-[580px]">
            {course.description}
          </p>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          {/* JAMB */}
          <div className="bg-[#F8F8F8] border border-[#EFEFEF] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#39D825]/10 text-[#39D825]">
                <RiBookOpenLine size={16} />
              </span>
              <p className="text-xs font-bold uppercase tracking-[2.5px] text-[#888]">
                JAMB Subject Combination
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {jambSubjects.map(subj => (
                <span
                  key={subj}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-[#39D825]/10 text-[#39D825] border border-[#39D825]/20"
                >
                  {subj}
                </span>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div className="bg-[#F8F8F8] border border-[#EFEFEF] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#f59e0b]/10 text-[#f59e0b]">
                <RiMoneyDollarCircleLine size={16} />
              </span>
              <p className="text-xs font-bold uppercase tracking-[2.5px] text-[#888]">
                Monthly Salary Range
              </p>
            </div>
            <p className="font-['Instrument_Serif',_serif] text-[28px] text-[#111] leading-none mb-1.5">
              {course.salary_range}
            </p>
            <p className="text-xs text-[#888]">Average monthly earnings in Nigeria</p>
          </div>
        </div>

        {/* Career paths */}
        <div className="bg-[#F8F8F8] border border-[#EFEFEF] rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#7C3AED]/10 text-[#7C3AED]">
              <RiBriefcaseLine size={16} />
            </span>
            <p className="text-xs font-bold uppercase tracking-[2.5px] text-[#888]">
              Career Paths
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {careerList.map(career => (
              <span
                key={career}
                className="text-xs font-medium px-3 py-1 rounded-full bg-white text-[#444] border border-[#EFEFEF]"
              >
                {career}
              </span>
            ))}
          </div>
        </div>

        {/* UNIVERSITIES HEADER */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <RiBuildingLine size={18} className="text-[#666]" />
              <h2 className="font-['Instrument_Serif',_serif] text-2xl text-[#111] font-normal">
                Universities
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[#666]">
              {loadingUnis ? "Loading…" : `${uniCount} universities offering this course`}
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <RiFilterLine size={14} className="text-[#666] mr-1" />
            {(["all", "Federal", "State", "Private"] as UFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150 cursor-pointer ${
                  filter === f
                    ? "border-[#39D825] bg-[#39D825] text-white"
                    : "border-[#E8E8E8] bg-white text-[#666] hover:border-[#111]/30 hover:text-[#111]"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>

        {/* UNIVERSITY LIST */}
        {loadingUnis ? (
          <div className="flex justify-center padding py-12">
            <div className="w-[30px] h-[30px] rounded-full border-2 border-[#39D825] border-t-transparent animate-spin" />
          </div>
        ) : uniError ? (
          <div className="border border-[#EFEFEF] bg-[#F8F8F8] rounded-2xl p-8 text-center">
            <p className="text-sm text-[#666]">{uniError}</p>
          </div>
        ) : universities.length === 0 ? (
          <div className="border border-[#EFEFEF] bg-[#F8F8F8] rounded-2xl p-8 text-center">
            <p className="text-sm text-[#666]">
              No {filter !== "all" ? filter : ""} universities found for this course.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mb-12">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-2 text-xs font-bold uppercase tracking-[2.5px] text-[#888]">
              <span>University</span>
              <span className="text-right min-w-[80px]">UTME Cutoff</span>
              <span className="text-right min-w-[80px]">Post-UTME</span>
            </div>

            {universities.map((uni, i) => {
              const tc = TYPE_COLORS[uni.type] ?? TYPE_COLORS.Federal;
              return (
                <div
                  key={uni.id}
                  className="bg-white border border-[#EFEFEF] rounded-2xl p-5 grid grid-cols-[1fr_auto_auto] gap-4 items-center hover:shadow-sm transition-shadow duration-150"
                >
                  {/* Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-[#888] min-w-[20px]">
                        #{i + 1}
                      </span>
                      <span className="font-semibold text-sm text-[#111] leading-tight">
                        {uni.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>
                        {uni.type}
                      </span>
                      <span className="text-xs text-[#666] flex items-center gap-1">
                        <RiMapPinLine size={11} /> {uni.state}
                      </span>
                      {uni.accreditation_status === "Accredited" && (
                        <span className="text-[11px] text-[#39D825] flex items-center gap-0.5 font-medium">
                          <RiCheckboxCircleLine size={12} /> Accredited
                        </span>
                      )}
                    </div>
                  </div>

                  {/* UTME */}
                  <div className="text-right min-w-[80px]">
                    <span className="font-['Instrument_Serif',_serif] text-xl text-[#111]">
                      {uni.utme_cutoff}
                    </span>
                  </div>

                  {/* Post-UTME */}
                  <div className="text-right min-w-[80px]">
                    <span className="font-['Instrument_Serif',_serif] text-xl text-[#111]">
                      {uni.post_utme_cutoff}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/chat"
            className="flex-grow inline-flex items-center justify-center gap-2.5 bg-[#39D825] hover:bg-[#2fbd1e] rounded-full py-4 px-6 no-underline text-white font-bold text-base transition-colors"
          >
            Ask Olu about this course
            <RiArrowRightUpLine size={16} />
          </Link>
          <Link
            href="/results"
            className="flex-grow inline-flex items-center justify-center border border-[#E8E8E8] rounded-full py-4 px-6 no-underline text-[#666] hover:border-[#111]/30 hover:text-[#111] font-semibold text-base transition-colors"
          >
            See other matches
          </Link>
        </div>
      </main>

      <div className="px-6 md:px-10 py-5 border-t border-[#E8E8E8] flex justify-between items-center flex-wrap gap-2 text-xs text-[#888]">
        <span>© 2026 Verta</span>
        <span>Free for all Nigerian students</span>
      </div>
    </div>
  );
}