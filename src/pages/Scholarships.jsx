import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SCHOLARSHIPS = [
  {
    id: "sc-postmatric",
    name: "SC / Neo-Buddhist Post-Matric Scholarship",
    shortName: "SC Post-Matric",
    dept: "Social Justice & Special Assistance",
    categories: ["SC"],
    color: "#e8453c",
    badge: "Full Fee Reimbursement",
    summary: "Covers 100% tuition fees, exam fees, and maintenance allowance for SC and Neo-Buddhist students.",
    eligibility: [
      "Belongs to SC or Neo-Buddhist category",
      "Maharashtra domicile",
      "Family annual income ≤ ₹2,50,000",
      "Studying in a govt-recognised institution",
      "Must pass previous year exam (no back-to-back fails for 2 years)",
      "No other government scholarship being received",
    ],
    benefit: "100% tuition fees + exam fees + maintenance allowance (₹530–₹1,200/month depending on group and hostel/day scholar status)",
    deadline: "Applications open: 30 Jun 2025 | Last date: 30 Jun 2026",
    documents: [
      "Caste Certificate (SC / Neo-Buddhist)",
      "Income Certificate (valid up to March 2026)",
      "Maharashtra Domicile Certificate",
      "Aadhaar Card",
      "Previous year marksheet",
      "Bonafide Certificate from current institution",
      "Bank passbook / cancelled cheque (Aadhaar-seeded account)",
    ],
    applyUrl: "https://mahadbt.maharashtra.gov.in/",
    infoUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AA07C7E01997E4885",
    notes: "No Non-Creamy Layer (NCL) certificate required for SC category. Only income certificate needed.",
  },
  {
    id: "st-freeship",
    name: "Tuition Fee & Exam Fee Freeship for Tribal (ST) Students",
    shortName: "ST Freeship",
    dept: "Tribal Development Dept.",
    categories: ["ST"],
    color: "#f0a843",
    badge: "Full Fee Freeship",
    summary: "Complete tuition and exam fee waiver plus maintenance allowance for Scheduled Tribe students.",
    eligibility: [
      "Belongs to Scheduled Tribe (ST) category",
      "Maharashtra domicile",
      "Family annual income ≤ ₹2,50,000",
      "Minimum 10th pass",
      "Must pass previous year exam (back-to-back 2-year fail = ineligible)",
      "No other government scholarship being received",
    ],
    benefit: "100% tuition fees + exam fees. Maintenance allowance: Hostellers ₹1,200/month (Group 1), Day scholars ₹550/month. Additional: Book grant ₹1,200/year, Study tour ₹1,600/year.",
    deadline: "Applications open: 30 Jun 2025 | Last date: 30 Jun 2026",
    documents: [
      "Caste Certificate (ST)",
      "Income Certificate (valid up to March 2026)",
      "Maharashtra Domicile Certificate",
      "Aadhaar Card",
      "Previous year marksheet",
      "Bonafide Certificate from current institution",
      "Bank passbook / cancelled cheque (Aadhaar-seeded account)",
    ],
    applyUrl: "https://mahadbt.maharashtra.gov.in/",
    infoUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A739268F02CEC37EC",
    notes: "No NCL certificate required for ST students. Hostel students get higher maintenance than day scholars.",
  },
  {
    id: "obc-postmatric",
    name: "Post-Matric Scholarship for OBC Students",
    shortName: "OBC Post-Matric",
    dept: "Other Backward Class Welfare Dept.",
    categories: ["OBC"],
    color: "#4d9ef0",
    badge: "Fee + Maintenance",
    summary: "Tuition fees, exam fees, and maintenance allowance for OBC students in post-matric courses including diploma.",
    eligibility: [
      "Belongs to OBC category",
      "Maharashtra domicile",
      "Family annual income ≤ ₹2,50,000",
      "Studying in a govt-recognised institution (post-matric)",
      "Valid Non-Creamy Layer (NCL) certificate (valid up to March 2026)",
      "No other government scholarship being received",
    ],
    benefit: "Tuition fees + exam fees reimbursement + maintenance allowance. Exact rate depends on course group and hostel/day scholar status.",
    deadline: "Applications open: 30 Jun 2025 | Last date: 30 Jun 2026",
    documents: [
      "OBC Caste Certificate",
      "Non-Creamy Layer (NCL) Certificate (valid up to March 2026) — MANDATORY",
      "Maharashtra Domicile Certificate",
      "Aadhaar Card",
      "Previous year marksheet",
      "Bonafide Certificate from current institution",
      "Bank passbook / cancelled cheque (Aadhaar-seeded account)",
    ],
    applyUrl: "https://mahadbt.maharashtra.gov.in/",
    infoUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AC54E5F6E794BD5C1",
    notes: "NCL certificate is mandatory for OBC. Without it, your application will be rejected. Get it renewed if it expired.",
  },
  {
    id: "ebc-tuition",
    name: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti (EBC)",
    shortName: "EBC Tuition Fee Scholarship",
    dept: "Social Justice & Special Assistance",
    categories: ["Open/General", "EBC"],
    color: "#c8f04d",
    badge: "Open Category",
    summary: "For open-category (general) students with low income who don't fall under any reserved category. Covers tuition and exam fees.",
    eligibility: [
      "Open/General category (not SC/ST/OBC/NT/SBC)",
      "Maharashtra domicile",
      "Family annual income ≤ ₹2,50,000 (EBC threshold)",
      "Studying in a govt-recognised institution",
      "Not receiving any other government scholarship",
    ],
    benefit: "Tuition fees + examination fees reimbursement. Maintenance allowance also provided based on course.",
    deadline: "Applications open: 30 Jun 2025 | Last date: 30 Jun 2026",
    documents: [
      "Income Certificate (annual income ≤ ₹2,50,000) — issued by tehsildar or above",
      "Maharashtra Domicile Certificate",
      "Aadhaar Card",
      "Previous year marksheet",
      "Bonafide Certificate from current institution",
      "Bank passbook / cancelled cheque (Aadhaar-seeded account)",
      "No caste certificate needed, but income proof is mandatory",
    ],
    applyUrl: "https://mahadbt.maharashtra.gov.in/",
    infoUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A668ED132B54E2162E54C475F826D85C79DA948301E5F7772",
    notes: "This is specifically for open-category students who are economically weak but don't qualify under reserved categories. You cannot apply if you're already receiving any other state/central scholarship.",
  },
  {
    id: "minority-postmatric",
    name: "Scholarship for Minority Community Students (Post-Matric)",
    shortName: "Minority Scholarship",
    dept: "Minority Development Dept.",
    categories: ["Minority"],
    color: "#b87aff",
    badge: "Minority Communities",
    summary: "For Muslim, Christian, Buddhist, Sikh, Jain, and Parsi students. Covers fees and maintenance.",
    eligibility: [
      "Belongs to notified minority community (Muslim, Christian, Buddhist, Sikh, Jain, Parsi, Jews)",
      "Maharashtra domicile",
      "Family annual income ≤ ₹8,00,000 (centrally sponsored) or ≤ ₹1,00,000 (state-funded — check specific scheme)",
      "Minimum 50% marks in previous qualifying exam",
      "Admission through CET / competitive exam / HSC marks",
      "30% seats reserved for girl students",
    ],
    benefit: "Total annual course fee OR ₹50,000 — whichever is less. Higher maintenance for hostel students.",
    deadline: "Applications open: 30 Jun 2025 | Last date: 30 Jun 2026",
    documents: [
      "Community/Minority Certificate from relevant religious authority or govt-issued document",
      "Income Certificate",
      "Maharashtra Domicile Certificate",
      "Aadhaar Card",
      "Previous year marksheet (showing ≥50%)",
      "Bonafide Certificate from current institution",
      "Bank passbook / cancelled cheque (Aadhaar-seeded account)",
      "CET/admission proof",
    ],
    applyUrl: "https://mahadbt.maharashtra.gov.in/",
    infoUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A61FF7871E24FE19D",
    notes: "Income limit varies: state-funded minority schemes cap at ₹1 lakh; centrally sponsored cap at ₹2.5 lakh or ₹8 lakh. Verify the exact scheme on MahaDBT. Two overlapping minority schemes cannot be applied simultaneously.",
  },
  {
    id: "vjnt-sbc",
    name: "VJNT & SBC Maintenance Allowance",
    shortName: "VJNT / SBC Allowance",
    dept: "Vjnt, OBC & SBC Welfare Dept.",
    categories: ["VJNT", "SBC"],
    color: "#e8453c",
    badge: "Hostel Students",
    summary: "Maintenance allowance for VJNT and SBC students studying in professional courses and living in hostels attached to colleges.",
    eligibility: [
      "Belongs to VJNT (Vimukta Jati, Nomadic Tribes) or SBC category",
      "Maharashtra domicile",
      "Studying in a professional course (diploma/degree)",
      "Living in hostel attached to the professional college",
      "Valid NCL Certificate (valid up to March 2026)",
    ],
    benefit: "Monthly maintenance allowance (amount varies — check MahaDBT for latest rates).",
    deadline: "Applications open: 30 Jun 2025 | Last date: 30 Jun 2026",
    documents: [
      "VJNT / SBC Caste Certificate",
      "Non-Creamy Layer (NCL) Certificate (valid up to March 2026)",
      "Maharashtra Domicile Certificate",
      "Aadhaar Card",
      "Hostel allotment letter from college",
      "Bank passbook / cancelled cheque (Aadhaar-seeded account)",
    ],
    applyUrl: "https://mahadbt.maharashtra.gov.in/",
    infoUrl: "https://mahadbt.maharashtra.gov.in/",
    notes: "Only for students living in hostels attached to their professional college — not private accommodations.",
  },
  {
    id: "girls-obc-tuition",
    name: "Tuition Fee & Exam Fee for OBC Girls (Professional Courses)",
    shortName: "OBC Girls Fee Scheme",
    dept: "OBC Welfare Dept.",
    categories: ["OBC"],
    color: "#4d9ef0",
    badge: "Girls Only",
    summary: "100% tuition fee and exam fee reimbursement for OBC girls pursuing professional courses including diploma.",
    eligibility: [
      "Female student",
      "Belongs to OBC category",
      "Maharashtra domicile",
      "Pursuing a professional course (diploma qualifies)",
      "Valid NCL Certificate (valid up to March 2026)",
      "No income limit specified — check MahaDBT for current year",
    ],
    benefit: "100% tuition fees + exam fees reimbursement.",
    deadline: "Applications open: 30 Jun 2025 | Last date: 30 Jun 2026",
    documents: [
      "OBC Caste Certificate",
      "Non-Creamy Layer (NCL) Certificate (valid up to March 2026)",
      "Maharashtra Domicile Certificate",
      "Aadhaar Card",
      "Previous year marksheet",
      "Bonafide Certificate from current institution",
      "Bank passbook / cancelled cheque",
    ],
    applyUrl: "https://mahadbt.maharashtra.gov.in/",
    infoUrl: "https://mahadbt.maharashtra.gov.in/",
    notes: "This is a separate, additional scheme for OBC girls on top of the regular OBC post-matric scholarship. Check if you can apply for both on MahaDBT.",
  },
];

const HOW_TO_APPLY_STEPS = [
  {
    n: "01",
    title: "Register on MahaDBT",
    desc: "Go to mahadbt.maharashtra.gov.in → New Applicant Registration. Use your Aadhaar number. One registration covers all schemes.",
  },
  {
    n: "02",
    title: "Complete your profile",
    desc: "Fill in personal details, academic details, caste/category, and bank account info. Everything must match your documents exactly — even one spelling mismatch causes rejection.",
  },
  {
    n: "03",
    title: "Link Aadhaar to your bank account",
    desc: "Your bank account must be Aadhaar-seeded for DBT transfer. If your bank hasn't done this, visit your branch or the nearest India Post Payments Bank (IPPB) — they do it instantly.",
  },
  {
    n: "04",
    title: "Select your scheme(s)",
    desc: "Browse the scheme list and select the scholarship that matches your category. You can only receive one scholarship at a time — choose the most beneficial one.",
  },
  {
    n: "05",
    title: "Upload documents",
    desc: "Scan each document clearly (not blurry photos). File size must be under 200 KB per document. Use a scanner app like CamScanner if needed.",
  },
  {
    n: "06",
    title: "Submit and note your application ID",
    desc: "Submit the application and screenshot or write down your application ID. You'll need it to follow up.",
  },
  {
    n: "07",
    title: "Get institute verification",
    desc: "Visit your college exam/scholarship office and tell them to verify your application online (Principal/Institute login on MahaDBT). Without this, your application doesn't move forward. This is the most skipped step.",
  },
  {
    n: "08",
    title: "Track your application",
    desc: "Log back into MahaDBT to track status. New granular tracking shows every stage. If stuck, contact your institute or the RBTE regional office.",
  },
];

const COMMON_MISTAKES = [
  {
    title: "Name mismatch across documents",
    desc: "Your name on Aadhaar, bank account, and marksheet must be identical. Even 'Ravi' vs 'Ravindra' causes rejection. Fix before applying.",
  },
  {
    title: "Expired NCL / income certificate",
    desc: "OBC/VJNT/SBC students: your Non-Creamy Layer certificate must be valid up to March 2026. Get it renewed at your tehsil office if expired.",
  },
  {
    title: "Institute doesn't verify in time",
    desc: "Your college must confirm your application before the deadline. Go in person and follow up — don't assume they'll do it automatically.",
  },
  {
    title: "Applying to two overlapping schemes",
    desc: "You can only receive one government scholarship. Applying to multiple overlapping schemes results in cancellation of both.",
  },
  {
    title: "Bank account not Aadhaar-seeded",
    desc: "If your bank account isn't linked to Aadhaar, payment won't come through DBT. Visit your bank or open an IPPB account.",
  },
  {
    title: "Applying at the last minute",
    desc: "MahaDBT crashes near deadlines. Apply at least 3 weeks before the closing date. Seriously.",
  },
];

const QUICK_LINKS = [
  { label: "MahaDBT Portal — Apply Here", url: "https://mahadbt.maharashtra.gov.in/", color: "#e8453c" },
  { label: "MahaDBT Student Login", url: "https://mahadbt.maharashtra.gov.in/Login/Login", color: "#4d9ef0" },
  { label: "Track Your Application", url: "https://mahadbt.maharashtra.gov.in/", color: "#c8f04d" },
  { label: "All Schemes List", url: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeList", color: "#b87aff" },
];

// ─── FINDER WIZARD ───────────────────────────────────────────────────────────

const CATEGORY_OPTIONS = ["SC", "ST", "OBC", "VJNT", "SBC", "Minority", "Open/General (EBC)"];
const GENDER_OPTIONS = ["Male", "Female"];

function ScholarshipFinder({ onSelect }) {
  const [category, setCategory] = useState(null);
  const [gender, setGender] = useState(null);
  const [income, setIncome] = useState(null);
  const [results, setResults] = useState(null);

  const find = () => {
    let matched = SCHOLARSHIPS.filter((s) => {
      if (!category) return true;
      const cat = category.replace(" (EBC)", "");
      return s.categories.some((c) => c === cat || c === "Open/General" || (cat === "Open/General" && c === "EBC"));
    });

    if (category === "Open/General (EBC)") {
      matched = SCHOLARSHIPS.filter((s) => s.categories.includes("Open/General") || s.categories.includes("EBC"));
    } else if (category === "OBC" && gender === "Female") {
      matched = SCHOLARSHIPS.filter((s) => s.categories.includes("OBC"));
    } else if (category) {
      matched = SCHOLARSHIPS.filter((s) => s.categories.includes(category));
    }

    setResults(matched);
  };

  const reset = () => { setCategory(null); setGender(null); setIncome(null); setResults(null); };

  if (results) {
    return (
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="font-mono text-[9px] tracking-widest uppercase text-[#555] mb-1">Finder Results</div>
            <div className="font-['Cabinet_Grotesk'] text-[15px] font-semibold text-[#f0ede6]">
              {results.length} scheme{results.length !== 1 ? "s" : ""} found for {category}
            </div>
          </div>
          <button onClick={reset} className="font-mono text-[10px] tracking-widest uppercase text-[#555] hover:text-[#f0ede6] transition-colors border border-[#2a2a2a] px-3 py-1.5 rounded">
            ← Start over
          </button>
        </div>
        {results.length === 0 ? (
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6 text-center">
            <p className="font-['General_Sans'] text-[13px] text-[#555]">No specific schemes found. Browse all schemes below.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelect(s)}
                className="w-full text-left bg-[#141414] border border-[#2a2a2a] hover:border-[#3a3a3a] rounded-lg p-4 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                        style={{ color: s.color, background: `${s.color}18`, border: `1px solid ${s.color}40` }}>
                        {s.badge}
                      </span>
                    </div>
                    <div className="font-['Cabinet_Grotesk'] text-[14px] font-semibold text-[#f0ede6] group-hover:text-white transition-colors mb-1">{s.shortName}</div>
                    <p className="font-['General_Sans'] text-[12px] text-[#888] leading-relaxed">{s.summary}</p>
                  </div>
                  <svg className="text-[#444] group-hover:text-[#888] transition-colors flex-shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
      <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#555] mb-4">Answer 2 questions</div>

      <div className="space-y-5">
        <div>
          <div className="font-['Cabinet_Grotesk'] text-[13px] font-semibold text-[#f0ede6] mb-2.5">What is your category?</div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`font-mono text-[11px] tracking-wide px-3 py-1.5 rounded border transition-all
                  ${category === c ? "border-[#e8453c] text-[#e8453c] bg-[#e8453c]/8" : "border-[#2a2a2a] text-[#888] hover:border-[#3a3a3a] hover:text-[#f0ede6]"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="font-['Cabinet_Grotesk'] text-[13px] font-semibold text-[#f0ede6] mb-2.5">Gender?</div>
          <div className="flex gap-2">
            {GENDER_OPTIONS.map((g) => (
              <button key={g} onClick={() => setGender(g)}
                className={`font-mono text-[11px] tracking-wide px-3 py-1.5 rounded border transition-all
                  ${gender === g ? "border-[#c8f04d] text-[#c8f04d] bg-[#c8f04d]/8" : "border-[#2a2a2a] text-[#888] hover:border-[#3a3a3a] hover:text-[#f0ede6]"}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={find}
        disabled={!category || !gender}
        className={`mt-5 w-full py-2.5 rounded-lg font-['Cabinet_Grotesk'] text-[13px] font-semibold transition-all
          ${category && gender
            ? "bg-[#e8453c] text-white hover:bg-[#d13530]"
            : "bg-[#1a1a1a] text-[#444] cursor-not-allowed border border-[#2a2a2a]"}`}
      >
        Find my scholarships →
      </button>
    </div>
  );
}

// ─── SCHEME DETAIL DRAWER ────────────────────────────────────────────────────

function SchemeDrawer({ scheme, onClose }) {
  if (!scheme) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-[500px] bg-[#141414] border-l border-[#2a2a2a] z-50 overflow-y-auto">
        <div className="sticky top-0 bg-[#141414] border-b border-[#2a2a2a] px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <span className="inline-block font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full mb-2"
              style={{ color: scheme.color, background: `${scheme.color}18`, border: `1px solid ${scheme.color}40` }}>
              {scheme.badge}
            </span>
            <h2 className="font-['Clash_Display'] text-[18px] font-semibold text-[#f0ede6] leading-snug">{scheme.shortName}</h2>
            <div className="font-mono text-[9px] tracking-wide text-[#555] mt-1">{scheme.dept}</div>
          </div>
          <button onClick={onClose} className="mt-1 text-[#888] hover:text-[#f0ede6] transition-colors flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <p className="font-['General_Sans'] text-[13px] text-[#888] leading-relaxed">{scheme.summary}</p>

          {/* Benefit */}
          <div className="rounded-lg border px-4 py-3" style={{ borderColor: `${scheme.color}30`, background: `${scheme.color}08` }}>
            <div className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: scheme.color }}>What you get</div>
            <p className="font-['General_Sans'] text-[13px] text-[#f0ede6] leading-relaxed">{scheme.benefit}</p>
          </div>

          {/* Eligibility */}
          <div>
            <div className="font-mono text-[9px] tracking-widest uppercase text-[#555] mb-3">Eligibility Criteria</div>
            <div className="space-y-2">
              {scheme.eligibility.map((e, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3a3a3a] flex-shrink-0 mt-1.5" />
                  <span className="font-['General_Sans'] text-[13px] text-[#888] leading-snug">{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <div className="font-mono text-[9px] tracking-widest uppercase text-[#555] mb-3">Documents Required</div>
            <div className="space-y-1.5">
              {scheme.documents.map((d, i) => (
                <div key={i} className="flex gap-2.5 items-start bg-[#1a1a1a] rounded px-3 py-2">
                  <span className="font-mono text-[10px] text-[#444] flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-['General_Sans'] text-[12px] text-[#888] leading-snug">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {scheme.notes && (
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-3">
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#555] mb-1.5">Important Note</div>
              <p className="font-['General_Sans'] text-[12px] text-[#c8f04d] leading-relaxed">{scheme.notes}</p>
            </div>
          )}

          {/* Deadline */}
          <div className="bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#2a2a2a]">
            <div className="font-mono text-[9px] tracking-widest uppercase text-[#555] mb-1">AY 2025–26 Deadline</div>
            <p className="font-['Cabinet_Grotesk'] text-[13px] font-semibold text-[#f0ede6]">{scheme.deadline}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 flex-wrap">
            <a href={scheme.applyUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 min-w-[140px] text-center py-2.5 rounded-lg font-['Cabinet_Grotesk'] text-[13px] font-semibold bg-[#e8453c] text-white hover:bg-[#d13530] transition-colors">
              Apply on MahaDBT →
            </a>
            <a href={scheme.infoUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 min-w-[140px] text-center py-2.5 rounded-lg font-['Cabinet_Grotesk'] text-[13px] font-semibold border border-[#2a2a2a] text-[#888] hover:text-[#f0ede6] hover:border-[#3a3a3a] transition-colors">
              Scheme Details →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TABS ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "finder", label: "Find Mine" },
  { id: "all", label: "All Schemes" },
  { id: "howto", label: "How to Apply" },
  { id: "mistakes", label: "Common Mistakes" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Scholarships() {
  const [activeTab, setActiveTab] = useState("finder");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [openMistake, setOpenMistake] = useState(null);

  return (
    <div className="min-h-screen bg-[#0d0e0f] text-[#f0ede6]">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#e8453c] mb-3">MahaDBT · AY 2025–26</div>
          <h1 className="font-['Clash_Display'] text-5xl font-semibold tracking-tight mb-3">Scholarships</h1>
          <p className="font-['General_Sans'] text-[15px] text-[#888] max-w-lg leading-relaxed">
            Every major Maharashtra government scholarship for diploma students — eligibility, documents, deadlines, and how to apply without getting rejected.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#c8f04d]/8 border border-[#c8f04d]/20 rounded px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c8f04d]" />
            <span className="font-mono text-[10px] tracking-wide text-[#c8f04d]">AY 2025–26 applications open until 30 Jun 2026</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 flex-wrap border-b border-[#2a2a2a] mb-10">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`font-['Cabinet_Grotesk'] text-[13px] font-semibold px-5 py-2.5 border-b-2 -mb-px transition-colors
                ${activeTab === tab.id ? "text-[#f0ede6] border-[#e8453c]" : "text-[#888] border-transparent hover:text-[#f0ede6]"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* FINDER TAB */}
        {activeTab === "finder" && (
          <div className="space-y-8">
            <ScholarshipFinder onSelect={(s) => { setSelectedScheme(s); }} />
            <div className="pt-4 border-t border-[#1e1e1e]">
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#555] mb-3">Or jump straight to a scheme</div>
              <div className="flex flex-wrap gap-2">
                {SCHOLARSHIPS.map((s) => (
                  <button key={s.id} onClick={() => setSelectedScheme(s)}
                    className="font-mono text-[10px] tracking-wide px-2.5 py-1.5 rounded border border-[#2a2a2a] text-[#555] hover:text-[#f0ede6] hover:border-[#3a3a3a] transition-all">
                    {s.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ALL SCHEMES TAB */}
        {activeTab === "all" && (
          <div className="space-y-3">
            {SCHOLARSHIPS.map((s) => (
              <button key={s.id} onClick={() => setSelectedScheme(s)}
                className="w-full text-left bg-[#141414] border border-[#2a2a2a] hover:border-[#3a3a3a] rounded-lg p-4 transition-all group">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0 mt-1" style={{ background: s.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                        style={{ color: s.color, background: `${s.color}18`, border: `1px solid ${s.color}40` }}>
                        {s.badge}
                      </span>
                      <span className="font-mono text-[9px] text-[#444]">{s.dept}</span>
                    </div>
                    <div className="font-['Cabinet_Grotesk'] text-[14px] font-semibold text-[#f0ede6] group-hover:text-white transition-colors mb-1">{s.name}</div>
                    <p className="font-['General_Sans'] text-[12px] text-[#888] leading-relaxed">{s.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.categories.map((c) => (
                        <span key={c} className="font-mono text-[9px] text-[#555] bg-[#1a1a1a] px-2 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                  </div>
                  <svg className="text-[#444] group-hover:text-[#888] transition-colors flex-shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </button>
            ))}

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-[#1e1e1e]">
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#555] mb-3">MahaDBT Portal Links</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_LINKS.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 bg-[#141414] border border-[#2a2a2a] rounded-lg hover:border-[#3a3a3a] transition-all group">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: l.color }} />
                    <span className="font-['Cabinet_Grotesk'] text-[12px] font-medium text-[#888] group-hover:text-[#f0ede6] transition-colors flex-1">{l.label}</span>
                    <svg className="text-[#444] group-hover:text-[#777]" width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HOW TO APPLY TAB */}
        {activeTab === "howto" && (
          <div>
            <div className="space-y-3 mb-8">
              {HOW_TO_APPLY_STEPS.map((s, i) => (
                <div key={i} className="flex gap-4 bg-[#141414] border border-[#2a2a2a] rounded-lg p-4">
                  <span className="font-mono text-[11px] text-[#e8453c] flex-shrink-0 w-6 mt-0.5">{s.n}</span>
                  <div>
                    <div className="font-['Cabinet_Grotesk'] text-[14px] font-semibold text-[#f0ede6] mb-1">{s.title}</div>
                    <p className="font-['General_Sans'] text-[13px] text-[#888] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#1a1a1a] border border-[#c8f04d]/20 rounded-lg p-4">
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#c8f04d] mb-2">Pro tip</div>
              <p className="font-['General_Sans'] text-[13px] text-[#888] leading-relaxed">
                Apply at least 3 weeks before the deadline. MahaDBT servers overload close to closing dates. Early applicants also have more time to fix document issues.
              </p>
            </div>
          </div>
        )}

        {/* MISTAKES TAB */}
        {activeTab === "mistakes" && (
          <div className="space-y-2">
            {COMMON_MISTAKES.map((m, i) => {
              const isOpen = openMistake === i;
              return (
                <div key={i} className={`border rounded-lg overflow-hidden transition-all ${isOpen ? "border-[#3a3a3a] bg-[#141414]" : "border-[#2a2a2a] bg-[#0f0f0f]"}`}>
                  <button onClick={() => setOpenMistake(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-4 py-3.5 text-left">
                    <span className="font-mono text-[11px] text-[#e8453c] flex-shrink-0">✕</span>
                    <span className="font-['Cabinet_Grotesk'] text-[14px] font-semibold text-[#f0ede6] flex-1">{m.title}</span>
                    <svg className={`text-[#555] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pl-10">
                      <p className="font-['General_Sans'] text-[13px] text-[#888] leading-relaxed">{m.desc}</p>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-6 bg-[#141414] border border-[#2a2a2a] rounded-lg p-4">
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#555] mb-2">Remember</div>
              <p className="font-['General_Sans'] text-[13px] text-[#555] leading-relaxed">
                You can only hold one government scholarship at a time. Choose the one with the highest benefit for your category. Applying to multiple overlapping schemes cancels both.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-[#1e1e1e]">
          <p className="font-['General_Sans'] text-[11px] text-[#444] leading-relaxed">
            Data based on MahaDBT official portal and AY 2025–26 guidelines. Always verify eligibility and deadlines at{" "}
            <a href="https://mahadbt.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#888] underline underline-offset-2 transition-colors">
              mahadbt.maharashtra.gov.in
            </a>{" "}
            before applying.
          </p>
        </div>
      </div>

      {selectedScheme && <SchemeDrawer scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />}
    </div>
  );
}