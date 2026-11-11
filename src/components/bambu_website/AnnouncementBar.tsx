import React, { useState } from 'react'
import { Sparkles, X, ArrowRight } from 'lucide-react'

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-[#111827] text-white text-xs sm:text-sm py-2 px-4 transition-all border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto truncate">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AE42] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00AE42]"></span>
          </span>
          <span className="font-semibold text-[#00AE42] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 inline" /> Horizon 3D v1.10.1 Released:
          </span>
          <span className="text-neutral-300 hidden md:inline">
            Major performance optimizations, Arc Move path smoothing & enhanced multi-plate workflow.
          </span>
          <a
            href="#release-notes"
            className="text-white underline hover:text-[#00AE42] transition-colors font-medium flex items-center gap-0.5 ml-1"
          >
            Read Release Notes <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
