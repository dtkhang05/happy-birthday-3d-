/**
 * particles.js — All particle systems:
 *   • Phase-1 floating dust
 *   • Button dissolve burst
 *   • Ignition explosion
 *   • Confetti (Phase 2)
 *   • Bokeh & Stars & Hearts (Phase 2)
 */
import * as THREE from 'three'
import gsap from 'gsap'

// ── Phase-1: Floating Dust ────────────────────────────────────────────────────
export function createDustParticles(scene) {
  const COUNT = 2000
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(COUNT * 3)
  const velocities = new Float32Array(COUNT * 3)

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = Math.random() * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.003
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0015
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const mat = new THREE.PointsMaterial({
    color: 0xff3300,
    size: 0.045,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    depthWrite: false,
  })
  const points = new THREE.Points(geo, mat)
  points.frustumCulled = false
  scene.add(points)

  function update() {
    const pos = geo.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 0] += velocities[i * 3 + 0]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = 0
      if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 10
    }
    geo.attributes.position.needsUpdate = true
  }

  function transitionToPhase2() {
    gsap.to(mat, { opacity: 0, duration: 2, delay: 0.5 })
  }

  return { points, update, transitionToPhase2 }
}

// ── Button Dissolve Particles ─────────────────────────────────────────────────
export function createButtonDissolveParticles(scene, targetPos, camera) {
  const COUNT = 90
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(COUNT * 3)
  const forward = new THREE.Vector3()
  camera.getWorldDirection(forward)
  const origin = camera.position.clone().addScaledVector(forward, 4)

  for (let i = 0; i < COUNT; i++) {
    pos[i * 3 + 0] = origin.x + (Math.random() - 0.5) * 1.8
    pos[i * 3 + 1] = origin.y + (Math.random() - 0.5) * 0.8
    pos[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 1.0
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))

  const mat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 1,
    sizeAttenuation: true,
    depthWrite: false,
  })
  const points = new THREE.Points(geo, mat)
  points.frustumCulled = false
  scene.add(points)

  for (let i = 0; i < COUNT; i++) {
    const idx = i
    const proxy = { x: pos[idx * 3 + 0], y: pos[idx * 3 + 1], z: pos[idx * 3 + 2] }
    gsap.to(proxy, {
      x: targetPos.x + (Math.random() - 0.5) * 0.4,
      y: targetPos.y + (Math.random() - 0.5) * 0.4,
      z: targetPos.z + (Math.random() - 0.5) * 0.4,
      duration: 0.6 + Math.random() * 0.5,
      delay: Math.random() * 0.3,
      ease: 'power2.in',
      onUpdate() {
        geo.attributes.position.array[idx * 3 + 0] = proxy.x
        geo.attributes.position.array[idx * 3 + 1] = proxy.y
        geo.attributes.position.array[idx * 3 + 2] = proxy.z
        geo.attributes.position.needsUpdate = true
      },
    })
  }
  gsap.to(mat, { opacity: 0, duration: 0.4, delay: 0.7 })
  setTimeout(() => {
    scene.remove(points)
    geo.dispose()
    mat.dispose()
  }, 2200)

  return points
}

// ── Ignition Explosion ────────────────────────────────────────────────────────
export function createExplosionParticles(scene, position) {
  const COUNT = 320
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(COUNT * 3)
  const velocities = []

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3 + 0] = position.x
    positions[i * 3 + 1] = position.y
    positions[i * 3 + 2] = position.z
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const speed = 0.04 + Math.random() * 0.1
    velocities.push(new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * speed,
      Math.cos(phi) * speed * 1.3, 
      Math.sin(phi) * Math.sin(theta) * speed
    ))
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const PALETTES = [0xffee00, 0xff8800, 0xff4488, 0xffffff, 0x88ffff]
  const mat = new THREE.PointsMaterial({
    color: PALETTES[Math.floor(Math.random() * PALETTES.length)],
    size: 0.1,
    transparent: true,
    opacity: 1,
    sizeAttenuation: true,
    depthWrite: false,
  })
  const points = new THREE.Points(geo, mat)
  points.frustumCulled = false
  scene.add(points)

  let life = 1.0
  let disposed = false
  function update() {
    if (disposed) return
    life -= 0.018
    if (life <= 0) {
      disposed = true
      scene.remove(points)
      geo.dispose()
      mat.dispose()
      return
    }
    mat.opacity = Math.max(0, life)
    const posArr = geo.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      posArr[i * 3 + 0] += velocities[i].x
      posArr[i * 3 + 1] += velocities[i].y
      posArr[i * 3 + 2] += velocities[i].z
      velocities[i].y -= 0.0025
    }
    geo.attributes.position.needsUpdate = true
  }

  return { update, isDisposed: () => disposed }
}

// ── Phase 2: Confetti (Air + Floor) ───────────────────────────────────────────
export function createConfetti(scene) {
  const AIR_COUNT = 400
  const geo = new THREE.PlaneGeometry(0.1, 0.1)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff, side: THREE.DoubleSide,
  })
  
  const airMesh = new THREE.InstancedMesh(geo, mat, AIR_COUNT)
  const dummy = new THREE.Object3D()
  const colors = [0xff4466, 0x4488ff, 0x44ee88, 0xff8844, 0xffcc00]
  const particles = []
  
  for (let i = 0; i < AIR_COUNT; i++) {
    const x = (Math.random() - 0.5) * 16
    const y = 5 + Math.random() * 8
    const z = (Math.random() - 0.5) * 14
    particles.push({
      x, y, z,
      rx: Math.random() * Math.PI, ry: Math.random() * Math.PI, rz: Math.random() * Math.PI,
      vx: (Math.random() - 0.5) * 0.02, vy: -0.015 - Math.random() * 0.02,
      vrx: (Math.random() - 0.5) * 0.1, vry: (Math.random() - 0.5) * 0.1,
      color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)])
    })
    airMesh.setColorAt(i, particles[i].color)
  }
  airMesh.instanceColor.needsUpdate = true
  airMesh.visible = false
  scene.add(airMesh)

  // FLOOR CONFETTI
  const FLOOR_COUNT = 500
  const floorMesh = new THREE.InstancedMesh(geo, mat, FLOOR_COUNT)
  for (let i = 0; i < FLOOR_COUNT; i++) {
    dummy.position.set((Math.random() - 0.5) * 12, 0.01 + Math.random() * 0.02, (Math.random() - 0.5) * 12)
    dummy.rotation.set(Math.PI/2, 0, Math.random() * Math.PI)
    dummy.updateMatrix()
    floorMesh.setMatrixAt(i, dummy.matrix)
    floorMesh.setColorAt(i, new THREE.Color(colors[Math.floor(Math.random() * colors.length)]))
  }
  floorMesh.instanceColor.needsUpdate = true
  floorMesh.visible = false
  scene.add(floorMesh)

  let active = false

  return {
    activate() {
      active = true
      airMesh.visible = true
      floorMesh.visible = true
    },
    update() {
      if (!active) return
      for (let i = 0; i < AIR_COUNT; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.rx += p.vrx
        p.ry += p.vry
        if (p.y < -0.5) {
          p.y = 8 + Math.random() * 4
          p.x = (Math.random() - 0.5) * 16
        }
        dummy.position.set(p.x, p.y, p.z)
        dummy.rotation.set(p.rx, p.ry, p.rz)
        dummy.updateMatrix()
        airMesh.setMatrixAt(i, dummy.matrix)
      }
      airMesh.instanceMatrix.needsUpdate = true
    }
  }
}

// ── Phase 2: Bokeh Sparkles & Stars ──────────────────────────────────────────
export function createBokehParticles(scene) {
  const COUNT = 200
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(COUNT * 3)
  const phases = new Float32Array(COUNT)

  for (let i = 0; i < COUNT; i++) {
    pos[i * 3 + 0] = (Math.random() - 0.5) * 16
    pos[i * 3 + 1] = 0.5 + Math.random() * 9
    pos[i * 3 + 2] = (Math.random() - 0.5) * 16
    phases[i] = Math.random() * Math.PI * 2
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1))

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0xffd580) }, // softer warm bokeh
    },
    vertexShader: `
      attribute float phase;
      varying float vPhase;
      uniform float time;
      void main() {
        vPhase = phase;
        vec3 pos = position;
        pos.y += sin(time * 0.2 + phase) * 0.5;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (12.0 + sin(time + phase) * 4.0) * (10.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying float vPhase;
      uniform float time;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        // Soft circular alpha
        float alpha = (0.5 - dist) * 1.5;
        float pulse = 0.5 + 0.5 * sin(time * 1.5 + vPhase);
        gl_FragColor = vec4(color, alpha * pulse * 0.6);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
  const points = new THREE.Points(geo, mat)
  points.frustumCulled = false
  scene.add(points)

  // Floating Hearts / Stars (a few larger sprites)
  const shapesGroup = new THREE.Group()
  const canvas = document.createElement('canvas')
  canvas.width = 64; canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ff6688'
  ctx.font = '40px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('❤', 32, 32) // heart
  const heartTex = new THREE.CanvasTexture(canvas)
  
  const hMat = new THREE.SpriteMaterial({ map: heartTex, transparent: true, opacity: 0 })
  for(let i=0; i<15; i++) {
    const s = new THREE.Sprite(hMat)
    s.position.set((Math.random() - 0.5) * 14, 2 + Math.random() * 6, (Math.random() - 0.5) * 14)
    s.scale.setScalar(0.3 + Math.random() * 0.3)
    s.userData = { speedY: 0.01 + Math.random() * 0.01, phase: Math.random() * 10 }
    shapesGroup.add(s)
  }
  scene.add(shapesGroup)

  let active = false

  function activate() {
    active = true
    gsap.to(mat, { opacity: 1, duration: 2.5 }) // fade in bokeh
    gsap.to(hMat, { opacity: 0.75, duration: 2.5 }) // fade in hearts
  }

  function update(time) {
    if (!active) return
    mat.uniforms.time.value = time
    
    // Float hearts up
    shapesGroup.children.forEach(s => {
      s.position.y += s.userData.speedY
      s.position.x += Math.sin(time + s.userData.phase) * 0.005
      if (s.position.y > 10) s.position.y = 0
    })
  }

  return { activate, update }
}
