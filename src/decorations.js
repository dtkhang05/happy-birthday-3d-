/**
 * decorations.js — Rich decorative props placed in two full concentric rings
 * around the cake.
 * 
 * Clear radius: 2.7m from center (0,0,0) — nothing placed inside this zone.
 * Inner ring (4.35m): teddy bears + gift boxes, alternating randomly.
 * Outer ring (6.9m): varied decorative items (flags, lanterns, party poppers,
 * plush toys, desserts...) with balloons mixed in from environment.js.
 * 
 * A ±35° wedge in front of the camera (+Z) is kept clear on both rings.
 * All props are hidden initially (y = -5), then rise into view on reveal().
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { createTeddyBear } from './environment.js'

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
  const h = size * 1.25

  // Box body (taller, not flat/thin)
  const box = new THREE.Mesh(new THREE.BoxGeometry(size, h, size), colorMat)
  box.position.y = h / 2
  box.castShadow = true
  g.add(box)

  // Lid (slightly larger thin slab on top)
  const lid = new THREE.Mesh(new THREE.BoxGeometry(size * 1.06, h * 0.14, size * 1.06), colorMat)
  lid.position.y = h + h * 0.07
  g.add(lid)

  // Ribbon: vertical cross wrapping body + lid
  const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.2 })
  const rb = h * 0.16
  const r1 = new THREE.Mesh(new THREE.BoxGeometry(size * 1.05, h * 1.14, rb), ribbonMat)
  r1.position.y = h * 0.5 + h * 0.07
  const r2 = new THREE.Mesh(new THREE.BoxGeometry(rb, h * 1.14, size * 1.05), ribbonMat)
  r2.position.y = h * 0.5 + h * 0.07
  g.add(r1, r2)

  // Bow on top of lid
  const bowMat = new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.4, metalness: 0.3 })
  const bowC = new THREE.Mesh(new THREE.SphereGeometry(size * 0.1, 8, 8), bowMat)
  bowC.position.y = h * 1.22
  g.add(bowC)
  const bow1 = new THREE.Mesh(new THREE.BoxGeometry(size * 0.32, size * 0.07, size * 0.07), bowMat)
  bow1.position.set(size * 0.16, h * 1.18, 0)
  bow1.rotation.z = 0.35
  const bow2 = new THREE.Mesh(new THREE.BoxGeometry(size * 0.32, size * 0.07, size * 0.07), bowMat)
  bow2.position.set(-size * 0.16, h * 1.18, 0)
  bow2.rotation.z = -0.35
  g.add(bow1, bow2)

  return g
}

// ── 2. Stacked Gift Pile (2-3 tiers, like a small pile) ─────────────────────
function createGiftStack(count, baseSize) {
  const g = new THREE.Group()
  const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.2 })
  const bowMat = new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.4, metalness: 0.3 })
  let yOff = 0
  for (let i = 0; i < count; i++) {
    const s = baseSize * (1 - i * 0.14)
    const tier = new THREE.Group()

    const box = new THREE.Mesh(new THREE.BoxGeometry(s, s * 1.15, s), randomColor())
    box.position.y = s * 0.575
    box.castShadow = true
    tier.add(box)

    // Ribbon cross wrapped around this tier
    const r1 = new THREE.Mesh(new THREE.BoxGeometry(s + 0.02, s * 1.17, s * 0.16), ribbonMat)
    r1.position.y = s * 0.575
    const r2 = new THREE.Mesh(new THREE.BoxGeometry(s * 0.16, s * 1.17, s + 0.02), ribbonMat)
    r2.position.y = s * 0.575
    tier.add(r1, r2)

    // Tiny bow on each tier
    const bow = new THREE.Mesh(new THREE.BoxGeometry(s * 0.22, s * 0.06, s * 0.06), bowMat)
    bow.position.y = s * 1.15
    tier.add(bow)

    tier.position.y = yOff
    tier.position.x = (Math.random() - 0.5) * s * 0.2
    tier.position.z = (Math.random() - 0.5) * s * 0.2
    tier.rotation.y = (Math.random() - 0.5) * 0.5
    g.add(tier)
    yOff += s * 1.15
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

// ── 11. Plush Rabbit (detailed) ─────────────────────────────────────────────
function createPlushRabbit() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })
  const pinkMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7 })

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.25, 14, 14), furMat)
  body.scale.set(1.1, 0.9, 0.9)
  body.position.y = 0.2
  body.castShadow = true
  g.add(body)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), furMat)
  head.position.set(0, 0.48, 0.05)
  g.add(head)

  // Ears (long, floppy) — with pink inner
  const earGeo = new THREE.CapsuleGeometry(0.035, 0.18, 6, 8)
  const earL = new THREE.Mesh(earGeo, furMat)
  earL.position.set(-0.1, 0.64, 0.02)
  earL.rotation.z = 0.15
  earL.rotation.x = -0.15
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, furMat)
  earR.position.set(0.1, 0.64, 0.02)
  earR.rotation.z = -0.15
  earR.rotation.x = -0.15
  g.add(earR)

  const innerEarGeo = new THREE.CapsuleGeometry(0.018, 0.12, 6, 6)
  const innerL = new THREE.Mesh(innerEarGeo, pinkMat)
  innerL.position.set(-0.1, 0.64, 0.06)
  innerL.rotation.z = 0.15
  innerL.rotation.x = -0.15
  g.add(innerL)
  const innerR = new THREE.Mesh(innerEarGeo, pinkMat)
  innerR.position.set(0.1, 0.64, 0.06)
  innerR.rotation.z = -0.15
  innerR.rotation.x = -0.15
  g.add(innerR)

  // Eyes (with white highlight)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.028, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.07, 0.5, 0.16)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.07, 0.5, 0.16)
  g.add(eyeR)
  // Eye highlights
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const hlGeo = new THREE.SphereGeometry(0.01, 6, 6)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.06, 0.51, 0.18)
  g.add(hlL)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.08, 0.51, 0.18)
  g.add(hlR)

  // Nose (pink Y-shape)
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), pinkMat)
  nose.position.set(0, 0.46, 0.2)
  nose.scale.set(1.2, 0.8, 0.8)
  g.add(nose)

  // Mouth (small line)
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 })
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 6), mouthMat)
  mouth.position.set(0, 0.43, 0.19)
  mouth.scale.set(0.5, 1.5, 0.5)
  g.add(mouth)

  // Whiskers
  const whiskerMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5 })
  for (let i = 0; i < 3; i++) {
    const wL = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.06, 4), whiskerMat)
    wL.position.set(-0.07, 0.45, 0.17 + i * 0.01)
    wL.rotation.z = 0.4
    g.add(wL)
    const wR = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.06, 4), whiskerMat)
    wR.position.set(0.07, 0.45, 0.17 + i * 0.01)
    wR.rotation.z = -0.4
    g.add(wR)
  }

  // Arms (short, at sides)
  const armGeo = new THREE.CapsuleGeometry(0.04, 0.08, 4, 6)
  const armL = new THREE.Mesh(armGeo, furMat)
  armL.position.set(-0.22, 0.22, 0.02)
  armL.rotation.z = 0.5
  g.add(armL)
  const armR = new THREE.Mesh(armGeo, furMat)
  armR.position.set(0.22, 0.22, 0.02)
  armR.rotation.z = -0.5
  g.add(armR)

  // Paws (pink pads)
  const pawGeo = new THREE.SphereGeometry(0.035, 8, 8)
  const pawL = new THREE.Mesh(pawGeo, pinkMat)
  pawL.position.set(-0.26, 0.16, 0.04)
  pawL.scale.set(0.8, 0.6, 0.8)
  g.add(pawL)
  const pawR = new THREE.Mesh(pawGeo, pinkMat)
  pawR.position.set(0.26, 0.16, 0.04)
  pawR.scale.set(0.8, 0.6, 0.8)
  g.add(pawR)

  // Legs (sitting position)
  const legGeo = new THREE.CapsuleGeometry(0.05, 0.06, 4, 6)
  const legL = new THREE.Mesh(legGeo, furMat)
  legL.position.set(-0.12, 0.06, 0.08)
  legL.scale.set(1.0, 0.8, 1.2)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, furMat)
  legR.position.set(0.12, 0.06, 0.08)
  legR.scale.set(1.0, 0.8, 1.2)
  g.add(legR)

  // Foot pads (pink)
  const footPadGeo = new THREE.SphereGeometry(0.03, 8, 8)
  const footPadL = new THREE.Mesh(footPadGeo, pinkMat)
  footPadL.position.set(-0.12, 0.03, 0.14)
  footPadL.scale.set(0.9, 0.4, 1.2)
  g.add(footPadL)
  const footPadR = new THREE.Mesh(footPadGeo, pinkMat)
  footPadR.position.set(0.12, 0.03, 0.14)
  footPadR.scale.set(0.9, 0.4, 1.2)
  g.add(footPadR)

  // Tail (fluffy ball)
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 10), matWhite)
  tail.position.set(0, 0.18, -0.22)
  g.add(tail)

  // Bow tie (blue)
  const bowMat = new THREE.MeshStandardMaterial({ color: 0x4488ff, roughness: 0.4 })
  const bowL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.025, 0.015), bowMat)
  bowL.position.set(-0.025, 0.36, 0.16)
  bowL.rotation.z = 0.3
  g.add(bowL)
  const bowR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.025, 0.015), bowMat)
  bowR.position.set(0.025, 0.36, 0.16)
  bowR.rotation.z = -0.3
  g.add(bowR)
  const bowC = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 6), bowMat)
  bowC.position.set(0, 0.36, 0.17)
  g.add(bowC)

  return g
}

// ── 12. Plush Penguin (detailed) ────────────────────────────────────────────
function createPlushPenguin() {
  const g = new THREE.Group()
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.8 })
  const orangeMat = new THREE.MeshStandardMaterial({ color: 0xff8800, roughness: 0.6 })

  // Body (black, round)
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 14), blackMat)
  body.scale.set(1.0, 1.1, 0.9)
  body.position.y = 0.2
  body.castShadow = true
  g.add(body)

  // Belly (white oval)
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), matWhite)
  belly.scale.set(0.8, 0.95, 0.55)
  belly.position.set(0, 0.2, 0.15)
  g.add(belly)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 14), blackMat)
  head.position.set(0, 0.43, 0.05)
  g.add(head)

  // Face mask (white)
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), matWhite)
  face.scale.set(0.9, 0.75, 0.55)
  face.position.set(0, 0.41, 0.14)
  g.add(face)

  // Eyes (with highlights)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.022, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.05, 0.45, 0.18)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.05, 0.45, 0.18)
  g.add(eyeR)
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const hlGeo = new THREE.SphereGeometry(0.008, 6, 6)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.04, 0.46, 0.2)
  g.add(hlL)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.06, 0.46, 0.2)
  g.add(hlR)

  // Beak (orange, two-part)
  const beakUpper = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.04, 6), orangeMat)
  beakUpper.position.set(0, 0.4, 0.22)
  beakUpper.rotation.x = Math.PI / 2
  g.add(beakUpper)
  const beakLower = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.03, 6), orangeMat)
  beakLower.position.set(0, 0.38, 0.22)
  beakLower.rotation.x = Math.PI / 2
  g.add(beakLower)

  // Cheek blush (pink)
  const blushMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7, transparent: true, opacity: 0.5 })
  const blushGeo = new THREE.SphereGeometry(0.025, 8, 8)
  const blushL = new THREE.Mesh(blushGeo, blushMat)
  blushL.position.set(-0.08, 0.4, 0.16)
  blushL.scale.set(1.0, 0.6, 0.3)
  g.add(blushL)
  const blushR = new THREE.Mesh(blushGeo, blushMat)
  blushR.position.set(0.08, 0.4, 0.16)
  blushR.scale.set(1.0, 0.6, 0.3)
  g.add(blushR)

  // Feet (orange, webbed)
  const footGeo = new THREE.SphereGeometry(0.045, 10, 10)
  const footL = new THREE.Mesh(footGeo, orangeMat)
  footL.scale.set(1.3, 0.4, 0.9)
  footL.position.set(-0.08, 0.03, 0.1)
  g.add(footL)
  const footR = new THREE.Mesh(footGeo, orangeMat)
  footR.scale.set(1.3, 0.4, 0.9)
  footR.position.set(0.08, 0.03, 0.1)
  g.add(footR)

  // Flippers (wings, tapered)
  const flipperGeo = new THREE.CapsuleGeometry(0.03, 0.12, 6, 8)
  const flipperL = new THREE.Mesh(flipperGeo, blackMat)
  flipperL.position.set(-0.2, 0.22, 0)
  flipperL.rotation.z = 0.4
  flipperL.rotation.x = -0.3
  flipperL.scale.set(0.8, 1.0, 0.6)
  g.add(flipperL)
  const flipperR = new THREE.Mesh(flipperGeo, blackMat)
  flipperR.position.set(0.2, 0.22, 0)
  flipperR.rotation.z = -0.4
  flipperR.rotation.x = -0.3
  flipperR.scale.set(0.8, 1.0, 0.6)
  g.add(flipperR)

  // Bow tie (red)
  const bowMat = new THREE.MeshStandardMaterial({ color: 0xff4488, roughness: 0.4 })
  const bowL = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.025, 0.015), bowMat)
  bowL.position.set(-0.022, 0.32, 0.16)
  bowL.rotation.z = 0.3
  g.add(bowL)
  const bowR = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.025, 0.015), bowMat)
  bowR.position.set(0.022, 0.32, 0.16)
  bowR.rotation.z = -0.3
  g.add(bowR)
  const bowC = new THREE.Mesh(new THREE.SphereGeometry(0.011, 6, 6), bowMat)
  bowC.position.set(0, 0.32, 0.17)
  g.add(bowC)

  // Santa hat (red, festive)
  const hatMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.7 })
  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.12, 8), hatMat)
  hat.position.set(0, 0.58, 0.05)
  hat.rotation.z = 0.15
  g.add(hat)
  // Hat brim (white)
  const brimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })
  const brim = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.015, 6, 12), brimMat)
  brim.position.set(0, 0.53, 0.05)
  brim.rotation.x = Math.PI / 2
  g.add(brim)
  // Hat pom-pom
  const pom = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), brimMat)
  pom.position.set(0.02, 0.64, 0.08)
  g.add(pom)

  return g
}

// ── 13. Plush Bear (detailed) ───────────────────────────────────────────────
function createPlushBear() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 })
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })
  const snoutMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14), furMat)
  body.scale.set(1.0, 1.0, 0.9)
  body.position.y = 0.22
  body.castShadow = true
  g.add(body)

  // Belly patch
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), bellyMat)
  belly.scale.set(0.8, 0.9, 0.5)
  belly.position.set(0, 0.22, 0.12)
  g.add(belly)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), furMat)
  head.position.set(0, 0.52, 0.05)
  g.add(head)

  // Snout (lighter)
  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), snoutMat)
  snout.scale.set(1.0, 0.7, 0.6)
  snout.position.set(0, 0.5, 0.18)
  g.add(snout)

  // Ears (round, with inner)
  const earGeo = new THREE.SphereGeometry(0.06, 10, 10)
  const earL = new THREE.Mesh(earGeo, furMat)
  earL.position.set(-0.14, 0.66, 0.02)
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, furMat)
  earR.position.set(0.14, 0.66, 0.02)
  g.add(earR)
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7 })
  const innerEarGeo = new THREE.SphereGeometry(0.035, 8, 8)
  const innerL = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerL.position.set(-0.14, 0.66, 0.06)
  g.add(innerL)
  const innerR = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerR.position.set(0.14, 0.66, 0.06)
  g.add(innerR)

  // Eyes (with highlights)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.03, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.08, 0.56, 0.18)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.08, 0.56, 0.18)
  g.add(eyeR)
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const hlGeo = new THREE.SphereGeometry(0.01, 6, 6)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.07, 0.57, 0.2)
  g.add(hlL)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.09, 0.57, 0.2)
  g.add(hlR)

  // Nose (dark brown)
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.4 })
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), noseMat)
  nose.position.set(0, 0.52, 0.24)
  nose.scale.set(1.3, 0.9, 0.8)
  g.add(nose)

  // Mouth (smile)
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.5 })
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), mouthMat)
  mouth.position.set(0, 0.46, 0.22)
  mouth.scale.set(1.8, 0.5, 0.5)
  g.add(mouth)

  // Arms (short, at sides)
  const armGeo = new THREE.CapsuleGeometry(0.045, 0.1, 4, 6)
  const armL = new THREE.Mesh(armGeo, furMat)
  armL.position.set(-0.25, 0.24, 0.02)
  armL.rotation.z = 0.5
  g.add(armL)
  const armR = new THREE.Mesh(armGeo, furMat)
  armR.position.set(0.25, 0.24, 0.02)
  armR.rotation.z = -0.5
  g.add(armR)

  // Paws (with pads)
  const pawGeo = new THREE.SphereGeometry(0.04, 8, 8)
  const pawL = new THREE.Mesh(pawGeo, furMat)
  pawL.position.set(-0.3, 0.16, 0.04)
  pawL.scale.set(0.9, 0.7, 0.9)
  g.add(pawL)
  const pawR = new THREE.Mesh(pawGeo, furMat)
  pawR.position.set(0.3, 0.16, 0.04)
  pawR.scale.set(0.9, 0.7, 0.9)
  g.add(pawR)

  // Legs
  const legGeo = new THREE.CapsuleGeometry(0.055, 0.08, 4, 6)
  const legL = new THREE.Mesh(legGeo, furMat)
  legL.position.set(-0.13, 0.07, 0.08)
  legL.scale.set(1.0, 0.8, 1.2)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, furMat)
  legR.position.set(0.13, 0.07, 0.08)
  legR.scale.set(1.0, 0.8, 1.2)
  g.add(legR)

  // Foot pads
  const footPadMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.6 })
  const footPadGeo = new THREE.SphereGeometry(0.035, 8, 8)
  const footPadL = new THREE.Mesh(footPadGeo, footPadMat)
  footPadL.position.set(-0.13, 0.03, 0.14)
  footPadL.scale.set(0.9, 0.4, 1.2)
  g.add(footPadL)
  const footPadR = new THREE.Mesh(footPadGeo, footPadMat)
  footPadR.position.set(0.13, 0.03, 0.14)
  footPadR.scale.set(0.9, 0.4, 1.2)
  g.add(footPadR)

  // Scarf (red, around neck)
  const scarfMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.7 })
  const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.04, 6, 12), scarfMat)
  scarf.position.set(0, 0.38, 0.05)
  scarf.rotation.x = Math.PI / 2
  scarf.scale.set(1.0, 1.0, 0.7)
  g.add(scarf)
  // Scarf tail
  const scarfTail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.02), scarfMat)
  scarfTail.position.set(0.1, 0.3, 0.12)
  scarfTail.rotation.z = 0.2
  g.add(scarfTail)

  return g
}

// ── 14. Plush Cat (detailed) ────────────────────────────────────────────────
function createPlushCat() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0xff8c00, roughness: 0.9 })
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xcc6600, roughness: 0.9 })

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 14), furMat)
  body.scale.set(0.9, 1.0, 0.85)
  body.position.y = 0.2
  body.castShadow = true
  g.add(body)

  // Belly
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), bellyMat)
  belly.scale.set(0.7, 0.8, 0.5)
  belly.position.set(0, 0.2, 0.1)
  g.add(belly)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), furMat)
  head.position.set(0, 0.48, 0.05)
  g.add(head)

  // Ears (triangular, with pink inner)
  const earGeo = new THREE.ConeGeometry(0.05, 0.12, 4)
  const earL = new THREE.Mesh(earGeo, furMat)
  earL.position.set(-0.1, 0.63, 0.02)
  earL.rotation.z = 0.2
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, furMat)
  earR.position.set(0.1, 0.63, 0.02)
  earR.rotation.z = -0.2
  g.add(earR)
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7 })
  const innerEarGeo = new THREE.ConeGeometry(0.03, 0.08, 4)
  const innerL = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerL.position.set(-0.1, 0.63, 0.05)
  innerL.rotation.z = 0.2
  g.add(innerL)
  const innerR = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerR.position.set(0.1, 0.63, 0.05)
  innerR.rotation.z = -0.2
  g.add(innerR)

  // Eyes (green, with highlights + pupils)
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0x88dd88, roughness: 0.2 })
  const eyeGeo = new THREE.SphereGeometry(0.028, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeWhiteMat)
  eyeL.position.set(-0.07, 0.5, 0.16)
  eyeL.scale.set(1.0, 1.2, 0.6)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeWhiteMat)
  eyeR.position.set(0.07, 0.5, 0.16)
  eyeR.scale.set(1.0, 1.2, 0.6)
  g.add(eyeR)
  // Pupils (vertical slit)
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2 })
  const pupilGeo = new THREE.SphereGeometry(0.012, 8, 8)
  const pupilL = new THREE.Mesh(pupilGeo, pupilMat)
  pupilL.position.set(-0.07, 0.5, 0.19)
  pupilL.scale.set(0.4, 1.5, 0.5)
  g.add(pupilL)
  const pupilR = new THREE.Mesh(pupilGeo, pupilMat)
  pupilR.position.set(0.07, 0.5, 0.19)
  pupilR.scale.set(0.4, 1.5, 0.5)
  g.add(pupilR)

  // Nose (pink triangle)
  const noseMat = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.4 })
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.02, 3), noseMat)
  nose.position.set(0, 0.46, 0.2)
  nose.rotation.x = -Math.PI / 2
  g.add(nose)

  // Mouth (small W)
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 })
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.01, 6, 6), mouthMat)
  mouth.position.set(0, 0.43, 0.19)
  mouth.scale.set(2.0, 0.5, 0.5)
  g.add(mouth)

  // Whiskers (6 total)
  const whiskerMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5 })
  for (let i = 0; i < 3; i++) {
    const wL = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.08, 4), whiskerMat)
    wL.position.set(-0.08, 0.45 + i * 0.01, 0.17)
    wL.rotation.z = 0.3
    wL.rotation.y = (i - 1) * 0.15
    g.add(wL)
    const wR = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.08, 4), whiskerMat)
    wR.position.set(0.08, 0.45 + i * 0.01, 0.17)
    wR.rotation.z = -0.3
    wR.rotation.y = (i - 1) * 0.15
    g.add(wR)
  }

  // Stripes on head
  for (let i = 0; i < 3; i++) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.05, 0.012), stripeMat)
    stripe.position.set(-0.05 + i * 0.05, 0.58, 0.1)
    stripe.rotation.x = 0.3
    g.add(stripe)
  }

  // Arms
  const armGeo = new THREE.CapsuleGeometry(0.035, 0.08, 4, 6)
  const armL = new THREE.Mesh(armGeo, furMat)
  armL.position.set(-0.2, 0.22, 0.02)
  armL.rotation.z = 0.5
  g.add(armL)
  const armR = new THREE.Mesh(armGeo, furMat)
  armR.position.set(0.2, 0.22, 0.02)
  armR.rotation.z = -0.5
  g.add(armR)

  // Paws (pink pads)
  const pinkMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7 })
  const pawGeo = new THREE.SphereGeometry(0.03, 8, 8)
  const pawL = new THREE.Mesh(pawGeo, pinkMat)
  pawL.position.set(-0.23, 0.16, 0.04)
  pawL.scale.set(0.8, 0.6, 0.8)
  g.add(pawL)
  const pawR = new THREE.Mesh(pawGeo, pinkMat)
  pawR.position.set(0.23, 0.16, 0.04)
  pawR.scale.set(0.8, 0.6, 0.8)
  g.add(pawR)

  // Legs
  const legGeo = new THREE.CapsuleGeometry(0.04, 0.06, 4, 6)
  const legL = new THREE.Mesh(legGeo, furMat)
  legL.position.set(-0.1, 0.06, 0.08)
  legL.scale.set(1.0, 0.8, 1.2)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, furMat)
  legR.position.set(0.1, 0.06, 0.08)
  legR.scale.set(1.0, 0.8, 1.2)
  g.add(legR)

  // Tail (long, curved)
  const tailGeo = new THREE.CapsuleGeometry(0.025, 0.2, 6, 8)
  const tail = new THREE.Mesh(tailGeo, furMat)
  tail.position.set(0, 0.25, -0.2)
  tail.rotation.x = -0.6
  tail.rotation.z = 0.3
  g.add(tail)

  // Collar (purple, with bell)
  const collarMat = new THREE.MeshStandardMaterial({ color: 0xaa66ff, roughness: 0.4 })
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.015, 6, 12), collarMat)
  collar.position.set(0, 0.36, 0.05)
  collar.rotation.x = Math.PI / 2
  collar.scale.set(1.0, 1.0, 0.7)
  g.add(collar)
  // Bell
  const bellMat = new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.3, metalness: 0.6 })
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), bellMat)
  bell.position.set(0, 0.33, 0.14)
  g.add(bell)

  return g
}

// ── 15. Plush Dog (detailed) ────────────────────────────────────────────────
function createPlushDog() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0xd2691e, roughness: 0.9 })
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })
  const snoutMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 14), furMat)
  body.scale.set(1.1, 0.95, 0.9)
  body.position.y = 0.22
  body.castShadow = true
  g.add(body)

  // Belly
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), bellyMat)
  belly.scale.set(0.8, 0.9, 0.5)
  belly.position.set(0, 0.22, 0.12)
  g.add(belly)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 14, 14), furMat)
  head.position.set(0, 0.5, 0.05)
  g.add(head)

  // Snout (lighter)
  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), snoutMat)
  snout.scale.set(1.0, 0.7, 0.7)
  snout.position.set(0, 0.48, 0.18)
  g.add(snout)

  // Ears (floppy, long)
  const earGeo = new THREE.CapsuleGeometry(0.04, 0.12, 6, 8)
  const earL = new THREE.Mesh(earGeo, furMat)
  earL.position.set(-0.14, 0.54, -0.02)
  earL.rotation.z = 0.6
  earL.rotation.x = -0.2
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, furMat)
  earR.position.set(0.14, 0.54, -0.02)
  earR.rotation.z = -0.6
  earR.rotation.x = -0.2
  g.add(earR)

  // Eyes (with highlights)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.028, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.08, 0.54, 0.18)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.08, 0.54, 0.18)
  g.add(eyeR)
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const hlGeo = new THREE.SphereGeometry(0.01, 6, 6)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.07, 0.55, 0.2)
  g.add(hlL)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.09, 0.55, 0.2)
  g.add(hlR)

  // Nose (black, shiny)
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.4 })
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), noseMat)
  nose.position.set(0, 0.48, 0.24)
  nose.scale.set(1.3, 0.9, 0.8)
  g.add(nose)

  // Mouth (tongue out, happy)
  const tongueMat = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.5 })
  const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), tongueMat)
  tongue.position.set(0, 0.43, 0.22)
  tongue.scale.set(1.0, 0.5, 0.8)
  g.add(tongue)

  // Arms
  const armGeo = new THREE.CapsuleGeometry(0.04, 0.09, 4, 6)
  const armL = new THREE.Mesh(armGeo, furMat)
  armL.position.set(-0.23, 0.24, 0.02)
  armL.rotation.z = 0.5
  g.add(armL)
  const armR = new THREE.Mesh(armGeo, furMat)
  armR.position.set(0.23, 0.24, 0.02)
  armR.rotation.z = -0.5
  g.add(armR)

  // Paws
  const pawGeo = new THREE.SphereGeometry(0.038, 8, 8)
  const pawL = new THREE.Mesh(pawGeo, furMat)
  pawL.position.set(-0.27, 0.16, 0.04)
  pawL.scale.set(0.9, 0.7, 0.9)
  g.add(pawL)
  const pawR = new THREE.Mesh(pawGeo, furMat)
  pawR.position.set(0.27, 0.16, 0.04)
  pawR.scale.set(0.9, 0.7, 0.9)
  g.add(pawR)

  // Legs
  const legGeo = new THREE.CapsuleGeometry(0.05, 0.07, 4, 6)
  const legL = new THREE.Mesh(legGeo, furMat)
  legL.position.set(-0.12, 0.07, 0.08)
  legL.scale.set(1.0, 0.8, 1.2)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, furMat)
  legR.position.set(0.12, 0.07, 0.08)
  legR.scale.set(1.0, 0.8, 1.2)
  g.add(legR)

  // Tail (curved, wagging)
  const tailGeo = new THREE.CapsuleGeometry(0.03, 0.15, 6, 8)
  const tail = new THREE.Mesh(tailGeo, furMat)
  tail.position.set(0, 0.3, -0.2)
  tail.rotation.x = -0.8
  tail.rotation.z = 0.3
  g.add(tail)

  // Bandana (blue, around neck)
  const bandanaMat = new THREE.MeshStandardMaterial({ color: 0x4488ff, roughness: 0.5 })
  const bandana = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 6, 12), bandanaMat)
  bandana.position.set(0, 0.36, 0.05)
  bandana.rotation.x = Math.PI / 2
  bandana.scale.set(1.0, 1.0, 0.7)
  g.add(bandana)
  // Bandana knot
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), bandanaMat)
  knot.position.set(0.08, 0.32, 0.12)
  g.add(knot)

  // Spots (darker patches on body)
  const spotMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 })
  const spot1 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), spotMat)
  spot1.position.set(0.12, 0.28, 0.08)
  spot1.scale.set(1.0, 0.5, 0.5)
  g.add(spot1)
  const spot2 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), spotMat)
  spot2.position.set(-0.1, 0.2, 0.1)
  spot2.scale.set(1.0, 0.5, 0.5)
  g.add(spot2)

  return g
}

// ── 16. Plush Elephant (detailed) ───────────────────────────────────────────
function createPlushElephant() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.9 })
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })

  // Body (large, round)
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 14), furMat)
  body.scale.set(1.2, 1.0, 1.0)
  body.position.y = 0.22
  body.castShadow = true
  g.add(body)

  // Belly
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), bellyMat)
  belly.scale.set(0.9, 0.9, 0.6)
  belly.position.set(0, 0.22, 0.1)
  g.add(belly)

  // Head (large)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 14), furMat)
  head.position.set(0, 0.5, 0.15)
  g.add(head)

  // Ears (large, floppy)
  const earGeo = new THREE.SphereGeometry(0.12, 10, 10)
  const earL = new THREE.Mesh(earGeo, furMat)
  earL.position.set(-0.2, 0.52, 0.05)
  earL.scale.set(0.25, 1.0, 0.8)
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, furMat)
  earR.position.set(0.2, 0.52, 0.05)
  earR.scale.set(0.25, 1.0, 0.8)
  g.add(earR)
  // Inner ears (pink)
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7 })
  const innerEarGeo = new THREE.SphereGeometry(0.08, 8, 8)
  const innerL = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerL.position.set(-0.2, 0.52, 0.08)
  innerL.scale.set(0.25, 1.0, 0.8)
  g.add(innerL)
  const innerR = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerR.position.set(0.2, 0.52, 0.08)
  innerR.scale.set(0.25, 1.0, 0.8)
  g.add(innerR)

  // Eyes (with highlights)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.025, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.08, 0.54, 0.28)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.08, 0.54, 0.28)
  g.add(eyeR)
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const hlGeo = new THREE.SphereGeometry(0.008, 6, 6)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.07, 0.55, 0.3)
  g.add(hlL)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.09, 0.55, 0.3)
  g.add(hlR)

  // Trunk (curved, segmented)
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x696969, roughness: 0.9 })
  const trunkBase = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.08, 8), trunkMat)
  trunkBase.position.set(0, 0.44, 0.28)
  g.add(trunkBase)
  const trunkMid = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.08, 8), trunkMat)
  trunkMid.position.set(0, 0.38, 0.32)
  trunkMid.rotation.x = 0.6
  g.add(trunkMid)
  const trunkTip = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), trunkMat)
  trunkTip.position.set(0, 0.34, 0.36)
  g.add(trunkTip)

  // Tusks (ivory)
  const tuskMat = new THREE.MeshStandardMaterial({ color: 0xfffff0, roughness: 0.3, metalness: 0.2 })
  const tuskL = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.08, 6), tuskMat)
  tuskL.position.set(-0.06, 0.4, 0.3)
  tuskL.rotation.x = 0.4
  tuskL.rotation.z = 0.3
  g.add(tuskL)
  const tuskR = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.08, 6), tuskMat)
  tuskR.position.set(0.06, 0.4, 0.3)
  tuskR.rotation.x = 0.4
  tuskR.rotation.z = -0.3
  g.add(tuskR)

  // Legs (stubby, thick)
  const legGeo = new THREE.CapsuleGeometry(0.06, 0.08, 4, 6)
  const legL = new THREE.Mesh(legGeo, furMat)
  legL.position.set(-0.15, 0.08, 0.1)
  legL.scale.set(1.0, 0.7, 1.0)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, furMat)
  legR.position.set(0.15, 0.08, 0.1)
  legR.scale.set(1.0, 0.7, 1.0)
  g.add(legR)

  // Toenails
  const nailMat = new THREE.MeshStandardMaterial({ color: 0xfffff0, roughness: 0.3 })
  const nailGeo = new THREE.SphereGeometry(0.012, 6, 6)
  for (let i = 0; i < 3; i++) {
    const nailL = new THREE.Mesh(nailGeo, nailMat)
    nailL.position.set(-0.15 - 0.02 + i * 0.02, 0.03, 0.16)
    g.add(nailL)
    const nailR = new THREE.Mesh(nailGeo, nailMat)
    nailR.position.set(0.15 - 0.02 + i * 0.02, 0.03, 0.16)
    g.add(nailR)
  }

  // Tail (thin, with tuft)
  const tailMat = new THREE.MeshStandardMaterial({ color: 0x696969, roughness: 0.9 })
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.008, 0.12, 6), tailMat)
  tail.position.set(0, 0.3, -0.28)
  tail.rotation.x = 0.8
  g.add(tail)
  const tailTuft = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), tailMat)
  tailTuft.position.set(0, 0.24, -0.32)
  g.add(tailTuft)

  // Blanket (colorful, on back)
  const blanketMat = new THREE.MeshStandardMaterial({ color: 0xff4488, roughness: 0.6 })
  const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.2), blanketMat)
  blanket.position.set(0, 0.42, -0.05)
  blanket.rotation.x = -0.1
  g.add(blanket)
  // Blanket trim
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.4 })
  const trim = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.005, 0.02), trimMat)
  trim.position.set(0, 0.43, 0.05)
  g.add(trim)

  return g
}

// ── 17. Plush Monkey (detailed) ─────────────────────────────────────────────
function createPlushMonkey() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 })
  const faceMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })
  const pinkMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7 })

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), furMat)
  body.scale.set(0.9, 1.0, 0.85)
  body.position.y = 0.22
  body.castShadow = true
  g.add(body)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), furMat)
  head.position.set(0, 0.5, 0.05)
  g.add(head)

  // Face (lighter)
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), faceMat)
  face.position.set(0, 0.48, 0.15)
  face.scale.set(0.9, 0.8, 0.5)
  g.add(face)

  // Ears (round, with pink inner)
  const earGeo = new THREE.SphereGeometry(0.055, 10, 10)
  const earL = new THREE.Mesh(earGeo, furMat)
  earL.position.set(-0.16, 0.54, 0.02)
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, furMat)
  earR.position.set(0.16, 0.54, 0.02)
  g.add(earR)
  const innerEarGeo = new THREE.SphereGeometry(0.03, 8, 8)
  const innerL = new THREE.Mesh(innerEarGeo, pinkMat)
  innerL.position.set(-0.16, 0.54, 0.05)
  g.add(innerL)
  const innerR = new THREE.Mesh(innerEarGeo, pinkMat)
  innerR.position.set(0.16, 0.54, 0.05)
  g.add(innerR)

  // Eyes (big, with highlights)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.032, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.07, 0.52, 0.2)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.07, 0.52, 0.2)
  g.add(eyeR)
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const hlGeo = new THREE.SphereGeometry(0.011, 6, 6)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.06, 0.53, 0.22)
  g.add(hlL)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.08, 0.53, 0.22)
  g.add(hlR)

  // Nose (pink, with nostrils)
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), pinkMat)
  nose.position.set(0, 0.48, 0.24)
  nose.scale.set(1.3, 0.8, 0.7)
  g.add(nose)

  // Mouth (smile)
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 })
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), mouthMat)
  mouth.position.set(0, 0.44, 0.22)
  mouth.scale.set(1.8, 0.5, 0.5)
  g.add(mouth)

  // Arms (long, reaching forward)
  const armGeo = new THREE.CapsuleGeometry(0.035, 0.12, 4, 6)
  const armL = new THREE.Mesh(armGeo, furMat)
  armL.position.set(-0.22, 0.26, 0.06)
  armL.rotation.z = 0.6
  armL.rotation.x = -0.3
  g.add(armL)
  const armR = new THREE.Mesh(armGeo, furMat)
  armR.position.set(0.22, 0.26, 0.06)
  armR.rotation.z = -0.6
  armR.rotation.x = -0.3
  g.add(armR)

  // Hands (pink palms)
  const handGeo = new THREE.SphereGeometry(0.035, 8, 8)
  const handL = new THREE.Mesh(handGeo, pinkMat)
  handL.position.set(-0.28, 0.2, 0.12)
  handL.scale.set(0.9, 0.6, 0.8)
  g.add(handL)
  const handR = new THREE.Mesh(handGeo, pinkMat)
  handR.position.set(0.28, 0.2, 0.12)
  handR.scale.set(0.9, 0.6, 0.8)
  g.add(handR)

  // Legs
  const legGeo = new THREE.CapsuleGeometry(0.045, 0.08, 4, 6)
  const legL = new THREE.Mesh(legGeo, furMat)
  legL.position.set(-0.11, 0.07, 0.08)
  legL.scale.set(1.0, 0.8, 1.2)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, furMat)
  legR.position.set(0.11, 0.07, 0.08)
  legR.scale.set(1.0, 0.8, 1.2)
  g.add(legR)

  // Feet (pink, with toes)
  const footGeo = new THREE.SphereGeometry(0.04, 8, 8)
  const footL = new THREE.Mesh(footGeo, pinkMat)
  footL.position.set(-0.11, 0.03, 0.14)
  footL.scale.set(0.9, 0.4, 1.3)
  g.add(footL)
  const footR = new THREE.Mesh(footGeo, pinkMat)
  footR.position.set(0.11, 0.03, 0.14)
  footR.scale.set(0.9, 0.4, 1.3)
  g.add(footR)

  // Tail (long, curly)
  const tailGeo = new THREE.CapsuleGeometry(0.02, 0.25, 6, 8)
  const tail = new THREE.Mesh(tailGeo, furMat)
  tail.position.set(0, 0.28, -0.2)
  tail.rotation.x = -0.5
  tail.rotation.z = 0.5
  g.add(tail)

  // Vest (red, cute)
  const vestMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.6 })
  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.18), vestMat)
  vest.position.set(0, 0.26, 0.04)
  g.add(vest)
  // Vest buttons
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.3, metalness: 0.6 })
  const button1 = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 6), buttonMat)
  button1.position.set(0, 0.28, 0.14)
  g.add(button1)
  const button2 = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 6), buttonMat)
  button2.position.set(0, 0.24, 0.14)
  g.add(button2)

  return g
}

// ── 18. Plush Lion (detailed) ───────────────────────────────────────────────
function createPlushLion() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0xdaa520, roughness: 0.9 })
  const maneMat = new THREE.MeshStandardMaterial({ color: 0xb8860b, roughness: 0.9 })
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })
  const snoutMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14), furMat)
  body.scale.set(1.1, 1.0, 0.95)
  body.position.y = 0.22
  body.castShadow = true
  g.add(body)

  // Belly
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), bellyMat)
  belly.scale.set(0.8, 0.9, 0.5)
  belly.position.set(0, 0.22, 0.12)
  g.add(belly)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), furMat)
  head.position.set(0, 0.52, 0.05)
  g.add(head)

  // Mane (fluffy, around head)
  const mane = new THREE.Mesh(new THREE.SphereGeometry(0.27, 12, 12), maneMat)
  mane.scale.set(1.2, 1.1, 0.9)
  mane.position.set(0, 0.52, 0.02)
  g.add(mane)
  // Mane tufts (extra fluff)
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const tuft = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), maneMat)
    tuft.position.set(Math.cos(angle) * 0.24, 0.52 + Math.sin(angle) * 0.1, 0.02)
    g.add(tuft)
  }

  // Snout (lighter)
  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), snoutMat)
  snout.scale.set(1.0, 0.7, 0.6)
  snout.position.set(0, 0.5, 0.2)
  g.add(snout)

  // Ears (round, peeking through mane)
  const earGeo = new THREE.SphereGeometry(0.045, 8, 8)
  const earL = new THREE.Mesh(earGeo, furMat)
  earL.position.set(-0.15, 0.66, 0.02)
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, furMat)
  earR.position.set(0.15, 0.66, 0.02)
  g.add(earR)

  // Eyes (with highlights)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.028, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.08, 0.56, 0.2)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.08, 0.56, 0.2)
  g.add(eyeR)
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const hlGeo = new THREE.SphereGeometry(0.01, 6, 6)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.07, 0.57, 0.22)
  g.add(hlL)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.09, 0.57, 0.22)
  g.add(hlR)

  // Nose (dark brown)
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.4 })
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), noseMat)
  nose.position.set(0, 0.5, 0.26)
  nose.scale.set(1.3, 0.9, 0.8)
  g.add(nose)

  // Mouth
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.5 })
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), mouthMat)
  mouth.position.set(0, 0.46, 0.24)
  mouth.scale.set(1.8, 0.5, 0.5)
  g.add(mouth)

  // Arms
  const armGeo = new THREE.CapsuleGeometry(0.04, 0.1, 4, 6)
  const armL = new THREE.Mesh(armGeo, furMat)
  armL.position.set(-0.25, 0.24, 0.02)
  armL.rotation.z = 0.5
  g.add(armL)
  const armR = new THREE.Mesh(armGeo, furMat)
  armR.position.set(0.25, 0.24, 0.02)
  armR.rotation.z = -0.5
  g.add(armR)

  // Paws
  const pawGeo = new THREE.SphereGeometry(0.038, 8, 8)
  const pawL = new THREE.Mesh(pawGeo, furMat)
  pawL.position.set(-0.29, 0.16, 0.04)
  pawL.scale.set(0.9, 0.7, 0.9)
  g.add(pawL)
  const pawR = new THREE.Mesh(pawGeo, furMat)
  pawR.position.set(0.29, 0.16, 0.04)
  pawR.scale.set(0.9, 0.7, 0.9)
  g.add(pawR)

  // Legs
  const legGeo = new THREE.CapsuleGeometry(0.05, 0.08, 4, 6)
  const legL = new THREE.Mesh(legGeo, furMat)
  legL.position.set(-0.13, 0.07, 0.08)
  legL.scale.set(1.0, 0.8, 1.2)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, furMat)
  legR.position.set(0.13, 0.07, 0.08)
  legR.scale.set(1.0, 0.8, 1.2)
  g.add(legR)

  // Tail (with tuft)
  const tailGeo = new THREE.CapsuleGeometry(0.02, 0.15, 6, 8)
  const tail = new THREE.Mesh(tailGeo, furMat)
  tail.position.set(0, 0.3, -0.22)
  tail.rotation.x = -0.7
  g.add(tail)
  const tailTuft = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), maneMat)
  tailTuft.position.set(0, 0.22, -0.28)
  g.add(tailTuft)

  // Crown (gold, on head)
  const crownMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.8 })
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 8), crownMat)
  crown.position.set(0, 0.68, 0.05)
  g.add(crown)
  // Crown points
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2
    const point = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.03, 4), crownMat)
    point.position.set(Math.cos(angle) * 0.08, 0.72, 0.05 + Math.sin(angle) * 0.08)
    g.add(point)
  }

  return g
}

// ── 19. Plush Panda (detailed) ──────────────────────────────────────────────
function createPlushPanda() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
  const patchMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 })

  // Body (white, round)
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.27, 14, 14), furMat)
  body.scale.set(1.0, 1.0, 0.9)
  body.position.y = 0.22
  body.castShadow = true
  g.add(body)

  // Belly (white)
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), furMat)
  belly.scale.set(0.8, 0.9, 0.5)
  belly.position.set(0, 0.22, 0.12)
  g.add(belly)

  // Head (white)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), furMat)
  head.position.set(0, 0.52, 0.05)
  g.add(head)

  // Ears (black, round)
  const earGeo = new THREE.SphereGeometry(0.065, 10, 10)
  const earL = new THREE.Mesh(earGeo, patchMat)
  earL.position.set(-0.14, 0.67, 0.02)
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, patchMat)
  earR.position.set(0.14, 0.67, 0.02)
  g.add(earR)

  // Eye patches (black, around eyes)
  const patchGeo = new THREE.SphereGeometry(0.065, 10, 10)
  const patchL = new THREE.Mesh(patchGeo, patchMat)
  patchL.position.set(-0.09, 0.54, 0.16)
  patchL.scale.set(1.0, 1.4, 0.5)
  g.add(patchL)
  const patchR = new THREE.Mesh(patchGeo, patchMat)
  patchR.position.set(0.09, 0.54, 0.16)
  patchR.scale.set(1.0, 1.4, 0.5)
  g.add(patchR)

  // Eyes (white, with black pupils)
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
  const eyeGeo = new THREE.SphereGeometry(0.022, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeWhiteMat)
  eyeL.position.set(-0.09, 0.54, 0.2)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeWhiteMat)
  eyeR.position.set(0.09, 0.54, 0.2)
  g.add(eyeR)
  // Pupils
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2 })
  const pupilGeo = new THREE.SphereGeometry(0.012, 8, 8)
  const pupilL = new THREE.Mesh(pupilGeo, pupilMat)
  pupilL.position.set(-0.09, 0.54, 0.22)
  g.add(pupilL)
  const pupilR = new THREE.Mesh(pupilGeo, pupilMat)
  pupilR.position.set(0.09, 0.54, 0.22)
  g.add(pupilR)

  // Nose (black)
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4 })
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), noseMat)
  nose.position.set(0, 0.5, 0.24)
  nose.scale.set(1.3, 0.9, 0.8)
  g.add(nose)

  // Mouth
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 })
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), mouthMat)
  mouth.position.set(0, 0.46, 0.22)
  mouth.scale.set(1.5, 0.5, 0.5)
  g.add(mouth)

  // Arms (black)
  const armGeo = new THREE.CapsuleGeometry(0.04, 0.1, 4, 6)
  const armL = new THREE.Mesh(armGeo, patchMat)
  armL.position.set(-0.24, 0.24, 0.02)
  armL.rotation.z = 0.5
  g.add(armL)
  const armR = new THREE.Mesh(armGeo, patchMat)
  armR.position.set(0.24, 0.24, 0.02)
  armR.rotation.z = -0.5
  g.add(armR)

  // Paws (black)
  const pawGeo = new THREE.SphereGeometry(0.038, 8, 8)
  const pawL = new THREE.Mesh(pawGeo, patchMat)
  pawL.position.set(-0.28, 0.16, 0.04)
  pawL.scale.set(0.9, 0.7, 0.9)
  g.add(pawL)
  const pawR = new THREE.Mesh(pawGeo, patchMat)
  pawR.position.set(0.28, 0.16, 0.04)
  pawR.scale.set(0.9, 0.7, 0.9)
  g.add(pawR)

  // Legs (black)
  const legGeo = new THREE.CapsuleGeometry(0.05, 0.08, 4, 6)
  const legL = new THREE.Mesh(legGeo, patchMat)
  legL.position.set(-0.12, 0.07, 0.08)
  legL.scale.set(1.0, 0.8, 1.2)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, patchMat)
  legR.position.set(0.12, 0.07, 0.08)
  legR.scale.set(1.0, 0.8, 1.2)
  g.add(legR)

  // Bamboo stalk (green, holding)
  const bambooMat = new THREE.MeshStandardMaterial({ color: 0x44aa44, roughness: 0.7 })
  const bamboo = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.15, 6), bambooMat)
  bamboo.position.set(0.15, 0.3, 0.12)
  bamboo.rotation.z = 0.3
  g.add(bamboo)
  // Bamboo segments
  const segMat = new THREE.MeshStandardMaterial({ color: 0x228822, roughness: 0.7 })
  for (let i = 0; i < 2; i++) {
    const seg = new THREE.Mesh(new THREE.TorusGeometry(0.016, 0.004, 4, 8), segMat)
    seg.position.set(0.13 - i * 0.03, 0.32 + i * 0.04, 0.12)
    seg.rotation.y = Math.PI / 2
    seg.rotation.z = 0.3
    g.add(seg)
  }

  return g
}

// ── 20. Plush Tiger (detailed) ──────────────────────────────────────────────
function createPlushTiger() {
  const g = new THREE.Group()
  const furMat = new THREE.MeshStandardMaterial({ color: 0xff8c00, roughness: 0.9 })
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 })
  const snoutMat = new THREE.MeshStandardMaterial({ color: 0xfff5e6, roughness: 0.85 })

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.27, 14, 14), furMat)
  body.scale.set(1.1, 1.0, 0.95)
  body.position.y = 0.22
  body.castShadow = true
  g.add(body)

  // Belly
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), bellyMat)
  belly.scale.set(0.8, 0.9, 0.5)
  belly.position.set(0, 0.22, 0.12)
  g.add(belly)

  // Body stripes (vertical)
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.12, 0.01), stripeMat)
    stripe.position.set(Math.cos(angle) * 0.28, 0.22, Math.sin(angle) * 0.28)
    stripe.rotation.y = angle
    g.add(stripe)
  }

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), furMat)
  head.position.set(0, 0.52, 0.05)
  g.add(head)

  // Snout (white)
  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 10), snoutMat)
  snout.scale.set(1.0, 0.7, 0.6)
  snout.position.set(0, 0.5, 0.2)
  g.add(snout)

  // Ears (round, with pink inner)
  const earGeo = new THREE.SphereGeometry(0.05, 10, 10)
  const earL = new THREE.Mesh(earGeo, furMat)
  earL.position.set(-0.13, 0.67, 0.02)
  g.add(earL)
  const earR = new THREE.Mesh(earGeo, furMat)
  earR.position.set(0.13, 0.67, 0.02)
  g.add(earR)
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.7 })
  const innerEarGeo = new THREE.SphereGeometry(0.03, 8, 8)
  const innerL = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerL.position.set(-0.13, 0.67, 0.05)
  g.add(innerL)
  const innerR = new THREE.Mesh(innerEarGeo, innerEarMat)
  innerR.position.set(0.13, 0.67, 0.05)
  g.add(innerR)

  // Eyes (with highlights)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.3 })
  const eyeGeo = new THREE.SphereGeometry(0.028, 10, 10)
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.08, 0.56, 0.2)
  g.add(eyeL)
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.08, 0.56, 0.2)
  g.add(eyeR)
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const hlGeo = new THREE.SphereGeometry(0.01, 6, 6)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.07, 0.57, 0.22)
  g.add(hlL)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.09, 0.57, 0.22)
  g.add(hlR)

  // Nose (pink)
  const noseMat = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.4 })
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), noseMat)
  nose.position.set(0, 0.5, 0.26)
  nose.scale.set(1.3, 0.9, 0.8)
  g.add(nose)

  // Mouth
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 })
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), mouthMat)
  mouth.position.set(0, 0.46, 0.24)
  mouth.scale.set(1.8, 0.5, 0.5)
  g.add(mouth)

  // Head stripes
  for (let i = 0; i < 4; i++) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.05, 0.012), stripeMat)
    stripe.position.set(-0.07 + i * 0.045, 0.6, 0.1)
    stripe.rotation.x = 0.3
    g.add(stripe)
  }

  // Arms
  const armGeo = new THREE.CapsuleGeometry(0.04, 0.1, 4, 6)
  const armL = new THREE.Mesh(armGeo, furMat)
  armL.position.set(-0.24, 0.24, 0.02)
  armL.rotation.z = 0.5
  g.add(armL)
  const armR = new THREE.Mesh(armGeo, furMat)
  armR.position.set(0.24, 0.24, 0.02)
  armR.rotation.z = -0.5
  g.add(armR)

  // Paws
  const pawGeo = new THREE.SphereGeometry(0.038, 8, 8)
  const pawL = new THREE.Mesh(pawGeo, furMat)
  pawL.position.set(-0.28, 0.16, 0.04)
  pawL.scale.set(0.9, 0.7, 0.9)
  g.add(pawL)
  const pawR = new THREE.Mesh(pawGeo, furMat)
  pawR.position.set(0.28, 0.16, 0.04)
  pawR.scale.set(0.9, 0.7, 0.9)
  g.add(pawR)

  // Legs
  const legGeo = new THREE.CapsuleGeometry(0.05, 0.08, 4, 6)
  const legL = new THREE.Mesh(legGeo, furMat)
  legL.position.set(-0.12, 0.07, 0.08)
  legL.scale.set(1.0, 0.8, 1.2)
  g.add(legL)
  const legR = new THREE.Mesh(legGeo, furMat)
  legR.position.set(0.12, 0.07, 0.08)
  legR.scale.set(1.0, 0.8, 1.2)
  g.add(legR)

  // Tail (long, with stripes)
  const tailGeo = new THREE.CapsuleGeometry(0.025, 0.2, 6, 8)
  const tail = new THREE.Mesh(tailGeo, furMat)
  tail.position.set(0, 0.28, -0.2)
  tail.rotation.x = -0.6
  tail.rotation.z = 0.3
  g.add(tail)
  // Tail stripes
  for (let i = 0; i < 3; i++) {
    const tailStripe = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.008, 4, 8), stripeMat)
    tailStripe.position.set(0, 0.3 - i * 0.05, -0.22 - i * 0.03)
    tailStripe.rotation.y = Math.PI / 2
    g.add(tailStripe)
  }

  // Bow tie (orange-red)
  const bowMat = new THREE.MeshStandardMaterial({ color: 0xff4400, roughness: 0.4 })
  const bowL = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.025, 0.015), bowMat)
  bowL.position.set(-0.022, 0.36, 0.16)
  bowL.rotation.z = 0.3
  g.add(bowL)
  const bowR = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.025, 0.015), bowMat)
  bowR.position.set(0.022, 0.36, 0.16)
  bowR.rotation.z = -0.3
  g.add(bowR)
  const bowC = new THREE.Mesh(new THREE.SphereGeometry(0.011, 6, 6), bowMat)
  bowC.position.set(0, 0.36, 0.17)
  g.add(bowC)

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

// ── 18. Romantic Bouquet ────────────────────────────────────────────────────
function createBouquet() {
  const g = new THREE.Group()

  // Paper wrapper (wide opening at the top, tapering down)
  const wrapMat = new THREE.MeshStandardMaterial({ color: 0x8a9a7b, roughness: 0.8 })
  const wrap = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.32, 12, 1, true), wrapMat)
  wrap.position.y = 0.1
  wrap.rotation.x = Math.PI
  g.add(wrap)

  // Flowers on short stems above the wrapper
  const flowerSpots = [
    [0, 0.38, 0],
    [0.09, 0.36, 0.05],
    [-0.09, 0.36, -0.05],
    [0, 0.34, 0.1],
    [0.05, 0.4, -0.08],
    [-0.06, 0.4, 0.08],
  ]
  const petalColors = [0xff4466, 0xff8844, 0xffdd44, 0xff6699, 0xcc88ff, 0xff4455]
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x4c7a3c, roughness: 0.7 })
  const centerMat = new THREE.MeshStandardMaterial({ color: 0xffcc33, roughness: 0.5 })
  flowerSpots.forEach((spot, i) => {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.18, 6), stemMat)
    stem.position.set(spot[0], 0.2, spot[2])
    g.add(stem)

    const petalMat = new THREE.MeshStandardMaterial({ color: petalColors[i], roughness: 0.6 })
    const petalCount = 5
    for (let p = 0; p < petalCount; p++) {
      const a = (p / petalCount) * Math.PI * 2
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6, 6), petalMat)
      petal.scale.set(1, 0.45, 1)
      petal.position.set(spot[0] + Math.cos(a) * 0.03, spot[1] - 0.02, spot[2] + Math.sin(a) * 0.03)
      g.add(petal)
    }
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.026, 6, 6), centerMat)
    center.position.set(spot[0], spot[1], spot[2])
    g.add(center)
  })

  // Ribbon bow at the wrapper neck
  const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xff3355, roughness: 0.5 })
  const bowLeft = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.012, 6, 10), ribbonMat)
  bowLeft.position.set(-0.05, 0.16, 0)
  bowLeft.rotation.x = Math.PI / 2
  g.add(bowLeft)
  const bowRight = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.012, 6, 10), ribbonMat)
  bowRight.position.set(0.05, 0.16, 0)
  bowRight.rotation.x = Math.PI / 2
  g.add(bowRight)
  const bowKnot = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), ribbonMat)
  bowKnot.position.set(0, 0.16, 0)
  g.add(bowKnot)

  return g
}

// ── 19. Greeting Card ───────────────────────────────────────────────────────
function createGreetingCard() {
  const g = new THREE.Group()

  // Card standing upright, tilted back slightly
  const cardMat = new THREE.MeshStandardMaterial({ color: 0xfff6ec, roughness: 0.8 })
  const card = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.17, 0.015), cardMat)
  card.position.y = 0.09
  card.rotation.x = -0.12
  g.add(card)

  // Red heart on the front
  const heartMat = new THREE.MeshStandardMaterial({ color: 0xff3355, roughness: 0.5 })
  const heartShape = new THREE.Shape()
  heartShape.moveTo(0, 0.05)
  heartShape.bezierCurveTo(-0.075, 0.09, -0.075, -0.015, 0, -0.06)
  heartShape.bezierCurveTo(0.075, -0.015, 0.075, 0.09, 0, 0.05)
  const heart = new THREE.Mesh(new THREE.ShapeGeometry(heartShape), heartMat)
  heart.position.set(0, 0.03, 0.01)
  card.add(heart)

  return g
}

// ── 20. Mini Handheld Electric Fan ──────────────────────────────────────────
function createElectricFan() {
  const g = new THREE.Group()

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4477cc, roughness: 0.35 })
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x335577, roughness: 0.5 })

  // Handle with battery cap at the bottom
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.14, 10), bodyMat)
  handle.position.y = 0.07
  g.add(handle)
  const batteryCap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.042, 0.02, 10), darkMat)
  batteryCap.position.y = 0.0
  g.add(batteryCap)

  // Motor housing
  const motor = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), bodyMat)
  motor.position.y = 0.2
  g.add(motor)

  // Four blades + center hub (the spinning part)
  const bladeMat = new THREE.MeshStandardMaterial({ color: 0xffe9b8, roughness: 0.55 })
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.014, 0.012), bladeMat)
    blade.position.set(Math.cos(a) * 0.06, 0.2 + Math.sin(a) * 0.06, 0.02)
    blade.rotation.z = a
    g.add(blade)
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.04, 8), bladeMat)
  hub.rotation.x = Math.PI / 2
  hub.position.set(0, 0.2, 0.02)
  g.add(hub)

  // Front guard cage
  const guardMat = new THREE.MeshStandardMaterial({ color: 0xdde6f0, roughness: 0.25, metalness: 0.35 })
  const guard = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.007, 6, 18), guardMat)
  guard.position.set(0, 0.2, 0.05)
  g.add(guard)

  return g
}

// =============================================================================
// LAYOUT CONFIGURATION
// =============================================================================
// Items are distributed programmatically in two rings with even angular spacing
// and alternating radii, so no two props overlap or occlude each other.
// A front cluster (elephant + bouquet, greeting card, mini fan) sits on the
// inner ring in the camera-facing wedge, keepsakes facing outward.
// Each item: [type, scaleFactor]

const LAYOUT = (() => {
  // Keep a clear wedge in front of the camera (+Z) so nothing blocks the view.
  const FRONT_CLEAR_HALF = THREE.MathUtils.degToRad(35)
  const frontCenter = Math.PI / 2 // +Z axis

  // Evenly spaced angular slots around a FULL ring, skipping the front wedge.
  // `clearHalf` (default FRONT_CLEAR_HALF) can be widened to push items further
  // away from the front keepsake cluster.
  function ringSlots(count, radius, clearHalf = FRONT_CLEAR_HALF) {
    const arcStart = frontCenter + clearHalf
    const arcSpan = Math.PI * 2 - clearHalf * 2
    const step = arcSpan / count
    const slots = []
    for (let i = 0; i < count; i++) {
      const angle = (arcStart + i * step) % (Math.PI * 2)
      slots.push({ x: Math.cos(angle) * radius, z: Math.sin(angle) * radius })
    }
    return slots
  }

  // Scatter item types across slots, making sure no two identical types are
  // adjacent (so variety reads naturally around the ring).
  function scatterSlots(items, slots) {
    const arr = items.slice()
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    // Resolve adjacent duplicates by swapping with a later, different type
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][0] === arr[i - 1][0]) {
        for (let k = i + 1; k < arr.length; k++) {
          if (arr[k][0] !== arr[i - 1][0]) {
            ;[arr[i], arr[k]] = [arr[k], arr[i]]
            break
          }
        }
      }
    }
    return slots.map((slot, i) => {
      const [type, scale] = arr[i]
      return [
        type,
        slot.x,
        slot.z,
        Math.atan2(-slot.x, -slot.z) + (Math.random() - 0.5) * 0.25, // face cake
        scale,
      ]
    })
  }

  // ── Inner ring: a few teddy bears, varied plush toys + small gifts ─────────
  // Reduced count leaves wide, visible gaps. Only one teddy bear (no identical
  // duplicates); the other plush types each appear once. "Plush" here means a
  // varied mix of stuffed animals, not just bear-shaped ones.
  const innerItems = [
    ['teddyBear', 1.0],
    ['plushRabbit', 2.0], ['plushCat', 2.0],
    ['plushDog', 2.0], ['plushMonkey', 2.0], ['plushLion', 2.0],
    ['giftBox', 1.8], ['giftBox', 2.0], ['giftBox', 1.9], ['giftBox', 1.7],
  ]

  // ── Outer ring: balloons + big multi-tier gift boxes ───────────────────────
  // Balloons are added to this same ring from environment.js. Mostly tall
  // gift stacks with the occasional oversized single box for variety. The slot
  // closest to the mini fan is dropped so nothing crowds it.
  const OUTER_R = 7.0
  const FAN_ANGLE = Math.PI / 2 + 0.38 // mini fan position (front-left)
  const outerSlots = ringSlots(11, OUTER_R)
  let nearestSlot = 0
  let nearestDelta = Infinity
  outerSlots.forEach((slot, i) => {
    const a = Math.atan2(slot.z, slot.x)
    let d = Math.abs(a - FAN_ANGLE)
    d = Math.min(d, Math.PI * 2 - d)
    if (d < nearestDelta) {
      nearestDelta = d
      nearestSlot = i
    }
  })
  outerSlots.splice(nearestSlot, 1)
  const outerItems = []
  for (let i = 0; i < outerSlots.length; i++) {
    const isBigBox = i % 4 === 0
    outerItems.push([
      isBigBox ? 'giftBox' : 'giftStack',
      isBigBox ? 2.2 + Math.random() * 0.4 : 1.9 + Math.random() * 0.3,
    ])
  }

  // ── Front cluster (left to right): fan, bouquet, card, penguin, elephant ───
  // The keepsakes keep their own separate zone in the front; the penguin and
  // elephant (now swapped) sit further right, closer to the gift-box side, but
  // still on the inner ring. Keepsakes face outward toward the camera; the
  // animals keep the standard ring orientation. The inner ring's scatter uses a
  // wider clear angle so plush toys and gift boxes stay well clear of them.
  const INNER_R = 4.5
  const INNER_CLEAR_HALF = THREE.MathUtils.degToRad(50)
  const frontCluster = [
    { type: 'fan', off: 0.38, scale: 3.2, outward: true },
    { type: 'bouquet', off: 0.12, scale: 3.0, outward: true },
    { type: 'greetingCard', off: -0.15, scale: 3.2, outward: true },
    { type: 'plushPenguin', off: -0.62, scale: 2.0, outward: false },
    { type: 'plushElephant', off: -0.88, scale: 2.0, outward: false },
  ]
  const frontLayout = frontCluster.map((item) => {
    const x = -Math.sin(item.off) * INNER_R
    const z = Math.cos(item.off) * INNER_R
    const ry = item.outward ? -item.off : Math.atan2(-x, -z)
    return [item.type, x, z, ry, item.scale]
  })

  // Inner ring (4.5m) and outer ring (7.0m), both clear of the 2.7m cake zone.
  // Front cluster items are added first so they rise into view early.
  return [
    ...frontLayout,
    ...scatterSlots(innerItems, ringSlots(innerItems.length, INNER_R, INNER_CLEAR_HALF)),
    ...scatterSlots(outerItems, outerSlots),
  ]
})()

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
    case 'teddyBear': {
      const g = createTeddyBear(0, 0, 0)
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'giftStack': {
      const count = 2 + Math.floor(Math.random() * 2)
      const g = createGiftStack(count, 0.3)
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
    case 'plushBear': {
      const g = createPlushBear()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushCat': {
      const g = createPlushCat()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushDog': {
      const g = createPlushDog()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushElephant': {
      const g = createPlushElephant()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushMonkey': {
      const g = createPlushMonkey()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushLion': {
      const g = createPlushLion()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushPanda': {
      const g = createPlushPanda()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'plushTiger': {
      const g = createPlushTiger()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'glowingStar': {
      const g = createGlowingStar()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'celebrationFlag': {
      const g = createCelebrationFlag()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'bouquet': {
      const g = createBouquet()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'greetingCard': {
      const g = createGreetingCard()
      g.scale.setScalar(scaleFactor)
      return g
    }
    case 'fan': {
      const g = createElectricFan()
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

  function update() {
    // Nothing per-frame to animate right now
  }

  return { reveal, update }
}