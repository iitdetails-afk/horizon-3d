import React, { useState } from 'react'
import { X, Sparkles, CheckCircle2, Bug, Zap, Tag, ExternalLink } from 'lucide-react'
import { RELEASE_NOTES } from './data'

interface ReleaseNotesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({ isOpen, onClose }) => {
  const [selectedVersion, setSelectedVersion] = useState(RELEASE_NOTES[0].version)

  if (!isOpen) return null

  const currentRelease =
    RELEASE_NOTES.find((r) => r.version === selectedVersion) || RELEASE_NOTES[0]

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-neutral-900">
                Horizon 3D Release Notes
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00AE42] text-xs font-bold">
                {currentRelease.version}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Released on {currentRelease.date} • Open Source under AGPLv3
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Version Selector Tabs */}
        <div className="flex border-b border-neutral-200 px-6 gap-3 bg-neutral-50/30 overflow-x-auto text-xs">
          {RELEASE_NOTES.map((r) => (
            <button
              key={r.version}
              onClick={() => setSelectedVersion(r.version)}
              className={`py-3 px-1 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                selectedVersion === r.version
                  ? 'border-[#00AE42] text-[#00AE42]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {r.version} {r.isLatest && '(Latest)'}
            </button>
          ))}
        </div>

        {/* Release Notes Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Highlights */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
            <h4 className="font-bold text-[#00AE42] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Version Highlights
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-800">
              {currentRelease.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00AE42] font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New Features */}
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" /> New Features
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-700 pl-1">
              {currentRelease.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optimizations */}
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" /> Improvements & Optimizations
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-700 pl-1">
              {currentRelease.optimizations.map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">↑</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bug Fixes */}
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Bug className="w-4 h-4 text-amber-600" /> Bug Fixes
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-700 pl-1">
              {currentRelease.bugFixes.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">✘</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs">
          <a
            href="https://github.com/bambulab/BambuStudio/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 flex items-center gap-1 font-medium"
          >
            <span>View Full Changelog on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-neutral-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
