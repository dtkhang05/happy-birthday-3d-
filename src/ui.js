/**
 * ui.js — HTML overlay: glassmorphism "Are you ready?" + READY button
 */
import gsap from 'gsap'

export function initUI(container) {
  // ── Inject styles ─────────────────────────────────────────────────
  const style = document.createElement('style')
  style.textContent = /* css */`
    #ui-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 20;
      pointer-events: none;
    }

    .ui-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
      pointer-events: auto;
      animation: ui-rise 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      opacity: 0;
    }

    @keyframes ui-rise {
      from { opacity: 0; transform: translateY(40px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }

    .ui-eyebrow {
      font-size: clamp(0.7rem, 1.8vw, 0.95rem);
      font-weight: 300;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      color: #fff;
      text-shadow: none;
    }

    .ui-heading {
      font-size: clamp(2.0rem, 5vw, 4.2rem);
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.04em;
      line-height: 1;
      text-shadow: none;
    }

    .ready-btn {
      position: relative;
      padding: 10px 28px;
      min-width: 140px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      cursor: pointer;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .ready-btn:hover {
      transform: scale(1.04) translateY(-1px);
      border-color: rgba(255, 255, 255, 0.3);

    }

    .ready-btn:active { transform: scale(0.98); }

    .btn-label {
      position: relative;
      z-index: 2;
      font-size: clamp(0.85rem, 1.8vw, 1.0rem);
      font-weight: 400;
      letter-spacing: 0.35em;
      color: #fff;
      text-shadow: none;
    }

    .golden-ember {
      position: absolute;
      left: 18px; /* Adjust as needed for exact positioning */
      top: 50%;
      transform: translateY(-50%);
      width: 10px; /* 8-12px */
      height: 10px; /* 8-12px */
      border-radius: 50%;
      background-color: #ffaa00; /* Golden color */
      box-shadow: 0 0 5px #ffaa00, 0 0 8px rgba(255, 170, 0, 0.6); /* Subtle warm glow (5-10px radius) */
      z-index: 1; /* Below the label */
    }





    /* Instruction hint below button */
    .ui-hint {
      font-size: clamp(0.65rem, 1.4vw, 0.75rem);
      font-weight: 300;
      letter-spacing: 0.25em;
      color: #fff;
    }

    /* Interactive mode hints */
    #interactive-hints {
      position: absolute;
      left: 32px;
      bottom: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      opacity: 0;
      pointer-events: none;
      z-index: 30;
    }

    .hint-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .hint-icon {
      width: 36px;
      height: 36px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
    }

    .hint-icon svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: rgba(255,255,255,0.8);
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .hint-text {
      display: flex;
      flex-direction: column;
    }

    .hint-text-main {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.9);
    }

    .hint-text-sub {
      font-size: 0.6rem;
      font-weight: 300;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.4);
    }
  `
  document.head.appendChild(style)

  // ── DOM structure ─────────────────────────────────────────────────
  const overlay = document.createElement('div')
  overlay.id = 'ui-overlay'
  overlay.innerHTML = `
    <div class="ui-card">
      <p class="ui-eyebrow">A magical moment awaits</p>
      <h1 class="ui-heading">Are you ready?</h1>
      <button id="ready-btn" class="ready-btn" aria-label="Start the experience">
        <span class="golden-ember"></span>
        <span class="btn-label">READY</span>
      </button>
      <p class="ui-hint">Click to begin</p>
    </div>
  `
  container.appendChild(overlay)

  // Interactive mode hints (in a separate container)
  const interactiveHints = document.createElement('div')
  interactiveHints.id = 'interactive-hints'
  interactiveHints.innerHTML = `
    <div class="hint-item">
      <div class="hint-icon">
        <svg viewBox="0 0 24 24">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
      <div class="hint-text">
        <span class="hint-text-main">DRAG</span>
        <span class="hint-text-sub">TO ROTATE</span>
      </div>
    </div>
    <div class="hint-item">
      <div class="hint-icon">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      </div>
      <div class="hint-text">
        <span class="hint-text-main">SCROLL</span>
        <span class="hint-text-sub">TO ZOOM</span>
      </div>
    </div>
  `
  container.appendChild(interactiveHints)

  // ── Logic ─────────────────────────────────────────────────────────
  let _onReadyCallback = null

  const btn = overlay.querySelector('#ready-btn')
  btn.addEventListener('click', () => {
    if (_onReadyCallback) {
      btn.disabled = true
      _onReadyCallback()
    }
  })

  /** Fade out the whole overlay; returns a Promise that resolves when done. */
  function hide() {
    return new Promise((resolve) => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.in',
        onComplete() {
          overlay.style.pointerEvents = 'none'
          overlay.style.display = 'none'
          resolve()
        },
      })
    })
  }

  /** Register the callback to fire when READY is clicked. */
  function onReady(cb) {
    _onReadyCallback = cb
  }

  /** Show interactive hints */
  function showInteractiveHints() {
    gsap.to(interactiveHints, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    })
  }

  return { overlay, hide, onReady, showInteractiveHints }
}
