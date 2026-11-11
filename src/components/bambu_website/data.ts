import type { DownloadOption, ReleaseNote, FaqItem } from './types'

export const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    os: 'windows',
    label: 'Horizon 3D Windows Installer (64-bit)',
    arch: 'x64 (Intel / AMD)',
    version: 'v1.10.1.50',
    size: '178.4 MB',
    fileName: 'Horizon_3D_win_v01.10.01.50-20241028.exe',
    releaseDate: 'October 28, 2024',
    directUrl: 'https://github.com/bambulab/BambuStudio/releases/download/v01.10.01.50/Bambu_Studio_win_v01.10.01.50-20241028.exe',
    sha256: '9f83a21b045e7e1f486259cba6290e25bc2ff4c9ea74164eb374528ca948be6b'
  },
  {
    os: 'windows',
    label: 'Horizon 3D Windows Portable (ZIP)',
    arch: 'x64 (No install required)',
    version: 'v1.10.1.50',
    size: '194.2 MB',
    fileName: 'Horizon_3D_win_portable_v01.10.01.50.zip',
    releaseDate: 'October 28, 2024',
    directUrl: 'https://github.com/bambulab/BambuStudio/releases/download/v01.10.01.50/Bambu_Studio_win_portable_v01.10.01.50.zip',
    sha256: '4c8e1a89f92d415b3c4078df72e2cf175ad2e8f1bb824f910486c871dfa9291f'
  },
  {
    os: 'windows',
    label: 'Horizon 3D Windows Beta Preview',
    arch: 'x64',
    version: 'v1.10.2-beta2',
    size: '181.1 MB',
    fileName: 'Horizon_3D_win_v01.10.02.40-beta2.exe',
    releaseDate: 'November 15, 2024',
    directUrl: 'https://github.com/bambulab/BambuStudio/releases',
    sha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
    isBeta: true
  },
  {
    os: 'mac',
    label: 'Horizon 3D macOS Apple Silicon (M1/M2/M3/M4)',
    arch: 'ARM64 (Native)',
    version: 'v1.10.1.50',
    size: '166.8 MB',
    fileName: 'Horizon_3D_mac_arm64_v01.10.01.50.dmg',
    releaseDate: 'October 28, 2024',
    directUrl: 'https://github.com/bambulab/BambuStudio/releases/download/v01.10.01.50/Bambu_Studio_mac_arm64_v01.10.01.50.dmg',
    sha256: '18d998246cf6179375e2ef84a779ca5289f0a2ba19e487373f71c4c9215037d4'
  },
  {
    os: 'mac',
    label: 'Horizon 3D macOS Intel (x86_64)',
    arch: 'Intel 64-bit',
    version: 'v1.10.1.50',
    size: '174.5 MB',
    fileName: 'Horizon_3D_mac_x86_64_v01.10.01.50.dmg',
    releaseDate: 'October 28, 2024',
    directUrl: 'https://github.com/bambulab/BambuStudio/releases/download/v01.10.01.50/Bambu_Studio_mac_x86_64_v01.10.01.50.dmg',
    sha256: '67c7e992160b77b10298a834114f6bdf6a22fca4666cf32b13c1c5a96db4d8b9'
  },
  {
    os: 'mac',
    label: 'Horizon 3D macOS Apple Silicon Beta',
    arch: 'ARM64 (Beta Channel)',
    version: 'v1.10.2-beta2',
    size: '169.2 MB',
    fileName: 'Horizon_3D_mac_arm64_v01.10.02.40-beta.dmg',
    releaseDate: 'November 15, 2024',
    directUrl: 'https://github.com/bambulab/BambuStudio/releases',
    sha256: 'bc94830172bfade8274a161049281a8c3d917f8b9e6e408d2345678901abcdef',
    isBeta: true
  },
  {
    os: 'linux',
    label: 'Horizon 3D Linux AppImage',
    arch: 'x86_64 (Ubuntu 20.04+, Fedora 36+)',
    version: 'v1.10.1.50',
    size: '189.6 MB',
    fileName: 'Horizon_3D_linux_ubuntu-v01.10.01.50.AppImage',
    releaseDate: 'October 28, 2024',
    directUrl: 'https://github.com/bambulab/BambuStudio/releases/download/v01.10.01.50/Bambu_Studio_linux_ubuntu-v01.10.01.50.AppImage',
    sha256: '7f991428fcd9189012a9e320498a44b1509b20756e01a88684784918e9c7042a'
  },
  {
    os: 'linux',
    label: 'Horizon 3D Linux Flatpak (Flathub)',
    arch: 'Flathub Distribution',
    version: 'v1.10.1.50',
    size: 'Community Package',
    fileName: 'com.horizon3d.Horizon3D',
    releaseDate: 'October 30, 2024',
    directUrl: 'https://flathub.org/apps/com.bambulab.BambuStudio',
    sha256: 'Official Flathub GPG Verification'
  }
]

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: 'v1.10.1',
    date: 'October 28, 2024',
    isLatest: true,
    highlights: [
      'Comprehensive stability improvements for Horizon 3D multi-plate project export',
      'Refined Arc Move fitting algorithm delivering cleaner top surfaces on high-speed sweeps',
      'Upgraded filament manager with multi-slot automatic matching',
      'Enhanced Webview2 and WKWebView compatibility on desktop clients'
    ],
    features: [
      'Added direct print history filtering by printer serial number and status',
      'Introduced dynamic flush volume auto-scaling based on pigment density tables',
      'Enabled custom G-code preview tags in Horizon 3D sliced layer inspector',
      'Added support for new Bambu PLA Aero and PETG-HF preset configurations'
    ],
    optimizations: [
      'Improved slicing computation speed by ~18% on high-poly CAD assemblies',
      'Reduced memory footprint during multi-color layer preview generation in Horizon 3D',
      'Smoother camera orbital rotation in 3D scene with GPU acceleration'
    ],
    bugFixes: [
      'Fixed an issue where purge tower position could overlap with wide brim margins',
      'Resolved occasional crash when disconnecting from LAN mode while streaming camera feed',
      'Fixed inaccurate print time estimates on models using variable layer heights',
      'Addressed macOS Sequoia permission popups for local network discovery'
    ]
  },
  {
    version: 'v1.10.0',
    date: 'September 12, 2024',
    highlights: [
      'Major Horizon 3D UI redesign with unified modern dark/light styling and streamlined toolbar',
      'Brand new Filament Management Hub with RFID preset customization',
      'Deep integration with MakerWorld 3MF one-click cloud slicing profiles'
    ],
    features: [
      'Added cross-plate object grouping and synchronized plate duplication',
      'New smart tree support algorithm with improved detachment points and reduced scarring',
      'Direct integration with Horizon 3D Cloud Print Farm API'
    ],
    optimizations: [
      'Overhauled network stack with faster TLS handshake and automated retry on packet loss',
      'Better font rendering across high-DPI Windows displays and Retina screens'
    ],
    bugFixes: [
      'Fixed seams appearing unexpectedly on small cylindrical radii',
      'Corrected nozzle wipe coordinates for A1 mini when AMS Lite is detached'
    ]
  },
  {
    version: 'v1.9.3',
    date: 'June 20, 2024',
    highlights: [
      'Enhanced pressure advance and acoustic vibration test suite in Horizon 3D',
      'Multi-device simultaneous job queuing in Device tab'
    ],
    features: [
      'Automatic spaghetti detection sensitivity slider in device preferences',
      'Export plate as individual G-code or 3MF bundle'
    ],
    optimizations: [
      'Accelerated 3MF compression algorithm saving up to 40% disk space'
    ],
    bugFixes: [
      'Fixed prime tower collision warning in multi-color prints with tall objects'
    ]
  }
]

export const FAQS: FaqItem[] = [
  {
    category: 'general',
    question: 'Is Horizon 3D completely free and open-source?',
    answer: 'Yes! Horizon 3D is 100% free to download and open source under the GNU Affero General Public License (AGPLv3). The complete source code, issue tracker, and build instructions are publicly available.'
  },
  {
    category: 'compatibility',
    question: 'Can I use Horizon 3D with 3rd-party (non-Bambu) 3D printers?',
    answer: 'Yes. Horizon 3D includes built-in community profiles for popular third-party printers (such as Voron, Creality Ender series, Prusa MK3S/MK4, and others). You can also create custom printer profiles, configure custom bed dimensions, and tailor start/end G-code scripts.'
  },
  {
    category: 'compatibility',
    question: 'Which operating systems and architectures are supported by Horizon 3D?',
    answer: 'Horizon 3D supports Windows 10 & 11 (64-bit), macOS 10.15+ (both Apple Silicon M-Series and Intel x86_64), as well as Linux distributions (Ubuntu 20.04+, Fedora 36+, and Flathub flatpak). Minimum 8 GB RAM and OpenGL 2.0+ GPU are recommended.'
  },
  {
    category: 'features',
    question: 'Does Horizon 3D require an active internet connection to print?',
    answer: 'No. While Horizon 3D Cloud provides convenient remote monitoring and push notifications anywhere in the world, Horizon 3D fully supports offline SD card export as well as LAN-Only mode for strict local network confidentiality and security.'
  },
  {
    category: 'features',
    question: 'How does the Automatic Material System (AMS) multi-color printing work in Horizon 3D?',
    answer: 'Horizon 3D natively communicates with the AMS. When using official Bambu Lab filaments, RFID chips are automatically read to identify filament type, color, and remaining spool meter. In the slicer, you can paint models with intuitive 3D brushes, and Horizon 3D automatically arranges the purge tower and flushing matrix.'
  },
  {
    category: 'updates',
    question: 'What is the difference between Stable and Beta releases in Horizon 3D?',
    answer: 'Stable releases undergo comprehensive automated and field testing to ensure rock-solid production reliability. Beta releases provide early access to upcoming features, cutting-edge slicing algorithms, and support for newly released accessories before public release.'
  }
]

export const TECH_SPECS = [
  {
    spec: 'Operating System',
    minimum: 'Windows 10 64-bit / macOS 10.15 / Ubuntu 20.04',
    recommended: 'Windows 11 64-bit / macOS 13+ (Apple Silicon) / Ubuntu 22.04+'
  },
  {
    spec: 'Processor (CPU)',
    minimum: 'Intel Core 2 Duo / AMD Athlon 64 (2 GHz+)',
    recommended: 'Intel Core i5 / i7 (8th Gen+), AMD Ryzen 5 / 7, or Apple M1/M2/M3/M4'
  },
  {
    spec: 'System Memory (RAM)',
    minimum: '4 GB RAM',
    recommended: '16 GB RAM or higher (recommended for 100+ MB complex CAD meshes)'
  },
  {
    spec: 'Graphics Card (GPU)',
    minimum: 'OpenGL 2.0 compatible graphics card',
    recommended: 'Dedicated NVIDIA GeForce / AMD Radeon GPU (OpenGL 3.2+ supported)'
  },
  {
    spec: 'Display Resolution',
    minimum: '1280 × 800 pixels',
    recommended: '1920 × 1080 (Full HD) or 4K Retina display with high DPI scaling'
  },
  {
    spec: 'Storage Space',
    minimum: '2.5 GB available disk space',
    recommended: '10 GB+ fast NVMe SSD storage for 3MF project caches and time-lapse logs'
  }
]
