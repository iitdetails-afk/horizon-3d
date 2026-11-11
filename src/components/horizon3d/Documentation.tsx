import React from 'react'
import {
  BookOpen,
  DownloadCloud,
  GraduationCap,
  HelpCircle,
  Headphones,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react'

interface DocumentationProps {
  onOpenContact: () => void
}

export const Documentation: React.FC<DocumentationProps> = ({ onOpenContact }) => {
  const docs = [
    {
      title: 'User Guide',
      desc: 'Comprehensive handbook covering toolhead calibration, multi-plate setup, and slicing parameters.',
      icon: BookOpen,
      href: '#docs',
      isInternal: true
    },
    {
      title: 'Installation Guide',
      desc: 'Step-by-step setup walkthroughs for Windows, macOS Apple Silicon, and Linux distributions.',
      icon: DownloadCloud,
      href: '#specs',
      isInternal: true
    },
    {
      title: 'Tutorials & Workflows',
      desc: 'In-depth masterclasses on precision Gyroid infills, Arc Move optimization, and multi-color 3MF setup.',
      icon: GraduationCap,
      href: '#features',
      isInternal: true
    },
    {
      title: 'Frequently Asked Questions',
      desc: 'Instant answers to system requirements, license details, and printer profile configuration.',
      icon: HelpCircle,
      href: '#faq',
      isInternal: true
    },
    {
      title: 'Contact Support',
      desc: 'Direct inquiry channel to the Horizon 3D engineering team for bug reports and early access.',
      icon: Headphones,
      onClick: onOpenContact,
      isAction: true
    }
  ]

  return (
    <section id="docs" className="py-24 bg-[#080808] text-white border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-[#FFD000]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE & RESOURCES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            DOCUMENTATION & SUPPORT
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0A0]">
            Master every aspect of Horizon Studio with our official documentation,
            curated workflows, and dedicated support engineering.
          </p>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc, idx) => {
            const Icon = doc.icon

            const CardContent = (
              <div className="h-full p-7 rounded-3xl bg-[#171717] border border-[#262626] hover:border-[#FF5A00]/50 shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#262626] flex items-center justify-center text-[#FF5A00] group-hover:text-[#FFD000] group-hover:border-[#FF5A00]/40 transition-colors shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#FFD000] transition-colors">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-[#A0A0A0] leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#222222] flex items-center justify-between text-xs font-semibold text-[#FF5A00]">
                  <span>Access Resource</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )

            if (doc.isAction) {
              return (
                <button
                  key={idx}
                  onClick={doc.onClick}
                  className="text-left cursor-pointer w-full"
                >
                  {CardContent}
                </button>
              )
            }

            return (
              <a key={idx} href={doc.href} className="block text-left cursor-pointer">
                {CardContent}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
