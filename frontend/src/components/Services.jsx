import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const servicesData = [
  {
    num: 'I',
    title: 'Cinematic Wed. Highlight',
    description: 'Your love story told through breathtaking cinema',
    highlights: ['Emotional storytelling', 'Slow-motion sequences', 'Seamless transitions'],
    youtubeId: 'kBLA8qoySxw',
  },
  {
    num: 'II',
    title: 'Pre-Wedding Highlight',
    description: 'Chemistry and emotion before the big day',
    highlights: ['Creative color grading', 'Music syncing', 'Stylish transitions'],
    youtubeId: 'PoQqR07nhyI',
  },
  {
    num: 'III',
    title: 'Same-Day Edit (SDE)',
    description: 'Delivered in hours. Screened at your reception',
    highlights: ['Delivered same day', 'Music syncing', 'Reception ready'],
    youtubeId: 'tOzeT1M-UTU',
  },
  {
    num: 'IV',
    title: 'Wedding Teaser / Trailer',
    description: 'Dramatic. Impactful. Unforgettable',
    highlights: ['Fast-paced edits', 'Dramatic music', '1-2 minutes'],
    youtubeId: 'xEUhY6e0slo',
  },
  {
    num: 'V',
    title: 'Instagram & Reels Edit',
    description: 'Cinematic cuts built for social media',
    highlights: ['Platform optimized', 'Trendy music syncing', 'Creative overlays'],
    youtubeId: 'Ki0WydmLR0s',
  },
  {
    num: 'VI',
    title: 'Full Wedding Documentary',
    description: 'Every moment. Every emotion. Your full story',
    highlights: ['Multi-camera edit', 'Full day coverage', 'Documentary style'],
    youtubeId: 'KVaz52AA3T0',
  },
]

function ServiceCard({ item, index, isPlaying, onTogglePlay }) {
  const handleToggle = () => {
    const iframe = document.getElementById(`youtube-iframe-${index}`)
    if (iframe && iframe.contentWindow) {
      if (!isPlaying) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      }
    }
    
    // Also pause all other iframes
    if (!isPlaying) {
      servicesData.forEach((_, i) => {
        if (i !== index) {
          const otherIframe = document.getElementById(`youtube-iframe-${i}`)
          if (otherIframe && otherIframe.contentWindow) {
            otherIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
          }
        }
      })
    }

    onTogglePlay()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${isPlaying ? 'Pause' : 'Play'} ${item.title} preview`}
      className={`service-card-item group relative flex min-h-[430px] w-[calc(100vw-2rem)] max-w-[360px] flex-shrink-0 snap-center cursor-pointer flex-col items-center justify-between overflow-hidden rounded-3xl border bg-[#111111] px-5 py-8 text-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] sm:min-h-[450px] sm:w-[350px] sm:px-8 sm:py-10 lg:h-[460px] lg:w-[400px] lg:max-w-none lg:px-10 lg:pb-12 lg:pt-12 ${isPlaying
        ? 'border-[#D4AF37]/50 shadow-[0_10px_40px_rgba(212,175,55,0.15)]'
        : 'border-white/5'
        }`}
    >
      {/* Background YouTube Video on Tap */}
      {item.youtubeId && isPlaying && (
        <div className={`absolute inset-0 w-full h-full overflow-hidden z-0 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-[#0a0a0a]/20 z-10 pointer-events-none" />
          <iframe
            id={`youtube-iframe-${index}`}
            src={`https://www.youtube.com/embed/${item.youtubeId}?enablejsapi=1&autoplay=1&mute=0&controls=0&loop=1&playlist=${item.youtubeId}&playsinline=1`}
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 opacity-90 object-cover scale-[1.1]"
            style={{ border: 'none', pointerEvents: 'none' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={item.title}
          />
        </div>
      )}

      {/* Background Local Video on Tap */}
      {item.localVideo && isPlaying && (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div className="absolute inset-0 bg-[#0a0a0a]/20 z-10 pointer-events-none" />
          <video
            src={item.localVideo}
            autoPlay
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 opacity-90 object-cover"
          />
        </div>
      )}

      {/* Background Thumbnail when not playing */}
      {item.youtubeId && !isPlaying && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#111111]/85 transition-colors duration-500 z-10" />
          <img
            src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125"
          />
        </div>
      )}

      {/* Local Video Thumbnail when not playing */}
      {item.localVideo && !isPlaying && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#111111]/85 transition-colors duration-500 z-10" />
          <video
            src={item.localVideo}
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125"
          />
        </div>
      )}

      {/* Decorative Golden Corner glow when active */}
      <div className={`absolute -inset-px rounded-3xl bg-gradient-to-tr from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#D4AF37]/10 transition-opacity duration-500 pointer-events-none z-1 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />

      {/* Top Content Block */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h3
          className={`text-2xl font-bold leading-tight transition-colors duration-300 ${isPlaying ? 'text-[#D4AF37]' : 'text-white'}`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {item.title}
        </h3>
        <p
          className="max-w-[90%] text-[1rem] font-light leading-relaxed text-white/70"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {item.description}
        </p>

        {/* Highlights List */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {item.highlights.map((highlight, hIndex) => (
            <div key={hIndex} className="flex items-center gap-2">
              <span className="text-[#D4AF37] text-[0.8rem]">→</span>
              <span
                className="text-[0.9rem] font-light text-white/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Play Action Indicator */}
      <div className="relative z-10 flex w-full items-center justify-center gap-3 transition-all duration-300">
        <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)] ${isPlaying ? 'bg-[#D4AF37] text-[#0a0a0a]' : 'bg-[#D4AF37]/10 text-[#D4AF37]'
          }`}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          )}
        </span>
        <span className={`font-['Inter'] text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${isPlaying ? 'text-white' : 'text-[#D4AF37]'
          }`}>
          {isPlaying ? 'Playing Preview' : 'Tap to play'}
        </span>
      </div>
    </motion.div>
  )
}

function Services() {
  const carouselRef = useRef(null)
  const currentIndexRef = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activePlayingIndex, setActivePlayingIndex] = useState(null)
  const totalCards = servicesData.length

  // Smoothly center a card
  const goToIndex = (index, keepActive = false, smooth = true) => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const cards = container.querySelectorAll('.service-card-item')
    const card = cards[index]
    if (!card) return

    const centeredLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2

    container.scrollTo({
      left: centeredLeft,
      behavior: smooth ? 'smooth' : 'auto'
    })

    currentIndexRef.current = index
    setCurrentIndex(index)
    if (!keepActive) {
      setActivePlayingIndex(null)
    }
  }

  // Keep the first and last cards centered, including after device rotation.
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    let resizeFrame
    let alignmentFrame
    const scheduleLayout = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        const card = container.querySelector('.service-card-item')
        if (!card) return

        const sidePadding = Math.max(0, (container.clientWidth - card.clientWidth) / 2)
        container.style.paddingInline = `${sidePadding}px`
        container.style.scrollPaddingInline = `${sidePadding}px`
        cancelAnimationFrame(alignmentFrame)
        alignmentFrame = requestAnimationFrame(() => {
          goToIndex(currentIndexRef.current, true, false)
        })
      })
    }

    window.addEventListener('resize', scheduleLayout)
    scheduleLayout()

    return () => {
      cancelAnimationFrame(resizeFrame)
      cancelAnimationFrame(alignmentFrame)
      window.removeEventListener('resize', scheduleLayout)
    }
  }, [])

  // Detect currently active card in center on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const cards = [...container.querySelectorAll('.service-card-item')]
    const center = container.scrollLeft + container.clientWidth / 2
    const index = cards.reduce((nearest, card, cardIndex) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const nearestCard = cards[nearest]
      const nearestCenter = nearestCard.offsetLeft + nearestCard.clientWidth / 2
      return Math.abs(cardCenter - center) < Math.abs(nearestCenter - center) ? cardIndex : nearest
    }, 0)
    const clamped = Math.max(0, Math.min(index, totalCards - 1))
    if (clamped !== currentIndex) {
      currentIndexRef.current = clamped
      setCurrentIndex(clamped)
    }
  }

  const slide = (direction) => {
    goToIndex(direction === 'left' ? currentIndex - 1 : currentIndex + 1)
  }

  return (
    <section id="services" className="flex min-h-screen w-full scroll-mt-20 flex-col items-center justify-center overflow-hidden bg-transparent py-20 sm:py-24" >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col text-center">

        {/* Header Section */}
        <div className="mb-8 flex flex-col items-center sm:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#D4AF37]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            — What We Offer —
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Services
          </motion.h2>
        </div>

        {/* Carousel Section */}
        <div className="relative w-full">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-8 pt-4 sm:gap-6 sm:pb-10 lg:gap-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {servicesData.map((item, index) => (
              <ServiceCard
                key={index}
                item={item}
                index={index}
                isPlaying={activePlayingIndex === index}
                onTogglePlay={() => {
                  const nextIndex = activePlayingIndex === index ? null : index
                  setActivePlayingIndex(nextIndex)
                  if (nextIndex !== null) {
                    goToIndex(index, true)
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows + Dot Indicators */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => slide('left')}
              disabled={currentIndex === 0}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-2xl text-white transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous service"
            >
              ←
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {servicesData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex
                    ? 'w-6 bg-[#D4AF37]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => slide('right')}
              disabled={currentIndex === totalCards - 1}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-2xl text-white transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next service"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
