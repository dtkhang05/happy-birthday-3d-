/**
 * spark.js - Meteor fire comet: compact white/yellow head + trailing particle tail
 * The head is a tight bright core. ~95% of particles trail behind the movement,
 * creating a natural asymmetric meteor shape. The tail tapers and fades with distance.
 */
import * as THREE from 'three'
import gsap from 'gsap'

function createSparkCanvas() {
  var size = 64
  var canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  var ctx = canvas.getContext('2d')
  var cx = size / 2
  var cy = size / 2

  // Tight outer glow: soft orange, ~12px radius
  var outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 12)
  outerGrad.addColorStop(0, 'rgba(255, 200, 100, 0.3)')
  outerGrad.addColorStop(0.5, 'rgba(255, 150, 50, 0.15)')
  outerGrad.addColorStop(1, 'rgba(255, 100, 0, 0)')
  ctx.fillStyle = outerGrad
  ctx.fillRect(0, 0, size, size)

  // Inner glow: bright orange, ~8px
  var innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8)
  innerGrad.addColorStop(0, 'rgba(255, 200, 80, 0.9)')
  innerGrad.addColorStop(0.6, 'rgba(255, 180, 50, 0.6)')
  innerGrad.addColorStop(1, 'rgba(255, 150, 30, 0)')
  ctx.fillStyle = innerGrad
  ctx.fillRect(0, 0, size, size)

  // Core: white/yellow, 4px
  var coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 4)
  coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)')
  coreGrad.addColorStop(0.5, 'rgba(255, 255, 220, 0.9)')
  coreGrad.addColorStop(1, 'rgba(255, 240, 180, 0)')
  ctx.fillStyle = coreGrad
  ctx.beginPath()
  ctx.arc(cx, cy, 4, 0, Math.PI * 2)
  ctx.fill()

  var tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  return tex
}

export function createSpark(scene) {
  var sparkTex = createSparkCanvas()

  var sparkMat = new THREE.SpriteMaterial({
    map: sparkTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  var sparkSprite = new THREE.Sprite(sparkMat)
  // Compact head scale (~12px visible)
  sparkSprite.scale.set(0.25, 0.25, 0.25)
  sparkSprite.visible = false
  scene.add(sparkSprite)

  var sparkLight = new THREE.PointLight(0xff8800, 2, 1.5)
  sparkSprite.add(sparkLight)

  var TRAIL_COUNT = 120 // longer tail
  var trailGeo = new THREE.BufferGeometry()
  var trailPos = new Float32Array(TRAIL_COUNT * 3)
  var trailAges = new Float32Array(TRAIL_COUNT)
  var trailSizes = new Float32Array(TRAIL_COUNT)
  var trailColors = new Float32Array(TRAIL_COUNT * 3)
  var trailVel = new Float32Array(TRAIL_COUNT * 3)

  for (var i = 0; i < TRAIL_COUNT; i++) {
    trailAges[i] = 999
    trailSizes[i] = 1
  }

  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3))
  trailGeo.setAttribute('age', new THREE.BufferAttribute(trailAges, 1))
  trailGeo.setAttribute('size', new THREE.BufferAttribute(trailSizes, 1))
  trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3))

  var trailMat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `
      attribute float age;
      attribute float size;
      varying float vAge;
      varying vec3 vColor;
      void main() {
        vAge = age;
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        // Taper: particles shrink more aggressively with age
        gl_PointSize = size * (10.0 / -mvPosition.z) * (1.0 - age * 0.85);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAge;
      varying vec3 vColor;
      void main() {
        if (vAge > 1.0) discard;
        float strength = distance(gl_PointCoord, vec2(0.5));
        if (strength > 0.5) discard;
        float alpha = 1.0 - (strength * 2.0);
        if (alpha <= 0.0) discard;
        // Fade alpha with age - tail disappears naturally
        gl_FragColor = vec4(vColor, alpha * (1.0 - vAge * 0.9) * 0.9);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })
  var trailPoints = new THREE.Points(trailGeo, trailMat)
  trailPoints.frustumCulled = false
  scene.add(trailPoints)

  var trailIdx = 0
  var active = false
  var hasMoved = false
  var lastPos = new THREE.Vector3()
  var moveDir = new THREE.Vector3(0, 0, 1)

  function activate(startPos, initialDir) {
    sparkSprite.position.copy(startPos)
    sparkSprite.visible = true
    trailPoints.visible = true
    active = true
    hasMoved = false
    lastPos.copy(startPos)
    if (initialDir) moveDir.copy(initialDir).normalize()
    for (var i = 0; i < TRAIL_COUNT; i++) trailAges[i] = 999
  }

  function setDirection(dir) {
    if (dir.lengthSq() > 0.0001) {
      moveDir.copy(dir).normalize()
    }
  }

  function setScale(s) {
    sparkSprite.scale.setScalar(s * 0.25)
  }

  function animateScale(targetScale, duration) {
    var startScale = sparkSprite.scale.x
    return gsap.to({ t: 0 }, {
      t: 1,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: function () {
        var p = this.targets()[0].t
        var s = startScale + (targetScale * 0.25 - startScale) * p
        sparkSprite.scale.setScalar(s)
      },
    })
  }

  function deactivate() {
    active = false
    sparkSprite.visible = false
    trailPoints.visible = false
  }

  function update(time) {
    if (!active) return

    var currentPos = sparkSprite.position

    // Detect first movement — clear old particles so no stationary blob
    if (!hasMoved) {
      if (currentPos.distanceToSquared(lastPos) > 0.0001) {
        hasMoved = true
        for (var i = 0; i < TRAIL_COUNT; i++) trailAges[i] = 999
      }
    }

    const newDir = new THREE.Vector3().subVectors(currentPos, lastPos)
    if (newDir.lengthSq() > 0.0001) {
      newDir.normalize()
      // Smooth the direction so the tail stays a single coherent stream
      // behind the head instead of flicking between frames.
      moveDir.lerp(newDir, 0.45)
      if (moveDir.lengthSq() > 0.0001) moveDir.normalize()
    }
    lastPos.copy(currentPos)
  }

  function updateParticles(delta, time) {
    // Don't emit until the spark is actually moving
    if (!active || !hasMoved) return;

    const currentPos = sparkSprite.position;
    const tPos = trailGeo.attributes.position.array;
    const tAges = trailGeo.attributes.age.array;
    const tSizes = trailGeo.attributes.size.array;
    const tColors = trailGeo.attributes.color.array;
    const tVel = trailVel;

    // Update existing particles
    for (let k = 0; k < TRAIL_COUNT; k++) {
      if (tAges[k] < 999) {
        tAges[k] += delta / 0.25; // Lifetime: 0.25s — quick fade on direction change

        if (tAges[k] >= 1.0) {
          tAges[k] = 999;
          continue;
        }

        tPos[k * 3 + 0] += tVel[k * 3 + 0];
        tPos[k * 3 + 1] += tVel[k * 3 + 1];
        tPos[k * 3 + 2] += tVel[k * 3 + 2];

        // No turbulence — keeps tail perfectly straight

        // Color transition: White/Yellow -> Orange -> Red -> Dark Red
        const p = tAges[k];
        if (p < 0.2) {
          // Bright white/yellow near head (0-20% of life)
          const p2 = p / 0.2;
          tColors[k * 3 + 0] = 1.0;
          tColors[k * 3 + 1] = 0.95 - p2 * 0.2;
          tColors[k * 3 + 2] = 0.7 - p2 * 0.4;
        } else if (p < 0.5) {
          // Orange mid-tail (20-50% of life)
          const p2 = (p - 0.2) / 0.3;
          tColors[k * 3 + 0] = 1.0;
          tColors[k * 3 + 1] = 0.75 - p2 * 0.25;
          tColors[k * 3 + 2] = 0.3 - p2 * 0.3;
        } else {
          // Red fading to dark (50-100% of life)
          const p2 = (p - 0.5) / 0.5;
          tColors[k * 3 + 0] = 1.0 - p2 * 0.3;
          tColors[k * 3 + 1] = 0.5 - p2 * 0.5;
          tColors[k * 3 + 2] = 0.0;
        }
      }
    }

    // Emit 4 particles per frame — tight single-file tail
    for (let e = 0; e < 4; e++) {
      trailIdx = (trailIdx + 1) % TRAIL_COUNT;

      // Spawn position: strictly behind the head
      tPos[trailIdx * 3 + 0] = currentPos.x - moveDir.x * 0.04;
      tPos[trailIdx * 3 + 1] = currentPos.y - moveDir.y * 0.04;
      tPos[trailIdx * 3 + 2] = currentPos.z - moveDir.z * 0.04;

      const speed = 0.12 + Math.random() * 0.02;

      // All particles: purely backward, ZERO spread — straight line only
      tVel[trailIdx * 3 + 0] = -moveDir.x * speed;
      tVel[trailIdx * 3 + 1] = -moveDir.y * speed;
      tVel[trailIdx * 3 + 2] = -moveDir.z * speed;

      tAges[trailIdx] = 0;
      tSizes[trailIdx] = 3 + Math.random() * 4; // compact particles

      // Initial color: white/yellow near head
      tColors[trailIdx * 3 + 0] = 1.0;
      tColors[trailIdx * 3 + 1] = 0.95;
      tColors[trailIdx * 3 + 2] = 0.7;
    }

    trailGeo.attributes.position.needsUpdate = true;
    trailGeo.attributes.age.needsUpdate = true;
    trailGeo.attributes.size.needsUpdate = true;
    trailGeo.attributes.color.needsUpdate = true;
  }

  function flyTo(target, duration, onUpdate, onComplete) {
    var proxy = {
      x: sparkSprite.position.x,
      y: sparkSprite.position.y,
      z: sparkSprite.position.z,
    }
    return gsap.to(proxy, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: duration,
      ease: 'power2.in',
      onUpdate: function () {
        sparkSprite.position.set(proxy.x, proxy.y, proxy.z)
        if (onUpdate) onUpdate(proxy)
      },
      onComplete: onComplete,
    })
  }

  function setColor(targetColor, duration) {
    const initialColor = sparkMat.color.clone();
    const target = new THREE.Color(targetColor);
    return gsap.to({ t: 0 }, {
        t: 1,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: function () {
            const p = this.targets()[0].t;
            const newColor = initialColor.clone().lerp(target, p);
            sparkMat.color.copy(newColor);
            sparkLight.color.copy(newColor);
        },
    });
  }

  return {
    mesh: sparkSprite,
    light: sparkLight,
    activate: activate,
    deactivate: deactivate,
    update: update,
    updateParticles: updateParticles,
    flyTo: flyTo,
    setColor: setColor,
    setScale: setScale,
    animateScale: animateScale,
    setDirection: setDirection,
  }
}