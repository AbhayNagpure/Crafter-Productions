import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import './Hero.css'

const filmStills = [
  { id: '-0DRCtDstTk', className: 'hero-scene hero-scene-left' },
  { id: 'yvkgG8OMBpo', className: 'hero-scene hero-scene-main' },
  { id: 'LJcCLDGfRRQ', className: 'hero-scene hero-scene-right' },
]

function Hero() {
  const reduceMotion = useReducedMotion()
  const entrance = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="home" className="cinematic-hero" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-scenes">
          {filmStills.map((film) => (
            <div className={film.className} key={film.id}>
              <img
                src={`https://img.youtube.com/vi/${film.id}/maxresdefault.jpg`}
                alt=""
                fetchPriority={film.id === 'yvkgG8OMBpo' ? 'high' : 'auto'}
                onError={(event) => {
                  const fallback = `https://img.youtube.com/vi/${film.id}/hqdefault.jpg`
                  if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback
                }}
              />
            </div>
          ))}
        </div>
        <div className="hero-shade" />
        <div className="hero-light-leak" />
        <svg className="hero-grain" width="100%" height="100%">
          <filter id="hero-grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain-filter)" opacity="0.05" />
        </svg>
        <div className="hero-viewfinder">
          <span /><span /><span /><span />
        </div>
      </div>

      <div className="hero-content">
        <motion.p {...entrance(0.1)} className="hero-eyebrow">
          <span aria-hidden="true" /> Wedding films. Timeless feelings.
        </motion.p>

        <motion.h1 {...entrance(0.22)} id="hero-title" className="hero-title">
          <span>FRAMES</span>
          <span>THAT <em>SPEAK.</em></span>
        </motion.h1>

        <motion.p {...entrance(0.36)} className="hero-description">
          We don&apos;t just edit videos — we craft cinematic experiences.
          <span>Wedding films that make you feel it all over again.</span>
        </motion.p>

        <motion.div {...entrance(0.48)} className="hero-actions">
          <a className="hero-film-link" href="#projects">
            <Play size={15} fill="currentColor" aria-hidden="true" />
            Explore our films
          </a>
          <a className="hero-contact-link" href="#contact">
            Start a project <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <div className="hero-footer">
        <span className="hero-signature">The art of keeping a feeling.</span>
        <a href="#about" className="hero-scroll-link">
          Scroll to discover <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default Hero
