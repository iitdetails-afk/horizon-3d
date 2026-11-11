import React, { useState } from 'react'
import {
  Mail,
  ArrowRight,
  Globe,
  CheckCircle2
} from 'lucide-react'

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const YoutubeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer className="bg-[#111827] text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter & Brand Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12 border-b border-neutral-800 items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00AE42] flex items-center justify-center text-white">
                <div className="grid grid-cols-2 gap-0.5 p-1.5">
                  <div className="w-2 h-2 bg-white rounded-[1px]"></div>
                  <div className="w-2 h-2 bg-white/90 rounded-[1px]"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-[1px]"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-[1px]"></div>
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Bambu Lab
              </span>
            </div>
            <p className="text-neutral-400 text-sm max-w-md">
              Stay up to date with firmware releases, slicing optimizations, MakerWorld contests, and exclusive offers.
            </p>
          </div>

          {/* Subscribe Form */}
          <div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md ml-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#00AE42] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-[#00AE42] hover:bg-[#009638] text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#00ae42]/20"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1.5 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing to Bambu Lab updates!
              </p>
            )}
          </div>
        </div>

        {/* 5-Column Link Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs text-neutral-400">
          {/* Column 1: 3D Printers */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">3D Printers</h5>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-white transition-colors">X1-Carbon Combo</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">X1E Enterprise</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">P1S 3D Printer</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">P1P CoreXY</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">A1 Full-Size</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">A1 mini</a></li>
            </ul>
          </div>

          {/* Column 2: Filament & Materials */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Filaments</h5>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">PLA Basic & Matte</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">PETG-HF & Translucent</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">ABS & ASA Weatherproof</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">TPU 95A Flexible</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Carbon Fiber (PA-CF / PET-CF)</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Support Materials</a></li>
            </ul>
          </div>

          {/* Column 3: Software & Apps */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Software</h5>
            <ul className="space-y-2">
              <li><a href="#overview" className="text-[#00AE42] font-semibold hover:underline">Horizon 3D Slicer</a></li>
              <li><a href="#bambu-handy" className="hover:text-white transition-colors">Bambu Handy Mobile App</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Bambu Suite</a></li>
              <li><a href="https://makerworld.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MakerWorld 3D Models</a></li>
              <li><a href="#download-matrix" className="hover:text-white transition-colors">Flathub Flatpak</a></li>
              <li><a href="https://github.com/bambulab/BambuStudio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Support & Help</h5>
            <ul className="space-y-2">
              <li><a href="https://wiki.bambulab.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Bambu Lab Wiki</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Help Center & FAQ</a></li>
              <li><a href="#tech-specs" className="hover:text-white transition-colors">Hardware Requirements</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Warranty & Return Policy</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Security & Vulnerability</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Submit Support Ticket</a></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Company</h5>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-white transition-colors">About Bambu Lab</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Careers & Open Roles</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">News & Blog</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Affiliate Program</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Region, Copyright, Legal, Social */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-neutral-500" />
            <span>Global / English (USD $)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-neutral-400">
            <span>© 2026 Bambu Lab. All Rights Reserved.</span>
            <span>•</span>
            <a href="#overview" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#overview" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#overview" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-neutral-400">
            <a href="https://github.com/bambulab/BambuStudio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
              <GithubIcon />
            </a>
            <a href="https://youtube.com/@BambuLab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="YouTube">
              <YoutubeIcon />
            </a>
            <a href="https://twitter.com/BambulabGlobal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Twitter / X">
              <TwitterIcon />
            </a>
            <a href="https://instagram.com/bambulab_official" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://facebook.com/bambulabglobal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Facebook">
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
