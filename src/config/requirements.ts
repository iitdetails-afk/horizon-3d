export interface SystemRequirement {
  platform: 'windows' | 'mac' | 'linux'
  name: string
  os: {
    minimum: string
    recommended: string
  }
  cpu: {
    minimum: string
    recommended: string
  }
  ram: {
    minimum: string
    recommended: string
  }
  gpu: {
    minimum: string
    recommended: string
  }
  storage: {
    minimum: string
    recommended: string
  }
  architecture: string
}

export const REQUIREMENTS_CONFIG: SystemRequirement[] = [
  {
    platform: 'windows',
    name: 'Windows',
    os: {
      minimum: 'Windows 10 64-bit (v1909 or later)',
      recommended: 'Windows 11 64-bit'
    },
    cpu: {
      minimum: 'Intel Core i3 / AMD Ryzen 3 (2.0 GHz+)',
      recommended: 'Intel Core i7 / AMD Ryzen 7 (8 cores or higher)'
    },
    ram: {
      minimum: '8 GB RAM',
      recommended: '16 GB - 32 GB RAM'
    },
    gpu: {
      minimum: 'OpenGL 2.0 compatible graphics',
      recommended: 'Dedicated NVIDIA GeForce RTX / AMD Radeon GPU (OpenGL 3.3+)'
    },
    storage: {
      minimum: '2 GB available SSD space',
      recommended: '10 GB+ high-speed NVMe storage for project caches'
    },
    architecture: 'x86_64 / ARM64'
  },
  {
    platform: 'mac',
    name: 'macOS',
    os: {
      minimum: 'macOS 11.0 Big Sur',
      recommended: 'macOS 14 Sonoma or higher'
    },
    cpu: {
      minimum: 'Intel 64-bit or Apple Silicon M1',
      recommended: 'Apple Silicon M2 / M3 / M4 (Pro / Max)'
    },
    ram: {
      minimum: '8 GB Unified Memory',
      recommended: '16 GB or 32 GB Unified Memory'
    },
    gpu: {
      minimum: 'Metal-capable GPU',
      recommended: 'Apple Silicon 10-core+ GPU with Metal 3 support'
    },
    storage: {
      minimum: '2 GB available SSD space',
      recommended: '10 GB+ high-speed internal storage'
    },
    architecture: 'Universal (Apple Silicon & Intel)'
  },
  {
    platform: 'linux',
    name: 'Linux',
    os: {
      minimum: 'Ubuntu 20.04 LTS / Fedora 36',
      recommended: 'Ubuntu 24.04 LTS or Arch Linux'
    },
    cpu: {
      minimum: 'x86_64 64-bit multi-core (2.0 GHz+)',
      recommended: 'AMD Ryzen 7 / Intel Core i7 (3.5 GHz+)'
    },
    ram: {
      minimum: '8 GB RAM',
      recommended: '16 GB RAM'
    },
    gpu: {
      minimum: 'Vulkan / OpenGL 3.2 support with modern Mesa drivers',
      recommended: 'Dedicated GPU with proprietary NVIDIA / AMD drivers'
    },
    storage: {
      minimum: '2 GB available space',
      recommended: '10 GB+ NVMe SSD'
    },
    architecture: 'x86_64'
  }
]
