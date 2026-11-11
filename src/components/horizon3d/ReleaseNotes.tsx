import React, { useState } from 'react'
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, Tag, Calendar, Layers, Zap } from 'lucide-react'
import { VERSIONS_CONFIG } from '../../config/versions'
import type { VersionRelease } from '../../config/versions'

export const ReleaseNotes: React.FC = () => {
  const [expandedVersion, setExpandedVersion] = useState<string>(VERSIONS_CONFIG[0].version)

  const toggleVersion = (ver: string) => {
    setExpandedVersion(expandedVersion === ver ? '' : ver)
  }

  return (
    <section id="release-notes" className="py-24 bg-[#080808] text-white border-t border-[#1c1c1c] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-[#FF5A00]">
            <Tag className="w-3.5 h-3.5" />
            <span>VERSION HISTORY & CHANGELOG</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            RELEASE NOTES
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0A0]">
            Review updates, algorithmic advancements, and changelogs for Horizon Studio.
            All versions are managed in <code className="text-[#FF5A00]">src/config/versions.ts</code>.
          </p>
        </div>

        {/* Versions Timeline List */}
        <div className="space-y-6">
          {VERSIONS_CONFIG.map((rel) => {
            const isExpanded = expandedVersion === rel.version

            return (
              <div
                key={rel.version}
                className="bg-[#171717] border border-[#262626] rounded-3xl overflow-hidden shadow-xl transition-all hover:border-[#FF5A00]/40"
              >
                {/* Header Accordion Button */}
                <button
                  onClick={() => toggleVersion(rel.version)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#1f1f1f]/60 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        Horizon Studio — Version {rel.version}
                      </h3>
                      {rel.isLatest && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FF5A00]/20 border border-[#FF5A00]/40 text-[#FF5A00] text-xs font-bold font-mono">
                          LATEST
                        </span>
                      )}
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#262626] text-[#FFD000] font-mono">
                        {rel.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#A0A0A0] font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#FF5A00]" />
                      <span>{rel.releaseDate}</span>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#111111] border border-[#262626] flex items-center justify-center text-[#A0A0A0] shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#FF5A00]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[#262626] space-y-6 text-sm text-[#A0A0A0] animate-in fade-in duration-200">
                    <p className="text-sm text-white/90 leading-relaxed font-medium">
                      {rel.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      {rel.changes.map((group, idx) => (
                        <div key={idx} className="bg-[#111111] p-5 rounded-2xl border border-[#262626] space-y-3">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD000] flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#FF5A00]" /> {group.category}
                          </h4>
                          <ul className="space-y-2 text-xs text-[#A0A0A0]">
                            {group.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2">
                                <span className="text-[#FF5A00] font-bold">•</span>
                                <span className="leading-snug text-white/80">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
