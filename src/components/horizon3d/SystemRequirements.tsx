import React, { useState } from 'react'
import { Monitor, Apple, Terminal, Cpu, HardDrive, Shield, CheckCircle2 } from 'lucide-react'
import { REQUIREMENTS_CONFIG } from '../../config/requirements'
import type { SystemRequirement } from '../../config/requirements'

export const SystemRequirements: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'windows' | 'mac' | 'linux'>('windows')

  const currentReq: SystemRequirement =
    REQUIREMENTS_CONFIG.find((r) => r.platform === activePlatform) || REQUIREMENTS_CONFIG[0]

  return (
    <section id="specs" className="py-24 bg-[#080808] text-white border-t border-[#1c1c1c] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-[#FFD000]">
            <Cpu className="w-3.5 h-3.5" />
            <span>HARDWARE COMPATIBILITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            SYSTEM REQUIREMENTS
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0A0]">
            Horizon Studio is engineered for optimal performance across workstations,
            laptops, and fabrication terminals. Check your platform requirements below.
          </p>

          {/* Platform Switcher Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1 bg-[#111111] border border-[#262626] rounded-2xl shadow-xl">
              <button
                onClick={() => setActivePlatform('windows')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activePlatform === 'windows'
                    ? 'bg-[#171717] text-white border border-[#FF5A00]/50 shadow-md'
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                <Monitor className={`w-4 h-4 ${activePlatform === 'windows' ? 'text-[#FF5A00]' : ''}`} />
                <span>Windows</span>
              </button>

              <button
                onClick={() => setActivePlatform('mac')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activePlatform === 'mac'
                    ? 'bg-[#171717] text-white border border-[#FF5A00]/50 shadow-md'
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                <Apple className={`w-4 h-4 ${activePlatform === 'mac' ? 'text-[#FF5A00]' : ''}`} />
                <span>macOS</span>
              </button>

              <button
                onClick={() => setActivePlatform('linux')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activePlatform === 'linux'
                    ? 'bg-[#171717] text-white border border-[#FF5A00]/50 shadow-md'
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                <Terminal className={`w-4 h-4 ${activePlatform === 'linux' ? 'text-[#FF5A00]' : ''}`} />
                <span>Linux</span>
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Table Card */}
        <div className="bg-[#171717] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 border-b border-[#262626] flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{currentReq.name} Platform Specifications</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#262626] text-[#FFD000] font-mono">
                  {currentReq.architecture}
                </span>
              </h3>
              <p className="text-xs text-[#A0A0A0] mt-1">
                Configured in <code className="text-[#FF5A00]">src/config/requirements.ts</code>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#111111] text-[#A0A0A0] uppercase font-mono text-[11px] border-b border-[#262626]">
                <tr>
                  <th className="py-4 px-6 w-1/4">Component</th>
                  <th className="py-4 px-6 w-3/8 text-white">Minimum Requirements</th>
                  <th className="py-4 px-6 w-3/8 text-[#FF5A00]">Recommended Specifications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222] text-[#A0A0A0]">
                <tr className="hover:bg-[#111111]/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Operating System</td>
                  <td className="py-4 px-6 font-mono text-xs">{currentReq.os.minimum}</td>
                  <td className="py-4 px-6 font-mono text-xs text-white">{currentReq.os.recommended}</td>
                </tr>
                <tr className="hover:bg-[#111111]/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Processor (CPU)</td>
                  <td className="py-4 px-6 font-mono text-xs">{currentReq.cpu.minimum}</td>
                  <td className="py-4 px-6 font-mono text-xs text-white">{currentReq.cpu.recommended}</td>
                </tr>
                <tr className="hover:bg-[#111111]/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">System Memory (RAM)</td>
                  <td className="py-4 px-6 font-mono text-xs">{currentReq.ram.minimum}</td>
                  <td className="py-4 px-6 font-mono text-xs text-white">{currentReq.ram.recommended}</td>
                </tr>
                <tr className="hover:bg-[#111111]/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Graphics (GPU)</td>
                  <td className="py-4 px-6 font-mono text-xs">{currentReq.gpu.minimum}</td>
                  <td className="py-4 px-6 font-mono text-xs text-white">{currentReq.gpu.recommended}</td>
                </tr>
                <tr className="hover:bg-[#111111]/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Disk Storage</td>
                  <td className="py-4 px-6 font-mono text-xs">{currentReq.storage.minimum}</td>
                  <td className="py-4 px-6 font-mono text-xs text-white">{currentReq.storage.recommended}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
