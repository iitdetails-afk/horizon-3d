import React, { useState } from 'react'
import {
  Download,
  Monitor,
  Apple,
  Terminal,
  ShieldCheck,
  FileCode,
  Cpu,
  Calendar,
  AlertCircle,
  ExternalLink,
  Bell,
  CheckCircle2,
  X
} from 'lucide-react'
import { DOWNLOADS_CONFIG } from '../../config/downloads'
import type { PlatformDownload } from '../../config/downloads'

interface DownloadSectionProps {
  onOpenReleaseNotes: () => void
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onOpenReleaseNotes }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'mac' | 'linux'>('windows')
  const [notifyModalOpen, setNotifyModalOpen] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySuccess, setNotifySuccess] = useState(false)

  const currentPlatform: PlatformDownload =
    DOWNLOADS_CONFIG.find((p) => p.id === selectedPlatform) || DOWNLOADS_CONFIG[0]

  const handleDownloadClick = () => {
    if (currentPlatform.isAvailable && currentPlatform.downloadUrl) {
      // Direct real download trigger
      const a = document.createElement('a')
      a.href = currentPlatform.downloadUrl
      a.download = ''
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } else {
      // Professional Coming Soon state without fake file simulation
      setNotifyModalOpen(true)
    }
  }

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (notifyEmail.includes('@')) {
      setNotifySuccess(true)
      setTimeout(() => {
        setNotifySuccess(false)
        setNotifyModalOpen(false)
        setNotifyEmail('')
      }, 3000)
    }
  }

  return (
    <section id="download" className="py-24 bg-[#080808] text-white border-t border-[#1c1c1c] relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF5A00]/8 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-[#FF5A00]">
            <Download className="w-3.5 h-3.5" />
            <span>OFFICIAL SOFTWARE RELEASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            DOWNLOAD HORIZON STUDIO
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
            Get the tools you need to design, prepare, and manage your next 3D printing project.
            Select your platform below to get started.
          </p>

          {/* Platform Selection Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 bg-[#111111] border border-[#262626] rounded-2xl shadow-xl">
              <button
                onClick={() => setSelectedPlatform('windows')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedPlatform === 'windows'
                    ? 'bg-[#171717] text-white border border-[#FF5A00]/60 shadow-[0_0_15px_rgba(255,90,0,0.2)]'
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                <Monitor className={`w-4 h-4 ${selectedPlatform === 'windows' ? 'text-[#FF5A00]' : ''}`} />
                <span>Windows</span>
              </button>

              <button
                onClick={() => setSelectedPlatform('mac')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedPlatform === 'mac'
                    ? 'bg-[#171717] text-white border border-[#FF5A00]/60 shadow-[0_0_15px_rgba(255,90,0,0.2)]'
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                <Apple className={`w-4 h-4 ${selectedPlatform === 'mac' ? 'text-[#FF5A00]' : ''}`} />
                <span>macOS</span>
              </button>

              <button
                onClick={() => setSelectedPlatform('linux')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedPlatform === 'linux'
                    ? 'bg-[#171717] text-white border border-[#FF5A00]/60 shadow-[0_0_15px_rgba(255,90,0,0.2)]'
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                <Terminal className={`w-4 h-4 ${selectedPlatform === 'linux' ? 'text-[#FF5A00]' : ''}`} />
                <span>Linux</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Download Card */}
        <div className="bg-[#171717] border border-[#262626] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#FF5A00]/40">
          {/* Subtle Orange Glow Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FF5A00]/15 to-transparent blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#111111] border border-[#262626] flex items-center justify-center text-[#FF5A00] shadow-md">
                  {selectedPlatform === 'windows' ? (
                    <Monitor className="w-7 h-7" />
                  ) : selectedPlatform === 'mac' ? (
                    <Apple className="w-7 h-7" />
                  ) : (
                    <Terminal className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {currentPlatform.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A0A0A0] mt-1">
                    <span>Version: {currentPlatform.version}</span>
                    <span>•</span>
                    <span className="text-[#FFD000]">{currentPlatform.releaseDate}</span>
                  </div>
                </div>
              </div>

              {/* Compatibility & Specs Summary */}
              <div className="space-y-2 text-sm text-[#A0A0A0] border-t border-[#262626] pt-4">
                <p className="text-white font-medium">{currentPlatform.compatibility}</p>
                <p className="text-xs text-[#A0A0A0]">
                  Architecture: <strong className="text-white">{currentPlatform.arch}</strong> | Format:{' '}
                  <strong className="text-white">{currentPlatform.format}</strong>
                </p>
                {currentPlatform.notes && (
                  <p className="text-xs text-[#A0A0A0] italic">
                    {currentPlatform.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs">
                <a
                  href="#specs"
                  className="text-[#FF5A00] hover:text-[#FFD000] font-semibold underline underline-offset-4"
                >
                  View full system requirements →
                </a>
                <button
                  onClick={onOpenReleaseNotes}
                  className="text-[#A0A0A0] hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  View Release Notes
                </button>
              </div>
            </div>

            {/* Right Action (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-4">
              <button
                onClick={handleDownloadClick}
                className="w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-xl bg-gradient-to-r from-[#FF5A00] via-[#E52B00] to-[#FFD000] text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-[#FF5A00]/25 hover:shadow-[#FF5A00]/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
              >
                <Download className="w-5 h-5 text-white" />
                <span>
                  {selectedPlatform === 'windows'
                    ? 'DOWNLOAD FOR WINDOWS'
                    : selectedPlatform === 'mac'
                    ? 'DOWNLOAD FOR MAC'
                    : 'DOWNLOAD FOR LINUX'}
                </span>
              </button>

              <div className="flex items-center gap-2 text-xs text-[#A0A0A0] text-center lg:text-right">
                <ShieldCheck className="w-4 h-4 text-[#FF5A00]" />
                <span>
                  {currentPlatform.isAvailable
                    ? 'Official Verified Installer'
                    : 'Installer Release in Preparation (Q2 2026)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Coming Soon / Notification Modal */}
      {notifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-[#262626] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setNotifyModalOpen(false)}
              className="absolute top-5 right-5 text-[#A0A0A0] hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#FF5A00]/40 text-[#FF5A00] flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">
                  {currentPlatform.name} — Coming Soon
                </h4>
                <p className="text-xs text-[#FFD000] font-mono mt-1">
                  Expected Launch: {currentPlatform.releaseDate}
                </p>
              </div>

              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                The public binary for {currentPlatform.name} is currently undergoing final multi-architecture
                calibration and signing.
              </p>

              <div className="p-3 bg-[#111111] rounded-xl border border-[#262626] text-xs text-[#A0A0A0] space-y-1">
                <div className="text-white font-mono font-semibold">⚙️ Configuration Notice:</div>
                <p>
                  To attach a live installer binary, configure the <code className="text-[#FF5A00]">downloadUrl</code> field in{' '}
                  <code className="text-white">src/config/downloads.ts</code>.
                </p>
              </div>

              {notifySuccess ? (
                <div className="p-3 rounded-xl bg-[#111111] border border-[#FF5A00] text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A00]" />
                  <span>Thank you! We will notify you the exact moment the download goes live.</span>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-3 pt-2">
                  <label className="text-xs font-semibold text-white">
                    Get Notified on Launch:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="flex-1 bg-[#111111] border border-[#262626] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-[#666666] outline-none focus:border-[#FF5A00]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#FF5A00] hover:bg-[#E52B00] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                    >
                      Notify Me
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
