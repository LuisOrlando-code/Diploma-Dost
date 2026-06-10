import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ACADEMIC_YEAR = "2025–26";

const TERM_SCHEDULE = [
  { label: "Odd Semester Start", date: "1 Jul 2025", status: "done" },
  { label: "1st Year (New Admission) Start", date: "17 Jul 2025", status: "done" },
  { label: "Odd Sem Class Test 1", date: "11–13 Aug 2025", status: "done" },
  { label: "Odd Sem Class Test 2", date: "13–15 Oct 2025", status: "done" },
  { label: "Odd Semester End", date: "17 Oct 2025", status: "done" },
  { label: "Winter 2025 Practicals", date: "28 Oct – 6 Nov 2025", status: "done" },
  { label: "Winter 2025 Theory Exams", date: "11 Nov – 3 Dec 2025", status: "done" },
  { label: "Even Semester Start", date: "15 Dec 2025", status: "done" },
  { label: "Even Sem Class Test 1", date: "27–29 Jan 2026", status: "done" },
  { label: "Even Sem Class Test 2", date: "30 Mar – 2 Apr 2026", status: "done" },
  { label: "Even Semester End", date: "4 Apr 2026", status: "done" },
  { label: "Summer 2026 Exam Form (Normal)", date: "2–12 Feb 2026", status: "done" },
  { label: "Summer 2026 Exam Form (Late ₹1500)", date: "17–19 Feb 2026", status: "done" },
  { label: "Summer 2026 Practicals", date: "8 Apr – 18 Apr 2026", status: "done" },
  { label: "Summer 2026 Theory Exams", date: "23 Apr – 16 May 2026", status: "current" },
  { label: "Summer 2026 Results (Expected)", date: "Late Jun 2026", status: "upcoming" },
  { label: "Photocopy / Rechecking Window", date: "~Late Jun 2026", status: "upcoming" },
  { label: "Winter 2026 Exam Form", date: "~Sep 2026", status: "upcoming" },
  { label: "Winter 2026 Theory Exams", date: "~Nov 2026", status: "upcoming" },
];

const QUICK_LINKS = [
  { label: "MSBTE Official Website", url: "https://msbte.ac.in/", icon: "globe", color: "#4d9ef0" },
  { label: "Student Login (Exam Forms)", url: "https://online.msbte.co.in/", icon: "user", color: "#c8f04d" },
  { label: "Summer 2026 Timetable", url: "https://online.msbte.co.in/timetable/", icon: "calendar", color: "#e8453c" },
  { label: "Check Results", url: "https://msbte.ac.in/", icon: "award", color: "#b87aff" },
  { label: "Hall Ticket Download", url: "https://online.msbte.co.in/", icon: "id-card", color: "#f0a843" },
  { label: "Academic Calendar PDF", url: "https://aissmspoly.org.in/wp-content/uploads/2025/06/Academic_Calendar-2025-26.pdf", icon: "download", color: "#4d9ef0" },
];

const RECHECKING_STEPS = [
  {
    step: "01",
    title: "Check your result first",
    desc: "Go to msbte.ac.in → Results. Enter your enrollment number. Download/screenshot your marksheet — you'll need it.",
    note: null,
  },
  {
    step: "02",
    title: "Decide: Photocopy or Re-evaluation?",
    desc: "Photocopy = you get a scanned copy of your answer sheet to review. Re-evaluation = your paper gets re-checked by an examiner. You must get a photocopy before applying for re-evaluation.",
    note: "Note: Online exam subjects (MCQ-based) have NO photocopy or rechecking option.",
  },
  {
    step: "03",
    title: "Apply via Student Login",
    desc: "Login at online.msbte.co.in with your enrollment number. Go to 'Photocopy/Rechecking' section. Select the subject(s) and pay the fee online.",
    note: null,
  },
  {
    step: "04",
    title: "Get institute confirmation",
    desc: "After you apply, your institute needs to confirm your application via their portal. Go to your exam department/office and tell them. They must confirm within the given window (usually 1–2 days after student login closes).",
    note: null,
  },
  {
    step: "05",
    title: "Submit original marksheet",
    desc: "For re-evaluation, submit your original MSBTE marksheet (not a printout) to your institute. They'll send it to the regional RBTE office in a sealed envelope. Without this, your re-evaluation won't be confirmed.",
    note: "Critical: This step is missed by most students. Don't skip it.",
  },
  {
    step: "06",
    title: "Wait for result",
    desc: "Photocopy is distributed by the institute within ~14 days. Re-evaluation result is announced via your institute and on msbte.ac.in. If marks change, a revised marksheet is issued.",
    note: null,
  },
];

const FEES = [
  { item: "Photocopy (per subject)", amount: "₹200 – ₹300" },
  { item: "Re-evaluation (per subject)", amount: "₹800 – ₹1000" },
  { item: "Exam form late fee (first window)", amount: "₹200" },
  { item: "Exam form late fee (second window)", amount: "₹1,500" },
  { item: "Special provision (forgot to fill form)", amount: "₹5,000 per subject" },
];

const NOTICES = [
  {
    tag: "Live Now",
    color: "#e8453c",
    title: "Summer 2026 Theory Exams Running",
    desc: "Theory exams are ongoing from Apr 23 – May 16, 2026. Check your timetable at the link below.",
    link: "https://online.msbte.co.in/timetable/",
    linkLabel: "View Timetable →",
  },
  {
    tag: "Upcoming",
    color: "#c8f04d",
    title: "Results Expected Late June 2026",
    desc: "Based on past patterns, Summer 2026 results will be published by end of June 2026.",
    link: "https://msbte.ac.in/",
    linkLabel: "Check Results Portal →",
  },
  {
    tag: "Important",
    color: "#b87aff",
    title: "Online Exam Subjects — No Rechecking",
    desc: "MCQ-based online subjects have no photocopy or rechecking option per MSBTE's latest circular.",
    link: null,
    linkLabel: null,
  },
  {
    tag: "Info",
    color: "#4d9ef0",
    title: "K-Scheme Equivalent Subject Provision",
    desc: "MSBTE has issued a provision for I-Scheme students to appear via equivalent K-Scheme subjects. Check official circular for your branch.",
    link: "https://msbte.ac.in/",
    linkLabel: "Official Circular →",
  },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

function Icon({ name, size = 16 }) {
  const s = { width: size, height: size };
  const icons = {
    globe: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    user: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    calendar: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    award: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
    "id-card": <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 10h2M16 14h2M7 10h.01"/><circle cx="9" cy="12" r="2"/><path d="M6 16c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2"/></svg>,
    download: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    external: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    info: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    chevron: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  };
  return icons[name] || null;
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="mb-6">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#e8453c] mb-2">{eyebrow}</div>
      <h2 className="font-['Clash_Display'] text-2xl font-semibold text-[#f0ede6]">{title}</h2>
    </div>
  );
}

// ─── NOTICES STRIP ───────────────────────────────────────────────────────────

function NoticesSection() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="Live Updates" title="Important Notices" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {NOTICES.map((n, i) => (
          <div key={i} className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ color: n.color, background: `${n.color}18`, border: `1px solid ${n.color}40` }}
              >
                {n.tag}
              </span>
            </div>
            <div className="font-['Cabinet_Grotesk'] text-[14px] font-semibold text-[#f0ede6]">{n.title}</div>
            <p className="font-['General_Sans'] text-[12px] text-[#888] leading-relaxed">{n.desc}</p>
            {n.link && (
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-wide mt-1 hover:opacity-80 transition-opacity"
                style={{ color: n.color }}
              >
                {n.linkLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────

function TimelineSection() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? TERM_SCHEDULE : TERM_SCHEDULE.slice(0, 8);

  const statusStyles = {
    done:     { dot: "bg-[#333]", text: "text-[#555]", dateTxt: "text-[#444]" },
    current:  { dot: "bg-[#e8453c] ring-4 ring-[#e8453c]/20", text: "text-[#f0ede6] font-semibold", dateTxt: "text-[#e8453c]" },
    upcoming: { dot: "bg-[#2a2a2a] border border-[#444]", text: "text-[#888]", dateTxt: "text-[#666]" },
  };

  return (
    <div className="mb-12">
      <SectionHeader eyebrow={`AY ${ACADEMIC_YEAR}`} title="Academic Calendar" />
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[7px] top-2 bottom-0 w-px bg-[#2a2a2a]" />
        <div className="space-y-0">
          {visible.map((item, i) => {
            const s = statusStyles[item.status];
            return (
              <div key={i} className="flex gap-4 relative pb-5">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-3.5 h-3.5 rounded-full ${s.dot}`} />
                </div>
                <div className="flex-1 flex items-start justify-between gap-4 min-w-0">
                  <span className={`font-['General_Sans'] text-[13px] leading-snug ${s.text}`}>{item.label}</span>
                  <span className={`font-mono text-[11px] flex-shrink-0 ${s.dateTxt}`}>{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d0e0f] to-transparent pointer-events-none" />
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[#555] hover:text-[#f0ede6] transition-colors"
      >
        <span className={`transition-transform ${expanded ? "rotate-180" : ""}`}><Icon name="chevron" size={12} /></span>
        {expanded ? "Show less" : `Show all ${TERM_SCHEDULE.length} dates`}
      </button>
    </div>
  );
}

// ─── QUICK LINKS ─────────────────────────────────────────────────────────────

function QuickLinksSection() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="MSBTE Portals" title="Quick Links" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QUICK_LINKS.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-3.5 bg-[#141414] border border-[#2a2a2a] rounded-lg hover:border-[#3a3a3a] transition-all"
          >
            <span
              className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ background: `${link.color}18`, color: link.color }}
            >
              <Icon name={link.icon} size={15} />
            </span>
            <span className="font-['Cabinet_Grotesk'] text-[13px] font-medium text-[#f0ede6] flex-1 leading-snug">{link.label}</span>
            <span className="text-[#444] group-hover:text-[#888] transition-colors flex-shrink-0">
              <Icon name="external" size={12} />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── FEES TABLE ──────────────────────────────────────────────────────────────

function FeesTable() {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-hidden mb-8">
      <div className="px-4 py-3 border-b border-[#2a2a2a]">
        <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#555]">Fee Reference</div>
      </div>
      <div className="divide-y divide-[#1e1e1e]">
        {FEES.map((f, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <span className="font-['General_Sans'] text-[13px] text-[#888]">{f.item}</span>
            <span className="font-mono text-[12px] text-[#c8f04d]">{f.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RECHECKING GUIDE ────────────────────────────────────────────────────────

function RecheckingSection() {
  const [openStep, setOpenStep] = useState(null);

  return (
    <div className="mb-12">
      <SectionHeader eyebrow="After Results" title="Photocopy & Rechecking Guide" />

      <div className="bg-[#1a1a1a] border border-[#c8f04d]/20 rounded-lg px-4 py-3 mb-6 flex gap-3">
        <span className="text-[#c8f04d] flex-shrink-0 mt-0.5"><Icon name="info" size={14} /></span>
        <p className="font-['General_Sans'] text-[12px] text-[#888] leading-relaxed">
          The rechecking window opens roughly 1–2 days after results are published and stays open for only 2–3 days. Watch msbte.ac.in and your college notice board closely right after results.
        </p>
      </div>

      <div className="space-y-2 mb-8">
        {RECHECKING_STEPS.map((s, i) => {
          const isOpen = openStep === i;
          return (
            <div
              key={i}
              className={`border rounded-lg overflow-hidden transition-all ${isOpen ? "border-[#3a3a3a] bg-[#141414]" : "border-[#2a2a2a] bg-[#0f0f0f]"}`}
            >
              <button
                onClick={() => setOpenStep(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-4 py-3.5 text-left"
              >
                <span className="font-mono text-[11px] text-[#e8453c] flex-shrink-0 w-6">{s.step}</span>
                <span className="font-['Cabinet_Grotesk'] text-[14px] font-semibold text-[#f0ede6] flex-1">{s.title}</span>
                <span className={`text-[#555] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                  <Icon name="chevron" size={14} />
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pl-14 space-y-2">
                  <p className="font-['General_Sans'] text-[13px] text-[#888] leading-relaxed">{s.desc}</p>
                  {s.note && (
                    <div className="bg-[#e8453c]/8 border border-[#e8453c]/20 rounded px-3 py-2">
                      <p className="font-['General_Sans'] text-[12px] text-[#e8453c] leading-relaxed">{s.note}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <FeesTable />

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-4">
        <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#555] mb-3">Apply here when window opens</div>
        <a
          href="https://online.msbte.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-['Cabinet_Grotesk'] text-[13px] font-semibold text-[#4d9ef0] hover:text-[#6db4ff] transition-colors"
        >
          online.msbte.co.in — Student Login
          <Icon name="external" size={12} />
        </a>
        <p className="font-['General_Sans'] text-[11px] text-[#555] mt-1.5">Login with your enrollment number and password (same as exam form login)</p>
      </div>
    </div>
  );
}

// ─── TABS ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "notices", label: "Notices" },
  { id: "calendar", label: "Calendar" },
  { id: "links", label: "Quick Links" },
  { id: "rechecking", label: "Rechecking Guide" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Dates() {
  const [activeTab, setActiveTab] = useState("notices");

  return (
    <div className="min-h-screen bg-[#0d0e0f] text-[#f0ede6]">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#e8453c] mb-3">MSBTE · AY {ACADEMIC_YEAR}</div>
          <h1 className="font-['Clash_Display'] text-5xl font-semibold tracking-tight mb-3">Dates & Deadlines</h1>
          <p className="font-['General_Sans'] text-[15px] text-[#888] max-w-lg leading-relaxed">
            Academic calendar, exam schedule, important deadlines, and a step-by-step rechecking guide — all in one place.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 flex-wrap border-b border-[#2a2a2a] mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-['Cabinet_Grotesk'] text-[13px] font-semibold px-5 py-2.5 border-b-2 -mb-px transition-colors
                ${activeTab === tab.id
                  ? "text-[#f0ede6] border-[#e8453c]"
                  : "text-[#888] border-transparent hover:text-[#f0ede6]"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "notices" && <NoticesSection />}
        {activeTab === "calendar" && <TimelineSection />}
        {activeTab === "links" && <QuickLinksSection />}
        {activeTab === "rechecking" && <RecheckingSection />}

        {/* Footer note */}
        <div className="mt-6 pt-6 border-t border-[#1e1e1e]">
          <p className="font-['General_Sans'] text-[11px] text-[#444] leading-relaxed">
            Dates are based on the official MSBTE Academic Calendar 2025–26 and may be revised. Always verify at{" "}
            <a href="https://msbte.ac.in" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#888] underline underline-offset-2 transition-colors">
              msbte.ac.in
            </a>{" "}
            before acting on any deadline.
          </p>
        </div>
      </div>
    </div>
  );
}