import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Map, Target, Lightbulb, Trophy, PlaySquare, Search, Users, Calendar, GraduationCap, Briefcase, GitBranchIcon, User } from 'lucide-react'

const features = [
  { icon: BookOpen,    label: 'Resources',    desc: 'PYQs, Notes, Syllabus',         path: '/resources',    color: '#f0ad34' },
  { icon: Map,         label: 'Roadmaps',     desc: 'Career paths for CS/IT',         path: '/roadmaps',     color: '#4ade80' },
  { icon: Target,      label: 'Predictor',    desc: 'College admission prediction',   path: '/predictor',    color: '#f87171' },
  { icon: Lightbulb,   label: 'Projects',     desc: 'ITR, Capstone & micro ideas',    path: '/projects',     color: '#a78bfa' },
  { icon: Trophy,      label: 'DSA & CP',     desc: 'LeetCode, Striver, GFG',        path: '/dsa',          color: '#fb923c' },
  { icon: PlaySquare,  label: 'YouTube Hub',  desc: 'Best playlists Sem 1–6',         path: '/youtube',      color: '#f43f5e' },
  { icon: Search,      label: 'Internships',  desc: 'Find & apply guide',             path: '/internships',  color: '#38bdf8' },
  { icon: Users,       label: 'Community',    desc: 'Ask seniors, get answers',       path: '/community',    color: '#34d399' },
  { icon: Calendar,    label: 'MSBTE Dates',  desc: 'Exam & deadline calendar',       path: '/msbte',        color: '#f0ad34' },
  { icon: GraduationCap, label: 'Scholarships', desc: 'EBC, SC/ST, OBC guides',      path: '/scholarships', color: '#c084fc' },
  { icon: Briefcase,   label: 'Placement',    desc: 'Resume & interview prep',        path: '/placement',    color: '#4ade80' },
  { icon: GitBranchIcon,      label: 'Open Source',  desc: 'Contribute to real projects',    path: '/opensource',   color: '#94a3b8' },
]

const stats = [
  { value: '6',    label: 'Branches covered' },
  { value: '13+',  label: 'Feature sections' },
  { value: '100%', label: 'Free forever' },
  { value: '0',    label: 'BS, only facts' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.3
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(240,173,52,0.12) 0%, transparent 70%)',
          zIndex: 0
        }} />

        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center" style={{ zIndex: 1 }}>
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
               style={{ border: '1px solid rgba(240,173,52,0.3)', background: 'rgba(240,173,52,0.08)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            <span className="section-label" style={{ fontSize: '0.65rem' }}>Free & Open Source</span>
          </div>

          <h1 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--text)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Your buddy for all<br />
            <span style={{ color: 'var(--accent)' }}>3 years of diploma</span>
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7
          }}>
            PYQs, career guidance, project ideas, college predictor — everything a diploma CS/IT student needs, in one free platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/resources" className="btn-primary" style={{ fontSize: '0.9rem' }}>
              Explore Resources <ArrowRight size={16} />
            </Link>
            <Link to="/predictor" className="btn-ghost" style={{ fontSize: '0.9rem' }}>
              College Predictor
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent)' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="section-label mb-3 text-center">What's inside</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', textAlign: 'center', marginBottom: '3rem' }}>
          Everything you need, nothing you don't
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {features.map(({ icon: Icon, label, desc, path, color }) => (
            <Link key={path} to={path} className="card p-5 flex flex-col gap-3">
              <div style={{ width: 38, height: 38, borderRadius: '0.6rem', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '4px' }}>
                  {label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {desc}
                </div>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color }}>
                Explore <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="card p-10 text-center" style={{ background: 'linear-gradient(135deg, rgba(240,173,52,0.08) 0%, rgba(240,173,52,0.03) 100%)' }}>
          <div className="section-label mb-3">Open Source</div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
            Built by diploma students, for diploma students
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 1.75rem', lineHeight: 1.7 }}>
            This is an open source project. If it helped you, share it with your classmates — or better, contribute to it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com/piush365/Diploma-Dost" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.85rem' }}>
              <GitBranchIcon size={15} /> View on GitHub
            </a>
            <Link to="/about" className="btn-ghost" style={{ fontSize: '0.85rem' }}>
              <User size={15} /> About the project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
