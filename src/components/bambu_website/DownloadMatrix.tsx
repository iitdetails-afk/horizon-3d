import React, { useState } from 'react'
import {
  Download,
  Copy,
  Check,
  Monitor,
  Apple,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react'
import { DOWNLOAD_OPTIONS } from './data'
import type { DownloadOption } from './types'

export const DownloadMatrix: React.FC = () => {
  const [selectedOs, setSelectedOs] = useState<'all' | 'windows' | 'mac' | 'linux'>('all')
  const [channel, setChannel] = useState<'all' | 'stable' | 'beta'>('all')
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2500)
  }

  const filteredOptions = DOWNLOAD_OPTIONS.filter((opt) => {
    if (selectedOs !== 'all' && opt.os !== selectedOs) return false
    if (channel === 'stable' && opt.isBeta) return false
    if (channel === 'beta' && !opt.isBeta) return false
    return true
  })

  return (
    <section id="download-matrix" className="py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#00AE42] text-xs font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Official Download Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Download Horizon 3D for Your Platform
          </h2>
          <p className="text-neutral-600 text-base">
            Choose the installer optimized for your operating system and hardware architecture.
            All official binaries are cryptographically signed and open source.
          </p>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {/* OS Filter */}
            <div className="inline-flex p-1 bg-white rounded-xl border border-neutral-200 shadow-sm text-xs font-semibold">
              <button
                onClick={() => setSelectedOs('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedOs === 'all' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All Platforms
              </button>
              <button
                onClick={() => setSelectedOs('windows')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  selectedOs === 'windows' ? 'bg-[#00AE42] text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Windows
              </button>
              <button
                onClick={() => setSelectedOs('mac')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  selectedOs === 'mac' ? 'bg-[#00AE42] text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Apple className="w-3.5 h-3.5" /> macOS
              </button>
              <button
                onClick={() => setSelectedOs('linux')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  selectedOs === 'linux' ? 'bg-[#00AE42] text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Linux
              </button>
            </div>

            {/* Channel Filter */}
            <div className="inline-flex p-1 bg-white rounded-xl border border-neutral-200 shadow-sm text-xs font-semibold">
              <button
                onClick={() => setChannel('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  channel === 'all' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All Channels
              </button>
              <button
                onClick={() => setChannel('stable')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  channel === 'stable' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Stable Only
              </button>
              <button
                onClick={() => setChannel('beta')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  channel === 'beta' ? 'bg-amber-600 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Beta Channel
              </button>
            </div>
          </div>
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOptions.map((opt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-neutral-100 text-neutral-800">
                      {opt.os === 'windows' ? (
                        <Monitor className="w-6 h-6 text-[#00AE42]" />
                      ) : opt.os === 'mac' ? (
                        <Apple className="w-6 h-6 text-neutral-900" />
                      ) : (
                        <Terminal className="w-6 h-6 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-base leading-tight">
                        {opt.label}
                      </h3>
                      <div className="text-xs text-neutral-500 font-mono mt-0.5">
                        {opt.arch}
                      </div>
                    </div>
                  </div>
                  {opt.isBeta ? (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-800 rounded-md">
                      BETA
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-[#00AE42] rounded-md">
                      STABLE
                    </span>
                  )}
                </div>

                {/* Info Metadata */}
                <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Version:</span>
                    <span className="font-semibold text-neutral-900">{opt.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">File Size:</span>
                    <span className="font-medium">{opt.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Released:</span>
                    <span className="font-medium">{opt.releaseDate}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-neutral-400">SHA-256:</span>
                    <button
                      onClick={() => handleCopy(opt.sha256)}
                      className="font-mono text-[10px] text-neutral-500 hover:text-neutral-900 flex items-center gap-1 p-1 rounded hover:bg-neutral-100"
                      title="Copy SHA-256 hash"
                    >
                      {copiedHash === opt.sha256 ? (
                        <span className="text-[#00AE42] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" /> {opt.sha256.slice(0, 10)}...
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Download CTA */}
              <div className="pt-6">
                <a
                  href={opt.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Installer</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub & Older Releases Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-neutral-900 text-white shrink-0">
              <ExternalLink className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-sm sm:text-base">
                Looking for Previous Releases or Full Source Code?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-500">
                Browse our complete GitHub archive of historical releases, changelogs, build instructions, and issue reports.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/bambulab/BambuStudio/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 font-semibold text-neutral-800 text-sm whitespace-nowrap transition-colors"
          >
            GitHub Releases Archive →
          </a>
        </div>
      </div>
    </section>
  )
}
