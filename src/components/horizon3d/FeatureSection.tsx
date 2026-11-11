import React, { useState } from 'react'
import {
  Layers,
  Zap,
  Boxes,
  Sliders,
  FolderGit2,
  Workflow,
  Sparkles,
  ArrowRight,
  Shield,
  Gauge
} from 'lucide-react'

export const FeatureSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const features = [
    {
      id: 1,
      title: 'Intelligent 3D Model Preparation',
      subtitle: 'Prepare 3D models with precision and flexibility.',
      description:
        'Automated manifold mesh inspection, auto-orientation for minimal support contact, and intelligent geometry repair algorithms designed for complex CAD assemblies.',
      icon: Layers,
      highlight: 'Auto-Orient & Mesh Repair',
      accent: '#FF5A00'
    },
    {
      id: 2,
      title: 'Advanced Slicing Technology',
      subtitle: 'Optimize printing settings for better results.',
      description:
        'Next-generation path generation with Arc Move vector curve fitting, pressure advance compensation, and adaptive layer height optimization down to 0.08mm.',
      icon: Zap,
      highlight: 'Arc Move & Dynamic Flow',
      accent: '#FFD000'
    },
    {
      id: 3,
      title: 'Multi-Model Workflow',
      subtitle: 'Manage multiple models and printing projects efficiently.',
      description:
        'Organize dozens of individual parts across unified virtual build plates. Group, duplicate, and assign localized parameters per part without reopening separate files.',
      icon: Boxes,
      highlight: 'Multi-Plate Canvas',
      accent: '#E52B00'
    },
    {
      id: 4,
      title: 'Precision Control',
      subtitle: 'Fine-tune print settings for detailed output.',
      description:
        'Complete control over volumetric extrusion speeds, acceleration limits, seam positioning, infill geometry (Gyroid, Honeycomb, Adaptive Cubic), and wall loops.',
      icon: Sliders,
      highlight: 'Micron-Level Settings',
      accent: '#FF5A00'
    },
    {
      id: 5,
      title: 'Smart Project Management',
      subtitle: 'Organize, save, and manage your 3D printing projects.',
      description:
        'Unified 3MF project bundling packages model geometry, custom material recipes, slicing profiles, and plate layouts in one compact, standardized archive.',
      icon: FolderGit2,
      highlight: 'Unified 3MF Ecosystem',
      accent: '#FFD000'
    },
    {
      id: 6,
      title: 'Seamless Workflow',
      subtitle: 'Move from design to printing with a smooth experience.',
      description:
        'Direct connection to your 3D printer over local Wi-Fi LAN or secure remote cloud. Live camera monitoring, real-time nozzle telemetry, and instant job dispatch.',
      icon: Workflow,
      highlight: 'Instant Device Connect',
      accent: '#E52B00'
    }
  ]

  return (
    <section id="features" className="py-24 bg-[#080808] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-[#FFD000]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUILT FOR NEXT-GEN FABRICATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            POWERFUL TOOLS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A00] via-[#E52B00] to-[#FFD000]">
              LIMITLESS POSSIBILITIES.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
            Every feature in Horizon Studio is engineered to eliminate slicing guesswork,
            unlock blistering print velocities, and guarantee surface perfection.
          </p>
        </div>

        {/* Features 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat) => {
            const Icon = feat.icon
            const isHovered = activeCard === feat.id

            return (
              <div
                key={feat.id}
                onMouseEnter={() => setActiveCard(feat.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative rounded-3xl p-7 bg-[#171717] border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isHovered
                    ? 'border-[#FF5A00]/70 shadow-[0_0_30px_rgba(255,90,0,0.15)] -translate-y-1'
                    : 'border-[#262626] hover:border-[#383838]'
                }`}
              >
                {/* Subtle top corner gradient accent */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
                  style={{ backgroundColor: feat.accent }}
                ></div>

                <div className="space-y-4 relative z-10">
                  {/* Icon Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#262626] flex items-center justify-center text-white shadow-md transition-colors group-hover:border-[#FF5A00]/40">
                      <Icon className="w-6 h-6 text-[#FF5A00] group-hover:text-[#FFD000] transition-colors" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#111111] border border-[#262626] text-[#A0A0A0]">
                      {feat.highlight}
                    </span>
                  </div>

                  {/* Title & Subheading */}
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#FFD000] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#FF5A00] mt-0.5">
                      {feat.subtitle}
                    </p>
                  </div>

                  {/* Full Description */}
                  <p className="text-xs text-[#A0A0A0] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-6 mt-4 border-t border-[#222222] flex items-center justify-between text-xs text-[#A0A0A0] relative z-10">
                  <span className="font-mono text-[11px] text-[#666666]">
                    MODULE 0{feat.id}
                  </span>
                  <span className="text-[#FF5A00] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
