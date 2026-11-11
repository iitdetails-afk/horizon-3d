import React, { useState } from 'react'
import { PlateCadEditor } from './PlateCadEditor'
import {
  Layers,
  Play,
  Pause,
  RotateCw,
  Search,
  Plus,
  FolderOpen,
  Eye,
  Check,
  CheckCircle2,
  Sliders,
  Settings,
  Flame,
  Gauge,
  Sparkles,
  Maximize2,
  Box,
  Palette,
  Printer,
  Camera,
  Wifi,
  HardDrive,
  RefreshCw,
  Clock,
  ThumbsUp,
  Download,
  Share2,
  ChevronRight,
  Lightbulb,
  Radio,
  ExternalLink,
  ChevronDown
} from 'lucide-react'

export interface ModelItem {
  id: string
  title: string
  author: string
  likes: number
  downloads: number
  timeEst: string
  weight: string
  layers: number
  img: string
  category: string
  tags: string[]
  color: string
}

export const StudioEcosystem: React.FC = () => {
  // Main Studio Mode: 'library' (Home/Online Models) | 'prepare' (Slicer) | 'device' (Printer Control)
  const [studioTab, setStudioTab] = useState<'library' | 'prepare' | 'device'>('library')
  
  // Library State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Prepare State
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(() => onlineModels[0])
  const [sliceProgress, setSliceProgress] = useState<number | null>(null)
  const [isSliced, setIsSliced] = useState(false)
  const [activeProcessTab, setActiveProcessTab] = useState<'Quality' | 'Strength' | 'Speed' | 'Support'>('Quality')
  const [layerHeight, setLayerHeight] = useState('0.12')
  const [infillDensity, setInfillDensity] = useState('15%')
  const [nozzleTemp, setNozzleTemp] = useState(220)
  const [bedTemp, setBedTemp] = useState(60)

  // Device State
  const [isPrinting, setIsPrinting] = useState(true)
  const [lampOn, setLampOn] = useState(true)
  const [fanSpeed, setFanSpeed] = useState(100)
  const [jogDistance, setJogDistance] = useState<number>(10)
  const [jogFeedback, setJogFeedback] = useState<string | null>(null)

  // Catalog of 3D Models (matching Bambu Studio MakerWorld Online Models & Library)
  const onlineModels: ModelItem[] = [
    {
      id: 'spider-iron',
      title: 'Superior Spider Man - Iron Spider Armored Suit',
      author: 'ILNABBOPEDRO',
      likes: 63,
      downloads: 48,
      timeEst: '2h 15m',
      weight: '52.4g',
      layers: 240,
      img: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=600&auto=format&fit=crop&q=80',
      category: 'Action Figures',
      tags: ['Multicolor', 'AMS Ready', 'Articulated'],
      color: '#E52B00'
    },
    {
      id: 'white-lion',
      title: 'Majestic Roaring White Lion on Granite Rock',
      author: 'ARTIFACT3D_WORKS',
      likes: 738,
      downloads: 690,
      timeEst: '3h 40m',
      weight: '84.2g',
      layers: 310,
      img: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&auto=format&fit=crop&q=80',
      category: 'Sculptures',
      tags: ['High Detail', 'Organic Supports', 'Marble PLA'],
      color: '#FFFFFF'
    },
    {
      id: 'black-panther',
      title: 'Majestic Stealth Panther - Matte Muscle Edition',
      author: '3dgui',
      likes: 913,
      downloads: 1600,
      timeEst: '2h 50m',
      weight: '68.0g',
      layers: 280,
      img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
      category: 'Sculptures',
      tags: ['Matte Black', 'Zero Scarring', 'Display Piece'],
      color: '#1A1A1A'
    },
    {
      id: 'urban-spidey',
      title: 'Urban Spiderman Figurine - 15cm Streetwear Edition',
      author: 'Bralento',
      likes: 138,
      downloads: 120,
      timeEst: '1h 55m',
      weight: '44.8g',
      layers: 195,
      img: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=600&auto=format&fit=crop&q=80',
      category: 'Action Figures',
      tags: ['Pop Culture', 'No Support Needed', 'Dual Color'],
      color: '#FF5A00'
    },
    {
      id: 'ghost-spider',
      title: 'Ghost_Spider_Flexi Articulated Chibi Edition',
      author: 'HorizonStudioLab',
      likes: 420,
      downloads: 380,
      timeEst: '1h 30m',
      weight: '36.5g',
      layers: 160,
      img: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      category: 'Toys',
      tags: ['Print-in-Place', 'Flexi', 'PLA Basic'],
      color: '#FFD000'
    },
    {
      id: 'turbine-core',
      title: 'High-Velocity Jet Impeller & Stator Turbine Core',
      author: 'AeroDynamics3D',
      likes: 580,
      downloads: 410,
      timeEst: '4h 10m',
      weight: '98.6g',
      layers: 340,
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      category: 'Functional',
      tags: ['PETG-CF', '0.12mm Optimal', 'Mechanical'],
      color: '#FF5A00'
    }
  ]


  // Filter models based on search and category
  const filteredModels = onlineModels.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory
    return matchesSearch && matchesCat
  })

  // Action: Load model into Prepare slicer
  const handleLoadModelIntoPrepare = (model: ModelItem) => {
    setSelectedModel(model)
    setIsSliced(false)
    setSliceProgress(null)
    setStudioTab('prepare')
  }

  // Action: Slice Plate simulation
  const handleSlicePlate = () => {
    setSliceProgress(0)
    setIsSliced(false)
    const interval = setInterval(() => {
      setSliceProgress((prev) => {
        if (prev === null) return 0
        if (prev >= 100) {
          clearInterval(interval)
          setIsSliced(true)
          return 100
        }
        return prev + 25
      })
    }, 180)
  }

  // Action: Send to Printer (Device tab)
  const handlePrintPlate = () => {
    setIsPrinting(true)
    setStudioTab('device')
  }

  // Action: Jog controller
  const handleJog = (axis: string, direction: number) => {
    setJogFeedback(`Moved ${axis} by ${direction * jogDistance}mm`)
    setTimeout(() => setJogFeedback(null), 1500)
  }

  return (
    <section id="showcase" className="py-24 bg-[#080808] text-white border-t border-[#1c1c1c] relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FF5A00]/8 blur-[160px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-[#FF5A00]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL 3D WORKFLOW ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            DESIGN, SLICE & PRINT IN HORIZON STUDIO
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
            Experience the complete end-to-end 3D printing ecosystem: browse online 3D model libraries,
            prepare and slice with high-precision toolpaths, and command your 3D printer over live telemetry.
          </p>
        </div>

        {/* Master Studio Workspace Frame */}
        <div className="bg-[#111111] border border-[#262626] rounded-3xl shadow-2xl shadow-black overflow-hidden relative">
          {/* Top Window Application Menu Bar */}
          <div className="bg-[#171717] px-4 py-2.5 border-b border-[#262626] flex flex-wrap items-center justify-between gap-3 text-xs select-none">
            {/* Left Brand & Studio Navigation Tabs */}
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
              <div className="flex items-center gap-1.5 mr-2">
                <div className="w-3 h-3 rounded-full bg-[#E52B00]/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFD000]/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#FF5A00]/80"></div>
              </div>

              {/* Tab 1: Home / Library (Screenshot 3) */}
              <button
                onClick={() => setStudioTab('library')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  studioTab === 'library'
                    ? 'bg-[#00AE42] text-white shadow-[0_0_12px_rgba(0,174,66,0.3)]'
                    : 'text-[#A0A0A0] hover:text-white hover:bg-[#1f1f1f]'
                }`}
              >
                <span>🏠</span>
                <span>Library & Online Models</span>
              </button>

              {/* Tab 2: Prepare / Slicer (Screenshot 2) */}
              <button
                onClick={() => setStudioTab('prepare')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  studioTab === 'prepare'
                    ? 'bg-[#00AE42] text-white shadow-[0_0_12px_rgba(0,174,66,0.3)]'
                    : 'text-[#A0A0A0] hover:text-white hover:bg-[#1f1f1f]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Prepare (Slicing)</span>
              </button>

              {/* Tab 3: Device / Printer Control (Screenshot 1) */}
              <button
                onClick={() => setStudioTab('device')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  studioTab === 'device'
                    ? 'bg-[#00AE42] text-white shadow-[0_0_12px_rgba(0,174,66,0.3)]'
                    : 'text-[#A0A0A0] hover:text-white hover:bg-[#1f1f1f]'
                }`}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Device (Printer Control)</span>
              </button>

              <span className="text-[#404040] hidden md:inline">|</span>

              <div className="hidden lg:flex items-center gap-3 text-neutral-400 text-[11px] font-medium">
                <span className="hover:text-white cursor-pointer">Project</span>
                <span className="hover:text-white cursor-pointer">Calibration</span>
                <span className="hover:text-white cursor-pointer">Filament Man...</span>
              </div>
            </div>

            {/* Right Status Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#080808] px-3 py-1 rounded-lg border border-[#262626] font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#00AE42] animate-pulse"></span>
                <span className="text-white">HORIZON-A1-MINI</span>
                <span className="text-[#FFD000]">(Connected)</span>
              </div>

              {studioTab === 'prepare' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSlicePlate}
                    className="px-3.5 py-1.5 rounded-lg bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{sliceProgress !== null && sliceProgress < 100 ? `Slicing ${sliceProgress}%` : 'Slice plate'}</span>
                  </button>
                  <button
                    onClick={handlePrintPlate}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FF5A00] hover:bg-[#E52B00] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Print plate</span>
                  </button>
                </div>
              )}
            </div>
          </div>


          {/* =========================================================================
              VIEW 1: HOME / LIBRARY & ONLINE MODELS (Screenshot 3 Replica)
             ========================================================================= */}
          {studioTab === 'library' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] bg-[#111111]">
              {/* Left Sub-Sidebar (3 cols) */}
              <div className="lg:col-span-3 bg-[#171717]/80 p-4 border-r border-[#262626] flex flex-col justify-between text-xs space-y-6">
                <div className="space-y-4">
                  {/* User Profile Pill */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#111111] border border-[#262626]">
                    <div className="w-8 h-8 rounded-full bg-[#FF5A00] flex items-center justify-center font-bold text-white text-xs">
                      H
                    </div>
                    <div className="flex-1 truncate">
                      <div className="font-semibold text-white">horizon_maker_92</div>
                      <div className="text-[10px] text-emerald-400 font-mono">Cloud Synced</div>
                    </div>
                  </div>

                  {/* Navigation Links (Matching Screenshot 3) */}
                  <div className="space-y-1">
                    <button className="w-full text-left p-2.5 rounded-xl font-bold text-white bg-[#00AE42] shadow-sm flex items-center gap-2.5">
                      <span>📚</span>
                      <span>Library (Online Models)</span>
                    </button>
                    <button className="w-full text-left p-2.5 rounded-xl font-medium text-[#A0A0A0] hover:text-white hover:bg-[#222222] transition-colors flex items-center gap-2.5">
                      <span>🕒</span>
                      <span>Recently Opened</span>
                    </button>
                    <button className="w-full text-left p-2.5 rounded-xl font-medium text-[#A0A0A0] hover:text-white hover:bg-[#222222] transition-colors flex items-center gap-2.5">
                      <span>🌐</span>
                      <span>Online Models Hub</span>
                    </button>
                    <button className="w-full text-left p-2.5 rounded-xl font-medium text-[#A0A0A0] hover:text-white hover:bg-[#222222] transition-colors flex items-center gap-2.5">
                      <span>🧪</span>
                      <span>MakerLab Parametric</span>
                    </button>
                    <button className="w-full text-left p-2.5 rounded-xl font-medium text-[#A0A0A0] hover:text-white hover:bg-[#222222] transition-colors flex items-center gap-2.5">
                      <span>📦</span>
                      <span>Maker's Supply Store</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#262626] pt-4 space-y-1 text-[#A0A0A0]">
                  <div className="p-2 hover:text-white cursor-pointer flex items-center justify-between">
                    <span>📜 Print History</span>
                    <span className="text-[10px] font-mono text-[#00AE42]">14 Jobs</span>
                  </div>
                  <div className="p-2 hover:text-white cursor-pointer flex items-center justify-between">
                    <span>📖 User Manual</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
                  </div>
                </div>
              </div>

              {/* Main Content Area (9 cols) */}
              <div className="lg:col-span-9 p-6 space-y-6 overflow-y-auto max-h-[700px]">
                {/* Search Bar & Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search online models, Spider-Man, Lion, Mechanical Impeller, Flexi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#171717] border border-[#262626] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-[#666666] outline-none focus:border-[#00AE42] transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2.5 rounded-xl border border-[#262626] bg-[#171717] hover:bg-[#222222] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer">
                      <FolderOpen className="w-3.5 h-3.5 text-[#FFD000]" />
                      <span>Open Project</span>
                    </button>
                    <button
                      onClick={() => setStudioTab('prepare')}
                      className="px-4 py-2.5 rounded-xl bg-[#00AE42] hover:bg-[#009638] text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create new project</span>
                    </button>
                  </div>
                </div>

                {/* Section 1: Recently Opened (Matching Screenshot 3) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400">🟢</span>
                      <span>Recently Opened</span>
                    </h3>
                    <span className="text-xs text-[#A0A0A0] hover:text-white cursor-pointer font-mono">MORE &gt;</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {onlineModels.slice(0, 4).map((m, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleLoadModelIntoPrepare(m)}
                        className="bg-[#171717] border border-[#262626] rounded-2xl overflow-hidden hover:border-[#00AE42] transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
                      >
                        <div className="h-32 bg-[#080808] relative overflow-hidden flex items-center justify-center">
                          <img
                            src={m.img}
                            alt={m.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                          />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-emerald-400 backdrop-blur-sm">
                            {m.timeEst}
                          </span>
                        </div>
                        <div className="p-3 space-y-1">
                          <div className="font-semibold text-xs text-white truncate group-hover:text-emerald-400 transition-colors">
                            {m.title}.3mf
                          </div>
                          <div className="text-[10px] text-[#888888] font-mono flex justify-between">
                            <span>Layer: {m.layers}</span>
                            <span>{m.weight}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Online Models Catalog & Extraction (Matching Screenshot 3) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-[#FF5A00]">🌐</span>
                        <span>Online Models (MakerWorld & Community 3D Models)</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-[#00AE42] border border-emerald-500/30 text-[10px] font-bold">
                        1-Click Slice & Print
                      </span>
                    </div>
                    <span className="text-xs text-[#A0A0A0] hover:text-white cursor-pointer font-mono">MORE &gt;</span>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                    {['All', 'Action Figures', 'Sculptures', 'Functional', 'Toys'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#00AE42] text-white font-bold'
                            : 'bg-[#171717] text-[#A0A0A0] hover:text-white border border-[#262626]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Models Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredModels.map((model) => (
                      <div
                        key={model.id}
                        className="bg-[#171717] border border-[#262626] rounded-2xl overflow-hidden hover:border-[#FF5A00] transition-all flex flex-col justify-between group shadow-lg"
                      >
                        <div className="h-40 bg-[#080808] relative overflow-hidden">
                          <img
                            src={model.img}
                            alt={model.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-2 left-2 flex gap-1">
                            {model.tags.map((t, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[9px] font-mono text-[#FFD000]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-xs text-white line-clamp-1 group-hover:text-[#FF5A00] transition-colors">
                              {model.title}
                            </h4>
                            <div className="text-[11px] text-[#A0A0A0] mt-0.5 flex items-center justify-between">
                              <span className="truncate">By @{model.author}</span>
                              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                                <ThumbsUp className="w-3 h-3" /> {model.likes}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-[11px] text-[#888888]">
                            <span>⏱️ {model.timeEst}</span>
                            <span>⚖️ {model.weight}</span>
                          </div>

                          {/* Quick 1-Click Action to Slicer */}
                          <button
                            onClick={() => handleLoadModelIntoPrepare(model)}
                            className="w-full py-2 bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Open in Horizon Studio</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* =========================================================================
              VIEW 2: PREPARE / SLICER WORKSPACE (Screenshot 2 Replica)
             ========================================================================= */}
          {studioTab === 'prepare' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] bg-[#111111]">
              {/* Left Settings Panel (Screenshot 2 left bar: 4 cols) */}
              <div className="lg:col-span-4 bg-[#171717] p-4 border-r border-[#262626] space-y-4 text-xs overflow-y-auto max-h-[680px]">
                {/* Printer Selector */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A0A0A0] flex justify-between">
                    <span>Printer</span>
                    <span className="text-emerald-400">Synced</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#111111] border border-[#262626] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#222222] border border-[#333333] flex items-center justify-center text-white">
                        <Printer className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">Horizon Lab A1 mini</div>
                        <div className="text-[10px] text-[#A0A0A0]">0.4 Nozzle • Standard Flow</div>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg bg-[#222222] text-[#A0A0A0] hover:text-white" title="Sync Info">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Build Plate Type */}
                <div className="p-2.5 rounded-xl bg-[#111111] border border-[#262626] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#888888] font-mono">Build Plate</div>
                    <div className="font-semibold text-white">Horizon Textured PEI Plate</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#222222] text-neutral-300 font-mono">256×256</span>
                </div>

                {/* Project Filaments Slots (1, 2, 3, 4) */}
                <div className="space-y-2 pt-2 border-t border-[#262626]">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#A0A0A0]">
                    <span>Project Filaments</span>
                    <button className="text-emerald-400 hover:underline">Purging volumes</button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-[#111111] border border-[#262626] flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#00AE42] border border-white/20"></span>
                      <span className="font-mono font-bold">1</span>
                      <span className="text-white truncate">PLA Basic</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#111111] border border-[#262626] flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#1A1A1A] border border-white/30"></span>
                      <span className="font-mono font-bold">2</span>
                      <span className="text-white truncate">PLA Matte</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#111111] border border-[#262626] flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FFFFFF] border border-white/40"></span>
                      <span className="font-mono font-bold">3</span>
                      <span className="text-white truncate">PLA Basic</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#111111] border border-[#262626] flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FFD000] border border-white/20"></span>
                      <span className="font-mono font-bold">4</span>
                      <span className="text-white truncate">PLA Basic</span>
                    </div>
                  </div>
                </div>

                {/* Process Tabs (Quality, Strength, Speed, Support) */}
                <div className="space-y-3 pt-2 border-t border-[#262626]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">0.12mm Fine @Horizon A1M</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Advanced: ON</span>
                  </div>

                  {/* Sub-tabs */}
                  <div className="flex border-b border-[#262626] text-[11px] font-semibold">
                    {(['Quality', 'Strength', 'Speed', 'Support'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveProcessTab(t)}
                        className={`flex-1 py-1.5 text-center transition-colors ${
                          activeProcessTab === t
                            ? 'text-[#00AE42] border-b-2 border-[#00AE42]'
                            : 'text-[#A0A0A0] hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Quality Inputs */}
                  {activeProcessTab === 'Quality' && (
                    <div className="space-y-2 text-[#A0A0A0] text-xs">
                      <div className="flex items-center justify-between">
                        <span>Layer height:</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={layerHeight}
                            onChange={(e) => setLayerHeight(e.target.value)}
                            className="w-16 bg-[#111111] border border-[#262626] rounded px-2 py-0.5 text-right text-white font-mono"
                          />
                          <span className="text-[10px]">mm</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Initial layer height:</span>
                        <span className="font-mono text-white">0.2 mm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Outer wall line width:</span>
                        <span className="font-mono text-white">0.42 mm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Inner wall line width:</span>
                        <span className="font-mono text-white">0.45 mm</span>
                      </div>
                    </div>
                  )}

                  {activeProcessTab === 'Strength' && (
                    <div className="space-y-2 text-[#A0A0A0] text-xs">
                      <div className="flex items-center justify-between">
                        <span>Sparse infill density:</span>
                        <span className="font-mono text-emerald-400 font-bold">15% Gyroid</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Wall loops:</span>
                        <span className="font-mono text-white">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Top shell layers:</span>
                        <span className="font-mono text-white">5</span>
                      </div>
                    </div>
                  )}

                  {activeProcessTab === 'Speed' && (
                    <div className="space-y-2 text-[#A0A0A0] text-xs">
                      <div className="flex items-center justify-between">
                        <span>Outer wall speed:</span>
                        <span className="font-mono text-white">200 mm/s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Inner wall speed:</span>
                        <span className="font-mono text-white">300 mm/s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Infill speed:</span>
                        <span className="font-mono text-[#FF5A00] font-bold">350 mm/s</span>
                      </div>
                    </div>
                  )}

                  {activeProcessTab === 'Support' && (
                    <div className="space-y-2 text-[#A0A0A0] text-xs">
                      <div className="flex items-center justify-between">
                        <span>Enable Support:</span>
                        <span className="font-mono text-emerald-400">Tree (auto)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Support style:</span>
                        <span className="font-mono text-white">Tree Slim</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Threshold angle:</span>
                        <span className="font-mono text-white">30°</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Slicing Quick Actions */}
                <div className="pt-2">
                  <button
                    onClick={handleSlicePlate}
                    className="w-full py-2.5 bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>{isSliced ? 'Plate Sliced (Ready to Print)' : 'Slice Plate Now'}</span>
                  </button>
                </div>
              </div>

              {/* Center 3D Build Plate Viewport with Real-time CAD Design & Plate Editing (8 cols - Matching Screenshot 2) */}
              <div className="lg:col-span-8 p-3 sm:p-4 bg-[#080808] flex flex-col justify-between space-y-3 relative overflow-hidden select-none">
                {/* Embedded Interactive 3D CAD Editor */}
                <PlateCadEditor
                  selectedModel={selectedModel}
                  onModelChange={(newModel) => setSelectedModel(newModel)}
                  onSliceReady={handleSlicePlate}
                  isSliced={isSliced}
                  sliceProgress={sliceProgress}
                />

                {/* Slicing Progress Bar or Action Banner */}
                {sliceProgress !== null && sliceProgress < 100 ? (
                  <div className="p-3 bg-[#171717] rounded-xl border border-emerald-500/40 text-xs text-white space-y-1.5 animate-in fade-in">
                    <div className="flex justify-between font-mono">
                      <span>Generating toolpath perimeters...</span>
                      <span className="text-[#00AE42] font-bold">{sliceProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#111111] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00AE42] transition-all duration-200" style={{ width: `${sliceProgress}%` }}></div>
                    </div>
                  </div>
                ) : isSliced ? (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00AE42]" />
                      <span>Slicing Complete: {selectedModel?.layers || 280} Layers • Est. {selectedModel?.timeEst || '2h 15m'} • {selectedModel?.weight || '52.4g'}</span>
                    </div>
                    <button
                      onClick={handlePrintPlate}
                      className="px-4 py-1.5 bg-[#00AE42] hover:bg-[#009638] text-white font-bold rounded-lg shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Send to 3D Printer</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-2 rounded-xl bg-[#141414] border border-[#222222] flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00AE42]" />
                      <span>CAD Model Active: Orbit with mouse, transform with tools above.</span>
                    </span>
                    <button
                      onClick={handleSlicePlate}
                      className="px-3 py-1 bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-[11px] rounded-lg transition-all"
                    >
                      Slice Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* =========================================================================
              VIEW 3: DEVICE / PRINTER CONTROL CENTER (Screenshot 1 Replica)
             ========================================================================= */}
          {studioTab === 'device' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] bg-[#111111]">
              {/* Left Printer Telemetry Sidebar (Screenshot 1: 3 cols) */}
              <div className="lg:col-span-3 bg-[#171717] p-4 border-r border-[#262626] flex flex-col justify-between text-xs space-y-6">
                <div className="space-y-4">
                  {/* Status Indicator (Matching Screenshot 1) */}
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Printer className="w-4 h-4 text-[#00AE42]" />
                      <span className="font-bold text-white">3DP-039-163</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
                  </div>

                  {/* Navigation List (Matching Screenshot 1) */}
                  <div className="space-y-1">
                    <button className="w-full text-left p-2.5 rounded-xl font-bold text-emerald-400 bg-[#111111] border-l-2 border-[#00AE42] flex items-center justify-between">
                      <span>Status</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-full text-left p-2.5 rounded-xl text-[#A0A0A0] hover:text-white hover:bg-[#1a1a1a] flex items-center justify-between">
                      <span>Storage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-full text-left p-2.5 rounded-xl text-[#A0A0A0] hover:text-white hover:bg-[#1a1a1a] flex items-center justify-between">
                      <span>Firmware Update</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-full text-left p-2.5 rounded-xl text-[#A0A0A0] hover:text-white hover:bg-[#1a1a1a] flex items-center justify-between">
                      <span>Assistant (HMS)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#111111] rounded-xl border border-[#262626] space-y-1 text-[11px] text-[#A0A0A0]">
                  <div className="text-white font-semibold">Wi-Fi Connection:</div>
                  <div className="font-mono text-emerald-400">Horizon_5G_Studio (Ping 18ms)</div>
                </div>
              </div>

              {/* Center Camera Stream & Printing Progress (Screenshot 1: 5 cols) */}
              <div className="lg:col-span-5 p-5 bg-[#0c0c0c] flex flex-col justify-between space-y-4">
                {/* Live Camera View Box */}
                <div className="bg-[#171717] rounded-2xl border border-[#262626] overflow-hidden flex flex-col justify-between shadow-xl">
                  {/* Camera Top Title */}
                  <div className="p-3 border-b border-[#262626] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-[#00AE42]" />
                      <span className="text-white font-bold">Chamber Camera Feed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="text-red-400 text-[10px]">LIVE 1080p</span>
                    </div>
                  </div>

                  {/* Camera Screen Feed Area */}
                  <div className="h-64 bg-[#080808] relative flex items-center justify-center p-4">
                    {/* Simulated live video */}
                    <img
                      src={selectedModel?.img || 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=600&auto=format&fit=crop&q=80'}
                      alt="Camera Feed"
                      className="w-full h-full object-cover rounded-xl opacity-70 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

                    {/* Logo Watermark in Camera */}
                    <div className="absolute top-4 left-4 text-xs font-mono font-bold text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00AE42]"></span>
                      <span>HORIZON LAB CAMERA</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                      <span>Target: {selectedModel?.title.slice(0, 20)}...</span>
                      <span className="text-emerald-400 font-bold">Layer 218/280</span>
                    </div>
                  </div>

                  {/* Camera Controls */}
                  <div className="p-2.5 bg-[#171717] border-t border-[#262626] flex items-center justify-between text-xs">
                    <button
                      onClick={() => setIsPrinting(!isPrinting)}
                      className="p-1.5 rounded-lg bg-[#222222] text-white hover:bg-[#2c2c2c] cursor-pointer"
                    >
                      {isPrinting ? <Pause className="w-4 h-4 text-[#FFD000]" /> : <Play className="w-4 h-4 text-[#00AE42]" />}
                    </button>
                    <span className="text-neutral-400 text-[11px]">30 FPS • H.264 Stream</span>
                    <button className="p-1.5 rounded-lg bg-[#222222] text-white hover:bg-[#2c2c2c]">
                      <Maximize2 className="w-4 h-4 text-neutral-300" />
                    </button>
                  </div>
                </div>

                {/* Printing Progress Card (Matching Screenshot 1) */}
                <div className="p-4 bg-[#171717] rounded-2xl border border-[#262626] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#888888] font-mono">Printing Progress</div>
                      <div className="font-bold text-white text-sm">{selectedModel?.title}</div>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold text-sm">78%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[#080808] rounded-full overflow-hidden border border-[#262626]">
                    <div className="h-full bg-[#00AE42] rounded-full transition-all duration-300" style={{ width: '78%' }}></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#A0A0A0] font-mono">
                    <span>Layer: 218 / 280</span>
                    <span>Est. Finish: 24 mins</span>
                  </div>
                </div>
              </div>

              {/* Right Manual Control & Motion D-Pad (Screenshot 1: 4 cols) */}
              <div className="lg:col-span-4 bg-[#171717] p-5 border-l border-[#262626] space-y-5 text-xs overflow-y-auto max-h-[680px]">
                {/* Temperature Telemetry (Matching Screenshot 1 top-right) */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A0A0A0]">
                    Thermal Controls
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-[#111111] border border-[#262626]">
                      <div className="text-[10px] text-[#888888]">Nozzle</div>
                      <div className="font-bold text-white font-mono text-sm mt-0.5">{nozzleTemp}°C</div>
                      <div className="text-[9px] text-emerald-400">Target 220°C</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#111111] border border-[#262626]">
                      <div className="text-[10px] text-[#888888]">Bed</div>
                      <div className="font-bold text-white font-mono text-sm mt-0.5">{bedTemp}°C</div>
                      <div className="text-[9px] text-emerald-400">Target 60°C</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#111111] border border-[#262626]">
                      <div className="text-[10px] text-[#888888]">Chamber</div>
                      <div className="font-bold text-white font-mono text-sm mt-0.5">35°C</div>
                      <div className="text-[9px] text-neutral-400">Stable</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setLampOn(!lampOn)}
                      className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs transition-colors mr-2 cursor-pointer ${
                        lampOn ? 'bg-[#00AE42] text-white border-emerald-400' : 'bg-[#111111] text-[#A0A0A0] border-[#262626]'
                      }`}
                    >
                      💡 Lamp: {lampOn ? 'ON' : 'OFF'}
                    </button>
                    <div className="flex items-center gap-1.5 bg-[#111111] px-3 py-1.5 rounded-lg border border-[#262626] font-mono">
                      <span>Fan:</span>
                      <strong className="text-emerald-400">{fanSpeed}%</strong>
                    </div>
                  </div>
                </div>

                {/* Circular Motion Controller D-Pad (Matching Screenshot 1 exactly) */}
                <div className="space-y-3 pt-2 border-t border-[#262626]">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#A0A0A0]">
                    <span>Toolhead Movement (Jog)</span>
                    <span className="text-[#FFD000]">Step: {jogDistance}mm</span>
                  </div>

                  {/* Circular D-pad Graphic Container */}
                  <div className="flex flex-col items-center justify-center py-2 relative">
                    <div className="w-48 h-48 rounded-full bg-[#111111] border-2 border-[#262626] relative flex items-center justify-center shadow-xl">
                      {/* Center Home Button */}
                      <button
                        onClick={() => handleJog('HOME', 0)}
                        className="w-12 h-12 rounded-full bg-[#00AE42] text-white flex items-center justify-center font-bold shadow-lg transition-transform active:scale-95 cursor-pointer z-10"
                        title="Home All Axes"
                      >
                        🏠
                      </button>

                      {/* Directional Arc Buttons */}
                      <button
                        onClick={() => handleJog('Y', 1)}
                        className="absolute top-2 w-10 h-8 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white font-mono font-bold text-[11px] flex items-center justify-center cursor-pointer"
                      >
                        +Y
                      </button>
                      <button
                        onClick={() => handleJog('Y', -1)}
                        className="absolute bottom-2 w-10 h-8 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white font-mono font-bold text-[11px] flex items-center justify-center cursor-pointer"
                      >
                        -Y
                      </button>
                      <button
                        onClick={() => handleJog('X', -1)}
                        className="absolute left-2 w-8 h-10 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white font-mono font-bold text-[11px] flex items-center justify-center cursor-pointer"
                      >
                        -X
                      </button>
                      <button
                        onClick={() => handleJog('X', 1)}
                        className="absolute right-2 w-8 h-10 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white font-mono font-bold text-[11px] flex items-center justify-center cursor-pointer"
                      >
                        +X
                      </button>
                    </div>

                    {/* Step size selector */}
                    <div className="flex gap-1.5 mt-3 text-[11px] font-mono">
                      {[1, 10, 50].map((step) => (
                        <button
                          key={step}
                          onClick={() => setJogDistance(step)}
                          className={`px-2.5 py-1 rounded-md border cursor-pointer ${
                            jogDistance === step
                              ? 'bg-[#00AE42] text-white border-emerald-400 font-bold'
                              : 'bg-[#111111] text-[#A0A0A0] border-[#262626]'
                          }`}
                        >
                          {step}mm
                        </button>
                      ))}
                    </div>

                    {jogFeedback && (
                      <div className="text-[10px] text-emerald-400 font-mono mt-1 animate-pulse">
                        {jogFeedback}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub-tabs list matching Screenshot 1 */}
                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-[#262626] text-[10px] font-medium text-center">
                  <div className="p-2 rounded bg-[#111111] border border-[#262626] text-white">Printer Parts</div>
                  <div className="p-2 rounded bg-[#111111] border border-[#262626] text-white">Print Options</div>
                  <div className="p-2 rounded bg-[#111111] border border-[#262626] text-white">Safety Options</div>
                  <div className="p-2 rounded bg-[#111111] border border-[#262626] text-white">Calibration</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
