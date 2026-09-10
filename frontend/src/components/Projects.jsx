import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react'

const projectsData = [
  {
    id: 'yvkgG8OMBpo',
    title: 'Aditya & Yuganti',
    category: 'wedding film',
  },
  {
    id: 'LJcCLDGfRRQ',
    title: 'Alina & Mikhail',
    category: 'wedding highlight',
  },
  {
    id: 'kBLA8qoySxw',
    title: 'Cinematic Wedding Film',
    category: 'wedding highlight',
  },
  {
    id: 'tOzeT1M-UTU',
    title: 'Pre-Wedding Highlight',
    category: 'wedding highlight',
  },
  {
    id: 'KVaz52AA3T0',
    title: 'Same-Day Edit (SDE)',
    category: 'wedding highlight',
  },
  {
    id: '-0DRCtDstTk',
    title: 'Wedding Teaser / Trailer',
    category: 'wedding highlight',
  },
  {
    id: 'xEUhY6e0slo',
    title: 'Instagram & Reels Edit',
    category: 'wedding teaser',
  },
  {
    id: 'PoQqR07nhyI',
    title: 'Full Wedding Documentary',
    category: 'pre wedding teaser',
  },
]

function Projects() {
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [layout, setLayout] = useState({ rows: 2, columns: 1 })
  const carouselRef = useRef(null)
  const scrollFrameRef = useRef(null)

  const visibleCount = layout.rows * layout.columns
  const totalColumns = Math.ceil(projectsData.length / layout.rows)
  const maxIndex = Math.max(0, totalColumns - layout.columns) * layout.rows

  const goToIndex = useCallback((index) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const cards = [...carousel.querySelectorAll('.project-card')]
    const columnIndex = Math.floor(index / layout.rows)
    const nextIndex = Math.max(0, Math.min(columnIndex * layout.rows, maxIndex))
    const targetCard = cards[nextIndex]
    if (!targetCard || !cards[0]) return

    carousel.scrollTo({
      left: targetCard.offsetLeft - cards[0].offsetLeft,
      behavior: 'smooth',
    })
    setCurrentIndex(nextIndex)
  }, [layout.rows, maxIndex])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let resizeFrame
    const measure = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        const nextLayout = window.innerWidth < 640
          ? { rows: 2, columns: 1 }
          : window.innerWidth < 1024
            ? { rows: 1, columns: 2 }
            : window.innerWidth < 1280
              ? { rows: 2, columns: 3 }
              : { rows: 2, columns: 4 }

        setLayout((current) => (
          current.rows === nextLayout.rows && current.columns === nextLayout.columns
            ? current
            : nextLayout
        ))
      })
    }

    window.addEventListener('resize', measure)
    measure()

    return () => {
      cancelAnimationFrame(resizeFrame)
      cancelAnimationFrame(scrollFrameRef.current)
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    const nextIndex = Math.min(currentIndex, maxIndex)
    if (nextIndex === currentIndex) return

    const alignmentFrame = requestAnimationFrame(() => goToIndex(nextIndex))
    return () => cancelAnimationFrame(alignmentFrame)
  }, [currentIndex, maxIndex, goToIndex])

  const handleScroll = () => {
    cancelAnimationFrame(scrollFrameRef.current)
    scrollFrameRef.current = requestAnimationFrame(() => {
      const carousel = carouselRef.current
      if (!carousel) return

      const cards = [...carousel.querySelectorAll('.project-card')]
      if (!cards.length) return

      const firstOffset = cards[0].offsetLeft
      const nearestIndex = cards.reduce((nearest, card, index) => {
        const distance = Math.abs(card.offsetLeft - firstOffset - carousel.scrollLeft)
        const nearestDistance = Math.abs(cards[nearest].offsetLeft - firstOffset - carousel.scrollLeft)
        return distance < nearestDistance ? index : nearest
      }, 0)

      setCurrentIndex(Math.min(nearestIndex, maxIndex))
    })
  }

  return (
    <section id="projects" className="relative flex w-full scroll-mt-20 flex-col items-center justify-center border-t border-white/5 bg-transparent py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 sm:gap-12 sm:px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#D4AF37]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            — Featured Works —
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Recent Projects
          </motion.h2>
        </div>

        {/* Single-row carousel keeps the section compact as the library grows. */}
        <div className="relative">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="project-carousel grid grid-flow-col grid-rows-2 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 sm:grid-rows-1 sm:gap-6 lg:grid-rows-2 lg:gap-8"
          >
          {projectsData.map((project, index) => {
            const isPlaying = playingVideoId === project.id;
            
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => { if (!isPlaying) setPlayingVideoId(project.id) }}
              onKeyDown={(e) => {
                if (!isPlaying && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  setPlayingVideoId(project.id)
                }
              }}
              role={isPlaying ? undefined : 'button'}
              tabIndex={isPlaying ? undefined : 0}
              aria-label={isPlaying ? undefined : `Play ${project.title}`}
              className="project-card group relative aspect-video w-full snap-start cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] sm:rounded-2xl"
            >
              {!isPlaying ? (
                <>
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/10 z-10" />
                  
                  <img
                    src={`https://img.youtube.com/vi/${project.id}/maxresdefault.jpg`}
                    onError={(e) => { e.target.src = `https://img.youtube.com/vi/${project.id}/hqdefault.jpg` }}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="project-play-button flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/90 text-black shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 md:h-14 md:w-14">
                      <Play fill="currentColor" size={22} className="ml-1" />
                    </div>
                  </div>

                  {/* Lifted Text Container */}
                  <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full bg-gradient-to-t from-black/95 via-black/60 to-transparent px-4 pb-4 pt-16 sm:px-6 sm:pb-5 sm:pt-20">
                    <p className="mb-1 font-['Inter'] text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[#D4AF37] sm:text-[0.65rem]">
                      {project.category}
                    </p>
                    <h3 className="font-['Playfair_Display'] text-base font-semibold leading-tight text-white sm:text-lg">
                      {project.title}
                    </h3>
                  </div>
                </>
              ) : (
                <>
                  <iframe
                    src={`https://www.youtube.com/embed/${project.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 z-30 h-full w-full border-0"
                  />
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      setPlayingVideoId(null)
                    }}
                    className="absolute top-2 right-2 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white backdrop-blur-sm transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                    aria-label={`Close ${project.title}`}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </>
              )}
            </motion.div>
          )})}
          </div>

          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-[#080808] to-transparent transition-opacity duration-300 ${currentIndex > 0 ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-[#080808] to-transparent transition-opacity duration-300 ${currentIndex < maxIndex ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          />
        </div>

        {/* Compact navigation works with any number of project cards. */}
        <div className="flex items-center justify-between gap-5 border-t border-white/5 pt-5">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center justify-between gap-4 font-['Inter'] text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/45">
              <span className="sm:hidden">Swipe to explore</span>
              <span className="hidden sm:inline">Browse projects</span>
              <span className="shrink-0 text-[#D4AF37]">
                {String(currentIndex + 1).padStart(2, '0')}
                {visibleCount > 1 && `–${String(Math.min(currentIndex + visibleCount, projectsData.length)).padStart(2, '0')}`}
                <span className="text-white/30"> / {String(projectsData.length).padStart(2, '0')}</span>
              </span>
            </div>
            <div className="h-px overflow-hidden bg-white/10">
              <div
                className="h-full bg-[#D4AF37] transition-[width] duration-300"
                style={{ width: `${((currentIndex + visibleCount) / projectsData.length) * 100}%` }}
              />
            </div>
          </div>

          {maxIndex > 0 && (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => goToIndex(currentIndex - visibleCount)}
                disabled={currentIndex === 0}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-25"
                aria-label="Previous projects"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goToIndex(currentIndex + visibleCount)}
                disabled={currentIndex >= maxIndex}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-25"
                aria-label="Next projects"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects
