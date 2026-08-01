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
 * Detects the device and returns quality settings so expensive effects are
 * dialed down automatically on phones/tablets while desktops keep the full
 * look (bloom + Bokeh DOF + shadows).
 */
export function detectDeviceQuality() {
  const isMobile =
    (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches) ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '')
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
  return {
    isMobile,
    pixelRatio: dpr,
    shadows: !isMobile,
    bokeh: { enabled: !isMobile, aperture: 0.0001, maxblur: 0.008 },
    bloom: isMobile
      ? { strength: 0.8, radius: 0.4, threshold: 0.25 }
      : { strength: 1.4, radius: 0.5, threshold: 0.25 },
  }
}

/**
 * Creates the WebGL renderer + scene.
 * @param {HTMLElement} container
 * @param {ReturnType<typeof detectDeviceQuality>} quality
 */
export function initScene(container, quality) {
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
  renderer.setPixelRatio(quality.pixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = quality.shadows
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
export function initComposer(renderer, scene, camera, quality) {
  const w = window.innerWidth
  const h = window.innerHeight
  const dpr = renderer.getPixelRatio()

  const composer = new EffectComposer(renderer)

  // Base render pass
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  // Bokeh (Depth of Field) pass — skipped on mobile for performance
  let bokehPass = null
  if (quality.bokeh.enabled) {
    bokehPass = new BokehPass(scene, camera, {
      focus: 11.0,      // approximate distance to cake
      aperture: quality.bokeh.aperture,
      maxblur: quality.bokeh.maxblur,
      width: w,
      height: h
    })
    composer.addPass(bokehPass)
  }

  // Bloom — moderate strength; Phase-1 red wire has low luminance so it glows;
  // Phase-2 restore uses GSAP to dial down to celebration level.
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(w, h),
    quality.bloom.strength,
    quality.bloom.radius,
    quality.bloom.threshold
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
