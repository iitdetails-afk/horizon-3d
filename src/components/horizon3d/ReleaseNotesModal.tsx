import React, { useState } from 'react'
import { X, Sparkles, CheckCircle2, Tag, Calendar, Layers } from 'lucide-react'
import { VERSIONS_CONFIG } from '../../config/versions'

interface ReleaseNotesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({ isOpen, onClose }) => {
  const [selectedVer, setSelectedVer] = useState(VERSIONS_CONFIG[0].version)

  if (!isOpen) return null

  const currentRelease =
    VERSIONS_CONFIG.find((v) => v.version === selectedVer) || VERSIONS_CONFIG[0]

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#171717] border border-[#262626] rounded-3xl max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-white">
        {/* Header */}
        <div className="p-6 border-b border-[#262626] flex items-center justify-between bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#080808] border border-[#FF5A00]/40 flex items-center justify-center text-[#FF5A00]">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Horizon Studio Changelog</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#FF5A00]/20 border border-[#FF5A00]/40 text-[#FF5A00] text-xs font-mono font-bold">
                  v{currentRelease.version}
                </span>
              </div>
              <p className="text-xs text-[#A0A0A0] font-mono mt-0.5">
                {currentRelease.releaseDate} • {currentRelease.status}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#A0A0A0] hover:text-white hover:bg-[#222222]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#A0A0A0]">
          <p className="text-sm text-white/90 leading-relaxed font-medium">
            {currentRelease.summary}
          </p>

          <div className="space-y-4">
            {currentRelease.changes.map((group, idx) => (
              <div key={idx} className="bg-[#111111] p-4 rounded-2xl border border-[#262626] space-y-2.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD000] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5A00]" /> {group.category}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#A0A0A0]">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-[#FF5A00] font-bold">•</span>
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#262626] bg-[#111111] flex items-center justify-between text-xs text-[#A0A0A0]">
          <span>Configuration: <code className="text-[#FF5A00]">src/config/versions.ts</code></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-white rounded-xl font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
