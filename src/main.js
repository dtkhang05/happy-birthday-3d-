/**
 * main.js — Entry point: wires all modules together and runs the render loop.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { initScene, initComposer } from './scene.js'
import { initCamera, enableOrbitControls } from './camera.js'
import { loadCake } from './cake.js'
import { createSpark } from './spark.js'
import {
  createDustParticles,
  createConfetti,
  createBokehParticles,
  createButtonDissolveParticles,
} from './particles.js'
import { setupEnvironment } from './environment.js'
import { initUI } from './ui.js'
import {
  createFlash,
  createEnergyWave,
  createHappyBirthdayText,
  createCandleFlame,
  createVignette,
} from './effects.js'
import { runCinematic } from './animations.js'

async function main() {
  const app = document.getElementById('app')

  // ── Vignette (pure CSS, behind everything) ───────────────────────
  createVignette(app)

  // ── Scene + Renderer ─────────────────────────────────────────────
  const { scene, renderer } = initScene(app)

  // ── Camera + Controls ────────────────────────────────────────────
  const { camera, controls } = initCamera(renderer)

  // ── Post-processing ──────────────────────────────────────────────
  const { composer, bloomPass, bokehPass } = initComposer(renderer, scene, camera)

  // ── Load Cake ────────────────────────────────────────────────────
  const loadingFill = document.getElementById('loading-fill')
  const loadingPct = document.getElementById('loading-pct')
  const loadingScreen = document.getElementById('loading-screen')

  let cake
  try {
    cake = await loadCake(scene, (pct) => {
      const p = Math.round(pct * 100)
      if (loadingFill) loadingFill.style.width = `${p}%`
      if (loadingPct) loadingPct.textContent = `${p}%`
    })
  } catch (err) {
    console.error('Failed to load birthday_cake.glb:', err)
    if (loadingPct) loadingPct.textContent = 'Failed to load model.'
    return
  }

  // Hide loading screen
  if (loadingScreen) {
    loadingScreen.classList.add('hidden')
    setTimeout(() => loadingScreen.remove(), 900)
  }

  const { model, candlePosition, restoreOriginalMaterials } = cake

  // ── Audio Setup ──────────────────────────────────────────────────
  const listener = new THREE.AudioListener()
  camera.add(listener)

  const audioLoader = new THREE.AudioLoader()

  // Load fr.wav (spark sound)
  const frAudio = new THREE.Audio(listener)
  let frDuration = 4.0 // default fallback
  try {
    const frBuffer = await audioLoader.loadAsync('audio/fr.wav')
    frAudio.setBuffer(frBuffer)
    frAudio.setVolume(1.0)
    frDuration = frBuffer.duration
  } catch (err) {
    console.warn('Failed to load fr.wav:', err)
  }

  // Load hpbd.mp3 (background music)
  const hpbdAudio = new THREE.Audio(listener)
  try {
    const hpbdBuffer = await audioLoader.loadAsync('audio/hpbd.mp3')
    hpbdAudio.setBuffer(hpbdBuffer)
    hpbdAudio.setVolume(0)
    hpbdAudio.setLoop(true)
  } catch (err) {
    console.warn('Failed to load hpbd.mp3:', err)
  }

  // ── Environment ──────────────────────────────────────────────────
  const env = setupEnvironment(scene)
  env.setCandlePosition(candlePosition)

  // ── Spark ────────────────────────────────────────────────────────
  const spark = createSpark(scene)

  // ── Particles ────────────────────────────────────────────────────
  const dust = createDustParticles(scene)
  const confetti = createConfetti(scene)
  const bokeh = createBokehParticles(scene)

  // ── Effects ──────────────────────────────────────────────────────
  const flash = createFlash(scene)
  const energyWave = createEnergyWave(scene)
  const birthdayText = createHappyBirthdayText(scene)
  const candleFlame = createCandleFlame(scene, candlePosition)

  // ── UI ───────────────────────────────────────────────────────────
  const ui = initUI(app)

  // ── State flags ──────────────────────────────────────────────────
  let phase1Active = true       // camera gently orbits in Phase 1
  let interactiveMode = false   // OrbitControls active
  let orbitAngle = Math.PI * 0.15
  const clock = new THREE.Clock()

  // Explosion particles need updating each frame until they die
  const explosionUpdaters = []

  // ── Phase-1: initial slow orbit around the cake ─────────────────
  // (handled in the render loop below)

  // ── UI click handler ─────────────────────────────────────────────
  ui.onReady(async () => {
    phase1Active = false

    // Play ignition sound IMMEDIATELY on click — no delay
    // Audio buffer is already preloaded (loaded in main() before UI setup)
    try {
      if (frAudio.buffer) {
        frAudio.play()
      }
    } catch (e) {
      console.warn('Could not play fr.wav immediately:', e)
    }

    // Get the button element
    const btn = document.getElementById('ready-btn')
    const card = btn?.closest('.ui-card')
    const heading = card?.querySelector('.ui-heading')
    const eyebrow = card?.querySelector('.ui-eyebrow')
    const hint = card?.querySelector('.ui-hint')
    const btnLabel = btn?.querySelector('.btn-label')
    const btnRadial = btn?.querySelector('.btn-radial')
    const sparkles = btn?.querySelectorAll('.sparkle')

    // ── Step 1 (0~0.3s): Fade out text elements ───────────────────
    if (eyebrow) gsap.to(eyebrow, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    if (heading) gsap.to(heading, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    if (hint) gsap.to(hint, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    if (sparkles) sparkles.forEach(s => gsap.to(s, { opacity: 0, duration: 0.2 }))

    // Wait for text to fade
    await new Promise(resolve => setTimeout(resolve, 300))

    // ── Step 2 (0.3~0.8s): READY text melts into ember ─────────────
    if (btnLabel) {
      // Compress letters inward
      gsap.to(btnLabel, {
        letterSpacing: '0em',
        scale: 0.3,
        duration: 0.3,
        ease: 'power2.in',
      })
      // White -> orange -> bright yellow
      gsap.to(btnLabel, {
        color: 'rgb(255, 150, 50)',
        duration: 0.2,
        ease: 'power2.in',
      })
      gsap.to(btnLabel, {
        color: 'rgb(255, 220, 80)',
        duration: 0.2,
        delay: 0.2,
        ease: 'power2.in',
      })
      // Fade the text into the ember
      gsap.to(btnLabel, {
        opacity: 0,
        duration: 0.2,
        delay: 0.4,
        ease: 'power2.in',
      })
    }

    // Wait for melt
    await new Promise(resolve => setTimeout(resolve, 500))

    // ── Step 3 (0.8~1.2s): Ember ignites into fire burst ───────────
    // Position the spark at the button's world position
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    const sparkStartPos = new THREE.Vector3()
    sparkStartPos.copy(camera.position).addScaledVector(forward, 4)
    sparkStartPos.y += 0.2

    // Activate spark as a small ember (not huge)
    // Set initial direction toward the candle so the tail trails correctly
    const sparkInitDir = new THREE.Vector3().copy(candlePosition).sub(sparkStartPos).normalize()
    spark.activate(sparkStartPos, sparkInitDir)
    spark.setScale(2.0) // Small ember, not a huge ball
    spark.mesh.material.color.setHex(0xff4400)
    spark.light.color.setHex(0xff4400)
    spark.light.intensity = 4

    // Fire burst: grow slightly then settle into comet
    gsap.to(spark.mesh.scale, {
      x: 3.0, y: 3.0, z: 3.0,
      duration: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        // Shrink into comet
        gsap.to(spark.mesh.scale, {
          x: 1.0, y: 1.0, z: 1.0,
          duration: 0.2,
          ease: 'power2.in',
        })
      },
    })
    // Color: red -> orange -> yellow during burst
    spark.setColor(0xff8800, 0.15)
    setTimeout(() => spark.setColor(0xffdd44, 0.2), 150)

    // Fade out button and overlay
    if (btn) {
      gsap.to(btn, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => { btn.style.display = 'none' },
      })
    }
    if (btnRadial) gsap.to(btnRadial, { opacity: 0, duration: 0.2 })
    gsap.to(document.getElementById('ui-overlay'), {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        const overlay = document.getElementById('ui-overlay')
        if (overlay) {
          overlay.style.pointerEvents = 'none'
          overlay.style.display = 'none'
        }
      },
    })

    // Wait for burst
    await new Promise(resolve => setTimeout(resolve, 350))

    // ── Step 4: Comet begins moving toward candle ──────────────────
    // (Audio already played at click start — no delay)

    // Run the cinematic — the spark is already active as a small comet
    runCinematic({
      scene,
      camera,
      controls,
      bloomPass,
      spark,
      dust,
      confetti,
      bokeh,
      env,
      flash,
      energyWave,
      birthdayText,
      candleFlame,
      candlePosition,
      restoreOriginalMaterials,
      explosionUpdaters,
      frDuration,
      onRevealComplete: () => {
        // Fade in hpbd.mp3 over 1 second after reveal completes
        if (hpbdAudio.buffer) {
          hpbdAudio.play()
          const fadeStart = performance.now()
          const fadeDuration = 1000
          function fadeIn() {
            const elapsed = performance.now() - fadeStart
            const t = Math.min(elapsed / fadeDuration, 1)
            hpbdAudio.setVolume(t * 0.3)
            if (t < 1) requestAnimationFrame(fadeIn)
          }
          fadeIn()
        }
      },
      enableOrbit: () => {
        interactiveMode = true
        controls.target.set(0, 1.8, 0)
        enableOrbitControls(controls)
        ui.showInteractiveHints()
      },
    })
  })

  // ── Render loop ──────────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate)

    // NOTE: getDelta() must be called BEFORE getElapsedTime(),
    // otherwise getElapsedTime() consumes the delta and it becomes ~0.
    const delta = Math.min(clock.getDelta(), 0.05)
    const time = clock.elapsedTime

    // Phase-1 camera orbit
    if (phase1Active) {
      orbitAngle += 0.003
      const r = 8.5
      camera.position.x = Math.sin(orbitAngle) * r
      camera.position.z = Math.cos(orbitAngle) * r
      camera.position.y = 3.5 + Math.sin(time * 0.3) * 0.3
      camera.lookAt(0, 1.5, 0)
      model.rotation.y += 0.003
    }

    // Spark direction + trail
    spark.update(time)
    spark.updateParticles(delta || 0.016, time)

    // Dust
    dust.update()

    // Confetti
    confetti.update()

    // Bokeh
    bokeh.update(time)

    // Explosion particles (self-cleaning)
    for (let i = explosionUpdaters.length - 1; i >= 0; i--) {
      const eu = explosionUpdaters[i]
      eu.update()
      if (eu.isDisposed()) explosionUpdaters.splice(i, 1)
    }

    // Phase-2 per-frame updates
    if (!phase1Active) {
      env.updateCandleFlicker(time)
      env.updateBalloons(time)
    }

    // Birthday text billboard + float
    birthdayText.update(time, camera)

    // Candle flame flicker
    candleFlame.update(time)

    // Orbit controls damping
    if (interactiveMode) {
      controls.update()
    }

    // Dynamic DOF focus (track the cake center)
    if (bokehPass) {
      const dist = camera.position.distanceTo(new THREE.Vector3(0, 1.5, 0))
      bokehPass.uniforms['focus'].value = dist
    }

    // Post-processing render
    composer.render()
  }

  animate()
}

main()