import React from 'react'
import { Cpu, HardDrive, Monitor, CheckCircle, Info } from 'lucide-react'
import { TECH_SPECS } from './data'

export const TechSpecsSection: React.FC = () => {
  return (
    <section id="tech-specs" className="py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#00AE42] text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Hardware & Compatibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            System & Hardware Requirements
          </h2>
          <p className="text-neutral-600 text-base">
            Horizon 3D is highly optimized to run smoothly on modern laptops and workstations.
            Check below to verify your hardware configuration.
          </p>
        </div>

        {/* Specs Table */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100/80 border-b border-neutral-200 text-neutral-900 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-4 px-6 w-1/4">Component</th>
                  <th className="py-4 px-6 w-3/8 text-neutral-600">Minimum Requirements</th>
                  <th className="py-4 px-6 w-3/8 text-[#00AE42]">Recommended Specifications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {TECH_SPECS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-neutral-900 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00AE42]"></span>
                      {row.spec}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-neutral-600">
                      {row.minimum}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-neutral-900 font-medium bg-emerald-50/20">
                      {row.recommended}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="p-4 bg-neutral-50/60 border-t border-neutral-100 text-xs text-neutral-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>
              Dedicated GPU with OpenGL 3.2+ is recommended when handling high-density polygonal CAD meshes with more than 1 million faces.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
