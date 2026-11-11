export interface VersionRelease {
  version: string
  releaseDate: string
  isLatest: boolean
  status: 'Preview' | 'Release' | 'Beta'
  summary: string
  changes: {
    category: 'New Features' | 'Improvements' | 'Fixes'
    items: string[]
  }[]
}

export const VERSIONS_CONFIG: VersionRelease[] = [
  {
    version: '1.0.0',
    releaseDate: 'Initial Release (Upcoming)',
    isLatest: true,
    status: 'Preview',
    summary: 'Horizon Studio 1.0.0 introduces an advanced high-speed slicing engine, multi-model workflow orchestration, and precision toolpath algorithms tailored for next-generation 3D fabrication.',
    changes: [
      {
        category: 'New Features',
        items: [
          'Horizon Core Slicing Engine with adaptive acceleration smoothing',
          'Multi-Model Project Canvas with unified plate management',
          'Precision Toolhead Control with micron-level perimeter resolution',
          'Cinematic real-time 3D toolpath preview with layer timeline inspection'
        ]
      },
      {
        category: 'Improvements',
        items: [
          'High-DPI modern dark user interface with fire orange telemetry indicators',
          'Accelerated mesh slicing using multi-threaded spatial partitioning',
          'Dynamic volumetric flow balancing for high-speed extrusion profiles'
        ]
      },
      {
        category: 'Fixes',
        items: [
          'Overhang curl mitigation on acute cantilever angles above 60°',
          'Optimized memory consumption on complex multi-million triangle CAD assemblies'
        ]
      }
    ]
  }
]
