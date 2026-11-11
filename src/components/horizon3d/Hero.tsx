import React from 'react'
import { Sparkles, ChevronRight, Layers, Cpu, ShieldCheck, Eye, ArrowDown } from 'lucide-react'
import { Hero3DCanvas } from './Hero3DCanvas'

interface HeroProps {
  onOpenContact?: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-24 pb-16 flex items-center bg-[#080808] text-white overflow-hidden"
    >
      {/* Background Gradients & Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF5A00]/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#FFD000]/8 blur-[160px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-7 z-10 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#FF5A00] animate-ping"></span>
              <span className="text-[#FF5A00] font-bold tracking-wider uppercase text-[10px]">
                NEXT-GENERATION 3D SLICING
              </span>
              <span className="text-[#404040]">|</span>
              <span className="text-[#FFD000] font-mono text-[11px]">VERSION 1.0.0</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
              HORIZON{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A00] via-[#E52B00] to-[#FFD000]">
                STUDIO
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl font-medium text-white/95 tracking-tight">
              Transform your ideas into extraordinary 3D creations.
            </p>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed max-w-xl">
              Horizon Studio brings powerful 3D printing tools, intelligent workflows, and precision
              control together in one seamless experience. Engineered for high-speed precision,
              multi-model fabrication, and cinematic toolpath visualization.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#showcase"
                className="relative group overflow-hidden rounded-xl p-[1px] font-bold text-sm shadow-xl shadow-[#FF5A00]/25 transition-transform active:scale-95 text-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF5A00] via-[#E52B00] to-[#FFD000] rounded-xl"></span>
                <span className="relative flex items-center justify-center gap-2 px-7 py-4 bg-[#FF5A00] group-hover:bg-[#E52B00] rounded-[11px] text-white transition-all">
                  <Eye className="w-4 h-4 text-white" />
                  <span>EXPLORE HORIZON STUDIO</span>
                </span>
              </a>

              <a
                href="#features"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#111111] hover:bg-[#171717] border border-[#262626] hover:border-[#FF5A00]/50 text-white font-semibold text-sm transition-all"
              >
                <span>EXPLORE FEATURES</span>
                <ChevronRight className="w-4 h-4 text-[#FF5A00]" />
              </a>
            </div>

            {/* Feature Highlights Ticker */}
            <div className="pt-4 border-t border-[#1c1c1c] grid grid-cols-3 gap-4 text-xs text-[#A0A0A0]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF5A00] shrink-0" />
                <span>Zero Telemetry Bloat</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#FFD000] shrink-0" />
                <span>Multi-Core Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E52B00] shrink-0" />
                <span>Micron Resolution</span>
              </div>
            </div>
          </div>

          {/* Right 3D Visualizer Column (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient circular frame */}
            <div className="w-full h-full relative rounded-3xl border border-[#262626] bg-[#111111]/40 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black">
              {/* Top status bar */}
              <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2 bg-[#171717]/80 backdrop-blur-md border-b border-[#262626] flex items-center justify-between text-[11px] font-mono text-[#A0A0A0]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5A00] animate-pulse"></span>
                  <span className="text-white font-bold">HORIZON 3D VIEWPORT</span>
                </div>
                <span className="text-[#FFD000]">REALTIME 3D</span>
              </div>

              {/* Three.js Interactive Canvas */}
              <Hero3DCanvas />

              {/* Bottom control hint */}
              <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[10px] font-mono text-[#A0A0A0]/80">
                <span>DRAG TO ROTATE 3D MODEL</span>
                <span className="text-[#FF5A00]">60 FPS WEGL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
