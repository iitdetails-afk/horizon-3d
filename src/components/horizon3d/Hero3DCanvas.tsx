import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x080808, 0.05)

    // 2. Camera setup
    const width = container.clientWidth
    const height = container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 2.5, 6.5)

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x202020, 1.5)
    scene.add(ambientLight)

    // Cinematic Fiery Orange & Gold Point Lights
    const fireLight = new THREE.PointLight(0xff5a00, 4.0, 15)
    fireLight.position.set(2, 3, 2)
    scene.add(fireLight)

    const goldLight = new THREE.PointLight(0xffd000, 3.0, 12)
    goldLight.position.set(-2.5, 1.5, 1)
    scene.add(goldLight)

    const rimLight = new THREE.DirectionalLight(0xe52b00, 2.0)
    rimLight.position.set(0, 5, -3)
    scene.add(rimLight)

    // 5. 3D Objects: Metallic 3D Printing Object & Bed
    const group = new THREE.Group()
    scene.add(group)

    // Build Plate Grid
    const gridHelper = new THREE.GridHelper(6, 24, 0xff5a00, 0x262626)
    gridHelper.position.y = -1.2
    group.add(gridHelper)

    // Metallic Base Plate
    const plateGeo = new THREE.BoxGeometry(4.8, 0.1, 4.8)
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.9,
      roughness: 0.25
    })
    const plateMesh = new THREE.Mesh(plateGeo, plateMat)
    plateMesh.position.y = -1.25
    group.add(plateMesh)

    // Metallic Geometric 3D Print Object (Faceted Core with Horizon Orange Trim)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.position.y = 0.5
    group.add(coreMesh)

    // Wireframe Overlay in Gold
    const wireGeo = new THREE.WireframeGeometry(coreGeo)
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xff5a00,
      transparent: true,
      opacity: 0.55
    })
    const wireLines = new THREE.LineSegments(wireGeo, wireMat)
    coreMesh.add(wireLines)

    // Outer Orbiting Metallic Ring
    const ringGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 80)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffd000,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x331100
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 3
    ringMesh.position.y = 0.5
    group.add(ringMesh)

    // 6. Floating Ember Particles (Fiery Orange Sparks)
    const particleCount = 75
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5
      positions[i * 3 + 1] = Math.random() * 4 - 1
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
      speeds[i] = 0.005 + Math.random() * 0.015
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xff5a00,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // 7. Interactive Mouse / Orbit Tracking
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 1.5
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 1.0
    }
    window.addEventListener('mousemove', onMouseMove)

    // 8. Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth camera / group easing
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      group.rotation.y = elapsedTime * 0.25 + targetX
      group.rotation.x = targetY * 0.35

      // Floating object animations
      coreMesh.rotation.y = -elapsedTime * 0.35
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2
      coreMesh.position.y = 0.5 + Math.sin(elapsedTime * 1.5) * 0.08

      ringMesh.rotation.z = elapsedTime * 0.4
      ringMesh.rotation.y = elapsedTime * 0.2

      // Move ember particles
      const posArr = particleGeo.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += speeds[i]
        if (posArr[i * 3 + 1] > 3.5) {
          posArr[i * 3 + 1] = -1.2
          posArr[i * 3] = (Math.random() - 0.5) * 4
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 4
        }
      }
      particleGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] relative select-none"
      title="Interactive 3D Horizon Studio Core (Move mouse to interact)"
    />
  )
}
