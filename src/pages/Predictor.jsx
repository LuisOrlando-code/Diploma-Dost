import { useState, useCallback } from "react";
import { supabase } from '../lib/supabase';
import {
  Search, AlertTriangle, ChevronDown, TrendingUp, TrendingDown, Minus,
  BookmarkPlus, BookmarkCheck, Info, X
} from "lucide-react";


// ─── constants ─────────────────────────────────────────────────────────────────

// Branches mapped to substrings we expect to find inside `course_name`.
// DTE course names vary slightly year to year (e.g. "Computer Engineering" vs
// "Computer Science and Engineering"), so each branch matches on a few
// case-insensitive fragments. If you find course names in your data that
// aren't being matched, just add another fragment to the relevant array.
const BRANCH_PATTERNS = {
  CS:    ["computer engineering", "computer science"],
  IT:    ["information technology"],
  Mech:  ["mechanical"],
  Civil: ["civil"],
  Elec:  ["electrical"],
  ETC:   ["electronics"],
  AIDS:  ["artificial intelligence and data science"],
  AIML:  ["artificial intelligence and machine learning"],
  Robo:  ["robotics"],
  DS:    ["data science"],
};

const BRANCH_LABELS = {
  CS: "Computer Science", IT: "Information Technology",
  Mech: "Mechanical", Civil: "Civil",
  Elec: "Electrical", ETC: "Electronics & TC",
  AIDS: "AI & Data Science", AIML: "AI & Machine Learning",
  Robo: "Robotics & Automation", DS: "Data Science",
};

const BRANCHES = Object.keys(BRANCH_PATTERNS);

// Category codes as stored in the `cutoffs` table. "G" = General, "L" =
// Ladies-reserved seats. NT-A is commonly referred to as "VJ" in Maharashtra.
// If your table also has DEF/PWD/MI/ORP rows, add them here the same way.
const CATEGORIES = [
  { value: "GOPEN",  label: "Open (General)" },
  { value: "LOPEN",  label: "Open (Ladies)" },
  { value: "GOBC",   label: "OBC (General)" },
  { value: "LOBC",   label: "OBC (Ladies)" },
  { value: "GSC",    label: "SC (General)" },
  { value: "LSC",    label: "SC (Ladies)" },
  { value: "GST",    label: "ST (General)" },
  { value: "LST",    label: "ST (Ladies)" },
  { value: "GNTA",   label: "VJ / NT-A (General)" },
  { value: "LNTA",   label: "VJ / NT-A (Ladies)" },
  { value: "GNTB",   label: "NT-B (General)" },
  { value: "LNTB",   label: "NT-B (Ladies)" },
  { value: "GNTC",   label: "NT-C (General)" },
  { value: "LNTC",   label: "NT-C (Ladies)" },
  { value: "GNTD",   label: "NT-D (General)" },
  { value: "LNTD",   label: "NT-D (Ladies)" },
  { value: "GSEBC",  label: "SEBC (General)" },
  { value: "LSEBC",  label: "SEBC (Ladies)" },
  { value: "EWS",    label: "EWS" },
];

// Cap round "weight" used to pick the most recent round within a year.
const ROUND_WEIGHT = { "I": 1, "I-S2": 1.5, "II": 2 };
const roundWeight = (r) => ROUND_WEIGHT[r] ?? 0;

// How far above the student's percentage we still treat a college's cutoff
// as "in range" — cutoffs shift a bit year to year, so a college whose
// cutoff was just above the student's percentage isn't automatically a no-go.
const PCT_MARGIN = 1.5; // percentage points

// ─── dropdown ──────────────────────────────────────────────────────────────────

function Dropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2
                    px-4 py-3 rounded-lg border bg-[#141414]
                    font-['General_Sans'] text-sm transition-colors duration-150
                    ${value ? "border-[#2a2a2a] text-[#f0ede6]" : "border-[#2a2a2a] text-[#888]"}
                    hover:border-[#888]`}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={14} strokeWidth={2}
          className={`text-[#888] transition-transform duration-150 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 w-full
                          border border-[#2a2a2a] rounded-lg bg-[#141414]
                          shadow-2xl overflow-hidden max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <button key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 font-['General_Sans'] text-sm
                            hover:bg-[#1a1a1a] transition-colors duration-100
                            ${value === opt.value ? "text-[#e8453c]" : "text-[#f0ede6]"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── branch multi-select ────────────────────────────────────────────────────────

function BranchSelect({ selected, onChange }) {
  const toggle = (b) => {
    if (selected.includes(b)) {
      onChange(selected.filter((x) => x !== b));
    } else {
      onChange([...selected, b]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {BRANCHES.map((b) => (
        <button
          key={b}
          onClick={() => toggle(b)}
          className={`flex flex-col items-start gap-0.5 px-3 py-2 rounded-lg
                      border transition-colors duration-150
                      ${selected.includes(b)
                        ? "border-[#e8453c] bg-[#e8453c]/5"
                        : "border-[#2a2a2a] bg-transparent hover:border-[#888] hover:bg-[#141414]"
                      }`}
        >
          <span className={`font-['JetBrains_Mono'] text-[0.75rem] font-bold tracking-wider
                            ${selected.includes(b) ? "text-[#e8453c]" : "text-[#f0ede6]"}`}>
            {b}
          </span>
          <span className="font-['General_Sans'] text-[0.63rem] text-[#888] whitespace-nowrap hidden sm:block">
            {BRANCH_LABELS[b]}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── chance + trend badges ──────────────────────────────────────────────────────

function ChanceBadge({ chance }) {
  const styles = {
    high:     "border-[#e8453c]/40 text-[#e8453c] bg-[#e8453c]/10",
    good:     "border-[#e8453c]/25 text-[#e8453c] bg-[#e8453c]/5",
    reach:    "border-[#2a2a2a] text-[#888] bg-[#1a1a1a]",
  };
  const labels = {
    high: "High Chance",
    good: "Good Chance",
    reach: "Reach",
  };
  return (
    <span className={`font-['JetBrains_Mono'] text-[0.63rem] uppercase tracking-wider
                       border px-2 py-0.5 rounded ${styles[chance]}`}>
      {labels[chance]}
    </span>
  );
}

function TrendBadge({ trend }) {
  if (!trend) return null;
  const config = {
    up:     { Icon: TrendingUp,   text: "Cutoff rose last year (a bit tougher)" },
    down:   { Icon: TrendingDown, text: "Cutoff fell last year (a bit easier)" },
    stable: { Icon: Minus,        text: "Cutoff steady year-on-year" },
  };
  const { Icon, text } = config[trend];
  return (
    <div className="flex items-center gap-1.5 text-[#888]">
      <Icon size={12} strokeWidth={2} />
      <span className="font-['General_Sans'] text-[0.68rem]">{text}</span>
    </div>
  );
}

// ─── result card ───────────────────────────────────────────────────────────────

function ResultCard({ college, isShortlisted, onToggle }) {
  return (
    <div className={`rounded-lg border bg-[#141414] p-5
                     transition-colors duration-150
                     ${isShortlisted
                       ? "border-[#e8453c]/50"
                       : "border-[#2a2a2a] hover:border-[#e8453c]/30"
                     }`}>

      {/* top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="font-['JetBrains_Mono'] text-[0.65rem] text-[#888]
                        tracking-wider uppercase mb-1">
            {college.college_code} · {college.district}
          </p>
          <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6]
                        text-[0.92rem] leading-snug">
            {college.college_name}
          </p>
        </div>

        {/* cutoff percentage */}
        <div className="shrink-0 text-right">
          <p className="font-['JetBrains_Mono'] text-[1.35rem] font-bold
                        text-[#e8453c] leading-none">
            {college.cutoff_percent.toFixed(2)}
            <span className="text-[0.65rem] text-[#888] font-normal ml-0.5">%</span>
          </p>
          <p className="font-['General_Sans'] text-[0.63rem] text-[#888] mt-0.5">
            {college.year} CAP {college.cap_round} cutoff
          </p>
        </div>
      </div>

      {/* course name */}
      <p className="font-['General_Sans'] text-[0.78rem] text-[#888] mb-3 leading-snug">
        {college.course_name}
        {college.cutoff_open != null && (
          <span className="text-[#888]/70"> · merit rank ~{college.cutoff_open.toLocaleString("en-IN")}</span>
        )}
      </p>

      {/* chance + trend */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <ChanceBadge chance={college.chance} />
        <TrendBadge trend={college.trend} />
      </div>

      {/* tags + action */}
      <div className="flex items-center justify-between gap-3
                      pt-3 border-t border-[#2a2a2a]">
        <div className="flex flex-wrap gap-1.5">
          <span className="font-['JetBrains_Mono'] text-[0.63rem] text-[#888]
                           bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
            {college.category}
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.63rem] text-[#888]
                           bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
            CAP {college.cap_round}
          </span>
        </div>

        <button
          onClick={() => onToggle(college)}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md
                      font-['General_Sans'] text-[0.75rem] font-medium
                      border transition-colors duration-150
                      ${isShortlisted
                        ? "border-[#e8453c]/40 text-[#e8453c] bg-[#e8453c]/5 hover:bg-[#e8453c]/10"
                        : "border-[#2a2a2a] text-[#888] hover:border-[#888] hover:text-[#f0ede6]"
                      }`}
        >
          {isShortlisted
            ? <><BookmarkCheck size={13} strokeWidth={2} /> Shortlisted</>
            : <><BookmarkPlus size={13} strokeWidth={2} /> Shortlist</>
          }
        </button>
      </div>
    </div>
  );
}

// ─── shortlist panel ────────────────────────────────────────────────────────────

function ShortlistPanel({ shortlist, onRemove, onClear }) {
  if (shortlist.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 w-80
                    border border-[#e8453c]/30 rounded-xl bg-[#0d0e0f]
                    shadow-2xl overflow-hidden">

      {/* header */}
      <div className="flex items-center justify-between px-4 py-3
                      border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <BookmarkCheck size={14} strokeWidth={2} className="text-[#e8453c]" />
          <span className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-sm">
            My Shortlist
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.65rem] text-[#e8453c]
                           bg-[#e8453c]/10 px-1.5 py-0.5 rounded">
            {shortlist.length}
          </span>
        </div>
        <button
          onClick={onClear}
          className="font-['General_Sans'] text-[0.72rem] text-[#888]
                     hover:text-[#e8453c] transition-colors duration-150"
        >
          Clear all
        </button>
      </div>

      {/* list */}
      <div className="max-h-64 overflow-y-auto">
        {shortlist.map((c, i) => (
          <div key={c.college_code + c.course_name + i}
            className="flex items-center justify-between gap-3
                       px-4 py-3 border-b border-[#1a1a1a] last:border-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888]">
                  #{i + 1}
                </span>
                <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888]">
                  {c.college_code}
                </span>
                <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[#e8453c]">
                  {c.cutoff_percent.toFixed(2)}%
                </span>
              </div>
              <p className="font-['General_Sans'] text-[0.78rem] text-[#f0ede6]
                            truncate leading-snug">
                {c.college_name}
              </p>
              <p className="font-['General_Sans'] text-[0.68rem] text-[#888] truncate">
                {c.course_name} · {c.district}
              </p>
            </div>
            <button
              onClick={() => onRemove(c)}
              className="shrink-0 text-[#888] hover:text-[#e8453c]
                         transition-colors duration-150"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>

      {/* footer hint */}
      <div className="px-4 py-2.5 border-t border-[#2a2a2a]">
        <p className="font-['General_Sans'] text-[0.68rem] text-[#888] leading-relaxed">
          Use this order when filling your DTE option form.
        </p>
      </div>
    </div>
  );
}

// ─── main page ─────────────────────────────────────────────────────────────────

export default function Predictor() {
  const [percentage, setPercentage] = useState("");
  const [branches, setBranches]     = useState([]);
  const [category, setCategory]     = useState("");
  const [searched, setSearched]     = useState(false);
  const [results, setResults]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [shortlist, setShortlist]   = useState([]);

  const percentageNum = parseFloat(percentage);
  const isValidPct = percentage !== "" && !isNaN(percentageNum) && percentageNum >= 0 && percentageNum <= 100;
  const canSearch = isValidPct && branches.length > 0 && category;

  // ── shortlist handlers ──
  const isShortlisted = useCallback(
    (c) => shortlist.some((s) => s.college_code === c.college_code && s.course_name === c.course_name),
    [shortlist]
  );

  const toggleShortlist = useCallback((c) => {
    setShortlist((prev) =>
      prev.some((s) => s.college_code === c.college_code && s.course_name === c.course_name)
        ? prev.filter((s) => !(s.college_code === c.college_code && s.course_name === c.course_name))
        : [...prev, c]
    );
  }, []);

  // ── search ──
  async function handleSearch() {
    if (!canSearch) return;
    setSearched(true);
    setLoading(true);
    setError(null);
    setResults([]);

    // Build an OR filter across course_name fragments for the selected branches.
    const patterns = branches.flatMap((b) => BRANCH_PATTERNS[b]);
    const orFilter = patterns.map((p) => `course_name.ilike.%${p}%`).join(",");

    // Pull the last two years of data for this category + branch selection.
    // We keep anything with cutoff_percent within PCT_MARGIN above the
    // student's percentage so "reach" colleges still show up, even if last
    // year's cutoff was a little above what the student scored.
    const maxCutoff = percentageNum + PCT_MARGIN;

    const { data, error: err } = await supabase
      .from("cutoffs")
      .select("college_code, college_name, district, course_name, category, cap_round, year, cutoff_open, cutoff_percent")
      .eq("category", category)
      .or(orFilter)
      .in("year", [2024, 2025])
      .lte("cutoff_percent", maxCutoff)
      .order("year", { ascending: false });

    if (err) {
      setError("Could not fetch cutoff data. Please try again.");
      setLoading(false);
      return;
    }

    // Group rows by college + course + category so we can compare years.
    const groups = new Map();
    for (const row of data || []) {
      const key = `${row.college_code}__${row.course_name}__${row.category}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(row);
    }

    const transformed = [];
    for (const rows of groups.values()) {
      // Most recent entry first: highest year, then highest cap round.
      rows.sort((a, b) => b.year - a.year || roundWeight(b.cap_round) - roundWeight(a.cap_round));
      const latest = rows[0];
      const previous = rows.find((r) => r.year === latest.year - 1);

      // Skip anything that's actually outside our margin (defensive, in case
      // an older year's row sorted to the front for some reason).
      if (latest.cutoff_percent > maxCutoff) continue;

      // Chance based on how the student's percentage compares to last
      // year's cutoff percentage. If the student scored comfortably above
      // the cutoff, that's a strong sign.
      let chance;
      const buffer = 2; // percentage points
      if (percentageNum >= latest.cutoff_percent + buffer) {
        chance = "high";
      } else if (percentageNum >= latest.cutoff_percent) {
        chance = "good";
      } else {
        chance = "reach";
      }

      // Year-on-year trend: did the cutoff percentage rise (tougher) or fall (easier)?
      let trend = null;
      if (previous) {
        const change = latest.cutoff_percent - previous.cutoff_percent;
        if (Math.abs(change) < 0.5) trend = "stable";
        else trend = change > 0 ? "up" : "down";
      }

      transformed.push({
        college_code: latest.college_code,
        college_name: latest.college_name,
        district: latest.district,
        course_name: latest.course_name,
        category: latest.category,
        cap_round: latest.cap_round,
        year: latest.year,
        cutoff_open: latest.cutoff_open,
        cutoff_percent: latest.cutoff_percent,
        chance,
        trend,
      });
    }

    // Best (highest cutoff / most competitive) colleges the student is
    // still in range for, first.
    transformed.sort((a, b) => b.cutoff_percent - a.cutoff_percent);

    setResults(transformed);
    setLoading(false);
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-20 pb-32">

      {/* header */}
      <div className="mb-10">
        <p className="font-['JetBrains_Mono'] text-[0.7rem] uppercase tracking-[0.12em] text-[#e8453c] mb-3">
          DTE Maharashtra
        </p>
        <h1 className="font-['Clash_Display'] font-semibold text-[#f0ede6]
                       leading-[1.08] text-[clamp(2rem,5vw,3.25rem)] mb-3">
          College Predictor
        </h1>
        <p className="font-['General_Sans'] text-[#888] text-base max-w-[520px] leading-relaxed">
          Enter your diploma percentage, pick your category and preferred
          branches — we'll show colleges from last year's CAP rounds where
          your percentage would have cleared the cutoff, plus how the cutoff
          has moved year on year.
        </p>
      </div>

      {/* disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg
                      border border-[#e8453c]/20 bg-[#e8453c]/5 mb-10">
        <AlertTriangle size={15} strokeWidth={2} className="text-[#e8453c] shrink-0 mt-0.5" />
        <p className="font-['General_Sans'] text-[0.8rem] text-[#888] leading-relaxed">
          Based on actual 2024–2025 DTE Direct Second Year (DSE) CAP cutoff
          percentages — not a live prediction or a guarantee. Cutoffs shift
          every year depending on how many students appear and apply, so use
          this to shortlist and compare, then confirm everything on the
          official DTE Maharashtra CAP portal before filling your option form.
        </p>
      </div>

      {/* form */}
      <div className="flex flex-col gap-6 mb-8">

        {/* percentage + category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
              Your Diploma Percentage
            </label>
            <input
              type="number" min="0" max="100" step="0.01"
              placeholder="e.g. 78.50"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="px-4 py-3 rounded-lg border border-[#2a2a2a] bg-[#141414]
                         font-['General_Sans'] text-sm text-[#f0ede6] placeholder:text-[#888]
                         hover:border-[#888] focus:border-[#e8453c] focus:outline-none
                         transition-colors duration-150
                         [appearance:textfield]
                         [&::-webkit-outer-spin-button]:appearance-none
                         [&::-webkit-inner-spin-button]:appearance-none"
            />
            {percentage && !isValidPct && (
              <p className="font-['General_Sans'] text-[0.72rem] text-[#e8453c]">
                Enter a value between 0 and 100
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
              Category
            </label>
            <Dropdown
              value={category}
              onChange={setCategory}
              placeholder="Select your category"
              options={CATEGORIES}
            />
          </div>
        </div>

        {/* branch multi-select */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
              Preferred Branches
            </label>
            <span className="font-['General_Sans'] text-[0.68rem] text-[#888] opacity-60">
              — pick one or more
            </span>
          </div>
          <BranchSelect selected={branches} onChange={setBranches} />
          {branches.length === 0 && (
            <p className="font-['General_Sans'] text-[0.72rem] text-[#888] opacity-60">
              Select at least one branch
            </p>
          )}
        </div>

      </div>

      {/* search button */}
      <button
        onClick={handleSearch}
        disabled={!canSearch}
        className={`flex items-center gap-2 px-8 py-3 rounded-lg
                    font-['Cabinet_Grotesk'] font-semibold text-sm
                    transition-all duration-150 mb-12
                    ${canSearch
                      ? "bg-[#e8453c] text-white hover:bg-[#d03d35] cursor-pointer"
                      : "bg-[#1a1a1a] text-[#888] border border-[#2a2a2a] cursor-not-allowed"
                    }`}
      >
        <Search size={15} strokeWidth={2} />
        Find Colleges
      </button>

      {/* results */}
      <div>
        {loading && (
          <div className="flex flex-col items-center gap-3 py-20">
            <div className="w-5 h-5 border-2 border-[#e8453c] border-t-transparent rounded-full animate-spin" />
            <p className="font-['General_Sans'] text-[#888] text-sm">Searching cutoff data…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <p className="font-['General_Sans'] text-[#e8453c] text-sm">{error}</p>
          </div>
        )}

        {!searched && !loading && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-12 h-12 rounded-full border border-[#2a2a2a] flex items-center justify-center mb-2">
              <Search size={20} strokeWidth={1.5} className="text-[#888]" />
            </div>
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base">
              Ready when you are
            </p>
            <p className="font-['General_Sans'] text-[#888] text-sm max-w-[320px] leading-relaxed">
              Fill in your diploma percentage, category, and preferred
              branches — then shortlist colleges to plan your option form.
            </p>
          </div>
        )}

        {searched && !loading && !error && results.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-12 h-12 rounded-full border border-[#2a2a2a] flex items-center justify-center mb-2">
              <Info size={20} strokeWidth={1.5} className="text-[#888]" />
            </div>
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base">
              No colleges found
            </p>
            <p className="font-['General_Sans'] text-[#888] text-sm max-w-[320px] leading-relaxed">
              No colleges had a 2024–25 cutoff near {percentage}% for your
              selected branches and category. Try selecting more branches or
              a different category.
            </p>
          </div>
        )}

        {searched && !loading && !error && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-['JetBrains_Mono'] text-[0.7rem] text-[#888] tracking-wider uppercase">
                {results.length} college{results.length !== 1 ? "s" : ""} found
                · {percentage}% · {category}
              </p>
              {shortlist.length > 0 && (
                <p className="font-['General_Sans'] text-[0.75rem] text-[#e8453c]">
                  {shortlist.length} shortlisted
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((c, i) => (
                <ResultCard
                  key={c.college_code + c.course_name + i}
                  college={c}
                  isShortlisted={isShortlisted(c)}
                  onToggle={toggleShortlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* floating shortlist panel */}
      <ShortlistPanel
        shortlist={shortlist}
        onRemove={toggleShortlist}
        onClear={() => setShortlist([])}
      />

    </section>
  );
}