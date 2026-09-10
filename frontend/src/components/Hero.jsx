import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const easeOut = [0.22, 1, 0.36, 1]

/* ── GSAP text-scramble helper ────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function scrambleText(el, finalText, duration = 1.5) {
  const length = finalText.length
  let obj = { progress: 0 }
  gsap.to(obj, {
    progress: 1,
    duration,
    ease: 'none',
    onUpdate() {
      const p = obj.progress
      let result = ''
      for (let i = 0; i < length; i++) {
        if (finalText[i] === ' ') {
          result += ' '
        } else if (i / length < p) {
          result += finalText[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      el.textContent = result
    },
    onComplete() {
      el.textContent = finalText
    },
  })
}

/* ── SVG noise filter (inline, no external assets) ───────────── */
const NoiseOverlay = () => (
  <div
    className="pointer-events-none absolute inset-0 z-20"
    style={{ opacity: 0.03 }}
    aria-hidden="true"
  >
    <svg className="absolute inset-0 h-full w-full">
      <filter id="heroNoise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#heroNoise)" />
    </svg>
  </div>
)

function Hero() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    /* Delay scramble to let the Framer Motion entrance finish */
    const t1 = setTimeout(() => {
      if (line1Ref.current) scrambleText(line1Ref.current, 'FRAMES', 1.5)
    }, 450)
    const t2 = setTimeout(() => {
      if (line2Ref.current) scrambleText(line2Ref.current, 'THAT SPEAK', 1.5)
    }, 650)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0a0a0a] px-5 py-24 text-center sm:px-6">
      {/* ── Background layers ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-[#111111]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
        aria-hidden="true"
      />
      <NoiseOverlay />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 sm:gap-8 lg:gap-10">

        {/* Gold label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          className="font-['Inter'] text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[#D4AF37] sm:text-sm sm:tracking-[0.42em]"
        >
          &mdash; Visual Storyteller &mdash;
        </motion.p>

        {/* Heading */}
        <h1 className="text-[clamp(2.5rem,12vw,10rem)] font-black leading-[0.92] tracking-normal text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          <motion.span
            ref={line1Ref}
            initial={{ opacity: 0, x: -90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease: easeOut }}
            className="block"
          >
            FRAMES
          </motion.span>
          <motion.span
            ref={line2Ref}
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.6, ease: easeOut }}
            className="block mt-2"
          >
            THAT SPEAK
          </motion.span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: easeOut }}
          className="max-w-2xl font-['Inter'] text-base font-light leading-7 text-white/60 sm:text-lg sm:leading-8 lg:text-xl"
        >
          We don&apos;t just edit videos &mdash; we craft cinematic experiences.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: easeOut }}
          className="max-w-xl font-['Inter'] text-xs font-light leading-6 text-white/40 sm:-mt-3 sm:text-sm sm:leading-7"
        >
          Wedding films that make you feel it all over again.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 1, ease: easeOut }}
          className="flex items-center justify-center gap-8"
        >

        </motion.div>
      </div>

      {/* ── Scroll indicator — outside content div, absolute bottom ── */}
      <div
        className="z-10 flex flex-col items-center gap-3"
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)' }}
      >
        <span className="font-['Inter'] text-[0.6rem] font-light uppercase tracking-[0.34em] text-[#D4AF37]/70">
          SCROLL
        </span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px bg-[#D4AF37]/60"
          style={{ height: 40 }}
        />
      </div>
    </section>
  )
}

export default Hero
