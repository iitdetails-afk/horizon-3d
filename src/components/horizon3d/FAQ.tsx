import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'

interface FAQProps {
  onOpenContact: () => void
}

export const FAQ: React.FC<FAQProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: 'What is Horizon Studio?',
      a: 'Horizon Studio is a specialized 3D printing slicing and project preparation software suite created for the Horizon 3D ecosystem. It translates 3D CAD models (STL, STEP, 3MF) into high-velocity machine toolpaths with Arc Move path smoothing, intelligent multi-plate layout, and granular extrusion control.'
    },
    {
      q: 'Which operating systems are supported?',
      a: 'Horizon Studio supports Windows 10 & Windows 11 (64-bit), macOS 11.0 Big Sur or later (native Universal binary for Apple Silicon M1-M4 and Intel x86_64), as well as modern Linux distributions via standalone AppImage and Flatpak packages.'
    },
    {
      q: 'Is Horizon Studio free?',
      a: 'Yes. Horizon Studio is completely free to download and use for both personal and commercial 3D printing projects. Open-source architectural components are licensed under the AGPLv3.'
    },
    {
      q: 'How do I install Horizon Studio?',
      a: 'Horizon Studio is built for cross-platform deployment. On Windows, execute the .exe installer or extract the portable package. On macOS, open the .dmg and drag Horizon Studio to your Applications folder. On Linux, execute the standalone AppImage. Request early access via Contact / Get Started.'
    },
    {
      q: 'What are the minimum system requirements?',
      a: 'Minimum requirements include an Intel/AMD 64-bit multi-core CPU (2.0 GHz+), 8 GB of RAM, 2 GB of free disk space, and an OpenGL 2.0+ capable graphics processor. For complex multi-million triangle CAD assemblies, 16 GB RAM and a dedicated GPU are recommended.'
    },
    {
      q: 'Where can I find the installation guide?',
      a: 'You can access the comprehensive installation guide in the Documentation section above or by clicking the Installation Guide card, which contains platform-specific step-by-step setup walkthroughs and troubleshooting instructions.'
    },
    {
      q: 'How do I report an issue or request a feature?',
      a: 'You can submit bug reports, feature suggestions, or inquiry tickets directly via the "Contact / Get Started" portal in the navigation bar or by reaching out through the official Horizon 3D issue tracker.'
    }
  ]

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 bg-[#080808] text-white border-t border-[#1c1c1c] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-[#FF5A00]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0A0]">
            Quick answers regarding Horizon Studio compatibility, system installation, and features.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#171717] border border-[#262626] overflow-hidden transition-all duration-200 hover:border-[#383838]"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#1c1c1c]/50 transition-colors"
                >
                  <span className="font-bold text-white text-base sm:text-lg tracking-tight">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#111111] border border-[#262626] flex items-center justify-center text-[#A0A0A0] shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#FF5A00]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#A0A0A0] leading-relaxed border-t border-[#222222] animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Support Help CTA */}
        <div className="mt-12 p-6 rounded-3xl bg-[#111111] border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#171717] border border-[#262626] flex items-center justify-center text-[#FF5A00]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a specific question?</h4>
              <p className="text-xs text-[#A0A0A0]">Our engineering team is here to assist.</p>
            </div>
          </div>
          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 bg-[#FF5A00] hover:bg-[#E52B00] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  )
}
