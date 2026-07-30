/**
 * animations.js — Master GSAP cinematic timeline
 *
 * Sequence:
 *  0.0s  Spark appears above the candle
 *  0.0s  Spark flies to candle tip  (camera follows behind)
 *  T-0.3s  Spark arrives — 0.3s pause (T = fr.wav duration)
 *  T     Ignition: flash + energy wave + explosion
 *  T+0.2s  Phase-2: materials restored, environment transitions
 *  T+1.7s  Happy Birthday text fades in
 *  T+2.2s  Final camera pulls back to cinematic wide shot
 *  T+5.0s  OrbitControls enabled — interactive mode
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { createExplosionParticles, createButtonDissolveParticles } from './particles.js'

/**
 * @param {{
 *   scene: THREE.Scene,
 *   camera: THREE.PerspectiveCamera,
 *   controls: import('three/addons/controls/OrbitControls.js').OrbitControls,
 *   bloomPass: import('three/addons/postprocessing/UnrealBloomPass.js').UnrealBloomPass,
 *   spark: ReturnType<import('./spark.js').createSpark>,
 *   dust: ReturnType<import('./particles.js').createDustParticles>,
 *   confetti: ReturnType<import('./particles.js').createConfetti>,
 *   bokeh: ReturnType<import('./particles.js').createBokehParticles>,
 *   env: ReturnType<import('./environment.js').setupEnvironment>,
 *   flash: ReturnType<import('./effects.js').createFlash>,
 *   energyWave: ReturnType<import('./effects.js').createEnergyWave>,
 *   birthdayText: ReturnType<import('./effects.js').createHappyBirthdayText>,
 *   candleFlame: ReturnType<import('./effects.js').createCandleFlame>,
 *   candlePosition: THREE.Vector3,
 *   restoreOriginalMaterials: () => void,
 *   enableOrbit: () => void,
 *   explosionUpdaters: Array<{update:()=>void, isDisposed:()=>boolean}>,
 *   frDuration: number,
 *   onRevealComplete: () => void,
 * }} ctx
 */
export function runCinematic(ctx) {
  const {
    scene, camera, controls, bloomPass,
    spark, dust, confetti, bokeh,
    env, flash, energyWave, birthdayText, candleFlame,
    candlePosition, restoreOriginalMaterials, enableOrbit,
    explosionUpdaters,
    frDuration,
    onRevealComplete,
  } = ctx

  // ── Spark is already active at the button position (set in main.js) ──
  // Use its current position as the start of the flight path
  const sparkStart = spark.mesh.position.clone()

  // ── Create Smooth Trajectory Curve ─────────────────────────────────
  const curvePts = [
    sparkStart,
    new THREE.Vector3(
      sparkStart.x + (candlePosition.x - sparkStart.x) * 0.3,
      sparkStart.y + (candlePosition.y - sparkStart.y) * 0.3 + 2.0,
      sparkStart.z + (candlePosition.z - sparkStart.z) * 0.3 + 2.0,
    ),
    new THREE.Vector3(
      sparkStart.x + (candlePosition.x - sparkStart.x) * 0.7,
      sparkStart.y + (candlePosition.y - sparkStart.y) * 0.7 + 0.5,
      sparkStart.z + (candlePosition.z - sparkStart.z) * 0.7 - 1.0,
    ),
    candlePosition
  ]
  const sparkCurve = new THREE.CatmullRomCurve3(curvePts)
  sparkCurve.curveType = 'centripetal'

  // ── Temporarily hide balloons during spark flight to avoid clipping ──
  const balloonMeshes = []
  scene.traverse((child) => {
    if (child.userData && child.userData.targetY !== undefined && child.userData.phaseOffset !== undefined) {
      child.visible = false
      balloonMeshes.push(child)
    }
  })

  // ── Camera smoothly transitions from current orbit to follow spark ──
  // Camera stays above and behind the spark to avoid scene objects
  const startTangent = sparkCurve.getTangent(0)
  const camTarget = {
    x: sparkStart.x - startTangent.x * 3.0,
    y: sparkStart.y + 2.0,  // higher offset to stay above obstacles
    z: sparkStart.z - startTangent.z * 3.0,
  }

  // Proxy object updated by GSAP — drives both spark position AND camera
  const sparkProxy = { x: sparkStart.x, y: sparkStart.y, z: sparkStart.z }

  // Camera shake state
  const shake = { intensity: 0 }

  // ── Master timeline ────────────────────────────────────────────────
  const tl = gsap.timeline({ defaults: { ease: 'none' } })

  // Spark flight duration: 2 seconds shorter than fr.wav for fast comet
  const flightDuration = Math.max(frDuration - 2.0, 1.5)

  // Brief 0.15s camera transition to smoothly catch up to the spark start
  tl.to(camera.position, {
    x: camTarget.x,
    y: camTarget.y,
    z: camTarget.z,
    duration: 0.15,
    ease: 'power2.out',
    onUpdate() {
      camera.lookAt(sparkStart)
    },
  })

  // ——————————————————————————————————————————————
  // PHASE A  (0 → flightDuration):  CatmullRomCurve Flight
  // Spark reaches candle exactly when fr.wav finishes
  // Camera stays above and behind, avoiding all scene objects
  // ——————————————————————————————————————————————
  const pathData = { progress: 0 }
  
  tl.to(pathData, {
    progress: 1,
    duration: flightDuration,
    ease: 'power2.inOut', // slow start, fast middle, slow end
    onUpdate() {
      const p = pathData.progress
      
      // Get position along curve
      const pos = sparkCurve.getPoint(p)
      
      // Subtle magical randomness
      const noise = (Math.random() - 0.5) * 0.08
      
      sparkProxy.x = pos.x + noise
      sparkProxy.y = pos.y + noise
      sparkProxy.z = pos.z + noise

      // Move spark
      spark.mesh.position.set(sparkProxy.x, sparkProxy.y, sparkProxy.z)

      // Cinematic camera follow: trailing along the tangent
      // Position camera behind and ABOVE the spark to avoid obstacles
      const camP = Math.max(0, p - 0.08)
      const camPos = sparkCurve.getPoint(camP)
      const tangent = sparkCurve.getTangent(camP)
      
      // Larger distance behind + higher Y offset to clear all objects
      const distanceBehind = 2.5 + (1.0 - p) * 2.0 // starts further back, gets closer
      const heightOffset = 1.8 + (1.0 - p) * 0.8 // stays high, lowers slightly near end
      
      camera.position.set(
        camPos.x - tangent.x * distanceBehind,
        camPos.y + heightOffset,  // always above the spark path
        camPos.z - tangent.z * distanceBehind
      )
      
      // Keep camera away from the center (cake area) — minimum radial distance
      const camDistFromCenter = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2)
      if (camDistFromCenter < 2.0) {
        // Push camera outward radially to avoid clipping the cake
        const angle = Math.atan2(camera.position.z, camera.position.x)
        camera.position.x = Math.cos(angle) * 2.0
        camera.position.z = Math.sin(angle) * 2.0
      }
      
      // Add camera shake
      camera.position.x += (Math.random() - 0.5) * shake.intensity
      camera.position.y += (Math.random() - 0.5) * shake.intensity
      camera.position.z += (Math.random() - 0.5) * shake.intensity

      // Look at the spark — always maintain clear line of sight
      camera.lookAt(sparkProxy.x, sparkProxy.y, sparkProxy.z)
    },
  })

  // Camera shake ramps up during flight
  tl.to(shake, { intensity: 0.08, duration: flightDuration, ease: 'power2.in' }, '<')

  // Bloom intensifies during flight (reduced radius ~40% for concentrated glow)
  tl.to(bloomPass, { strength: 1.5, radius: 0.39, duration: flightDuration, ease: 'power2.in' }, '<')

  // Spark color transitions from red → orange → golden yellow during flight
  tl.call(() => {
    spark.setColor(0xff8800, flightDuration * 0.4)
  }, [], '<')
  tl.call(() => {
    spark.setColor(0xffdd44, flightDuration * 0.6)
  }, [], '<' + flightDuration * 0.4)

  // ——————————————————————————————————————————————
  // NO PAUSE — immediately ignite when spark arrives
  // PHASE C  (flightDuration):  IGNITION
  // ——————————————————————————————————————————————
  tl.call(() => {
    spark.deactivate()
    shake.intensity = 0

    // White flash
    flash.trigger(camera)

    // Energy wave expanding from candle tip
    energyWave.trigger(candlePosition)

    // Particle explosion
    const exp = createExplosionParticles(scene, candlePosition)
    explosionUpdaters.push(exp)

    // Bloom peak
    gsap.to(bloomPass, { strength: 3.5, radius: 0.8, duration: 0.3, ease: 'power4.out' })
  })

  // ——————————————————————————————————————————————
  // PHASE D  (immediately after ignition):  Phase-2 world reveal
  // No delay — reveal fires the instant the spark touches the candle
  // ——————————————————————————————————————————————
  tl.call(() => {
    // Restore original cake materials
    restoreOriginalMaterials()

    // Bloom settles down to a much softer, cleaner level (prevent overexposure)
    gsap.to(bloomPass, { strength: 0.35, radius: 0.3, threshold: 0.4, duration: 2.5, ease: 'power2.out' })

    // Environment transitions (lights, balloons, etc.)
    env.transitionToPhase2()

    // Restore balloon visibility (hidden during spark flight)
    balloonMeshes.forEach(b => { b.visible = true })

    // Candle flame lights up
    candleFlame.show()

    // Confetti + bokeh
    confetti.activate()
    bokeh.activate()

    // Dust fades out
    dust.transitionToPhase2()

    // Notify main that reveal is complete — fade in hpbd.mp3
    if (onRevealComplete) onRevealComplete()
  })

  // ——————————————————————————————————————————————
  // PHASE E  (flightDuration + 1.7s):  Happy Birthday text appears
  // ——————————————————————————————————————————————
  tl.call(() => {
    birthdayText.show()
  }, [], '+=1.5')

  // ——————————————————————————————————————————————
  // PHASE F  (flightDuration + 2.2s):  Cinematic final pull-back
  // ——————————————————————————————————————————————
  tl.to({}, { duration: 0.5 })

  // Smooth wide-shot camera move to perfectly frame the cake
  tl.to(camera.position, {
    x: 0,
    y: 4.5,
    z: 11.5,
    duration: 3.8,
    ease: 'power2.inOut',
    onUpdate() {
      camera.lookAt(0, 2.5, 0)
    },
  })

  // Hold the final shot perfectly still for a moment
  tl.to({}, { duration: 2.5 })

  // ——————————————————————————————————————————————
  // PHASE G  (flightDuration + ~8.5s):  Interactive mode
  // ——————————————————————————————————————————════
  tl.call(() => {
    camera.lookAt(0, 1.8, 0)
    controls.target.set(0, 1.8, 0)
    enableOrbit()
  })

  return tl
}
