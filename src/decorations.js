/**
 * decorations.js — Rich decorative props placed in two outer rings around the cake.
 * 
 * Clear radius: 2.7m from center (0,0,0) — nothing placed inside this zone.
 * Inner ring: 3.5–5.0m from center
 * Outer ring: 5.0–7.0m from center
 * 
 * All props are hidden initially (y = -5), then rise into view on reveal().
 */
import * as THREE from 'three'
import gsap from 'gsap'

// ── Shared materials ──────────────────────────────────────────────────────────
const matWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 })
const matGold = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.3, metalness: 0.6 })
const matSilver = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.2, metalness: 0.8 })
const matRed = new THREE.MeshStandardMaterial({ color: 0xff4444, roughness: 0.7 })
const matBlue = new THREE.MeshStandardMaterial({ color: 0x4488ff, roughness: 0.7 })
const matGreen = new THREE.MeshStandardMaterial({ color: 0x44cc44, roughness: 0.7 })
const matYellow = new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.7 })
const matOrange = new THREE.MeshStandardMaterial({ color: 0xff8844, roughness: 0.7 })
const matPink = new THREE.MeshStandardMaterial({ color: 0xff88aa, roughness: 0.7 })
const matPurple = new THREE.MeshStandardMaterial({ color: 0xaa66ff, roughness: 0.7 })
const matTeal = new THREE.MeshStandardMaterial({ color: 0x44ddcc, roughness: 0.7 })
const matBrown = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 })
const matCream = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })
const matBeige = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, roughness: 0.9 })
const matDarkBrown = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.7 })
const matLightPink = new THREE.MeshStandardMaterial({ color: 0xffd1dc, roughness: 0.7 })
const matChocolate = new THREE.MeshStandardMaterial({ color: 0x6B3A2A, roughness: 0.8 })
const matLavender = new THREE.MeshStandardMaterial({ color: 0xccaaee, roughness: 0.7 })
const matMint = new THREE.MeshStandardMaterial({ color: 0x88ddbb, roughness: 0.7 })
const matCoral = new THREE.MeshStandardMaterial({ color: 0xff7f7f, roughness: 0.7 })
const matSky = new THREE.MeshStandardMaterial({ color: 0x88ccff, roughness: 0.7 })
const matWarmYellow = new THREE.MeshStandardMaterial({ color: 0xffdd66, roughness: 0.3, emissive: 0xffdd66, emissiveIntensity: 0.4 })

// Array of colors for random selection
const COLORS = [matRed, matBlue, matGreen, matYellow, matOrange, matPink, matPurple, matTeal, matCoral, matSky, matLavender, matMint]

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

// ── Helper: wrap a group as a hidden prop ────────────────────────────────────
function createProp(group, targetY) {
  group.position.y = -5
  group.userData = { targetY: targetY || 0 }
  return group
}

// =============================================================================
// PROP BUILDERS
// =============================================================================

// ── 1. Gift Box (single, with ribbon) ───────────────────────────────────────
function createGiftBox(size, colorMat) {
  const g = new THREE.Group()
  const box = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), colorMat)
  box.castShadow = true
  g.add(box)

  // Ribbon: vertical cross
  const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.2 })
  const r1 = new THREE.Mesh(new THREE.BoxGeometry(size + 0.02, size + 0.02, size * 0.15), ribbonMat)
  const r2 = new THREE.Mesh(new THREE.BoxGeometry(size * 0.15, size + 0.02, size + 0.02), ribbonMat)
  g.add(r1, r2)

  // Bow on top
  const bowMat = new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.4, metalness: 0.3 })
  const bow1 = new THREE.Mesh(new THREE.BoxGeometry(size * 0.3, size * 0.08, size * 0.08), bowMat)
  bow1.position.set(size * 0.15, size * 0.55, 0)
  bow1.rotation.z = 0.3
  const bow2 = new THREE.Mesh(new THREE.BoxGeometry(size * 0.3, size * 0.08, size * 0.08), bowMat)
  bow2.position.set(-size * 0.15, size * 0.55, 0)
  bow2.rotation.z = -0.3
  g.add(bow1, bow2)

  return g
}

// ── 2. Stacked Gift Boxes (2-3 boxes) ───────────────────────────────────────
function createGiftStack(count, baseSize) {
  const g = new THREE.Group()
  let yOff = 0
  for (let i = 0; i < count; i++) {
    const s = baseSize * (1 - i * 0.15)
    const box = createGiftBox(s, randomColor())
    box.position.y = yOff + s / 2
    box.rotation.y = Math.random() * Math.PI
    g.add(box)
    yOff += s
  }
  return g
}

// ── 3. Cupcake ──────────────────────────────────────────────────────────────
function createCupcake() {
  const g = new THREE.Group()
  // Base (cake)
  const cakeMat = new THREE.MeshStandardMaterial({ color: 0xdaa520, roughness: 0.8 })
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.2, 12), cakeMat)
  base.position.y = 0.1
  base.castShadow = true
  g.add(base)

  // Frosting
  const frostingMat = randomColor()
  const frosting = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), frostingMat)
  frosting.position.y = 0.28
  frosting.scale.set(1.1, 0.6, 1.1)
  g.add(frosting)

  // Cherry on top
  const cherryMat = new THREE.MeshStandardMaterial({ color: 0xff2244, roughness: 0.4 })
  const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), cherryMat)
  cherry.position.y = 0.38
  g.add(cherry)

  // Wrapper ridge
  const wrapperMat = new THREE.MeshStandardMaterial({ color: 0xffddaa, roughness: 0.9 })
  const wrapper = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.12, 12, 1, true), wrapperMat)
  wrapper.position.y = 0.02
  g.add(wrapper)

  return g
}

// ── 4. Donut ────────────────────────────────────────────────────────────────
function createDonut() {
  const g = new THREE.Group()
  const donutMat = new THREE.MeshStandardMaterial({ color: 0xdaa520, roughness: 0.7 })
  const donut = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.06, 10, 20), donutMat)
  donut.rotation.x = Math.PI / 2
  donut.castShadow = true
  g.add(donut)

  // Icing on top half
  const icingMat = randomColor()
  const icing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 8, 20), icingMat)
  icing.rotation.x = Math.PI / 2
  icing.position.y = 0.03
  g.add(icing)

  // Sprinkles (small colored dots)
  const sprinkleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const sprinkle = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.04), sprinkleMat)
    sprinkle.position.set(Math.cos(angle) * 0.1, 0.06, Math.sin(angle) * 0.1)
    sprinkle.rotation.y = angle
    g.add(sprinkle)
  }

  return g
}

// ── 5. Donut Stand ──────────────────────────────────────────────────────────
function createDonutStand() {
  const g = new THREE.Group()
  // Plate
  const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.3 })
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.04, 16), plateMat)
  plate.position.y = 0.02
  g.add(plate)

  // Stack 3 donuts
  for (let i = 0; i < 3; i++) {
    const d = createDonut()
    d.position.y = 0.06 + i * 0.14
    d.rotation.z = (Math.random() - 0.5) * 0.3
    d.rotation.y = Math.random() * Math.PI * 2
    g.add(d)
  }
  return g
}

// ── 6. Flower in Pot ────────────────────────────────────────────────────────
function createFlowerPot() {
  const g = new THREE.Group()
  // Pot
  const potMat = new THREE.MeshStandardMaterial({ color: 0xcc6633, roughness: 0.9 })
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.2, 10), potMat)
  pot.position.y = 0.1
  pot.castShadow = true
  g.add(pot)

  // Soil
  const soilMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 1.0 })
  const soil = new THREE.Mesh(new THREE.CircleGeometry(0.13, 10), soilMat)
  soil.rotation.x = -Math.PI / 2
  soil.position.y = 0.2
  g.add(soil)

  // Stem
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.9 })
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.3, 6), stemMat)
  stem.position.y = 0.35
  g.add(stem)

  // Leaves
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x32CD32, roughness: 0.8 })
  const leaf1 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), leafMat)
  leaf1.position.set(0.04, 0.25, 0)
  leaf1.scale.set(1.5, 0.3, 0.8)
  g.add(leaf1)
  const leaf2 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), leafMat)
  leaf2.position.set(-0.04, 0.3, 0)
  leaf2.scale.set(1.5, 0.3, 0.8)
  g.add(leaf2)

  // Flower head (multi-petal)
  const flowerColor = randomColor()
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), flowerColor)
    petal.position.set(Math.cos(angle) * 0.06, 0.5, Math.sin(angle) * 0.06)
    petal.scale.set(1.2, 0.5, 1.2)
    g.add(petal)
  }
  // Center
  const centerMat = new THREE.MeshStandardMaterial({ color: 0xffff00, roughness: 0.6 })
  const center = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), centerMat)
  center.position.y = 0.5
  g.add(center)

  return g
}

// ── 7. Pinwheel ─────────────────────────────────────────────────────────────
function createPinwheel() {
  const g = new THREE.Group()
  // Stick
  const stickMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.9 })
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.5, 6), stickMat)
  stick.position.y = 0.25
  g.add(stick)

  // Pinwheel head (4 colored triangles)
  const pinwheelMat = randomColor()
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0.08, 0.08)
  shape.lineTo(0, 0.15)
  shape.closePath()
  const geo = new THREE.ShapeGeometry(shape)

  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(geo, COLORS[(i + Math.floor(Math.random() * 8)) % COLORS.length])
    blade.position.y = 0.5
    blade.rotation.y = (i / 4) * Math.PI * 2
    g.add(blade)
  }

  // Center button
  const btn = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), matGold)
  btn.position.y = 0.5
  g.add(btn)

  return g
}

// ── 8. Toy Blocks (stack of 2-3) ────────────────────────────────────────────
function createToyBlocks() {
  const g = new THREE.Group()
  const count = 2 + Math.floor(Math.random() * 2)
  let yOff = 0
  for (let i = 0; i < count; i++) {
    const size = 0.12 + Math.random() * 0.06
    const block = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), randomColor())
    block.position.y = yOff + size / 2
    block.rotation.y = Math.random() * 0.3
    block.castShadow = true
    g.add(block)
    yOff += size
  }
  return g
}

// ── 9. Birthday Hat ─────────────────────────────────────────────────────────
function createBirthdayHat() {
  const g = new THREE.Group()
  // Cone
  const hatColor = randomColor()
  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 10), hatColor)
  hat.position.y = 0.125
  hat.castShadow = true
  g.add(hat)

  // Pom-pom on top
  const pomMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })
  const pom = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), pomMat)
  pom.position.y = 0.27
  g.add(pom)

  // Stripe decoration
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.1 })
  const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.01, 6, 12), stripeMat)
  stripe.position.y = 0.08
  stripe.rotation.x = Math.PI / 2
  g.add(stripe)

  return g
}

// ── 10. Party Popper ────────────────────────────────────────────────────────
function createPartyPopper() {
  const g = new THREE.Group()
  // Body (cylinder)
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff6644, roughness: 0.7 })
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.25, 10), bodyMat)
  body.position.y = 0.125
  body.castShadow = true
  g.add(body)

  // Handle
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x886644, roughness: 0.9 })
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.1, 6), handleMat)
  handle.position.y = -0.05
  g.add(handle)

  // Top cone (noise maker part)
  const topMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.6 })
  const top = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.08, 8), topMat)
  top.position.y = 0.27
  g.add(top)

  // Fringe (colored strips)
  const fringeMat = new THREE.MeshStandardMaterial({ color: 0xff88aa, roughness: 0.5 })
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.06, 0.005), fringeMat)
    strip.position.set(Math.cos(angle) * 0.04, 0.32, Math.sin(angle) * 0.04)
    strip.rotation.z = Math.cos(angle) * 0.5
    strip.rotation.x = Math.sin(angle) * 0.5
    g.add(strip)
  }

  return g
}

// ── 11. Plush Rabbit ────────────────────────────────────────────────────────
function createPlushRabbit() {
  const g = new THREE.Group()
  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), matCream)
  body.scale.set(1.1, 0.9, 0.9)
  body.position.y = 0.2
  body.castShadow = true
  g.add(body)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), matCream)
  head.position.set(0, 0.48, 0.05)
  g.add(head)

  // Ears (long, floppy)
  const earMat = new THREE.MeshStandardMaterial({ color: 0xfff0e6, roughness: 0.85 })
  const earGeo = new THREE.CapsuleGeometry(0.035, 0.15, 6, 8)
  const earL = new THREE.Mesh(earGeo, earMat)
  earL.position.set(-0.1, 0.62, 0.02)
  earL.rotation.z = 0.2
  earL.rotation.x = -0.2
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, earMat)
  earR.position.set(0.1, 0.62, 0.02)
  earR.rotation.z = -0.2
  earR.rotation.x = -0.2
  g.add(earR)

  // Inner ears (pink)
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7 })
  const innerEarGeo = new THREE.CapsuleGeometry(0.018, 0.1, 6, 6)
  const innerL = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerL.position.set(-0.1, 0.62, 0.06)
  innerL.rotation.z = 0.2
  innerL.rotation.x = -0.2
  g.add(innerL)
  const innerR = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerR.position.set(0.1, 0.62, 0.06)
  innerR.rotation.z = -0.2
  innerR.rotation.x = -0.2
  g.add(innerR)

  // Eyes
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.025, 8, 8)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.07, 0.5, 0.16)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.07, 0.5, 0.16)
  g.add(eyeR)

  // Nose (pink)
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), matLightPink)
  nose.position.set(0, 0.46, 0.2)
  g.add(nose)

  // Tail (fluffy ball)
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), matWhite)
  tail.position.set(0, 0.15, -0.22)
  g.add(tail)

  return g
}

// ── 12. Plush Penguin ───────────────────────────────────────────────────────
function createPlushPenguin() {
  const g = new THREE.Group()
  // Body (black, round)
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.8 })
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), bodyMat)
  body.scale.set(1.0, 1.1, 0.9)
  body.position.y = 0.2
  body.castShadow = true
  g.add(body)

  // Belly (white)
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), matWhite)
  belly.scale.set(0.8, 0.9, 0.6)
  belly.position.set(0, 0.2, 0.15)
  g.add(belly)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), bodyMat)
  head.position.set(0, 0.42, 0.05)
  g.add(head)

  // Face mask (white)
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), matWhite)
  face.scale.set(0.9, 0.7, 0.6)
  face.position.set(0, 0.4, 0.14)
  g.add(face)

  // Eyes
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.02, 8, 8)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.05, 0.44, 0.18)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.05, 0.44, 0.18)
  g.add(eyeR)

  // Beak (orange)
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xff8800, roughness: 0.6 })
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.05, 6), beakMat)
  beak.position.set(0, 0.4, 0.2)
  beak.rotation.x = 0.3
  g.add(beak)

  // Feet (orange)
  const footMat = new THREE.MeshStandardMaterial({ color: 0xff8800, roughness: 0.7 })
  const footGeo = new THREE.SphereGeometry(0.04, 8, 8)
  const footL = new THREE.Mesh(footGeo, footMat)
  footL.scale.set(1.2, 0.5, 0.8)
  footL.position.set(-0.08, 0.04, 0.08)
  g.add(footL)
  const footR = new THREE.Mesh(footGeo, footMat)
  footR.scale.set(1.2, 0.5, 0.8)
  footR.position.set(0.08, 0.04, 0.08)
  g.add(footR)

  // Flippers (wings)
  const flipperMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.8 })
  const flipperGeo = new THREE.CapsuleGeometry(0.025, 0.1, 6, 6)
  const flipperL = new THREE.Mesh(flipperGeo, flipperMat)
  flipperL.position.set(-0.18, 0.2, 0)
  flipperL.rotation.z = 0.4
  flipperL.rotation.x = -0.3
  g.add(flipperL)
  const flipperR = new THREE.Mesh(flipperGeo, flipperMat)
  flipperR.position.set(0.18, 0.2, 0)
  flipperR.rotation.z = -0.4
  flipperR.rotation.x = -0.3
  g.add(flipperR)

  // Tiny bow tie
  const bowMat = new THREE.MeshStandardMaterial({ color: 0xff4488, roughness: 0.4 })
  const bow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.03), bowMat)
  bow.position.set(0, 0.3, 0.15)
  g.add(bow)

  return g
}

// ── 13. Mini Cake / Dessert Stand ───────────────────────────────────────────
function createMiniCakeStand() {
  const g = new THREE.Group()
  // Stand base
  const standMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.4 })
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.3, 10), standMat)
  base.position.y = 0.15
  g.add(base)

  // Plate
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.25, 0.03, 16), standMat)
  plate.position.y = 0.32
  g.add(plate)

  // Mini cake on top
  const cakeMat = new THREE.MeshStandardMaterial({ color: 0xffeedd, roughness: 0.7 })
  const cake = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.1, 12), cakeMat)
  cake.position.y = 0.4
  g.add(cake)

  // Frosting layer
  const frostingMat = new THREE.MeshStandardMaterial({ color: 0xff88bb, roughness: 0.5 })
  const frosting = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.03, 12), frostingMat)
  frosting.position.y = 0.45
  g.add(frosting)

  // Candle on top
  const candleMat = new THREE.MeshStandardMaterial({ color: 0xffaadd, roughness: 0.6 })
  const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.012, 0.06, 6), candleMat)
  candle.position.y = 0.49
  g.add(candle)

  // Flame (small)
  const flameMat = new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xff8800, emissiveIntensity: 2 })
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 6), flameMat)
  flame.position.y = 0.53
  flame.scale.set(0.8, 1.5, 0.8)
  g.add(flame)

  return g
}

// ── 14. Glowing Star (on a short pole) ──────────────────────────────────────
function createGlowingStar() {
  const g = new THREE.Group()
  // Pole
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5, metalness: 0.6 })
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.3, 6), poleMat)
  pole.position.y = 0.15
  g.add(pole)

  // Star (octahedron)
  const starMat = new THREE.MeshStandardMaterial({
    color: 0xffdd44,
    emissive: 0xffaa00,
    emissiveIntensity: 1.5,
    roughness: 0.3,
    metalness: 0.5,
  })
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.06), starMat)
  star.position.y = 0.32
  star.rotation.y = Math.random() * Math.PI
  g.add(star)

  // Glow halo
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xffdd44,
    emissive: 0xff8800,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.3,
  })
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), glowMat)
  glow.position.y = 0.32
  g.add(glow)

  return g
}

// ── 15. Decorative Lantern ──────────────────────────────────────────────────
function createDecorativeLantern() {
  const g = new THREE.Group()
  // Frame (wireframe sphere)
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xcc8844,
    roughness: 0.3,
    metalness: 0.7,
    wireframe: true,
  })
  const frame = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), frameMat)
  frame.position.y = 0.15
  g.add(frame)

  // Inner glow
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xffaa44,
    emissive: 0xff6600,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.6,
  })
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), glowMat)
  glow.position.y = 0.15
  g.add(glow)

  // Top hook
  const hookMat = new THREE.MeshStandardMaterial({ color: 0xcc8844, roughness: 0.3, metalness: 0.7 })
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.02, 0.005, 6, 8), hookMat)
  hook.position.y = 0.22
  g.add(hook)

  // Bottom tassel
  const tasselMat = new THREE.MeshStandardMaterial({ color: 0xff6644, roughness: 0.7 })
  const tassel = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.03, 6), tasselMat)
  tassel.position.y = 0.06
  g.add(tassel)

  return g
}

// ── 16. Fairy Lantern (small glowing orb on ground) ─────────────────────────
function createFairyLantern() {
  const g = new THREE.Group()
  const color = [0xff4488, 0x44ff88, 0x4488ff, 0xff8844, 0xaa44ff][Math.floor(Math.random() * 5)]
  const orbMat = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 1.5,
    transparent: true,
    opacity: 0.8,
  })
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), orbMat)
  orb.position.y = 0.05
  g.add(orb)

  // Tiny glow halo
  const haloMat = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.2,
  })
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), haloMat)
  halo.position.y = 0.05
  g.add(halo)

  return g
}

// ── 17. Celebration Flag (on stick) ─────────────────────────────────────────
function createCelebrationFlag() {
  const g = new THREE.Group()
  // Stick
  const stickMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.9 })
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.008, 0.4, 6), stickMat)
  stick.position.y = 0.2
  g.add(stick)

  // Flag (triangle)
  const flagMat = randomColor()
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0.12, 0)
  shape.lineTo(0, -0.08)
  shape.closePath()
  const flagGeo = new THREE.ShapeGeometry(shape)
  const flag = new THREE.Mesh(flagGeo, flagMat)
  flag.position.set(0, 0.38, 0)
  flag.rotation.y = -Math.PI / 2
  g.add(flag)

  return g
}

// ── 18. Dessert Plate (mini cake + cupcake) ─────────────────────────────────
function createDessertPlate() {
  const g = new THREE.Group()
  // Plate
  const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.2 })
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.03, 16), plateMat)
  plate.position.y = 0.015
  g.add(plate)

  // Mini cake slice (wedge)
  const cakeMat = new THREE.MeshStandardMaterial({ color: 0xffeedd, roughness: 0.7 })
  const wedgeShape = new THREE.Shape()
  wedgeShape.moveTo(0, 0)
  wedgeShape.lineTo(0.08, 0.04)
  wedgeShape.lineTo(0.08, -0.04)
  wedgeShape.closePath()
  const wedgeGeo = new THREE.ShapeGeometry(wedgeShape)
  const wedge = new THREE.Mesh(wedgeGeo, cakeMat)
  wedge.position.set(0.05, 0.04, 0)
  wedge.rotation.x = -Math.PI / 2
  g.add(wedge)

  // Cupcake on the same plate
  const cupcake = createCupcake()
  cupcake.position.set(-0.08, 0.04, 0.05)
  cupcake.scale.setScalar(0.8)
  g.add(cupcake)

  return g
}

// =============================================================================
// LAYOUT CONFIGURATION
// =============================================================================
// All positions are (x, z) — distance from center checked to be > 2.7m
// Each entry: [type, x, z, rotationY, scaleFactor]

const LAYOUT = [
  // ── Inner ring (3.5–5.0m from center) ──────────────────────────────
  // Gift boxes (various sizes)
  ['giftBox', 3.5, -3.5, 0.3, 0.8],
  ['giftBox', -3.8, -3.0, -0.5, 1.0],
  ['giftBox', 4.0, 2.5, 1.2, 0.7],
  ['giftBox', -4.2, 2.8, 0.8, 0.9],
  ['giftBox', 3.2, -4.0, -0.2, 1.1],
  ['giftBox', -3.5, 3.5, 0.5, 0.6],

  // Cupcakes
  ['cupcake', 4.0, -1.5, 0.0, 1.0],
  ['cupcake', -4.0, -1.8, 0.5, 0.9],
  ['cupcake', 1.8, 4.0, 1.0, 1.1],
  ['cupcake', -2.0, -4.0, -0.3, 0.8],

  // Donuts
  ['donut', 4.2, -1.0, 0.0, 1.0],
  ['donut', -3.5, 2.0, 0.7, 0.9],
  ['donut', 3.5, 3.0, -0.4, 1.1],

  // Flowers in pots
  ['flowerPot', 4.5, 0.5, 0.0, 1.0],
  ['flowerPot', -4.5, -0.5, 0.6, 0.9],
  ['flowerPot', 2.5, -4.2, -0.8, 1.1],
  ['flowerPot', -2.8, 4.0, 0.3, 0.8],

  // Pinwheels
  ['pinwheel', 3.0, -4.5, 0.0, 1.0],
  ['pinwheel', -4.5, 1.0, 0.5, 0.9],
  ['pinwheel', 4.5, 1.8, -0.3, 1.1],

  // Toy blocks
  ['toyBlocks', 4.0, -2.8, 0.0, 1.0],
  ['toyBlocks', -3.0, 4.2, 0.8, 0.9],
  ['toyBlocks', -4.0, 2.0, -0.5, 1.1],

  // Birthday hats
  ['birthdayHat', 3.5, 4.0, 0.0, 1.0],
  ['birthdayHat', -4.0, -2.5, 0.4, 0.9],
  ['birthdayHat', 2.0, -4.5, -0.6, 1.1],

  // Party poppers
  ['partyPopper', 4.5, -3.0, 0.0, 1.0],
  ['partyPopper', -4.5, 3.0, 0.5, 0.9],

  // ── Outer ring (5.0–7.0m from center) ───────────────────────────────
  // Plush animals
  ['plushRabbit', -5.5, -1.5, 0.8, 1.0],
  ['plushPenguin', 5.5, 1.5, -0.5, 1.0],
  ['plushRabbit', -5.0, 4.5, 0.3, 0.9],

  // Present stacks (2-3 gift boxes stacked)
  ['giftStack', 5.5, -3.0, 0.0, 1.0],
  ['giftStack', -5.5, 3.0, 0.7, 0.9],
  ['giftStack', 5.0, -5.0, -0.4, 1.1],

  // Mini cake stands
  ['miniCakeStand', 5.5, 0, 0.0, 1.0],
  ['miniCakeStand', -5.5, 0, 0.5, 0.9],

  // Dessert plates
  ['dessertPlate', 5.0, 3.5, 0.0, 1.0],
  ['dessertPlate', -5.0, -3.5, 0.6, 0.9],

  // Glowing stars
  ['glowingStar', 6.0, -1.0, 0.0, 1.0],
  ['glowingStar', -6.0, 1.0, 0.5, 0.9],
  ['glowingStar', 5.5, 4.0, -0.3, 1.1],
  ['glowingStar', -5.5, -4.0, 0.2, 0.8],

  // Decorative lanterns
  ['decorativeLantern', 5.5, 3.0, 0.0, 1.0],
  ['decorativeLantern', -5.5, -3.0, 0.5, 0.9],
  ['decorativeLantern', 6.5, 0, -0.2, 1.1],

  // Fairy lanterns (small glowing orbs)
  ['fairyLantern', 5.5, 5.0, 0.0, 1.0],
  ['fairyLantern', -5.5, -5.0, 0.3, 0.9],
  ['fairyLantern', 6.5, -3.0, -0.5, 1.1],

  // Celebration flags
  ['celebrationFlag', -6.0, -2.0, 0.0, 1.0],
  ['celebrationFlag', 6.0, 2.0, 0.6, 0.9],
  ['celebrationFlag', -5.5, -4.5, -0.3, 1.1],
  ['celebrationFlag', 5.5, 4.5, 0.4, 0.8],
]

// =============================================================================
// PROP FACTORY
// =============================================================================
function buildProp(type, scaleFactor) {
  switch (type) {
    case 'giftBox': {
      const size = 0.3 + Math.random() * 0.2
      const g = createGiftBox(size, randomColor())
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'giftStack': {
      const count = 2 + Math.floor(Math.random() * 2)
      const g = createGiftStack(count, 0.3)
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'cupcake': {
      const g = createCupcake()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'donut': {
      const g = createDonut()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'flowerPot': {
      const g = createFlowerPot()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'pinwheel': {
      const g = createPinwheel()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'toyBlocks': {
      const g = createToyBlocks()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'birthdayHat': {
      const g = createBirthdayHat()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'partyPopper': {
      const g = createPartyPopper()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushRabbit': {
      const g = createPlushRabbit()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushPenguin': {
      const g = createPlushPenguin()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'miniCakeStand': {
      const g = createMiniCakeStand()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'glowingStar': {
      const g = createGlowingStar()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'decorativeLantern': {
      const g = createDecorativeLantern()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'fairyLantern': {
      const g = createFairyLantern()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'celebrationFlag': {
      const g = createCelebrationFlag()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'dessertPlate': {
      const g = createDessertPlate()
      g.scale.setScalar(scaleFactor)
      return g
    }
    default:
      return new THREE.Group()
  }
}

// =============================================================================
// MAIN EXPORT
// =============================================================================
export function setupDecorations(scene) {
  const allProps = []

  LAYOUT.forEach(([type, x, z, rotY, scaleFactor]) => {
    const group = buildProp(type, scaleFactor)
    if (!group) return

    // Position
    group.position.set(x, -5, z)
    group.rotation.y = rotY + (Math.random() - 0.5) * 0.2

    // Store target Y (slightly above ground with tiny random variation)
    const targetY = 0.005 + Math.random() * 0.01
    group.userData = { targetY, type }

    // Enable shadows
    group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    scene.add(group)
    allProps.push(group)
  })

  function reveal() {
    allProps.forEach((prop, i) => {
      gsap.to(prop.position, {
        y: prop.userData.targetY,
        duration: 1.0 + Math.random() * 0.6,
        delay: 0.2 + i * 0.025,
        ease: 'back.out(1.5)',
      })
    })
  }

  function update(time) {
    // Animate fairy lanterns (gentle bobbing + glow pulse)
    allProps.forEach((prop) => {
      if (prop.userData.type === 'fairyLantern') {
        prop.position.y = prop.userData.targetY + Math.sin(time * 0.8 + prop.position.x * 2) * 0.015
      }
      if (prop.userData.type === 'decorativeLantern') {
        prop.position.y = prop.userData.targetY + Math.sin(time * 0.5 + prop.position.z * 2) * 0.01
      }
      if (prop.userData.type === 'glowingStar') {
        prop.position.y = prop.userData.targetY + Math.sin(time * 0.6 + prop.position.x) * 0.008
      }
    })
  }

  return { reveal, update }
}