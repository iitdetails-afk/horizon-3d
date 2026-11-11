import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Sparkles, MessageSquare, Eye } from 'lucide-react'

interface NavbarProps {
  onOpenContact: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = ['hero', 'showcase', 'features', 'specs', 'release-notes', 'docs', 'faq']
      const scrollPos = window.scrollY + 180

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Horizon Studio', href: '#showcase', id: 'showcase' },
    { name: 'Features', href: '#features', id: 'features' },
    { name: '3D Printing', href: '#specs', id: 'specs' },
    { name: 'Support', href: '#docs', id: 'docs' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#262626] py-2.5 shadow-2xl shadow-black/80'
          : 'bg-[#080808]/80 backdrop-blur-sm border-b border-[#1c1c1c] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Official Horizon 3D Logo */}
          <a href="#hero" className="flex items-center gap-3 group select-none">
            <div className="relative flex items-center justify-center overflow-hidden rounded-md border border-[#262626] bg-black p-0.5 transition-all group-hover:border-[#FF5A00]/50 group-hover:shadow-[0_0_15px_rgba(255,90,0,0.25)]">
              <img
                src="/horizon-3d-logo.jpeg"
                alt="HORIZON 3D Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ maxHeight: '42px' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-wider text-white font-mono flex items-center gap-1.5 leading-none">
                HORIZON <span className="text-[#FF5A00]">3D</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#FFD000] font-semibold mt-1 leading-none">
                BEYOND DIMENSIONS
              </span>
            </div>
          </a>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative py-1.5 transition-colors duration-200 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5A00] to-[#FFD000] rounded-full shadow-[0_0_8px_#FF5A00]"></span>
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3.5">
            <button
              onClick={onOpenContact}
              className="text-xs font-semibold text-[#A0A0A0] hover:text-white px-3.5 py-2 rounded-lg border border-[#262626] hover:border-[#404040] hover:bg-[#111111] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#FFD000]" />
              <span>Contact / Get Started</span>
            </button>

            <a
              href="#showcase"
              className="relative group overflow-hidden rounded-lg p-[1px] font-semibold text-xs transition-all active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF5A00] via-[#E52B00] to-[#FFD000] rounded-lg transition-all group-hover:opacity-100 opacity-90"></span>
              <span className="relative flex items-center gap-2 px-4 py-2 bg-[#080808] hover:bg-[#111111] rounded-[7px] text-white transition-colors">
                <Eye className="w-3.5 h-3.5 text-[#FF5A00]" />
                <span>Explore Studio</span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenContact}
              className="p-2 text-xs font-medium text-[#FFD000] border border-[#262626] rounded-lg bg-[#111111]"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#A0A0A0] hover:text-white hover:bg-[#171717] transition-colors border border-[#262626]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#262626] bg-[#080808]/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#171717] text-white font-semibold border-l-2 border-[#FF5A00]'
                    : 'text-[#A0A0A0] hover:text-white hover:bg-[#111111]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#262626] flex flex-col gap-2">
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-gradient-to-r from-[#FF5A00] to-[#E52B00] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#FF5A00]/20 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Explore Horizon Studio</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenContact()
              }}
              className="w-full text-center py-2.5 border border-[#262626] bg-[#111111] text-white font-medium text-xs rounded-lg hover:border-[#FF5A00]"
            >
              Contact / Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
