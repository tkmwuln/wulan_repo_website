import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Nuri, { type Mood, moodLabels } from './components/Nuri'
import { setLang, type Lang } from './i18n'

type View = 'chat' | 'dashboard' | 'diary' | 'growth' | 'history' | 'ggl' | 'profile' | 'health' | 'help' | 'report'
type Ggl = { carbs: number; fiber: number; micro: [string, number][]; allergens: string[]; name: string; kcal: number; sugar: number; salt: number; fat: number; protein: number; score: 'baik' | 'sedang' | 'buruk'; ingredients: string; items: [string, string, Src][] }
type Src = 'tkpi' | 'label' | 'ai'
type PlanOpts = { pref: string[]; target?: number }
type Msg = { role: 'user' | 'ai'; text: string; img?: string; ggl?: Ggl; nutri?: Ggl; compare?: [Ggl, Ggl]; chips?: string[]; log?: Ggl; planOpts?: PlanOpts; plan?: boolean; mood?: Mood; model?: string; action?: 'profile' | 'doctor' }
type GrowthPt = { m: number; bb: number; tb: number }
type Entry = { id: number; time: string; meal: string; name: string; kcal: number }

const phases = [
  { id: 'bayi', label: 'Bayi', age: '0–6 bln', kcal: 550, focus: 'ASI eksklusif & WHO Growth Chart' },
  { id: 'mpasi', label: 'MPASI', age: '6–24 bln', kcal: 800, focus: 'Transisi tekstur & pantau stunting' },
  { id: 'anak', label: 'Anak', age: '2–12 th', kcal: 1600, focus: 'Nutrisi otak & kontrol jajanan GGL' },
  { id: 'remaja', label: 'Remaja', age: '13–18 th', kcal: 2100, focus: 'Zat besi, asam folat & growth spurt' },
  { id: 'dewasa', label: 'Dewasa', age: '19–59 th', kcal: 2000, focus: 'TDEE & kontrol penyakit kronis' },
  { id: 'lansia', label: 'Lansia', age: '60+ th', kcal: 1700, focus: 'Protein 1.2–1.5 g/kgBB & dysphagia' },
]
const LIMIT = { sugar: 50, salt: 5, fat: 67 }
const samples: Ggl[] = [
  { carbs: 38, fiber: 3, micro: [['Vitamin A', 12], ['Vitamin C', 18], ['Zat besi', 15], ['Kalsium', 6]], name: 'Soto Ayam', kcal: 386, sugar: 4, salt: 2.8, fat: 14, protein: 24, allergens: ['Telur'], score: 'sedang', ingredients: 'ayam 80 g · bihun 40 g · kol 30 g · telur ½ · kuah 250 ml', items: [['Daging ayam', '80 g', 'tkpi'], ['Bihun', '40 g', 'tkpi'], ['Kubis', '30 g', 'tkpi'], ['Telur ayam', '30 g', 'tkpi'], ['Kuah soto bumbu kuning', '250 ml', 'ai']] },
  { carbs: 42, fiber: 9, micro: [['Vitamin A', 48], ['Vitamin C', 55], ['Zat besi', 28], ['Kalsium', 22]], name: 'Gado-gado', kcal: 420, sugar: 9, salt: 1.2, fat: 18, protein: 17, allergens: ['Kacang', 'Kedelai', 'Telur'], score: 'baik', ingredients: 'sayur rebus 150 g · tahu · tempe · telur · bumbu kacang 40 g', items: [['Sayuran rebus (kangkung, tauge, kacang panjang)', '150 g', 'tkpi'], ['Tahu', '50 g', 'tkpi'], ['Tempe kedelai', '40 g', 'tkpi'], ['Telur ayam', '30 g', 'tkpi'], ['Bumbu kacang', '40 g', 'ai']] },
  { carbs: 92, fiber: 2, micro: [['Vitamin A', 8], ['Vitamin C', 0], ['Zat besi', 9], ['Kalsium', 18]], name: 'Martabak Manis', kcal: 710, sugar: 42, salt: 1.1, fat: 34, protein: 11, allergens: ['Gluten', 'Susu', 'Telur'], score: 'buruk', ingredients: 'tepung 90 g · gula 35 g · mentega 25 g · cokelat · keju · SKM 30 g', items: [['Tepung terigu', '90 g', 'tkpi'], ['Gula pasir', '35 g', 'tkpi'], ['Mentega', '25 g', 'tkpi'], ['Keju', '15 g', 'tkpi'], ['Susu kental manis', '30 g', 'label'], ['Meses cokelat', '15 g', 'ai']] },
  { carbs: 70, fiber: 2, micro: [['Vitamin A', 4], ['Vitamin C', 2], ['Zat besi', 12], ['Kalsium', 4]], name: 'Mie Instan Goreng', kcal: 530, sugar: 7, salt: 4.4, fat: 26, protein: 9, allergens: ['Gluten', 'Telur', 'Kedelai'], score: 'buruk', ingredients: 'mie 85 g · bumbu · minyak bumbu · kecap · telur ceplok', items: [['Mi instan goreng (kemasan)', '85 g', 'label'], ['Telur ayam ceplok', '50 g', 'tkpi'], ['Kecap manis', '10 g', 'tkpi'], ['Bumbu & minyak bumbu', '12 g', 'label'], ['Minyak goreng (menggoreng telur)', '5 g', 'ai']] },
]
const icons = {
  dashboard: 'M4 13h6V4H4zM14 20h6v-9h-6zM4 20h6v-3H4zM14 7h6V4h-6z', diary: 'M6 4h12v16H6zM9 8h6M9 12h6M9 16h3',
  growth: 'M4 19l5-6 4 3 7-9M15 7h5v5', health: 'M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10zM8 12h2l1-2 2 4 1-2h2', leaf: 'M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7', shuffle: 'M4 7h3l10 10h3M4 17h3l3-3M14 10l3-3h3M18 4l3 3-3 3M18 14l3 3-3 3', ggl: 'M12 3l9 16H3zM12 10v4M12 17h.01', profile: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0', arrow: 'M5 12h14M13 6l6 6-6 6', history: 'M12 8v4l3 2M3 12a9 9 0 103-6.7L3 8M3 4v4h4', chat: 'M4 5h16v11H8l-4 4z',
  plus: 'M12 5v14M5 12h14', report: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4', help: 'M12 21a9 9 0 100-18 9 9 0 000 18zM9.5 9a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01', cam: 'M4 7h3l2-2h6l2 2h3v12H4zM12 16a3 3 0 100-6 3 3 0 000 6z', mic: 'M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3zM5 11a7 7 0 0014 0M12 18v3',
  send: 'M12 19V5M5 12l7-7 7 7', x: 'M6 6l12 12M18 6L6 18', side: 'M4 5h16v14H4zM9 5v14', search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6z', down: 'M6 9l6 6 6-6', out: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9', trash: 'M5 7h14M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  check: 'M5 12l5 5 9-10', warn: 'M12 3l9 16H3zM12 10v4M12 17h.01', menu: 'M4 6h16M4 12h16M4 18h16',
}
const Icon = ({ d, className = 'size-4' }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}><path d={d} /></svg>
)
const card = 'rounded-[28px] bg-white p-5 border border-neutral-100'
const hov = 'block w-full transition hover:-translate-y-0.5 hover:border-[#d9d1ff]'
const initials = (n: string) => n.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'U'
const Head = ({ t }: { t: string }) => <div className="flex items-center justify-between"><p className="text-sm font-medium">{t}</p><span className="text-xs text-[#6b5ce7]">Detail →</span></div>

function Ring({ value, max, size = 80 }: { value: number; max: number; size?: number }) {
  const p = Math.min(value / max, 1), r = 34, c = 2 * Math.PI * r
  const gid = 'rg' + useId().replace(/:/g, '')
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <defs><linearGradient id={gid} x1="0" x2="1"><stop stopColor="#8b7bff" /><stop offset="1" stopColor="#f39ad6" /></linearGradient></defs>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#efeaff" strokeWidth="7" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={`url(#${gid})`} strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p)} className="transition-all duration-700" />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-xs font-semibold">{Math.round((value / max) * 100)}%</span>
    </div>
  )
}
function Bar({ label, v, m, u, color }: { label: string; v: number; m: number; u: string; color: string }) {
  const over = v > m
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs"><span className="text-neutral-600">{label}</span><span className={over ? 'font-medium text-rose-500' : 'text-neutral-400'}>{+v.toFixed(1)}/{m} {u}</span></div>
      <div className="mt-1.5 h-1.5 rounded-full bg-neutral-100"><div className={`h-full rounded-full transition-all duration-700 ${over ? 'bg-rose-400' : color}`} style={{ width: `${Math.min((v / m) * 100, 100)}%` }} /></div>
    </div>
  )
}

const srcMeta: Record<Src, { label: string; cls: string; note: string }> = {
  tkpi: { label: 'TKPI Kemenkes', cls: 'bg-emerald-50 text-emerald-700', note: 'Tabel Komposisi Pangan Indonesia 2017 (Kemenkes RI), hasil analisis laboratorium' },
  label: { label: 'Label gizi', cls: 'bg-sky-50 text-sky-700', note: 'Informasi Nilai Gizi pada kemasan terdaftar BPOM' },
  ai: { label: 'Estimasi AI', cls: 'bg-amber-50 text-amber-700', note: 'Belum ada di TKPI. Diestimasi AI dari resep standar, sehingga akurasinya lebih rendah' },
}
function Sources({ items }: { items: [string, string, Src][] }) {
  const [open, setOpen] = useState(false)
  const n = (k: Src) => items.filter(i => i[2] === k).length
  const pct = Math.round((n('tkpi') / items.length) * 100)
  return (
    <div className="mt-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4">
      <button onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between text-left">
        <span className="text-xs font-medium text-neutral-700">Sumber data · {pct}% dari TKPI Kemenkes</span>
        <Icon d={icons.down} className={`size-3.5 text-neutral-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-neutral-200">
        {(['tkpi', 'label', 'ai'] as Src[]).map(k => <div key={k} className={k === 'tkpi' ? 'bg-emerald-400' : k === 'label' ? 'bg-sky-400' : 'bg-amber-400'} style={{ width: `${(n(k) / items.length) * 100}%` }} />)}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-3 text-[10px] text-neutral-500">{(['tkpi', 'label', 'ai'] as Src[]).filter(n).map(k => <span key={k}>{srcMeta[k].label}: {n(k)} bahan</span>)}</div>
      {open && (
        <div className="mt-3 space-y-1.5">
          {items.map(([name, qty, src]) => (
            <div key={name} className="flex items-center gap-2 text-xs"><span className="flex-1 text-neutral-700">{name}</span><span className="text-neutral-400">{qty}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${srcMeta[src].cls}`}>{srcMeta[src].label}</span></div>
          ))}
          <div className="mt-3 space-y-1 border-t border-neutral-200 pt-2 text-[10px] leading-relaxed text-neutral-500">
            {(['tkpi', 'label', 'ai'] as Src[]).filter(n).map(k => <p key={k}><b className="font-medium text-neutral-600">{srcMeta[k].label}:</b> {srcMeta[k].note}.</p>)}
            <a href="https://www.panganku.org" target="_blank" rel="noreferrer" className="inline-block text-[#6b5ce7] hover:underline">Lihat database TKPI di panganku.org ↗</a>
          </div>
        </div>
      )}
    </div>
  )
}

function CompareCard({ a, b }: { a: Ggl; b: Ggl }) {
  const rows: [string, (g: Ggl) => number, string, 'low' | 'high'][] = [['Kalori', g => g.kcal, 'kkal', 'low'], ['Protein', g => g.protein, 'g', 'high'], ['Gula', g => g.sugar, 'g', 'low'], ['Garam', g => g.salt, 'g', 'low'], ['Lemak', g => g.fat, 'g', 'low'], ['Serat', g => g.fiber, 'g', 'high']]
  const tone = { baik: 'text-emerald-600', sedang: 'text-amber-600', buruk: 'text-rose-500' }
  return (
    <div className="mt-3 overflow-hidden rounded-3xl border border-neutral-200 bg-white text-xs">
      <div className="grid grid-cols-3 border-b border-neutral-100 bg-neutral-50 px-4 py-2.5 font-medium"><span className="text-neutral-400">Per porsi</span>{[a, b].map(g => <span key={g.name} className="text-right text-neutral-800">{g.name}<span className={`block text-[10px] font-normal ${tone[g.score]}`}>GGL {g.score}</span></span>)}</div>
      {rows.map(([n, fn, u, better]) => {
        const va = fn(a), vb = fn(b), wa = better === 'low' ? va < vb : va > vb, wb = better === 'low' ? vb < va : vb > va
        return <div key={n} className="grid grid-cols-3 border-b border-neutral-50 px-4 py-2 last:border-0"><span className="text-neutral-500">{n}</span><span className={`text-right ${wa ? 'font-semibold text-emerald-600' : 'text-neutral-700'}`}>{va} {u}</span><span className={`text-right ${wb ? 'font-semibold text-emerald-600' : 'text-neutral-700'}`}>{vb} {u}</span></div>
      })}
      <p className="bg-neutral-50 px-4 py-2 text-[10px] text-neutral-400">Hijau = lebih baik. Sumber: TKPI 2017 Kemenkes RI + estimasi AI untuk bumbu olahan.</p>
    </div>
  )
}

function GglCard({ g }: { g: Ggl }) {
  const tone = { baik: 'bg-emerald-50 text-emerald-700', sedang: 'bg-amber-50 text-amber-700', buruk: 'bg-rose-50 text-rose-600' }[g.score]
  return (
    <div className="mt-3 rounded-3xl border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div><p className="font-medium text-neutral-900">{g.name} · 1 porsi</p><span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${tone}`}>Skor GGL: {g.score}</span></div>
        <p className="text-lg font-semibold">{g.kcal} <span className="text-xs font-normal text-neutral-400">kkal</span></p>
      </div>
      <Bar label="Gula" v={g.sugar} m={LIMIT.sugar / 2} u="g / batas per makan" color="bg-violet-400" />
      <Bar label="Garam" v={g.salt} m={LIMIT.salt / 2} u="g / batas per makan" color="bg-amber-400" />
      <Bar label="Lemak" v={g.fat} m={Math.round(LIMIT.fat / 2)} u="g / batas per makan" color="bg-pink-400" />
      <p className="mt-3 text-xs text-neutral-400">Protein {g.protein} g</p>
      <Sources items={g.items} />
    </div>
  )
}

type Prof = { name: string; phone: string; gender: string; age: string; weight: string; height: string; activity: string; conditions: string[]; allergies: string[]; meds: string; notes: string }
const bmiOf = (p: Prof) => (+p.weight && +p.height ? +(+p.weight / (+p.height / 100) ** 2).toFixed(1) : 0)
const bmiLabel = (b: number) => (!b ? 'belum diisi' : b < 18.5 ? 'kurus' : b < 23 ? 'normal' : b < 25 ? 'berlebih' : 'obesitas')
function personalCheck(g: Ggl, p: Prof) {
  const notes: string[] = []
  const hit = g.allergens.filter(a => p.allergies.includes(a))
  if (hit.length) notes.push(`⚠ Mengandung ${hit.join(', ')}, yang ada di daftar alergimu. Sebaiknya hindari atau ganti bahannya.`)
  if (p.conditions.includes('Hipertensi') && g.salt > 2) notes.push(`Kamu punya riwayat hipertensi, sedangkan garam di sini ${g.salt} g (batas per makan 2 g).`)
  if (p.conditions.includes('Diabetes') && g.sugar > 10) notes.push(`Dengan riwayat diabetes, gula ${g.sugar} g ini terlalu tinggi. Batas per makan sekitar 10 g.`)
  if (p.conditions.includes('Kolesterol') && g.fat > 20) notes.push(`Lemak ${g.fat} g cukup tinggi untuk kondisi kolesterolmu.`)
  if (p.conditions.includes('Gagal ginjal') && g.protein > 20) notes.push(`Protein ${g.protein} g perlu dibatasi untuk kondisi ginjal. Konsultasikan porsinya dengan dokter.`)
  const b = bmiOf(p)
  if (b >= 25 && g.kcal > 500) notes.push(`BMI kamu ${b} (${bmiLabel(b)}), jadi ${g.kcal} kkal sekali makan cukup besar. Coba setengah porsi.`)
  return { notes, risky: hit.length > 0 || notes.length >= 2 }
}
function analysisText(g: Ggl, p: Prof) {
  const { notes } = personalCheck(g, p)
  const base = baseAnalysis(g)
  return notes.length ? `${base}\n\nDibandingkan dengan profil kesehatanmu:\n${notes.map(n => '• ' + n).join('\n')}` : `${base}\n\nAku sudah cocokkan dengan profil kesehatanmu: aman, tidak ada konflik dengan alergi atau riwayat penyakitmu.`
}
function baseAnalysis(g: Ggl) {
  if (g.score === 'buruk' && (g.sugar > 30 || g.salt > 4)) return `Waduh! ${g.name} ini ${g.sugar > 30 ? 'gulanya' : 'garamnya'} hampir dua kali lipat batas per makan, aku sampai merah nih! Tapi aku marah ke makanannya, bukan ke kamu. Yuk minum air putih, jalan santai 15 menit, dan makan sayur di makan berikutnya. Kita pasti bisa balik on track!`
  if (g.score === 'buruk') return `Hmm, ${g.name} ini cukup tinggi ${g.sugar > 20 ? 'gula' : 'garam'} dan lemaknya, jadi aku agak sedih. Tapi tenang, satu porsi bukan akhir dunia! Coba bagi dua porsinya, minum air putih, dan seimbangkan makan berikutnya dengan sayur dan protein. Kamu pasti bisa!`
  if (g.score === 'sedang') return `${g.name} lumayan! Proteinnya oke, cuma sodiumnya sedikit tinggi. Kurangi kuah atau kecapnya sedikit ya, nanti jadi makin pas.`
  return `Wah, ${g.name} pilihan yang keren! Seratnya tinggi dan GGL-nya aman. Pertahankan ya!`
}
const tdeeOf = (p: Prof) => {
  if (!+p.weight || !+p.height || !+p.age) return 0
  const bmr = p.gender === 'Pria' ? 10 * +p.weight + 6.25 * +p.height - 5 * +p.age + 5 : 10 * +p.weight + 6.25 * +p.height - 5 * +p.age - 161
  return Math.round(bmr * ({ Rendah: 1.2, Ringan: 1.375, Sedang: 1.55, Tinggi: 1.725 }[p.activity] ?? 1.375))
}
function nutriText(g: Ggl, p: Prof) {
  const { notes } = personalCheck(g, p)
  const high = g.micro.filter(m => m[1] >= 25).map(m => m[0])
  const base = `Kandungan gizi ${g.name}: ${g.kcal} kkal, protein ${g.protein} g, karbo ${g.carbs} g, lemak ${g.fat} g, serat ${g.fiber} g.${high.length ? ` Bagus untuk ${high.join(' & ')}!` : ' Vitamin & mineralnya masih rendah, tambahkan sayur atau buah ya.'}`
  return notes.length ? `${base}\n\nCatatan untuk profil kesehatanmu:\n${notes.map(n => '• ' + n).join('\n')}` : `${base}\n\nCocok dengan status kesehatanmu.`
}
function healthSummary(p: Prof): Msg {
  const b = bmiOf(p)
  const missing = [!p.weight && 'berat badan', !p.height && 'tinggi badan', !p.age && 'usia'].filter(Boolean)
  if (missing.length) return { role: 'ai', mood: 'thinking', text: `Aku butuh ${missing.join(', ')} dulu supaya bisa menilai nutrisimu. Isi di halaman Profil ya!` }
  const bmr = Math.round(p.gender === 'Pria' ? 10 * +p.weight + 6.25 * +p.height - 5 * +p.age + 5 : 10 * +p.weight + 6.25 * +p.height - 5 * +p.age - 161)
  const tdee = Math.round(bmr * ({ Rendah: 1.2, Sedang: 1.55, Tinggi: 1.725 }[p.activity] ?? 1.375))
  const tips = [
    p.conditions.includes('Hipertensi') && 'Hipertensi: garam maks 5 g/hari, hindari kecap asin, kerupuk, dan makanan kaleng.',
    p.conditions.includes('Diabetes') && 'Diabetes: pilih karbo kompleks (nasi merah, oat) dan batasi gula 25 g/hari.',
    p.conditions.includes('Kolesterol') && 'Kolesterol: kurangi gorengan dan santan, perbanyak ikan dan serat.',
    p.conditions.includes('Gagal ginjal') && 'Ginjal: batasi protein, kalium, dan fosfor. Ikuti arahan dokter.',
    p.allergies.length > 0 && `Alergi: aku akan selalu memperingatkan kalau ada ${p.allergies.join(', ')} di makananmu.`,
    p.meds && `Obat (${p.meds}): beberapa makanan bisa berinteraksi, jadi tanyakan juga ke apoteker.`,
  ].filter(Boolean) as string[]
  const good = b >= 18.5 && b < 23 && p.conditions.length === 0
  return { role: 'ai', mood: good ? 'excited' : b >= 25 ? 'sad' : 'calm', text: `Ringkasan kesehatanmu, ${p.name.split(' ')[0]}:\n• BMI ${b} (${bmiLabel(b)})\n• Kebutuhan energi ±${tdee} kkal/hari (aktivitas ${p.activity.toLowerCase()})\n${tips.map(t => '• ' + t).join('\n')}\n\n${good ? 'Nutrisimu sudah di jalur yang bagus, pertahankan!' : 'Ada beberapa hal yang perlu dijaga, tapi tenang, kita jalani pelan-pelan bareng ya!'}` }
}
const M3 = (a: number, c: number, fe: number, ca: number): [string, number][] => [['Vitamin A', a], ['Vitamin C', c], ['Zat besi', fe], ['Kalsium', ca]]
const moreFoods: Ggl[] = [
  { name: 'Nasi Padang Rendang', kcal: 780, sugar: 6, salt: 2.9, fat: 38, protein: 30, carbs: 85, fiber: 4, micro: M3(20, 8, 35, 10), allergens: [], score: 'buruk', ingredients: '', items: [['Nasi putih', '200 g', 'tkpi'], ['Rendang daging sapi', '80 g', 'tkpi'], ['Gulai daun singkong', '50 g', 'ai'], ['Sambal hijau', '20 g', 'ai']] },
  { name: 'Nasi Goreng', kcal: 620, sugar: 8, salt: 3.1, fat: 24, protein: 18, carbs: 82, fiber: 3, micro: M3(10, 4, 14, 6), allergens: ['Telur', 'Kedelai'], score: 'buruk', ingredients: '', items: [['Nasi putih', '200 g', 'tkpi'], ['Telur ayam', '50 g', 'tkpi'], ['Kecap manis', '15 g', 'tkpi'], ['Minyak kelapa sawit', '10 g', 'tkpi'], ['Bumbu nasi goreng', '15 g', 'ai']] },
  { name: 'Bakso Sapi', kcal: 410, sugar: 4, salt: 3.4, fat: 16, protein: 20, carbs: 45, fiber: 2, micro: M3(4, 6, 18, 5), allergens: ['Gluten'], score: 'sedang', ingredients: '', items: [['Bakso daging sapi', '100 g', 'tkpi'], ['Mi kuning basah', '60 g', 'tkpi'], ['Bihun', '20 g', 'tkpi'], ['Kuah kaldu sapi', '300 ml', 'ai']] },
  { name: 'Sate Ayam', kcal: 480, sugar: 14, salt: 1.8, fat: 22, protein: 32, carbs: 30, fiber: 3, micro: M3(6, 4, 12, 4), allergens: ['Kacang', 'Kedelai'], score: 'sedang', ingredients: '', items: [['Daging ayam', '120 g', 'tkpi'], ['Lontong', '100 g', 'tkpi'], ['Bumbu kacang', '40 g', 'ai'], ['Kecap manis', '15 g', 'tkpi']] },
  { name: 'Pecel Sayur', kcal: 380, sugar: 10, salt: 1.3, fat: 15, protein: 14, carbs: 48, fiber: 8, micro: M3(52, 48, 26, 20), allergens: ['Kacang'], score: 'baik', ingredients: '', items: [['Bayam, kangkung, tauge rebus', '150 g', 'tkpi'], ['Nasi putih', '100 g', 'tkpi'], ['Sambal pecel', '35 g', 'ai'], ['Rempeyek', '10 g', 'ai']] },
  { name: 'Bubur Ayam', kcal: 330, sugar: 3, salt: 2.2, fat: 9, protein: 16, carbs: 45, fiber: 1, micro: M3(6, 2, 8, 4), allergens: ['Kedelai'], score: 'sedang', ingredients: '', items: [['Bubur beras', '250 g', 'tkpi'], ['Suwiran ayam', '40 g', 'tkpi'], ['Cakwe', '15 g', 'ai'], ['Kecap asin', '5 g', 'tkpi']] },
  { name: 'Es Teh Manis', kcal: 120, sugar: 30, salt: 0, fat: 0, protein: 0, carbs: 30, fiber: 0, micro: M3(0, 0, 0, 0), allergens: [], score: 'buruk', ingredients: '', items: [['Teh seduh', '250 ml', 'tkpi'], ['Gula pasir', '30 g', 'tkpi']] },
  { name: 'Ayam Geprek', kcal: 650, sugar: 3, salt: 2.6, fat: 34, protein: 30, carbs: 60, fiber: 2, micro: M3(5, 10, 10, 4), allergens: ['Gluten', 'Telur'], score: 'buruk', ingredients: '', items: [['Ayam goreng tepung', '120 g', 'ai'], ['Nasi putih', '150 g', 'tkpi'], ['Sambal bawang', '25 g', 'ai']] },
]
const foodKeys: [string, string[]][] = [
  ['Soto Ayam', ['soto']], ['Gado-gado', ['gado']], ['Martabak Manis', ['martabak', 'terang bulan']], ['Mie Instan Goreng', ['mie instan', 'mi instan', 'indomie', 'mie goreng']],
  ['Nasi Padang Rendang', ['padang', 'rendang']], ['Nasi Goreng', ['nasi goreng', 'nasgor']], ['Bakso Sapi', ['bakso']], ['Sate Ayam', ['sate']], ['Pecel Sayur', ['pecel']],
  ['Bubur Ayam', ['bubur']], ['Es Teh Manis', ['es teh', 'teh manis']], ['Ayam Geprek', ['geprek']],
]
const allFoods = () => [...samples, ...moreFoods]
function findFoods(s: string): Ggl[] {
  const hits = foodKeys.map(([n, ks]) => ({ n, at: Math.min(...ks.map(k => { const x = s.indexOf(k); return x < 0 ? 1e9 : x })) })).filter(h => h.at < 1e9).sort((a, b) => a.at - b.at)
  return hits.map(h => allFoods().find(f => f.name === h.n)!).filter(Boolean)
}
const swapTips: Record<string, string> = {
  'Soto Ayam': 'minta kuah bening tanpa santan, kurangi garam & tambah tauge',
  'Martabak Manis': 'bagi 1 potong saja, tanpa SKM & meses, ganti topping pisang',
  'Mie Instan Goreng': 'pakai separuh bumbu, tambah sayur dan telur rebus',
  'Nasi Padang Rendang': 'nasi setengah, pilih ayam pop atau ikan bakar, minta kuah sedikit',
  'Nasi Goreng': 'kurangi kecap & minyak, tambah sayur dan telur rebus',
  'Bakso Sapi': 'kurangi kuah & mi, tambah sawi, jangan tambah vetsin',
  'Sate Ayam': 'bumbu kacang sedikit, lontong setengah porsi',
  'Bubur Ayam': 'tanpa cakwe & kerupuk, kecap asin sedikit',
  'Es Teh Manis': 'teh tawar dingin atau gula maksimal 1 sdt',
  'Ayam Geprek': 'pilih ayam bakar, nasi setengah, tambah lalapan',
}
const foodChips = ['Cek GGL nasi goreng', 'Kalori nasi padang', 'Bandingkan bakso vs soto']

function replyText(q: string, p: Prof): Msg {
  const s = q.toLowerCase()
  const foods = findFoods(s)
  const f = foods[0]
  const has = (...k: string[]) => k.some(x => s.includes(x))
  if (has('kesehatan', 'profil', 'bmi', 'oke nggak', 'nutrisiku')) return { ...healthSummary(p), chips: ['Buatkan rencana menu hari ini', 'Cek GGL makan siangku'] }

  // Meal plan with parsed preferences
  if (has('menu', 'rencana', 'meal plan', 'makan apa', 'diet') && !has('catat', 'banding', 'alternatif')) {
    const pref = [has('protein') && 'Tinggi protein', has('rendah kalori', 'diet', 'turun berat', 'kurus') && 'Rendah kalori', has('vegetarian', 'vegan', 'tanpa daging') && 'Vegetarian', has('serat') && 'Tinggi serat', has('rendah garam', 'garam', 'hipertensi', 'darah tinggi') && 'Rendah garam'].filter(Boolean) as string[]
    const k = s.match(/(\d{3,4})\s*(k?kal|kalori)/)
    const target = k ? +k[1] : undefined
    const asked = [...pref.map(x => x.toLowerCase()), target && `${target} kkal`].filter(Boolean)
    return { role: 'ai', mood: 'excited', plan: true, planOpts: { pref, target }, text: `${asked.length ? `Oke, menu ${asked.join(', ')}` : 'Ini rencana menu hari ini'}, sudah aku sesuaikan${p.allergies.length ? ` dengan alergi ${p.allergies.join(', ')}` : ''}${p.conditions.length ? ` dan kondisi ${p.conditions.join(', ')}` : ''}. Klik opsi di tiap waktu makan, totalnya langsung terhitung.`, chips: ['Menu rendah garam', 'Menu vegetarian', 'Menu tinggi protein 1800 kkal'] }
  }

  // Log a food to the diary
  if (f && has('catat', 'tambah ke diary', 'simpan', 'log ')) return { role: 'ai', mood: 'happy', log: f, text: `Siap, ${f.name} (${f.kcal} kkal) sudah aku catat ke Food Diary hari ini.`, chips: [`Alternatif lebih sehat untuk ${f.name.toLowerCase()}`, 'Buatkan rencana menu hari ini'] }

  // Compare two foods
  if (foods.length >= 2 || (f && has('banding', ' vs ', 'atau mana'))) {
    const [a, b] = foods.length >= 2 ? foods : [f, allFoods().find(x => x.score === 'baik' && x.name !== f.name)!]
    const score = (g: Ggl) => g.sugar / 25 + g.salt / 2 + g.fat / 33
    const win = score(a) <= score(b) ? a : b, lose = win === a ? b : a
    return { role: 'ai', mood: 'thinking', compare: [a, b], text: `Kamu tanya ${a.name} vs ${b.name}. Dari sisi GGL, ${win.name} lebih aman: kalorinya ${win.kcal} vs ${lose.kcal} kkal dan garamnya ${win.salt} vs ${lose.salt} g.${lose.allergens.some(x => p.allergies.includes(x)) ? ` Ingat, ${lose.name} juga mengandung alergenmu.` : ''}`, chips: [`Catat ${win.name.toLowerCase()} ke diary`, `Cek nutrisi ${win.name.toLowerCase()}`, `Alternatif lebih sehat untuk ${lose.name.toLowerCase()}`] }
  }

  // Healthier alternative
  if (f && has('alternatif', 'lebih sehat', 'pengganti', 'ganti', 'sehatnya')) {
    const alt = allFoods().filter(x => x.name !== f.name && !x.allergens.some(a => p.allergies.includes(a))).sort((a, b) => (a.salt + a.sugar / 10 + a.fat / 10) - (b.salt + b.sugar / 10 + b.fat / 10))[0]
    return { role: 'ai', mood: 'calm', compare: [f, alt], text: `Kalau lagi pengin ${f.name}, coba ini: ${swapTips[f.name] ?? 'kurangi porsi dan tambah sayur'}. Atau ganti dengan ${alt.name}, yang lebih rendah GGL (${alt.kcal} kkal, garam ${alt.salt} g).`, chips: [`Catat ${alt.name.toLowerCase()} ke diary`, `Cek GGL ${alt.name.toLowerCase()}`] }
  }

  // GGL check from text
  if (has('ggl', 'gula', 'garam', 'lemak', 'sodium', 'natrium')) {
    if (!f) return { role: 'ai', mood: 'thinking', text: 'Makanan apa yang mau aku cek GGL-nya? Ketik namanya (mis. "GGL nasi goreng") atau upload fotonya, nanti aku hitungkan gula, garam, dan lemaknya per porsi.', chips: ['__photo_ggl__', 'Cek GGL nasi goreng', 'Cek GGL bakso', 'Cek GGL es teh manis'] }
    const al = f.allergens.some(a => p.allergies.includes(a)) || f.sugar > 30 || f.salt > 4
    return { role: 'ai', mood: al ? 'angry' : f.score === 'buruk' ? 'sad' : f.score === 'baik' ? 'excited' : 'calm', ggl: f, text: `GGL ${f.name} per porsi: gula ${f.sugar} g, garam ${f.salt} g, lemak ${f.fat} g.\n\n${analysisText(f, p)}`, chips: [`Catat ${f.name.toLowerCase()} ke diary`, `Alternatif lebih sehat untuk ${f.name.toLowerCase()}`, `Cek nutrisi ${f.name.toLowerCase()}`] }
  }

  // Nutrition / calories from text (also when only a food name is typed)
  if (f || has('nutrisi', 'gizi', 'kalori', 'kkal', 'protein', 'vitamin', 'karbo', 'serat')) {
    if (!f) return { role: 'ai', mood: 'thinking', text: 'Mau cek nutrisi makanan apa? Ketik namanya atau upload fotonya. Nanti aku tampilkan kalori, makro, vitamin, dan mineral (%AKG) dari data TKPI.', chips: ['__photo_nutri__', 'Kalori nasi padang', 'Nutrisi pecel', 'Protein sate ayam'] }
    const focus = has('protein') ? `Proteinnya ${f.protein} g. ` : has('kalori', 'kkal') ? `Kalorinya ${f.kcal} kkal per porsi. ` : has('serat') ? `Seratnya ${f.fiber} g. ` : ''
    return { role: 'ai', mood: personalCheck(f, p).risky ? 'sad' : f.score === 'baik' ? 'excited' : 'happy', nutri: f, text: `${focus}${nutriText(f, p)}`, chips: [`Cek GGL ${f.name.toLowerCase()}`, `Bandingkan ${f.name.toLowerCase()} vs gado-gado`, `Catat ${f.name.toLowerCase()} ke diary`] }
  }

  const al = p.allergies.find(a => s.includes(a.toLowerCase()))
  if (al) return { role: 'ai', mood: 'angry', text: `Eh, tunggu! ${al} ada di daftar alergimu. Aku nggak mau kamu kenapa-kenapa. Mau aku carikan pengganti yang aman?`, chips: ['Buatkan rencana menu hari ini'] }
  if (has('dingin', 'es ')) return { role: 'ai', mood: 'cold', text: 'Brrr, dingin! Minuman dingin manis bikin gula naik diam-diam. Coba wedang jahe tanpa gula biar hangat dan sehat ya.', chips: ['Cek GGL es teh manis'] }
  if (has('makasih', 'terima kasih', 'sayang')) return { role: 'ai', mood: 'love', text: 'Aww, sama-sama! Aku senang banget bisa nemenin perjalanan sehatmu.' }
  if (has('sedih', 'gagal', 'gendut')) return { role: 'ai', mood: 'sad', text: 'Aku ngerti rasanya. Tapi progres itu bukan garis lurus. Setiap pilihan kecil yang baik tetap dihitung, dan aku di sini nemenin kamu.', chips: ['Buatkan rencana menu hari ini'] }
  return { role: 'ai', mood: 'neutral', text: `Hmm, aku belum menemukan makanan di "${q.length > 50 ? q.slice(0, 50) + '…' : q}". Aku paling jago soal: cek GGL, cek nutrisi, bandingkan makanan, cari alternatif lebih sehat, dan rencana menu. Coba salah satu ini:`, chips: foodChips.concat('Buatkan rencana menu hari ini') }
}

const initDiary: Entry[] = [
  { id: 1, time: '07:30', meal: 'Sarapan', name: 'Bubur ayam', kcal: 320 },
  { id: 2, time: '10:00', meal: 'Snack', name: 'Pisang + teh tawar', kcal: 110 },
  { id: 3, time: '12:40', meal: 'Makan siang', name: 'Nasi, pecel, tempe', kcal: 540 },
  { id: 4, time: '16:00', meal: 'Snack', name: 'Kue lumpur', kcal: 270 },
]
const initHistory = [
  { id: 1, day: 'Hari ini', title: 'Analisis Soto Ayam makan siang', mood: 'neutral' as Mood },
  { id: 2, day: 'Hari ini', title: 'Cek gula di teh kemasan', mood: 'sad' as Mood },
  { id: 3, day: 'Kemarin', title: 'Resep MPASI tekstur puree', mood: 'happy' as Mood },
  { id: 4, day: 'Kemarin', title: 'Kalori Rendang 1 porsi', mood: 'neutral' as Mood },
  { id: 5, day: '7 hari lalu', title: 'Menu tinggi protein lansia', mood: 'excited' as Mood },
  { id: 6, day: '7 hari lalu', title: 'Jajanan sehat anak sekolah', mood: 'happy' as Mood },
]

const MODELS: Record<string, { short: string; desc: string; perks: string[]; delay: number; color: string }> = {
  'Nuri Vision': { short: 'Foto & resep Nusantara', desc: 'Mode utama. Analisis foto lengkap: urai bahan TKPI, kartu GGL atau nutrisi, dan sumber data.', perks: ['Kartu analisis lengkap', 'Rencana menu interaktif', 'Respon ±1,5 dtk'], delay: 1500, color: 'from-[#a99bff] to-[#f3a6d8]' },
  'Nuri Clinical': { short: 'Mode ketat penyakit kronis', desc: 'Wajib profil kesehatan lengkap. Setiap analisis menampilkan GGL dan nutrisi sekaligus, batas per makan lebih ketat, plus ringkasan untuk dokter.', perks: ['GGL + nutrisi sekaligus', 'Batas ketat sesuai kondisi', 'Bagikan ke dokter'], delay: 2200, color: 'from-[#6fd3a4] to-[#6fb4ff]' },
  'Nuri Lite': { short: 'Cepat & ringkas', desc: 'Jawaban satu-dua kalimat tanpa kartu detail. Cocok untuk cek cepat sambil jalan.', perks: ['Jawaban singkat', 'Tanpa kartu detail', 'Respon ±0,5 dtk'], delay: 500, color: 'from-[#ffd66b] to-[#ff9a6b]' },
}
const STORE = 'nutrichat-v1'
const saved = (() => { try { return JSON.parse(localStorage.getItem(STORE) || 'null') } catch { return null } })()
const blankProfile: Prof = { name: '', phone: '', gender: 'Wanita', age: '', weight: '', height: '', activity: 'Sedang', conditions: [], allergies: [], meds: '', notes: '' }

function EmptyState({ mood = 'happy', title, desc, primary, secondary, children }: { mood?: Mood; title: string; desc: string; primary?: [string, () => void]; secondary?: [string, () => void]; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <Nuri size={110} mood={mood} />
      <h3 className="mt-8 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">{desc}</p>
      {(primary || secondary) && <div className="mt-6 flex flex-wrap justify-center gap-2">
        {primary && <button onClick={primary[1]} className="rounded-full bg-[#141418] px-4 py-2.5 text-sm font-medium text-white hover:bg-black">{primary[0]}</button>}
        {secondary && <button onClick={secondary[1]} className="rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-50">{secondary[0]}</button>}
      </div>}
      {children}
    </div>
  )
}

const PREFS = 'nutrichat-prefs'
const savedPrefs: { theme?: 'light' | 'dark'; lang?: Lang } = (() => { try { return JSON.parse(localStorage.getItem(PREFS) || '{}') } catch { return {} } })()
function usePrefs() {
  const [theme, setTheme] = useState<'light' | 'dark'>(savedPrefs.theme ?? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [lang, setLg] = useState<Lang>(savedPrefs.lang ?? 'id')
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.style.colorScheme = theme }, [theme])
  useEffect(() => { setLang(lang) }, [lang])
  useEffect(() => { localStorage.setItem(PREFS, JSON.stringify({ theme, lang })) }, [theme, lang])
  return { theme, setTheme, lang, setLang: setLg }
}
// Compact language + theme switch used in the app header and on onboarding
function PrefToggles({ prefs }: { prefs: ReturnType<typeof usePrefs> }) {
  const dark = prefs.theme === 'dark'
  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-0.5">
      <div className="flex rounded-full" title="Ganti bahasa" data-no-tr>
        {(['id', 'en'] as const).map(l => <button key={l} onClick={() => prefs.setLang(l)} aria-pressed={prefs.lang === l} className={`h-7 rounded-full px-2 text-[10px] font-semibold uppercase tracking-wide transition-colors ${prefs.lang === l ? 'bg-[#f3f0ff] text-[#5b4ee0]' : 'text-neutral-400 hover:text-neutral-600'}`}>{l}</button>)}
      </div>
      <button onClick={() => prefs.setTheme(dark ? 'light' : 'dark')} title={dark ? 'Mode terang' : 'Mode gelap'} className="grid size-7 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700">
        <Icon d={dark ? 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66l1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14l-1.41-1.41M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z'} className="size-3.5" />
      </button>
    </div>
  )
}

export default function App() {
  const prefs = usePrefs()
  const [view, setView] = useState<View>('chat')
  const [onboarded, setOnboarded] = useState<boolean>(saved?.onboarded ?? false)
  const [phase, setPhase] = useState(phases.find(p => p.id === saved?.phaseId) ?? phases[4])
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [diary, setDiary] = useState<Entry[]>(saved?.diary ?? [])
  const [intake, setIntake] = useState<{ sugar: number; salt: number; fat: number }>(saved?.intake ?? { sugar: 0, salt: 0, fat: 0 })
  const [hist, setHist] = useState<typeof initHistory>(saved?.hist ?? [])
  const [growth, setGrowth] = useState<GrowthPt[]>(saved?.growth ?? [])
  const [q, setQ] = useState('')
  const [side, setSide] = useState(true)
  const [mobileNav, setMobileNav] = useState(false)
  const [voice, setVoice] = useState(false)
  const [help, setHelp] = useState(false)
  const [modelOpen, setModelOpen] = useState(false)
  const [model, setModel] = useState<string>(saved?.model ?? 'Nuri Vision')
  const [modal, setModal] = useState<null | 'upgrade' | 'logout'>(null)
  const [toast, setToast] = useState('')
  const [profile, setProfile] = useState<Prof>(saved?.profile ?? { ...blankProfile, name: 'Putri Wulan' })
  const fileRef = useRef<HTMLInputElement>(null)
  const target = tdeeOf(profile) || (phase.id === 'dewasa' ? (profile.gender === 'Pria' ? 2100 : 1800) : phase.kcal)
  const end = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const eaten = diary.reduce((a, e) => a + e.kcal, 0)
  const lastMood: Mood = thinking ? 'thinking' : [...msgs].reverse().find(m => m.role === 'ai')?.mood ?? 'happy'

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, thinking])
  useEffect(() => { localStorage.setItem(STORE, JSON.stringify({ onboarded, phaseId: phase.id, diary, intake, hist, growth, model, profile })) }, [onboarded, phase, diary, intake, hist, growth, model, profile])
  const complete = !!(profile.weight && profile.height && profile.age)
  const [pending, setPending] = useState<string | null>(null)
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2400); return () => clearTimeout(t) }, [toast])
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSide(true); setTimeout(() => searchRef.current?.focus(), 0) } }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])

  const go = (v: View) => { setView(v); setMobileNav(false) }
  const [helpTopic, setHelpTopic] = useState('ggl')
  const openHelp = (t: string) => { setHelpTopic(t); go('help') }
  const now = () => new Date().toLocaleTimeString('id', { hour: '2-digit', minute: '2-digit' })
  const logFood = (g: Ggl) => {
    setDiary(d => [...d, { id: Date.now(), time: now(), meal: 'Dari foto', name: g.name, kcal: g.kcal }])
    setIntake((i: { sugar: number; salt: number; fat: number }) => ({ sugar: i.sugar + g.sugar, salt: i.salt + g.salt, fat: i.fat + g.fat }))
  }
  const send = (text: string) => {
    if (!text.trim() || thinking) return
    go('chat')
    if (msgs.length === 0) setHist(h => [{ id: Date.now(), day: 'Hari ini', title: text.slice(0, 40), mood: 'happy' }, ...h])
    setMsgs(m => [...m, { role: 'user', text }]); setInput(''); setThinking(true)
    const M = MODELS[model]
    setTimeout(() => {
      let rep = replyText(text, profile)
      if (rep.log) logFood(rep.log)
      if (model === 'Nuri Lite') rep = { ...rep, ggl: undefined, nutri: undefined, compare: undefined, plan: false, text: rep.plan ? 'Menu cepat: sarapan oat + buah, siang nasi merah + ayam bakar + sayur, malam sup tahu sayur. Mau versi interaktif? Pindah ke Nuri Vision.' : rep.text.split(/(?<=[.!?])\s/)[0] }
      if (model === 'Nuri Clinical') {
        rep = !complete
          ? { role: 'ai', mood: 'thinking', action: 'profile', text: 'Mode Clinical butuh status kesehatan lengkap (usia, BB, TB, riwayat penyakit, alergi) supaya rekomendasiku aman secara klinis. Lengkapi dulu ya!' }
          : { ...rep, action: 'doctor', text: `${rep.text}\n\nCatatan klinis: rekomendasi disesuaikan dengan ${profile.conditions.length ? profile.conditions.join(', ') : 'profil sehat'}${profile.meds ? ` dan obat ${profile.meds}` : ''}. Bukan pengganti diagnosis dokter.` }
      }
      setMsgs(m => [...m, { ...rep, model }]); setThinking(false)
    }, M.delay)
  }
  const photoMode = useRef<'ggl' | 'nutri'>('ggl')
  const pick = (m: 'ggl' | 'nutri') => { photoMode.current = m; fileRef.current?.click() }
  const onPhoto = (f?: File) => {
    if (!f) return
    const mode = photoMode.current
    go('chat')
    const img = URL.createObjectURL(f)
    const g = samples[Math.floor(Math.random() * samples.length)]
    if (msgs.length === 0) setHist(h => [{ id: Date.now(), day: 'Hari ini', title: `${mode === 'ggl' ? 'Cek GGL' : 'Cek nutrisi'}: ${g.name}`, mood: g.score === 'buruk' ? 'sad' : 'happy' }, ...h])
    setMsgs(m => [...m, { role: 'user', text: mode === 'ggl' ? 'Tolong cek GGL makanan ini' : 'Tolong cek kandungan nutrisi makanan ini', img }]); setThinking(true)
    setTimeout(() => {
      const lite = model === 'Nuri Lite', clin = model === 'Nuri Clinical'
      const hitA = g.allergens.filter(a => profile.allergies.includes(a))
      setMsgs(m => [...m, { role: 'ai', model, chips: mode === 'ggl' ? [`Alternatif lebih sehat untuk ${g.name.toLowerCase()}`, `Cek nutrisi ${g.name.toLowerCase()}`] : [`Cek GGL ${g.name.toLowerCase()}`, `Bandingkan ${g.name.toLowerCase()} vs pecel`], action: clin ? 'doctor' : undefined, text: lite ? `${g.name} ≈ ${g.kcal} kkal · GGL ${g.score}${hitA.length ? ` · ⚠ alergen ${hitA.join(', ')}` : ''}.` : (mode === 'ggl' || clin ? analysisText(g, profile) : nutriText(g, profile)) + (clin ? `\n\nMode Clinical: batas per makan diperketat${profile.conditions.length ? ` untuk ${profile.conditions.join(', ')}` : ''}. Gula maks ${profile.conditions.includes('Diabetes') ? 8 : 12} g · garam maks ${profile.conditions.includes('Hipertensi') ? 1.5 : 2} g.` : ''), ...(lite ? {} : clin ? { ggl: g, nutri: g } : mode === 'ggl' ? { ggl: g } : { nutri: g }), mood: g.allergens.some(a => profile.allergies.includes(a)) || (g.score === 'buruk' && (g.sugar > 30 || g.salt > 4)) ? 'angry' : g.score === 'buruk' || personalCheck(g, profile).risky ? 'sad' : g.score === 'baik' ? 'excited' : 'calm' }])
      logFood(g); setThinking(false)
    }, MODELS[model].delay + 300)
    if (fileRef.current) fileRef.current.value = ''
  }
  const exportReport = () => go('report')

  const filtered = hist.filter(h => h.title.toLowerCase().includes(q.toLowerCase()))
  const nav: [View, string][] = [['dashboard', 'Dashboard Gizi'], ['diary', 'Food Diary'], ['health', 'Status Kesehatan'], ['growth', 'Growth Chart'], ['history', 'Riwayat'], ['report', 'Laporan Kesehatan']]
  const titles: Record<string, string> = { ggl: 'Detail GGL', profile: 'Profil', help: 'Pusat Bantuan', report: 'Laporan Kesehatan' }
  const addPlan = (items: { meal: string; name: string; kcal: number }[]) => { setDiary(d => [...d, ...items.map((x, i) => ({ id: Date.now() + i, time: { Sarapan: '07:00', 'Makan siang': '12:30', 'Makan malam': '19:00', Snack: '15:30' }[x.meal] ?? now(), ...x }))]); setToast('Rencana menu disimpan ke Food Diary') }

  const sidebar = (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-[28px] bg-white/60 p-3">
        <div className="flex items-center justify-between px-1 pb-3">
          <button onClick={() => { setMsgs([]); go('chat') }} title="Ke beranda" className="flex items-center gap-2"><Nuri size={30} glow={false} /><span className="text-lg font-semibold tracking-tight">NutriChat</span></button>
          <button onClick={() => { setSide(false); setMobileNav(false) }} title="Tutup sidebar" className="rounded-full p-1.5 text-neutral-500 hover:bg-white"><Icon d={icons.side} /></button>
        </div>
        <button onClick={() => { setMsgs([]); go('chat') }} className="btn-primary flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm"><Icon d={icons.plus} />Mulai chat</button>
      </div>
      <nav className="rounded-[28px] bg-white/60 p-3">
        <div className="flex items-center justify-between gap-2 px-1 pb-2"><p className="text-xs font-medium text-neutral-500">Menu</p><PrefToggles prefs={prefs} /></div>
        <div className={`${card} space-y-0.5 p-1.5 text-sm`}>
          {nav.map(([v, n]) => (
            <button key={v} onClick={() => go(v)} className={`flex w-full items-center gap-3 rounded-full px-2.5 py-2 transition ${view === v ? 'bg-[#f3f0ff] font-medium text-[#5b4ee0]' : 'text-neutral-700 hover:bg-neutral-50'}`}><Icon d={icons[v]} />{n}</button>
          ))}
        </div>
      </nav>
      <div className="flex min-h-0 flex-1 flex-col rounded-[28px] bg-white/60 p-3">
        <div className="flex items-center justify-between px-1 pb-2 pt-1"><p className="text-xs font-medium text-neutral-500">Riwayat chat</p><button onClick={() => go('history')} className="text-xs text-[#6b5ce7] hover:underline">Semua →</button></div>
        <div className={`${card} flex min-h-0 flex-1 flex-col p-1.5 text-[13px]`}>
            <label className="mb-1.5 flex items-center gap-2 rounded-full border border-transparent bg-neutral-50 px-3 py-2 text-sm text-neutral-400 focus-within:border-[#c9bfff]">
            <Icon d={icons.search} /><input ref={searchRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Cari riwayat" className="w-full bg-transparent text-neutral-800 outline-none placeholder:text-neutral-400" />
            {q ? <button onClick={() => setQ('')}><Icon d={icons.x} className="size-3.5" /></button> : <kbd className="rounded-full bg-[#efeaff] px-1.5 text-[10px] text-[#7b6cf0]">⌘K</kbd>}
          </label>
          <div className="min-h-0 flex-1 overflow-y-auto">
          {hist.length === 0 ? <p className="px-2.5 py-3 text-xs leading-relaxed text-neutral-400">Belum ada percakapan. Mulai chat dengan Nuri, nanti muncul di sini.</p>
            : filtered.length === 0 ? <p className="px-2.5 py-3 text-xs text-neutral-400">Tidak ada hasil untuk "{q}"</p> : null}
          {['Hari ini', 'Kemarin', '7 hari lalu'].map(day => {
            const items = filtered.filter(h => h.day === day)
            return items.length ? (
              <div key={day} className="mb-2">
                <p className="px-2.5 pb-1 pt-1.5 text-[11px] text-neutral-400">{day}</p>
                {items.map(h => <button key={h.id} onClick={() => send(h.title)} className="block w-full truncate rounded-full px-2.5 py-1.5 text-left text-neutral-700 hover:bg-neutral-50">{h.title}</button>)}
              </div>
            ) : null
          })}
          </div>
        </div>
      </div>
      <div className={`flex items-center gap-3 rounded-[28px] border border-neutral-100 bg-white p-3 ${view === 'profile' ? 'ring-2 ring-[#c9bfff]' : ''}`}>
        <button onClick={() => go('profile')} className="flex min-w-0 flex-1 items-center gap-3 text-left" title="Lihat profil">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#cfe0ff] to-[#f6c4e4] text-sm font-semibold text-[#5a4fc8]">{initials(profile.name)}</div>
          <p className="min-w-0 flex-1 truncate text-sm font-medium">{profile.name}</p>
        </button>
        <button onClick={() => setModal('logout')} title="Keluar dari akun" className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-neutral-500 transition hover:bg-rose-50 hover:text-rose-500"><Icon d={icons.out} className="size-3.5" />Keluar</button>
      </div>
    </div>
  )

  // Send the question typed on the landing page once the user is logged in
  useEffect(() => { if (onboarded && pending) { const t = pending; setPending(null); setTimeout(() => t === '__photo__' ? setToast('Siap! Tekan "Cek GGL" di kolom chat untuk upload foto') : send(t), 300) } }, [onboarded, pending]) // eslint-disable-line
  if (!onboarded) return <><Onboarding toggles={<PrefToggles prefs={prefs} />} initial={profile} onDone={(p, ph, first) => { setProfile(p); setPhase(ph); setOnboarded(true); setMsgs([]); go('chat'); setPending(first); setToast(`Selamat datang, ${p.name.split(' ')[0]}!`) }} /></>

  return (
    <div className="min-h-[100dvh] app-bg bg-[linear-gradient(160deg,#e9e3fb,#f6eef9_40%,#dfe6fb)] text-[#1b1b22] md:p-6">
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => onPhoto(e.target.files?.[0])} />
      <div className="mx-auto flex h-[100dvh] max-w-[1400px] gap-3 md:h-[calc(100vh-48px)] md:rounded-[28px] md:border md:border-white/70 md:bg-white/40 md:p-3 md:shadow-[0_30px_80px_-30px_rgba(120,100,200,.35)] md:backdrop-blur-xl">
        {side && <aside className="hidden w-72 shrink-0 flex-col md:flex">{sidebar}</aside>}
        {mobileNav && <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={() => setMobileNav(false)}><aside onClick={e => e.stopPropagation()} className="pop flex h-full w-72 flex-col bg-[#f5f2fc] p-3">{sidebar}</aside></div>}

        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-white md:rounded-[28px]">
          <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setMobileNav(true)} className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 md:hidden"><Icon d={icons.menu} /></button>
              {!side && <button onClick={() => setSide(true)} title="Buka sidebar" className="hidden rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 md:block"><Icon d={icons.side} /></button>}
              {view === 'chat' ? (
                <div className="relative">
                  <button onClick={() => setModelOpen(o => !o)} className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50">
                    <span className={`size-4 rounded-full bg-gradient-to-br ${MODELS[model].color}`} />{model}<Icon d={icons.down} className="size-3.5" />
                  </button>
                  {modelOpen && (
                    <div className="pop absolute left-0 top-11 z-30 w-80 max-w-[calc(100vw-5rem)] rounded-[24px] border border-neutral-100 bg-white p-2 shadow-xl">
                      {Object.entries(MODELS).map(([n, mm]) => (
                        <button key={n} onClick={() => { setModel(n); setModelOpen(false); setToast(`Beralih ke ${n}`) }} className={`flex w-full items-start gap-3 rounded-3xl px-3 py-2.5 text-left hover:bg-neutral-50 ${model === n ? 'bg-[#faf8ff]' : ''}`}>
                          <span className={`mt-0.5 size-4 shrink-0 rounded-full bg-gradient-to-br ${mm.color}`} />
                          <span className="min-w-0 flex-1"><span className="flex items-center justify-between text-sm font-medium">{n}{model === n && <Icon d={icons.check} className="size-4 text-[#6b5ce7]" />}</span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-neutral-500">{mm.desc}</span>
                            <span className="mt-1.5 flex flex-wrap gap-1">{mm.perks.map(pk => <span key={pk} className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-600">{pk}</span>)}</span></span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : <div className="flex min-w-0 items-center gap-2">{(view === 'ggl' || view === 'help' || view === 'report') && <button onClick={() => go(view === 'help' ? 'chat' : 'dashboard')} className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100" title="Kembali"><Icon d={icons.arrow} className="size-4 rotate-180" /></button>}<h2 className="truncate text-base font-semibold tracking-tight md:text-lg">{titles[view] ?? nav.find(n => n[0] === view)?.[1]}</h2></div>}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 lg:flex"><Icon d={icons.shield} className="size-3.5" />Terenkripsi · UU PDP</span>
              <button onClick={() => setModal('upgrade')} className="btn-primary flex h-9 items-center gap-1.5 rounded-full px-3 sm:px-3.5" title="Upgrade"><Icon d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" className="size-3.5" /><span className="hidden sm:inline">Upgrade</span></button>
            </div>
          </header>

          {view === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto px-4 md:px-5">
                {msgs.length === 0 ? (
                  <div className="mx-auto flex max-w-3xl flex-col items-center pb-6 pt-6 text-center">
                    <Nuri size={130} mood={thinking ? 'thinking' : 'happy'} />
                    <p className="mt-8 bg-gradient-to-r from-[#9a8cff] to-[#e79bd2] bg-clip-text text-3xl font-medium tracking-tight text-transparent">Halo, {profile.name.split(' ')[0]}, aku Nuri</p>
                    <h1 className="mt-1 text-3xl font-medium tracking-tight md:text-4xl">Mau makan apa hari ini?</h1>
                    <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                      {phases.map(p => <button key={p.id} onClick={() => setPhase(p)} className={`rounded-full border px-3 py-1 text-xs transition ${phase.id === p.id ? 'border-[#c9bfff] bg-[#f3f0ff] text-[#5b4ee0]' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}>{p.label} <span className="opacity-60">{p.age}</span></button>)}
                    </div>
                    <p className="mt-2 text-xs text-neutral-400">Fokus: {phase.focus}</p>
                  </div>
                ) : (
                  <div className="mx-auto max-w-3xl space-y-5 py-4">
                    {msgs.map((m, i) => m.role === 'user' ? (
                      <div key={i} className="pop flex flex-col items-end gap-2">
                        {m.img && <img src={m.img} alt="Foto makanan" className="max-h-48 rounded-2xl object-cover" />}
                        <p data-no-tr className="max-w-[75%] rounded-3xl rounded-br-lg bg-[#f3f0ff] px-4 py-2.5 text-sm">{m.text}</p>
                      </div>
                    ) : (
                      <div key={i} className="pop flex gap-3">
                        <Nuri size={40} mood={m.mood} glow={false} />
                        <div className="max-w-[85%] whitespace-pre-line text-sm leading-relaxed text-neutral-700">
                          <p className="mb-0.5 flex items-center gap-1.5 text-xs font-medium text-[#7b6cf0]">Nuri{m.model && m.model !== 'Nuri Vision' && <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] font-normal text-neutral-500">{m.model.replace('Nuri ', '')}</span>}</p>{m.text}
                          {m.action === 'profile' && <button onClick={() => go('health')} className="mt-3 block rounded-full bg-[#141418] px-3 py-2 text-xs font-medium text-white">Lengkapi status kesehatan →</button>}
                          {m.action === 'doctor' && <button onClick={exportReport} className="mt-3 block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100">Unduh ringkasan untuk dokter</button>}
                          {m.ggl && <GglCard g={m.ggl} />}
                          {m.nutri && <NutriCard g={m.nutri} />}
                          {m.plan && <MealPlanner profile={profile} target={m.planOpts?.target ?? target} initPref={m.planOpts?.pref ?? []} onSave={addPlan} />}
                          {m.compare && <CompareCard a={m.compare[0]} b={m.compare[1]} />}
                          {m.chips && i === msgs.length - 1 && !thinking && (
                            <div className="mt-3 flex flex-wrap gap-1.5">{m.chips.map(c => c.startsWith('__photo') ? (
                              <button key={c} onClick={() => pick(c === '__photo_ggl__' ? 'ggl' : 'nutri')} className="flex items-center gap-1.5 rounded-full border border-[#d9d1ff] bg-[#f5f2ff] px-3 py-1.5 text-xs font-medium text-[#5b4ee0] hover:bg-[#ece7ff]"><Icon d={icons.cam} className="size-3.5" />Upload foto</button>
                            ) : <button key={c} onClick={() => send(c)} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 transition hover:border-[#c9bfff] hover:bg-[#faf8ff]">{c}</button>)}</div>
                          )}
                          {(m.ggl || m.nutri) && <p className="mt-2 text-xs text-emerald-600">Sudah dicatat ke Food Diary</p>}
                        </div>
                      </div>
                    ))}
                    {thinking && <div className="flex items-center gap-3"><Nuri size={40} mood="thinking" glow={false} /><span className="shimmer text-sm">Nuri sedang menganalisis…</span></div>}
                    <div ref={end} />
                  </div>
                )}
              </div>
              <div className="px-4 pb-4 md:px-5">
                <div className="mx-auto max-w-3xl">
                  <div className="rounded-[28px] border border-neutral-200/80 bg-white p-3 pl-4">
                    <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }} rows={2} style={{ paddingTop: 10 }} placeholder={model === 'Nuri Lite' ? 'Tanya cepat, jawab singkat…' : model === 'Nuri Clinical' ? 'Tanya dengan mempertimbangkan kondisi kesehatanmu…' : 'Tanya Nuri soal gizi, atau upload foto makananmu…'} className="w-full resize-none bg-transparent px-1 text-sm outline-none placeholder:text-neutral-400" />
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
                        {([[icons.cam, 'Cek GGL', () => pick('ggl')], [icons.leaf, 'Cek nutrisi', () => pick('nutri')], [icons.diary, 'Rencana menu', () => send('Buatkan rencana menu hari ini')]] as const).map(([ic, l, fn]) => (
                          <button key={l} onClick={fn} title={l} className="flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs text-neutral-600 transition hover:bg-[#f3f0ff] hover:text-[#5b4ee0]"><Icon d={ic} className="size-4" /><span className="hidden sm:inline">{l}</span></button>
                        ))}
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button onClick={() => setVoice(true)} title="Voice chat" className="grid size-8 place-items-center rounded-full text-neutral-600 transition hover:bg-[#f3f0ff] hover:text-[#5b4ee0]"><Icon d={icons.mic} /></button>
                        <button onClick={() => send(input)} title="Kirim" className="btn-primary grid size-9 place-items-center rounded-full"><Icon d={icons.send} /></button>
                      </div>
                    </div>
                  </div>
                  {msgs.length === 0 && (
                    <><div className="mt-3 grid grid-cols-2 gap-2">
                      {[
                        ['Cek GGL dari Foto', 'ggl', icons.cam, () => pick('ggl')],
                        ['Cek Nutrisi dari Foto', 'nutri', icons.leaf, () => pick('nutri')],
                        ['Rencana Menu', 'menu', icons.diary, () => send('Buatkan rencana menu hari ini')],
                        ['Cek Nutrisiku', 'status', icons.profile, () => send('Cek kesehatan & nutrisiku, oke nggak?')],
                      ].map(([t, d, ic, fn]) => (
                        <div key={t as string} role="button" tabIndex={0} onClick={fn as () => void} onKeyDown={e => e.key === 'Enter' && (fn as () => void)()} className="group flex min-h-14 cursor-pointer items-center gap-2.5 rounded-2xl border border-neutral-200/80 bg-white px-3 py-2.5 text-left sm:gap-3 sm:px-4 transition hover:-translate-y-0.5 hover:border-[#d9d1ff] hover:shadow-md">
                          <Icon d={ic as string} className="size-5 shrink-0 text-[#7b6cf0]" /><p className="min-w-0 flex-1 text-[13px] font-medium leading-tight sm:text-sm">{t as string}</p>
                          <button onClick={e => { e.stopPropagation(); openHelp(d as string) }} title="Pelajari fitur ini" className="hidden sm:grid grid size-7 shrink-0 place-items-center rounded-full text-neutral-400 transition hover:bg-[#f3f0ff] hover:text-[#6b5ce7]"><Icon d={icons.arrow} className="size-4" /></button>
                        </div>
                      ))}
                    </div>
                    </>
                  )}
                  <p className="mt-3 text-center text-[11px] text-neutral-400"><button onClick={() => setModelOpen(true)} className="font-medium text-neutral-500 hover:text-[#6b5ce7]">{model}</button> <span className="hidden sm:inline">· {MODELS[model].short} </span>· Bukan pengganti diagnosis dokter<span className="hidden sm:inline">. Darurat: 119</span>.</p>
                </div>
              </div>
            </>
          )}

          {view === 'dashboard' && <Dashboard complete={complete} plan={() => send('Buatkan rencana menu hari ini')} phase={{ ...phase, kcal: target }} setPhase={setPhase} eaten={eaten} intake={intake} diary={diary} onPhoto={() => pick('ggl')} go={go} />}
          {view === 'ggl' && <GglDetail intake={intake} diary={diary} onPhoto={() => pick('ggl')} />}
          {view === 'report' && <ReportPage profile={profile} phase={phase} target={target} eaten={eaten} intake={intake} diary={diary} growth={growth} model={model} go={go} />}
          {view === 'help' && <HelpCenter topic={helpTopic} setTopic={setHelpTopic} run={k => ({ ggl: () => pick('ggl'), nutri: () => pick('nutri'), menu: () => send('Buatkan rencana menu hari ini'), status: () => send('Cek kesehatan & nutrisiku, oke nggak?') } as Record<string, () => void>)[k]?.()} />}
          {view === 'health' && <Profile section="kesehatan" go={go} profile={profile} setProfile={setProfile} phase={phase} setPhase={setPhase} toast={setToast} logout={() => setModal('logout')} ask={() => send('Cek kesehatan & nutrisiku, oke nggak?')} />}
          {view === 'profile' && <Profile section="diri" go={go} profile={profile} setProfile={setProfile} phase={phase} setPhase={setPhase} toast={setToast} logout={() => setModal('logout')} ask={() => send('Cek kesehatan & nutrisiku, oke nggak?')} />}
          {view === 'diary' && <Diary onPhoto={() => pick('nutri')} plan={() => send('Buatkan rencana menu hari ini')} diary={diary} setDiary={setDiary} target={phase.kcal} toast={setToast} />}
          {view === 'growth' && <Growth pts={growth} setPts={setGrowth} phase={phase} toast={setToast} />}
          {view === 'history' && <History startChat={() => { setMsgs([]); go('chat') }} hist={hist} setHist={setHist} open={t => send(t)} toast={setToast} />}
        </main>
        {view === 'chat' && <aside className="hidden w-72 shrink-0 overflow-y-auto xl:block"><Highlights eaten={eaten} target={target} intake={intake} go={go} profile={profile} /></aside>}
      </div>

      {/* Floating Nuri help desk */}
      <div className={`fixed right-3 z-40 flex flex-col items-end gap-3 md:bottom-5 md:right-5 bottom-4 ${view === 'chat' && !help ? 'max-md:hidden' : ''}`}>
        {help && <HelpDesk close={() => setHelp(false)} act={a => { setHelp(false); if (a === 'photo') pick('ggl'); else if (a === 'voice') setVoice(true); else if (a === 'export') exportReport(); else if (a === 'onboarding') setOnboarded(false); else go(a as View) }} />}
        {!help && <div className="pop hidden rounded-3xl rounded-br-lg bg-white px-3 py-2 text-xs shadow-lg sm:block">{lastMood === 'sad' ? 'Semangat ya, aku temani!' : 'Butuh bantuan? Tanya Nuri!'}</div>}
        <button onClick={() => setHelp(h => !h)} className="origin-bottom-right scale-[.65] rounded-full transition hover:scale-[.7] md:scale-100 md:hover:scale-105" title="Bantuan Nuri"><Nuri size={72} mood={help ? 'love' : lastMood} /></button>
      </div>

      {voice && <Voice close={() => setVoice(false)} onSend={t => { setVoice(false); send(t) }} />}
      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/25 p-4 backdrop-blur-sm" onClick={() => setModal(null)}>
          <div onClick={e => e.stopPropagation()} className="pop w-full max-w-sm rounded-[32px] bg-white p-7 text-center">
            <div className="flex justify-center"><Nuri size={90} mood={modal === 'logout' ? 'sad' : 'excited'} /></div>
            {modal === 'upgrade' ? (
              <><h3 className="mt-5 text-xl font-semibold">NutriChat Plus</h3><p className="mt-1 text-sm text-neutral-500">Analisis foto tanpa batas, mode klinis, dan konsultasi ahli gizi.</p><p className="mt-4 text-3xl font-semibold">Rp49.000<span className="text-sm font-normal text-neutral-400">/bulan</span></p>
                <button onClick={() => { setModal(null); setToast('Yay! Kamu sekarang NutriChat Plus') }} className="btn-primary mt-5 w-full rounded-full py-2.5 text-sm">Upgrade sekarang</button></>
            ) : (
              <><h3 className="mt-5 text-xl font-semibold">Yakin mau keluar?</h3><p className="mt-1 text-sm text-neutral-500">Nuri bakal kangen. Datanya tetap aman terenkripsi kok.</p>
                <button onClick={() => { setModal(null); setMsgs([]); setOnboarded(false); go('chat') }} className="mt-5 w-full rounded-full bg-rose-500 py-2.5 text-sm font-medium text-white">Keluar</button></>
            )}
            <button onClick={() => setModal(null)} className="mt-2 w-full rounded-full py-2 text-sm text-neutral-500 hover:bg-neutral-50">Batal</button>
          </div>
        </div>
      )}
      {toast && <div className="pop fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#141418] px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}
    </div>
  )
}

function Dashboard({ complete, plan, phase, setPhase, eaten, intake, diary, onPhoto, go }: { complete: boolean; plan: () => void; phase: typeof phases[0]; setPhase: (p: typeof phases[0]) => void; eaten: number; intake: { sugar: number; salt: number; fat: number }; diary: Entry[]; onPhoto: () => void; go: (v: View) => void }) {
  const week = [1820, 2140, 1650, 1980, 2300, 1760, eaten]
  if (diary.length === 0) {
    const steps: [string, string, boolean, () => void][] = [
      ['Lengkapi status kesehatan', 'Usia, BB, TB, alergi & riwayat penyakit', complete, () => go('health')],
      ['Catat makanan pertama', 'Foto makananmu atau tambah manual', false, onPhoto],
      ['Buat rencana menu', 'Menu harian sesuai target kalorimu', false, plan],
    ]
    return (
      <div className="flex-1 overflow-y-auto bg-[#faf9fe] p-4 pb-24 md:p-6">
        <div className={`${card} mx-auto max-w-xl`}>
          <EmptyState mood="happy" title="Dashboard-mu masih kosong" desc="Begitu kamu mencatat makanan, kalori, GGL, dan tren mingguanmu akan muncul di sini. Yuk mulai dari 3 langkah ini:" />
          <div className="-mt-4 space-y-2 px-2 pb-2">
            {steps.map(([t, d, done, fn], i) => (
              <button key={t} onClick={fn} className="flex w-full items-center gap-3 rounded-3xl border border-neutral-100 p-3 text-left transition hover:border-[#d9d1ff] hover:bg-[#faf8ff]">
                <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${done ? 'bg-emerald-500 text-white' : 'bg-[#f3f0ff] text-[#5b4ee0]'}`}>{done ? <Icon d={icons.check} className="size-4" /> : i + 1}</span>
                <span className="flex-1"><span className={`block text-sm font-medium ${done ? 'text-neutral-400 line-through' : ''}`}>{t}</span><span className="text-xs text-neutral-400">{d}</span></span>
                <Icon d={icons.arrow} className="size-4 text-neutral-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  const over = intake.sugar > LIMIT.sugar || intake.salt > LIMIT.salt || intake.fat > LIMIT.fat
  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9fe] p-4 pb-24 md:p-6">
      <div className={`${card} flex flex-col items-center gap-5 bg-gradient-to-br from-[#f3f0ff] to-[#fdeef6] sm:flex-row`}>
        <Nuri size={90} mood={over ? 'sad' : 'calm'} />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-lg font-semibold">{over ? 'Ada batas GGL yang terlewati hari ini' : 'Hari ini kamu keren banget!'}</p>
          <p className="mt-1 text-sm text-neutral-600">{over ? 'Nggak apa-apa, besok kita perbaiki bareng. Coba makan malam yang dikukus dan perbanyak air putih ya.' : `Asupanmu sudah ${Math.round((eaten / phase.kcal) * 100)}% dari target dan GGL masih aman.`}</p>
        </div>
        <div className="flex gap-2"><button onClick={() => go('ggl')} className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50">Lihat GGL</button><button onClick={onPhoto} className="rounded-full bg-[#141418] px-4 py-2 text-sm font-medium text-white hover:bg-black">+ Catat dari foto</button></div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <button onClick={() => go('diary')} className={`${card} ${hov} text-left`}>
          <Head t="Kalori hari ini" />
          <div className="mt-3 flex items-center gap-4"><Ring value={eaten} max={phase.kcal} size={96} /><div><p className="text-3xl font-semibold tracking-tight">{eaten.toLocaleString('id')}</p><p className="text-xs text-neutral-400">dari {phase.kcal.toLocaleString('id')} kkal · sisa {Math.max(phase.kcal - eaten, 0)}</p></div></div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">{[['Protein', '58 g', 'bg-sky-50'], ['Karbo', '182 g', 'bg-violet-50'], ['Serat', '17 g', 'bg-emerald-50']].map(([a, b, c]) => <div key={a} className={`rounded-xl py-2 ${c}`}><p className="font-semibold">{b}</p><p className="opacity-60">{a}</p></div>)}</div>
        </button>
        <button onClick={() => go('ggl')} className={`${card} ${hov} text-left`}>
          <Head t="Batas GGL harian" />
          <Bar label="Gula" v={intake.sugar} m={LIMIT.sugar} u="g" color="bg-violet-400" />
          <Bar label="Garam" v={intake.salt} m={LIMIT.salt} u="g" color="bg-amber-400" />
          <Bar label="Lemak" v={intake.fat} m={LIMIT.fat} u="g" color="bg-pink-400" />
          <p className="mt-4 text-xs text-neutral-400">Standar Permenkes No. 30/2013</p>
        </button>
        <div className={card}>
          <div className="flex items-center justify-between"><p className="text-sm font-medium">Fase usia</p><button onClick={() => go('profile')} className="text-xs text-[#6b5ce7] hover:underline">Atur di profil →</button></div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">{phases.map(p => <button key={p.id} onClick={() => setPhase(p)} className={`rounded-full border px-2 py-2 text-xs ${phase.id === p.id ? 'border-[#c9bfff] bg-[#f3f0ff] text-[#5b4ee0]' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}>{p.label}<br /><span className="opacity-60">{p.age}</span></button>)}</div>
          <p className="mt-3 text-xs text-neutral-500">{phase.focus}</p>
          {(phase.id === 'bayi' || phase.id === 'mpasi') && <button onClick={() => go('growth')} className="mt-2 text-xs text-[#6b5ce7] hover:underline">Lihat Growth Chart →</button>}
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between"><p className="text-sm font-medium">Kalori 7 hari terakhir</p><button onClick={() => go('history')} className="text-xs text-[#6b5ce7] hover:underline">Riwayat →</button></div>
          <div className="mt-6 flex h-40 items-end gap-3">
            {week.map((v, i) => (
              <button key={i} onClick={() => go('diary')} title="Buka Food Diary" className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[10px] text-neutral-400 opacity-0 transition group-hover:opacity-100">{v}</span>
                <div className={`w-full rounded-t-lg transition-all ${v > phase.kcal ? 'bg-rose-200' : 'bg-gradient-to-t from-[#a99bff] to-[#f3a6d8]'} ${i === 6 ? 'ring-2 ring-[#c9bfff]' : ''}`} style={{ height: `${Math.min(v / 2600, 1) * 100}%` }} />
                <span className="text-[11px] text-neutral-400">{['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Hari ini'][i]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between"><p className="text-sm font-medium">Makanan terakhir</p><button onClick={() => go('diary')} className="text-xs text-[#6b5ce7] hover:underline">Semua →</button></div>
          {diary.length === 0 && <p className="mt-3 text-xs text-neutral-400">Belum ada catatan.</p>}
          {diary.slice(-4).reverse().map(e => <button onClick={() => go('diary')} key={e.id} className="mt-1 flex w-full items-center gap-3 rounded-full px-1 py-1.5 text-left text-sm hover:bg-neutral-50"><span className="w-10 text-xs text-neutral-400">{e.time}</span><span className="flex-1 truncate">{e.name}</span><span className="text-xs text-neutral-500">{e.kcal} kkal</span></button>)}
        </div>
      </div>
    </div>
  )
}

function Diary({ onPhoto, plan, diary, setDiary, target, toast }: { onPhoto: () => void; plan: () => void; diary: Entry[]; setDiary: (f: (d: Entry[]) => Entry[]) => void; target: number; toast: (s: string) => void }) {
  const [form, setForm] = useState({ meal: 'Makan malam', name: '', kcal: '' })
  const total = diary.reduce((a, e) => a + e.kcal, 0)
  const add = () => {
    if (!form.name.trim() || !+form.kcal) return toast('Isi nama makanan dan kalori dulu ya')
    setDiary(d => [...d, { id: Date.now(), time: new Date().toLocaleTimeString('id', { hour: '2-digit', minute: '2-digit' }), meal: form.meal, name: form.name, kcal: +form.kcal }])
    setForm({ ...form, name: '', kcal: '' }); toast('Tercatat di Food Diary')
  }
  const meals = ['Sarapan', 'Makan siang', 'Makan malam', 'Snack', 'Dari foto']
  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9fe] p-4 pb-24 md:p-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between"><p className="text-sm font-medium">Hari ini · {new Date().toLocaleDateString('id', { weekday: 'long', day: 'numeric', month: 'long' })}</p><p className="text-sm"><b>{total}</b> <span className="text-neutral-400">/ {target} kkal</span></p></div>
          {meals.map(m => {
            const items = diary.filter(e => e.meal === m)
            if (!items.length) return null
            return (
              <div key={m} className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">{m}</p>
                {items.map(e => (
                  <div key={e.id} className="group mt-2 flex items-center gap-3 rounded-xl border border-neutral-100 px-3 py-2.5 text-sm">
                    <span className="w-11 text-xs text-neutral-400">{e.time}</span><span className="flex-1">{e.name}</span><span className="text-neutral-500">{e.kcal} kkal</span>
                    <button onClick={() => { setDiary(d => d.filter(x => x.id !== e.id)); toast('Entri dihapus') }} title="Hapus" className="rounded-full p-1 text-neutral-300 hover:bg-rose-50 hover:text-rose-500"><Icon d={icons.trash} /></button>
                  </div>
                ))}
              </div>
            )
          })}
          {diary.length === 0 && <EmptyState mood="sad" title="Food diary masih kosong" desc="Catat makanan pertamamu hari ini. Bisa lewat foto, rencana menu, atau isi manual di form samping." primary={['Foto makanan', onPhoto]} secondary={['Buat rencana menu', plan]} />}
        </div>
        <div className={`${card} h-fit`}>
          <p className="text-sm font-medium">Tambah makanan</p>
          <select value={form.meal} onChange={e => setForm({ ...form, meal: e.target.value })} className="mt-3 w-full rounded-full border border-neutral-200 px-3 py-2 text-sm outline-none">{meals.slice(0, 4).map(m => <option key={m} value={m}>{m}</option>)}</select>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama makanan (mis. Nasi uduk)" className="mt-2 w-full rounded-full border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#c9bfff]" />
          <input value={form.kcal} onChange={e => setForm({ ...form, kcal: e.target.value.replace(/\D/g, '') })} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Kalori (kkal)" className="mt-2 w-full rounded-full border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#c9bfff]" />
          <button onClick={add} className="mt-3 w-full rounded-full bg-[#141418] py-2.5 text-sm font-medium text-white">Tambah</button>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f5f2ff] p-3 text-xs text-neutral-600"><Nuri size={44} mood={total > target ? 'sad' : 'happy'} glow={false} />{total > target ? 'Sudah lewat target, tapi santai. Besok kita mulai lagi!' : `Masih ada ${target - total} kkal. Pilih yang bergizi ya!`}</div>
        </div>
      </div>
    </div>
  )
}

const WHO = { bb: { lo: [2.5, 5.0, 6.4, 7.1, 7.7, 8.3, 8.8, 9.2, 9.7], hi: [4.4, 8.0, 9.8, 10.9, 11.8, 12.6, 13.4, 14.1, 14.8], u: 'kg', min: 0, max: 16 }, tb: { lo: [46, 57, 63, 68, 71, 74.5, 77.5, 80, 82.5], hi: [53, 65, 71, 76, 80, 84, 87.5, 91, 93.5], u: 'cm', min: 40, max: 100 } }
const whoAt = (arr: number[], m: number) => { const i = Math.min(Math.floor(m / 3), 7), t = (m - i * 3) / 3; return arr[i] + (arr[i + 1] - arr[i]) * t }
function Growth({ pts, setPts, phase, toast }: { pts: GrowthPt[]; setPts: (f: (p: GrowthPt[]) => GrowthPt[]) => void; phase: typeof phases[0]; toast: (s: string) => void }) {
  const [metric, setMetric] = useState<'bb' | 'tb'>('bb')
  const gl = 'gl' + useId().replace(/:/g, '')
  const [hover, setHover] = useState<number | null>(null)
  const [f, setF] = useState({ m: '', bb: '', tb: '' })
  const add = () => {
    const m = +f.m, bb = +f.bb, tb = +f.tb
    if (f.m === '' || m < 0 || m > 24 || !bb || !tb) return toast('Isi usia (0–24 bln), berat, dan tinggi dulu ya')
    setPts(p => [...p.filter(x => x.m !== m), { m, bb, tb }].sort((a, b) => a.m - b.m)); setF({ m: '', bb: '', tb: '' }); toast('Pengukuran tersimpan')
  }
  const inp = 'w-full rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#c9bfff]'
  const form = (
    <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-2 text-left">
      <label className="text-[11px] text-neutral-500">Usia (bln)<input inputMode="numeric" value={f.m} onChange={e => setF({ ...f, m: e.target.value.replace(/\D/g, '') })} placeholder="6" className={inp} /></label>
      <label className="text-[11px] text-neutral-500">Berat (kg)<input inputMode="decimal" value={f.bb} onChange={e => setF({ ...f, bb: e.target.value.replace(/[^\d.]/g, '') })} placeholder="7.4" className={inp} /></label>
      <label className="text-[11px] text-neutral-500">Tinggi (cm)<input inputMode="decimal" value={f.tb} onChange={e => setF({ ...f, tb: e.target.value.replace(/[^\d.]/g, '') })} onKeyDown={e => e.key === 'Enter' && add()} placeholder="67" className={inp} /></label>
      <button onClick={add} className="col-span-3 rounded-full bg-[#141418] py-2.5 text-sm font-medium text-white hover:bg-black">Simpan pengukuran</button>
    </div>
  )
  if (pts.length === 0) return (
    <div className="flex-1 overflow-y-auto bg-[#faf9fe] p-4 pb-24 md:p-6"><div className={`${card} mx-auto max-w-xl`}>
      <EmptyState mood="love" title="Pantau tumbuh kembang si kecil" desc={`Masukkan pengukuran berat dan tinggi badan anak (0–24 bulan). Nuri akan membandingkannya dengan kurva WHO dan memberi tanda kalau ada risiko stunting.${phase.id !== 'bayi' && phase.id !== 'mpasi' ? ' Fase usiamu saat ini bukan Bayi/MPASI, tapi kamu tetap bisa mencatat untuk anakmu.' : ''}`}>{form}</EmptyState>
    </div></div>
  )
  const W = WHO[metric], vals = pts.map(p => p[metric])
  const x = (m: number) => 40 + (m / 24) * 560, y = (v: number) => 220 - ((v - W.min) / (W.max - W.min)) * 200
  const ms = [0, 3, 6, 9, 12, 15, 18, 21, 24]
  const band = `${ms.map((m, i) => `${i ? 'L' : 'M'}${x(m)} ${y(W.hi[i])}`).join(' ')} ${[...ms].reverse().map((m, i) => `L${x(m)} ${y(W.lo[8 - i])}`).join(' ')} Z`
  const last = pts[pts.length - 1], lv = last[metric]
  const status = lv < whoAt(W.lo, last.m) ? 'below' : lv > whoAt(W.hi, last.m) ? 'above' : 'ok'
  const prev = pts[pts.length - 2], faltering = metric === 'bb' && prev && (last.bb - prev.bb) / Math.max(last.m - prev.m, 1) < 0.2
  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9fe] p-4 pb-24 md:p-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div><p className="text-sm font-medium">Kurva pertumbuhan WHO · {pts.length} pengukuran</p><p className="text-xs text-neutral-400">Area ungu = rentang normal (-2 SD s/d +2 SD)</p></div>
            <div className="flex rounded-full bg-neutral-100 p-1 text-xs">{(['bb', 'tb'] as const).map(m => <button key={m} onClick={() => setMetric(m)} className={`rounded-full px-3 py-1.5 ${metric === m ? 'bg-white font-medium shadow-sm' : 'text-neutral-500'}`}>{m === 'bb' ? 'Berat badan' : 'Tinggi badan'}</button>)}</div>
          </div>
          <svg viewBox="0 0 620 250" className="mt-4 w-full" onMouseLeave={() => setHover(null)}>
            {[0, 1, 2, 3, 4].map(i => <line key={i} x1="40" x2="600" y1={20 + i * 50} y2={20 + i * 50} stroke="#f0eef6" />)}
            <path d={band} fill="#ece7ff" />
            {ms.map(m => <text key={m} x={x(m)} y="245" textAnchor="middle" fontSize="11" fill="#a3a3a3">{m} bln</text>)}
            <defs><linearGradient id={gl}><stop stopColor="#8b7bff" /><stop offset="1" stopColor="#f39ad6" /></linearGradient></defs>
            {pts.length > 1 && <path d={pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.m)} ${y(vals[i])}`).join(' ')} fill="none" stroke={`url(#${gl})`} strokeWidth="3" strokeLinecap="round" />}
            {pts.map((p, i) => (
              <g key={p.m} onMouseEnter={() => setHover(i)}>
                <circle cx={x(p.m)} cy={y(vals[i])} r={14} fill="transparent" />
                <circle cx={x(p.m)} cy={y(vals[i])} r={hover === i ? 6 : 4} fill="#fff" stroke="#8b7bff" strokeWidth="2.5" />
                {hover === i && <g><rect x={x(p.m) - 40} y={y(vals[i]) - 34} width="80" height="22" rx="8" fill="#141418" /><text x={x(p.m)} y={y(vals[i]) - 19} textAnchor="middle" fontSize="11" fill="#fff">{p.m} bln · {vals[i]} {W.u}</text></g>}
              </g>
            ))}
          </svg>
          <div className="mt-4 border-t border-neutral-100 pt-4"><p className="text-sm font-medium">Tambah pengukuran</p>{form}</div>
        </div>
        <div className="space-y-4">
          <div className={card}><p className="text-xs text-neutral-400">Terakhir diukur · {last.m} bln</p><p className="mt-1 text-3xl font-semibold">{lv} <span className="text-base font-normal text-neutral-400">{W.u}</span></p><p className={`mt-1 text-xs ${status === 'ok' ? 'text-emerald-600' : 'text-rose-500'}`}>{status === 'ok' ? 'Dalam rentang normal WHO' : status === 'below' ? 'Di bawah rentang normal WHO' : 'Di atas rentang normal WHO'}</p></div>
          <div className={`${card} flex items-start gap-3`}>
            <Nuri size={56} mood={status === 'below' || faltering ? 'sad' : 'excited'} glow={false} />
            <div className="text-sm"><p className="font-medium">{status === 'below' ? 'Perlu perhatian' : faltering ? 'Kenaikan berat melambat' : 'Pertumbuhan bagus!'}</p><p className="mt-1 text-xs leading-relaxed text-neutral-500">{status === 'below' || faltering ? 'Tambahkan protein hewani di MPASI (telur, hati ayam, ikan) dan konsultasikan ke posyandu atau dokter anak. Kamu orang tua yang hebat, kita pantau bareng ya!' : 'Pertumbuhan sesuai kurva WHO. Pertahankan!'}</p></div>
          </div>
          <div className={card}><p className="text-sm font-medium">Riwayat pengukuran</p>{pts.map(p => <div key={p.m} className="mt-2 flex items-center gap-3 text-xs"><span className="w-12 text-neutral-400">{p.m} bln</span><span className="flex-1">{p.bb} kg · {p.tb} cm</span><button onClick={() => setPts(x => x.filter(i => i.m !== p.m))} className="rounded p-1 text-neutral-300 hover:text-rose-500"><Icon d={icons.trash} className="size-3.5" /></button></div>)}</div>
        </div>
      </div>
    </div>
  )
}

function History({ startChat, hist, setHist, open, toast }: { startChat: () => void; hist: typeof initHistory; setHist: (f: (h: typeof initHistory) => typeof initHistory) => void; open: (t: string) => void; toast: (s: string) => void }) {
  const [filter, setFilter] = useState('Semua')
  const list = hist.filter(h => filter === 'Semua' || h.day === filter)
  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9fe] p-4 pb-24 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">{['Semua', 'Hari ini', 'Kemarin', '7 hari lalu'].map(f => <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-3 py-1.5 text-xs ${filter === f ? 'border-[#c9bfff] bg-[#f3f0ff] text-[#5b4ee0]' : 'border-neutral-200 bg-white text-neutral-500'}`}>{f}</button>)}</div>
        {hist.length > 0 && <button onClick={() => { setHist(() => []); toast('Riwayat dihapus') }} className="text-xs text-rose-500 hover:underline">Hapus semua</button>}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {list.map(h => (
          <div key={h.id} className={`${card} group flex items-center gap-4 p-4`}>
            <Nuri size={44} mood={h.mood} glow={false} />
            <button onClick={() => open(h.title)} className="min-w-0 flex-1 text-left"><p className="truncate text-sm font-medium">{h.title}</p><p className="text-xs text-neutral-400">{h.day} · Klik untuk lanjutkan</p></button>
            <button onClick={() => { setHist(x => x.filter(i => i.id !== h.id)); toast('Percakapan dihapus') }} title="Hapus" className="rounded-full p-1.5 text-neutral-300 hover:bg-rose-50 hover:text-rose-500"><Icon d={icons.trash} /></button>
          </div>
        ))}
      </div>
      {list.length === 0 && <EmptyState mood={hist.length ? 'neutral' : 'love'} title={hist.length ? 'Tidak ada percakapan di periode ini' : 'Belum ada percakapan'} desc={hist.length ? 'Coba pilih filter lain.' : 'Mulai ngobrol dengan Nuri, kirim foto makanan, atau minta rencana menu. Semua percakapan akan tersimpan di sini.'} primary={hist.length ? ['Lihat semua', () => setFilter('Semua')] : ['Mulai chat dengan Nuri', startChat]} />}
    </div>
  )
}

function HelpDesk({ close, act }: { close: () => void; act: (a: string) => void }) {
  const [ans, setAns] = useState<string | null>(null)
  const [mood, setMood] = useState<Mood>('neutral')
  const faq: [string, string][] = [
    ['Bagaimana cara cek GGL?', 'Tekan "Cek GGL dari foto", upload foto makanan, lalu aku hitung gula, garam, dan lemaknya otomatis.'],
    ['Apakah dataku aman?', 'Aman! Semua data kesehatan terenkripsi dan diproses sesuai UU PDP No. 27/2022.'],
    ['Apa itu fase usia?', 'Target gizimu otomatis menyesuaikan 6 fase: Bayi, MPASI, Anak, Remaja, Dewasa, dan Lansia.'],
  ]
  return (
    <div className="pop w-[calc(100vw-1.5rem)] max-w-80 overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-gradient-to-br from-[#f3f0ff] to-[#fdeef6] px-4 py-3">
        <div><p className="text-sm font-semibold">Nuri Help Desk</p><p className="text-xs text-neutral-500">Biasanya membalas instan</p></div>
        <button onClick={close} className="rounded-full p-1 text-neutral-500 hover:bg-white"><Icon d={icons.x} /></button>
      </div>
      <div className="p-4 text-sm">
        <p className="rounded-3xl rounded-tl-lg bg-neutral-50 px-3 py-2">{ans ?? 'Hai! Aku Nuri. Ada yang bisa kubantu hari ini?'}</p>
        <div className="mt-3 space-y-1.5">{faq.map(([qq, a]) => <button key={qq} onClick={() => setAns(a)} className="w-full rounded-full border border-neutral-200 px-3 py-2 text-left text-xs hover:border-[#c9bfff] hover:bg-[#f8f6ff]">{qq}</button>)}</div>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-wide text-neutral-400">Mood Nuri</p>
        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-neutral-50 p-2"><Nuri size={52} mood={mood} glow={false} /><div className="flex flex-wrap gap-1">{moodLabels.map(([m, l]) => <button key={m} onClick={() => setMood(m)} className={`rounded-full px-2 py-0.5 text-[11px] ${mood === m ? 'bg-[#141418] text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}>{l}</button>)}</div></div>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-wide text-neutral-400">Pintasan</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
          {[['photo', 'Cek GGL foto'], ['voice', 'Voice chat'], ['help', 'Pusat bantuan'], ['onboarding', 'Ulangi onboarding']].map(([k, l]) => <button key={k} onClick={() => act(k)} className="rounded-full bg-[#f5f2ff] px-3 py-2 text-[#5b4ee0] hover:bg-[#ece7ff]">{l}</button>)}
        </div>
      </div>
    </div>
  )
}

function Voice({ close, onSend }: { close: () => void; onSend: (t: string) => void }) {
  const [text, setText] = useState('')
  const [live, setLive] = useState(true)
  const recRef = useRef<{ stop: () => void } | null>(null)
  useEffect(() => {
    const W = window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any }
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition
    let timer: ReturnType<typeof setInterval> | undefined
    if (SR) {
      const r = new SR(); r.lang = 'id-ID'; r.interimResults = true; r.continuous = true
      r.onresult = (e: any) => setText(Array.from(e.results).map((x: any) => x[0].transcript).join(''))
      r.onerror = () => simulate(); r.onend = () => setLive(false)
      try { r.start(); recRef.current = r } catch { simulate() }
    } else simulate()
    function simulate() {
      const s = 'Nuri, berapa kalori nasi padang dengan rendang?'.split(' '); let i = 0
      timer = setInterval(() => { i++; setText(s.slice(0, i).join(' ')); if (i >= s.length) { clearInterval(timer); setLive(false) } }, 280)
    }
    return () => { clearInterval(timer); recRef.current?.stop() }
  }, [])
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#1b1830]/40 p-4 backdrop-blur-md">
      <div className="pop flex w-full max-w-md flex-col items-center rounded-[32px] bg-white px-6 py-10 text-center">
        <Nuri size={150} mood={live ? 'listening' : 'happy'} />
        <p className="mt-10 text-xs font-medium uppercase tracking-widest text-[#7b6cf0]">{live ? 'Nuri mendengarkan…' : 'Siap dikirim'}</p>
        <p className="mt-3 min-h-14 text-xl font-medium tracking-tight">{text || 'Coba bilang: "Apa sarapan sehat untuk lansia?"'}</p>
        <div className="mt-6 flex h-8 items-center gap-1">{Array.from({ length: 18 }).map((_, i) => <span key={i} className="w-1 rounded-full bg-gradient-to-t from-[#a99bff] to-[#f3a6d8]" style={{ height: live ? `${20 + ((i * 37) % 80)}%` : '15%', animation: live ? `dot ${0.6 + (i % 4) * 0.15}s ease-in-out infinite` : undefined }} />)}</div>
        <div className="mt-8 flex gap-3">
          <button onClick={close} className="grid size-12 place-items-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50" title="Batal"><Icon d={icons.x} /></button>
          <button onClick={() => { recRef.current?.stop(); setLive(false) }} disabled={!live} className="grid size-12 place-items-center rounded-full bg-rose-50 text-rose-500 disabled:opacity-40" title="Berhenti"><span className="size-3.5 rounded-sm bg-current" /></button>
          <button onClick={() => text && onSend(text)} disabled={!text} className="btn-primary grid size-12 place-items-center rounded-full" title="Kirim"><Icon d={icons.send} /></button>
        </div>
      </div>
    </div>
  )
}

function GglDetail({ intake, diary, onPhoto }: { intake: { sugar: number; salt: number; fat: number }; diary: Entry[]; onPhoto: () => void }) {
  if (diary.length === 0) return <div className="flex-1 overflow-y-auto bg-[#faf9fe]"><EmptyState mood="thinking" title="Belum ada data GGL hari ini" desc="Foto makananmu, lalu Nuri hitung gula, garam, dan lemaknya dari data TKPI Kemenkes." primary={['Cek GGL dari foto', onPhoto]} /></div>
  const rows: [string, number, number, string, string][] = [
    ['Gula', intake.sugar, LIMIT.sugar, 'Setara 4 sdm gula. Sumber umum: teh manis, kue, SKM.', 'bg-violet-400'],
    ['Garam', intake.salt, LIMIT.salt, 'Setara 1 sdt garam. Sumber umum: kecap, kerupuk, mie instan.', 'bg-amber-400'],
    ['Lemak', intake.fat, LIMIT.fat, 'Setara 5 sdm minyak. Sumber umum: gorengan, santan, mentega.', 'bg-pink-400'],
  ]
  const worst = rows.reduce((a, b) => (b[1] / b[2] > a[1] / a[2] ? b : a))
  const bad = worst[1] > worst[2]
  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9fe] p-4 pb-24 md:p-6">
      <div className={`${card} flex flex-col items-center gap-5 sm:flex-row`}>
        <Nuri size={80} mood={worst[1] > worst[2] * 1.3 ? 'angry' : bad ? 'sad' : 'calm'} />
        <div className="flex-1 text-center sm:text-left"><p className="font-semibold">{bad ? `${worst[0]} sudah lewat batas` : `Paling tinggi hari ini: ${worst[0]} (${Math.round((worst[1] / worst[2]) * 100)}%)`}</p><p className="mt-1 text-sm text-neutral-500">{bad ? 'Gapapa, kita seimbangkan di makan berikutnya. Pilih yang dikukus atau direbus ya!' : 'Masih aman. Terus pertahankan pilihan baikmu!'}</p></div>
        <button onClick={onPhoto} className="rounded-full bg-[#141418] px-4 py-2 text-sm font-medium text-white hover:bg-black">Cek GGL dari foto</button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {rows.map(([n, v, m, tip, c]) => (
          <div key={n} className={card}>
            <div className="flex items-baseline justify-between"><p className="text-sm font-medium">{n}</p><p className={`text-xs ${v > m ? 'text-rose-500' : 'text-neutral-400'}`}>{Math.round((v / m) * 100)}%</p></div>
            <p className="mt-2 text-3xl font-semibold">{v.toFixed(1)}<span className="text-sm font-normal text-neutral-400"> / {m} g</span></p>
            <div className="mt-3 h-2 rounded-full bg-neutral-100"><div className={`h-full rounded-full ${v > m ? 'bg-rose-400' : c}`} style={{ width: `${Math.min((v / m) * 100, 100)}%` }} /></div>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">Batas harian {tip}</p>
          </div>
        ))}
      </div>
      <div className={`${card} mt-4`}>
        <p className="text-sm font-medium">Kontribusi per makanan</p>
        {diary.length === 0 && <p className="mt-3 text-xs text-neutral-400">Belum ada makanan tercatat.</p>}
        {diary.map(e => (
          <div key={e.id} className="mt-3 flex items-center gap-3 text-sm"><span className="w-11 text-xs text-neutral-400">{e.time}</span><span className="flex-1 truncate">{e.name}</span>
            <div className="hidden h-1.5 w-40 rounded-full bg-neutral-100 sm:block"><div className="h-full rounded-full bg-gradient-to-r from-[#a99bff] to-[#f3a6d8]" style={{ width: `${Math.min(e.kcal / 8, 100)}%` }} /></div>
            <span className="w-16 text-right text-xs text-neutral-500">{e.kcal} kkal</span></div>
        ))}
      </div>
    </div>
  )
}

function Profile({ section, go, profile, setProfile, phase, setPhase, toast, logout, ask }: { section: 'diri' | 'kesehatan'; go: (v: View) => void; profile: Prof; setProfile: (p: Prof) => void; phase: typeof phases[0]; setPhase: (p: typeof phases[0]) => void; toast: (s: string) => void; logout: () => void; ask: () => void }) {
  const [f, setF] = useState(profile)
  const [custom, setCustom] = useState('')
  const conds = ['Diabetes', 'Hipertensi', 'Gagal ginjal', 'Kolesterol', 'Asam urat', 'Maag/GERD', 'Anemia', 'Hamil/Menyusui']
  const allergyOpts = ['Kacang', 'Susu', 'Telur', 'Seafood', 'Gluten', 'Kedelai']
  const inp = 'mt-1 w-full rounded-full border border-neutral-200 px-3 py-2 text-sm text-neutral-800 outline-none focus:border-[#c9bfff]'
  const num = (k: keyof Prof) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value.replace(/[^\d.]/g, '') })
  const toggle = (k: 'conditions' | 'allergies', v: string) => setF({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] })
  const b = bmiOf(f)
  const dirty = JSON.stringify(f) !== JSON.stringify(profile)
  useEffect(() => setF(profile), [profile])
  const tdee = tdeeOf(f)
  const isK = section === 'kesehatan'
  const chip = (on: boolean, tone: string) => `rounded-full border px-3 py-1 text-xs transition ${on ? tone : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`
  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9fe] p-4 pb-24 md:p-6">
      {isK && !(profile.weight && profile.height && profile.age) && (
        <div className="mb-4 flex flex-col items-center gap-4 rounded-[28px] border border-dashed border-[#d9d1ff] bg-gradient-to-br from-[#f3f0ff] to-[#fdeef6] p-5 sm:flex-row">
          <Nuri size={72} mood="thinking" />
          <div className="flex-1 text-center sm:text-left"><p className="font-semibold">Status kesehatanmu belum lengkap</p><p className="mt-1 text-sm text-neutral-600">Isi usia, berat, dan tinggi badan di form bawah. Tanpa data ini, Nuri memakai target default (Wanita 1.800 / Pria 2.100 kkal) dan belum bisa menilai nutrisimu secara personal.</p></div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#5b4ee0]">{[profile.age, profile.weight, profile.height].filter(Boolean).length}/3 terisi</span>
        </div>
      )}
      {isK && (
        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {([
            ['Berat badan', f.weight ? `${f.weight} kg` : '–', 'bg-sky-50', ''],
            ['Tinggi badan', f.height ? `${f.height} cm` : '–', 'bg-violet-50', ''],
            ['BMI', b ? `${b}` : '–', b && (b < 18.5 || b >= 23) ? 'bg-amber-50' : 'bg-emerald-50', b ? bmiLabel(b) : 'isi BB & TB'],
            ['Kebutuhan energi', tdee ? `${tdee.toLocaleString('id')}` : '–', 'bg-pink-50', tdee ? 'kkal/hari' : 'isi BB, TB, usia'],
            ['Alergi', `${f.allergies.length}`, f.allergies.length ? 'bg-amber-50' : 'bg-neutral-50', f.allergies.join(', ') || 'tidak ada'],
            ['Riwayat penyakit', `${f.conditions.length}`, f.conditions.length ? 'bg-rose-50' : 'bg-neutral-50', f.conditions.join(', ') || 'tidak ada'],
          ] as const).map(([l, v, c, sub]) => (
            <div key={l} className={`rounded-2xl p-4 ${c}`}><p className="text-[11px] text-neutral-500">{l}</p><p className="mt-1 text-2xl font-semibold tracking-tight">{v}</p>{sub && <p className="mt-0.5 truncate text-[11px] text-neutral-500">{sub}</p>}</div>
          ))}
        </div>
      )}
      {isK && b > 0 && (
        <div className={`${card} mb-4`}>
          <div className="flex items-center justify-between"><p className="text-sm font-medium">Posisi BMI kamu</p><p className="text-xs text-neutral-400">Standar Asia-Pasifik</p></div>
          <div className="relative mt-4 flex h-2.5 overflow-hidden rounded-full"><div className="w-[23%] bg-sky-300" /><div className="w-[30%] bg-emerald-300" /><div className="w-[13%] bg-amber-300" /><div className="flex-1 bg-rose-300" /></div>
          <div className="relative h-4"><span className="absolute -top-4 size-4 -translate-x-1/2 rounded-full border-[3px] border-white bg-[#141418] shadow" style={{ left: `${Math.min(Math.max((b - 14) / 21, 0), 1) * 100}%` }} /></div>
          <div className="flex justify-between text-[11px] text-neutral-400"><span>Kurus &lt;18.5</span><span>Normal 18.5–22.9</span><span>Berlebih 23–24.9</span><span>Obesitas ≥25</span></div>
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <div className={`${card} flex flex-col items-center text-center`}>
            <div className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-[#cfe0ff] to-[#f6c4e4] text-2xl font-semibold text-[#5a4fc8]">{initials(f.name)}</div>
            <p className="mt-3 text-lg font-semibold">{f.name || 'Tanpa nama'}</p>
            <p className="text-xs text-neutral-400">{f.age ? `${f.age} th · ` : ''}Fase {phase.label}</p>
            <div className="mt-4 grid w-full grid-cols-3 gap-2 text-xs">{[['BB', `${f.weight || '–'} kg`], ['TB', `${f.height || '–'} cm`], ['BMI', b || '–']].map(([a, v]) => <div key={a} className="rounded-xl bg-[#f5f2ff] py-2"><p className="font-semibold">{v}</p><p className="text-neutral-500">{a}</p></div>)}</div>
            {b > 0 && <p className={`mt-2 text-xs ${b >= 18.5 && b < 23 ? 'text-emerald-600' : 'text-amber-600'}`}>Status BMI: {bmiLabel(b)}</p>}
            <button onClick={() => go(isK ? 'profile' : 'health')} className="mt-5 w-full rounded-full bg-[#f5f2ff] py-2 text-sm font-medium text-[#5b4ee0] hover:bg-[#ece7ff]">{isK ? 'Edit data diri' : 'Status kesehatan →'}</button>
            {!isK && <button onClick={logout} className="mt-2 w-full rounded-full border border-rose-200 py-2 text-sm text-rose-500 hover:bg-rose-50">Keluar</button>}
          </div>
          <div className={`${card} flex items-start gap-3`}>
            <Nuri size={52} mood={f.allergies.length || f.conditions.length ? 'calm' : 'happy'} glow={false} />
            <div className="text-xs leading-relaxed text-neutral-600"><p>Data ini dipakai Nuri untuk mencocokkan setiap makanan dengan alergi dan riwayat kesehatanmu.</p>
              <button onClick={() => { if (dirty) setProfile(f); ask() }} className="mt-2 rounded-full bg-[#f5f2ff] px-2.5 py-1.5 font-medium text-[#5b4ee0] hover:bg-[#ece7ff]">Tanya Nuri: nutrisiku oke?</button></div>
          </div>
        </div>
        <div className={`${card} lg:col-span-2`}>
          {!isK && <>
          <p className="text-sm font-medium">Data diri</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-xs text-neutral-500">Nama<input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} className={inp} /></label>
            <label className="text-xs text-neutral-500">Email<input type="email" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="nama@email.com" className={inp} /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-neutral-500">Jenis kelamin<select value={f.gender} onChange={e => setF({ ...f, gender: e.target.value })} className={inp}><option value="Wanita">Wanita</option><option value="Pria">Pria</option></select></label>
              <label className="text-xs text-neutral-500">Usia (th)<input inputMode="numeric" value={f.age} onChange={num('age')} placeholder="27" className={inp} /></label>
            </div>
            <label className="text-xs text-neutral-500">Aktivitas harian<select value={f.activity} onChange={e => setF({ ...f, activity: e.target.value })} className={inp}><option value="Rendah">Rendah</option><option value="Ringan">Ringan</option><option value="Sedang">Sedang</option><option value="Tinggi">Tinggi</option></select></label>
          </div>

          <p className="mt-6 text-sm font-medium">Fase usia</p>
          <div className="mt-2 flex flex-wrap gap-1.5">{phases.map(p => <button key={p.id} onClick={() => setPhase(p)} className={chip(phase.id === p.id, 'border-[#c9bfff] bg-[#f3f0ff] text-[#5b4ee0]')}>{p.label} · {p.age}</button>)}</div>
          </>}
          {isK && <>
          <p className="text-sm font-medium">Antropometri</p>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <label className="text-xs text-neutral-500">Berat badan (kg)<input inputMode="decimal" value={f.weight} onChange={num('weight')} placeholder="mis. 55" className={inp} /></label>
            <label className="text-xs text-neutral-500">Tinggi badan (cm)<input inputMode="decimal" value={f.height} onChange={num('height')} placeholder="mis. 160" className={inp} /></label>
            <label className="text-xs text-neutral-500">Usia (th)<input inputMode="numeric" value={f.age} onChange={num('age')} placeholder="27" className={inp} /></label>
          </div>

          <p className="mt-6 text-sm font-medium">Alergi makanan</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[...new Set([...allergyOpts, ...f.allergies])].map(a => <button key={a} onClick={() => toggle('allergies', a)} className={chip(f.allergies.includes(a), 'border-amber-200 bg-amber-50 text-amber-700')}>{f.allergies.includes(a) ? '✓ ' : ''}{a}</button>)}
            <form onSubmit={e => { e.preventDefault(); const v = custom.trim(); if (v && !f.allergies.includes(v)) setF({ ...f, allergies: [...f.allergies, v] }); setCustom('') }} className="flex">
              <input value={custom} onChange={e => setCustom(e.target.value)} placeholder="+ Alergi lain" className="w-28 rounded-full border border-dashed border-neutral-300 px-3 py-1 text-xs outline-none focus:border-[#c9bfff]" />
            </form>
          </div>

          <p className="mt-6 text-sm font-medium">Riwayat penyakit</p>
          <div className="mt-2 flex flex-wrap gap-1.5">{conds.map(c => <button key={c} onClick={() => toggle('conditions', c)} className={chip(f.conditions.includes(c), 'border-rose-200 bg-rose-50 text-rose-600')}>{f.conditions.includes(c) ? '✓ ' : ''}{c}</button>)}</div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="text-xs text-neutral-500">Obat rutin<input value={f.meds} onChange={e => setF({ ...f, meds: e.target.value })} placeholder="mis. Amlodipine 5 mg" className={inp} /></label>
            <label className="text-xs text-neutral-500">Catatan kesehatan lain<input value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} placeholder="mis. pernah operasi usus buntu 2022" className={inp} /></label>
          </div>
          </>}

          <div className="mt-6 flex items-center justify-end gap-2">
            {dirty && <span className="mr-auto text-xs text-amber-600">Ada perubahan yang belum disimpan</span>}
            <button onClick={() => setF(profile)} disabled={!dirty} className="rounded-full px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-50 disabled:opacity-40">Reset</button>
            <button onClick={() => { if (!f.name.trim()) return toast('Nama tidak boleh kosong'); setProfile(f); toast(isK ? 'Status kesehatan tersimpan' : 'Data diri tersimpan') }} className="rounded-full bg-[#141418] px-4 py-2 text-sm font-medium text-white hover:bg-black">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
const sameDay = (a: Date, b: Date) => dayKey(a) === dayKey(b)
// Deterministic mock history so other days look stable between renders
function mockDay(d: Date, target: number) {
  const n = d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate()
  const rnd = (k: number) => ((Math.sin(n * 9.13 + k * 3.7) + 1) / 2)
  return { kcal: Math.round(target * (0.7 + rnd(1) * 0.45)), sugar: +(20 + rnd(2) * 40).toFixed(1), salt: +(2 + rnd(3) * 4).toFixed(1), fat: +(35 + rnd(4) * 45).toFixed(1) }
}
function Highlights({ eaten, target, intake, go, profile }: { eaten: number; target: number; intake: { sugar: number; salt: number; fat: number }; go: (v: View) => void; profile: Prof }) {
  const today = new Date()
  const [date, setDate] = useState(today)
  const [cal, setCal] = useState(false)
  const [hover, setHover] = useState<{ d: Date; k: number } | null>(null)
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const isToday = sameDay(date, today)
  const day = isToday ? { kcal: eaten, ...intake } : mockDay(date, target)
  const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(date); d.setDate(d.getDate() - 6 + i); return { d, v: sameDay(d, today) ? eaten : mockDay(d, target).kcal } })
  const shift = (n: number) => { const d = new Date(date); d.setDate(d.getDate() + n); if (d <= today) setDate(d) }
  const pct = Math.round((day.kcal / target) * 100)
  const gglOver = (['sugar', 'salt', 'fat'] as const).filter(k => day[k] > LIMIT[k]).length
  const first = month.getDay(), days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const complete = profile.weight && profile.height
  return (
    <div className="space-y-3">
      <div className="rounded-[28px] bg-white/60 p-3">
        <div className="relative mb-2 px-1 pt-1">
          <div className="flex items-center justify-between"><p className="text-xs font-medium text-neutral-500">{isToday ? 'Highlight hari ini' : 'Highlight'}</p><button onClick={() => go('dashboard')} className="text-xs text-[#6b5ce7] hover:underline">Dashboard →</button></div>
          <div className="mt-2 flex items-center gap-1">
            <button onClick={() => shift(-1)} className="grid size-7 place-items-center rounded-full text-neutral-500 hover:bg-white" title="Hari sebelumnya"><Icon d={icons.arrow} className="size-3.5 rotate-180" /></button>
            <button onClick={() => { setCal(c => !c); setMonth(new Date(date.getFullYear(), date.getMonth(), 1)) }} aria-expanded={cal} className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-medium transition-colors ${cal ? 'bg-[#f3f0ff] text-[#5b4ee0]' : 'bg-white hover:bg-[#faf8ff]'}`}>
              <Icon d="M5 5h14v15H5zM5 9h14M9 3v4M15 3v4" className="size-3.5 text-[#6b5ce7]" />{date.toLocaleDateString('id', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </button>
            <button onClick={() => shift(1)} disabled={isToday} className="grid size-7 place-items-center rounded-full text-neutral-500 hover:bg-white disabled:opacity-30" title="Hari berikutnya"><Icon d={icons.arrow} className="size-3.5" /></button>
          </div>
          {!isToday && <button onClick={() => setDate(today)} className="mt-1.5 w-full text-center text-[11px] text-[#6b5ce7] hover:underline">Kembali ke hari ini</button>}
          <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${cal ? 'mt-2 grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'}`} aria-hidden={!cal}>
            <div className="min-h-0 overflow-hidden">
            <div className="rounded-[22px] bg-white p-3">
              <div className="flex items-center justify-between text-xs font-medium">
                <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-full p-1 hover:bg-neutral-100"><Icon d={icons.arrow} className="size-3.5 rotate-180" /></button>
                {month.toLocaleDateString('id', { month: 'long', year: 'numeric' })}
                <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} disabled={month.getMonth() === today.getMonth() && month.getFullYear() === today.getFullYear()} className="rounded-full p-1 hover:bg-neutral-100 disabled:opacity-30"><Icon d={icons.arrow} className="size-3.5" /></button>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-0.5 text-center text-[10px] text-neutral-400">{['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d, i) => <span key={i}>{d}</span>)}</div>
              <div className="mt-1 grid grid-cols-7 gap-0.5">
                {Array.from({ length: first }).map((_, i) => <span key={'e' + i} />)}
                {Array.from({ length: days }, (_, i) => {
                  const d = new Date(month.getFullYear(), month.getMonth(), i + 1)
                  const future = d > today, sel = sameDay(d, date)
                  const k = future ? 0 : sameDay(d, today) ? eaten : mockDay(d, target).kcal
                  const dot = future ? '' : k > target * 1.05 ? 'bg-rose-400' : k > target * 0.85 ? 'bg-emerald-400' : 'bg-amber-400'
                  return <button key={i} disabled={future} onMouseEnter={() => !future && setHover({ d, k })} onFocus={() => !future && setHover({ d, k })} onMouseLeave={() => setHover(null)} onBlur={() => setHover(null)} onClick={() => { setDate(d); setCal(false) }} className={`relative grid h-8 place-items-center rounded-full text-xs transition-colors duration-200 ${sel ? 'bg-[#8b7bff] font-semibold text-white' : sameDay(d, today) ? 'font-semibold text-[#5b4ee0] hover:bg-[#f3f0ff]' : 'hover:bg-[#f3f0ff] hover:font-medium hover:text-[#5b4ee0]'} disabled:hover:bg-transparent disabled:hover:font-normal disabled:text-neutral-300`}>
                    {i + 1}{dot && <span className={`absolute bottom-1 size-1 rounded-full ${dot}`} />}
                  </button>
                })}
              </div>
              <div className="relative mt-2 h-6"><div className={`absolute inset-0 flex items-center justify-center gap-3 text-[10px] text-neutral-500 transition-all duration-200 ${hover ? '-translate-y-1 opacity-0' : 'opacity-100'}`}><span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-400" />Sesuai</span><span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-amber-400" />Kurang</span><span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-rose-400" />Lebih</span></div><div className={`absolute inset-0 flex items-center justify-center gap-1.5 text-[11px] transition-all duration-200 ${hover ? 'opacity-100' : 'translate-y-1 opacity-0'}`} aria-live="polite">
                  {hover && <><span className="text-neutral-500">{hover.d.toLocaleDateString('id', { weekday: 'short', day: 'numeric', month: 'short' })}</span><span className="text-neutral-300">·</span><span className="font-semibold text-neutral-800">{hover.k.toLocaleString('id')} kkal</span><span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${hover.k > target * 1.05 ? 'bg-rose-50 text-rose-600' : hover.k > target * 0.85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{hover.k > target * 1.05 ? 'Lebih' : hover.k > target * 0.85 ? 'Sesuai' : 'Kurang'}</span></>}
                </div></div>
            </div>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <button onClick={() => go('diary')} className={`${card} ${hov} p-4 text-left`}>
            <p className="text-[11px] font-medium text-neutral-600">Asupan kalori</p>
            <div className="mt-2 flex items-center gap-3"><Ring value={day.kcal} max={target} size={56} /><div><p className="text-lg font-semibold">{day.kcal.toLocaleString('id')}</p><p className="text-[11px] text-neutral-400">dari {target.toLocaleString('id')} kkal</p></div></div>
            <p className="mt-2 text-[11px] leading-relaxed text-neutral-400">{pct > 105 ? `Melebihi target ${pct - 100}%. Seimbangkan dengan aktivitas ringan.` : pct >= 85 ? 'Sesuai target energi harian.' : `Masih kurang ${target - day.kcal} kkal dari kebutuhan harian.`}</p>
          </button>
          <button onClick={() => go('ggl')} className={`${card} ${hov} p-4 text-left`}>
            <p className="mb-2 text-[11px] font-medium text-neutral-600">Batas Gula · Garam · Lemak</p>
            {([['Gula', day.sugar, LIMIT.sugar, 'bg-violet-400'], ['Garam', day.salt, LIMIT.salt, 'bg-amber-400'], ['Lemak', day.fat, LIMIT.fat, 'bg-pink-400']] as const).map(([n, v, m, c]) => (
              <div key={n} className="mb-1.5"><div className="flex justify-between text-[11px]"><span className="text-neutral-500">{n}</span><span className={v > m ? 'text-rose-500' : 'text-neutral-400'}>{v}/{m} g</span></div><div className="mt-0.5 h-1 rounded-full bg-neutral-100"><div className={`h-full rounded-full ${v > m ? 'bg-rose-400' : c}`} style={{ width: `${Math.min((v / m) * 100, 100)}%` }} /></div></div>
            ))}
            <p className="mt-2 text-[11px] leading-relaxed text-neutral-400">{gglOver ? `${gglOver} batas terlewati. Batas harian mengikuti Permenkes 30/2013.` : 'Semua masih di bawah batas harian Permenkes 30/2013.'}</p>
          </button>
          <button onClick={() => go('dashboard')} className={`${card} ${hov} p-4 text-left`}>
            <p className="text-[11px] font-medium text-neutral-600">Tren kalori 7 hari</p>
            <div className="mt-2 flex h-12 items-end gap-1.5">{week.map(({ d, v }, i) => <div key={i} title={`${d.toLocaleDateString('id', { day: 'numeric', month: 'short' })}: ${v} kkal`} className={`flex-1 rounded-t ${v > target ? 'bg-rose-200' : 'bg-gradient-to-t from-[#a99bff] to-[#f3a6d8]'} ${i === 6 ? 'ring-1 ring-[#a99bff]' : ''}`} style={{ height: `${Math.min(v / (target * 1.3), 1) * 100}%` }} />)}</div>
            <div className="mt-1 flex justify-between text-[9px] text-neutral-400"><span>{week[0].d.toLocaleDateString('id', { day: 'numeric', month: 'short' })}</span><span>{week[6].d.toLocaleDateString('id', { day: 'numeric', month: 'short' })}</span></div>
            <p className="mt-2 text-[11px] leading-relaxed text-neutral-400">Rata-rata {Math.round(week.reduce((a, w) => a + w.v, 0) / 7).toLocaleString('id')} kkal/hari. Batang merah berarti melebihi target.</p>
          </button>
        </div>
      </div>
      <button onClick={() => go('health')} className={`block w-full rounded-[28px] border p-4 text-left text-xs transition hover:border-[#d9d1ff] ${complete ? 'border-neutral-100 bg-white' : 'border-dashed border-[#d9d1ff] bg-[#faf8ff]'}`}>
        <div className="flex items-center justify-between"><p className="font-medium text-[#5b4ee0]">{complete ? 'Profil kesehatan' : 'Lengkapi profil kesehatan'}</p><Icon d={icons.arrow} className="size-3.5 text-[#6b5ce7]" /></div>
        {complete ? (
          <div className="mt-2 space-y-1 text-neutral-600">
            <p>BB {profile.weight} kg · TB {profile.height} cm · BMI {bmiOf(profile)} ({bmiLabel(bmiOf(profile))})</p>
            <p>Riwayat: {profile.conditions.join(', ') || 'tidak ada'}</p>
            <p>Alergi: {profile.allergies.join(', ') || 'tidak ada'}</p>
          </div>
        ) : <p className="mt-1.5 leading-relaxed text-neutral-500">Isi BB, TB, riwayat kesehatan, dan alergi supaya Nuri bisa menilai nutrisimu dengan tepat.</p>}
      </button>
    </div>
  )
}

function NutriCard({ g }: { g: Ggl }) {
  const mac: [string, number, string][] = [['Protein', g.protein, 'bg-sky-400'], ['Karbo', g.carbs, 'bg-violet-400'], ['Lemak', g.fat, 'bg-pink-400']]
  const tot = g.protein * 4 + g.carbs * 4 + g.fat * 9
  return (
    <div className="mt-3 rounded-3xl border border-emerald-100 bg-white p-5">
      <div className="flex items-baseline justify-between"><p className="font-medium text-neutral-900">{g.name} · 1 porsi</p><p className="text-lg font-semibold">{g.kcal} <span className="text-xs font-normal text-neutral-400">kkal</span></p></div>
      <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">{mac.map(([n, v, c]) => <div key={n} className={c} style={{ width: `${((v * (n === 'Lemak' ? 9 : 4)) / tot) * 100}%` }} />)}</div>
      <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs">
        {mac.map(([n, v, c]) => <div key={n}><p className="font-semibold">{v} g</p><p className="flex items-center justify-center gap-1 text-neutral-400"><span className={`size-1.5 rounded-full ${c}`} />{n}</p></div>)}
        <div><p className="font-semibold">{g.fiber} g</p><p className="text-neutral-400">Serat</p></div>
      </div>
      <p className="mt-4 text-xs font-medium text-neutral-500">Vitamin & mineral (% AKG)</p>
      <div className="mt-1 grid grid-cols-2 gap-x-4">
        {g.micro.map(([n, v]) => <div key={n} className="mt-2"><div className="flex justify-between text-[11px]"><span className="text-neutral-600">{n}</span><span className="text-neutral-400">{v}%</span></div><div className="mt-1 h-1.5 rounded-full bg-neutral-100"><div className={`h-full rounded-full ${v >= 25 ? 'bg-emerald-400' : 'bg-neutral-300'}`} style={{ width: `${Math.min(v, 100)}%` }} /></div></div>)}
      </div>
      <Sources items={g.items} />
    </div>
  )
}

type Dish = { name: string; kcal: number; protein: number; sugar: number; salt: number; allergens: string[]; tags: string[] }
const catalog: Record<string, Dish[]> = {
  Sarapan: [
    { name: 'Oat pisang + chia', kcal: 340, protein: 11, sugar: 9, salt: 0.2, allergens: ['Gluten'], tags: ['Vegetarian', 'Tinggi serat'] },
    { name: 'Nasi merah ½, telur rebus, tumis bayam', kcal: 420, protein: 18, sugar: 3, salt: 0.9, allergens: ['Telur'], tags: ['Tinggi protein'] },
    { name: 'Bubur kacang hijau tanpa santan', kcal: 280, protein: 12, sugar: 8, salt: 0.1, allergens: [], tags: ['Vegetarian', 'Rendah kalori'] },
    { name: 'Roti gandum, alpukat, telur orak-arik', kcal: 390, protein: 16, sugar: 4, salt: 1, allergens: ['Gluten', 'Telur'], tags: ['Tinggi protein'] },
    { name: 'Lontong sayur labu', kcal: 450, protein: 10, sugar: 5, salt: 2.1, allergens: [], tags: [] },
  ],
  'Makan siang': [
    { name: 'Pepes ikan, sayur asem, tempe', kcal: 560, protein: 34, sugar: 6, salt: 1.4, allergens: ['Seafood', 'Kedelai'], tags: ['Tinggi protein'] },
    { name: 'Nasi merah, ayam bakar, lalapan', kcal: 590, protein: 36, sugar: 5, salt: 1.3, allergens: [], tags: ['Tinggi protein'] },
    { name: 'Gado-gado tanpa kerupuk', kcal: 420, protein: 17, sugar: 9, salt: 1.2, allergens: ['Kacang', 'Telur', 'Kedelai'], tags: ['Vegetarian', 'Tinggi serat'] },
    { name: 'Sup tahu sayur + nasi ½', kcal: 380, protein: 18, sugar: 4, salt: 1.1, allergens: ['Kedelai'], tags: ['Vegetarian', 'Rendah kalori'] },
    { name: 'Nasi padang rendang', kcal: 780, protein: 30, sugar: 6, salt: 2.9, allergens: [], tags: [] },
  ],
  'Makan malam': [
    { name: 'Sup ayam bening, tahu kukus', kcal: 450, protein: 30, sugar: 4, salt: 1.2, allergens: ['Kedelai'], tags: ['Tinggi protein'] },
    { name: 'Ikan kembung bakar, capcay', kcal: 470, protein: 32, sugar: 5, salt: 1.3, allergens: ['Seafood'], tags: ['Tinggi protein'] },
    { name: 'Tumis brokoli jamur, tempe panggang', kcal: 360, protein: 20, sugar: 4, salt: 0.9, allergens: ['Kedelai'], tags: ['Vegetarian', 'Rendah kalori'] },
    { name: 'Pecel sayur + nasi merah ½', kcal: 410, protein: 14, sugar: 8, salt: 1, allergens: ['Kacang'], tags: ['Vegetarian', 'Tinggi serat'] },
    { name: 'Mie goreng telur', kcal: 560, protein: 14, sugar: 7, salt: 3.2, allergens: ['Gluten', 'Telur'], tags: [] },
  ],
  Snack: [
    { name: 'Pepaya + yogurt plain', kcal: 180, protein: 7, sugar: 12, salt: 0.1, allergens: ['Susu'], tags: ['Vegetarian'] },
    { name: 'Edamame rebus', kcal: 150, protein: 12, sugar: 2, salt: 0.3, allergens: ['Kedelai'], tags: ['Vegetarian', 'Tinggi protein'] },
    { name: 'Apel + segenggam almond', kcal: 200, protein: 5, sugar: 14, salt: 0, allergens: ['Kacang'], tags: ['Vegetarian', 'Tinggi serat'] },
    { name: 'Ubi rebus', kcal: 130, protein: 2, sugar: 6, salt: 0, allergens: [], tags: ['Vegetarian', 'Rendah kalori'] },
  ],
}
type Grp = 'grain' | 'animal' | 'plant' | 'veg' | 'fruit' | 'dairy'
const grpMeta: Record<Grp, { label: string; icon: string; cls: string }> = {
  grain: { label: 'Biji-bijian', icon: 'M12 21V9M12 9c-2-1-3-3-3-5 2 0 3 1.5 3 3 0-1.5 1-3 3-3 0 2-1 4-3 5zM12 15c-2-1-3.5-2.5-3.5-4.5 2 0 3.5 1.5 3.5 3 0-1.5 1.5-3 3.5-3 0 2-1.5 3.5-3.5 4.5z', cls: 'bg-amber-50 text-amber-700' },
  animal: { label: 'Lauk hewani', icon: 'M15 4a5 5 0 015 5c0 3-3 5-6 5l-4 4a2 2 0 11-3-3l4-4c0-3 1-7 4-7z', cls: 'bg-rose-50 text-rose-600' },
  plant: { label: 'Lauk nabati', icon: 'M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8', cls: 'bg-orange-50 text-orange-600' },
  veg: { label: 'Sayur', icon: 'M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7', cls: 'bg-emerald-50 text-emerald-700' },
  fruit: { label: 'Buah', icon: 'M12 7c-3-2-8-1-8 5 0 5 3 9 5 9 1 0 2-.5 3-.5s2 .5 3 .5c2 0 5-4 5-9 0-6-5-7-8-5zM12 7c0-2 1-4 3-4', cls: 'bg-pink-50 text-pink-600' },
  dairy: { label: 'Susu', icon: 'M7 3h10l-1 18H8zM7 8h10', cls: 'bg-sky-50 text-sky-700' },
}
const dishMeta: Record<string, { img?: string; groups: Grp[] }> = {
  "Oat pisang + chia": { img: "https://images.unsplash.com/photo-1685600049052-0e0c079e9cf9?auto=format&fit=crop&w=400&h=280&q=70", groups: ["grain", "fruit"] },
  "Nasi merah ½, telur rebus, tumis bayam": { img: "https://images.unsplash.com/photo-1626266799523-941311ea2273?auto=format&fit=crop&w=400&h=280&q=70", groups: ["grain", "animal", "veg"] },
  "Bubur kacang hijau tanpa santan": { img: "https://images.unsplash.com/photo-1663416828724-e8a9967f7a91?auto=format&fit=crop&w=400&h=280&q=70", groups: ["plant", "grain"] },
  "Roti gandum, alpukat, telur orak-arik": { img: "https://images.unsplash.com/photo-1687276287139-88f7333c8ca4?auto=format&fit=crop&w=400&h=280&q=70", groups: ["grain", "fruit", "animal"] },
  "Lontong sayur labu": { img: "https://images.unsplash.com/photo-1653286015629-8374ed4c9783?auto=format&fit=crop&w=400&h=280&q=70", groups: ["grain", "veg"] },
  "Pepes ikan, sayur asem, tempe": { img: "https://images.unsplash.com/photo-1658218615127-40b7068bbae5?auto=format&fit=crop&w=400&h=280&q=70", groups: ["animal", "veg", "plant"] },
  "Nasi merah, ayam bakar, lalapan": { img: "https://images.unsplash.com/photo-1791559219438-e07803de6d1a?auto=format&fit=crop&w=400&h=280&q=70", groups: ["grain", "animal", "veg"] },
  "Gado-gado tanpa kerupuk": { img: "https://images.unsplash.com/photo-1707269561481-a4a0370a980a?auto=format&fit=crop&w=400&h=280&q=70", groups: ["veg", "plant"] },
  "Sup tahu sayur + nasi ½": { img: "https://images.unsplash.com/photo-1684866907269-2248f7334a09?auto=format&fit=crop&w=400&h=280&q=70", groups: ["plant", "veg", "grain"] },
  "Nasi padang rendang": { img: "https://images.unsplash.com/photo-1658218615127-40b7068bbae5?auto=format&fit=crop&w=400&h=280&q=70", groups: ["grain", "animal"] },
  "Sup ayam bening, tahu kukus": { img: "https://images.unsplash.com/photo-1652088079703-38f4a8d6b981?auto=format&fit=crop&w=400&h=280&q=70", groups: ["animal", "plant", "veg"] },
  "Ikan kembung bakar, capcay": { img: "https://images.unsplash.com/photo-1600699899970-b1c9fadd8f9e?auto=format&fit=crop&w=400&h=280&q=70", groups: ["animal", "veg"] },
  "Tumis brokoli jamur, tempe panggang": { img: "https://images.unsplash.com/photo-1601226809816-b8c32440158a?auto=format&fit=crop&w=400&h=280&q=70", groups: ["veg", "plant"] },
  "Pecel sayur + nasi merah ½": { img: "https://images.unsplash.com/photo-1771914248554-2b9120d60698?auto=format&fit=crop&w=400&h=280&q=70", groups: ["veg", "grain", "plant"] },
  "Mie goreng telur": { img: "https://images.unsplash.com/photo-1600326145359-3a44909d1a39?auto=format&fit=crop&w=400&h=280&q=70", groups: ["grain", "animal"] },
  "Pepaya + yogurt plain": { groups: ["fruit", "dairy"] },
  "Edamame rebus": { img: "https://images.unsplash.com/photo-1649257171206-37625b1f3b2f?auto=format&fit=crop&w=400&h=280&q=70", groups: ["plant"] },
  "Apel + segenggam almond": { img: "https://images.unsplash.com/photo-1596065134458-023b43e1a1b0?auto=format&fit=crop&w=400&h=280&q=70", groups: ["fruit", "plant"] },
  "Ubi rebus": { img: "https://images.unsplash.com/photo-1730815048561-45df6f7f331d?auto=format&fit=crop&w=400&h=280&q=70", groups: ["grain"] },
}
function dishIssue(d: Dish, p: Prof) {
  const a = d.allergens.find(x => p.allergies.includes(x)); if (a) return `Alergi ${a}`
  if (p.conditions.includes('Hipertensi') && d.salt > 1.5) return 'Garam tinggi'
  if (p.conditions.includes('Diabetes') && d.sugar > 10) return 'Gula tinggi'
  return ''
}
function MealPlanner({ profile, target, initPref, onSave }: { profile: Prof; target: number; initPref: string[]; onSave: (x: { meal: string; name: string; kcal: number }[]) => void }) {
  const [pref, setPref] = useState<string[]>(initPref)
  const [seed, setSeed] = useState(0)
  const [saved, setSaved] = useState(false)
  const opts = (meal: string) => {
    const list = catalog[meal].filter(d => !dishIssue(d, profile) && pref.every(t => (t === 'Rendah garam' ? d.salt <= 1.3 : d.tags.includes(t))))
    const rot = list.length ? seed % list.length : 0
    return [...list.slice(rot), ...list.slice(0, rot)].slice(0, 3)
  }
  const meals = Object.keys(catalog)
  const [sel, setSel] = useState<Record<string, string>>({})
  const byMeal = meals.map(m => opts(m).find(d => d.name === sel[m]) ?? opts(m)[0])
  const chosen = byMeal.filter(Boolean) as Dish[]
  const total = chosen.reduce((a, d) => a + d.kcal, 0), protein = chosen.reduce((a, d) => a + d.protein, 0), salt = chosen.reduce((a, d) => a + d.salt, 0)
  const hidden = meals.flatMap(m => catalog[m].filter(d => dishIssue(d, profile))).length
  const diff = total - target
  return (
    <div className="mt-3 rounded-3xl border border-neutral-200 bg-white p-5 text-neutral-700">
      <div className="flex flex-wrap items-center gap-1.5">
        {['Tinggi protein', 'Rendah kalori', 'Rendah garam', 'Vegetarian', 'Tinggi serat'].map(t => <button key={t} onClick={() => { setPref(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]); setSel({}); setSaved(false) }} className={`rounded-full border px-2.5 py-1 text-[11px] ${pref.includes(t) ? 'border-[#c9bfff] bg-[#f3f0ff] text-[#5b4ee0]' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}>{t}</button>)}
        <button onClick={() => { setSeed(x => x + 1); setSel({}); setSaved(false) }} className="ml-auto flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] text-[#6b5ce7] hover:bg-[#f5f2ff]"><Icon d={icons.shuffle} className="size-3.5" />Opsi lain</button>
      </div>
      {meals.map(m => {
        const o = opts(m)
        return (
          <div key={m} className="mt-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">{m}</p>
            {o.length === 0 ? <p className="mt-1 text-xs text-neutral-400">Tidak ada opsi untuk filter ini. Coba kurangi filter.</p> : (
              <div className="mt-1.5 grid gap-1.5 sm:grid-cols-3">
                {o.map(d => { const on = (sel[m] ?? o[0].name) === d.name; return (
                  <button key={d.name} onClick={() => { setSel(x => ({ ...x, [m]: d.name })); setSaved(false) }} className={`group overflow-hidden rounded-3xl border p-1.5 text-left text-xs transition ${on ? 'border-[#a99bff] bg-[#f5f2ff] ring-1 ring-[#c9bfff]' : 'border-neutral-200 bg-white hover:border-[#d9d1ff]'}`}>
                    <div className="relative h-24 overflow-hidden rounded-[20px] bg-gradient-to-br from-[#f3f0ff] to-[#fdeef6]">
                      {dishMeta[d.name]?.img ? <img src={dishMeta[d.name].img} alt={d.name} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid size-full place-items-center">{(dishMeta[d.name]?.groups ?? []).slice(0, 2).map(g => <Icon key={g} d={grpMeta[g].icon} className="size-7 text-[#a99bff]" />)}</div>}
                      {on && <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-white text-[#6b5ce7]"><Icon d={icons.check} className="size-3.5" /></span>}
                      <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-neutral-800 backdrop-blur">{d.kcal} kkal</span>
                    </div>
                    <div className="px-1.5 pb-1.5 pt-2">
                      <p className="font-medium leading-snug text-neutral-800">{d.name}</p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">Protein {d.protein} g · Garam {d.salt} g</p>
                      <div className="mt-2 flex flex-wrap gap-1">{(dishMeta[d.name]?.groups ?? []).map(g => <span key={g} title={grpMeta[g].label} className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${grpMeta[g].cls}`}><Icon d={grpMeta[g].icon} className="size-3" />{grpMeta[g].label}</span>)}</div>
                    </div>
                  </button>) })}
              </div>
            )}
          </div>
        )
      })}
      <div className="mt-4 rounded-2xl bg-neutral-50 p-4">
        <div className="flex items-center justify-between text-xs"><span>Total <b className="text-neutral-900">{total}</b> / {target} kkal</span><span className={Math.abs(diff) <= 150 ? 'text-emerald-600' : 'text-amber-600'}>{Math.abs(diff) <= 150 ? 'Pas dengan target' : diff > 0 ? `+${diff} kkal` : `${diff} kkal`}</span></div>
        <div className="mt-1.5 h-1.5 rounded-full bg-neutral-200"><div className={`h-full rounded-full transition-all ${diff > 150 ? 'bg-amber-400' : 'bg-gradient-to-r from-[#a99bff] to-[#f3a6d8]'}`} style={{ width: `${Math.min((total / target) * 100, 100)}%` }} /></div>
        <p className="mt-2 text-[11px] text-neutral-500">Protein {protein} g · Garam {salt.toFixed(1)} / 5 g{hidden > 0 && ` · ${hidden} menu disembunyikan karena tidak cocok dengan status kesehatanmu`}</p>
        <div className="mt-2 flex flex-wrap gap-1">{(Object.keys(grpMeta) as Grp[]).filter(g => chosen.some(d => dishMeta[d.name]?.groups.includes(g))).map(g => <span key={g} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${grpMeta[g].cls}`}><Icon d={grpMeta[g].icon} className="size-3" />{grpMeta[g].label}</span>)}{(['grain', 'animal', 'veg', 'fruit'] as Grp[]).filter(g => !chosen.some(d => dishMeta[d.name]?.groups.includes(g))).map(g => <span key={g} className="rounded-full border border-dashed border-neutral-300 px-2 py-0.5 text-[10px] text-neutral-400">Belum ada {grpMeta[g].label.toLowerCase()}</span>)}</div>
        <p className="mt-1 text-[10px] text-neutral-400">Nilai gizi dihitung dari TKPI 2017 Kemenkes RI (bahan mentah) dengan resep standar. Bumbu olahan diestimasi AI.</p>
      </div>
      <button disabled={saved || !chosen.length} onClick={() => { onSave(meals.map((m, i) => byMeal[i] && { meal: m, name: byMeal[i].name, kcal: byMeal[i].kcal }).filter(Boolean) as { meal: string; name: string; kcal: number }[]); setSaved(true) }} className="mt-3 w-full rounded-full bg-[#141418] py-2 text-sm font-medium text-white hover:bg-black disabled:bg-emerald-600">{saved ? '✓ Tersimpan di Food Diary' : 'Simpan ke Food Diary'}</button>
    </div>
  )
}

const helpTopics: { id: string; title: string; icon: string; cta: string; what: string; steps: string[]; output: string[]; tips: string }[] = [
  { id: 'ggl', title: 'Cek GGL dari Foto', icon: icons.cam, cta: 'Coba cek GGL', what: 'Nuri membaca foto makananmu, menguraikannya menjadi bahan mentah sesuai TKPI Kemenkes, lalu menghitung kandungan Gula, Garam, dan Lemak (GGL) per porsi.',
    steps: ['Klik kartu "Cek GGL dari Foto" atau tombol di kolom chat.', 'Pilih atau ambil foto makanan. Pastikan seluruh porsi terlihat jelas.', 'Tunggu Nuri menganalisis (±2 detik).', 'Hasil otomatis dicatat ke Food Diary dan Dashboard.'],
    output: ['Skor GGL: baik / sedang / buruk', 'Gula, garam, lemak dibanding batas per makan', 'Daftar bahan (TKPI)', 'Peringatan sesuai alergi & riwayat penyakitmu'], tips: 'Foto dari atas dengan cahaya cukup memberi hasil paling akurat. Batas harian mengikuti Permenkes No. 30/2013: gula 50 g, garam 5 g, lemak 67 g.' },
  { id: 'nutri', title: 'Cek Nutrisi dari Foto', icon: icons.leaf, cta: 'Coba cek nutrisi', what: 'Analisis gizi lengkap dari foto: energi, makronutrien, serat, serta vitamin & mineral dalam persen Angka Kecukupan Gizi (AKG).',
    steps: ['Klik kartu "Cek Nutrisi dari Foto".', 'Upload foto makananmu.', 'Lihat komposisi makro dan %AKG mikronutrien.', 'Baca catatan Nuri yang dicocokkan dengan status kesehatanmu.'],
    output: ['Kalori per porsi', 'Protein, karbohidrat, lemak, serat', 'Vitamin A, C, zat besi, kalsium (%AKG)', 'Saran pelengkap gizi'], tips: 'Gunakan fitur ini kalau kamu ingin tahu kecukupan gizi, dan Cek GGL kalau fokusmu membatasi gula, garam, dan lemak.' },
  { id: 'menu', title: 'Rencana Menu', icon: icons.diary, cta: 'Buat rencana menu', what: 'Perencana menu interaktif harian yang otomatis menyesuaikan target kalori, alergi, dan kondisi kesehatanmu.',
    steps: ['Klik kartu "Rencana Menu".', 'Pilih filter: tinggi protein, rendah kalori, vegetarian, atau tinggi serat.', 'Klik salah satu dari 3 opsi di setiap waktu makan. Tekan "Opsi lain" untuk variasi.', 'Tekan "Simpan ke Food Diary".'],
    output: ['Total kalori vs target harian', 'Total protein & garam', 'Menu yang tidak aman otomatis disembunyikan'], tips: 'Target kalori dihitung dari BB, TB, usia, dan aktivitas di Status Kesehatan. Lengkapi datanya agar rencana lebih tepat.' },
  { id: 'status', title: 'Cek Nutrisiku', icon: icons.profile, cta: 'Cek nutrisiku sekarang', what: 'Nuri membaca Status Kesehatanmu (BB, TB, usia, alergi, riwayat penyakit, obat) lalu memberi ringkasan apakah nutrisimu sudah oke.',
    steps: ['Lengkapi data di menu Status Kesehatan.', 'Klik kartu "Cek Nutrisiku" atau tanya "nutrisiku oke nggak?" di chat.', 'Baca ringkasan dan tips dari Nuri.'],
    output: ['BMI dan statusnya (standar Asia-Pasifik)', 'Kebutuhan energi harian (Mifflin-St Jeor × aktivitas)', 'Tips per kondisi: hipertensi, diabetes, kolesterol, ginjal', 'Pengingat alergi & interaksi obat'], tips: 'Hasil ini bersifat edukatif, bukan diagnosis. Selalu konsultasikan kondisi medis dengan dokter atau ahli gizi.' },
]
function HelpCenter({ topic, setTopic, run }: { topic: string; setTopic: (t: string) => void; run: (k: string) => void }) {
  const refs = useRef<Record<string, HTMLElement | null>>({})
  useEffect(() => { refs.current[topic]?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [topic])
  return (
    <div className="flex flex-1 overflow-hidden bg-[#faf9fe]">
      <nav className="hidden w-60 shrink-0 border-r border-neutral-100 p-5 md:block">
        <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">Daftar isi</p>
        <ol className="mt-3 space-y-0.5 text-sm">
          {helpTopics.map((t, i) => <li key={t.id}><button onClick={() => setTopic(t.id)} className={`flex w-full items-center gap-2 rounded-full px-2.5 py-2 text-left ${topic === t.id ? 'bg-white font-medium text-[#5b4ee0] shadow-sm' : 'text-neutral-600 hover:bg-white/70'}`}><span className="w-4 text-xs text-neutral-400">{i + 1}</span>{t.title}</button></li>)}
        </ol>
        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#f3f0ff] to-[#fdeef6] p-3 text-xs text-neutral-600"><Nuri size={40} mood="love" glow={false} />Masih bingung? Klik aku di pojok kanan bawah!</div>
      </nav>
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex gap-1.5 overflow-x-auto md:hidden">{helpTopics.map(t => <button key={t.id} onClick={() => setTopic(t.id)} className={`shrink-0 rounded-full border px-3 py-1 text-xs ${topic === t.id ? 'border-[#c9bfff] bg-[#f3f0ff] text-[#5b4ee0]' : 'border-neutral-200 bg-white text-neutral-500'}`}>{t.title}</button>)}</div>
          {helpTopics.map((t, i) => (
            <section key={t.id} ref={el => { refs.current[t.id] = el }} className={`${card} scroll-mt-4 p-6 ${topic === t.id ? 'ring-2 ring-[#e3ddff]' : ''}`}>
              <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#f3f0ff] text-[#6b5ce7]"><Icon d={t.icon} className="size-5" /></span><div><p className="text-[11px] text-neutral-400">Fitur {i + 1}</p><h3 className="text-lg font-semibold tracking-tight">{t.title}</h3></div></div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">{t.what}</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div><p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Cara pakai</p><ol className="mt-2 space-y-2 text-sm text-neutral-700">{t.steps.map((st, j) => <li key={j} className="flex gap-2"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#141418] text-[10px] text-white">{j + 1}</span>{st}</li>)}</ol></div>
                <div><p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Yang kamu dapat</p><ul className="mt-2 space-y-2 text-sm text-neutral-700">{t.output.map(o => <li key={o} className="flex gap-2"><Icon d={icons.check} className="mt-0.5 size-4 shrink-0 text-emerald-500" />{o}</li>)}</ul></div>
              </div>
              <p className="mt-5 rounded-2xl bg-[#faf8ff] px-4 py-3 text-xs leading-relaxed text-neutral-600">{t.tips}</p>
              <button onClick={() => run(t.id)} className="mt-4 flex items-center gap-2 rounded-full bg-[#141418] px-4 py-2 text-sm font-medium text-white hover:bg-black">{t.cta}<Icon d={icons.arrow} className="size-4" /></button>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="size-5"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" /><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" /></svg>
)
type OnbMsg = { who: 'nuri' | 'me'; text: string }
const condOpts = ['Diabetes', 'Hipertensi', 'Kolesterol', 'Gagal ginjal', 'Asam urat', 'Maag/GERD', 'Anemia', 'Hamil/Menyusui']
const allergyOptsAll = ['Kacang', 'Susu', 'Telur', 'Seafood', 'Gluten', 'Kedelai']
const phaseFromAge = (years: number) => phases[years < 0.5 ? 0 : years < 2 ? 1 : years < 13 ? 2 : years < 19 ? 3 : years < 60 ? 4 : 5]

function Onboarding({ initial, onDone, toggles }: { initial: Prof; toggles?: React.ReactNode; onDone: (p: Prof, ph: typeof phases[0], first: string) => void }) {
  const [stage, setStage] = useState<'landing' | 'google' | 'chat'>('landing')
  const [phase, setPhase] = useState(phases[4])
  const [text, setText] = useState('')
  const [first, setFirst] = useState('')
  const [p, setP] = useState<Prof>({ ...blankProfile, name: initial.name || 'Putri Wulan' })
  const [other, setOther] = useState(false)
  const [acct, setAcct] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  // Conversational screening
  const [step, setStep] = useState<'age' | 'body' | 'cond' | 'allergy' | 'done'>('age')
  const [log, setLog] = useState<OnbMsg[]>([])
  const [typing, setTyping] = useState(false)
  const [ans, setAns] = useState('')
  const [picked, setPicked] = useState<string[]>([])
  const endRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  // Scroll only the chat panel (not the page) so new messages glide in
  useEffect(() => { const b = boxRef.current; if (b) b.scrollTo({ top: b.scrollHeight, behavior: 'smooth' }) }, [log, typing, step])

  const start = (t: string) => { setFirst(t); setStage('google') }
  const nuriSays = (t: string, then?: () => void) => { setTyping(true); setTimeout(() => { setLog(l => [...l, { who: 'nuri', text: t }]); setTyping(false); then?.() }, 650) }
  const signIn = (name: string, email: string) => {
    setLoading(true)
    setTimeout(() => {
      const nm = name || 'Pengguna NutriChat'
      setP(x => ({ ...x, name: nm, phone: email })); setLoading(false); setStage('chat')
      setLog([{ who: 'nuri', text: `Halo, ${nm.split(' ')[0]}! Sebelum mulai, aku mau kenalan singkat dulu ya, cuma 4 pertanyaan.` }])
      nuriSays('Berapa usiamu sekarang? (mis. 27, atau "8 bulan" untuk bayi)')
    }, 700)
  }
  const me = (t: string) => setLog(l => [...l, { who: 'me', text: t }])
  const answer = (raw: string) => {
    const t = raw.trim(); if (typing) return
    if (step === 'age') {
      if (/lewat/i.test(t)) { me('Lewati'); setStep('body'); return nuriSays('Oke! Berapa berat dan tinggi badanmu? (mis. "55 kg 160 cm")') }
      const n = parseFloat(t.replace(',', '.')); if (!n) return nuriSays('Hmm, aku butuh angka ya. Contoh: 27')
      const months = /bul|bln/i.test(t), years = months ? n / 12 : n
      const ph = phaseFromAge(years); setPhase(ph); setP(x => ({ ...x, age: months ? '' : String(n) })); me(months ? `${n} bulan` : `${n} tahun`); setStep('body')
      return nuriSays(`Siap, klaster usiamu ${ph.label} (${ph.age}). Sekarang, berapa berat dan tinggi badanmu? (mis. "55 kg 160 cm")`)
    }
    if (step === 'body') {
      if (/lewat/i.test(t)) { me('Lewati'); setStep('cond'); return nuriSays('Tidak apa-apa, nanti bisa dilengkapi. Apakah kamu punya kondisi kesehatan tertentu?') }
      const nums = (t.replace(',', '.').match(/\d+(\.\d+)?/g) || []).map(Number)
      if (nums.length < 2) return nuriSays('Tulis dua angka ya, berat (kg) dan tinggi (cm). Contoh: 55 160')
      const [bb, tb] = nums[0] < nums[1] ? [nums[0], nums[1]] : [nums[1], nums[0]]
      const np = { ...p, weight: String(bb), height: String(tb) }; setP(np); me(`${bb} kg, ${tb} cm`); setStep('cond')
      const b = bmiOf(np)
      return nuriSays(`BMI-mu ${b} (${bmiLabel(b)}). Lanjut: apakah kamu punya kondisi kesehatan tertentu? Pilih yang sesuai, atau "Tidak ada".`)
    }
    if (step === 'cond' || step === 'allergy') {
      const opts = step === 'cond' ? condOpts : allergyOptsAll
      const typed = opts.filter(o => t.toLowerCase().includes(o.toLowerCase().split('/')[0]))
      const list = [...new Set([...picked, ...typed])]
      const none = /tidak|nggak|gak|lewat|^-$/i.test(t) && !list.length
      me(none || !list.length ? 'Tidak ada' : list.join(', ')); setPicked([])
      if (step === 'cond') { setP(x => ({ ...x, conditions: list })); setStep('allergy'); return nuriSays(`${list.length ? `Dicatat: ${list.join(', ')}. Aku akan menyesuaikan batas GGL-mu.` : 'Bagus!'} Terakhir, ada alergi makanan?`) }
      const np = { ...p, allergies: list }; setP(np); setStep('done')
      const tdee = tdeeOf(np)
      return nuriSays(`Selesai! Target energimu ${(tdee || (np.gender === 'Pria' ? 2100 : 1800)).toLocaleString('id')} kkal/hari${list.length ? `, dan aku akan selalu mengingatkan soal ${list.join(', ').toLowerCase()}` : ''}. ${first && first !== '__photo__' ? 'Yuk, aku jawab pertanyaanmu tadi.' : 'Yuk mulai!'}`)
    }
  }
  const submit = () => { if (step === 'cond' || step === 'allergy') { if (ans.trim() || picked.length) answer(ans || ' ') } else if (ans.trim()) answer(ans); setAns('') }
  const quick = step === 'age' ? ['18', '27', '45', '65', 'Lewati'] : step === 'body' ? ['50 kg 155 cm', '60 kg 165 cm', 'Lewati'] : []

  const inp = 'mt-1 w-full rounded-full border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[#a99bff] focus:ring-4 focus:ring-[#efeaff]'
  const composer = (value: string, onChange: (v: string) => void, onSend: () => void, placeholder: string, extra?: React.ReactNode) => (
    <div className="w-full max-w-2xl rounded-[28px] border border-neutral-200/80 bg-white p-3 pl-4">
      <textarea value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() } }} rows={2} style={{ paddingTop: 10 }} placeholder={placeholder} className="w-full resize-none bg-transparent px-1 text-sm outline-none placeholder:text-neutral-400" />
      <div className="flex items-center justify-between pt-1"><div className="flex items-center gap-1">{extra}</div><button onClick={onSend} title="Kirim" className="btn-primary grid size-9 place-items-center rounded-full"><Icon d={icons.send} /></button></div>
    </div>
  )

  return (
    <div className="flex h-screen flex-col app-bg bg-[linear-gradient(160deg,#e9e3fb,#f6eef9_40%,#dfe6fb)]">
      <header className="flex items-center justify-between px-5 py-4 md:px-10">
        <div className="flex items-center gap-2"><Nuri size={30} glow={false} /><span className="text-lg font-semibold tracking-tight">NutriChat</span></div>
        <div className="flex items-center gap-2">{toggles}{stage !== 'chat' && <button onClick={() => start('')} className="btn-primary rounded-full px-5 py-2 text-sm">Masuk</button>}</div>
      </header>

      {stage !== 'chat' ? (
        <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16">
          <Nuri size={140} mood={stage === 'google' ? 'love' : text ? 'listening' : 'excited'} />
          <p className="mt-10 bg-gradient-to-r from-[#9a8cff] to-[#e79bd2] bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-3xl">Hai, aku Nuri, teman gizimu</p>
          <h1 className="mt-1 text-center text-[28px] font-medium leading-tight tracking-tight md:text-4xl">Yuk mulai analisis nutrisi harianmu</h1>
          <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-neutral-500">Cek GGL, nutrisi, dan rencana makan harianmu, mulai dari foto makanan.</p>
          <div className="mt-8 w-full max-w-2xl">{composer(text, setText, () => start(text.trim()), 'Tanya Nuri soal gizi…', <>
            <button onClick={() => start('__photo__')} className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-neutral-600 hover:bg-[#f3f0ff] hover:text-[#5b4ee0]"><Icon d={icons.cam} className="size-4" />Foto makanan</button>
            <button onClick={() => start('Buatkan rencana menu hari ini')} className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-neutral-600 hover:bg-[#f3f0ff] hover:text-[#5b4ee0]"><Icon d={icons.diary} className="size-4" />Rencana menu</button>
          </>)}</div>
        </main>
      ) : (
        <main className="flex min-h-0 flex-1 justify-center px-4 pb-6">
          <div className="flex min-h-0 w-full max-w-2xl flex-col rounded-[32px] border border-white/80 bg-white/55 p-3 backdrop-blur-xl md:p-4">
          <div ref={boxRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-4 [scroll-behavior:smooth]">
            <div className="mb-6 flex justify-center"><Nuri size={90} mood={step === 'done' ? 'excited' : typing ? 'thinking' : 'happy'} /></div>
            <div className="space-y-3">
              {log.map((m, i) => m.who === 'nuri' ? (
                <div key={i} className="pop flex gap-2.5"><Nuri size={30} mood="happy" glow={false} /><p className="max-w-[80%] rounded-3xl rounded-tl-lg bg-white px-4 py-2.5 text-sm text-neutral-700">{m.text}</p></div>
              ) : <div key={i} className="pop flex justify-end"><p className="max-w-[75%] rounded-3xl rounded-br-lg bg-[#ece7ff] px-4 py-2.5 text-sm text-[#3d3399]">{m.text}</p></div>)}
              {typing && <div className="flex items-center gap-2.5"><Nuri size={30} mood="thinking" glow={false} /><span className="flex gap-1 rounded-2xl bg-white px-4 py-3">{[0, 1, 2].map(k => <span key={k} className="dot size-1.5 rounded-full bg-[#a99bff]" style={{ animationDelay: `${k * .15}s` }} />)}</span></div>}
              {!typing && (step === 'cond' || step === 'allergy') && (
                <div className="pop ml-10 flex flex-wrap gap-1.5">
                  {(step === 'cond' ? condOpts : allergyOptsAll).map(o => <button key={o} onClick={() => setPicked(x => x.includes(o) ? x.filter(y => y !== o) : [...x, o])} className={`rounded-full border px-3 py-1.5 text-xs transition ${picked.includes(o) ? (step === 'cond' ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-amber-200 bg-amber-50 text-amber-700') : 'border-neutral-200 bg-white text-neutral-600 hover:border-[#c9bfff]'}`}>{picked.includes(o) ? '✓ ' : ''}{o}</button>)}
                  <button onClick={() => answer(picked.length ? ' ' : 'Tidak ada')} className={`rounded-full px-3 py-1.5 text-xs font-medium ${picked.length ? 'btn-primary' : 'border border-neutral-200 bg-white text-neutral-700 hover:border-[#c9bfff]'}`}>{picked.length ? `Kirim (${picked.length})` : 'Tidak ada'}</button>
                </div>
              )}
              {!typing && quick.length > 0 && <div className="pop ml-10 flex flex-wrap gap-1.5">{quick.map(q => <button key={q} onClick={() => answer(q)} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600 hover:border-[#c9bfff]">{q}</button>)}</div>}
              {step === 'done' && !typing && <div className="pop flex justify-center pt-2"><button onClick={() => onDone(p, phase, first)} className="btn-primary rounded-full px-6 py-3 text-sm">{first && first !== '__photo__' ? 'Lanjut ke jawaban Nuri' : 'Mulai ngobrol dengan Nuri'}</button></div>}
              <div ref={endRef} />
            </div>
          </div>
          {step !== 'done' && composer(ans, setAns, submit, step === 'age' ? 'Ketik usiamu…' : step === 'body' ? 'Ketik berat dan tinggi, mis. 55 kg 160 cm' : step === 'cond' ? 'Pilih di atas atau ketik, mis. hipertensi' : 'Pilih di atas atau ketik, mis. kacang')}
          </div>
        </main>
      )}

      {stage === 'google' && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#2a2350]/10 p-4" onClick={() => !loading && setStage('landing')}>
          <div onClick={e => e.stopPropagation()} className="pop relative w-full max-w-sm rounded-[28px] border border-white/80 bg-white/80 p-7 shadow-[0_30px_80px_-20px_rgba(90,70,180,.35)] backdrop-blur-xl">
            <button onClick={() => !loading && setStage('landing')} title="Tutup" className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-neutral-400 hover:bg-white hover:text-neutral-700"><Icon d={icons.x} /></button>
            <h2 className="text-center text-xl font-semibold tracking-tight">Masuk untuk lanjut</h2>
            <p className="mt-1 text-center text-sm text-neutral-500">{first && first !== '__photo__' ? <>Nuri siap menjawab “{first.length > 40 ? first.slice(0, 40) + '…' : first}”</> : 'Supaya riwayat dan data gizimu tersimpan.'}</p>
            {!other ? (
              <div className="mt-6 space-y-2">
                <button disabled={loading} onClick={() => signIn(p.name, 'putriwulan@gmail.com')} className="flex w-full items-center gap-3 rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-left hover:bg-neutral-50 disabled:opacity-50">
                  <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-[#cfe0ff] to-[#f6c4e4] text-sm font-semibold text-[#5a4fc8]">{initials(p.name)}</div>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{p.name}</p><p className="truncate text-xs text-neutral-400">putriwulan@gmail.com</p></div>
                  <GoogleG />
                </button>
                <button disabled={loading} onClick={() => setOther(true)} className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm font-medium hover:bg-neutral-50"><GoogleG />{loading ? 'Menghubungkan…' : 'Gunakan akun Google lain'}</button>
              </div>
            ) : (
              <div className="mt-6 space-y-2">
                <input autoFocus value={acct.name} onChange={e => setAcct({ ...acct, name: e.target.value })} placeholder="Nama" className={inp} />
                <input value={acct.email} onChange={e => setAcct({ ...acct, email: e.target.value })} onKeyDown={e => e.key === 'Enter' && signIn(acct.name, acct.email)} placeholder="email@gmail.com" className={inp} />
                <button disabled={loading} onClick={() => signIn(acct.name, acct.email)} className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm"><span className="grid size-6 place-items-center rounded-full bg-white"><GoogleG /></span>{loading ? 'Menghubungkan…' : 'Masuk dengan Google'}</button>
                <button onClick={() => setOther(false)} className="w-full py-1 text-xs text-neutral-500 hover:underline">Kembali</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ReportDoc({ profile, phase, target, eaten, intake, diary, growth }: { profile: Prof; phase: typeof phases[0]; target: number; eaten: number; intake: { sugar: number; salt: number; fat: number }; diary: Entry[]; growth: GrowthPt[] }) {
  const now = new Date()
  const b = bmiOf(profile), tdee = tdeeOf(profile)
  const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(now); d.setDate(d.getDate() - 6 + i); return { d, v: i === 6 ? eaten : mockDay(d, target).kcal } })
  const avg = Math.round(week.reduce((a, w) => a + w.v, 0) / 7)
  const ggl: [string, number, number][] = [['Gula', intake.sugar, LIMIT.sugar], ['Garam', intake.salt, LIMIT.salt], ['Lemak', intake.fat, LIMIT.fat]]
  const tips = [
    b >= 25 ? 'BMI di atas normal: targetkan defisit ±300–500 kkal/hari dan aktivitas 150 menit/minggu.' : b && b < 18.5 ? 'BMI di bawah normal: tambah porsi padat gizi dan protein di setiap waktu makan.' : b ? 'BMI normal: pertahankan pola makan seimbang Isi Piringku.' : 'Lengkapi BB, TB, dan usia untuk penilaian BMI dan kebutuhan energi.',
    profile.conditions.includes('Hipertensi') && 'Hipertensi: garam maks 5 g/hari, batasi kecap, kerupuk, makanan kaleng.',
    profile.conditions.includes('Diabetes') && 'Diabetes: pilih karbohidrat kompleks, gula tambahan maks 25 g/hari.',
    profile.conditions.includes('Kolesterol') && 'Kolesterol: kurangi gorengan & santan, perbanyak ikan dan serat.',
    profile.conditions.includes('Gagal ginjal') && 'Ginjal: batasi protein, kalium, fosfor sesuai arahan dokter.',
    profile.allergies.length > 0 && `Hindari makanan mengandung: ${profile.allergies.join(', ')}.`,
    ggl.some(([, v, m]) => v > m) && `Hari ini batas ${ggl.filter(([, v, m]) => v > m).map(g => g[0].toLowerCase()).join(', ')} terlewati. Seimbangkan di makan berikutnya.`,
  ].filter(Boolean) as string[]
  const Row = ({ l, v }: { l: string; v: React.ReactNode }) => <div className="flex justify-between gap-4 border-b border-neutral-100 py-1.5 text-[12px]"><span className="text-neutral-500">{l}</span><span className="text-right font-medium text-neutral-900">{v}</span></div>
  const H = ({ n, t }: { n: number; t: string }) => <h3 className="mb-2 mt-6 flex items-center gap-2 text-[13px] font-semibold text-neutral-900"><span className="grid size-5 place-items-center rounded-full bg-[#ece7ff] text-[10px] text-[#5b4ee0]">{n}</span>{t}</h3>
  return (
    <div className="report-doc mx-auto w-full max-w-[794px] bg-white px-5 py-6 text-neutral-800 sm:px-10 sm:py-10">
      <div className="flex items-start justify-between gap-3 border-b-2 border-[#8b7bff] pb-4">
        <div><p className="text-lg font-semibold leading-tight tracking-tight text-neutral-900 sm:text-xl">Laporan Status Kesehatan & Gizi</p><p className="mt-0.5 text-[11px] text-neutral-500">NutriChat · dibuat {now.toLocaleDateString('id', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}, {now.toLocaleTimeString('id', { hour: '2-digit', minute: '2-digit' })}</p></div>
        <div className="flex shrink-0 items-center gap-2 text-right"><div className="hidden sm:block"><p className="text-sm font-semibold">NutriChat</p><p className="text-[10px] text-neutral-400">ID {profile.phone ? btoa(profile.phone).slice(0, 8).toUpperCase() : 'TAMU'}</p></div><div className="size-9 rounded-full bg-gradient-to-br from-[#a99bff] to-[#f3a6d8]" /></div>
      </div>

      <H n={1} t="Identitas" />
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2"><div><Row l="Nama" v={profile.name || '–'} /><Row l="Email" v={profile.phone || '–'} /><Row l="Jenis kelamin" v={profile.gender} /></div><div><Row l="Usia" v={profile.age ? `${profile.age} tahun` : '–'} /><Row l="Klaster usia" v={`${phase.label} (${phase.age})`} /><Row l="Aktivitas" v={profile.activity} /></div></div>

      <H n={2} t="Status Antropometri" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{[['Berat badan', profile.weight ? `${profile.weight} kg` : '–'], ['Tinggi badan', profile.height ? `${profile.height} cm` : '–'], ['BMI', b ? `${b}` : '–', b ? bmiLabel(b) : ''], ['Kebutuhan energi', `${(tdee || target).toLocaleString('id')} kkal`, tdee ? 'Mifflin-St Jeor' : 'default']].map(([l, v, sub]) => <div key={l} className="rounded-2xl border border-neutral-200 p-3"><p className="text-[10px] text-neutral-500">{l}</p><p className="mt-0.5 text-base font-semibold text-neutral-900">{v}</p>{sub && <p className="text-[10px] text-neutral-500">{sub}</p>}</div>)}</div>

      <H n={3} t="Riwayat Kesehatan" />
      <Row l="Riwayat penyakit" v={profile.conditions.join(', ') || 'Tidak ada'} /><Row l="Alergi makanan" v={profile.allergies.join(', ') || 'Tidak ada'} /><Row l="Obat rutin" v={profile.meds || '–'} /><Row l="Catatan" v={profile.notes || '–'} />

      <H n={4} t={`Asupan Hari Ini (${now.toLocaleDateString('id', { day: 'numeric', month: 'short' })})`} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div><Row l="Total energi" v={`${eaten.toLocaleString('id')} / ${target.toLocaleString('id')} kkal (${Math.round((eaten / target) * 100)}%)`} />
          {ggl.map(([n, v, m]) => <div key={n} className="py-1.5"><div className="flex justify-between text-[12px]"><span className="text-neutral-500">{n}</span><span className={`font-medium ${v > m ? 'text-rose-600' : 'text-neutral-900'}`}>{v.toFixed(1)} / {m} g{v > m ? ' (lewat batas)' : ''}</span></div><div className="mt-1 h-1.5 rounded-full bg-neutral-100"><div className={`h-full rounded-full ${v > m ? 'bg-rose-500' : 'bg-[#8b7bff]'}`} style={{ width: `${Math.min((v / m) * 100, 100)}%` }} /></div></div>)}
        </div>
        <div><p className="text-[11px] text-neutral-500">Tren energi 7 hari · rata-rata {avg.toLocaleString('id')} kkal</p>
          <div className="mt-2 flex h-24 items-end gap-1.5">{week.map(({ d, v }, i) => <div key={i} className="flex flex-1 flex-col items-center gap-1"><div className={`w-full rounded-t ${v > target ? 'bg-rose-300' : 'bg-[#a99bff]'}`} style={{ height: `${Math.min(v / (target * 1.3), 1) * 80}px` }} /><span className="text-[9px] text-neutral-500">{d.getDate()}/{d.getMonth() + 1}</span></div>)}</div>
        </div>
      </div>

      <H n={5} t="Food Diary" />
      {diary.length ? (
        <table className="w-full text-[12px]"><thead><tr className="border-b border-neutral-300 text-left text-[10px] uppercase tracking-wide text-neutral-500"><th className="py-1.5 font-medium">Waktu</th><th className="font-medium">Kategori</th><th className="font-medium">Makanan</th><th className="text-right font-medium">Energi</th></tr></thead>
          <tbody>{diary.map(e => <tr key={e.id} className="border-b border-neutral-100"><td className="py-1.5 text-neutral-500">{e.time}</td><td>{e.meal}</td><td className="font-medium text-neutral-900">{e.name}</td><td className="text-right">{e.kcal} kkal</td></tr>)}</tbody></table>
      ) : <p className="text-[12px] text-neutral-500">Belum ada makanan tercatat.</p>}

      {growth.length > 0 && <><H n={6} t="Pertumbuhan Anak (WHO)" />
        <table className="w-full text-[12px]"><thead><tr className="border-b border-neutral-300 text-left text-[10px] uppercase tracking-wide text-neutral-500"><th className="py-1.5 font-medium">Usia</th><th className="font-medium">Berat</th><th className="font-medium">Tinggi</th><th className="text-right font-medium">Status BB</th></tr></thead>
          <tbody>{growth.map(g => { const ok = g.bb >= whoAt(WHO.bb.lo, g.m) && g.bb <= whoAt(WHO.bb.hi, g.m); return <tr key={g.m} className="border-b border-neutral-100"><td className="py-1.5">{g.m} bln</td><td>{g.bb} kg</td><td>{g.tb} cm</td><td className={`text-right ${ok ? 'text-emerald-600' : 'text-rose-600'}`}>{ok ? 'Normal' : 'Perlu perhatian'}</td></tr> })}</tbody></table></>}

      <H n={growth.length ? 7 : 6} t="Rekomendasi Nuri" />
      <ul className="space-y-1.5 text-[12px]">{tips.map(t => <li key={t} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#8b7bff]" />{t}</li>)}</ul>

      <div className="mt-8 border-t border-neutral-200 pt-3 text-[10px] leading-relaxed text-neutral-500">
        <p><b className="text-neutral-700">Sumber data:</b> Tabel Komposisi Pangan Indonesia (TKPI) 2017, Kemenkes RI; Permenkes No. 30/2013 (batas GGL); Standar Antropometri WHO; label gizi BPOM. Bahan yang belum tercakup TKPI diestimasi AI.</p>
        <p className="mt-1"><b className="text-neutral-700">Disclaimer:</b> Laporan ini bersifat edukatif dan bukan pengganti diagnosis medis. Konsultasikan dengan dokter atau ahli gizi. Data dilindungi sesuai UU PDP No. 27/2022.</p>
      </div>
    </div>
  )
}

function ReportPage(props: { profile: Prof; phase: typeof phases[0]; target: number; eaten: number; intake: { sugar: number; salt: number; fat: number }; diary: Entry[]; growth: GrowthPt[]; model: string; go: (v: View) => void }) {
  const complete = !!(props.profile.weight && props.profile.height && props.profile.age)
  const download = () => {
    const prev = document.title
    document.title = `Laporan-NutriChat-${(props.profile.name || 'pengguna').replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}`
    window.print()
    setTimeout(() => { document.title = prev }, 500)
  }
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#faf9fe]">
      <div className="flex flex-wrap items-center justify-end gap-3 border-b border-neutral-100 bg-white px-4 py-3 md:px-5">
        <div className="hidden flex-1 text-xs text-neutral-500 sm:block">Status kesehatan terbaru per {new Date().toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })}. Pilih <b className="text-neutral-700">"Simpan sebagai PDF"</b> di jendela cetak.</div>
        {!complete && <button onClick={() => props.go('health')} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-100">Lengkapi data dulu</button>}
        <button onClick={download} className="btn-primary flex items-center gap-2 rounded-full px-4 py-2 text-sm"><Icon d="M12 4v11M7 10l5 5 5-5M5 20h14" className="size-4" />Unduh PDF</button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 pb-24 md:p-8"><div className="mx-auto max-w-[794px] overflow-hidden rounded-[28px] border border-neutral-200"><ReportDoc {...props} /></div></div>
      {createPortal(<div id="print-root"><ReportDoc {...props} /></div>, document.body)}
    </div>
  )
}
