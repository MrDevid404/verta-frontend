// lib/api.ts
// All Verta API calls. Swap BASE_URL via NEXT_PUBLIC_API_URL env var.

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// ── Types ────────────────────────────────────────────────────────────────────

export interface Option {
  id: number;
  option_text: string;
}

export interface Question {
  id: number;
  question_text: string;
  category: string;
  options: Option[];
}

export interface Answer {
  question_id: number;
  option_id: number;
}

// JSS result — clear winner
export interface JSSResult {
  level: "JSS";
  recommended_department: string;
  scores: Record<string, string>;
  message: string;
}

// JSS result — tie
export interface JSSTieResult {
  level: "JSS";
  recommended_department: null;
  tied_departments: string[];
  scores: Record<string, string>;
  message: string;
}

// SSS result
export interface SSSMatch {
  course_id: number;
  course_name: string;
}

export interface SSSResult {
  level: "SSS";
  top_matches: SSSMatch[];
  message: string;
}

export type AptitudeResult = JSSResult | JSSTieResult | SSSResult;

export interface Course {
  id: number;
  name: string;
  description: string;
  jamb_combination: string;
  salary_range: string;
  career_paths: string;
}

export interface University {
  id: number;
  name: string;
  state: string;
  type: "Federal" | "State" | "Private";
  accreditation_status: string;
  utme_cutoff: number;
  post_utme_cutoff: number;
}

export interface UniversitiesResponse {
  course_id: number;
  filter: string;
  count: number;
  universities: University[];
}

// ── API calls ────────────────────────────────────────────────────────────────

export async function fetchQuestions(level: "JSS" | "SSS"): Promise<Question[]> {
  const res = await fetch(`${BASE_URL}/api/aptitude/questions?level=${level}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error ?? "Failed to load questions");
  }
  const data = await res.json();
  return data.questions as Question[];
}

export async function submitAnswers(
  level: "JSS" | "SSS",
  answers: Answer[]
): Promise<AptitudeResult> {
  const res = await fetch(`${BASE_URL}/api/aptitude/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level, answers }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error ?? "Submission failed");
  }
  return res.json() as Promise<AptitudeResult>;
}

export async function fetchCourse(courseId: number): Promise<Course> {
  const res = await fetch(`${BASE_URL}/api/courses/${courseId}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? "Course not found");
  }
  return res.json() as Promise<Course>;
}

export async function fetchUniversities(
  courseId: number,
  type?: "Federal" | "State" | "Private"
): Promise<UniversitiesResponse> {
  const url = type
    ? `${BASE_URL}/api/courses/${courseId}/universities?type=${type}`
    : `${BASE_URL}/api/courses/${courseId}/universities`;
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? "No universities found");
  }
  return res.json() as Promise<UniversitiesResponse>;
}

export async function sendChatMessage(message: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error ?? "Olu is unavailable right now. Try again.");
  }
  const data = await res.json();
  return data.reply as string;
}