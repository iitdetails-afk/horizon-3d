import React, { useState } from 'react'
import {
  Search,
  Globe,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Download,
  ExternalLink,
  Layers,
  Cpu,
  Printer,
  LogIn
} from 'lucide-react'

interface NavbarProps {
  onOpenReleaseNotes?: () => void
  onOpenSignIn: () => void
  currentUser: { name: string; email: string } | null
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReleaseNotes,
  onOpenSignIn,
  currentUser
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <a href="#overview" className="flex items-center gap-2.5 group">
                {/* Horizon 3D Logo Symbol */}
                <div className="w-8 h-8 rounded-lg bg-[#00AE42] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 font-black text-base">
                  H
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-[#00AE42] transition-colors leading-none">
                    Horizon <span className="text-[#00AE42]">3D</span>
                  </span>
                </div>
              </a>

              {/* Main Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-neutral-700">
                <div className="relative group">
                  <button
                    onClick={() => handleDropdown('printers')}
                    className="flex items-center gap-1 hover:text-[#00AE42] py-2 transition-colors cursor-pointer"
                  >
                    3D Printers <ChevronDown className="w-4 h-4 opacity-60" />
                  </button>
                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-neutral-100 p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 px-2">
                      Flagship Series
                    </div>
                    <a href="#overview" className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                      <div className="p-2 rounded bg-neutral-100 text-neutral-800">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">X1-Carbon & X1E</div>
                        <div className="text-xs text-neutral-500">Industry-leading AI LiDAR & Carbon Core</div>
                      </div>
                    </a>
                    <a href="#overview" className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                      <div className="p-2 rounded bg-neutral-100 text-neutral-800">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">P1S & P1P Series</div>
                        <div className="text-xs text-neutral-500">Enclosed high-speed performance</div>
                      </div>
                    </a>
                    <a href="#overview" className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                      <div className="p-2 rounded bg-neutral-100 text-neutral-800">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">A1 & A1 mini</div>
                        <div className="text-xs text-neutral-500">Bed-slinger precision & AMS lite multi-color</div>
                      </div>
                    </a>
                  </div>
                </div>

                <a href="#features" className="hover:text-[#00AE42] py-2 transition-colors">
                  Filaments
                </a>

                <a href="#multi-color" className="hover:text-[#00AE42] py-2 transition-colors">
                  Accessories & AMS
                </a>

                {/* Software (Active) */}
                <div className="relative group">
                  <a
                    href="#overview"
                    className="flex items-center gap-1 text-[#00AE42] font-semibold py-2"
                  >
                    Software
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00AE42]"></span>
                  </a>
                  <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-neutral-100 p-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0">
                    <a href="#overview" className="flex items-center gap-3 p-2 rounded-lg bg-green-50/70 border border-green-200/50">
                      <div className="p-2 rounded bg-[#00AE42] text-white">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#00AE42] text-sm">Horizon 3D</div>
                        <div className="text-xs text-neutral-600">All-in-one desktop slicer & control</div>
                      </div>
                    </a>
                    <a href="#bambu-handy" className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors mt-1">
                      <div className="p-2 rounded bg-neutral-100 text-neutral-800">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">Horizon Mobile</div>
                        <div className="text-xs text-neutral-500">Mobile app for remote printing & camera</div>
                      </div>
                    </a>
                  </div>
                </div>

                <a
                  href="https://makerworld.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#00AE42] py-2 transition-colors"
                >
                  MakerWorld
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-[#00AE42] rounded-full">
                    3D Models
                  </span>
                </a>

                <a href="#faq" className="hover:text-[#00AE42] py-2 transition-colors">
                  Support & Wiki
                </a>
              </nav>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
                title="Search Horizon 3D"
              >
                <Search className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 px-2 py-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors">
                <Globe className="w-4 h-4 text-neutral-500" />
                <span>Global (EN)</span>
              </div>

              {/* User Account / Sign In Tab Trigger */}
              <button
                onClick={onOpenSignIn}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-neutral-100 transition-colors text-neutral-700 font-medium text-xs sm:text-sm cursor-pointer border border-neutral-200"
                title={currentUser ? `Signed in as ${currentUser.name}` : 'Sign In / Account'}
              >
                {currentUser ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-[#00AE42] text-white text-[10px] font-bold flex items-center justify-center">
                      {currentUser.name.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="font-semibold text-neutral-900 max-w-[80px] truncate hidden sm:inline">
                      {currentUser.name}
                    </span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-neutral-600" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              <div className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#00AE42] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </div>

              <a
                href="#download-matrix"
                className="hidden md:inline-flex items-center gap-2 bg-[#00AE42] hover:bg-[#009638] text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-sm transition-all shadow-[#00ae42]/20 hover:shadow-[#00ae42]/30 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-semibold text-[#00AE42] bg-emerald-50"
              >
                Horizon 3D (Download)
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-neutral-50"
              >
                Features & Slicing
              </a>
              <a
                href="#multi-color"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-neutral-50"
              >
                AMS & Multi-Color
              </a>
              <a
                href="#remote-control"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-neutral-50"
              >
                Remote Control & Cloud
              </a>
              <a
                href="#bambu-handy"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-neutral-50"
              >
                Horizon Mobile App
              </a>
              <a
                href="#tech-specs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-neutral-50"
              >
                System Requirements
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-neutral-50"
              >
                FAQ
              </a>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenSignIn()
                }}
                className="w-full text-center py-2.5 border border-neutral-300 text-neutral-800 font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#00AE42]" />
                <span>{currentUser ? `Account: ${currentUser.name}` : 'Sign In / Register'}</span>
              </button>
              <a
                href="#download-matrix"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-[#00AE42] text-white font-semibold rounded-lg shadow-sm"
              >
                Download Horizon 3D
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-4 shadow-2xl border border-neutral-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search Horizon 3D slicer features, profiles, release notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-sm outline-none placeholder:text-neutral-400 text-neutral-800"
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="pt-4 space-y-2">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2">
                Quick Links
              </div>
              <div className="flex flex-wrap gap-2 px-2">
                <a
                  href="#download-matrix"
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-emerald-50 hover:text-[#00AE42] text-xs font-medium text-neutral-700 transition-colors"
                >
                  Download Horizon 3D Windows x64
                </a>
                <a
                  href="#download-matrix"
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-emerald-50 hover:text-[#00AE42] text-xs font-medium text-neutral-700 transition-colors"
                >
                  Download Horizon 3D macOS ARM64
                </a>
                <a
                  href="#release-notes"
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-emerald-50 hover:text-[#00AE42] text-xs font-medium text-neutral-700 transition-colors"
                >
                  Latest Release Notes
                </a>
                <a
                  href="#tech-specs"
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-emerald-50 hover:text-[#00AE42] text-xs font-medium text-neutral-700 transition-colors"
                >
                  System Requirements
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
