export interface ReleaseNote {
  version: string
  date: string
  isLatest?: boolean
  isBeta?: boolean
  highlights: string[]
  features: string[]
  optimizations: string[]
  bugFixes: string[]
}

export interface DownloadOption {
  os: 'windows' | 'mac' | 'linux'
  label: string
  arch: string
  version: string
  size: string
  fileName: string
  releaseDate: string
  directUrl: string
  sha256: string
  isBeta?: boolean
}

export interface FaqItem {
  question: string
  answer: string
  category: 'general' | 'compatibility' | 'features' | 'updates'
}
