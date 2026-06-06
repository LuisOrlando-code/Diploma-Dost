// 🚧 Page owner: Yogesh
// TODO: Build out this page — see CONTRIBUTING.md for guidelines

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="section-label mb-4">Projects</div>
      <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
        💡 Projects
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '540px' }}>
        Project ideas for ITR, Capstone, and micro projects. Plus GitHub and Git guide.
      </p>
      {/* 🚧 Coming soon placeholder */}
      <div className="card mt-10 p-8 text-center" style={{ borderStyle: 'dashed' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💡</div>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
          This section is being built. Check back soon!
        </p>
      </div>
    </div>
  )
}
