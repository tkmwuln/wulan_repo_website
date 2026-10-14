export type Mood = 'neutral' | 'happy' | 'calm' | 'excited' | 'love' | 'cold' | 'sad' | 'angry' | 'thinking' | 'listening'

// Color palette per mood: [highlight, mid, deep, accent, glow]
const palette: Record<Mood, [string, string, string, string, string]> = {
  neutral: ['#cfe6ff', '#a9c4ff', '#c9a8ff', '#ffb8de', 'rgba(192,170,255,.55)'],
  happy: ['#cfe6ff', '#a9c4ff', '#c9a8ff', '#ffb8de', 'rgba(192,170,255,.55)'],
  thinking: ['#dcd6ff', '#b6b0ff', '#c9a8ff', '#e6c6ff', 'rgba(170,160,255,.5)'],
  listening: ['#cfe6ff', '#a9c4ff', '#c9a8ff', '#ffb8de', 'rgba(192,170,255,.6)'],
  calm: ['#d8fbe6', '#9be6be', '#6fd3a4', '#c9f3dd', 'rgba(120,220,170,.5)'],
  excited: ['#fff3c4', '#ffd66b', '#ffad4d', '#ff9a6b', 'rgba(255,190,90,.55)'],
  love: ['#ffe1f0', '#ffb3d6', '#ff8cc4', '#ffc6e0', 'rgba(255,150,200,.55)'],
  cold: ['#e3f4ff', '#9fd4ff', '#6fb4ff', '#c4e6ff', 'rgba(120,190,255,.55)'],
  sad: ['#eceef3', '#c3c8d4', '#9da4b5', '#d6d9e2', 'rgba(160,168,185,.45)'],
  angry: ['#ffd9d0', '#ff8f7a', '#f0524a', '#ff6f61', 'rgba(255,100,90,.5)'],
}
const ink = '#2a2f55'

export default function Nuri({ size = 140, mood = 'happy', glow = true }: { size?: number; mood?: Mood; glow?: boolean }) {
  const [hi, mid, deep, acc, gl] = palette[mood]
  const body = `radial-gradient(circle at 32% 26%, #fff 0%, ${hi} 22%, ${mid} 50%, ${deep} 82%, ${acc} 100%)`
  const mouth = {
    neutral: 'M42 67 L58 67', happy: 'M38 65 Q50 72 62 65', calm: 'M42 66 Q50 70 58 66', excited: 'M36 63 Q50 76 64 63',
    love: 'M40 65 Q50 72 60 65', cold: 'M38 68 Q42 65 46 68 Q50 71 54 68 Q58 65 62 68', sad: 'M41 70 Q50 64 59 70',
    angry: 'M40 70 Q50 65 60 70', thinking: 'M43 67 L57 66', listening: 'M44 67 Q50 69 56 67',
  }[mood]
  const armAnim = { excited: ['wave-l', 'wave-r'], happy: ['idle-l', 'wave-r'], love: ['hug-l', 'hug-r'], sad: ['droop-l', 'droop-r'], angry: ['fist-l', 'fist-r'], cold: ['shiver-l', 'shiver-r'], thinking: ['think-l', 'idle-r'] }[mood as string] ?? ['idle-l', 'idle-r']
  const float = { thinking: '1.4s', sad: '7s', excited: '1.6s', calm: '6s', angry: '.5s', cold: '.25s' }[mood as string] ?? '4.5s'
  const floatCls = mood === 'cold' ? 'nuri-shiver' : mood === 'angry' ? 'nuri-shake' : 'nuri-float'
  const eyeY = mood === 'sad' ? 52 : 50
  const armStyle = (left: boolean) => ({
    width: size * 0.3, height: size * 0.19, top: '53%', [left ? 'left' : 'right']: '-4%',
    transformOrigin: left ? '90% 50%' : '10% 50%',
    // Fade toward the body so the arm melts into its edge instead of looking stuck on
    background: `linear-gradient(${left ? 'to right' : 'to left'}, ${mid} 0%, ${deep} 55%, ${deep}00 100%)`,
    filter: 'blur(.4px)',
  })

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-label={`Nuri (${mood})`}>
      {glow && <div className="absolute inset-[-30%] rounded-full blur-2xl transition-all duration-700" style={{ background: `radial-gradient(circle, ${gl}, transparent 68%)` }} />}
      <div className={`${floatCls} absolute inset-0`} style={{ animationDuration: float }}>
        {/* Body */}
        <div className="blob absolute inset-[6%] overflow-hidden transition-all duration-700" style={{ background: body, boxShadow: `inset -8px -12px 24px ${deep}66, inset 8px 10px 20px rgba(255,255,255,.7)` }}>
          <div className="absolute left-[18%] top-[10%] h-[20%] w-[30%] rotate-[-25deg] rounded-full blur-[5px]" style={{ background: 'rgb(255 255 255 / .8)' }} />
          <div className="absolute bottom-[6%] right-[8%] h-[35%] w-[45%] rounded-full blur-xl" style={{ background: `${acc}88` }} />
        </div>
        {/* Arms overlap the body edge and fade into it */}
        <div className={`nuri-arm arm-${armAnim[0]}`} style={armStyle(true)} />
        <div className={`nuri-arm arm-${armAnim[1]}`} style={armStyle(false)} />
        {/* Face */}
        <svg viewBox="0 0 100 100" className="absolute inset-[6%] h-[88%] w-[88%] overflow-visible">
          {mood === 'sad' && <><path d="M29 39 L41 43" stroke={ink} strokeWidth="2.5" strokeLinecap="round" /><path d="M71 39 L59 43" stroke={ink} strokeWidth="2.5" strokeLinecap="round" /></>}
          {mood === 'angry' && <><path d="M28 38 L42 45" stroke={ink} strokeWidth="3.2" strokeLinecap="round" /><path d="M72 38 L58 45" stroke={ink} strokeWidth="3.2" strokeLinecap="round" /></>}
          {mood === 'excited' || mood === 'calm' ? (
            <><path d={mood === 'calm' ? 'M30 51 Q36 55 42 51' : 'M30 52 Q36 44 42 52'} stroke={ink} strokeWidth="3.2" fill="none" strokeLinecap="round" /><path d={mood === 'calm' ? 'M58 51 Q64 55 70 51' : 'M58 52 Q64 44 70 52'} stroke={ink} strokeWidth="3.2" fill="none" strokeLinecap="round" /></>
          ) : mood === 'love' ? (
            <g className="eyes-beat">{[36, 64].map(cx => <path key={cx} d={`M${cx} 56 C${cx - 9} 49 ${cx - 5} 42 ${cx} 47 C${cx + 5} 42 ${cx + 9} 49 ${cx} 56 Z`} fill="#ff3d8b" />)}</g>
          ) : (
            <g className={mood === 'thinking' ? 'eyes-look' : 'eyes-blink'}>
              <ellipse cx="36" cy={eyeY} rx="4" ry={mood === 'sad' || mood === 'angry' ? 4.5 : 6} fill={ink} />
              <ellipse cx="64" cy={eyeY} rx="4" ry={mood === 'sad' || mood === 'angry' ? 4.5 : 6} fill={ink} />
              <circle cx="37.5" cy={eyeY - 2.5} r="1.4" fill="#fff" /><circle cx="65.5" cy={eyeY - 2.5} r="1.4" fill="#fff" />
            </g>
          )}
          <ellipse cx="25" cy="62" rx="6" ry="3.5" fill={mood === 'angry' ? '#d92f2f' : mood === 'cold' ? '#ffffff' : '#ff8fc8'} opacity={mood === 'sad' ? 0.15 : 0.5} />
          <ellipse cx="75" cy="62" rx="6" ry="3.5" fill={mood === 'angry' ? '#d92f2f' : mood === 'cold' ? '#ffffff' : '#ff8fc8'} opacity={mood === 'sad' ? 0.15 : 0.5} />
          <path d={mouth} stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {mood === 'sad' && <path className="tear" d="M70 58 q2 4 0 6 q-2 -2 0 -6z" fill="#8ec5ff" />}
          {mood === 'angry' && <g className="steam" stroke="#f0524a" strokeWidth="2.5" strokeLinecap="round" fill="none"><path d="M80 18 l4 -4 M84 22 l5 -2 M78 14 l1 -5" /></g>}
          {mood === 'cold' && <g fill="#fff" opacity=".9"><circle className="snow" cx="14" cy="10" r="2" /><circle className="snow" cx="88" cy="4" r="1.6" style={{ animationDelay: '.6s' }} /><circle className="snow" cx="50" cy="-4" r="1.4" style={{ animationDelay: '1.1s' }} /></g>}
          {mood === 'love' && <path className="float-heart" d="M84 20 c-3 -3 -7 0 -4 4 l4 4 l4 -4 c3 -4 -1 -7 -4 -4z" fill="#ff6fae" />}
          {mood === 'excited' && <g fill="#ffb020"><path className="spark" d="M12 20 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" /><path className="spark" style={{ animationDelay: '.4s' }} d="M88 14 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5z" /></g>}
        </svg>
        {mood === 'thinking' && <div className="absolute -right-[8%] -top-[6%] flex gap-1">{[0, 1, 2].map(i => <span key={i} className="dot size-1.5 rounded-full bg-[#9a8cff]" style={{ animationDelay: `${i * 0.15}s` }} />)}</div>}
        {mood === 'listening' && <div className="absolute inset-[-8%] animate-ping rounded-full border-2 border-[#c9bfff]" />}
      </div>
    </div>
  )
}

export const moodLabels: [Mood, string][] = [['neutral', 'Normal'], ['calm', 'Tenang'], ['excited', 'Senang banget'], ['love', 'Sayang'], ['cold', 'Kedinginan'], ['sad', 'Sedih'], ['angry', 'Marah']]
