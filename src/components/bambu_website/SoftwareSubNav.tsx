import React, { useState, useEffect } from 'react'
import { Download, ChevronDown, Check } from 'lucide-react'

interface SoftwareSubNavProps {
  onOpenReleaseNotes: () => void
}

export const SoftwareSubNav: React.FC<SoftwareSubNavProps> = ({ onOpenReleaseNotes }) => {
  const [activeSection, setActiveSection] = useState('overview')
  const [downloadDropdown, setDownloadDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'features', 'multi-color', 'remote-control', 'tech-specs', 'faq']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Software Product Identity */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-900 text-base sm:text-lg">
                Horizon 3D
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00AE42] border border-emerald-200">
                v1.10.1
              </span>
            </div>
          </div>

          {/* Sub Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <a
              href="#overview"
              className={`transition-colors py-1 ${
                activeSection === 'overview'
                  ? 'text-[#00AE42] font-semibold border-b-2 border-[#00AE42]'
                  : 'hover:text-neutral-900'
              }`}
            >
              Overview
            </a>
            <a
              href="#features"
              className={`transition-colors py-1 ${
                activeSection === 'features'
                  ? 'text-[#00AE42] font-semibold border-b-2 border-[#00AE42]'
                  : 'hover:text-neutral-900'
              }`}
            >
              Features
            </a>
            <a
              href="#multi-color"
              className={`transition-colors py-1 ${
                activeSection === 'multi-color'
                  ? 'text-[#00AE42] font-semibold border-b-2 border-[#00AE42]'
                  : 'hover:text-neutral-900'
              }`}
            >
              AMS Multi-Color
            </a>
            <a
              href="#remote-control"
              className={`transition-colors py-1 ${
                activeSection === 'remote-control'
                  ? 'text-[#00AE42] font-semibold border-b-2 border-[#00AE42]'
                  : 'hover:text-neutral-900'
              }`}
            >
              Remote Control
            </a>
            <a
              href="#tech-specs"
              className={`transition-colors py-1 ${
                activeSection === 'tech-specs'
                  ? 'text-[#00AE42] font-semibold border-b-2 border-[#00AE42]'
                  : 'hover:text-neutral-900'
              }`}
            >
              Specs
            </a>
            <button
              onClick={onOpenReleaseNotes}
              className="hover:text-neutral-900 transition-colors py-1 text-neutral-600 cursor-pointer"
            >
              Release Notes
            </button>
            <a
              href="#faq"
              className={`transition-colors py-1 ${
                activeSection === 'faq'
                  ? 'text-[#00AE42] font-semibold border-b-2 border-[#00AE42]'
                  : 'hover:text-neutral-900'
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* Download Action with Dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <a
                href="#download-matrix"
                className="flex items-center gap-2 bg-[#00AE42] hover:bg-[#009638] text-white font-semibold text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-l-lg shadow-sm transition-all shadow-[#00ae42]/20"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
              <button
                onClick={() => setDownloadDropdown(!downloadDropdown)}
                className="bg-[#009638] hover:bg-[#008230] text-white p-1.5 sm:p-2 rounded-r-lg border-l border-white/20 transition-colors"
                title="Select Platform"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Quick Dropdown */}
            {downloadDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-neutral-100 p-2 z-50 text-xs animate-in fade-in duration-100">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">
                  Choose Platform (v1.10.1)
                </div>
                <a
                  href="#download-matrix"
                  onClick={() => setDownloadDropdown(false)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 font-medium text-neutral-800"
                >
                  <span>Windows 10/11 (64-bit)</span>
                  <span className="text-[#00AE42] font-bold">.exe</span>
                </a>
                <a
                  href="#download-matrix"
                  onClick={() => setDownloadDropdown(false)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 font-medium text-neutral-800"
                >
                  <span>macOS Apple Silicon (M-Series)</span>
                  <span className="text-[#00AE42] font-bold">.dmg</span>
                </a>
                <a
                  href="#download-matrix"
                  onClick={() => setDownloadDropdown(false)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 font-medium text-neutral-800"
                >
                  <span>macOS Intel (x86_64)</span>
                  <span className="text-[#00AE42] font-bold">.dmg</span>
                </a>
                <a
                  href="#download-matrix"
                  onClick={() => setDownloadDropdown(false)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 font-medium text-neutral-800"
                >
                  <span>Linux AppImage / Flatpak</span>
                  <span className="text-[#00AE42] font-bold">AppImage</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
