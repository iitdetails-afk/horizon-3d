import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  Move,
  RotateCw,
  Maximize2,
  Scissors,
  Type,
  Palette,
  Box,
  Compass,
  Grid,
  Sparkles,
  Eye,
  Plus,
  Check,
  RotateCcw,
  Layers,
  ZoomIn,
  ZoomOut,
  Sliders,
  ChevronDown,
  Info
} from 'lucide-react'
import type { ModelItem } from './StudioEcosystem'

interface PlateCadEditorProps {
  selectedModel: ModelItem | null
  onModelChange: (model: ModelItem) => void
  onSliceReady: () => void
  isSliced: boolean
  sliceProgress: number | null
}

export type CadTool = 'select' | 'move' | 'rotate' | 'scale' | 'cut' | 'text' | 'paint' | 'primitive'

export const PlateCadEditor: React.FC<PlateCadEditorProps> = ({
  selectedModel,
  onModelChange,
  onSliceReady,
  isSliced,
  sliceProgress
}) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const modelMeshGroupRef = useRef<THREE.Group | null>(null)
  const cutPlaneMeshRef = useRef<THREE.Mesh | null>(null)
  const textMeshRef = useRef<THREE.Mesh | null>(null)

  // Active CAD Tool
  const [activeTool, setActiveTool] = useState<CadTool>('move')

  // CAD Transform State
  const [posX, setPosX] = useState(0) // -80 to 80 mm
  const [posY, setPosY] = useState(0) // -80 to 80 mm
  const [posZ, setPosZ] = useState(0) // 0 to 60 mm

  const [rotX, setRotX] = useState(0) // degrees
  const [rotY, setRotY] = useState(0) // degrees
  const [rotZ, setRotZ] = useState(0) // degrees

  const [scaleUniform, setScaleUniform] = useState(true)
  const [scaleVal, setScaleVal] = useState(100) // %
  const [scaleX, setScaleX] = useState(100)
  const [scaleY, setScaleY] = useState(100)
  const [scaleZ, setScaleZ] = useState(100)

  // CAD Primitives Selection
  const [selectedPrimitive, setSelectedPrimitive] = useState<string>('custom')
  const [primitiveMenuOpen, setPrimitiveMenuOpen] = useState(false)

  // Cut / Split Tool State
  const [cutHeight, setCutHeight] = useState(25) // mm
  const [cutKeepMode, setCutKeepMode] = useState<'both' | 'lower' | 'upper'>('both')

  // Text Emboss State
  const [embossText, setEmbossText] = useState('HORIZON 3D')
  const [embossDepth, setEmbossDepth] = useState(1.5) // mm

  // Paint / AMS Filament Slots
  const [activeFilamentSlot, setActiveFilamentSlot] = useState(1)
  const filamentColors = [
    { slot: 1, name: 'PLA Basic Fire Orange', hex: '#FF5A00' },
    { slot: 2, name: 'PLA Matte Jet Black', hex: '#1C1C1C' },
    { slot: 3, name: 'PLA Basic Clean White', hex: '#FFFFFF' },
    { slot: 4, name: 'PLA Silk Horizon Gold', hex: '#FFD000' }
  ]

  // Viewport Settings
  const [wireframeMode, setWireframeMode] = useState(false)
  const [cameraZoom, setCameraZoom] = useState(1)

  // Dimensions HUD
  const baseDim = { x: 58, y: 52, z: 68 }
  const currentDimX = ((baseDim.x * (scaleUniform ? scaleVal : scaleX)) / 100).toFixed(1)
  const currentDimY = ((baseDim.y * (scaleUniform ? scaleVal : scaleY)) / 100).toFixed(1)
  const currentDimZ = ((baseDim.z * (scaleUniform ? scaleVal : scaleZ)) / 100).toFixed(1)

  // =========================================================================
  // 1. Three.js Scene Initialization
  // =========================================================================
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
    camera.position.set(0, 160, 240)
    camera.lookAt(0, 20, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0)
    mainLight.position.set(80, 180, 120)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.width = 1024
    mainLight.shadow.mapSize.height = 1024
    scene.add(mainLight)

    const orangeAccentLight = new THREE.PointLight(0xff5a00, 3.5, 300)
    orangeAccentLight.position.set(-90, 80, -90)
    scene.add(orangeAccentLight)

    const goldAccentLight = new THREE.PointLight(0xffd000, 2.0, 250)
    goldAccentLight.position.set(90, 40, 90)
    scene.add(goldAccentLight)

    // =========================================================================
    // 2. Realistic Textured PEI Build Plate (256 x 256 mm)
    // =========================================================================
    const plateGroup = new THREE.Group()
    scene.add(plateGroup)

    // Plate Base
    const plateGeo = new THREE.BoxGeometry(256, 3, 256)
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.8,
      roughness: 0.35
    })
    const plateMesh = new THREE.Mesh(plateGeo, plateMat)
    plateMesh.position.y = -1.5
    plateMesh.receiveShadow = true
    plateGroup.add(plateMesh)

    // PEI Texture Grid Lines (256x256 divided into 10mm and 20mm squares)
    const grid = new THREE.GridHelper(256, 25, 0x00ae42, 0x242424)
    grid.position.y = 0.1
    plateGroup.add(grid)

    // Plate Border Accent
    const borderGeo = new THREE.EdgesGeometry(plateGeo)
    const borderMat = new THREE.LineBasicMaterial({ color: 0x00ae42, linewidth: 2 })
    const borderLines = new THREE.LineSegments(borderGeo, borderMat)
    borderLines.position.y = -1.5
    plateGroup.add(borderLines)

    // Orientation Origin Axes (X: Red, Y: Green, Z: Blue)
    const axes = new THREE.AxesHelper(35)
    axes.position.set(-120, 0.5, 120)
    plateGroup.add(axes)

    // =========================================================================
    // 3. Dynamic CAD Model Mesh Group
    // =========================================================================
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)
    modelMeshGroupRef.current = modelGroup

    // Translucent Cut Plane helper mesh
    const cutGeo = new THREE.PlaneGeometry(160, 160)
    const cutMat = new THREE.MeshBasicMaterial({
      color: 0xff5a00,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    })
    const cutMesh = new THREE.Mesh(cutGeo, cutMat)
    cutMesh.rotation.x = Math.PI / 2
    cutMesh.position.y = cutHeight
    cutMesh.visible = false
    scene.add(cutMesh)
    cutPlaneMeshRef.current = cutMesh

    // Orbit Drag Navigation
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let rotationSpeed = 0.005

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      prevMouseX = e.clientX
      prevMouseY = e.clientY

      // Orbit around plate center
      const rotY = deltaX * rotationSpeed
      const rotX = deltaY * rotationSpeed

      const pos = camera.position
      const radius = Math.sqrt(pos.x * pos.x + pos.z * pos.z)
      const currentAngle = Math.atan2(pos.x, pos.z)
      const newAngle = currentAngle + rotY

      pos.x = radius * Math.sin(newAngle)
      pos.z = radius * Math.cos(newAngle)
      pos.y = Math.max(10, Math.min(320, pos.y - rotX * 50))
      camera.lookAt(0, 20, 0)
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const zoomFactor = e.deltaY * 0.15
      const dir = new THREE.Vector3()
      camera.getWorldDirection(dir)
      const newPos = camera.position.clone().addScaledVector(dir, -zoomFactor)
      if (newPos.length() > 60 && newPos.length() < 450) {
        camera.position.copy(newPos)
        camera.lookAt(0, 20, 0)
      }
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('wheel', onWheel, { passive: false })

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', handleResize)
      if (rendererRef.current?.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement)
      }
      rendererRef.current?.dispose()
    }
  }, [])

  // =========================================================================
  // 4. Update 3D Geometry when Primitive or Model changes
  // =========================================================================
  useEffect(() => {
    const group = modelMeshGroupRef.current
    if (!group) return

    // Clear old children
    while (group.children.length > 0) {
      const obj = group.children[0]
      group.remove(obj)
    }

    // Determine color
    const activeColorHex =
      filamentColors.find((f) => f.slot === activeFilamentSlot)?.hex || selectedModel?.color || '#FF5A00'
    const color = new THREE.Color(activeColorHex)

    // Base material
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.25,
      wireframe: wireframeMode
    })

    let mesh: THREE.Mesh

    switch (selectedPrimitive) {
      case 'cube': {
        // Calibration Cube (20 x 20 x 20 mm standard)
        const geo = new THREE.BoxGeometry(36, 36, 36)
        mesh = new THREE.Mesh(geo, material)
        mesh.position.y = 18
        break
      }
      case 'cylinder': {
        // Spiral Vase / Cylinder (D34 x H54 mm)
        const geo = new THREE.CylinderGeometry(20, 20, 50, 36)
        mesh = new THREE.Mesh(geo, material)
        mesh.position.y = 25
        break
      }
      case 'sphere': {
        // Ball / Sphere (D40 mm)
        const geo = new THREE.SphereGeometry(22, 32, 32)
        mesh = new THREE.Mesh(geo, material)
        mesh.position.y = 22
        break
      }
      case 'torus': {
        // Torus Ring
        const geo = new THREE.TorusGeometry(24, 8, 24, 48)
        mesh = new THREE.Mesh(geo, material)
        mesh.rotation.x = Math.PI / 2
        mesh.position.y = 8
        break
      }
      case 'gear': {
        // Parametric Mechanical Gear
        const geo = new THREE.CylinderGeometry(26, 26, 16, 16)
        mesh = new THREE.Mesh(geo, material)
        mesh.position.y = 8
        break
      }
      case 'cone': {
        // Cone
        const geo = new THREE.ConeGeometry(24, 48, 32)
        mesh = new THREE.Mesh(geo, material)
        mesh.position.y = 24
        break
      }
      default: {
        // Custom Complex Model (Organic/Mechanical Sliced Sculpt)
        const baseGroup = new THREE.Group()

        // Core 3D body
        const coreGeo = new THREE.DodecahedronGeometry(28, 2)
        const coreMesh = new THREE.Mesh(coreGeo, material)
        coreMesh.position.y = 28
        baseGroup.add(coreMesh)

        // Accent upper crown
        const crownGeo = new THREE.TorusKnotGeometry(14, 4, 64, 16)
        const crownMat = new THREE.MeshStandardMaterial({
          color: 0xffd000,
          metalness: 0.8,
          roughness: 0.2,
          wireframe: wireframeMode
        })
        const crownMesh = new THREE.Mesh(crownGeo, crownMat)
        crownMesh.position.y = 38
        crownMesh.rotation.x = Math.PI / 4
        baseGroup.add(crownMesh)

        mesh = baseGroup as unknown as THREE.Mesh
        break
      }
    }

    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)

    // Bounding Box Helper (Green wireframe frame around part)
    const boxHelper = new THREE.BoxHelper(mesh, 0x00ae42)
    group.add(boxHelper)
  }, [selectedPrimitive, selectedModel, activeFilamentSlot, wireframeMode])

  // =========================================================================
  // 5. Apply Position, Rotation, Scale Transforms
  // =========================================================================
  useEffect(() => {
    const group = modelMeshGroupRef.current
    if (!group) return

    // Position (mm)
    group.position.set(posX, posZ, posY)

    // Rotation (degrees to radians)
    group.rotation.set(
      (rotX * Math.PI) / 180,
      (rotY * Math.PI) / 180,
      (rotZ * Math.PI) / 180
    )

    // Scale
    const sx = (scaleUniform ? scaleVal : scaleX) / 100
    const sy = (scaleUniform ? scaleVal : scaleY) / 100
    const sz = (scaleUniform ? scaleVal : scaleZ) / 100
    group.scale.set(sx, sy, sz)
  }, [posX, posY, posZ, rotX, rotY, rotZ, scaleUniform, scaleVal, scaleX, scaleY, scaleZ])

  // =========================================================================
  // 6. Cut Plane Visibility & Position
  // =========================================================================
  useEffect(() => {
    if (cutPlaneMeshRef.current) {
      cutPlaneMeshRef.current.visible = activeTool === 'cut'
      cutPlaneMeshRef.current.position.y = cutHeight
    }
  }, [activeTool, cutHeight])

  // Quick Action: Snap to Bed (Z = 0)
  const handleSnapToBed = () => {
    setPosZ(0)
  }

  // Quick Action: Auto-Center
  const handleAutoCenter = () => {
    setPosX(0)
    setPosY(0)
    setPosZ(0)
  }

  // Quick Action: Reset Transforms
  const handleResetTransforms = () => {
    setPosX(0)
    setPosY(0)
    setPosZ(0)
    setRotX(0)
    setRotY(0)
    setRotZ(0)
    setScaleVal(100)
    setScaleX(100)
    setScaleY(100)
    setScaleZ(100)
  }

  return (
    <div className="flex-1 flex flex-col bg-[#080808] relative select-none overflow-hidden rounded-2xl border border-[#222222]">
      {/* =========================================================================
          TOP CAD TOOLBAR (Exact replica of Screenshot 2 horizontal tool shelf)
         ========================================================================= */}
      <div className="bg-[#171717] px-3 py-2 border-b border-[#262626] flex items-center justify-between gap-2 z-20">
        {/* Left: Primary CAD Action Tools */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {/* 1. Add Primitive Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPrimitiveMenuOpen(!primitiveMenuOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                primitiveMenuOpen
                  ? 'bg-[#00AE42] text-white shadow'
                  : 'bg-[#222222] text-neutral-300 hover:text-white hover:bg-[#2a2a2a]'
              }`}
              title="Add CAD Primitive Shape"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Shape</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {primitiveMenuOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-[#1a1a1a] border border-[#333333] rounded-xl shadow-2xl p-1.5 z-50 text-xs space-y-0.5 animate-in fade-in zoom-in-95">
                {[
                  { id: 'custom', label: 'Selected Library Model', icon: '🎨' },
                  { id: 'cube', label: 'Calibration Cube', icon: '🧊' },
                  { id: 'cylinder', label: 'Vase / Cylinder', icon: '🥫' },
                  { id: 'sphere', label: 'Sphere', icon: '⚽' },
                  { id: 'torus', label: 'Torus Ring', icon: '🍩' },
                  { id: 'gear', label: 'Mechanical Gear', icon: '⚙️' },
                  { id: 'cone', label: 'Precision Cone', icon: '🔺' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedPrimitive(item.id)
                      setPrimitiveMenuOpen(false)
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                      selectedPrimitive === item.id
                        ? 'bg-[#00AE42] text-white font-bold'
                        : 'text-neutral-300 hover:bg-[#262626] hover:text-white'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-[1px] bg-[#333333] mx-1"></div>

          {/* 2. Move (Translate) Tool */}
          <button
            onClick={() => setActiveTool('move')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === 'move'
                ? 'bg-[#00AE42] text-white shadow-md'
                : 'text-neutral-300 hover:bg-[#222222] hover:text-white'
            }`}
            title="Move Tool (Translate X, Y, Z)"
          >
            <Move className="w-4 h-4" />
            <span className="hidden sm:inline">Move</span>
          </button>

          {/* 3. Rotate Tool */}
          <button
            onClick={() => setActiveTool('rotate')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === 'rotate'
                ? 'bg-[#00AE42] text-white shadow-md'
                : 'text-neutral-300 hover:bg-[#222222] hover:text-white'
            }`}
            title="Rotate Tool (Pitch, Roll, Yaw)"
          >
            <RotateCw className="w-4 h-4" />
            <span className="hidden sm:inline">Rotate</span>
          </button>

          {/* 4. Scale Tool */}
          <button
            onClick={() => setActiveTool('scale')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === 'scale'
                ? 'bg-[#00AE42] text-white shadow-md'
                : 'text-neutral-300 hover:bg-[#222222] hover:text-white'
            }`}
            title="Scale Tool (Dimensions in mm & %)"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">Scale</span>
          </button>

          {/* 5. Cut / Split Tool */}
          <button
            onClick={() => setActiveTool('cut')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === 'cut'
                ? 'bg-[#00AE42] text-white shadow-md'
                : 'text-neutral-300 hover:bg-[#222222] hover:text-white'
            }`}
            title="Cut Tool (Planar Slice Split)"
          >
            <Scissors className="w-4 h-4" />
            <span className="hidden sm:inline">Cut</span>
          </button>

          {/* 6. Text Emboss Tool */}
          <button
            onClick={() => setActiveTool('text')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === 'text'
                ? 'bg-[#00AE42] text-white shadow-md'
                : 'text-neutral-300 hover:bg-[#222222] hover:text-white'
            }`}
            title="3D Text Emboss Tool"
          >
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">Text</span>
          </button>

          {/* 7. Color / Filament Paint Tool */}
          <button
            onClick={() => setActiveTool('paint')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === 'paint'
                ? 'bg-[#00AE42] text-white shadow-md'
                : 'text-neutral-300 hover:bg-[#222222] hover:text-white'
            }`}
            title="Multi-Color AMS Filament Painting"
          >
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Color</span>
          </button>

          <div className="h-4 w-[1px] bg-[#333333] mx-1"></div>

          {/* Lay on Face / Auto-Center */}
          <button
            onClick={handleAutoCenter}
            className="p-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-[#222222] hover:text-white transition-colors"
            title="Auto-Center on Plate"
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={handleSnapToBed}
            className="p-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-[#222222] hover:text-white transition-colors"
            title="Lay Flat on Bed (Snap Z to 0)"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* Right: View Options */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`px-2 py-1 rounded-lg border transition-all ${
              wireframeMode
                ? 'bg-[#FF5A00]/20 border-[#FF5A00] text-[#FF5A00] font-bold'
                : 'bg-[#222222] border-[#333333] text-neutral-400 hover:text-white'
            }`}
            title="Toggle CAD Wireframe Mesh"
          >
            Mesh Wireframe
          </button>

          <button
            onClick={handleResetTransforms}
            className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#2a2a2a] text-neutral-400 hover:text-white border border-[#333333]"
            title="Reset All Transforms"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          MAIN 3D VIEWPORT CONTAINER (Three.js WebGL Canvas)
         ========================================================================= */}
      <div className="relative flex-1 min-h-[380px] w-full bg-[#0a0a0a]">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top-Left Model Badge HUD */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          <div className="px-3 py-1.5 rounded-xl bg-[#171717]/90 backdrop-blur-md border border-[#2a2a2a] text-xs font-mono text-neutral-200 shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00AE42] animate-pulse"></span>
            <span className="font-bold text-white">
              {selectedPrimitive !== 'custom'
                ? selectedPrimitive.toUpperCase()
                : selectedModel?.title || 'Horizon 3D Master Model'}
            </span>
          </div>

          {/* Bounding Box Dimensions */}
          <div className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-neutral-300">
            X: <span className="text-[#00AE42]">{currentDimX}</span> mm • Y:{' '}
            <span className="text-[#00AE42]">{currentDimY}</span> mm • Z:{' '}
            <span className="text-[#FF5A00]">{currentDimZ}</span> mm
          </div>
        </div>

        {/* Bottom-Left 3D Orientation Cube Gizmo (Matching Screenshot 2) */}
        <div className="absolute bottom-4 left-4 z-10 w-16 h-16 bg-[#171717]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex flex-col items-center justify-center text-[10px] font-mono shadow-2xl pointer-events-none">
          <div className="text-white font-black tracking-widest text-[11px]">TOP</div>
          <div className="text-[#00AE42] font-bold text-[9px]">FRONT</div>
          <div className="flex gap-1 text-[8px] font-bold mt-0.5">
            <span className="text-red-500">X</span>
            <span className="text-green-500">Y</span>
            <span className="text-blue-500">Z</span>
          </div>
        </div>

        {/* Floating Right Dock: Active Tool Parameters (CAD Inspector) */}
        <div className="absolute top-3 right-3 z-10 w-64 bg-[#171717]/95 backdrop-blur-md border border-[#2c2c2c] rounded-2xl shadow-2xl p-3 text-xs space-y-2.5">
          {/* Active Tool Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#262626]">
            <div className="flex items-center gap-1.5 font-bold text-white uppercase text-[11px] font-mono">
              <Sliders className="w-3.5 h-3.5 text-[#00AE42]" />
              <span>CAD Inspector: {activeTool}</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">PEI 256mm</span>
          </div>

          {/* Tool: MOVE */}
          {activeTool === 'move' && (
            <div className="space-y-2 text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="font-mono text-red-400 font-bold">X Position:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    value={posX}
                    onChange={(e) => setPosX(Number(e.target.value))}
                    className="w-24 accent-[#00AE42]"
                  />
                  <span className="w-10 text-right font-mono text-white text-[11px]">{posX}mm</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-green-400 font-bold">Y Position:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    value={posY}
                    onChange={(e) => setPosY(Number(e.target.value))}
                    className="w-24 accent-[#00AE42]"
                  />
                  <span className="w-10 text-right font-mono text-white text-[11px]">{posY}mm</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-blue-400 font-bold">Z Height:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={posZ}
                    onChange={(e) => setPosZ(Number(e.target.value))}
                    className="w-24 accent-[#00AE42]"
                  />
                  <span className="w-10 text-right font-mono text-white text-[11px]">{posZ}mm</span>
                </div>
              </div>

              <div className="flex gap-1 pt-1">
                <button
                  onClick={handleAutoCenter}
                  className="flex-1 py-1 rounded-lg bg-[#222222] hover:bg-[#2a2a2a] text-neutral-200 text-[10px] font-semibold"
                >
                  Center Plate
                </button>
                <button
                  onClick={handleSnapToBed}
                  className="flex-1 py-1 rounded-lg bg-[#222222] hover:bg-[#2a2a2a] text-[#00AE42] text-[10px] font-semibold"
                >
                  Snap to Bed
                </button>
              </div>
            </div>
          )}

          {/* Tool: ROTATE */}
          {activeTool === 'rotate' && (
            <div className="space-y-2 text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="font-mono text-red-400">Pitch (X):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotX}
                    onChange={(e) => setRotX(Number(e.target.value))}
                    className="w-24 accent-[#00AE42]"
                  />
                  <span className="w-10 text-right font-mono text-white text-[11px]">{rotX}°</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-green-400">Roll (Y):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotY}
                    onChange={(e) => setRotY(Number(e.target.value))}
                    className="w-24 accent-[#00AE42]"
                  />
                  <span className="w-10 text-right font-mono text-white text-[11px]">{rotY}°</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-blue-400">Yaw (Z):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotZ}
                    onChange={(e) => setRotZ(Number(e.target.value))}
                    className="w-24 accent-[#00AE42]"
                  />
                  <span className="w-10 text-right font-mono text-white text-[11px]">{rotZ}°</span>
                </div>
              </div>

              {/* Quick 90 Degree Rotation Presets */}
              <div className="grid grid-cols-3 gap-1 pt-1">
                <button
                  onClick={() => setRotZ((r) => (r + 90) % 360)}
                  className="py-1 rounded bg-[#222222] hover:bg-[#2a2a2a] text-neutral-200 text-[10px]"
                >
                  +90° Z
                </button>
                <button
                  onClick={() => setRotX((r) => (r + 90) % 360)}
                  className="py-1 rounded bg-[#222222] hover:bg-[#2a2a2a] text-neutral-200 text-[10px]"
                >
                  +90° X
                </button>
                <button
                  onClick={() => {
                    setRotX(0)
                    setRotY(0)
                    setRotZ(0)
                  }}
                  className="py-1 rounded bg-[#222222] hover:bg-[#2a2a2a] text-neutral-400 text-[10px]"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Tool: SCALE */}
          {activeTool === 'scale' && (
            <div className="space-y-2 text-neutral-300">
              <div className="flex items-center justify-between text-[11px]">
                <span>Uniform Scaling</span>
                <input
                  type="checkbox"
                  checked={scaleUniform}
                  onChange={(e) => setScaleUniform(e.target.checked)}
                  className="accent-[#00AE42]"
                />
              </div>

              {scaleUniform ? (
                <div className="flex items-center justify-between">
                  <span className="font-mono">Scale Ratio:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="range"
                      min="20"
                      max="250"
                      value={scaleVal}
                      onChange={(e) => setScaleVal(Number(e.target.value))}
                      className="w-24 accent-[#00AE42]"
                    />
                    <span className="w-10 text-right font-mono text-white text-[11px]">{scaleVal}%</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-red-400">Scale X:</span>
                    <input
                      type="range"
                      min="20"
                      max="250"
                      value={scaleX}
                      onChange={(e) => setScaleX(Number(e.target.value))}
                      className="w-24 accent-[#00AE42]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-green-400">Scale Y:</span>
                    <input
                      type="range"
                      min="20"
                      max="250"
                      value={scaleY}
                      onChange={(e) => setScaleY(Number(e.target.value))}
                      className="w-24 accent-[#00AE42]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-blue-400">Scale Z:</span>
                    <input
                      type="range"
                      min="20"
                      max="250"
                      value={scaleZ}
                      onChange={(e) => setScaleZ(Number(e.target.value))}
                      className="w-24 accent-[#00AE42]"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-1 pt-1">
                {[50, 100, 150, 200].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setScaleVal(s)
                      setScaleX(s)
                      setScaleY(s)
                      setScaleZ(s)
                    }}
                    className="flex-1 py-1 rounded bg-[#222222] hover:bg-[#2a2a2a] text-neutral-300 text-[10px]"
                  >
                    {s}%
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tool: CUT */}
          {activeTool === 'cut' && (
            <div className="space-y-2 text-neutral-300">
              <div className="text-[11px] text-[#FF5A00] font-semibold flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5" />
                <span>Planar Cut Plane</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono">Cut Height:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={cutHeight}
                    onChange={(e) => setCutHeight(Number(e.target.value))}
                    className="w-24 accent-[#FF5A00]"
                  />
                  <span className="w-10 text-right font-mono text-white text-[11px]">{cutHeight}mm</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1 text-[10px]">
                {(['both', 'lower', 'upper'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setCutKeepMode(m)}
                    className={`py-1 rounded capitalize transition-colors ${
                      cutKeepMode === m ? 'bg-[#FF5A00] text-white font-bold' : 'bg-[#222222] text-neutral-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <button
                onClick={() => alert(`Planar Cut applied at Z = ${cutHeight}mm (Mode: Keep ${cutKeepMode})`)}
                className="w-full py-1.5 rounded-lg bg-[#FF5A00] hover:bg-[#e52b00] text-white font-bold text-xs shadow"
              >
                Execute Planar Cut
              </button>
            </div>
          )}

          {/* Tool: TEXT */}
          {activeTool === 'text' && (
            <div className="space-y-2 text-neutral-300">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Emboss Text:</label>
                <input
                  type="text"
                  value={embossText}
                  onChange={(e) => setEmbossText(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded px-2 py-1 text-white font-mono text-xs"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Depth:</span>
                <span className="font-mono text-white">{embossDepth} mm</span>
              </div>
              <button
                onClick={() => alert(`Embossed "${embossText}" with depth ${embossDepth}mm onto 3D face`)}
                className="w-full py-1.5 rounded-lg bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-xs"
              >
                Apply 3D Text
              </button>
            </div>
          )}

          {/* Tool: COLOR / AMS PAINT */}
          {activeTool === 'paint' && (
            <div className="space-y-2 text-neutral-300">
              <div className="text-[10px] text-neutral-400">Select AMS Filament Slot:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {filamentColors.map((f) => (
                  <button
                    key={f.slot}
                    onClick={() => setActiveFilamentSlot(f.slot)}
                    className={`p-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all ${
                      activeFilamentSlot === f.slot
                        ? 'border-[#00AE42] bg-[#00AE42]/20 text-white font-bold'
                        : 'border-[#262626] bg-[#111111] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                      style={{ backgroundColor: f.hex }}
                    ></span>
                    <span className="truncate text-[10px]">
                      Slot {f.slot}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Instruction Pill */}
        <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-400 pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-[#00AE42]" />
          <span>Left Drag: Orbit • Scroll: Zoom • Right Drag: Pan</span>
        </div>
      </div>
    </div>
  )
}
