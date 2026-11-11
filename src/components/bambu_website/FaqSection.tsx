import React, { useState } from 'react'
import { ChevronDown, HelpCircle, ExternalLink, MessageSquare } from 'lucide-react'
import { FAQS } from './data'

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  const filteredFaqs = FAQS.filter((f) => {
    if (categoryFilter === 'all') return true
    return f.category === categoryFilter
  })

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#00AE42] text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Common Questions About Horizon 3D
          </h2>
          <p className="text-neutral-600 text-base">
            Everything you need to know about compatibility, open source licensing, multi-color printing, and updates.
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-2 pt-2">
            {(['all', 'general', 'compatibility', 'features', 'updates'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  categoryFilter === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIdx === index
            return (
              <div
                key={index}
                className="border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 bg-white hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-bold text-neutral-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-50 text-[#00AE42]' : 'text-neutral-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 pt-3 bg-neutral-50/40 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Support Help Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#00AE42] text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-neutral-900 text-sm">Still have questions?</div>
              <div className="text-xs text-neutral-600">
                Check our official Bambu Wiki or ask in the vibrant Bambu Lab Community Forum.
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="https://wiki.bambulab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors"
            >
              <span>Bambu Wiki</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
            <a
              href="https://forum.bambulab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#00AE42] text-white rounded-xl text-xs font-semibold hover:bg-[#009638] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Community Forum</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
