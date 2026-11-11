import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { StudioEcosystem } from './StudioEcosystem'
import { FeatureSection } from './FeatureSection'
import { SystemRequirements } from './SystemRequirements'
import { ReleaseNotes } from './ReleaseNotes'
import { Documentation } from './Documentation'
import { FAQ } from './FAQ'
import { Footer } from './Footer'
import { ContactModal } from './ContactModal'
import { ReleaseNotesModal } from './ReleaseNotesModal'
import { ArrowUp, Terminal, Layers } from 'lucide-react'

export const HorizonWebsite: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [releaseNotesModalOpen, setReleaseNotesModalOpen] = useState(false)
  const [showDevDrawer, setShowDevDrawer] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans antialiased selection:bg-[#FF5A00]/30 selection:text-[#FFD000] flex flex-col relative overflow-x-hidden">
      {/* 1. Global Horizon 3D Navbar */}
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {/* Hero Section with Interactive Three.js 3D Viewport */}
        <Hero onOpenContact={() => setContactModalOpen(true)} />

        {/* Complete Interactive Studio Ecosystem: Library & Online Models, Prepare Slicer, Device Live Telemetry */}
        <StudioEcosystem />

        {/* Feature Section ("POWERFUL TOOLS. LIMITLESS POSSIBILITIES.") */}
        <FeatureSection />

        {/* System & Hardware Requirements */}
        <SystemRequirements />

        {/* Release Notes & Version History */}
        <ReleaseNotes />

        {/* Documentation & Support Cards */}
        <Documentation onOpenContact={() => setContactModalOpen(true)} />

        {/* Frequently Asked Questions */}
        <FAQ onOpenContact={() => setContactModalOpen(true)} />
      </main>

      {/* 3. Official Footer */}
      <Footer onOpenContact={() => setContactModalOpen(true)} />

      {/* 4. Contact & Early Access Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* 5. Release Notes Changelog Modal */}
      <ReleaseNotesModal
        isOpen={releaseNotesModalOpen}
        onClose={() => setReleaseNotesModalOpen(false)}
      />

      {/* Floating Back to Top Action */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#171717] hover:bg-[#222222] border border-[#262626] hover:border-[#FF5A00] text-[#A0A0A0] hover:text-[#FF5A00] shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Scroll to Top"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Discreet Developer Route Switcher for embedded C++ WebViews */}
      <div className="fixed bottom-6 right-6 z-40">
        {showDevDrawer ? (
          <div className="bg-[#111111]/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-[#262626] w-72 space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#262626] text-xs">
              <span className="font-bold text-[#FF5A00] flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5" /> Embedded C++ WebViews
              </span>
              <button
                onClick={() => setShowDevDrawer(false)}
                className="text-[#A0A0A0] hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1 text-xs">
              <a
                href="#/filament_manager"
                className="block p-2 rounded-lg hover:bg-[#171717] text-[#A0A0A0] hover:text-[#FF5A00] transition-colors"
              >
                🧵 Filament Manager (Embedded)
              </a>
              <a
                href="#/device_page/ams_control_web"
                className="block p-2 rounded-lg hover:bg-[#171717] text-[#A0A0A0] hover:text-[#FF5A00] transition-colors"
              >
                🎛️ AMS Control Web (Embedded)
              </a>
              <a
                href="#/device_page/ams_control_web_debug"
                className="block p-2 rounded-lg hover:bg-[#171717] text-[#A0A0A0] hover:text-[#FF5A00] transition-colors"
              >
                🛠️ AMS Control Web Debug
              </a>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDevDrawer(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#111111]/90 text-[#A0A0A0] hover:text-white shadow-xl border border-[#262626] hover:border-[#FF5A00] text-xs font-semibold backdrop-blur-sm transition-all hover:scale-105 cursor-pointer font-mono"
            title="Open Embedded Dev Tools"
          >
            <Layers className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span>Dev Routes</span>
          </button>
        )}
      </div>
    </div>
  )
}
