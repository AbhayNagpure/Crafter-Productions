import { useState } from 'react'
import { motion } from 'framer-motion'

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

const CONTACT_IMAGE = "/assets/contact-profile.jpg"

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const apiUrl = import.meta.env.DEV ? 'http://localhost:5000/api/contact' : 'https://portfolio-ritik-w2fq.onrender.com/api/contact';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        const errorMsg = data.error ? `${data.message} (${data.error})` : (data.message || 'Something went wrong. Please try again.')
        setStatus({ type: 'error', message: errorMsg })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus({ type: 'error', message: 'Failed to connect to the server. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent scroll-mt-0 border-t border-white/5"
      style={{ padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 6vw, 6rem)' }}
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-0 sm:px-6 md:px-12">
        {/* Top Header */}
        <div className="flex flex-col items-center text-center" style={{ marginBottom: '30px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="font-['Inter'] text-xs font-medium uppercase tracking-[0.32em] text-[#D4AF37] mb-4"
          >
            &mdash; Let&apos;s Connect &mdash;
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl text-2xl font-semibold leading-snug tracking-wide text-white sm:leading-relaxed md:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let&apos;s Create Something <span className="text-[#D4AF37] italic">Extraordinary</span>
          </motion.h2>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Visual Profile & Direct Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-5 w-full">
            {/* The Cinematic Poster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="relative w-full overflow-hidden rounded-3xl border border-white/5 aspect-[16/9] bg-white/5 shadow-2xl"
            >
              <img
                src={CONTACT_IMAGE}
                alt="Ritik editing wedding film"
                className="h-full w-full object-cover opacity-80 transition-all duration-500 hover:scale-103 hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Collaborative Callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left"
            >
              <h3 className="font-['Inter'] text-base md:text-lg font-medium text-white mb-1.5">
                Now Booking for 2026 / 2027
              </h3>
              <p className="font-['Inter'] text-white/50 text-[11px] md:text-xs font-light leading-relaxed">
                Whether you need professional color grading, seamless narrative video editing, or a full wedding film transformation, let&apos;s build a visual style that matches your exact creative standards.
              </p>
            </motion.div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              {/* Phone */}
              <motion.a
                href="tel:+918817195771"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-105">
                  <PhoneIcon />
                </div>
                <div className="text-left overflow-hidden">
                  <h4 className="font-['Inter'] text-[8px] font-light text-white/40 truncate uppercase tracking-wider">Phone</h4>
                  <p className="font-['Inter'] text-[#D4AF37] text-[10px] font-medium tracking-wide truncate">+91 8817195771</p>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/918817195771"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="group flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-105">
                  <WhatsAppIcon />
                </div>
                <div className="text-left overflow-hidden">
                  <h4 className="font-['Inter'] text-[8px] font-light text-white/40 truncate uppercase tracking-wider">WhatsApp</h4>
                  <p className="font-['Inter'] text-[#D4AF37] text-[10px] font-medium tracking-wide truncate">+91 8817195771</p>
                </div>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/cutcrafter__?igsh=YmE2ZWhkM20zemJ2"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-105">
                  <InstagramIcon />
                </div>
                <div className="text-left overflow-hidden">
                  <h4 className="font-['Inter'] text-[8px] font-light text-white/40 truncate uppercase tracking-wider">Instagram</h4>
                  <p className="font-['Inter'] text-[#D4AF37] text-[10px] font-medium tracking-wide truncate">@cutcrafter__</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:rhphotography676@gmail.com"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-105">
                  <MailIcon />
                </div>
                <div className="text-left overflow-hidden">
                  <h4 className="font-['Inter'] text-[8px] font-light text-white/40 truncate uppercase tracking-wider">Email</h4>
                  <p className="font-['Inter'] text-[#D4AF37] text-[10px] font-medium tracking-tight truncate">rhphotography676@gmail.com</p>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Column: Direct Collaboration Inquiry Form */}
          <div className="w-full rounded-2xl border border-white/5 bg-white/[0.02] p-5 shadow-xl sm:p-8 md:p-10 lg:col-span-7">
            <div className="text-center mb-8">
              <h3 className="font-['Inter'] text-lg md:text-xl font-semibold text-white mb-2">
                Start a Collaboration
              </h3>
              <p className="font-['Inter'] text-white/40 text-xs font-light">
                Fill in the details below and I will get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className=" flex flex-col gap-6 w-full text-left " style={{ marginTop: '1.5rem' }}>
              {status.message && (
                <div className={`p-4 rounded-xl text-sm font-['Inter'] ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {status.message}
                </div>
              )}

              <div className="flex flex-col gap-6">
                {/* Name */}
                <div className="flex flex-col w-[100%]">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col ">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col ">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your vision, timeline, and what you're looking for..."
                  className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className={`mt-2 w-full rounded-xl bg-[#D4AF37] py-4 font-['Inter'] text-base font-semibold uppercase tracking-wider text-[#0a0a0a] shadow-lg shadow-[#D4AF37]/10 transition-colors duration-300 hover:bg-[#c29f2e] ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
