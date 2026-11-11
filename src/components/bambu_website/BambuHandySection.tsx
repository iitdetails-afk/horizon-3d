import React from 'react'
import {
  Smartphone,
  QrCode,
  Bell,
  Camera,
  Play,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react'

export const BambuHandySection: React.FC = () => {
  return (
    <section id="bambu-handy" className="py-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#00AE42]">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Companion App</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Take the Studio on the Go with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AE42] to-emerald-600">
                Bambu Handy
              </span>
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              Bambu Handy gives you complete pocket control over your 3D printer.
              Browse trending models on MakerWorld, initiate 1-click prints directly from your phone,
              check live camera feeds, and receive push notifications the second a print completes or requires attention.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="p-2 rounded-lg bg-white shadow-sm text-[#00AE42]">
                  <Play className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">One-Click Printing</h4>
                  <p className="text-xs text-neutral-500">Print thousands of MakerWorld community models without touching a computer.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="p-2 rounded-lg bg-white shadow-sm text-[#00AE42]">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Chamber Camera Stream</h4>
                  <p className="text-xs text-neutral-500">Watch live streaming video and automatic timelapse captures anytime.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="p-2 rounded-lg bg-white shadow-sm text-[#00AE42]">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Real-time Push Alerts</h4>
                  <p className="text-xs text-neutral-500">Get instant mobile notifications for print completion or filament runout.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="p-2 rounded-lg bg-white shadow-sm text-[#00AE42]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">AMS Filament Tracking</h4>
                  <p className="text-xs text-neutral-500">Track filament spool levels, material types, and AMS moisture status.</p>
                </div>
              </div>
            </div>

            {/* App Store Links & QR Code */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              {/* QR Code Container */}
              <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-2xl">
                <div className="w-20 h-20 bg-white p-2 rounded-xl shadow-sm border border-neutral-200 flex items-center justify-center">
                  {/* SVG QR Code Illustration */}
                  <svg className="w-full h-full text-neutral-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h10v8H12V2zm2 2v4h6V4h-6zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v4h-4v-4zm-6 0h4v2h-4v-2zm0 4h2v4h-2v-4zm4 2h4v2h-4v-2zm2-4h2v2h-2v-2z"/>
                  </svg>
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-neutral-900">Scan to Download</div>
                  <div className="text-neutral-500">iOS 15.0+ or Android 7.0+</div>
                  <div className="text-[#00AE42] font-semibold text-[11px]">Free on App Store & Play Store</div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://apps.apple.com/app/bambu-handy/id1632760248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.06-.51 2.59-1.26z"/>
                  </svg>
                  <span>Download on the App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.bambulab.bambuhandy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.6 2.3c-.3.4-.6 1-.6 1.7v16c0 .7.3 1.3.6 1.7l.1.1 9-9v-.2l-9.1-9.3zM16.4 15.6l-3.7-3.7v-.2l3.7-3.7 4.2 2.4c1.2.7 1.2 1.8 0 2.5l-4.2 2.7zM12.7 11.7L3.6 20.8c.4.4 1.1.5 1.9.1l10.9-6.3-3.7-2.9zM12.7 11.7l3.7-2.9L5.5 2.5c-.8-.4-1.5-.3-1.9.1l9.1 9.1z"/>
                  </svg>
                  <span>Get it on Google Play</span>
                </a>
              </div>
            </div>
          </div>

          {/* Phone Mockup Frame */}
          <div className="flex justify-center">
            <div className="w-72 sm:w-80 h-[560px] bg-neutral-950 rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 ring-1 ring-neutral-700/50 flex flex-col justify-between relative overflow-hidden">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-full z-20"></div>

              {/* Phone Screen Mockup */}
              <div className="w-full h-full bg-neutral-900 rounded-[34px] overflow-hidden flex flex-col justify-between p-4 text-white">
                <div className="pt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-semibold text-white">My Workshop</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>

                  <div className="bg-neutral-800/90 rounded-2xl p-4 border border-neutral-700/80 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Bambu X1-Carbon</span>
                      <span className="text-emerald-400 font-mono text-[11px]">PRINTING</span>
                    </div>

                    <div className="h-28 rounded-xl bg-neutral-950 flex items-center justify-center relative overflow-hidden border border-neutral-800">
                      <div className="text-center space-y-1">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mx-auto"></div>
                        <div className="text-[10px] text-neutral-400 font-mono">Camera Feed Active</div>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-neutral-400 text-[11px]">
                        <span>Turbine_Impeller.3mf</span>
                        <span className="text-[#00AE42] font-bold">84%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AE42] rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-neutral-800/80 rounded-xl p-3 border border-neutral-700 text-xs flex items-center justify-between">
                    <span>AMS: 4 Loaded Spools</span>
                    <span className="text-[#00AE42] font-semibold text-[11px]">All Healthy</span>
                  </div>
                  <div className="text-center text-[10px] text-neutral-500">
                    Bambu Handy v2.14.0 (Sync Active)
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
