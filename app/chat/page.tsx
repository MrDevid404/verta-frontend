"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  RiArrowLeftLine, RiSendPlaneLine, RiRobot2Line,
  RiUserLine, RiLoader4Line, RiArrowRightUpLine, RiSparklingLine,
} from "react-icons/ri";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const SUGGESTED = [
  "What JAMB subjects do I need for Computer Science?",
  "Which universities offer Medicine with a 260 UTME cutoff?",
  "What subjects do I need for Law?",
  "What's the salary range for Engineering graduates?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "2px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: "#BFF4B4",
          animation: "vbounce 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.18}s`,
        }} />
      ))}
      <style>{`@keyframes vbounce{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-6px);opacity:1}}`}</style>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome", role: "assistant",
    content: "Hi! I'm Olu, your AI academic counsellor.\n\nI can help with JAMB subject combinations, university cutoff scores, course requirements, and career paths — all specific to Nigerian universities.\n\nWhat would you like to know?",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isWelcome = messages.length === 1;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || loading) return;
    setMessages(p => [...p, { id: crypto.randomUUID(), role: "user", content: t }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: t }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Olu is unavailable right now.");
      setMessages(p => [...p, { id: crypto.randomUUID(), role: "assistant", content: data.reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Olu is unavailable. Please try again.";
      setMessages(p => [...p, { id: crypto.randomUUID(), role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#fff", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>

      {/* ── NAV ── */}
      <header style={{
        height: 64, flexShrink: 0,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #EFEFEF",
        display: "grid", gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center", padding: "0 28px", zIndex: 50,
      }}>
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.04em", color: "#111", textDecoration: "none" }}>VERTA</Link>
          <span style={{ width: 1, height: 16, background: "#E8E8E8" }} />
          <Link href="/results" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#888", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#111")}
            onMouseLeave={e => (e.currentTarget.style.color = "#888")}
          >
            <RiArrowLeftLine size={14} /> Results
          </Link>
        </div>

        {/* Center — Olu badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#39D825", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <RiRobot2Line size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111", lineHeight: 1.2 }}>Olu</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#39D825", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#888" }}>AI Counsellor · Online</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link href="/level-select" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            border: "1px solid #E8E8E8", borderRadius: 999,
            padding: "8px 16px", fontSize: 13, fontWeight: 500, color: "#555",
            textDecoration: "none", transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#39D825"; e.currentTarget.style.color = "#39D825"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.color = "#555"; }}
          >
            <RiArrowRightUpLine size={13} /> Take quiz
          </Link>
        </div>
      </header>

      {/* ── WELCOME STATE ── */}
      {isWelcome && (
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ width: "100%", maxWidth: 580, textAlign: "center" }}>

            {/* Big Olu avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: "50%", margin: "0 auto 28px",
              background: "#39D825", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 12px rgba(57,216,37,0.1)",
            }}>
              <RiRobot2Line size={38} color="#fff" />
            </div>

            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(26px,4vw,40px)", color: "#111", marginBottom: 14, lineHeight: 1.2 }}>
              Ask <em style={{ color: "#39D825" }}>Olu</em> anything
            </h1>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, marginBottom: 44, maxWidth: 420, margin: "0 auto 44px" }}>
              JAMB combinations, university cutoffs, course requirements, career paths — all specific to Nigerian universities.
            </p>

            {/* 2×2 suggestion cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {SUGGESTED.map(q => (
                <button key={q} onClick={() => send(q)} style={{
                  textAlign: "left", padding: "16px 18px", borderRadius: 14, cursor: "pointer",
                  background: "#F8FFF7", border: "1px solid #D8F5D0",
                  fontSize: 13, color: "#333", fontWeight: 500, lineHeight: 1.5,
                  transition: "all 0.15s", fontFamily: "'Inter', sans-serif",
                }}
                  onMouseEnter={e => { const b = e.currentTarget; b.style.background = "#EBF9E8"; b.style.borderColor = "#39D825"; b.style.boxShadow = "0 4px 16px rgba(57,216,37,0.12)"; }}
                  onMouseLeave={e => { const b = e.currentTarget; b.style.background = "#F8FFF7"; b.style.borderColor = "#D8F5D0"; b.style.boxShadow = "none"; }}
                >
                  <RiSparklingLine size={14} style={{ color: "#39D825", marginBottom: 8, display: "block" }} />
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MESSAGES ── */}
      {!isWelcome && (
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 0" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 24 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display: "flex", gap: 12,
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-start",
              }}>
                {/* Avatar */}
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                  background: msg.role === "assistant" ? "#39D825" : "#F2F2F2",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {msg.role === "assistant"
                    ? <RiRobot2Line size={16} color="#fff" />
                    : <RiUserLine size={16} color="#888" />}
                </div>

                {/* Bubble */}
                <div style={{
                  maxWidth: "74%",
                  padding: "14px 18px",
                  borderRadius: msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                  background: msg.role === "user" ? "#111" : "#F8F8F8",
                  border: msg.role === "user" ? "none" : "1px solid #EFEFEF",
                  fontSize: 14, lineHeight: 1.7,
                  color: msg.role === "user" ? "#fff" : "#333",
                  whiteSpace: "pre-wrap", wordBreak: "break-word",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing */}
            {loading && (
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#39D825", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <RiRobot2Line size={16} color="#fff" />
                </div>
                <div style={{ padding: "14px 18px", borderRadius: "4px 18px 18px 18px", background: "#39D825" }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}

      {/* ── INPUT ── */}
      <div style={{ flexShrink: 0, padding: "16px 24px 22px", background: "#fff", borderTop: "1px solid #EFEFEF" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", gap: 10,
            background: "#F8F8F8", border: "1.5px solid #E8E8E8",
            borderRadius: 16, padding: "10px 10px 10px 18px",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
            onFocusCapture={e => { e.currentTarget.style.borderColor = "#39D825"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(57,216,37,0.1)"; }}
            onBlurCapture={e => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask Olu about courses, JAMB, or universities…"
              rows={1}
              disabled={loading}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                resize: "none", fontFamily: "'Inter', sans-serif",
                fontSize: 14, color: "#111", lineHeight: 1.5,
                maxHeight: 120, overflowY: "auto", padding: 0,
              }}
              onInput={e => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = `${Math.min(t.scrollHeight, 120)}px`; }}
            />
            <button onClick={() => send(input)} disabled={!input.trim() || loading} style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0, border: "none",
              background: input.trim() && !loading ? "#39D825" : "#E8E8E8",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: input.trim() && !loading ? "#fff" : "#aaa",
              transition: "background 0.15s",
            }}>
              {loading
                ? <RiLoader4Line size={17} style={{ animation: "vspin 1s linear infinite" }} />
                : <RiSendPlaneLine size={17} />}
            </button>
          </div>
          <p style={{ fontSize: 11, color: "#BBBBBB", textAlign: "center", marginTop: 10 }}>
            Olu answers based on verified Nigerian university data · Enter to send
          </p>
        </div>
        <style>{`@keyframes vspin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}