import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, FileText, PlayCircle, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

const DEBOUNCE_MS = 250
const MAX_RESULTS = 5

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('')
  const [allData, setAllData] = useState({ resources: [], playlists: [] })
  const [results, setResults] = useState({ resources: [], playlists: [] })
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    async function fetchAll() {
      try {
      const [res, pl] = await Promise.all([
        supabase
          .from('resources')
          .select('id, subject_name, course_code, semester, branch, type, drive_link'),
        supabase
          .from('playlists')
          .select('id, subject, channel_name, semester, branch, playlist_url, thumbnail_url'),
      ])

      if (cancelled) return

      if (res.error || pl.error) {
        console.error('Supabase fetch error:', res.error || pl.error)
        setError('Failed to load search data.')
        return
      }

      setAllData({
        resources: res.data || [],
        playlists: pl.data || [],
      })
    } catch (err) {
      console.error('Search fetch failed:', err)
      if (!cancelled) setError('Failed to load search data.')
    } finally {
        if (!cancelled) setLoading(false)
    }
  }

    fetchAll()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const q = query.trim()

    if (!q) {
      const id = setTimeout(() => {
        setResults({ resources: [], playlists: [] })
        setIsOpen(false)
      }, 0)
      return () => clearTimeout(id)
    }

    const timer = setTimeout(() => {
      const lower = q.toLowerCase()

      const matchedResources = allData.resources.filter(r =>
        r.subject_name?.toLowerCase().includes(lower) ||
        r.branch?.toLowerCase().includes(lower) ||
        String(r.semester).includes(lower)
      ).slice(0, MAX_RESULTS)

      const matchedPlaylists = allData.playlists.filter(p =>
        p.subject?.toLowerCase().includes(lower) ||
        p.channel_name?.toLowerCase().includes(lower) ||
        p.branch?.toLowerCase().includes(lower) ||
        String(p.semester).includes(lower)
      ).slice(0, MAX_RESULTS)

      setResults({ resources: matchedResources, playlists: matchedPlaylists })
      setIsOpen(true)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [query, allData])

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        setIsOpen(false)
        onClose?.()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const goTo = useCallback((path) => {
    navigate(path)
    setQuery('')
    setIsOpen(false)
    onClose?.()
  }, [navigate, onClose])

  const hasResults = results.resources.length > 0 || results.playlists.length > 0
  const noResults = query.trim().length > 0 && !loading && !hasResults

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#2a2a2a] bg-[#141414] focus-within:border-[#e8453c] transition-colors duration-150">
        <Search size={15} className="text-[#555] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources, playlists…"
          aria-label="Search resources and playlists"
          className="bg-transparent border-none outline-none text-[#f0ede6] text-sm font-['General_Sans'] w-full placeholder:text-[#555]"
          onFocus={() => query.trim() && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            aria-label="Clear search"
            className="text-[#555] hover:text-[#888] transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#141414] border border-[#2a2a2a] rounded-lg shadow-xl max-h-[400px] overflow-y-auto z-50">

          {loading && (
            <div className="px-4 py-6 text-center text-[#555] text-sm font-['General_Sans']">
              Loading data…
            </div>
          )}
          {error && (
            <div className="px-4 py-6 text-center text-[#e8453c] text-sm font-['General_Sans']">
              {error}
            </div>
          )}
          {noResults && (
            <div className="px-4 py-6 text-center text-[#555] text-sm font-['General_Sans']">
              No results found for &quot;<span className="text-[#888]">{query}</span>&quot;
            </div>
          )}

          {!loading && results.resources.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.12em] text-[#555] font-bold">
                Resources
              </div>
              {results.resources.map(r => (
                <button
                  key={r.id}
                  onClick={() => goTo('/resources')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors duration-100 text-left"
                >
                  <FileText size={16} className="text-[#e8453c] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[#f0ede6] text-sm font-['General_Sans'] truncate">
                      {r.subject_name}
                    </p>
                    <p className="text-[#555] text-xs font-['JetBrains_Mono']">
                      {r.branch} · Sem {r.semester} · {r.type}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && results.playlists.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.12em] text-[#555] font-bold">
                Playlists
              </div>
              {results.playlists.map(p => (
                <button
                  key={p.id}
                  onClick={() => goTo('/youtube')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors duration-100 text-left"
                >
                  <PlayCircle size={16} className="text-[#e8453c] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[#f0ede6] text-sm font-['General_Sans'] truncate">
                      {p.subject}
                    </p>
                    <p className="text-[#555] text-xs font-['JetBrains_Mono']">
                      {p.branch} · Sem {p.semester}
                      {p.channel_name ? ` · ${p.channel_name}` : ''}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  )
}
