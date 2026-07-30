/**
 * camera.js — Perspective camera + OrbitControls
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * @param {THREE.WebGLRenderer} renderer
 * @returns {{ camera: THREE.PerspectiveCamera, controls: OrbitControls }}
 */
export function initCamera(renderer) {
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.01,
    200
  )
  // Phase-1 starting position (overridden by orbit in main loop)
  camera.position.set(0, 3.5, 9)
  camera.lookAt(0, 1.5, 0)

  // OrbitControls — disabled until interactive phase
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = false
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.enablePan = false
  controls.minDistance = 3
  controls.maxDistance = 18
  // Prevent camera from going below the floor plane
  controls.maxPolarAngle = Math.PI / 2 - 0.02
  controls.target.set(0, 1.5, 0)

  return { camera, controls }
}

/** Call once cinematic finishes to hand control to the user. */
export function enableOrbitControls(controls) {
  controls.enabled = true
}
