import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = ['Home', 'About', 'Projects', 'Services', 'Skills', 'Contact']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [isOpen])

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setIsOpen(false)

    // Let the mobile menu start closing before scrolling to its destination.
    requestAnimationFrame(() => {
      if (link === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const element = document.getElementById(link.toLowerCase())
        if (element) {
          if (link.toLowerCase() === 'contact') {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' })
          } else {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
    })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        backgroundColor: isOpen ? 'rgba(8,8,8,0.97)' : 'transparent',
        backdropFilter: scrolled || isOpen ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled || isOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled || isOpen
          ? '1px solid rgba(212, 175, 55, 0.15)'
          : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 md:px-10 md:py-5 lg:px-12">

        {/* ── Logo ─────────────────────────────────────────────── */}
        <a href="#" onClick={(e) => handleNavClick(e, 'Home')} className="shrink-0 select-none">
          <span
            className="font-['Bebas_Neue'] font-normal tracking-wider text-white"
            style={{ fontSize: '1.3rem' }}
          >
            CRAFTER
          </span>
          <span
            className="font-['Bebas_Neue'] font-normal tracking-wider text-[#D4AF37]"
            style={{ fontSize: '1.3rem' }}
          >
            {' '}PRODUCTION
          </span>
        </a>

        {/* ── Nav links — desktop only ─────────────────────────── */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={link === 'Home' ? '#' : `#${link.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, link)}
                className="nav-link relative font-['Inter'] text-xs font-medium uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:text-[#D4AF37]"
              >
                {link}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#D4AF37] transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Hamburger — mobile only ────────────────────────── */}
        <button
          type="button"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#D4AF37] transition-colors duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span
            aria-hidden="true"
            className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
              isOpen ? 'top-[21px] rotate-45' : 'top-[14px]'
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute top-[21px] h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
              isOpen ? 'scale-x-50 opacity-0' : 'opacity-100'
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
              isOpen ? 'top-[21px] -rotate-45' : 'top-[28px]'
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ─────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full max-h-[calc(100svh-77px)] w-full overflow-x-hidden overflow-y-auto overscroll-contain sm:max-h-[calc(100svh-84px)] lg:hidden"
            style={{
              backgroundColor: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <ul className="flex min-h-full flex-col items-center justify-center gap-0 py-1 sm:py-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="w-full"
                >
                  <a
                    href={link === 'Home' ? '#' : `#${link.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className="block min-h-12 w-full py-3.5 text-center font-['Inter'] text-xs font-medium uppercase tracking-[0.25em] text-white/80 transition-colors duration-300 hover:text-[#D4AF37] focus-visible:bg-white/5 focus-visible:text-[#D4AF37] focus-visible:outline-none sm:py-4"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
