import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

import './index.css'

function App() {
  return (
    <>
      <main className="min-h-screen bg-transparent text-white flex flex-col justify-between">
        <div>
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Services />
          <Skills />
          <Contact />
        </div>

        {/* Footer Text */}
        <footer className="w-full py-8 text-center border-t border-white/5 bg-transparent">
          <p className="font-['Inter'] text-xs sm:text-sm font-light text-white/30 tracking-wider">
            &copy; {new Date().getFullYear()} CRAFTER PRODUCTION. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    </>
  )
}

export default App
