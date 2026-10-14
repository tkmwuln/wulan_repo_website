import { useEffect, useRef, useState } from 'react'

type Mode = 'idle' | 'hover' | 'text' | 'sleep'
type Burst = { id: number; x: number; y: number }

const INTERACTIVE = 'button, a, [role="button"], select, label, summary, input[type="checkbox"], input[type="radio"], input[type="file"]'
const TEXT = 'textarea, input:not([type="checkbox"]):not([type="radio"]):not([type="file"]), [contenteditable="true"]'

// Mini Nuri that follows the pointer with a soft spring, reacts to hover, clicks, typing and idling.
export default function CuteCursor() {
  const [enabled, setEnabled] = useState(false)
  const [bursts, setBursts] = useState<Burst[]>([])
  const dot = useRef<HTMLDivElement>(null)
  const blob = useRef<HTMLDivElement>(null)
  const eyes = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return
    setEnabled(true)
    document.documentElement.classList.add('cute-cursor')

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }, cur = { ...pos }
    let mode: Mode = 'idle', down = false, visible = false, lastMove = performance.now(), raf = 0
    const setMode = (m: Mode) => { if (m !== mode) { mode = m; blob.current?.setAttribute('data-mode', m) } }

    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY; lastMove = performance.now()
      if (!visible) { visible = true; cur.x = pos.x; cur.y = pos.y; document.documentElement.classList.remove('cute-cursor-out') }
      const t = e.target as Element | null
      setMode(t?.closest(TEXT) ? 'text' : t?.closest(INTERACTIVE) ? 'hover' : 'idle')
    }
    const press = (e: PointerEvent) => {
      down = true; blob.current?.setAttribute('data-down', '1')
      const id = Date.now() + Math.random()
      setBursts(b => [...b.slice(-4), { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setBursts(b => b.filter(x => x.id !== id)), 700)
    }
    const release = () => { down = false; blob.current?.removeAttribute('data-down') }
    const leave = () => { visible = false; document.documentElement.classList.add('cute-cursor-out') }

    const tick = () => {
      const dx = pos.x - cur.x, dy = pos.y - cur.y
      cur.x += dx * 0.18; cur.y += dy * 0.18
      const speed = Math.min(Math.hypot(dx, dy), 60)
      const angle = Math.atan2(dy, dx)
      const stretch = 1 + speed / 260, squash = 1 - speed / 520
      if (performance.now() - lastMove > 4000 && mode === 'idle') setMode('sleep')
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      if (blob.current) blob.current.style.transform = `translate3d(${cur.x + 14}px, ${cur.y + 14}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squash}) rotate(${-angle}rad) scale(${down ? 0.82 : 1})`
      // Eyes peek toward where the pointer is heading
      if (eyes.current) eyes.current.style.transform = `translate(${Math.cos(angle) * Math.min(speed / 12, 2.5)}px, ${Math.sin(angle) * Math.min(speed / 12, 2.5)}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerdown', press)
    addEventListener('pointerup', release)
    document.addEventListener('pointerleave', leave)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', move); removeEventListener('pointerdown', press); removeEventListener('pointerup', release)
      document.removeEventListener('pointerleave', leave); document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('cute-cursor', 'cute-cursor-out')
    }
  }, [])

  if (!enabled) return null
  return (
    <div className="cc-layer" aria-hidden>
      <div ref={dot} className="cc-dot" />
      <div ref={blob} className="cc-blob" data-mode="idle">
        <div className="cc-body">
          <div ref={eyes} className="cc-face">
            <span className="cc-eye" /><span className="cc-eye" />
            <span className="cc-mouth" />
          </div>
          <span className="cc-blush l" /><span className="cc-blush r" />
        </div>
        <span className="cc-z">z</span>
        <svg className="cc-heart" viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6C19 16.5 12 21 12 21z" /></svg>
      </div>
      {bursts.map(b => (
        <div key={b.id} className="cc-burst" style={{ left: b.x, top: b.y }}>
          {Array.from({ length: 7 }).map((_, i) => <span key={i} style={{ ['--a' as string]: `${(i / 7) * 360}deg`, ['--c' as string]: ['#a99bff', '#f3a6d8', '#ffd66b', '#9be6be'][i % 4] }} />)}
        </div>
      ))}
    </div>
  )
}
