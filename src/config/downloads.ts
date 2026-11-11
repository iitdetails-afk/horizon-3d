export interface PlatformDownload {
  id: 'windows' | 'mac' | 'linux'
  name: string
  version: string
  releaseDate: string
  arch: string
  format: string
  fileSize: string
  compatibility: string
  isAvailable: boolean
  downloadUrl?: string // Replace with real installer URL when available
  checksum?: string
  notes?: string
}

export const DOWNLOADS_CONFIG: PlatformDownload[] = [
  {
    id: 'windows',
    name: 'Horizon Studio for Windows',
    version: '1.0.0',
    releaseDate: 'Coming Q2 2026',
    arch: 'x64 / ARM64',
    format: '.exe (Installer) / .zip (Portable)',
    fileSize: '185 MB (Estimated)',
    compatibility: 'Compatible with Windows 10 and Windows 11 (64-bit).',
    isAvailable: false,
    downloadUrl: '', // PLACEHOLDER: Set direct installer link when ready (e.g. 'https://downloads.horizon3d.io/HorizonStudio-1.0.0-Setup.exe')
    checksum: 'PENDING_FINAL_BUILD_VERIFICATION',
    notes: 'Digitally signed with Horizon 3D security certificate.'
  },
  {
    id: 'mac',
    name: 'Horizon Studio for macOS',
    version: '1.0.0',
    releaseDate: 'Coming Q2 2026',
    arch: 'Universal (Apple Silicon M1/M2/M3/M4 & Intel)',
    format: '.dmg',
    fileSize: '172 MB (Estimated)',
    compatibility: 'Compatible with macOS 11.0 (Big Sur) or higher.',
    isAvailable: false,
    downloadUrl: '', // PLACEHOLDER: Set macOS DMG link when ready
    checksum: 'PENDING_FINAL_BUILD_VERIFICATION',
    notes: 'Native Apple Silicon ARM64 & Intel x86_64 dual architecture.'
  },
  {
    id: 'linux',
    name: 'Horizon Studio for Linux',
    version: '1.0.0',
    releaseDate: 'Coming Q2 2026',
    arch: 'x86_64',
    format: '.AppImage / Flatpak',
    fileSize: '190 MB (Estimated)',
    compatibility: 'Compatible with Ubuntu 20.04+, Fedora 36+, and modern distributions.',
    isAvailable: false,
    downloadUrl: '', // PLACEHOLDER: Set Linux AppImage link when ready
    checksum: 'PENDING_FINAL_BUILD_VERIFICATION',
    notes: 'Standalone AppImage with bundled dependencies.'
  }
]
