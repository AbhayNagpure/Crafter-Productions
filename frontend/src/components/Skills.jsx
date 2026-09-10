import { motion } from 'framer-motion'

const tools = [
  {
    name: 'Premiere Pro',
    icon: (
      <div className="flex h-[55px] w-[55px] items-center justify-center rounded-xl bg-[#9999FF] text-3xl font-bold text-[#0a0a0a]">
        Pr
      </div>
    ),
    level: 'Advanced / Editor-in-Chief',
  },
  {
    name: 'DaVinci Resolve',
    icon: (
      <img
        src="https://images.icon-icons.com/3053/PNG/512/davinci_resolve_macos_bigsur_icon_190261.png"
        alt="DaVinci Resolve"
        className="h-[55px] w-[55px] rounded-full"
      />
    ),
    level: 'Advanced / Color & Grading',
  },
  {
    name: 'After Effects',
    icon: (
      <div className="flex h-[55px] w-[55px] items-center justify-center rounded-xl bg-[#1a1a3a] text-3xl font-bold text-[#9999FF]">
        Ae
      </div>
    ),
    level: 'Intermediate / Motion Graphics & VFX',
  },
]

const pillars = [
  {
    title: 'Cinematic Color Grading',
    desc: 'Setting the emotional weight of each scene using custom-built color schemes, matching tones across cameras, and maintaining skin tone accuracy.',
  },
  {
    title: 'Audio Crafting & Sound Design',
    desc: 'Creating immersive auditory landscapes. Layering rhythmic sound effects, mixing scores, and enhancing dialogue clarity for high impact.',
  },
  {
    title: 'Pacing & Narrative Rhythm',
    desc: 'Tension and release. Structuring cuts to synchronize with music beats, emotional spikes, and the inherent pace of the storytelling.',
  },
]

function Skills() {
  return (
    <section
      id="skills"
      className="relative flex w-full flex-col items-center justify-start bg-transparent scroll-mt-0 border-t border-white/5"
      style={{ padding: 'clamp(4rem, 6vw, 7rem) clamp(1rem, 5vw, 5rem)' }}
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-0 sm:px-4 md:px-10 lg:px-16">
        {/* Top Header */}
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="font-['Inter'] text-xs font-medium uppercase tracking-[0.32em] text-[#D4AF37] mb-3"
          >
            &mdash; The Artistry &mdash;
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Built With Precision
          </motion.h2>
        </div>

        {/* 2-Column Responsive Layout - Balanced perfectly across 1440px */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Creative Philosophy & Pillars */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h3 className="font-['Inter'] text-xl md:text-2xl font-semibold text-white mb-3">
                The Narrative Philosophy
              </h3>
              <p className="font-['Inter'] text-white/60 font-light leading-relaxed text-sm md:text-base">
                Editing is where the story is truly born. With a keen eye for rhythmic pacing, seamless transitions, and emotive color palettes, I transform raw shots into structured cinematic experiences that captivate from the opening frame to the credit roll.
              </p>
            </motion.div>

            {/* Pillars List */}
            <div className="flex flex-col gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex gap-4 items-start text-left group"
                >
                  {/* Number Accent */}
                  <span className="font-['Playfair_Display'] text-lg font-bold italic text-[#D4AF37]/40 transition-colors duration-300 group-hover:text-[#D4AF37]">
                    0{index + 1}
                  </span>

                  <div className="flex flex-col gap-1">
                    <h4 className="font-['Inter'] text-sm md:text-base font-medium text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                      {pillar.title}
                    </h4>
                    <p className="font-['Inter'] text-white/50 text-xs md:text-sm font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Tools of the Craft */}
          <div className="flex w-full flex-col gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-5 shadow-xl sm:p-6 md:p-8 lg:col-span-6">
            <div className="text-center mb-2">
              <h3 className="font-['Inter'] text-xl font-semibold text-white mb-2">
                Tools of the Craft
              </h3>
              <p className="font-['Inter'] text-white/40 text-xs font-light">
                Professional tools utilized to achieve absolute cinematic output.
              </p>
            </div>

            {/* Tools list */}
            <div className="flex flex-col gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex items-center gap-5 group cursor-default w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div className="transition-transform duration-300 ease-out group-hover:scale-105 shrink-0">
                    {tool.icon}
                  </div>

                  <div className="flex flex-col items-start gap-0.5 flex-1">
                    <span className="font-['Inter'] text-base font-semibold text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                      {tool.name}
                    </span>
                    <span className="font-['Inter'] text-xs font-light text-white/40">
                      {tool.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Accent Line */}
            <div className="h-[1px] w-full bg-white/5 my-2" />

            <p className="font-['Inter'] text-xs font-light italic text-white/40 leading-relaxed text-left">
              &quot;Every cut has a purpose, and every frame is polished using top-tier software.&quot;
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Skills
