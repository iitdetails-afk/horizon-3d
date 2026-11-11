import React, { useState, useEffect } from 'react'
import {
  Download,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Monitor,
  Apple,
  Terminal,
  ExternalLink,
  Laptop
} from 'lucide-react'
import { DOWNLOAD_OPTIONS } from './data'

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

interface HeroSectionProps {
  onOpenReleaseNotes: () => void
  onSelectSoftwareTab: (tab: 'studio' | 'handy' | 'suite') => void
  activeSoftwareTab: 'studio' | 'handy' | 'suite'
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReleaseNotes,
  onSelectSoftwareTab,
  activeSoftwareTab
}) => {
  const [detectedOs, setDetectedOs] = useState<'windows' | 'mac' | 'linux'>('windows')
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.includes('mac')) {
      setDetectedOs('mac')
    } else if (userAgent.includes('linux')) {
      setDetectedOs('linux')
    } else {
      setDetectedOs('windows')
    }
  }, [])

  const currentOption =
    DOWNLOAD_OPTIONS.find((opt) => opt.os === detectedOs && !opt.isBeta) ||
    DOWNLOAD_OPTIONS[0]

  const handleDownload = (opt = currentOption) => {
    setToastMessage(`Downloading ${opt.fileName} (${opt.size})...`)
    setTimeout(() => setToastMessage(null), 4500)
    // Create an anchor and trigger standard download
    const link = document.createElement('a')
    link.href = opt.directUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.download = opt.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="overview" className="relative pt-8 pb-16 bg-gradient-to-b from-neutral-50 via-white to-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-200/30 to-green-300/20 blur-3xl rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Software Category Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-neutral-100/90 rounded-2xl border border-neutral-200/80 shadow-inner">
            <button
              onClick={() => onSelectSoftwareTab('studio')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeSoftwareTab === 'studio'
                  ? 'bg-white text-neutral-900 shadow-md shadow-black/5 scale-[1.02]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Monitor className="w-4 h-4 text-[#00AE42]" />
              <span>Horizon 3D</span>
              <span className="text-[10px] bg-emerald-100 text-[#00AE42] font-bold px-1.5 py-0.5 rounded-full">
                Slicer
              </span>
            </button>
            <button
              onClick={() => onSelectSoftwareTab('handy')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeSoftwareTab === 'handy'
                  ? 'bg-white text-neutral-900 shadow-md shadow-black/5 scale-[1.02]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Bambu Handy</span>
              <span className="text-[10px] bg-neutral-200 text-neutral-700 font-bold px-1.5 py-0.5 rounded-full">
                Mobile
              </span>
            </button>
            <button
              onClick={() => onSelectSoftwareTab('suite')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeSoftwareTab === 'suite'
                  ? 'bg-white text-neutral-900 shadow-md shadow-black/5 scale-[1.02]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Bambu Suite</span>
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Version Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#00AE42] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00AE42] animate-pulse"></span>
            <span>Version 1.10.1 (Latest Official Release)</span>
            <span className="text-neutral-400">•</span>
            <button
              onClick={onOpenReleaseNotes}
              className="underline hover:text-[#008f36] cursor-pointer"
            >
              Changelog
            </button>
          </div>

          {/* Large Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
            High-Speed Slicing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AE42] via-emerald-600 to-teal-600">
              Intuitive 3D Printing.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 font-normal leading-relaxed max-w-3xl mx-auto">
            Horizon 3D is an all-in-one open-source slicing software designed to unlock the
            full speed and precision of your 3D printer. Features project-based workflow,
            intelligent multi-color painting, live video monitoring, and automated motion algorithms.
          </p>

          {/* Primary CTA Area */}
          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            <div className="relative inline-flex flex-col sm:flex-row items-center gap-3">
              {/* Primary Download Button */}
              <div className="flex items-center rounded-xl shadow-xl shadow-[#00ae42]/20 hover:shadow-[#00ae42]/30 transition-all">
                <button
                  onClick={() => handleDownload(currentOption)}
                  className="flex items-center gap-3 bg-[#00AE42] hover:bg-[#009638] text-white px-6 py-4 rounded-l-xl font-bold text-base transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Download className="w-5 h-5 animate-bounce" />
                  <div className="text-left leading-tight">
                    <div>Download for {currentOption.os === 'windows' ? 'Windows' : currentOption.os === 'mac' ? 'macOS' : 'Linux'}</div>
                    <div className="text-xs font-normal text-emerald-100">
                      {currentOption.arch} • {currentOption.size}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setDownloadModalOpen(!downloadModalOpen)}
                  className="bg-[#008f36] hover:bg-[#007b2e] text-white px-3.5 py-5 rounded-r-xl border-l border-white/20 transition-colors"
                  title="All download versions"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Release Notes Button */}
              <button
                onClick={onOpenReleaseNotes}
                className="flex items-center gap-2 px-5 py-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 font-semibold text-neutral-700 text-sm shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-neutral-500" />
                <span>Release Notes</span>
              </button>

              {/* GitHub Button */}
              <a
                href="https://github.com/bambulab/BambuStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 font-semibold text-neutral-700 text-sm shadow-sm transition-all"
              >
                <GithubIcon className="w-4 h-4 text-neutral-900" />
                <span>GitHub (14k★)</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>

              {/* Download Options Dropdown Modal */}
              {downloadModalOpen && (
                <div className="absolute top-full mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 z-50 text-left animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Available Installers (v1.10.1)
                    </span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                      AGPLv3 Open Source
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-72 overflow-y-auto">
                    {DOWNLOAD_OPTIONS.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDownloadModalOpen(false)
                          handleDownload(opt)
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          {opt.os === 'windows' ? (
                            <Monitor className="w-4 h-4 text-neutral-600 group-hover:text-[#00AE42]" />
                          ) : opt.os === 'mac' ? (
                            <Apple className="w-4 h-4 text-neutral-600 group-hover:text-[#00AE42]" />
                          ) : (
                            <Terminal className="w-4 h-4 text-neutral-600 group-hover:text-[#00AE42]" />
                          )}
                          <div>
                            <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                              {opt.label}
                              {opt.isBeta && (
                                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                                  BETA
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-neutral-500">
                              {opt.arch} • {opt.size}
                            </div>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-neutral-400 group-hover:text-[#00AE42]" />
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <a
                      href="#download-matrix"
                      onClick={() => setDownloadModalOpen(false)}
                      className="text-[#00AE42] font-semibold hover:underline"
                    >
                      View full checksums & mirrors →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Platform summary text */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00AE42]" />
                Windows 10 / 11 (64-bit)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00AE42]" />
                macOS 10.15+ (Apple Silicon & Intel)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00AE42]" />
                Linux (Ubuntu 20.04+, Fedora, Flathub)
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                Digitally Signed & Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Download Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white px-5 py-3 rounded-xl shadow-2xl border border-neutral-700 flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-3 h-3 rounded-full bg-[#00AE42] animate-ping"></div>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </section>
  )
}
