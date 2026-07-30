/**
 * environment.js — Lights, floor, balloons, decorative string lights
 */
import * as THREE from 'three'
import gsap from 'gsap'

export function setupEnvironment(scene) {
  // ═══════════════════════════════════════════════════════
  // LIGHTS
  // ═══════════════════════════════════════════════════════

  // Phase-1: dark reddish ambient
  const ambientLight = new THREE.AmbientLight(0x220000, 0.6)
  scene.add(ambientLight)

  // Hemisphere — dark for phase 1, warm for phase 2
  const hemiLight = new THREE.HemisphereLight(0x1a0000, 0x000000, 0.4)
  scene.add(hemiLight)

  // Main directional (shadows) — warm soft white
  const dirLight = new THREE.DirectionalLight(0xfff0e0, 0)
  dirLight.position.set(4, 10, 6)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.set(2048, 2048)
  dirLight.shadow.camera.near = 0.5
  dirLight.shadow.camera.far = 30
  dirLight.shadow.camera.left = -8
  dirLight.shadow.camera.right = 8
  dirLight.shadow.camera.top = 8
  dirLight.shadow.camera.bottom = -8
  dirLight.shadow.bias = -0.001
  scene.add(dirLight)

  // Rim light — adds cinematic separation behind the cake
  const rimLight = new THREE.DirectionalLight(0x5588ff, 0)
  rimLight.position.set(-6, 4, -6)
  scene.add(rimLight)

  // Candle flame point light (Phase 2)
  const candleLight = new THREE.PointLight(0xff9933, 0, 4)
  scene.add(candleLight)

  // Colourful party fill lights (Phase 2) - Warm cinematic colors (amber, orange, soft pink, warm gold)
  const PARTY_COLORS = [0xffaa00, 0xff8844, 0xff7788, 0xffcc44, 0xff9955]
  const partyLights = PARTY_COLORS.map((color, i) => {
    const angle = (i / PARTY_COLORS.length) * Math.PI * 2
    const pl = new THREE.PointLight(color, 0, 9)
    pl.position.set(Math.cos(angle) * 6, 2.5, Math.sin(angle) * 6)
    scene.add(pl)
    return pl
  })

  // ═══════════════════════════════════════════════════════
  // FLOOR
  // ═══════════════════════════════════════════════════════
  const floorGeo = new THREE.CircleGeometry(14, 72)
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.9,
    metalness: 0.05,
  })
  const floor = new THREE.Mesh(floorGeo, floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  // ═══════════════════════════════════════════════════════
  // DECORATIONS (Phase 2, hidden initially)
  // ═══════════════════════════════════════════════════════
  const decorations = buildDecorations(scene, PARTY_COLORS)

  // ═══════════════════════════════════════════════════════
  // CANDLE POSITION SETTER
  // ═══════════════════════════════════════════════════════
  function setCandlePosition(pos) {
    candleLight.position.set(pos.x, pos.y + 0.08, pos.z)
  }

  // ═══════════════════════════════════════════════════════
  // PHASE-2 TRANSITION
  // ═══════════════════════════════════════════════════════
  function transitionToPhase2() {
    const dur = 2.5

    // Scene background → warm very dark purple
    gsap.to(scene.background, { r: 0.02, g: 0.01, b: 0.04, duration: dur })
    gsap.to(scene.fog, { density: 0.018, duration: dur })

    // Floor warms up
    gsap.to(floorMat.color, { r: 0.07, g: 0.04, b: 0.1, duration: dur })

    // Ambient → warm white
    gsap.to(ambientLight, { intensity: 0.9, duration: dur })
    gsap.to(ambientLight.color, { r: 1, g: 0.95, b: 0.85, duration: dur })

    // Hemi → warm sky / dark ground
    gsap.to(hemiLight, { intensity: 1.2, duration: dur })
    gsap.to(hemiLight.color, { r: 1, g: 0.85, b: 0.6, duration: dur })
    gsap.to(hemiLight.groundColor, { r: 0.08, g: 0.04, b: 0.1, duration: dur })

    // Directional + rim on (reduced intensity to prevent overexposure)
    gsap.to(dirLight, { intensity: 1.6, duration: dur })
    gsap.to(rimLight, { intensity: 0.9, duration: dur })

    // Candle light on
    gsap.to(candleLight, { intensity: 2.8, duration: 1.2 })

    // Party lights stagger on (softer fill)
    partyLights.forEach((pl, i) => {
      gsap.to(pl, { intensity: 1.2, duration: 1.5, delay: 0.3 + i * 0.15 })
    })

    // Reveal all decorations
    decorations.reveal()
  }

  // ═══════════════════════════════════════════════════════
  // PER-FRAME UPDATES
  // ═══════════════════════════════════════════════════════
  function updateCandleFlicker(time) {
    candleLight.intensity =
      2.8 + Math.sin(time * 9.7) * 0.4 + Math.sin(time * 17.3) * 0.2
  }

  function updateBalloons(time) {
    decorations.update(time)
  }

  return {
    ambientLight, hemiLight, dirLight, rimLight,
    candleLight, partyLights, floor,
    setCandlePosition,
    transitionToPhase2,
    updateCandleFlicker,
    updateBalloons,
  }
}

// ── Decorations builder ────────────────────────────────────────────────────────
function buildDecorations(scene, PARTY_COLORS) {
  const balloons = []
  const gifts = []
  const feminineItems = []
  
  const balloonGeo = new THREE.SphereGeometry(1, 32, 32)
  const knotGeo = new THREE.CylinderGeometry(0.1, 0.2, 0.3, 8)
  
  // 1. Balloon clusters around edges (moved closer)
  const clusterCenters = [
    { x: -4.5, z: -3 }, { x: 4.5, z: -2.5 },
    { x: -5, z: 1.5 }, { x: 5, z: 2 },
  ]
  
  clusterCenters.forEach((center) => {
    const numBalloons = 3 + Math.floor(Math.random() * 3)
    for (let i = 0; i < numBalloons; i++) {
      const color = PARTY_COLORS[Math.floor(Math.random() * PARTY_COLORS.length)]
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.1 })
      const bGroup = new THREE.Group()
      
      const mesh = new THREE.Mesh(balloonGeo, mat)
      mesh.scale.set(0.6, 0.75, 0.6) // elongated shape
      bGroup.add(mesh)
      
      const knot = new THREE.Mesh(knotGeo, mat)
      knot.position.y = -0.8
      bGroup.add(knot)

      const stringMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
      const stringGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -0.8, 0),
        new THREE.Vector3(0, -4, 0)
      ])
      bGroup.add(new THREE.Line(stringGeo, stringMat))

      const bx = center.x + (Math.random() - 0.5) * 1.5
      const bz = center.z + (Math.random() - 0.5) * 1.5
      const by = 2.0 + Math.random() * 2.5

      bGroup.position.set(bx, by - 6, bz) // Hidden
      bGroup.userData = { targetY: by, phaseOffset: Math.random() * Math.PI * 2, speed: 0.8 + Math.random() * 0.5 }
      scene.add(bGroup)
      balloons.push(bGroup)
    }
  })

  // 2. Gift Boxes (outer ring, away from cake)
  const boxCenters = [
    { x: -3.5, z: -2.5 }, { x: -4.5, z: 0.5 },
    { x: 3.5, z: -2.0 }, { x: 4.5, z: 1.0 },
    { x: -2.0, z: -3.0 }, { x: 2.5, z: -2.8 }
  ]
  boxCenters.forEach(pos => {
    const size = 0.5 + Math.random() * 0.6
    const boxGeo = new THREE.BoxGeometry(size, size, size)
    const color = PARTY_COLORS[Math.floor(Math.random() * PARTY_COLORS.length)]
    const boxMat = new THREE.MeshStandardMaterial({ color, roughness: 0.8 })
    const box = new THREE.Mesh(boxGeo, boxMat)
    
    // Ribbon
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
    const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(size + 0.02, size + 0.02, size * 0.2), ribbonMat)
    const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(size * 0.2, size + 0.02, size + 0.02), ribbonMat)
    box.add(ribbonV, ribbonH)
    
    box.position.set(pos.x, size/2 - 5, pos.z) // Hidden
    box.userData = { targetY: size/2 }
    box.rotation.y = Math.random() * Math.PI
    scene.add(box)
    gifts.push(box)
  })

  // 3. Fairy Lights
  const fairyLightsGroup = new THREE.Group()
  fairyLightsGroup.position.y = 8 // Hidden high up
  fairyLightsGroup.visible = false
  scene.add(fairyLightsGroup)

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, 5.5, -5),
    new THREE.Vector3(-5, 4.0, -6),
    new THREE.Vector3(0, 5.0, -7),
    new THREE.Vector3(5, 4.0, -6),
    new THREE.Vector3(10, 5.5, -5)
  ])
  const stringMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
  fairyLightsGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.015, 8, false), stringMat))

  const bulbGeo = new THREE.SphereGeometry(0.08, 8, 8)
  for (let i=0; i<=30; i++) {
    const pt = curve.getPoint(i / 30)
    const bColor = PARTY_COLORS[Math.floor(Math.random() * PARTY_COLORS.length)]
    const bulb = new THREE.Mesh(bulbGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: bColor, emissiveIntensity: 1.5 }))
    bulb.position.copy(pt)
    fairyLightsGroup.add(bulb)
  }

  // 4. Party Flags (Bunting)
  const flagsGroup = new THREE.Group()
  flagsGroup.position.y = 8 // Hidden high up
  flagsGroup.visible = false
  scene.add(flagsGroup)

  const flagCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-8, 6.5, -3),
    new THREE.Vector3(0, 5.5, -4),
    new THREE.Vector3(8, 6.5, -3)
  ])
  flagsGroup.add(new THREE.Mesh(new THREE.TubeGeometry(flagCurve, 64, 0.01, 8, false), stringMat))

  const flagShape = new THREE.Shape()
  flagShape.moveTo(-0.25, 0).lineTo(0.25, 0).lineTo(0, -0.6).lineTo(-0.25, 0)
  const flagGeo = new THREE.ShapeGeometry(flagShape)
  
  for (let i=1; i<16; i++) {
    const pt = flagCurve.getPoint(i / 16)
    const tangent = flagCurve.getTangent(i / 16)
    const fColor = PARTY_COLORS[Math.floor(Math.random() * PARTY_COLORS.length)]
    const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: fColor, roughness: 0.9, side: THREE.DoubleSide }))
    flag.position.copy(pt)
    flag.lookAt(pt.clone().add(tangent))
    flag.rotateY(Math.PI / 2)
    flagsGroup.add(flag)
  }

  // 5. Teddy Bear (only decoration item beside cake)
  const beigeMat = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, roughness: 0.9 })
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xffdfa0, roughness: 0.2, metalness: 0.8 })

  // Teddy Bear (left side, outside clear radius around cake)
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85, metalness: 0.0 })
  const darkBrownMat = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.7 })
  const pinkMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.6 })
  function createTeddyBear(x, z, rotY) {
    const group = new THREE.Group()
    
    // Body (sitting pose - wider, shorter)
    const bodyGeo = new THREE.SphereGeometry(0.5, 20, 20)
    const body = new THREE.Mesh(bodyGeo, creamMat)
    body.scale.set(1.1, 0.9, 0.9)
    body.position.y = 0.35
    
    // Tummy patch
    const tummyGeo = new THREE.SphereGeometry(0.3, 16, 16)
    const tummy = new THREE.Mesh(tummyGeo, beigeMat)
    tummy.scale.set(1.0, 0.7, 0.6)
    tummy.position.set(0, 0.3, 0.35)
    group.add(tummy)
    
    // Head (slightly larger)
    const headGeo = new THREE.SphereGeometry(0.4, 20, 20)
    const head = new THREE.Mesh(headGeo, creamMat)
    head.position.set(0, 0.95, 0.05)
    
    // Ears (round, cute)
    const earGeo = new THREE.SphereGeometry(0.15, 16, 16)
    const earL = new THREE.Mesh(earGeo, creamMat)
    earL.position.set(-0.3, 1.2, 0.05)
    const earR = new THREE.Mesh(earGeo, creamMat)
    earR.position.set(0.3, 1.2, 0.05)
    // Inner ears
    const innerEarGeo = new THREE.SphereGeometry(0.08, 12, 12)
    const innerEarL = new THREE.Mesh(innerEarGeo, pinkMat)
    innerEarL.position.set(-0.3, 1.18, 0.12)
    const innerEarR = new THREE.Mesh(innerEarGeo, pinkMat)
    innerEarR.position.set(0.3, 1.18, 0.12)
    
    // Snout (cute, slightly protruding)
    const snoutGeo = new THREE.SphereGeometry(0.18, 16, 16)
    const snout = new THREE.Mesh(snoutGeo, beigeMat)
    snout.position.set(0, 0.88, 0.35)
    snout.scale.set(1.1, 0.8, 0.9)
    
    // Nose (small dark triangle)
    const noseGeo = new THREE.SphereGeometry(0.05, 8, 8)
    const nose = new THREE.Mesh(noseGeo, darkBrownMat)
    nose.position.set(0, 0.92, 0.45)
    nose.scale.set(1, 0.8, 0.8)
    
    // Eyes (dark, shiny)
    const eyeGeo = new THREE.SphereGeometry(0.05, 8, 8)
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
    eyeL.position.set(-0.15, 0.98, 0.32)
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
    eyeR.position.set(0.15, 0.98, 0.32)
    // Eye shine
    const shineGeo = new THREE.SphereGeometry(0.015, 6, 6)
    const shineMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const shineL = new THREE.Mesh(shineGeo, shineMat)
    shineL.position.set(-0.12, 1.0, 0.36)
    const shineR = new THREE.Mesh(shineGeo, shineMat)
    shineR.position.set(0.18, 1.0, 0.36)
    
    // Arms (sitting pose - resting on lap)
    const armGeo = new THREE.CapsuleGeometry(0.13, 0.25, 12, 12)
    const armL = new THREE.Mesh(armGeo, creamMat)
    armL.position.set(-0.45, 0.5, 0.2)
    armL.rotation.z = 0.3
    armL.rotation.x = 0.8
    const armR = new THREE.Mesh(armGeo, creamMat)
    armR.position.set(0.45, 0.5, 0.2)
    armR.rotation.z = -0.3
    armR.rotation.x = 0.8
    
    // Legs (sitting pose - extended forward)
    const legGeo = new THREE.CapsuleGeometry(0.15, 0.2, 12, 12)
    const legL = new THREE.Mesh(legGeo, creamMat)
    legL.position.set(-0.3, 0.15, 0.45)
    legL.rotation.x = -0.5
    legL.rotation.z = 0.2
    const legR = new THREE.Mesh(legGeo, creamMat)
    legR.position.set(0.3, 0.15, 0.45)
    legR.rotation.x = -0.5
    legR.rotation.z = -0.2
    // Paw pads
    const padGeo = new THREE.SphereGeometry(0.05, 8, 8)
    const padMat = new THREE.MeshStandardMaterial({ color: 0xffd1dc, roughness: 0.7 })
    const padL = new THREE.Mesh(padGeo, padMat)
    padL.position.set(-0.3, 0.08, 0.6)
    padL.scale.set(1, 0.5, 0.8)
    const padR = new THREE.Mesh(padGeo, padMat)
    padR.position.set(0.3, 0.08, 0.6)
    padR.scale.set(1, 0.5, 0.8)
    
    // Small ribbon bow tie
    const bowGeo = new THREE.BoxGeometry(0.2, 0.06, 0.06)
    const bowMat = new THREE.MeshStandardMaterial({ color: 0xff6b8a, roughness: 0.4 })
    const bow = new THREE.Mesh(bowGeo, bowMat)
    bow.position.set(0, 0.65, 0.35)
    const bowL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.04), bowMat)
    bowL.position.set(-0.12, 0.65, 0.35)
    bowL.rotation.z = 0.3
    const bowR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.04), bowMat)
    bowR.position.set(0.12, 0.65, 0.35)
    bowR.rotation.z = -0.3
    
    group.add(body, head, earL, earR, innerEarL, innerEarR)
    group.add(snout, nose, eyeL, eyeR, shineL, shineR)
    group.add(armL, armR, legL, legR, padL, padR)
    group.add(bow, bowL, bowR)
    
    const targetY = 0
    group.position.set(x, targetY - 5, z)
    group.rotation.y = rotY
    group.userData = { targetY }
    scene.add(group)
    feminineItems.push(group)
  }
  // Left side, outside clear radius around cake
  createTeddyBear(-3.0, 1.5, 0.6)

  return {
    reveal() {
      gifts.forEach((box, i) => gsap.to(box.position, { y: box.userData.targetY, duration: 1.2, delay: 0.4 + i * 0.1, ease: 'back.out(1.5)' }))
      feminineItems.forEach((item, i) => gsap.to(item.position, { y: item.userData.targetY, duration: 1.2, delay: 0.5 + i * 0.08, ease: 'back.out(1.5)' }))
      balloons.forEach((b, i) => gsap.to(b.position, { y: b.userData.targetY, duration: 1.5, delay: 0.6 + i * 0.05, ease: 'back.out(1.2)' }))
      fairyLightsGroup.visible = true
      flagsGroup.visible = true
      gsap.to(fairyLightsGroup.position, { y: 0, duration: 2.0, ease: 'power2.out', delay: 0.3 })
      gsap.to(flagsGroup.position, { y: 0, duration: 2.0, ease: 'power2.out', delay: 0.5 })
    },
    update(time) {
      balloons.forEach(b => b.position.y = b.userData.targetY + Math.sin(time * b.userData.speed + b.userData.phaseOffset) * 0.3)
    }
  }
}