import React, { useState } from 'react'
import {
  Layers,
  Play,
  RotateCw,
  Eye,
  Sliders,
  Settings,
  Flame,
  Gauge,
  Sparkles,
  Maximize2,
  Box,
  Palette,
  Check
} from 'lucide-react'

export const InteractiveStudioMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'prepare' | 'device'>('preview')
  const [currentLayer, setCurrentLayer] = useState(195)
  const [selectedPlate, setSelectedPlate] = useState<number>(1)
  const [speedMode, setSpeedMode] = useState<'Standard' | 'Sport' | 'Ludicrous' | 'Silent'>('Standard')
  const [activeAmsSlot, setActiveAmsSlot] = useState(1)

  const maxLayers = 280

  const amsSlots = [
    { id: 1, name: 'Bambu PLA Basic', color: '#00AE42', label: 'Bambu Green', temp: '220°C', remain: '88%' },
    { id: 2, name: 'Bambu PLA Matte', color: '#1A1A1A', label: 'Charcoal Black', temp: '215°C', remain: '65%' },
    { id: 3, name: 'Bambu PLA Basic', color: '#FFFFFF', label: 'Jade White', temp: '220°C', remain: '94%' },
    { id: 4, name: 'Bambu PLA Silk', color: '#E5A93C', label: 'Silk Gold', temp: '225°C', remain: '42%' }
  ]

  return (
    <section className="py-12 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-[#00AE42]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Workspace Preview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Experience the Workspace Before You Download
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Try the real-time layer scrubber, switch AMS color spools, and simulate multi-speed motion planning right in your browser.
          </p>
        </div>

        {/* Studio Window Mockup Frame */}
        <div className="rounded-2xl border border-neutral-700/80 bg-neutral-950 shadow-2xl overflow-hidden">
          {/* Window Top Titlebar */}
          <div className="bg-neutral-900/90 border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-xs text-neutral-400 font-mono ml-2 hidden sm:inline">
                Horizon 3D — [Dual_Turbine_Core_Assembly.3mf]
              </span>
            </div>

            {/* Main Studio Tabs */}
            <div className="flex items-center bg-neutral-950 rounded-lg p-0.5 border border-neutral-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('prepare')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'prepare' ? 'bg-neutral-800 text-white font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Prepare
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'preview' ? 'bg-[#00AE42] text-white font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('device')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'device' ? 'bg-neutral-800 text-white font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Device (Live)
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="hidden sm:inline">Printer: <strong className="text-white">Bambu Lab X1-Carbon (0.4 nozzle)</strong></span>
            </div>
          </div>

          {/* Sub Toolbar & AMS Slots */}
          <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* AMS Slots Selector */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-medium mr-1 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-[#00AE42]" /> AMS Slots:
              </span>
              <div className="flex items-center gap-1.5">
                {amsSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setActiveAmsSlot(slot.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all ${
                      activeAmsSlot === slot.id
                        ? 'border-[#00AE42] bg-emerald-950/40 text-white ring-1 ring-[#00AE42]'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/30"
                      style={{ backgroundColor: slot.color }}
                    ></span>
                    <span className="font-mono font-semibold">0{slot.id}</span>
                    <span className="hidden sm:inline text-[11px]">{slot.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Mode Selector */}
            <div className="flex items-center gap-1 bg-neutral-950 px-2 py-1 rounded-md border border-neutral-800">
              <Gauge className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-400 mr-1">Speed:</span>
              {(['Silent', 'Standard', 'Sport', 'Ludicrous'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSpeedMode(mode)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    speedMode === mode
                      ? 'bg-[#00AE42] text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Canvas Mockup Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[460px]">
            {/* Left Sidebar - Plate & Slice settings */}
            <div className="bg-neutral-900/60 p-4 border-r border-neutral-800 space-y-4 text-xs">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Plate Selection (Multi-Plate)
                </div>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedPlate(1)}
                    className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${
                      selectedPlate === 1
                        ? 'bg-neutral-800 border-[#00AE42] text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">Plate 1: Turbine Rotor Assembly</div>
                      <div className="text-[10px] text-neutral-400">Textured PEI Plate • 256x256mm</div>
                    </div>
                    {selectedPlate === 1 && <Check className="w-4 h-4 text-[#00AE42]" />}
                  </button>
                  <button
                    onClick={() => setSelectedPlate(2)}
                    className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${
                      selectedPlate === 2
                        ? 'bg-neutral-800 border-[#00AE42] text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">Plate 2: Stator Mounting Ring</div>
                      <div className="text-[10px] text-neutral-400">Smooth PEI Plate • 256x256mm</div>
                    </div>
                    {selectedPlate === 2 && <Check className="w-4 h-4 text-[#00AE42]" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Active Slicing Presets
                </div>
                <div className="space-y-2 text-neutral-300">
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-500">Layer Height:</span>
                    <span className="font-mono font-medium">0.16mm Optimal</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-500">Infill Density:</span>
                    <span className="font-mono font-medium">15% Gyroid</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-500">Seam Position:</span>
                    <span className="font-mono font-medium">Aligned (Back)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-500">Arc Move:</span>
                    <span className="font-mono text-[#00AE42] font-semibold">Enabled (G2/G3)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-500">Purge Tower:</span>
                    <span className="font-mono font-medium">Active (Auto-Position)</span>
                  </div>
                </div>
              </div>

              {/* Slicing Quick Action */}
              <div className="pt-2">
                <button
                  onClick={() => setCurrentLayer(maxLayers)}
                  className="w-full py-2.5 bg-[#00AE42] hover:bg-[#009638] text-white font-bold rounded-lg text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Re-Slice Plate
                </button>
              </div>
            </div>

            {/* Center 3D Simulated Interactive Slicing View */}
            <div className="lg:col-span-3 p-6 flex flex-col justify-between relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 select-none overflow-hidden">
              {/* Build Plate Perspective Grid */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div
                  className="w-[480px] h-[480px] rounded-lg border-2 border-[#00AE42]/40"
                  style={{
                    transform: 'perspective(600px) rotateX(45deg) rotateZ(-15deg)',
                    backgroundImage:
                      'radial-gradient(circle, rgba(0, 174, 66, 0.25) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                >
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-emerald-400/80">
                    Bambu Lab 256×256mm Bed
                  </div>
                </div>
              </div>

              {/* Simulated 3D Sliced Model Stack */}
              <div className="relative my-auto flex flex-col items-center justify-center z-10 py-8">
                {/* Visual Height Model rendering based on current layer */}
                <div className="relative flex flex-col items-center">
                  {/* Toolhead indicator */}
                  <div className="w-4 h-4 rounded-full bg-amber-400 ring-4 ring-amber-400/20 shadow-lg animate-ping absolute -top-4"></div>
                  <div className="w-5 h-5 rounded-md bg-amber-400 shadow-md flex items-center justify-center text-[8px] font-bold text-neutral-950 absolute -top-3">
                    0.4
                  </div>

                  {/* Multi-tier rendered concentric slices */}
                  <div className="space-y-1 flex flex-col items-center">
                    {/* Upper Slice Top */}
                    <div
                      className="h-10 rounded-xl transition-all duration-300 shadow-xl border border-white/20 flex items-center justify-center font-mono text-xs font-bold"
                      style={{
                        width: `${Math.max(120, (currentLayer / maxLayers) * 260)}px`,
                        backgroundColor: amsSlots[activeAmsSlot - 1].color,
                        color: activeAmsSlot === 3 ? '#111' : '#fff'
                      }}
                    >
                      Layer {currentLayer} / {maxLayers}
                    </div>

                    {/* Middle Core Slices */}
                    <div
                      className="h-14 rounded-lg bg-[#00AE42] transition-all duration-300 shadow-md opacity-90 border border-emerald-400/30 flex items-center justify-center text-xs text-white font-mono"
                      style={{
                        width: `${Math.max(160, (currentLayer / maxLayers) * 310)}px`
                      }}
                    >
                      Perimeter Slices (Arc Move Active)
                    </div>

                    {/* Lower Base Infill */}
                    <div
                      className="h-16 rounded-xl bg-neutral-800 transition-all duration-300 shadow-lg border border-neutral-700 flex items-center justify-center text-xs text-neutral-300 font-mono"
                      style={{
                        width: '340px'
                      }}
                    >
                      Base Raft & Gyroid Infill Foundation (15%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Layer Scrub Control Bar */}
              <div className="relative z-10 bg-neutral-900/90 backdrop-blur-md rounded-xl p-4 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00AE42]" />
                    <span className="font-semibold text-white">Layer Height Inspector:</span>
                    <span className="font-mono text-[#00AE42] font-bold">
                      Layer {currentLayer} of {maxLayers} ({((currentLayer * 0.16)).toFixed(2)} mm)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400 font-mono text-[11px]">
                    <span>Speed: <strong className="text-white">{speedMode}</strong></span>
                    <span>•</span>
                    <span>Fan: <strong className="text-emerald-400">100% Dynamic</strong></span>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-neutral-500 font-mono">01</span>
                  <input
                    type="range"
                    min="1"
                    max={maxLayers}
                    value={currentLayer}
                    onChange={(e) => setCurrentLayer(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#00AE42]"
                  />
                  <span className="text-[10px] text-neutral-500 font-mono">{maxLayers}</span>
                </div>

                {/* Slicing Output Live Stats Bar */}
                <div className="pt-2 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-y-2 text-xs">
                  <div className="flex items-center gap-4 text-neutral-300">
                    <span>⏱️ Est. Time: <strong className="text-white">1h 48m</strong></span>
                    <span>⚖️ Weight: <strong className="text-white">54.2 g</strong></span>
                    <span>💵 Material Cost: <strong className="text-[#00AE42]">$1.35</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-400 font-mono">Slice Algorithm: ArcWelder v2</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
