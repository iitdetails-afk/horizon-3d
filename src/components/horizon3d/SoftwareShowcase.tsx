import React, { useState } from 'react'
import {
  Layers,
  Settings2,
  Sliders,
  Play,
  Flame,
  Gauge,
  Box,
  Eye,
  RotateCw,
  Sparkles,
  Maximize2,
  Info,
  CheckCircle2,
  Printer
} from 'lucide-react'

export const SoftwareShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'prepare' | 'device'>('preview')
  const [scrubLayer, setScrubLayer] = useState(194)
  const maxLayers = 280

  return (
    <section id="showcase" className="py-24 bg-[#080808] text-white border-t border-[#1c1c1c] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF5A00]/6 blur-[160px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-[#FF5A00]">
            <Gauge className="w-3.5 h-3.5" />
            <span>SOFTWARE INTERFACE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            ENGINEERED FOR PRECISION
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
            An intuitive high-performance workspace designed for rapid preparation,
            granular parameter tuning, and microscopic layer path inspection.
          </p>
        </div>

        {/* Large Horizon Studio Desktop Window Mockup */}
        <div className="bg-[#111111] border border-[#262626] rounded-3xl shadow-2xl shadow-black overflow-hidden relative">
          {/* Top Window Titlebar */}
          <div className="bg-[#171717] px-4 py-3 border-b border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#E52B00]/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFD000]/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#FF5A00]/80"></div>
              </div>
              <span className="text-xs font-mono font-medium text-[#A0A0A0] ml-2 hidden sm:inline">
                HORIZON STUDIO v1.0.0 — [Turbine_Core_Assembly_v3.3mf]
              </span>
            </div>

            {/* Application Modes */}
            <div className="flex items-center bg-[#080808] p-1 rounded-xl border border-[#262626] text-xs font-semibold">
              <button
                onClick={() => setActiveTab('prepare')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'prepare' ? 'bg-[#171717] text-white shadow' : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                Prepare
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'preview' ? 'bg-[#FF5A00] text-white shadow' : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('device')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'device' ? 'bg-[#171717] text-white shadow' : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                Device Monitor
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#A0A0A0] font-mono hidden md:flex">
              <span>PRINTER: <strong className="text-white">Horizon One Pro (0.4mm)</strong></span>
            </div>
          </div>

          {/* Slicer Workspace Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Tools & Parts List (3 cols) */}
            <div className="lg:col-span-3 bg-[#111111] p-4 border-r border-[#262626] space-y-5 text-xs">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5A00] mb-2">
                  Project Hierarchy
                </div>
                <div className="space-y-1.5 font-mono text-[#A0A0A0]">
                  <div className="p-2.5 rounded-xl bg-[#171717] border border-[#262626] text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-[#FF5A00]" /> Turbine_Rotor.step
                    </span>
                    <span className="text-[10px] text-[#FFD000]">Solid</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#171717]/60 border border-[#222222] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-[#A0A0A0]" /> Bearing_Sleeve.step
                    </span>
                    <span className="text-[10px]">Solid</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#171717]/60 border border-[#222222] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-[#A0A0A0]" /> Exhaust_Stator.step
                    </span>
                    <span className="text-[10px]">Solid</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#262626] pt-4">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5A00] mb-2">
                  Toolpath Presets
                </div>
                <div className="space-y-2 text-[#A0A0A0]">
                  <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                    <span>Profile:</span>
                    <span className="text-white font-mono">0.16mm Precision</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                    <span>Infill Pattern:</span>
                    <span className="text-white font-mono">15% Gyroid</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                    <span>Wall Loops:</span>
                    <span className="text-white font-mono">3 (1.2mm)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                    <span>Seam Position:</span>
                    <span className="text-white font-mono">Back Aligned</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#262626] pt-4">
                <div className="p-3 bg-[#171717] rounded-xl border border-[#262626] text-[11px] text-[#A0A0A0] space-y-1">
                  <div className="text-[#FFD000] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Arc Move G2/G3 Active
                  </div>
                  <p>Reduces toolhead micro-vibrations by fitting curves with continuous arcs.</p>
                </div>
              </div>
            </div>

            {/* Center 3D Slicing Preview Canvas (6 cols) */}
            <div className="lg:col-span-6 bg-[#080808] p-6 flex flex-col justify-between relative select-none overflow-hidden">
              {/* Build Plate Perspective Grid */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div
                  className="w-[440px] h-[440px] rounded-xl border-2 border-[#FF5A00]/30"
                  style={{
                    transform: 'perspective(600px) rotateX(45deg) rotateZ(-15deg)',
                    backgroundImage:
                      'radial-gradient(circle, rgba(255, 90, 0, 0.25) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                >
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-[#FF5A00]">
                    Horizon Heated Bed 256×256mm
                  </div>
                </div>
              </div>

              {/* Viewport Overlay Controls */}
              <div className="flex items-center justify-between relative z-10 text-xs font-mono">
                <div className="flex items-center gap-2 bg-[#171717]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#262626] text-[#A0A0A0]">
                  <Eye className="w-3.5 h-3.5 text-[#FF5A00]" />
                  <span>CAMERA: ISOMETRIC</span>
                </div>
                <div className="text-[11px] text-[#FFD000] bg-[#171717]/90 px-3 py-1.5 rounded-lg border border-[#262626]">
                  VIEWPORT READY
                </div>
              </div>

              {/* Simulated Sliced Model Stack */}
              <div className="relative my-auto flex flex-col items-center justify-center z-10 py-6">
                <div className="space-y-1.5 flex flex-col items-center">
                  {/* Toolhead Extruder Nozzle Indicator */}
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5A00] ring-4 ring-[#FF5A00]/30 shadow-lg animate-ping"></div>

                  {/* Sliced layers */}
                  <div
                    className="h-8 rounded-lg bg-gradient-to-r from-[#FF5A00] to-[#FFD000] shadow-lg flex items-center justify-center text-xs font-mono font-bold text-black transition-all duration-200"
                    style={{ width: `${Math.max(140, (scrubLayer / maxLayers) * 260)}px` }}
                  >
                    Layer {scrubLayer} / {maxLayers}
                  </div>
                  <div
                    className="h-12 rounded-lg bg-[#E52B00] shadow-md flex items-center justify-center text-xs font-mono text-white opacity-90 transition-all duration-200"
                    style={{ width: `${Math.max(170, (scrubLayer / maxLayers) * 300)}px` }}
                  >
                    Outer Perimeters (300 mm/s)
                  </div>
                  <div className="w-80 h-16 rounded-xl bg-[#171717] border border-[#262626] shadow-xl flex items-center justify-center text-xs font-mono text-[#A0A0A0]">
                    Gyroid Core Foundation & Raft
                  </div>
                </div>
              </div>

              {/* Bottom Layer Timeline Slider */}
              <div className="relative z-10 bg-[#171717]/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#262626] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#FF5A00]" />
                    <span className="font-semibold text-white">Layer Timeline Inspector:</span>
                    <span className="font-mono text-[#FFD000] font-bold">
                      Layer {scrubLayer} of {maxLayers} ({(scrubLayer * 0.16).toFixed(2)}mm)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#A0A0A0] font-mono">FLOW: 24.2 mm³/s</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#666666] font-mono">01</span>
                  <input
                    type="range"
                    min="1"
                    max={maxLayers}
                    value={scrubLayer}
                    onChange={(e) => setScrubLayer(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#FF5A00]"
                  />
                  <span className="text-[10px] text-[#666666] font-mono">{maxLayers}</span>
                </div>
              </div>
            </div>

            {/* Right Telemetry & Printer Output Panel (3 cols) */}
            <div className="lg:col-span-3 bg-[#111111] p-4 border-l border-[#262626] space-y-5 text-xs">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5A00] mb-2">
                  Filament & Extrusion
                </div>
                <div className="p-3 rounded-2xl bg-[#171717] border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Horizon Carbon PLA</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A00]"></span>
                  </div>
                  <div className="text-[11px] text-[#A0A0A0] font-mono">
                    <div>Nozzle Temp: <strong className="text-white">220°C</strong></div>
                    <div>Bed Temp: <strong className="text-white">60°C</strong></div>
                    <div>Density: <strong className="text-white">1.24 g/cm³</strong></div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#262626] pt-4">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5A00] mb-2">
                  Slicing Estimation
                </div>
                <div className="space-y-2 font-mono text-[#A0A0A0]">
                  <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                    <span>Print Time:</span>
                    <span className="text-[#FFD000] font-bold">1h 42m</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                    <span>Filament Mass:</span>
                    <span className="text-white font-semibold">48.6 g</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                    <span>Filament Length:</span>
                    <span className="text-white font-semibold">16.32 m</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1c1c1c]">
                    <span>Estimated Cost:</span>
                    <span className="text-[#FF5A00] font-bold">$1.22</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#262626] pt-4">
                <div className="p-3 bg-[#080808] rounded-xl border border-[#262626] text-[11px] text-[#A0A0A0] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#FF5A00] shrink-0" />
                  <span>Representative visual mockup of Horizon Studio workspace.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
