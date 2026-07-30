/**
 * effects.js — Flash, energy wave, Happy Birthday text, candle flame, vignette
 */
import * as THREE from 'three'
import gsap from 'gsap'

// ── White Flash ───────────────────────────────────────────────────────────────
export function createFlash(scene) {
  const geo = new THREE.PlaneGeometry(200, 200)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.renderOrder = 999
  mesh.frustumCulled = false
  scene.add(mesh)

  /**
   * Positions the flash plane in front of the camera and plays a pop.
   * @param {THREE.Camera} camera
   */
  function trigger(camera) {
    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)
    mesh.position.copy(camera.position).addScaledVector(dir, 0.6)
    mesh.quaternion.copy(camera.quaternion)

    return gsap.timeline()
      .to(mat, { opacity: 1, duration: 0.12, ease: 'power4.out' })
      .to(mat, { opacity: 0, duration: 1.6, ease: 'power3.out' })
  }

  return { mesh, mat, trigger }
}

// ── Expanding Energy Wave Ring ────────────────────────────────────────────────
export function createEnergyWave(scene) {
  const geo = new THREE.TorusGeometry(0.5, 0.06, 10, 80)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xfff8cc,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = Math.PI / 2  // lie flat on the XZ plane
  scene.add(mesh)

  function trigger(position) {
    mesh.position.copy(position)
    mesh.scale.setScalar(0.01)
    mat.opacity = 1

    return gsap.timeline()
      .to(mesh.scale, { x: 25, y: 25, z: 25, duration: 1.8, ease: 'power2.out' })
      .to(mat, { opacity: 0, duration: 1.8, ease: 'power2.in' }, '<')
  }

  return { mesh, mat, trigger }
}

// ── Happy Birthday Canvas Text ────────────────────────────────────────────────
/**
 * Renders "HAPPY BIRTHDAY" to a canvas and places it as a floating plane.
 * The text always faces the camera (billboard) via update().
 */
export function createHappyBirthdayText(scene) {
  const canvas = document.createElement('canvas')
  // Make canvas wide enough and tall enough for 2 lines
  canvas.width = 1600
  canvas.height = 600
  const ctx = canvas.getContext('2d')

  // Draw texts
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  const text1 = 'HAPPY BIRTHDAY'
  const text2 = 'Thanh Tuyền'
  const cx = canvas.width / 2
  const cy1 = canvas.height * 0.38
  const cy2 = canvas.height * 0.75

  // ── Line 1: HAPPY BIRTHDAY ─────────────────────────────────────────
  ctx.font = 'bold 130px "Outfit", Arial, sans-serif'
  ctx.fillStyle = '#ffffff'
  
  // Base glow
  ctx.shadowColor = 'rgba(255, 150, 80, 0.6)'
  ctx.shadowBlur = 20
  ctx.fillText(text1, cx, cy1)
  
  // Outer glow
  ctx.shadowColor = 'rgba(255, 100, 50, 0.5)'
  ctx.shadowBlur = 50
  ctx.fillText(text1, cx, cy1)

  // ── Line 2: Thanh Tuyền ─────────────────────────────────────────────
  // ~92% size of line 1 (130px) — increased ~22%
  ctx.font = '700 120px "Dancing Script", cursive'
  ctx.fillStyle = '#ff4d6d' // vivid pinkish-red
  
  // Base glow (softer)
  ctx.shadowColor = 'rgba(255, 77, 109, 0.5)'
  ctx.shadowBlur = 12
  ctx.fillText(text2, cx, cy2)
  
  // Outer glow (softer)
  ctx.shadowColor = 'rgba(255, 77, 109, 0.3)'
  ctx.shadowBlur = 25
  ctx.fillText(text2, cx, cy2)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace

  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false
  })

  const sprite = new THREE.Sprite(mat)
  // Base scale (reduced)
  const baseScaleX = 7.5
  const baseScaleY = baseScaleX * (canvas.height / canvas.width)
  sprite.scale.set(baseScaleX, baseScaleY, 1)

  // Position lower, closer to the cake
  const baseY = 4.2
  sprite.position.set(0, baseY, -1.0)
  sprite.visible = false
  scene.add(sprite)

  let active = false

  return {
    sprite,
    mat,
    show(duration = 2) {
      sprite.visible = true
      gsap.to(mat, { opacity: 1, duration, ease: 'power2.inOut' })
    },
    hide(duration = 1) {
      gsap.to(mat, {
        opacity: 0,
        duration,
        onComplete: () => {
          sprite.visible = false
        },
      })
    },
    update(time, camera) {
      if (!active && sprite.visible) active = true
      if (!active) return

      // Gentle floating animation
      sprite.position.y = baseY + Math.sin(time * 1.5) * 0.15

      // Always face camera
      if (camera) {
         sprite.lookAt(camera.position)
         
         // Responsive scaling: ensure text fits within screen width
         const dist = camera.position.distanceTo(sprite.position)
         const vFov = (camera.fov * Math.PI) / 180
         const visibleHeight = 2 * Math.tan(vFov / 2) * dist
         const visibleWidth = visibleHeight * camera.aspect

         // If the base width of the sprite is larger than 85% of the screen width, scale it down
         const maxWidth = visibleWidth * 0.85
         let scale = 1.0
         if (baseScaleX > maxWidth) {
           scale = maxWidth / baseScaleX
         }
         sprite.scale.set(baseScaleX * scale, baseScaleY * scale, 1)
      }
    },
  }
}

// ── Candle Flame Sprite ───────────────────────────────────────────────────────
export function createCandleFlame(scene, position) {
  // Draw flame to canvas
  const CW = 80, CH = 160
  const canvas = document.createElement('canvas')
  canvas.width = CW
  canvas.height = CH
  const ctx = canvas.getContext('2d')

  function draw(flicker) {
    ctx.clearRect(0, 0, CW, CH)
    // Outer glow
    const g1 = ctx.createRadialGradient(CW / 2, CH * 0.65, 4, CW / 2, CH * 0.55, CW * 0.55)
    g1.addColorStop(0, 'rgba(255,255,180,1)')
    g1.addColorStop(0.25, `rgba(255,${160 + flicker * 20 | 0},40,0.85)`)
    g1.addColorStop(0.65, 'rgba(255,80,10,0.3)')
    g1.addColorStop(1, 'rgba(200,30,0,0)')
    ctx.fillStyle = g1
    ctx.beginPath()
    ctx.ellipse(CW / 2, CH * 0.6, CW * 0.38, CH * 0.42, 0, 0, Math.PI * 2)
    ctx.fill()
    // Inner bright core
    const g2 = ctx.createRadialGradient(CW / 2, CH * 0.68, 1, CW / 2, CH * 0.65, CW * 0.2)
    g2.addColorStop(0, 'rgba(255,255,255,1)')
    g2.addColorStop(0.5, 'rgba(255,240,140,0.8)')
    g2.addColorStop(1, 'rgba(255,180,60,0)')
    ctx.fillStyle = g2
    ctx.beginPath()
    ctx.ellipse(CW / 2, CH * 0.68, CW * 0.18, CW * 0.24, 0, 0, Math.PI * 2)
    ctx.fill()
  }
  draw(0)

  const texture = new THREE.CanvasTexture(canvas)
  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(0.22, 0.44, 1)
  sprite.position.copy(position)
  sprite.position.y += 0.06
  scene.add(sprite)

  function show() {
    return gsap.to(mat, { opacity: 1, duration: 0.6, ease: 'power2.out' })
  }

  function update(time) {
    const flicker = Math.sin(time * 14.3) * 0.5 + 0.5
    sprite.scale.x = 0.22 + Math.sin(time * 11.7) * 0.018
    sprite.scale.y = 0.44 + Math.sin(time * 8.1) * 0.025
    // Redraw with flicker (every ~4 frames is enough)
    if (Math.floor(time * 60) % 4 === 0) {
      draw(flicker)
      texture.needsUpdate = true
    }
  }

  return { sprite, mat, show, update }
}

// ── CSS Vignette overlay ──────────────────────────────────────────────────────
export function createVignette(container) {
  const div = document.createElement('div')
  div.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 8;
    background: radial-gradient(ellipse at center,
      transparent 45%,
      rgba(0,0,0,0.55) 100%
    );
  `
  container.appendChild(div)
  return div
}
