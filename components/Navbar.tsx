"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { RiArrowRightUpLine, RiMenuLine, RiCloseLine } from "react-icons/ri";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md transition-all duration-200 flex items-center justify-between px-6 md:px-12 border-b ${
          scrolled ? "bg-white/92 border-[#E8E8E8]" : "bg-white border-transparent"
        }`}
      >
        <span className="font-extrabold text-lg tracking-tight text-[#111]">
          VERTA
        </span>

        <div className="hidden md:flex gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/level-select"
            className="inline-flex items-center bg-[#39D825] hover:bg-[#2fbd1e] rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition-colors duration-150"
          >
            Get Started
            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black ml-3 shadow-sm">
              <RiArrowRightUpLine size={16} />
            </span>
          </Link>
          <button
            className="md:hidden bg-[#F2F2F0] border border-[#E8E8E8] rounded-lg p-2 flex text-[#111] hover:bg-[#e7e7e5] transition-colors duration-150 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 flex flex-col animate-fade-in md:hidden">
          <div className="p-5 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3.5 px-4 text-base font-medium text-[#111] hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
