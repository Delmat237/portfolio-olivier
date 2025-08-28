import { Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Education from '@/components/sections/Education'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Certifications from '@/components/sections/Certifications'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
       <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </Suspense> 
      
      <Footer />
    </main>
  )
}