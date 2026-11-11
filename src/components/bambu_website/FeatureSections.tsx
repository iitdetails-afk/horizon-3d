import React, { useState } from 'react'
import {
  Layers,
  Zap,
  Palette,
  Wifi,
  Eye,
  Sliders,
  CheckCircle2,
  Cpu,
  Shield,
  Gauge,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react'

export const FeatureSections: React.FC = () => {
  const [activeSpeedDemo, setActiveSpeedDemo] = useState<'arc' | 'cooling' | 'overhang'>('arc')
  const [activeColorDemo, setActiveColorDemo] = useState<number>(1)

  return (
    <div className="space-y-24 py-16 bg-white text-neutral-900 overflow-hidden">
      {/* =========================================================================
          FEATURE 1: PROJECT-BASED WORKFLOW (All-in-One 3MF)
         ========================================================================= */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#00AE42]">
              <Layers className="w-3.5 h-3.5" />
              <span>Project-Based Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              An All-in-One 3MF Format. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AE42] to-emerald-600">
                Organize Your Entire Print in One File.
              </span>
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              Forget juggling countless disjointed STL files, exported G-codes, and forgotten slicer settings.
              Horizon 3D packages 3D geometry, plate layouts, slicing parameters, custom filament profiles,
              and color mappings into a cohesive, standardized 3MF project container.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-[#00AE42] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Multi-Plate Project Support</h3>
                  <p className="text-sm text-neutral-600">
                    Arrange complex projects across dozens of virtual build plates. Slice and print plates individually or queue them without opening multiple windows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-[#00AE42] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Assembly & Part View Hierarchy</h3>
                  <p className="text-sm text-neutral-600">
                    Inspect multi-part assemblies with a clear tree structure. Modify layer heights, infills, wall loops, and filament assignments on individual components.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-[#00AE42] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Centralized Resource Manager</h3>
                  <p className="text-sm text-neutral-600">
                    Synchronize your custom filament brands, machine profiles, and nozzle diameters securely across the cloud or keep them localized.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-800 text-white relative">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs">
              <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Multi-Plate 3MF Assembly
              </span>
              <span className="text-neutral-400">Total Plates: 3 • Objects: 14</span>
            </div>

            <div className="py-6 space-y-3">
              {/* Plate 1 Card */}
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-[#00AE42]">
                    P1
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">Chassis & Motor Mount</div>
                    <div className="text-xs text-neutral-400">Textured PEI • PLA Basic • 1h 24m</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-300 font-medium">
                  Ready to Print
                </span>
              </div>

              {/* Plate 2 Card */}
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-blue-400">
                    P2
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">Dual Turbine Impellers (2x)</div>
                    <div className="text-xs text-neutral-400">Smooth PEI • PETG-HF • 2h 10m</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-700 text-neutral-300 font-medium">
                  Sliced
                </span>
              </div>

              {/* Plate 3 Card */}
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400">
                    P3
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">External Aerodynamic Cowling</div>
                    <div className="text-xs text-neutral-400">Textured PEI • PLA Matte • 45m</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-700 text-neutral-300 font-medium">
                  Prepared
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
              <span>Standardized 3MF specification</span>
              <span className="text-[#00AE42] font-semibold">100% Compatible with MakerWorld</span>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          FEATURE 2: HIGH-SPEED PRINT AT QUALITY
         ========================================================================= */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 text-xs font-semibold text-[#00AE42]">
              <Zap className="w-3.5 h-3.5" />
              <span>High-Speed Motion Algorithms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Engineered for 500 mm/s High-Speed Printing
            </h2>
            <p className="text-neutral-600 text-base">
              Printing fast is easy; printing fast with injection-mold quality requires surgical mathematical optimization.
              Horizon 3D incorporates intelligent motion generation to suppress vibrations and preserve microscopic details.
            </p>

            {/* Interactive Selector */}
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={() => setActiveSpeedDemo('arc')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeSpeedDemo === 'arc'
                    ? 'bg-[#00AE42] text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                Arc Move (G2/G3)
              </button>
              <button
                onClick={() => setActiveSpeedDemo('cooling')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeSpeedDemo === 'cooling'
                    ? 'bg-[#00AE42] text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                Smart Cooling
              </button>
              <button
                onClick={() => setActiveSpeedDemo('overhang')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeSpeedDemo === 'overhang'
                    ? 'bg-[#00AE42] text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                Auto Slow Down for Overhangs
              </button>
            </div>
          </div>

          {/* Feature Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Arc Move */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                activeSpeedDemo === 'arc'
                  ? 'bg-white border-[#00AE42] shadow-xl ring-2 ring-[#00AE42]/20'
                  : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00AE42] flex items-center justify-center mb-5">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Arc Move (ArcWelder)</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                Replaces thousands of tiny linear G1 vector segments along curves with continuous G2/G3 mathematical arcs.
                Dramatically reduces machine jerk, motor vibration, and communication bandwidth stutter.
              </p>
              <div className="p-3 bg-neutral-50 rounded-lg text-xs font-mono text-neutral-700 border border-neutral-200">
                <span className="text-[#00AE42] font-bold">✔ 92% fewer G-code commands</span> on curved contours.
              </div>
            </div>

            {/* Card 2: Smart Dynamic Cooling */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                activeSpeedDemo === 'cooling'
                  ? 'bg-white border-[#00AE42] shadow-xl ring-2 ring-[#00AE42]/20'
                  : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Smart Dynamic Cooling</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                Automatically calculates thermal dissipation based on layer print duration and specific material properties.
                Maintains optimal layer bonding without premature shrinkage or warping.
              </p>
              <div className="p-3 bg-neutral-50 rounded-lg text-xs font-mono text-neutral-700 border border-neutral-200">
                <span className="text-blue-600 font-bold">✔ Adaptive Part Fan:</span> scales seamlessly 0–100%.
              </div>
            </div>

            {/* Card 3: Auto Slow Down for Overhangs */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                activeSpeedDemo === 'overhang'
                  ? 'bg-white border-[#00AE42] shadow-xl ring-2 ring-[#00AE42]/20'
                  : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Overhang Speed Scaling</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                Identifies steep overhang angles (e.g., 45°, 60°, 75°) and automatically slows print speed proportionally.
                Prevents filament drooping and surface curling on extreme geometry.
              </p>
              <div className="p-3 bg-neutral-50 rounded-lg text-xs font-mono text-neutral-700 border border-neutral-200">
                <span className="text-amber-600 font-bold">✔ Zero Droop:</span> crisp 75° overhang surfaces.
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          FEATURE 3: MULTI-COLOR PRINTING & AMS INTEGRATION
         ========================================================================= */}
      <section id="multi-color" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Painting Palette Mockup */}
          <div className="order-2 lg:order-1 bg-neutral-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-800 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs">
              <span className="font-mono text-[#00AE42] font-bold flex items-center gap-1.5">
                <Palette className="w-4 h-4" /> 3D Model Colorizing Tools
              </span>
              <span className="text-neutral-400">Tool: Smart Fill Bucket</span>
            </div>

            {/* Brush Modes */}
            <div className="py-4 flex gap-2">
              <button
                onClick={() => setActiveColorDemo(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeColorDemo === 1 ? 'bg-[#00AE42] text-white' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                Sphere Brush
              </button>
              <button
                onClick={() => setActiveColorDemo(2)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeColorDemo === 2 ? 'bg-[#00AE42] text-white' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                Height Range
              </button>
              <button
                onClick={() => setActiveColorDemo(3)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeColorDemo === 3 ? 'bg-[#00AE42] text-white' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                Edge Detect Fill
              </button>
            </div>

            {/* Model Painting Preview */}
            <div className="h-56 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-4 relative overflow-hidden">
              <div className="relative flex items-center gap-4">
                {/* Simulated 4-color painted model */}
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#00AE42] via-emerald-500 to-amber-400 shadow-2xl flex items-center justify-center text-xs font-bold text-neutral-950 p-2 text-center border-2 border-white/20">
                  Painted 3D Model
                </div>
                {/* Purge / Flush Matrix Preview */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Flush Matrix:</div>
                  <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300">
                    <div>Black → White: <strong>280 mm³</strong></div>
                    <div>White → Green: <strong>140 mm³</strong></div>
                    <div>Green → Gold: <strong>110 mm³</strong></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
              <span>Automatic Spool Mapping via RFID</span>
              <span className="text-[#00AE42] font-semibold">Supports up to 16 Colors (4× AMS)</span>
            </div>
          </div>

          {/* Feature Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#00AE42]">
              <Palette className="w-3.5 h-3.5" />
              <span>AMS Multi-Color Printing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Paint Your Imagination. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AE42] to-emerald-600">
                Print Up to 16 Colors Effortlessly.
              </span>
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              Horizon 3D provides intuitive 3D painting brushes directly on the model surface.
              No complex external CAD recoloring required — pick a color, apply brush strokes, and slice.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-[#00AE42] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Automatic Spool Mapping</h3>
                  <p className="text-sm text-neutral-600">
                    Horizon 3D reads the RFID chips on Bambu filament spools and automatically pairs project colors to loaded AMS slots with zero manual guessing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-[#00AE42] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Purge Tower & Flush Reduction</h3>
                  <p className="text-sm text-neutral-600">
                    Smart purge algorithm minimizes waste between color transitions while completely preventing color bleeding from dark to bright filaments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          FEATURE 4: REMOTE CONTROL & MONITORING
         ========================================================================= */}
      <section id="remote-control" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#00AE42]">
              <Wifi className="w-3.5 h-3.5" />
              <span>Remote Control & Monitoring</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Total Command Anywhere: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AE42] to-emerald-600">
                Cloud, LAN, or Enterprise Offline.
              </span>
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              Whether you are managing a single printer in your workshop or an expansive production farm,
              Horizon 3D provides live video streaming, telemetry tracking, and print job dispatch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60">
                <div className="font-bold text-neutral-900 text-sm mb-1 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#00AE42]" /> Live 1080p Camera Feed
                </div>
                <div className="text-xs text-neutral-600">
                  Smooth low-latency streaming with automatic timelapse recording.
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60">
                <div className="font-bold text-neutral-900 text-sm mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00AE42]" /> AI Spaghetti Detection
                </div>
                <div className="text-xs text-neutral-600">
                  Neural network bed inspection automatically pauses print on detachment.
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60">
                <div className="font-bold text-neutral-900 text-sm mb-1 flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-[#00AE42]" /> LAN-Only Offline Mode
                </div>
                <div className="text-xs text-neutral-600">
                  Complete offline operation over local Wi-Fi for strict privacy & security.
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60">
                <div className="font-bold text-neutral-900 text-sm mb-1 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00AE42]" /> Multi-Device Fleet Manager
                </div>
                <div className="text-xs text-neutral-600">
                  Switch between and control multiple printers from a single screen.
                </div>
              </div>
            </div>
          </div>

          {/* Camera Telemetry Mockup */}
          <div className="bg-neutral-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-800 text-white relative">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="font-semibold text-white">LIVE • X1-Carbon Chamber View</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">1080p @ 30fps</span>
            </div>

            {/* Chamber Screen */}
            <div className="h-60 rounded-2xl bg-neutral-900 border border-neutral-800 my-4 relative overflow-hidden flex flex-col justify-between p-4">
              <div className="flex justify-between items-start text-xs font-mono">
                <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-emerald-400">
                  AI Status: BED CLEAR (100% OK)
                </div>
                <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-neutral-300">
                  Nozzle: 220°C | Bed: 55°C
                </div>
              </div>

              {/* Progress bar overlay */}
              <div className="bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-300 font-mono">
                  <span>Printing: Plate 1 (Turbine Core)</span>
                  <span className="text-[#00AE42] font-bold">78% Complete</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00AE42] rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>Layer: 221 / 280</span>
                  <span>Time Remaining: 24 mins</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-neutral-400">
              <span>Cloud Telemetry Server: Connected (Ping 24ms)</span>
              <span className="text-[#00AE42] font-semibold">Bambu Handy Sync Active</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
