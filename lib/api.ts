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

// ── Helper ─────────────────────────────────────────────────────────────────────
/**
 * Perform a fetch request that always expects JSON and throws a clear Error on non‑OK responses.
 */
async function requestJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    headers: {
      "Accept": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    let errorMsg = `Request failed with ${response.status}`;
    try {
      const data = await response.json();
      errorMsg = data.error ?? data.message ?? errorMsg;
    } catch (_) {
      // ignore JSON parse errors
    }
    throw new Error(errorMsg);
  }

  return (await response.json()) as T;
}

// ── API calls ────────────────────────────────────────────────────────────────

export async function fetchQuestions(level: "JSS" | "SSS"): Promise<Question[]> {
  const data = await requestJson<{ questions: Question[] }>(
    `${BASE_URL}/api/aptitude/questions?level=${level}`
  );
  return data.questions;
}

export async function submitAnswers(
  level: "JSS" | "SSS",
  answers: Answer[]
): Promise<AptitudeResult> {
  return await requestJson<AptitudeResult>(`${BASE_URL}/api/aptitude/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level, answers }),
  });
}

export async function fetchCourse(courseId: number): Promise<Course> {
  return await requestJson<Course>(`${BASE_URL}/api/courses/${courseId}`);
}

export async function fetchUniversities(
  courseId: number,
  type?: "Federal" | "State" | "Private"
): Promise<UniversitiesResponse> {
  const url = type
    ? `${BASE_URL}/api/courses/${courseId}/universities?type=${type}`
    : `${BASE_URL}/api/courses/${courseId}/universities`;
  return await requestJson<UniversitiesResponse>(url);
}

export async function sendChatMessage(message: string): Promise<string> {
  const data = await requestJson<{ reply: string }>(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return data.reply;
}