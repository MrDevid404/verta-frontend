export default function Footer() {
  const footerLinks = [
    {
      title: "Platform",
      links: ["Find Your Path", "Course Guide", "Ask Olu", "How it works"],
    },
    {
      title: "Info",
      links: ["About", "FAQs", "Contact", "Privacy"],
    },
  ];

  return (
    <footer className="bg-[#F8F8F8] border-t border-[#E8E8E8] py-16 px-6 md:px-12">
      <div className="max-w-[1160px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
          <div>
            <div className="font-extrabold text-lg tracking-tight text-[#111] mb-3">
              VERTA
            </div>
            <p className="text-sm text-[#666] leading-relaxed max-w-[240px]">
              AI-powered academic guidance for Nigerian secondary school students.
            </p>
          </div>
          <div className="flex gap-16 flex-wrap">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-bold tracking-[0.09em] uppercase text-[#111]/40 mb-4.5">
                  {col.title}
                </div>
                {col.links.map((link) => (
                  <div
                    key={link}
                    className="text-sm text-[#666] mb-3 cursor-pointer hover:text-[#111] transition-colors duration-150"
                  >
                    {link}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="font-['Instrument_Serif',_serif] text-[clamp(56px,11vw,128px)] text-[#111]/[0.03] tracking-tight leading-none mb-8 select-none">
          VERTA
        </div>
        <div className="border-t border-[#E8E8E8] pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-[#888]">
          <span>© 2026 Verta · OPay National Innovation Challenge</span>
          <span>Built for Nigerian students</span>
        </div>
      </div>
    </footer>
  );
}
