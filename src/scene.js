/**
 * scene.js — WebGL renderer, Three.js scene, EffectComposer pipeline
 */
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js'

/**
 * Creates the WebGL renderer + scene.
 * @param {HTMLElement} container
 */
export function initScene(container) {
  // ── Scene ──────────────────────────────────────────────────────────
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.FogExp2(0x000000, 0.04)

  // ── Renderer ───────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    antialias: false, // FXAA handles this
    powerPreference: 'high-performance',
    alpha: false,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.85
  renderer.outputColorSpace = THREE.SRGBColorSpace
  container.appendChild(renderer.domElement)

  const clock = new THREE.Clock()

  return { scene, renderer, clock }
}

/**
 * Creates EffectComposer with UnrealBloom + Bokeh (DOF) + FXAA.
 * Call AFTER camera is created.
 */
export function initComposer(renderer, scene, camera) {
  const w = window.innerWidth
  const h = window.innerHeight
  const dpr = renderer.getPixelRatio()

  const composer = new EffectComposer(renderer)

  // Base render pass
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  // Bokeh (Depth of Field) pass
  const bokehPass = new BokehPass(scene, camera, {
    focus: 11.0,      // approximate distance to cake
    aperture: 0.0001,
    maxblur: 0.008,
    width: w,
    height: h
  })
  composer.addPass(bokehPass)

  // Bloom — moderate strength; Phase-1 red wire has low luminance so it glows;
  // Phase-2 restore uses GSAP to dial down to celebration level.
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(w, h),
    1.4,  // strength
    0.5,  // radius
    0.25  // threshold — above typical surface diffuse, below emissive/wireframe
  )
  composer.addPass(bloomPass)

  // FXAA anti-aliasing
  const fxaaPass = new ShaderPass(FXAAShader)
  fxaaPass.material.uniforms['resolution'].value.set(1 / (w * dpr), 1 / (h * dpr))
  composer.addPass(fxaaPass)

  // Responsive resize
  window.addEventListener('resize', () => {
    const nw = window.innerWidth
    const nh = window.innerHeight
    const ndpr = renderer.getPixelRatio()
    renderer.setSize(nw, nh)
    composer.setSize(nw, nh)
    bloomPass.resolution.set(nw, nh)
    fxaaPass.material.uniforms['resolution'].value.set(1 / (nw * ndpr), 1 / (nh * ndpr))
    camera.aspect = nw / nh
    camera.updateProjectionMatrix()
  })

  return { composer, bloomPass, bokehPass, fxaaPass }
}
