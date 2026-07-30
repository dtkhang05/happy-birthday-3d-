/**
 * cake.js — GLB loader, candle auto-detection, material management
 *
 * Candle detection strategy:
 *  1. Traverse all nodes — look for names containing 'candle','wick','flame','bougie','mèche'
 *  2. Take the highest matching node's world-space bounding-box top
 *  3. Fallback → top-centre of the entire model bounding box + CANDLE_POSITION_OFFSET
 *
 * The exported `candlePosition` Vector3 can be tweaked at the top of this file.
 */
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// ── Configurable fallback offset above the auto-detected top ──────────────────
export const CANDLE_POSITION_OFFSET = new THREE.Vector3(0, 0.15, 0)

const loader = new GLTFLoader()

/**
 * Loads /birthday_cake.glb, centres+scales it, applies Phase-1 wireframe,
 * and detects the candle position.
 *
 * @param {THREE.Scene} scene
 * @param {(pct: number) => void} onProgress  — 0..1
 * @returns {Promise<{
 *   model: THREE.Group,
 *   candlePosition: THREE.Vector3,
 *   applyWireframe: () => void,
 *   restoreOriginalMaterials: () => void
 * }>}
 */
export function loadCake(scene, onProgress) {
  return new Promise((resolve, reject) => {
    loader.load(
      '/birthday_cake.glb',
      (gltf) => {
        const model = gltf.scene

        // ── Centre & scale ─────────────────────────────────────────────
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const targetSize = 3.2
        const scaleFactor = targetSize / maxDim

        model.scale.setScalar(scaleFactor)

        // Recompute after scale
        const box2 = new THREE.Box3().setFromObject(model)
        const center2 = box2.getCenter(new THREE.Vector3())
        model.position.sub(center2)
        // Sit on the floor
        const box3 = new THREE.Box3().setFromObject(model)
        model.position.y -= box3.min.y

        scene.add(model)

        // ── Save original materials ────────────────────────────────────
        const originalMaterials = new Map()
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true
            node.receiveShadow = true
            // Store the original material (or array of materials)
            originalMaterials.set(node.uuid, node.material)
          }
        })

        // ── Candle detection ───────────────────────────────────────────
        const candlePosition = detectCandlePosition(model)

        // ── Apply initial wireframe ────────────────────────────────────
        const wireframeMat = buildWireframeMaterial()
        applyWireframeMaterialTo(model, wireframeMat)

        resolve({
          model,
          gltf,
          candlePosition,
          applyWireframe: () => applyWireframeMaterialTo(model, wireframeMat),
          restoreOriginalMaterials: () =>
            restoreMaterialsTo(model, originalMaterials),
        })
      },
      (xhr) => {
        if (onProgress && xhr.total) {
          onProgress(xhr.loaded / xhr.total)
        }
      },
      (err) => {
        console.error('GLTFLoader error:', err)
        reject(err)
      }
    )
  })
}

// ── Private helpers ──────────────────────────────────────────────────────────

const CANDLE_KEYWORDS = ['candle', 'wick', 'flame', 'bougie', 'mèche', 'bougies', 'mech']

function detectCandlePosition(model) {
  let bestNode = null
  let bestWorldY = -Infinity

  model.traverse((node) => {
    const name = node.name.toLowerCase()
    const isMatch = CANDLE_KEYWORDS.some((kw) => name.includes(kw))
    if (!isMatch) return

    // World-space Y of this node
    const wp = new THREE.Vector3()
    node.getWorldPosition(wp)
    if (wp.y > bestWorldY) {
      bestWorldY = wp.y
      bestNode = node
    }
  })

  if (bestNode) {
    const box = new THREE.Box3().setFromObject(bestNode)
    const topCenter = new THREE.Vector3(
      (box.min.x + box.max.x) / 2,
      box.max.y,
      (box.min.z + box.max.z) / 2
    )
    console.info(`[cake] Candle detected: "${bestNode.name}" → top`, topCenter)
    return topCenter.add(CANDLE_POSITION_OFFSET)
  }

  // Fallback — top centre of the whole model
  const box = new THREE.Box3().setFromObject(model)
  const fallback = new THREE.Vector3(
    (box.min.x + box.max.x) / 2,
    box.max.y,
    (box.min.z + box.max.z) / 2
  ).add(CANDLE_POSITION_OFFSET)

  console.info('[cake] No candle node found — using model top-centre fallback:', fallback)
  return fallback
}

function buildWireframeMaterial() {
  return new THREE.MeshBasicMaterial({
    color: 0xff2200,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
  })
}

function applyWireframeMaterialTo(model, mat) {
  model.traverse((node) => {
    if (node.isMesh) {
      node.material = mat
    }
  })
}

function restoreMaterialsTo(model, originalMaterials) {
  model.traverse((node) => {
    if (node.isMesh && originalMaterials.has(node.uuid)) {
      node.material = originalMaterials.get(node.uuid)
    }
  })
}
