import { useState, useEffect } from "react";
import { ROADMAPS } from "../data/roadmaps";

const BRANCHES = ["CS", "IT", "Mech", "Civil", "Elec", "ETC"];

const PHASE_STYLES = {
  Foundation: { dot: "bg-[#e8453c]", text: "text-[#e8453c]", border: "border-[#e8453c]/30", bg: "bg-[#e8453c]/5" },
  Core:       { dot: "bg-[#c8f04d]", text: "text-[#c8f04d]", border: "border-[#c8f04d]/30", bg: "bg-[#c8f04d]/5" },
  Advanced:   { dot: "bg-[#4d9ef0]", text: "text-[#4d9ef0]", border: "border-[#4d9ef0]/30", bg: "bg-[#4d9ef0]/5" },
  Career:     { dot: "bg-[#b87aff]", text: "text-[#b87aff]", border: "border-[#b87aff]/30", bg: "bg-[#b87aff]/5" },
};

const NODE_STYLES = {
  core:      "border-[#2a2a2a] hover:border-[#3a3a3a]",
  branch:    "border-[#2a2a2a] border-dashed hover:border-[#3a3a3a]",
  optional:  "border-[#2a2a2a] border-dashed opacity-75 hover:border-[#3a3a3a]",
  milestone: "border-[#e8453c]/40 hover:border-[#e8453c]/70",
};

const RESOURCE_ICONS = {
  yt:       { label: "YouTube", color: "text-[#e8453c]", bg: "bg-[#e8453c]/10" },
  doc:      { label: "Docs",    color: "text-[#4d9ef0]", bg: "bg-[#4d9ef0]/10" },
  practice: { label: "Practice", color: "text-[#c8f04d]", bg: "bg-[#c8f04d]/10" },
};

function ResourceIcon({ type }) {
  if (type === "yt") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
  if (type === "doc") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function NodeDrawer({ node, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!node) return null;
  const phase = PHASE_STYLES[node.phase] || PHASE_STYLES.Foundation;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-[480px] bg-[#141414] border-l border-[#2a2a2a] z-50 overflow-y-auto">
        <div className="sticky top-0 bg-[#141414] border-b border-[#2a2a2a] px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className={`font-mono text-[10px] tracking-widest uppercase mb-1.5 ${phase.text}`}>
              {node.phase} · {node.time}
            </div>
            <h2 className="font-['Clash_Display'] text-xl font-semibold text-[#f0ede6] leading-tight">
              {node.label}
            </h2>
          </div>
          <button onClick={onClose} className="mt-1 text-[#888] hover:text-[#f0ede6] transition-colors flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div>
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#888] mb-2">What is this</div>
            <p className="font-['General_Sans'] text-[14px] text-[#f0ede6] leading-relaxed">{node.description}</p>
          </div>

          <div className={`rounded-md border px-4 py-3 ${phase.border} ${phase.bg}`}>
            <div className={`font-mono text-[9px] tracking-[0.12em] uppercase mb-1.5 ${phase.text}`}>Why this matters</div>
            <p className="font-['General_Sans'] text-[13px] text-[#f0ede6] leading-relaxed">{node.why}</p>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#888] mb-3">Resources</div>
            <div className="space-y-2">
              {node.resources.map((r, i) => {
                const style = RESOURCE_ICONS[r.type] || RESOURCE_ICONS.doc;
                return (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors group"
                  >
                    <span className={`flex-shrink-0 w-7 h-7 rounded flex items-center justify-center ${style.bg} ${style.color}`}>
                      <ResourceIcon type={r.type} />
                    </span>
                    <span className="font-['Cabinet_Grotesk'] text-[13px] font-medium text-[#f0ede6] flex-1 leading-snug">{r.label}</span>
                    <svg className="text-[#555] group-hover:text-[#888] transition-colors flex-shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>

          {node.type === "branch" && (
            <div className="rounded-md border border-[#2a2a2a] border-dashed px-4 py-3">
              <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#888] mb-1">Fork point</div>
              <p className="font-['General_Sans'] text-[12px] text-[#888]">This is a branching point — you can take multiple paths from here. You don't have to choose just one.</p>
            </div>
          )}
          {node.type === "milestone" && (
            <div className="rounded-md border border-[#e8453c]/30 bg-[#e8453c]/5 px-4 py-3">
              <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#e8453c] mb-1">Milestone</div>
              <p className="font-['General_Sans'] text-[12px] text-[#888]">This is a checkpoint — completing this signals you're ready for the next phase.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function RoadmapNode({ node, onClick, isLast }) {
  const phase = PHASE_STYLES[node.phase] || PHASE_STYLES.Foundation;
  const nodeStyle = NODE_STYLES[node.type] || NODE_STYLES.core;
  const isMilestone = node.type === "milestone";
  const isBranch = node.type === "branch";

  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={() => onClick(node)}
        className={`w-full max-w-[420px] text-left rounded-lg border bg-[#141414] p-4 transition-all duration-150 group relative ${nodeStyle} ${isMilestone ? "ring-1 ring-[#e8453c]/20" : ""}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`font-mono text-[9px] tracking-[0.1em] uppercase ${phase.text}`}>{node.phase}</span>
          <span className="font-mono text-[9px] text-[#555]">{node.time}</span>
        </div>

        <div className="flex items-center gap-2">
          {isMilestone && (
            <span className="text-[#e8453c] flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </span>
          )}
          {isBranch && (
            <span className="text-[#888] flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
              </svg>
            </span>
          )}
          <span className="font-['Cabinet_Grotesk'] text-[14px] font-semibold text-[#f0ede6] group-hover:text-white transition-colors">
            {node.label}
          </span>
        </div>

        <div className="mt-2.5 flex items-center gap-3">
          {["yt","doc","practice"].map(type => {
            const count = node.resources.filter(r => r.type === type).length;
            if (!count) return null;
            const s = RESOURCE_ICONS[type];
            return (
              <span key={type} className={`font-mono text-[9px] ${s.color} opacity-60`}>
                {count} {s.label}
              </span>
            );
          })}
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] group-hover:text-[#666] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </button>

      {!isLast && <div className="w-px h-8 bg-[#2a2a2a]" />}
    </div>
  );
}

export default function Roadmaps() {
  const [activeBranch, setActiveBranch] = useState("CS");
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);

  const branchData = ROADMAPS[activeBranch];
  const tracks = branchData?.tracks || [];
  const currentTrack = tracks[activeTrackIdx];
  const nodes = currentTrack?.nodes || [];

  const handleBranchChange = (b) => {
    setActiveBranch(b);
    setActiveTrackIdx(0);
    setSelectedNode(null);
  };

  return (
    <div className="min-h-screen bg-[#0d0e0f] text-[#f0ede6]">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#e8453c] mb-3">Career Paths</div>
          <h1 className="font-['Clash_Display'] text-5xl font-semibold tracking-tight mb-3">Roadmaps</h1>
          <p className="font-['General_Sans'] text-[15px] text-[#888] max-w-lg leading-relaxed">
            Click any block to see what to learn, why it matters, and exactly where to learn it.
          </p>
        </div>

        {/* Branch Tabs */}
        <div className="flex gap-1 flex-wrap border-b border-[#2a2a2a] mb-8">
          {BRANCHES.map((b) => (
            <button
              key={b}
              onClick={() => handleBranchChange(b)}
              className={`font-['Cabinet_Grotesk'] text-[13px] font-semibold px-5 py-2.5 border-b-2 -mb-px transition-colors
                ${activeBranch === b ? "text-[#f0ede6] border-[#e8453c]" : "text-[#888] border-transparent hover:text-[#f0ede6]"}`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Coming Soon */}
        {branchData?.comingSoon ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#555]">Coming Soon</div>
            <h2 className="font-['Clash_Display'] text-3xl font-semibold text-[#333]">{branchData.title} Roadmap</h2>
            <p className="font-['General_Sans'] text-[14px] text-[#555] text-center max-w-xs leading-relaxed">
              We're building detailed roadmaps for all branches. CS and IT are live — others coming soon.
            </p>
          </div>
        ) : (
          <>
            <p className="font-['General_Sans'] text-[14px] text-[#555] mb-6">{branchData.description}</p>

            {/* Track Selector */}
            <div className="flex gap-3 flex-wrap mb-10">
              {tracks.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => { setActiveTrackIdx(i); setSelectedNode(null); }}
                  className={`flex flex-col items-start gap-1 px-4 py-3 rounded-lg border text-left transition-all
                    ${activeTrackIdx === i
                      ? "border-[#e8453c] bg-[#e8453c]/5"
                      : "border-[#2a2a2a] bg-[#141414] hover:border-[#3a3a3a]"}`}
                >
                  <span className={`font-['Cabinet_Grotesk'] text-[13px] font-semibold ${activeTrackIdx === i ? "text-[#e8453c]" : "text-[#f0ede6]"}`}>
                    {t.name}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[#555]">{t.tag}</span>
                </button>
              ))}
            </div>

            {/* Layout */}
            <div className="flex gap-10 items-start">

              {/* Roadmap column */}
              <div className="flex-1">
                {/* Phase legend */}
                <div className="flex items-center gap-6 mb-8 px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-x-auto">
                  {Object.entries(PHASE_STYLES).map(([phase, s], i) => (
                    <div key={phase} className="flex items-center gap-2 flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                      <span className={`font-mono text-[10px] tracking-wide ${s.text}`}>{phase}</span>
                      {i < 3 && <div className="w-6 h-px bg-[#2a2a2a] ml-2" />}
                    </div>
                  ))}
                </div>

                {/* Nodes */}
                <div className="flex flex-col items-center">
                  {nodes.map((node, i) => (
                    <RoadmapNode
                      key={node.id}
                      node={node}
                      onClick={setSelectedNode}
                      isLast={i === nodes.length - 1}
                    />
                  ))}
                  {/* End */}
                  <div className="w-px h-8 bg-[#2a2a2a]" />
                  <div className="w-3 h-3 rounded-full bg-[#b87aff] ring-4 ring-[#b87aff]/20" />
                  <div className="font-mono text-[10px] tracking-widest uppercase text-[#555] mt-3">Job Ready</div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-[180px] flex-shrink-0 sticky top-8 hidden lg:block">
                <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#555] mb-4">Node types</div>
                <div className="space-y-4">
                  {[
                    { type: "core", label: "Core step", desc: "Required for this track" },
                    { type: "branch", label: "Fork", desc: "Multiple valid paths ahead" },
                    { type: "milestone", label: "Milestone", desc: "Career checkpoint" },
                  ].map(item => (
                    <div key={item.type} className="flex gap-2.5">
                      <div className={`mt-1 w-3 h-3 flex-shrink-0 rounded-sm border
                        ${item.type === "core" ? "border-[#2a2a2a] bg-[#1a1a1a]" : ""}
                        ${item.type === "branch" ? "border-[#2a2a2a] border-dashed bg-transparent" : ""}
                        ${item.type === "milestone" ? "border-[#e8453c]/50 bg-[#e8453c]/10" : ""}
                      `} />
                      <div>
                        <div className="font-['Cabinet_Grotesk'] text-[11px] font-semibold text-[#888]">{item.label}</div>
                        <div className="font-['General_Sans'] text-[10px] text-[#555] leading-snug">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 font-mono text-[9px] tracking-[0.12em] uppercase text-[#555] mb-2">Total nodes</div>
                <div className="font-['Clash_Display'] text-3xl font-semibold text-[#f0ede6]">{nodes.length}</div>
                <div className="font-['General_Sans'] text-[11px] text-[#555]">steps in {currentTrack?.name}</div>
              </div>
            </div>
          </>
        )}
      </div>

      {selectedNode && <NodeDrawer node={selectedNode} onClose={() => setSelectedNode(null)} />}
    </div>
  );
}