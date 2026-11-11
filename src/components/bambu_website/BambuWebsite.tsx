import React, { useState } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { Navbar } from './Navbar'
import { SoftwareSubNav } from './SoftwareSubNav'
import { HeroSection } from './HeroSection'
import { InteractiveStudioMockup } from './InteractiveStudioMockup'
import { FeatureSections } from './FeatureSections'
import { DownloadMatrix } from './DownloadMatrix'
import { BambuHandySection } from './BambuHandySection'
import { TechSpecsSection } from './TechSpecsSection'
import { FaqSection } from './FaqSection'
import { Footer } from './Footer'
import { ReleaseNotesModal } from './ReleaseNotesModal'
import { SignInModal } from './SignInModal'
import { ArrowUp, Terminal, Layers } from 'lucide-react'

export const BambuWebsite: React.FC = () => {
  const [releaseNotesOpen, setReleaseNotesOpen] = useState(false)
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)
  const [activeSoftwareTab, setActiveSoftwareTab] = useState<'studio' | 'handy' | 'suite'>('studio')
  const [showDevDrawer, setShowDevDrawer] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-[#00AE42]/20 selection:text-[#00AE42] flex flex-col">
      {/* 1. Announcement Banner */}
      <AnnouncementBar />

      {/* 2. Global Horizon 3D Navbar with Sign In Modal trigger */}
      <Navbar
        onOpenReleaseNotes={() => setReleaseNotesOpen(true)}
        onOpenSignIn={() => setSignInModalOpen(true)}
        currentUser={currentUser}
      />

      {/* 3. Sticky Software Product Navigation Bar */}
      <SoftwareSubNav onOpenReleaseNotes={() => setReleaseNotesOpen(true)} />

      {/* 4. Main Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenReleaseNotes={() => setReleaseNotesOpen(true)}
          onSelectSoftwareTab={(tab) => {
            setActiveSoftwareTab(tab)
            if (tab === 'handy') {
              const el = document.getElementById('bambu-handy')
              el?.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          activeSoftwareTab={activeSoftwareTab}
        />

        {/* Interactive 3D Slicing Workspace Simulation */}
        <InteractiveStudioMockup />

        {/* Feature Highlights: Workflow, High-Speed, AMS Multi-Color, Remote Control */}
        <FeatureSections />

        {/* Download Matrix */}
        <DownloadMatrix />

        {/* Horizon Mobile Companion */}
        <BambuHandySection />

        {/* System & Hardware Requirements */}
        <TechSpecsSection />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Interactive Release Notes Modal */}
      <ReleaseNotesModal
        isOpen={releaseNotesOpen}
        onClose={() => setReleaseNotesOpen(false)}
      />

      {/* Interactive Sign In / Register / Account Modal */}
      <SignInModal
        isOpen={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        user={currentUser}
        onSignIn={(name, email) => setCurrentUser({ name, email })}
        onSignOut={() => setCurrentUser(null)}
      />

      {/* Floating Action: Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white shadow-xl border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-all hover:scale-105 active:scale-95"
        title="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Quick Developer Switcher to Internal C++ WebViews */}
      <div className="fixed bottom-6 right-6 z-40">
        {showDevDrawer ? (
          <div className="bg-neutral-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-neutral-700 w-72 space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> DeviceWeb Internal Pages
              </span>
              <button
                onClick={() => setShowDevDrawer(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1 text-xs">
              <a
                href="#/filament_manager"
                className="block p-2 rounded-lg hover:bg-neutral-800 text-neutral-200 hover:text-emerald-400 transition-colors"
              >
                🧵 Filament Manager (Embedded)
              </a>
              <a
                href="#/device_page/ams_control_web"
                className="block p-2 rounded-lg hover:bg-neutral-800 text-neutral-200 hover:text-emerald-400 transition-colors"
              >
                🎛️ AMS Control Web (Embedded)
              </a>
              <a
                href="#/device_page/ams_control_web_debug"
                className="block p-2 rounded-lg hover:bg-neutral-800 text-neutral-200 hover:text-emerald-400 transition-colors"
              >
                🛠️ AMS Control Web Debug
              </a>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDevDrawer(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 text-white shadow-xl border border-neutral-700 hover:bg-neutral-800 text-xs font-semibold backdrop-blur-sm transition-all hover:scale-105"
            title="Open Internal Dev Tools"
          >
            <Layers className="w-3.5 h-3.5 text-[#00AE42]" />
            <span>Dev Routes</span>
          </button>
        )}
      </div>
    </div>
  )
}
