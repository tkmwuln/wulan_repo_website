import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type IconName =
  | "home"
  | "sparkles"
  | "chart"
  | "clock"
  | "scan"
  | "arrow"
  | "bell"
  | "check"
  | "send"
  | "mic"
  | "plus"
  | "wallet"
  | "shield"
  | "close"
  | "camera"
  | "chevron"
  | "lock"
  | "info"
  | "search"
  | "sun"
  | "moon"
  | "globe"
  | "menu";

const paths: Record<IconName, React.ReactNode> = {
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  sparkles: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" /><path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14ZM19 13l.7 1.8 1.8.7-1.8.7L19 18l-.7-1.8-1.8-.7 1.8-.7L19 13Z" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  scan: <><path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M8 21H4a1 1 0 0 1-1-1v-4M16 21h4a1 1 0 0 0 1-1v-4M7 12h10" /></>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  send: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  wallet: <><path d="M3 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" /><path d="M3 6V5a2 2 0 0 1 2-2h12v3M16 12h5" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  camera: <><path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10H2V9a2 2 0 0 1 2-2Z" /><circle cx="12" cy="13" r="4" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 15.2A8 8 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21M12 3C9.7 5.5 8.5 8.5 8.5 12S9.7 18.5 12 21" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function GoogleIcon() {
  return <svg className="google-logo" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z" /><path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.36l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.13H3.05v2.62A10 10 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.4 13.93A6 6 0 0 1 6.09 12c0-.67.11-1.32.31-1.93V7.45H3.05A10 10 0 0 0 2 12c0 1.61.39 3.14 1.05 4.55l3.35-2.62Z" /><path fill="#EA4335" d="M12 5.94c1.47 0 2.78.5 3.82 1.5l2.86-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.95 5.45l3.35 2.62C7.19 7.7 9.4 5.94 12 5.94Z" /></svg>;
}

type FifinMood = "neutral" | "happy" | "worried" | "alert" | "angry" | "sad" | "bored" | "annoyed";

const fifinFace: Record<FifinMood, { brows?: string; lids?: number; pupilY: number; mouth: "smile" | "open" | "flat" | "frown" | "o" }> = {
  neutral: { pupilY: 0, mouth: "flat" },
  happy: { pupilY: 0, mouth: "smile" },
  worried: { brows: "M28 33 L40 30 M60 30 L72 33", pupilY: 2, mouth: "frown" },
  sad: { brows: "M28 30 L40 34 M60 34 L72 30", pupilY: 3, mouth: "frown" },
  alert: { brows: "M29 28 Q34 25 40 28 M60 28 Q66 25 71 28", pupilY: 0, mouth: "o" },
  angry: { brows: "M28 29 L41 35 M59 35 L72 29", pupilY: 1, mouth: "frown" },
  bored: { lids: 0.55, pupilY: 2, mouth: "flat" },
  annoyed: { brows: "M29 32 L41 32 M59 30 L71 33", lids: 0.4, pupilY: 0, mouth: "flat" },
};

function FifinAvatar({ small = false, mood = "neutral" }: { small?: boolean; mood?: FifinMood }) {
  const f = fifinFace[mood] ?? fifinFace.neutral;
  const lid = f.lids ?? 0;
  return (
    <span className={`${small ? "fifi-avatar small" : "fifi-avatar"} fifin-svg mood-${mood}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="fifin-bird">
        <defs>
          <radialGradient id="fifinBody" cx="38%" cy="30%" r="75%"><stop offset="0" stopColor="#ffffff" /><stop offset=".35" stopColor="#dff3ff" /><stop offset=".75" stopColor="#a8dcff" /><stop offset="1" stopColor="#78bff5" /></radialGradient>
          <linearGradient id="fifinWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c9ebff" /><stop offset="1" stopColor="#7cc0f5" /></linearGradient>
        </defs>
        <g className="fb-tail"><path d="M40 84 Q36 97 44 96 Q48 90 50 86 Q52 90 56 96 Q64 97 60 84 Z" fill="#6fb6f2" /></g>
        <g className="fb-wing fb-wing-l"><path d="M20 52 Q2 50 5 66 Q12 74 24 66 Z" fill="url(#fifinWing)" /></g>
        <g className="fb-wing fb-wing-r"><path d="M80 52 Q98 50 95 66 Q88 74 76 66 Z" fill="url(#fifinWing)" /></g>
        <g className="fb-body">
          <path className="fb-tuft" d="M48 16 Q44 4 52 6 Q50 10 54 14 Z" fill="#6fb6f2" />
          <ellipse cx="50" cy="52" rx="33" ry="34" fill="url(#fifinBody)" />
          <ellipse cx="50" cy="66" rx="19" ry="14" fill="#ffffff" opacity=".7" />
          <g className="fb-eyes">
            {[36, 64].map((x) => <g key={x}>
              <ellipse cx={x} cy="43" rx="8" ry="9.5" fill="#fff" />
              <g className="fb-pupil"><circle cx={x + 0.5} cy={44 + f.pupilY} r="4.3" fill="#1b2638" /><circle cx={x + 2} cy={42 + f.pupilY} r="1.4" fill="#fff" /></g>
              {lid > 0 && <rect x={x - 9} y="32" width="18" height={19 * lid} rx="3" fill="#b3e0ff" />}
              {mood === "happy" && <ellipse cx={x} cy="56" rx="4.5" ry="2.4" fill="#ff8fb0" opacity=".6" />}
            </g>)}
            
          </g>
          {f.brows && <path className="fb-brows" d={f.brows} stroke="#1b2a4a" strokeWidth="3" strokeLinecap="round" fill="none" />}
          <g className="fb-beak">
            {f.mouth === "smile" && <><path d="M43 55 L57 55 L50 61 Z" fill="#ffb12b" /><path d="M44.5 58 Q50 66 55.5 58 Z" fill="#ff8a1f" /></>}
            {f.mouth === "open" && <><path d="M43 54 L57 54 L50 59 Z" fill="#ffb12b" /><path d="M44 58 L56 58 L50 64 Z" fill="#ff8a1f" /></>}
            {f.mouth === "flat" && <path d="M43 55 L57 55 L50 61 Z" fill="#ffb12b" />}
            {f.mouth === "frown" && <path d="M43 58 L57 58 L50 53 Z" fill="#ffb12b" />}
            {f.mouth === "o" && <><path d="M43 53 L57 53 L50 57.5 Z" fill="#ffb12b" /><ellipse cx="50" cy="60.5" rx="3" ry="3.2" fill="#ff8a1f" /></>}
          </g>
        </g>
      </svg>
    </span>
  );
}

const nav = [
  { id: "home", label: "Chat Fifin", description: "Tanya & minta panduan", icon: "home" as IconName },
  { id: "checkup", label: "Check-up", description: "Kenali kondisi keuangan", icon: "chart" as IconName },
  { id: "chat", label: "Catat Transaksi", description: "Catat uang masuk & keluar", icon: "sparkles" as IconName },
  { id: "finance", label: "Keuanganmu", description: "Pantau & susun rencana", icon: "wallet" as IconName },
  { id: "report", label: "Rapor Keuangan", description: "Hasil check-up terakhir", icon: "chart" as IconName },
  { id: "waiting", label: "Tunda Beli", description: "Refleksi sebelum belanja", icon: "clock" as IconName },
];

const englishNav: Record<string, string> = {
  home: "Chat with Fifin",
  chat: "Log Transactions",
  checkup: "Check-up",
  finance: "Your Money",
  report: "Financial Report",
  waiting: "Pause a Purchase",
};

const englishNavDescriptions: Record<string, string> = {
  home: "Ask & get guidance",
  chat: "Log money in & out",
  checkup: "Understand your finances",
  finance: "Track & build your plan",
  report: "Latest check-up result",
  waiting: "Reflect before buying",
};

const questions = [
  { title: "Berapa rata-rata pendapatanmu?", helper: "Kalau berubah-ubah, pakai rata-rata 3–6 bulan terakhir.", presets: [500000, 1000000, 5000000] },
  { title: "Berapa pengeluaran rutin bulananmu?", helper: "Cukup perkiraan untuk kebutuhan wajib dan sehari-hari.", presets: [100000, 500000, 1000000] },
  { title: "Sudah punya dana darurat?", helper: "Dana tunai terpisah yang bisa digunakan saat kondisi mendesak.", presets: [500000, 1000000, 5000000] },
  { title: "Berapa total cicilan per bulan?", helper: "Termasuk paylater, kartu kredit, dan cicilan kendaraan.", presets: [100000, 500000, 1000000] },
  { title: "Sudah rutin menabung setiap bulan?", helper: "Tidak harus besar. Pilih yang paling menggambarkan kebiasaanmu.", presets: [100000, 500000, 1000000] },
  { title: "Sudah punya tanggungan finansial?", helper: "Misalnya orang tua, pasangan, atau anak yang kamu biayai.", presets: [1, 2, 3] },
];

const choiceSteps = [2, 4, 5];

// Extended Check-up: 8 choice questions (ids 6–13) that sit beside the 6 core numeric questions.
const extraQuestions = [
  { title: "Seberapa sering kamu meninjau pengeluaranmu?", helper: "Meninjau rutin membantu menemukan kebocoran kecil sebelum membesar.", options: [["Setiap minggu", 1], ["Setiap bulan", .7], ["Kadang-kadang", .35], ["Hampir tidak pernah", 0]] },
  { title: "Di mana dana daruratmu disimpan?", helper: "Dana darurat idealnya mudah dicairkan dan terpisah dari uang harian.", options: [["Rekening terpisah / reksa dana pasar uang", 1], ["Campur di rekening harian", .45], ["Di instrumen berisiko (saham, kripto)", .25], ["Belum ada dana darurat", 0]] },
  { title: "Jenis utang terbesarmu saat ini?", helper: "Utang konsumtif berbunga tinggi biasanya paling perlu diprioritaskan.", options: [["Tidak punya utang", 1], ["KPR / kendaraan", .7], ["Kartu kredit / paylater", .35], ["Pinjol / pinjaman pribadi", .1]] },
  { title: "Pernah telat bayar cicilan 6 bulan terakhir?", helper: "Keterlambatan bisa memengaruhi skor kredit dan menambah denda.", options: [["Tidak pernah", 1], ["Sekali", .5], ["Lebih dari sekali", .1]] },
  { title: "Sudah mulai berinvestasi untuk jangka panjang?", helper: "Misalnya reksa dana, obligasi negara, saham, atau dana pensiun.", options: [["Rutin setiap bulan", 1], ["Sesekali", .55], ["Belum, tapi tertarik", .2], ["Belum sama sekali", 0]] },
  { title: "Bagaimana perlindungan kesehatanmu?", helper: "Biaya rumah sakit tak terduga adalah penyebab utama dana darurat terkuras.", options: [["BPJS + asuransi tambahan", 1], ["BPJS saja", .7], ["Asuransi kantor saja", .55], ["Belum punya", 0]] },
  { title: "Kalau terjadi sesuatu padamu, siapa yang terlindungi?", helper: "Asuransi jiwa penting terutama bila ada orang yang bergantung padamu.", options: [["Ada asuransi jiwa yang cukup", 1], ["Ada, tapi nilainya kecil", .5], ["Belum, padahal ada tanggungan", 0], ["Belum perlu, tak ada tanggungan", .85]] },
  { title: "Punya tujuan keuangan yang jelas?", helper: "Tujuan dengan nominal dan tenggat membuat menabung terasa lebih ringan.", options: [["Ada, dengan nominal & tenggat", 1], ["Ada, tapi belum dihitung", .55], ["Masih samar", .25], ["Belum terpikir", 0]] },
] as const;

// Flow order (question ids) grouped by financial area.
const checkupOrder = [0, 1, 6, 2, 7, 3, 8, 9, 4, 10, 11, 5, 12, 13];
const checkupAreas = [
  { key: "cashflow", label: "Arus kas", description: "Pemasukan, pengeluaran, dan kebiasaan meninjau", ids: [0, 1, 6], icon: "wallet" },
  { key: "emergency", label: "Dana darurat", description: "Bantalan saat kondisi mendesak", ids: [2, 7], icon: "shield" },
  { key: "debt", label: "Utang & cicilan", description: "Beban, jenis, dan disiplin bayar", ids: [3, 8, 9], icon: "chart" },
  { key: "saving", label: "Tabungan & investasi", description: "Menyisihkan dan menumbuhkan uang", ids: [4, 10], icon: "sparkles" },
  { key: "protection", label: "Proteksi", description: "Asuransi kesehatan dan jiwa", ids: [11, 12], icon: "shield" },
  { key: "planning", label: "Tujuan & tanggungan", description: "Arah keuangan dan orang yang dibiayai", ids: [5, 13], icon: "clock" },
] as const;
const areaWeights: Record<string, number> = { cashflow: .2, emergency: .22, debt: .2, saving: .16, protection: .12, planning: .1 };
const areaActions: Record<string, [string, string]> = {
  cashflow: ["Catat semua pengeluaran 7 hari berturut-turut lewat Chat Fifin.", "Tetapkan batas belanja mingguan dan tinjau tiap Minggu malam."],
  emergency: ["Buka rekening terpisah khusus dana darurat.", "Pasang autodebet kecil setiap gajian ke rekening dana darurat."],
  debt: ["Daftar semua utang, urutkan dari bunga tertinggi.", "Bayar lebih dari minimum untuk satu utang berbunga tertinggi."],
  saving: ["Sisihkan tabungan di awal bulan, bukan dari sisa.", "Mulai investasi rutin kecil, misalnya reksa dana pasar uang."],
  protection: ["Pastikan BPJS Kesehatan aktif dan iurannya lancar.", "Bandingkan 2–3 opsi asuransi jiwa berjangka sesuai tanggungan."],
  planning: ["Tulis satu tujuan keuangan lengkap dengan nominal dan tenggat.", "Hitung setoran bulanan yang dibutuhkan untuk tujuan itu."],
};

const checkStepLabels = ["Pendapatan", "Pengeluaran", "Dana darurat", "Cicilan", "Tabungan", "Tanggungan"];
const checkStepDescriptions = [
  "Rata-rata pemasukan setiap bulan",
  "Kebutuhan rutin dan sehari-hari",
  "Dana siap pakai saat kondisi mendesak",
  "Total kewajiban yang dibayar per bulan",
  "Uang yang biasanya kamu sisihkan",
  "Orang yang ikut kamu biayai",
];

const bilingualCopy: Record<string, string> = {
  "MENU UTAMA": "MAIN MENU",
  "Insight lebih lengkap, obrolan tanpa batas.": "Deeper insights and unlimited conversations.",
  "Lihat paket": "View plans",
  "Riwayat": "History",
  "Highlight keuanganmu hari ini": "Your financial highlights today",
  "Belum ada data keuangan.": "No financial data yet.",
  "Mulai dari Check-up singkat agar Fifin dapat menyiapkan skor dan rekomendasi pertamamu.": "Start with a short Check-up so Fifin can prepare your first score and recommendations.",
  "Mulai Check-up": "Start Check-up",
  "FIFIN · ASISTEN KEUANGAN": "FIFIN · FINANCIAL ASSISTANT",
  "Beberapa pertanyaan pendek membantuku memahami angkamu sebelum kita mencatat dan merencanakan keuangan bersama.": "A few short questions help me understand your numbers before we log and plan your finances together.",
  "Fifin bisa bantu apa?": "How can Fifin help?",
  "Catat Transaksi": "Log Transactions",
  "Cerita dengan bahasa sehari-hari": "Use everyday language",
  "Neraca Bulanan": "Monthly Balance",
  "Lihat uang yang tersisa bulan ini": "See what remains this month",
  "Tujuanmu": "Your Goals",
  "Susun target yang ingin dicapai": "Plan the goals you want to reach",
  "Tunda Beli": "Pause a Purchase",
  "Tunggu 48 jam sebelum memutuskan": "Wait 48 hours before deciding",
  "HIGHLIGHT PERTAMAMU": "YOUR FIRST HIGHLIGHT",
  "Skor kesehatan": "Health score",
  "Buka rapor untuk melihat arti skor dan prioritasmu.": "Open your report to understand the score and priorities.",
  "Neraca bulan ini": "This month's balance",
  "Sisa dari seluruh pemasukan setelah pengeluaran Juni.": "What remains after all June income and spending.",
  "Lengkapi check-up": "Complete Check-up",
  "Perbarui check-up": "Update Check-up",
  "Agar rekomendasi Fifin mengikuti kondisi terbarumu.": "Keep Fifin's recommendations aligned with your latest situation.",
  "RIWAYAT AKTIVITAS": "ACTIVITY HISTORY",
  "Semua yang pernah kamu catat.": "Everything you've recorded.",
  "Buka kembali transaksi, check-up, foto struk, dan keputusan Tunda Beli tanpa kehilangan konteks.": "Revisit transactions, Check-ups, receipts, and paused purchases without losing context.",
  "Kembali ke Chat": "Back to Chat",
  "Riwayatmu masih kosong.": "Your history is still empty.",
  "Transaksi, rapor Check-up, struk, dan keputusan Tunda Beli akan muncul di sini.": "Transactions, Check-up reports, receipts, and paused purchases will appear here.",
  "Catat transaksi pertama": "Log your first transaction",
  "HIGHLIGHT KEUANGANMU": "YOUR FINANCIAL HIGHLIGHTS",
  "Ringkasan yang perlu kamu tahu hari ini.": "The summary you need today.",
  "Empat angka penting dari transaksi, check-up, dan rencana keuanganmu.": "Four key numbers from your transactions, Check-up, and financial plans.",
  "Kembali ke hari ini": "Back to today",
  "Pemasukan": "Income",
  "Pengeluaran": "Expenses",
  "Saldo setelah seluruh transaksi": "Balance after all transactions",
  "Lihat check-up": "View Check-up",
  "Buka neraca": "Open balance",
  "Lihat barang": "View item",
  "Jadikan pengingat": "Set reminder",
  "CATAT KEUANGAN · CERITA SAJA": "LOG YOUR MONEY · JUST TELL FIFIN",
  "Catat transaksi lewat satu cerita.": "Log transactions in one message.",
  "Ceritakan pengeluaran harian, pemasukan, cicilan, atau beberapa transaksi sekaligus. Fifin menyiapkan nominal dan kategorinya untuk kamu cek sebelum disimpan.": "Tell Fifin about daily spending, income, installments, or multiple transactions at once. Fifin prepares the amounts and categories for review before saving.",
  "Catat uang masuk & keluar": "Log money in and out",
  "Beberapa transaksi dalam satu pesan": "Multiple transactions in one message",
  "Tinjau sebelum disimpan": "Review before saving",
  "PAKET GRATIS": "FREE PLAN",
  "Kelola token & paket": "Manage tokens & plan",
  "Pengeluaran sehari-hari": "Daily spending",
  "Catat pemasukan": "Log income",
  "Beberapa transaksi": "Multiple transactions",
  "Cukup dulu": "That's enough",
  "CHECK-UP KEUANGAN": "FINANCIAL CHECK-UP",
  "PROGRES CHECK-UP": "CHECK-UP PROGRESS",
  "Pantau jawaban yang sudah dan belum kamu isi.": "Track completed and unanswered steps.",
  "Pendapatan": "Income",
  "Dana darurat": "Emergency fund",
  "Cicilan": "Installments",
  "Tabungan": "Savings",
  "Tanggungan": "Dependents",
  "Sedang diisi": "In progress",
  "Terisi": "Completed",
  "Belum diisi": "Not answered",
  "Progres check-up": "Check-up progress",
  "Jawabanmu": "Your answer",
  "Masukkan perkiraan nominal": "Enter an estimated amount",
  "Pendapatan tetap": "Stable income",
  "Tidak tetap": "Variable income",
  "Sesuaikan jawaban": "Adjust answer",
  "Kurangi atau tambah tanpa mengetik ulang": "Subtract or add without typing again",
  "Tambah": "Add",
  "Kurangi": "Subtract",
  "Tidak ada / isi Rp0": "None / enter Rp0",
  "Tidak ada tanggungan": "No dependents",
  "Jawaban tersimpan otomatis": "Answer saved automatically",
  "Kembali": "Back",
  "Lanjut": "Continue",
  "Lihat hasil": "View results",
  "CHECK-UP SELESAI": "CHECK-UP COMPLETE",
  "ARTI SKORMU": "WHAT YOUR SCORE MEANS",
  "Perlu perhatian": "Needs attention",
  "Cukup sehat": "Fairly healthy",
  "Kondisi kuat": "Strong condition",
  "PRIORITAS BERIKUTNYA": "NEXT PRIORITY",
  "Minggu ini": "This week",
  "Bulan ini": "This month",
  "30 hari lagi": "In 30 days",
  "Simpan & lihat rapor": "Save & view report",
  "Lihat Keuanganmu": "View Your Finances",
  "BELUM ADA RAPOR TERSIMPAN": "NO SAVED REPORT YET",
  "Selesaikan Check-up pertamamu.": "Complete your first Check-up.",
  "Setelah selesai, skor, indikator, dan langkah berikutnya akan tersimpan di sini.": "Your score, indicators, and next steps will be saved here when complete.",
  "RAPOR KEUANGAN · JUNI 2026": "FINANCIAL REPORT · JUNE 2026",
  "Gambaran kondisi keuanganmu.": "Your financial overview.",
  "Snapshot hasil Check-up terakhir, tersimpan agar kamu dapat membandingkan perubahan berikutnya.": "A saved snapshot of your latest Check-up to compare future changes.",
  "Unduh PDF": "Download PDF",
  "DASAR PERHITUNGAN": "CALCULATION BASIS",
  "Angka yang tersimpan di rapor ini": "Numbers saved in this report",
  "Data berikut adalah jawaban saat Check-up diselesaikan, bukan angka yang berubah secara otomatis.": "These are the answers saved when the Check-up was completed, not automatically changing values.",
  "Tersimpan di Riwayat": "Saved in History",
  "KEUANGANMU · JUNI 2026": "YOUR FINANCES · JUNE 2026",
  "Berapa yang tersisa bulan ini?": "What's left this month?",
  "Rencana yang sesuai kemampuanmu.": "A plan that fits your means.",
  "Lihat posisi aset dan utangmu.": "See your assets and debt.",
  "Tujuan besar dimulai dari angka kecil.": "Big goals start with small numbers.",
  "Siapkan perlindungan untuk hal tak terduga.": "Prepare protection for the unexpected.",
  "Neraca": "Balance",
  "Rencanamu": "Your Plan",
  "Asetmu": "Your Assets",
  "Perlindungan": "Protection",
  "Sisa bulan ini": "Remaining this month",
  "Rekomendasi Fifin": "Fifin's recommendation",
  "Lihat Rapor": "View Report",
  "PRATINJAU FIFIN PRO": "FIFIN PRO PREVIEW",
  "Lihat gambaran asetmu": "See your asset overview",
  "Coba pratinjau": "Preview",
  "Arus kas Juni": "June cash flow",
  "Pemasukan masih lebih besar dari pengeluaran.": "Income is still higher than expenses.",
  "Catatan terbaru": "Recent records",
  "Lihat semua": "View all",
  "BELANJA DENGAN LEBIH SADAR": "SPEND MORE MINDFULLY",
  "Masih kepikiran barang itu?": "Still thinking about that item?",
  "Simpan dulu di sini. Kalau 48 jam lagi masih terasa penting, kamu bisa memutuskan dengan lebih tenang.": "Save it here first. If it still feels important after 48 hours, you can decide more calmly.",
  "Tambah ke daftar": "Add to list",
  "WAKTU REFLEKSI": "REFLECTION TIME",
  "Ingatkan nanti": "Remind me later",
  "PROFIL FIFIN": "FIFIN PROFILE",
  "Edit profil": "Edit profile",
  "Keluar": "Sign out",
  "Informasi pribadi": "Personal information",
  "Kelola paket": "Manage plan",
  "Privasi & keamanan": "Privacy & security",
  "Notifikasi yang berguna": "Useful notifications",
  "PUSAT BANTUAN FIFIN": "FIFIN HELP CENTER",
  "Ada yang ingin kamu tanyakan?": "Is there anything you'd like to ask?",
  "Kembali ke Home": "Back to Home",
  "Cara mencatat transaksi": "How to log transactions",
  "Memahami hasil Check-up": "Understanding Check-up results",
  "Tentang Fifin Pro": "About Fifin Pro",
  "Masih butuh bantuan?": "Still need help?",
  "Kami siap mendengarkan.": "We're ready to listen.",
  "Hubungi Helpdesk": "Contact Helpdesk",
  "Hai, aku Fifin.": "Hi, I'm Fifin.",
  "Asisten finansialmu": "Your financial assistant",
  "Apa yang ingin kamu lakukan?": "What would you like to do?",
  "Catat transaksi": "Log a transaction",
  "Cek kondisi keuangan": "Check financial health",
  "Lihat rapor terakhir": "View latest report",
  "Pikirkan sebelum beli": "Think before buying",
  "Buka pusat bantuan": "Open help center",
  "Mulai ngobrol dengan Fifin": "Start chatting with Fifin",
  "Tutup bantuan": "Close help",
  "Buka bantuan Fifin": "Open Fifin help",
  "Simpan dulu, putuskan nanti.": "Save it now, decide later.",
  "Nama barang": "Item name",
  "Harga": "Price",
  "Pernah kamu isi": "Previously entered",
  "Apa yang paling terasa?": "What feels most relevant?",
  "Keinginan sesaat": "Impulse",
  "Kebutuhan": "Need",
  "Mulai jeda 48 jam": "Start 48-hour pause",
  "Yang kamu dapatkan": "What you get",
  "Pilih masa akses": "Choose access period",
  "Harga transparan": "Transparent pricing",
  "Rekomendasi": "Recommended",
  "Pilih 1 bulan": "Choose 1 month",
  "Pilih 3 bulan": "Choose 3 months",
  "Pilih 12 bulan": "Choose 12 months",
  "Selesai": "Done",
  "Atur notifikasi di Profil": "Manage notifications in Profile",
  "Pembaruan penting": "Important updates",
  "Notifikasi": "Notifications",
  "Gunakan mode terang": "Use light mode",
  "Gunakan mode gelap": "Use dark mode",
  "Scan struk": "Scan receipt",
  "Rekam suara": "Record voice",
  "Kirim": "Send",
  "Siap, aku bantu! Biar ceritamu tersimpan aman, masuk dulu sebentar ya—cuma butuh beberapa detik.": "Sure, I can help! To keep your story safe, please sign in first—it only takes a few seconds.",
  "Akunmu siap! Sebelum mulai, maksimal 8 pertanyaan kilat dulu ya—pertanyaannya menyesuaikan jawabanmu. Cukup ketuk jawabannya.": "Your account is ready! Before we start, up to 8 quick questions—they adapt to your answers. Just tap an answer.",
  "Mau mulai dari mana hari ini?": "Where would you like to start today?",
  "Pilih salah satu atau ketik bebas. Belum perlu login.": "Pick one or type freely. No sign-in needed yet.",
  "Penghasilan bulananmu kira-kira berapa?": "Roughly how much is your monthly income?",
  "Biasanya berapa bagian yang habis terpakai tiap bulan?": "How much of it is usually spent each month?",
  "Seberapa sering kamu mengecek pengeluaran?": "How often do you check your spending?",
  "Sudah punya dana darurat?": "Do you have an emergency fund?",
  "Dana daruratnya disimpan di mana?": "Where is your emergency fund kept?",
  "Ada cicilan rutin tiap bulan? (paylater, kartu kredit, kendaraan)": "Any monthly installments? (paylater, credit card, vehicle)",
  "Cicilan terbesarnya jenis apa?": "What is your biggest installment?",
  "Sudah rutin menabung setiap bulan?": "Do you save every month?",
  "Ada tanggungan finansial? (orang tua, pasangan, anak)": "Anyone financially dependent on you? (parents, partner, children)",
  "Hampir semua": "Almost all of it",
  "Sekitar setengah": "About half",
  "Masih banyak sisa": "Plenty left over",
  "Setiap minggu": "Every week",
  "Setiap bulan": "Every month",
  "Kadang-kadang": "Sometimes",
  "Hampir tidak pernah": "Almost never",
  "Sudah": "Yes",
  "Sedang mulai": "Just started",
  "Belum": "Not yet",
  "Rekening terpisah": "Separate account",
  "Campur rekening harian": "Mixed with daily account",
  "Saham / kripto": "Stocks / crypto",
  "Tidak ada": "None",
  "Sedikit": "A little",
  "Lumayan banyak": "Quite a lot",
  "KPR / kendaraan": "Mortgage / vehicle",
  "Kartu kredit / paylater": "Credit card / paylater",
  "Pinjol / pinjaman pribadi": "Online / personal loan",
  "Rutin": "Regularly",
  "1 orang": "1 person",
  "2 orang atau lebih": "2 or more people",
  "Mantap, fondasimu sudah lumayan! Kita tinggal rapikan supaya sisa uangmu makin terarah.": "Great, your foundation is decent! Let's tidy things up so your leftover money has more direction.",
  "Jawabanmu sudah otomatis mengisi sebagian Check-up. Lengkapi sisanya untuk skor per area dan rencana 30 hari.": "Your answers have pre-filled part of the Check-up. Complete the rest for area scores and a 30-day plan.",
  "Lanjut ke Fifin": "Continue to Fifin",
  "Lengkapi Check-up": "Complete Check-up",
  "Lewati, isi nanti": "Skip, fill in later",
  "Oke, nggak apa-apa. Kita ngobrol dulu saja—login kapan pun kamu siap.": "Okay, no problem. Let's just chat—sign in whenever you're ready.",
  "Gambarnya sudah kuterima! Aku bisa membaca struk ini jadi transaksi. Masuk dulu sebentar ya, biar hasilnya tersimpan aman.": "Got your image! I can turn this receipt into a transaction. Please sign in first so the result is saved safely.",
  "Terima kasih sudah jujur. Kita mulai pelan-pelan: menyisihkan sedikit untuk dana darurat akan sangat membantu.": "Thanks for being honest. Let's start slowly: setting aside a little for an emergency fund will help a lot.",
  "Lagi pengen beli sesuatu": "I want to buy something",
  "Catat pengeluaran hari ini": "Log today's spending",
  "Cek kondisi keuanganku": "Check my finances",
  "Gimana mulai dana darurat?": "How do I start an emergency fund?",
  "Tamu": "Guest",
  "Mode demo": "Demo mode",
  "Kamu": "You",
  "Unggah atau scan gambar": "Upload or scan an image",
  "Unggah / scan gambar": "Upload / scan image",
  "Sapa Fifin": "Say hi to Fifin",
  "Tutup login": "Close sign-in",
  "Tutup": "Close",
  "Tutup dialog": "Close dialog",
  "Pilihan bahasa onboarding": "Onboarding language options",
  "Pilihan bahasa": "Language options",
  "Navigasi seluler": "Mobile navigation",
  "Navigasi utama": "Main navigation",
  "Selamat datang di Fifin.": "Welcome to Fifin.",
  "Kirim ke Fifin": "Send to Fifin",
  "Pesan transaksi": "Transaction message",
  "Ceritakan transaksi apa pun dengan bahasamu sendiri. Aku bantu rapikan.": "Describe any transaction in your own words. I'll tidy it up.",
  "Sudah dicatat sebagai pengeluaran Makanan & Minuman. Nominalnya bisa kamu ubah kapan saja.": "Logged as a Food & Drinks expense. You can change the amount anytime.",
  "Contoh: tadi beli kopi 28rb...": "Example: just bought coffee for 28k...",
  "Setelah check-up, ceritakan transaksi atau rencanamu di sini...": "After the check-up, tell me about a transaction or plan here...",
  "Ceritakan transaksi kepada Fifin": "Tell Fifin about a transaction",
  "Ceritakan transaksi dengan bahasa sehari-hari atau pindai struk.": "Describe transactions in everyday language or scan a receipt.",
  "Bantu aku mencatat transaksi hari ini": "Help me log today's transactions",
  "Aku siap dengar. Cerita saja, ya.": "I'm listening. Go ahead.",
  "Mikrofon siap. Ceritakan transaksimu.": "Microphone ready. Tell me about your transaction.",
  "Fifin hadir. Pilih bantuan yang kamu butuhkan.": "Fifin is here. Choose the help you need.",
  "Bantuan Fifin": "Fifin help",
  "Gerakkan cursor ke kanan–kiri dengan cepat kapan saja untuk memanggilku.": "Shake your cursor left and right quickly anytime to call me.",
  "Pilih salah satu, nanti aku antar ke halaman yang tepat.": "Pick one and I'll take you to the right page.",
  "Tanya & minta panduan": "Ask & get guidance",
  "Kenali kondisi keuangan": "Understand your finances",
  "Pantau & susun rencana": "Track & build your plan",
  "Hasil check-up terakhir": "Latest check-up result",
  "Refleksi sebelum belanja": "Reflect before buying",
  "Buka Highlight Keuanganmu": "Open your Financial Highlights",
  "Kelola token dan lihat paket Fifin Pro": "Manage tokens and see Fifin Pro plans",
  "Paket Gratis": "Free Plan",
  "Gratis": "Free",
  "Kenali angka dasarmu": "Know your basic numbers",
  "bersama Fifin.": "with Fifin.",
  "14 pertanyaan singkat di 6 area keuangan. Sekitar 4 menit, hasilnya skor per area dan rencana 30 hari.": "14 short questions across 6 financial areas. About 4 minutes, resulting in area scores and a 30-day plan.",
  "Arus kas": "Cash flow",
  "Utang & cicilan": "Debt & installments",
  "Tabungan & investasi": "Savings & investing",
  "Proteksi": "Protection",
  "Tujuan & tanggungan": "Goals & dependents",
  "ARUS KAS": "CASH FLOW",
  "DANA DARURAT": "EMERGENCY FUND",
  "UTANG & CICILAN": "DEBT & INSTALLMENTS",
  "TABUNGAN & INVESTASI": "SAVINGS & INVESTING",
  "PROTEKSI": "PROTECTION",
  "TUJUAN & TANGGUNGAN": "GOALS & DEPENDENTS",
  "Pemasukan, pengeluaran, dan kebiasaan meninjau": "Income, spending, and review habits",
  "Bantalan saat kondisi mendesak": "A cushion for emergencies",
  "Beban, jenis, dan disiplin bayar": "Load, type, and payment discipline",
  "Menyisihkan dan menumbuhkan uang": "Setting aside and growing money",
  "Asuransi kesehatan dan jiwa": "Health and life insurance",
  "Arah keuangan dan orang yang dibiayai": "Financial direction and dependents",
  "Pertanyaan": "Question",
  "· PERTANYAAN": "· QUESTION",
  "PERTANYAAN": "QUESTION",
  "dari": "of",
  "selesai": "done",
  "Berapa rata-rata pendapatanmu?": "What is your average income?",
  "Berapa pengeluaran rutin bulananmu?": "What are your routine monthly expenses?",
  "Berapa total cicilan per bulan?": "What are your total monthly installments?",
  "Sudah punya tanggungan finansial?": "Do you have financial dependents?",
  "Kalau berubah-ubah, pakai rata-rata 3–6 bulan terakhir.": "If it varies, use the average of the last 3–6 months.",
  "Cukup perkiraan untuk kebutuhan wajib dan sehari-hari.": "A rough estimate of essentials and daily needs is enough.",
  "Dana tunai terpisah yang bisa digunakan saat kondisi mendesak.": "Separate cash you can use in an emergency.",
  "Termasuk paylater, kartu kredit, dan cicilan kendaraan.": "Includes paylater, credit cards, and vehicle installments.",
  "Tidak harus besar. Pilih yang paling menggambarkan kebiasaanmu.": "It doesn't have to be big. Pick what best describes your habit.",
  "Misalnya orang tua, pasangan, atau anak yang kamu biayai.": "For example parents, a partner, or children you support.",
  "Seberapa sering kamu meninjau pengeluaranmu?": "How often do you review your spending?",
  "Meninjau rutin membantu menemukan kebocoran kecil sebelum membesar.": "Regular reviews help you catch small leaks before they grow.",
  "Di mana dana daruratmu disimpan?": "Where is your emergency fund kept?",
  "Dana darurat idealnya mudah dicairkan dan terpisah dari uang harian.": "An emergency fund should be easy to withdraw and separate from daily money.",
  "Rekening terpisah / reksa dana pasar uang": "Separate account / money market fund",
  "Campur di rekening harian": "Mixed with daily account",
  "Di instrumen berisiko (saham, kripto)": "In risky assets (stocks, crypto)",
  "Belum ada dana darurat": "No emergency fund yet",
  "Jenis utang terbesarmu saat ini?": "What is your biggest type of debt right now?",
  "Utang konsumtif berbunga tinggi biasanya paling perlu diprioritaskan.": "High-interest consumer debt usually needs priority.",
  "Tidak punya utang": "No debt",
  "Pernah telat bayar cicilan 6 bulan terakhir?": "Missed an installment in the last 6 months?",
  "Keterlambatan bisa memengaruhi skor kredit dan menambah denda.": "Late payments can hurt your credit score and add fines.",
  "Tidak pernah": "Never",
  "Sekali": "Once",
  "Lebih dari sekali": "More than once",
  "Sudah mulai berinvestasi untuk jangka panjang?": "Have you started investing for the long term?",
  "Misalnya reksa dana, obligasi negara, saham, atau dana pensiun.": "For example mutual funds, government bonds, stocks, or pension funds.",
  "Rutin setiap bulan": "Every month",
  "Sesekali": "Occasionally",
  "Belum, tapi tertarik": "Not yet, but interested",
  "Belum sama sekali": "Not at all",
  "Bagaimana perlindungan kesehatanmu?": "How is your health coverage?",
  "Biaya rumah sakit tak terduga adalah penyebab utama dana darurat terkuras.": "Unexpected hospital bills are the main reason emergency funds get drained.",
  "BPJS + asuransi tambahan": "BPJS + extra insurance",
  "BPJS saja": "BPJS only",
  "Asuransi kantor saja": "Employer insurance only",
  "Belum punya": "None yet",
  "Kalau terjadi sesuatu padamu, siapa yang terlindungi?": "If something happens to you, who is protected?",
  "Asuransi jiwa penting terutama bila ada orang yang bergantung padamu.": "Life insurance matters most when someone depends on you.",
  "Ada asuransi jiwa yang cukup": "Adequate life insurance",
  "Ada, tapi nilainya kecil": "Yes, but the coverage is small",
  "Belum, padahal ada tanggungan": "No, even though I have dependents",
  "Belum perlu, tak ada tanggungan": "Not needed, no dependents",
  "Punya tujuan keuangan yang jelas?": "Do you have a clear financial goal?",
  "Tujuan dengan nominal dan tenggat membuat menabung terasa lebih ringan.": "Goals with an amount and deadline make saving feel lighter.",
  "Ada, dengan nominal & tenggat": "Yes, with amount & deadline",
  "Ada, tapi belum dihitung": "Yes, but not calculated",
  "Masih samar": "Still vague",
  "Belum terpikir": "Haven't thought about it",
  "Pilih salah satu": "Choose one",
  "Sudah terisi": "Filled in",
  "Isi senyamannya": "Answer as you're comfortable",
  "Perkiraan terdekat sudah cukup untuk memulai.": "A close estimate is enough to start.",
  "Tidak ada cicilan, sudah dicatat": "No installments, noted",
  "Ini memberi ruang lebih besar pada arus kas bulananmu.": "This gives your monthly cash flow more room.",
  "Belum ada tabungan, tidak apa-apa": "No savings yet, that's okay",
  "Nanti Fifin bantu mencari nominal awal yang terasa ringan.": "Fifin will help you find a comfortable starting amount.",
  "Tidak ada tanggungan, sudah dicatat": "No dependents, noted",
  "Rekomendasi akan disesuaikan dengan kondisi ini.": "Recommendations will be adjusted to this.",
  "Jawaban nol sudah dicatat": "Zero answer noted",
  "Fifin akan memperhitungkannya tanpa menghakimi.": "Fifin will factor it in without judgment.",
  "Oke, sudah tercatat": "Okay, noted",
  "Angka ini akan menjadi acuan untuk langkah berikutnya.": "This number will guide the next steps.",
  "Masih ada ruang": "There's still room",
  "Pengeluaran rutinmu masih di bawah pemasukan.": "Your routine expenses are still below your income.",
  "Cukup ketat": "Fairly tight",
  "Sebagian besar pemasukan sudah terpakai untuk kebutuhan rutin.": "Most of your income goes to routine needs.",
  "Perlu dilihat bersama": "Let's look at this together",
  "Pengeluaranmu hampir menyamai pemasukan. Tidak apa-apa, kita petakan dulu.": "Your spending almost equals your income. That's okay, let's map it first.",
  "Fondasinya mulai kuat": "The foundation is getting stronger",
  "Sudah mulai terbentuk": "It's starting to form",
  "Dana daruratmu ada, tetapi masih bisa diperkuat bertahap.": "You have an emergency fund, but it can be strengthened gradually.",
  "Kita jadikan prioritas": "Let's make it a priority",
  "Dana darurat masih tipis. Nanti Fifin bantu membuat langkah kecilnya.": "Your emergency fund is still thin. Fifin will help you plan small steps.",
  "Cicilan masih terjaga": "Installments are under control",
  "Porsinya masih di bawah 30% dari pemasukan.": "They are still below 30% of income.",
  "Perlu dijaga": "Needs attention",
  "Porsi cicilan mulai cukup besar dibandingkan pemasukan.": "Installments are getting large relative to income.",
  "Beban cicilan cukup tinggi": "Installment load is high",
  "Kita akan melihat ruang yang bisa dibuat tanpa menghakimi.": "We'll look for room you can create, without judgment.",
  "Kebiasaan baik sudah ada": "A good habit is already there",
  "Kamu sudah menyisihkan setidaknya 10% dari pemasukan.": "You already set aside at least 10% of income.",
  "Mulai dari yang ringan": "Start light",
  "Nominal kecil tetap berarti jika bisa dilakukan secara konsisten.": "Small amounts still matter when done consistently.",
  "Gambaranmu makin lengkap": "Your picture is getting clearer",
  "Tanggungan akan diperhitungkan agar rekomendasi tetap realistis.": "Dependents will be factored in so recommendations stay realistic.",
  "Kebiasaan yang baik": "A good habit",
  "Sudah ada pondasinya": "The foundation is there",
  "Masih ada ruang kecil untuk diperkuat bertahap.": "There's a little room to strengthen gradually.",
  "Kita catat sebagai prioritas": "We'll note it as a priority",
  "Tidak apa-apa, Fifin akan masukkan ke rencana 30 harimu.": "That's okay, Fifin will add it to your 30-day plan.",
  "Pilih yang paling mendekati": "Choose the closest one",
  "Tidak ada jawaban benar atau salah.": "There are no right or wrong answers.",
  "Jawaban sebelumnya sudah terisi. Ubah yang berubah saja.": "Previous answers are pre-filled. Just change what's different.",
  "Rata-rata pemasukan setiap bulan": "Average monthly income",
  "Kebutuhan rutin dan sehari-hari": "Routine and daily needs",
  "Dana siap pakai saat kondisi mendesak": "Ready cash for emergencies",
  "Total kewajiban yang dibayar per bulan": "Total obligations paid per month",
  "Uang yang biasanya kamu sisihkan": "Money you usually set aside",
  "Orang yang ikut kamu biayai": "People you support",
  "Fondasi keuanganmu sudah kuat.": "Your financial foundation is strong.",
  "Fondasi keuanganmu sudah ada.": "Your financial foundation is in place.",
  "Kita sudah menemukan area prioritasmu.": "We've found your priority areas.",
  "Arus kas, cicilan, dan kebiasaan menabungmu berada di jalur yang baik. Pertahankan sambil memperkuat perlindungan.": "Your cash flow, installments, and saving habits are on track. Keep it up while strengthening protection.",
  "Beberapa bagian sudah berjalan baik, tetapi masih ada ruang untuk memperkuat dana darurat atau menjaga porsi cicilan.": "Some parts are going well, but there's room to strengthen your emergency fund or keep installments in check.",
  "Skor ini bukan nilai buruk. Artinya, ada beberapa area yang sebaiknya dibereskan lebih dulu agar keuanganmu terasa lebih lega.": "This isn't a bad grade. It means a few areas are worth sorting out first so your finances feel lighter.",
  "kondisi kuat": "strong",
  "cukup sehat": "fairly healthy",
  "perlu perhatian": "in need of attention",
  "/100 berarti kondisimu": "/100 means your condition is",
  "Skor dirangkum dari 6 area: arus kas, dana darurat, utang, tabungan & investasi, proteksi, serta tujuan. Ini bukan penilaian pribadi dan dapat berubah saat angkamu berubah.": "The score combines 6 areas: cash flow, emergency fund, debt, savings & investing, protection, and goals. It's not a personal judgment and changes as your numbers change.",
  "Fifin ikut senang": "Fifin is happy too",
  "Fifin cukup tenang": "Fifin feels calm",
  "Fifin agak bosan menunggu progres": "Fifin is a bit bored waiting for progress",
  "Fifin sedikit bete": "Fifin is a little grumpy",
  "Fifin ikut sedih": "Fifin feels sad too",
  "Fifin geregetan": "Fifin is frustrated",
  "Fifin agak khawatir": "Fifin is a bit worried",
  "Fifin waspada": "Fifin is on alert",
  "SISA ARUS KAS": "REMAINING CASH FLOW",
  "RASIO CICILAN": "INSTALLMENT RATIO",
  "RASIO TABUNGAN": "SAVINGS RATIO",
  "Masih tersisa setelah pengeluaran, cicilan, dan tabungan.": "Left over after expenses, installments, and savings.",
  "Pengeluaran dan alokasi saat ini melebihi pemasukan.": "Current spending and allocations exceed income.",
  "Sudah mendekati rentang aman 3–6 bulan.": "Approaching the safe range of 3–6 months.",
  "Target awal yang disarankan adalah 3 bulan pengeluaran.": "The suggested starting target is 3 months of expenses.",
  "Masih dalam batas nyaman, di bawah 30% pemasukan.": "Still comfortable, below 30% of income.",
  "Porsinya cukup besar dan perlu dijaga agar arus kas tetap lega.": "It's a large share and needs watching to keep cash flow healthy.",
  "Kebiasaan menabungmu sudah mulai terbentuk.": "Your saving habit is taking shape.",
  "Mulai dari nominal kecil yang bisa dijaga konsisten.": "Start with a small amount you can keep up.",
  "Bangun dana darurat hingga setara 3 bulan pengeluaran": "Build an emergency fund worth 3 months of expenses",
  "Turunkan porsi cicilan secara bertahap": "Gradually reduce your installment share",
  "Pertahankan arus kas positif dan tabungan rutin": "Keep a positive cash flow and regular savings",
  "SKOR PER AREA": "SCORE BY AREA",
  "Di mana kamu kuat, di mana perlu dirawat.": "Where you're strong, and where to take care.",
  "Bobot": "Weight",
  "Sudah kuat": "Strong",
  "Prioritas": "Priority",
  "RENCANA AKSI 30 HARI": "30-DAY ACTION PLAN",
  "Action item untuk kamu jalankan.": "Action items for you to do.",
  "Disusun dari area terlemah:": "Built from your weakest areas:",
  ". Ubah status saat kamu mulai atau menyelesaikannya.": ". Update the status when you start or finish each one.",
  "dan": "and",
  "sedang jalan": "in progress",
  "Minggu 1": "Week 1",
  "Minggu 2": "Week 2",
  "Minggu 3": "Week 3",
  "Minggu 4": "Week 4",
  "Evaluasi": "Review",
  "Tenggat": "Due",
  "Lewat tenggat": "Overdue",
  "Jalan": "Doing",
  "Tandai selesai": "Mark as done",
  "Tandai belum selesai": "Mark as not done",
  "Catat semua pengeluaran 7 hari berturut-turut lewat Chat Fifin.": "Log all spending for 7 days in a row via Chat Fifin.",
  "Tetapkan batas belanja mingguan dan tinjau tiap Minggu malam.": "Set a weekly spending limit and review it every Sunday night.",
  "Buka rekening terpisah khusus dana darurat.": "Open a separate account just for emergencies.",
  "Pasang autodebet kecil setiap gajian ke rekening dana darurat.": "Set a small auto-debit to your emergency account every payday.",
  "Daftar semua utang, urutkan dari bunga tertinggi.": "List all debts, sorted by highest interest.",
  "Bayar lebih dari minimum untuk satu utang berbunga tertinggi.": "Pay more than the minimum on your highest-interest debt.",
  "Sisihkan tabungan di awal bulan, bukan dari sisa.": "Save at the start of the month, not from what's left.",
  "Mulai investasi rutin kecil, misalnya reksa dana pasar uang.": "Start a small regular investment, e.g. a money market fund.",
  "Pastikan BPJS Kesehatan aktif dan iurannya lancar.": "Make sure BPJS Kesehatan is active and paid up.",
  "Bandingkan 2–3 opsi asuransi jiwa berjangka sesuai tanggungan.": "Compare 2–3 term life insurance options for your dependents.",
  "Tulis satu tujuan keuangan lengkap dengan nominal dan tenggat.": "Write one financial goal with an amount and deadline.",
  "Hitung setoran bulanan yang dibutuhkan untuk tujuan itu.": "Calculate the monthly deposit needed for that goal.",
  "Ulangi Check-up dan bandingkan skor per area dengan rapor ini.": "Repeat the Check-up and compare area scores with this report.",
  "Mantap! Satu langkah selesai.": "Nice! One step done.",
  "CHECK-UP ULANG": "RE-CHECK",
  "Check-up ulang": "Re-check",
  "Kuota check-up bulan ini habis": "This month's check-up quota is used up",
  "Lihat Fifin Pro": "See Fifin Pro",
  "Paket Gratis bisa check-up 3 kali per 30 hari. Disarankan ulang setelah rencana 30 hari selesai agar perubahannya terlihat.": "The Free Plan allows 3 check-ups per 30 days. Re-check after finishing the 30-day plan to see the change.",
  "RIWAYAT SKOR": "SCORE HISTORY",
  "Perkembanganmu": "Your progress",
  "· terbaru": "· latest",
  "Belum ada riwayat.": "No history yet.",
  "Rapor Keuangan ·": "Financial Report ·",
  "Rapor Keuangan": "Financial Report",
  "Rapor Keuangan Fifin": "Fifin Financial Report",
  "Rapor Keuangan Juni": "June Financial Report",
  "Kamu dapat membuka kembali rapor ini kapan saja dari menu Riwayat atau Rapor Keuangan.": "You can reopen this report anytime from History or Financial Report.",
  "Target awal yang disarankan adalah 3 bulan.": "The suggested starting target is 3 months.",
  "Idealnya tetap di bawah 30% pemasukan.": "Ideally keep it below 30% of income.",
  "Diukur dari total pemasukan bulanan.": "Measured against total monthly income.",
  "Setelah pengeluaran, cicilan, dan tabungan.": "After expenses, installments, and savings.",
  "Bagikan rapor": "Share report",
  "KIRIM RAPOR": "SEND REPORT",
  "Bagikan rapor keuanganmu.": "Share your financial report.",
  "Penerima melihat pratinjau hanya-baca. Mereka tidak bisa mengubah datamu.": "Recipients see a read-only preview. They can't change your data.",
  "Tautan pratinjau": "Preview link",
  "Tautan pratinjau rapor": "Report preview link",
  "Salin": "Copy",
  "Buka pratinjau link": "Open link preview",
  "Pratinjau PDF": "PDF preview",
  "Kirim lewat aplikasi lain": "Send via another app",
  "Tautan pratinjau rapor disalin.": "Report preview link copied.",
  "Salin manual dari kolom tautan, ya.": "Please copy it manually from the link field.",
  "Pratinjau link rapor dibuka di tab baru.": "Report link preview opened in a new tab.",
  "Membuka pratinjau PDF. Pilih \"Simpan sebagai PDF\".": "Opening PDF preview. Choose \"Save as PDF\".",
  "Membuka dialog cetak / simpan PDF.": "Opening print / save PDF dialog.",
  "Tampilan hanya-baca. Angka bisa berbeda dengan kondisimu.": "Read-only view. Numbers may differ from your situation.",
  "Buat rapormu sendiri": "Create your own report",
  "pengguna Fifin": "a Fifin user",
  "Rapor Check-up tersimpan di Riwayat.": "Check-up report saved to History.",
  "Hasil check-up sudah diperbarui.": "Check-up results updated.",
  "Neraca bulanan mengukur seluruh uang masuk dikurangi pengeluaran, cicilan, dan tabungan agar kamu tahu sisa riil bulan ini.": "The monthly balance measures all money in minus expenses, installments, and savings, so you know what's truly left this month.",
  "Setelah semua catatan Juni dihitung, arus kasmu masih positif Rp 1.850.000.": "After all June records are counted, your cash flow is still positive at Rp 1.850.000.",
  "Lengkapi check-up agar perhitungan dan langkah berikutnya menyesuaikan kondisi riilmu.": "Complete the check-up so calculations and next steps match your real situation.",
  "Aset, utang, dan simulasi pelunasan dalam satu tempat.": "Assets, debts, and payoff simulations in one place.",
  "Buat target, tentukan waktu, dan lihat setoran bulanan yang realistis untuk mencapainya.": "Set a target, choose a timeframe, and see a realistic monthly deposit to reach it.",
  "Cicilan bulanan yang terasa aman belum tentu menggambarkan total utang. Fifin melihat sisa pokok agar kondisimu terbaca lebih lengkap.": "Comfortable monthly installments don't always reflect total debt. Fifin looks at remaining principal for a fuller picture.",
  "Lihat seluruh aset yang kamu miliki serta utang yang masih berjalan dalam satu tampilan yang mudah dipahami.": "See all your assets and ongoing debts in one easy-to-understand view.",
  "Nilai asetmu setelah dikurangi seluruh sisa utang.": "Your asset value after subtracting all remaining debt.",
  "Perbandingan sisa utang dengan total aset.": "Remaining debt compared with total assets.",
  "Porsi aset yang tersimpan dan yang aktif bertumbuh.": "Share of assets held versus actively growing.",
  "Petakan dana darurat dan proteksi dasar untuk menjaga rencana keuanganmu tetap berjalan.": "Map your emergency fund and basic protection to keep your plan on track.",
  "Susun alokasi pengeluaran, tabungan, dan cicilan berdasarkan hasil check-up terakhirmu.": "Plan spending, savings, and installment allocations based on your latest check-up.",
  "Rasio QWP": "QWP Ratio",
  "Aman": "Safe",
  "Terjaga": "Under control",
  "Mulai tumbuh": "Starting to grow",
  "Gaji bulanan": "Monthly salary",
  "Makan siang": "Lunch",
  "Makanan": "Food",
  "Transportasi": "Transport",
  "Perjalanan": "Travel",
  "· Hari ini": "· Today",
  "Grafik pemasukan dan pengeluaran 20 sampai 26 Juni": "Income and spending chart, 20 to 26 June",
  "Kenali posisi asetmu dengan lebih utuh.": "Understand your asset position more completely.",
  "Fifin Pro melihat total aset, sisa utang, dan aset yang sedang bertumbuh—bukan hanya cicilan bulanan.": "Fifin Pro looks at total assets, remaining debt, and growing assets—not just monthly installments.",
  "SISA TOKEN CHAT": "CHAT TOKENS LEFT",
  "Diperbarui setiap awal bulan": "Renewed at the start of each month",
  "Akses Pro selama 1 bulan.": "Pro access for 1 month.",
  "/bulan": "/month",
  "Harga sudah termasuk seluruh fitur Pro. Tidak ada auto-debit atau biaya tersembunyi.": "Price includes all Pro features. No auto-debit or hidden fees.",
  "Sekali bayar sesuai durasi. Tidak diperpanjang otomatis.": "One-time payment per duration. No automatic renewal.",
  "Kuota diperbarui transparan setiap awal bulan.": "Quota renews transparently at the start of each month.",
  "Lihat fitur, token chat, dan pilihan masa akses.": "See features, chat tokens, and access options.",
  "Simpan dulu di sini. Setelah jeda selesai, putuskan dengan kepala dingin—Fifin bantu hitung dampaknya.": "Save it here first. When the pause ends, decide with a clear head—Fifin helps calculate the impact.",
  "SEDANG DITUNGGU": "WAITING",
  "BERHASIL DITAHAN": "SUCCESSFULLY HELD",
  "KEPUTUSAN SADAR": "MINDFUL DECISIONS",
  "Tidak ada barang aktif": "No active item",
  "Uang yang tetap di kantongmu": "Money that stayed in your pocket",
  "keputusan": "decisions",
  "tidak jadi ·": "skipped ·",
  "jadi beli": "bought",
  "LAGI DITUNGGU": "WAITING",
  "Dampak besar": "Big impact",
  "Dampak sedang": "Medium impact",
  "Dampak kecil": "Small impact",
  "Belum ada dana darurat—pertimbangkan lebih matang": "No emergency fund yet—think it through",
  "Setara jam kerja": "Work hours equivalent",
  "Biaya hidup": "Living costs",
  "Dari penghasilan": "Of income",
  "Dari tabungan rutin": "Of regular savings",
  "jam kerja": "work hours",
  "Jeda selesai—saatnya memutuskan": "Pause over—time to decide",
  "Tidak jadi beli": "Don't buy",
  "Jadi beli": "Buy it",
  "Ingatkan": "Remind me",
  "Tidak jadi": "Skip",
  "TANYA DIRIMU DULU": "ASK YOURSELF FIRST",
  "Centang yang benar-benar kamu rasakan": "Tick what you genuinely feel",
  "Aku belum punya barang serupa yang masih berfungsi.": "I don't already have a similar item that still works.",
  "Aku tetap ingin membelinya meski tanpa diskon.": "I'd still want it without a discount.",
  "Harganya tidak mengganggu dana darurat dan tagihan.": "The price won't affect my emergency fund or bills.",
  "Aku tahu akan dipakai minimal seminggu sekali.": "I know I'll use it at least once a week.",
  "Aku sudah membandingkan harga di 2+ tempat.": "I've compared prices in 2+ places.",
  "Ini bukan pelarian dari rasa stres atau bosan.": "This isn't an escape from stress or boredom.",
  "KESIAPAN MEMBELI": "PURCHASE READINESS",
  "Terlihat siap": "Looks ready",
  "Masih ragu": "Still unsure",
  "Belum siap": "Not ready",
  "Alasanmu kuat. Kalau jeda selesai dan masih ingin, beli dengan tenang.": "Your reasons are strong. If you still want it after the pause, buy it calmly.",
  "Beberapa alasan belum terjawab. Tunggu sampai jeda selesai.": "Some reasons are unanswered. Wait until the pause ends.",
  "Banyak alasan belum terpenuhi. Coba alternatif di samping dulu.": "Many reasons aren't met. Try the alternatives first.",
  "ALTERNATIF": "ALTERNATIVES",
  "Cara lain mendapatkannya": "Other ways to get it",
  "Nabung bertahap": "Save gradually",
  "/minggu selama 8 minggu, tanpa mengganggu dana darurat.": "/week for 8 weeks, without touching your emergency fund.",
  "Cari bekas atau sewa": "Buy used or rent",
  "Potensi hemat sekitar": "Potential savings of about",
  "Tunggu momen promo": "Wait for a sale",
  "Pasang pengingat harga. Beli karena butuh, bukan karena FOMO.": "Set a price alert. Buy because you need it, not FOMO.",
  "RIWAYAT KEPUTUSAN": "DECISION HISTORY",
  "Keputusan yang sudah kamu ambil": "Decisions you've made",
  "Belum ada keputusan. Keputusan pertamamu akan muncul di sini.": "No decisions yet. Your first one will appear here.",
  "KEPUTUSAN: TIDAK JADI BELI": "DECISION: NOT BUYING",
  "KEPUTUSAN: JADI BELI": "DECISION: BUYING",
  "Uangnya bisa langsung kamu arahkan ke dana darurat atau tujuanmu.": "You can put that money straight into your emergency fund or goals.",
  "Kamu sudah menunggu dan memikirkannya dengan sadar. Fifin mencatatnya sebagai pengeluaran terencana.": "You waited and thought it through. Fifin logs it as a planned expense.",
  "Tunda barang lain": "Pause another item",
  "Alihkan ke Tujuanmu": "Move to Your Goals",
  "TUNDA BELI": "PAUSE A PURCHASE",
  "Masukkan barang dan harganya. Aku bantu lihat dampaknya tanpa menghakimi keputusanmu.": "Enter the item and price. I'll show the impact without judging your decision.",
  "Contoh: Sepatu lari baru": "Example: New running shoes",
  "Sepatu lari": "Running shoes",
  "Kursi kerja": "Office chair",
  "Setara": "Equal to",
  "penghasilanmu. Fifin sarankan jeda": "of your income. Fifin suggests a pause of",
  "Mulai jeda": "Start a pause of",
  "Centang minimal 3 pertanyaan refleksi dulu, ya.": "Please tick at least 3 reflection questions first.",
  "Keputusan tersimpan di Riwayat.": "Decision saved to History.",
  "Pengingat tenang akan dikirim saat waktunya selesai.": "A gentle reminder will be sent when time is up.",
  "Waktu refleksi diperpanjang 24 jam.": "Reflection time extended by 24 hours.",
  "Waktu refleksimu masih berjalan": "Your reflection time is still running",
  "Dampak ke dana darurat": "Impact on emergency fund",
  "Headphone noise cancelling": "Noise-cancelling headphones",
  "Nama panggilan": "Nickname",
  "Bahasa": "Language",
  "Tampilan": "Appearance",
  "Mode terang": "Light mode",
  "Mode gelap": "Dark mode",
  "Simpan perubahan": "Save changes",
  "Batal edit": "Cancel edit",
  "Email (opsional)": "Email (optional)",
  "Anggota sejak Juni 2026 · Paket Gratis": "Member since June 2026 · Free Plan",
  "Identitas yang digunakan Fifin saat berbicara denganmu.": "The identity Fifin uses when talking to you.",
  "Paket Gratis tetap menyimpan seluruh riwayatmu.": "The Free Plan keeps all your history.",
  "Buka Riwayat": "Open History",
  "Kontrol cara data finansialmu diproses.": "Control how your financial data is processed.",
  "Foto struk dihapus setelah diproses.": "Receipt photos are deleted after processing.",
  "Masking data sensitif": "Sensitive data masking",
  "Nomor kartu dan identitas disamarkan.": "Card numbers and IDs are masked.",
  "Aktif": "Active",
  "Lihat semua pengaturan": "See all settings",
  "Unduh data dan tinjau kebijakan.": "Download data and review policies.",
  "Hanya pengingat yang membantumu mengambil tindakan—tanpa streak atau rasa bersalah.": "Only reminders that help you act—no streaks or guilt.",
  "Tunda Beli selesai": "Paused purchase finished",
  "Saat waktu refleksi 24–48 jam berakhir.": "When the 24–48 hour reflection time ends.",
  "Draf check-up": "Check-up draft",
  "Sebelum draf kedaluwarsa setelah 7 hari.": "Before the draft expires after 7 days.",
  "Ringkasan mingguan": "Weekly summary",
  "Satu insight singkat, maksimal sekali seminggu.": "One short insight, at most once a week.",
  "Tunda Beli selesai diaktifkan.": "Paused purchase alerts on.",
  "Tunda Beli selesai dimatikan.": "Paused purchase alerts off.",
  "Draf check-up diaktifkan.": "Check-up draft alerts on.",
  "Draf check-up dimatikan.": "Check-up draft alerts off.",
  "Ringkasan mingguan diaktifkan.": "Weekly summary on.",
  "Ringkasan mingguan dimatikan.": "Weekly summary off.",
  "Profil berhasil diperbarui.": "Profile updated.",
  "Nama panggilan belum diisi.": "Please enter a nickname.",
  "Format email belum benar.": "The email format isn't valid.",
  "Bahasa diubah ke Indonesia.": "Language switched to Indonesian.",
  "PRIVASI & KEAMANAN": "PRIVACY & SECURITY",
  "Data keuanganmu tetap milikmu.": "Your financial data stays yours.",
  "Di sini kamu mengatur bagaimana Fifin memproses dan menyimpan data pencatatan.": "Here you control how Fifin processes and stores your records.",
  "Foto struk langsung dihapus setelah diproses.": "Receipt photos are deleted right after processing.",
  "Nomor kartu dan identitas disamarkan otomatis.": "Card numbers and IDs are masked automatically.",
  "Salinan transaksi dan riwayat percakapan.": "A copy of transactions and chat history.",
  "Unduh dataku": "Download my data",
  "Data kamu sudah diunduh.": "Your data has been downloaded.",
  "Fifin memberi edukasi, bukan nasihat keuangan profesional.": "Fifin provides education, not professional financial advice.",
  "Tanpa streak, tanpa pengingat yang menghakimi.": "No streaks, no judgmental reminders.",
  "Membuka WhatsApp Helpdesk Fifin.": "Opening Fifin Helpdesk on WhatsApp.",
  "SCAN STRUK": "SCAN RECEIPT",
  "Foto struknya, aku bantu catat.": "Snap the receipt, I'll log it.",
  "Pastikan struk terlihat jelas. Setelah totalnya terbaca, fotomu langsung dihapus.": "Make sure the receipt is clear. Once the total is read, your photo is deleted.",
  "Pilih atau ambil foto": "Choose or take a photo",
  "Foto tidak pernah disimpan di server.": "Photos are never stored on the server.",
  "HASIL PEMINDAIAN": "SCAN RESULT",
  "Cek sebentar sebelum dicatat.": "Take a quick look before logging.",
  "Tanggal": "Date",
  "Total belanja": "Total spent",
  "Kategori": "Category",
  "Kebutuhan harian": "Daily needs",
  "Belanja rumah": "Household shopping",
  "Patungan / Split bill": "Split bill",
  "Bagi total dengan teman": "Split the total with friends",
  "Catat pengeluaran": "Log expense",
  "Struk dicatat. Fotonya sudah dihapus permanen.": "Receipt logged. The photo has been permanently deleted.",
  "Catat transaksi · Hari ini, 12:30": "Log transaction · Today, 12:30",
  "Draf tersimpan · 2 hari lalu": "Draft saved · 2 days ago",
  "Makan siang hari ini": "Lunch today",
  "Draf Check-up Juni": "June Check-up draft",
  "Draf check-up tersimpan": "Check-up draft saved",
  "Tunda Beli · 31 jam tersisa": "Paused purchase · 31 hours left",
  "Headphone": "Headphones",
  "Lanjutkan kapan saja sebelum 7 hari. Jawabanmu tetap aman.": "Continue anytime within 7 days. Your answers stay safe.",
  "Tiga jawaban tambahan, cukup diisi sekali.": "Three extra answers, fill them in once.",
  "Belum ada data sebelum Juni 2026.": "No data before June 2026.",
  "Belum ada data setelah Juni 2026.": "No data after June 2026.",
  "Belum ada ringkasan sebelum Juni 2026.": "No summary before June 2026.",
  "Belum ada ringkasan setelah Juni 2026.": "No summary after June 2026.",
  "Langkah minggu ini ditambahkan ke pengingat.": "This week's step was added to reminders.",
  "Semua transaksi bulan Juni sudah ditampilkan.": "All June transactions are shown.",
  "Pelajari arti skor, rasio cicilan, dan dana daruratmu.": "Learn what your score, installment ratio, and emergency fund mean.",
  "Pelajari cara Fifin memproses dan melindungi datamu.": "Learn how Fifin processes and protects your data.",
  "Juni 2026": "June 2026",
  "dana darurat": "emergency fund",
  "pinjaman berbunga tinggi": "high-interest loans",
  "kebiasaan menabung": "saving habits",
  "Membuka WhatsApp untuk paket 1 bulan.": "Opening WhatsApp for the 1-month plan.",
  "Membuka WhatsApp untuk paket 3 bulan.": "Opening WhatsApp for the 3-month plan.",
  "Membuka WhatsApp untuk paket 12 bulan.": "Opening WhatsApp for the 12-month plan.",
  "RAPOR KEUANGAN ·": "FINANCIAL REPORT ·",
  "% selesai": "% complete",
  "dari 100": "of 100",
  "dari 25": "of 25",
  "hari": "days",
  "jam": "hours",
  "bulan": "months",
};

const originalText = new WeakMap<Node, string>();
const translatedText = new WeakMap<Node, string>();
const originalAttrs = new WeakMap<HTMLElement, Record<string, string>>();
const translatedAttrs = new WeakMap<HTMLElement, Record<string, string>>();
const monthEn: Record<string, string> = { jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", mei: "May", jun: "Jun", jul: "Jul", agu: "Aug", sep: "Sep", okt: "Oct", nov: "Nov", des: "Dec", januari: "January", februari: "February", maret: "March", april: "April", juni: "June", juli: "July", agustus: "August", september: "September", oktober: "October", november: "November", desember: "December" };
const enMonth = (word: string) => { const en = monthEn[word.toLowerCase()] ?? word; return word === word.toUpperCase() ? en.toUpperCase() : en; };
const enDuration = (text: string) => text.replace(/^1 jam$/, "1 hour").replace(/(\d+) jam/g, "$1 hours").replace(/(\d+) hari/g, "$1 days").replace(/^1 bulan$/, "1 month").replace(/(\d+) bulan/g, "$1 months");
const enDate = (text: string) => text.replace(/\b(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|Jan|Feb|Mar|Apr|Jun|Jul|Agu|Sep|Okt|Nov|Des)\b/gi, (m) => enMonth(m));
const enCopy = (text: string) => bilingualCopy[text] ?? text;
type PatternReplacement = string | ((match: string, ...groups: string[]) => string);
// Patterns for sentences that contain dynamic values (amounts, names, counts, dates).
const bilingualPatterns: [RegExp, PatternReplacement][] = [
  [/^(\d+)% selesai$/, "$1% complete"],
  [/^(\d+) dari (\d+) pertanyaan$/, "$1 of $2 questions"],
  [/^(\d+) jawaban tersimpan$/, "$1 answers saved"],
  [/^1 orang$/, "1 person"],
  [/^(\d+) orang$/, "$1 people"],
  [/^([\d.,]+) (jam|hari|bulan)$/, (m) => enDuration(m)],
  [/^([\d.,]+)% dari dana daruratmu$/, "$1% of your emergency fund"],
  [/^(\d+)% dari jeda (.+)$/, (_m, pct, dur) => `${pct}% of the ${enDuration(dur)} pause`],
  [/^Sisa (\d+) dari (\d+) check-up bulan ini$/, "$1 of $2 check-ups left this month"],
  [/^(Rp [\d.]+) · (\d+) jam tersisa$/, "$1 · $2 hours left"],
  [/^Selamat menikmati (.+)\.$/, (_m, item) => `Enjoy your ${enCopy(item)}.`],
  [/^(.+) dapat kamu tinjau lagi dalam (\d+) jam\.$/, (_m, item, h) => `You can review ${enCopy(item)} again in ${h} hours.`],
  [/^Buka profil (.+)$/, "Open profile $1"],
  [/^Jawaban untuk (.+)$/, (_m, q) => `Answer for ${enCopy(q)}`],
  [/^Hemat (Rp[\d.]+)$/, "Save $1"],
  [/^Sekali bayar (Rp[\d.]+)\.$/, "One-time payment of $1."],
  [/^(\d+) dari (\d+) balasan chat tersedia$/, "$1 of $2 chat replies available"],
  [/^(\d+) balasan chat tersedia$/, "$1 chat replies available"],
  [/^(\d{1,2} )?(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|Jan|Feb|Mar|Apr|Jun|Jul|Agu|Sep|Okt|Nov|Des)( \d{4})?$/i, (m) => enDate(m)],
  [/^(Rp [\d.]+) berhasil kamu tahan\.$/, "You held on to $1."],
  [/^Kuota check-up gratis habis\. Tersedia lagi (.+)\.$/, (_m, d) => `Free check-up quota used up. Available again ${enDate(d)}.`],
  [/^Kuota kembali (.+)\. Fifin Pro bisa check-up tanpa batas\.$/, (_m, d) => `Quota resets ${enDate(d)}. Fifin Pro has unlimited check-ups.`],
  [/^Timer (.+) dimulai dengan tenang\.$/, (_m, d) => `${enDuration(d)} timer started calmly.`],
  [/^Halo, (.+?)! Sebelum mulai, maksimal 8 pertanyaan kilat dulu ya—pertanyaannya menyesuaikan jawabanmu\. Cukup ketuk jawabannya\.$/, "Hi, $1! Before we start, up to 8 quick questions—they adapt to your answers. Just tap an answer."],
  [/^Terima kasih sudah jujur\. Dari jawabanmu, kita mulai dari (.+)\. Pelan-pelan, tapi konsisten\.$/, (_m, list) => `Thanks for being honest. Based on your answers, let's start with ${list.split(" dan ").map(enCopy).join(" and ")}. Slowly, but consistently.`],
  [/^([+-]?\d+) poin dari check-up sebelumnya$/, "$1 points vs. previous check-up"],
  [/^([▲▼]) (\d+) poin$/, "$1 $2 pts"],
  [/^Membuka WhatsApp untuk paket (\d+) bulan\.$/, (_m, n) => `Opening WhatsApp for the ${n}-month plan.`],
  [/^(\d+) transaksi dirangkum\. Sampai nanti\.$/, "$1 transactions summarized. See you later."],
  [/^(Highlight|Ringkasan) diperbarui ke (\d+) Juni 2026\.$/, (_m, kind, d) => `${kind === "Highlight" ? "Highlights" : "Summary"} updated to ${d} June 2026.`],
  [/^Pratinjau rapor dari (.+)$/, (_m, who) => `Report preview from ${enCopy(who)}`],
  [/^Rapor keuanganku: (\d+)\/100$/, "My financial report: $1/100"],
  [/^Ini memperkuat skor area (.+)\.$/, (_m, area) => `This strengthens your ${enCopy(area.charAt(0).toUpperCase() + area.slice(1)).toLowerCase()} score.`],
  [/^Dana daruratmu setara sekitar ([\d.]+) bulan pengeluaran\.$/, "Your emergency fund covers about $1 months of expenses."],
  [/^Hai (.+), aku Fifin$/, "Hi $1, I'm Fifin"],
  [/^Hi Tamu, I'm Fifin$/, "Hi Guest, I'm Fifin"],
  [/^Open profile Tamu$/, "Open profile Guest"],
  [/^(.+) dibuka\.$/, (_m, title) => `${enCopy(title)} opened.`],
];

// Fifin's expression follows the score: cheerful when strong, bored/annoyed in the middle, sad/angry when red.
function scoreMood(score: number): FifinMood {
  return score >= 75 ? "happy" : score >= 65 ? "neutral" : score >= 55 ? "bored" : score >= 45 ? "annoyed" : score >= 35 ? "sad" : "angry";
}
const moodCaption: Record<string, string> = { happy: "Fifin ikut senang", neutral: "Fifin cukup tenang", bored: "Fifin agak bosan menunggu progres", annoyed: "Fifin sedikit bete", sad: "Fifin ikut sedih", angry: "Fifin geregetan", worried: "Fifin agak khawatir", alert: "Fifin waspada" };
function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function formatRupiah(value: number) {
  return `Rp ${Math.max(0, value).toLocaleString("id-ID")}`;
}

function getCheckupReaction(step: number, answers: number[], answered: boolean) {
  const [income, expenses, emergency, installments, savings] = answers;
  if (!answered) return { mood: "neutral" as FifinMood, title: "Isi senyamannya", text: "Perkiraan terdekat sudah cukup untuk memulai." };
  if (answers[step] === 0) {
    if (step === 3) return { mood: "happy" as FifinMood, title: "Tidak ada cicilan, sudah dicatat", text: "Ini memberi ruang lebih besar pada arus kas bulananmu." };
    if (step === 4) return { mood: "worried" as FifinMood, title: "Belum ada tabungan, tidak apa-apa", text: "Nanti Fifin bantu mencari nominal awal yang terasa ringan." };
    if (step === 5) return { mood: "happy" as FifinMood, title: "Tidak ada tanggungan, sudah dicatat", text: "Rekomendasi akan disesuaikan dengan kondisi ini." };
    return { mood: "worried" as FifinMood, title: "Jawaban nol sudah dicatat", text: "Fifin akan memperhitungkannya tanpa menghakimi." };
  }
  if (step === 0) return { mood: "happy" as FifinMood, title: "Oke, sudah tercatat", text: "Angka ini akan menjadi acuan untuk langkah berikutnya." };
  if (step === 1) {
    const ratio = expenses / Math.max(income, 1);
    return ratio <= .7 ? { mood: "happy" as FifinMood, title: "Masih ada ruang", text: "Pengeluaran rutinmu masih di bawah pemasukan." } : ratio <= .9 ? { mood: "worried" as FifinMood, title: "Cukup ketat", text: "Sebagian besar pemasukan sudah terpakai untuk kebutuhan rutin." } : { mood: "alert" as FifinMood, title: "Perlu dilihat bersama", text: "Pengeluaranmu hampir menyamai pemasukan. Tidak apa-apa, kita petakan dulu." };
  }
  if (step === 2) {
    const months = emergency / Math.max(expenses, 1);
    return months >= 3 ? { mood: "happy" as FifinMood, title: "Fondasinya mulai kuat", text: `Dana daruratmu setara sekitar ${months.toFixed(1)} bulan pengeluaran.` } : months >= 1 ? { mood: "worried" as FifinMood, title: "Sudah mulai terbentuk", text: "Dana daruratmu ada, tetapi masih bisa diperkuat bertahap." } : { mood: "alert" as FifinMood, title: "Kita jadikan prioritas", text: "Dana darurat masih tipis. Nanti Fifin bantu membuat langkah kecilnya." };
  }
  if (step === 3) {
    const ratio = installments / Math.max(income, 1);
    return ratio <= .3 ? { mood: "happy" as FifinMood, title: "Cicilan masih terjaga", text: "Porsinya masih di bawah 30% dari pemasukan." } : ratio <= .5 ? { mood: "worried" as FifinMood, title: "Perlu dijaga", text: "Porsi cicilan mulai cukup besar dibandingkan pemasukan." } : { mood: "alert" as FifinMood, title: "Beban cicilan cukup tinggi", text: "Kita akan melihat ruang yang bisa dibuat tanpa menghakimi." };
  }
  if (step === 4) {
    const ratio = savings / Math.max(income, 1);
    return ratio >= .1 ? { mood: "happy" as FifinMood, title: "Kebiasaan baik sudah ada", text: "Kamu sudah menyisihkan setidaknya 10% dari pemasukan." } : { mood: "worried" as FifinMood, title: "Mulai dari yang ringan", text: "Nominal kecil tetap berarti jika bisa dilakukan secara konsisten." };
  }
  return { mood: "happy" as FifinMood, title: "Gambaranmu makin lengkap", text: "Tanggungan akan diperhitungkan agar rekomendasi tetap realistis." };
}

const STORAGE_KEY = "fifin-data-v1";
type PlanItem = { id: string; week: string; area: string; text: string; due: number; status: "todo" | "doing" | "done" };
type CheckupEntry = { score: number; at: number };
type DelayEntry = { name: string; price: number; decision: "buy" | "skip"; at: number };
type SavedData = { answers?: number[]; answeredSteps?: boolean[]; extraAnswers?: number[]; planItems?: PlanItem[]; checkupHistory?: CheckupEntry[]; delayLog?: DelayEntry[]; session?: boolean; accountId?: string; accounts?: Record<string, { name: string; email: string }>; hasActivity?: boolean; profile?: { name: string; email: string } };
type SharedReport = { score: number; label: string; title: string; description: string; remainder: number; emergencyMonths: number; installmentRatio: number; savingRatio: number; answers: number[]; incomeType: string; areas: { key: string; label: string; description: string; score: number }[]; name?: string; at?: number };
const encodeReport = (data: SharedReport) => { const bytes = new TextEncoder().encode(JSON.stringify(data)); let bin = ""; bytes.forEach((b) => { bin += String.fromCharCode(b); }); return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
const sharedReport: SharedReport | null = (() => { try { const raw = new URLSearchParams(window.location.search).get("rapor"); if (!raw) return null; const bin = atob(raw.replace(/-/g, "+").replace(/_/g, "/")); const data = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))); return typeof data?.score === "number" && Array.isArray(data.areas) ? data : null; } catch { return null; } })();
const savedData: SavedData | null = (() => { try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; } })();

function App() {
  const [onboardingOpen, setOnboardingOpen] = useState(!sharedReport && !savedData?.session);
  const [session, setSession] = useState<boolean>(() => !!savedData?.session);
  const [accountId, setAccountId] = useState<string>(() => savedData?.accountId ?? "demo");
  const [accounts, setAccounts] = useState<Record<string, { name: string; email: string }>>(() => savedData?.accounts ?? {});
  const [previewMode, setPreviewMode] = useState(!!sharedReport);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introHint, setIntroHint] = useState("");
  const [avatarMoodIdx, setAvatarMoodIdx] = useState(0);
  const avatarMoods: FifinMood[] = ["happy", "neutral", "bored", "annoyed", "sad", "angry", "alert"];
  const [googlePickerOpen, setGooglePickerOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"choices" | "email">("choices");
  const [authEmail, setAuthEmail] = useState("");
  const [hasActivity, setHasActivity] = useState<boolean>(() => savedData?.hasActivity ?? false);
  const [page, setPage] = useState(sharedReport ? "report" : "home");
  const [overlay, setOverlay] = useState<"checkup" | "scan" | "delay" | "pro" | "privacy" | "share" | null>(null);
  const [checkStep, setCheckStep] = useState(0);
  const [checkDone, setCheckDone] = useState(false);
  const [answers, setAnswers] = useState<number[]>(() => savedData?.answers ?? [1500000, 0, 0, 0, 0, 1]);
  const [answeredSteps, setAnsweredSteps] = useState<boolean[]>(() => savedData?.answeredSteps ?? [true, false, false, false, false, false]);
  const [extraAnswers, setExtraAnswers] = useState<number[]>(() => savedData?.extraAnswers?.length === 8 ? savedData.extraAnswers : Array(8).fill(-1));
  const [planItems, setPlanItems] = useState<PlanItem[]>(() => savedData?.planItems ?? []);
  const [checkupHistory, setCheckupHistory] = useState<CheckupEntry[]>(() => savedData?.checkupHistory ?? []);
  const [delayLog, setDelayLog] = useState<DelayEntry[]>(() => savedData?.delayLog ?? [{ name: "Sepatu lari", price: 1250000, decision: "skip", at: Date.now() - 9 * 86400000 }]);
  const [savedReport, setSavedReport] = useState<null | { score: number; mood: FifinMood; label: string; title: string; description: string; remainder: number; emergencyMonths: number; installmentRatio: number; savingRatio: number; answers: number[]; incomeType: string; areas: { key: string; label: string; description: string; score: number }[] }>(() => sharedReport ? { ...sharedReport, mood: scoreMood(sharedReport.score) } : null);
  const [incomeType, setIncomeType] = useState<"Tetap" | "Fluktuatif">("Tetap");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([
    { from: "ai", text: "Ceritakan transaksi apa pun dengan bahasamu sendiri. Aku bantu rapikan." },
  ]);
  const [receiptReady, setReceiptReady] = useState(false);
  const [delayName, setDelayName] = useState("");
  const [delayPrice, setDelayPrice] = useState("");
  const [savedDelay, setSavedDelay] = useState({ name: "Headphone noise cancelling", price: 2450000 });
  const [toast, setToast] = useState("");
  const [introStage, setIntroStage] = useState<"chat" | "login" | "quiz" | "done">("chat");
  const [introIntent, setIntroIntent] = useState("");
  const [introInput, setIntroInput] = useState("");
  const [avatarHop, setAvatarHop] = useState(false);
  const [introMsgs, setIntroMsgs] = useState<{ from: "ai" | "user"; text: string; image?: string }[]>([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const introEndRef = useRef<HTMLDivElement>(null);
  const [delayEndsAt, setDelayEndsAt] = useState(() => Date.now() + (31 * 3600 + 24 * 60 + 18) * 1000);
  const [nowTick, setNowTick] = useState(() => Date.now());
  const [delayDecision, setDelayDecision] = useState<null | "buy" | "skip">(null);
  const [delayChecks, setDelayChecks] = useState<boolean[]>(() => Array(6).fill(false));
  const [delayDuration, setDelayDuration] = useState(48);
  const [savedTotal, setSavedTotal] = useState(0);
  const [profileEditing, setProfileEditing] = useState(false);
  const [profile, setProfile] = useState<{ name: string; email: string }>(() => savedData?.profile ?? { name: "Bulan", email: "bulan@example.com" });
  const [profileDraft, setProfileDraft] = useState(() => savedData?.profile ?? { name: "Bulan", email: "bulan@example.com" });
  const [notifPrefs, setNotifPrefs] = useState([true, true, false]);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [receiptCategory, setReceiptCategory] = useState("Kebutuhan harian");
  const [reflection, setReflection] = useState("Reward");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"ID" | "EN">("ID");
  const [financeTab, setFinanceTab] = useState<"overview" | "plan" | "worth" | "goals" | "protection">("overview");
  const [proPlan, setProPlan] = useState<"monthly" | "quarterly" | "annual">("quarterly");
  const [rightRailOpen, setRightRailOpen] = useState(true);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [highlightCalendarOpen, setHighlightCalendarOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const cursorShake = useRef({ x: 0, time: 0, direction: 0, turns: 0 });
  const [selectedDate, setSelectedDate] = useState("2026-06-12");

  useEffect(() => {
    const move = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true });
      const now = performance.now();
      const movement = event.movementX;
      if (Math.abs(movement) > 4) {
        const direction = Math.sign(movement);
        const turns = now - cursorShake.current.time < 500 && direction !== cursorShake.current.direction ? cursorShake.current.turns + 1 : now - cursorShake.current.time >= 500 ? 0 : cursorShake.current.turns;
        cursorShake.current = { x: event.clientX, time: now, direction, turns };
        if (turns >= 3) {
          setAssistantOpen(true);
          setToast("Fifin hadir. Pilih bantuan yang kamu butuhkan.");
          window.setTimeout(() => setToast(""), 2600);
          cursorShake.current.turns = 0;
        }
      }
    };
    const leave = () => setCursor((current) => ({ ...current, visible: false }));
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "EN" ? "en" : "id";
    const root = document.querySelector(".app-shell");
    if (!root) return;
    const toEnglish = (value: string) => {
      const core = value.trim();
      if (!core) return value;
      const direct = bilingualCopy[core];
      if (direct) return value.replace(core, direct);
      for (const [pattern, replacement] of bilingualPatterns) {
        if (pattern.test(core)) return value.replace(core, typeof replacement === "string" ? core.replace(pattern, replacement) : core.replace(pattern, replacement as (substring: string, ...args: any[]) => string));
      }
      return value;
    };
    // Originals (Indonesian source) are remembered per node so switching back to ID is exact.
    const translateText = (node: Node) => {
      const current = node.nodeValue ?? "";
      if (!current.trim()) return;
      if (translatedText.get(node) !== current) originalText.set(node, current);
      const source = originalText.get(node) ?? current;
      const next = language === "EN" ? toEnglish(source) : source;
      translatedText.set(node, next);
      if (next !== current) node.nodeValue = next;
    };
    const translateAttributes = (element: HTMLElement) => {
      ["placeholder", "title", "aria-label"].forEach((attribute) => {
        const current = element.getAttribute(attribute);
        if (!current) return;
        const key = `${attribute}`;
        const store = originalAttrs.get(element) ?? {};
        const written = translatedAttrs.get(element) ?? {};
        if (written[key] !== current) store[key] = current;
        const next = language === "EN" ? toEnglish(store[key] ?? current) : (store[key] ?? current);
        written[key] = next;
        originalAttrs.set(element, store); translatedAttrs.set(element, written);
        if (next !== current) element.setAttribute(attribute, next);
      });
    };
    const translateTree = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) { translateText(node); return; }
      if (node instanceof HTMLElement) {
        if (node.closest("input, textarea, [data-no-translate]") && node.tagName !== "INPUT") return;
        translateAttributes(node);
      }
      node.childNodes.forEach(translateTree);
    };
    translateTree(root);
    const observer = new MutationObserver((records) => records.forEach((record) => {
      if (record.type === "characterData") translateTree(record.target);
      else if (record.type === "attributes" && record.target instanceof HTMLElement) translateAttributes(record.target);
      record.addedNodes.forEach(translateTree);
    }));
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label"] });
    return () => observer.disconnect();
  }, [language]);

  const reportShareUrl = (() => {
    if (!savedReport) return "";
    const { mood: _mood, ...data } = savedReport;
    return `${window.location.origin}${window.location.pathname}?rapor=${encodeReport({ ...data, name: profile.name, at: checkupHistory[checkupHistory.length - 1]?.at ?? Date.now() })}`;
  })();
  const shareReport = () => { if (savedReport) setOverlay("share"); };
  const copyShareLink = () => {
    const done = () => showToast("Tautan pratinjau rapor disalin.");
    if (navigator.clipboard) navigator.clipboard.writeText(reportShareUrl).then(done, () => showToast("Salin manual dari kolom tautan, ya."));
    else showToast("Salin manual dari kolom tautan, ya.");
  };
  const exitPreview = () => {
    window.history.replaceState(null, "", window.location.pathname);
    setPreviewMode(false); setSavedReport(null); setPage("home"); setOnboardingOpen(true);
  };
  const openProWhatsApp = (duration: string, price: string) => {
    const text = `Halo Fifin, saya ingin membeli paket Fifin Pro ${duration} (${price}). Nama: ${profile.name}, email: ${profile.email}.`;
    window.open(`https://wa.me/6281290249743?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    showToast(`Membuka WhatsApp untuk paket ${duration}.`);
  };
  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const submitChat = (event?: FormEvent) => {
    event?.preventDefault();
    if (!chatInput.trim()) return;
    const sent = chatInput.trim();
    setMessages((old) => [
      ...old,
      { from: "user", text: sent },
      { from: "ai", text: "Sudah dicatat sebagai pengeluaran Makanan & Minuman. Nominalnya bisa kamu ubah kapan saja." },
    ]);
    setChatInput("");
    setHasActivity(true);
  };

  const setAnswer = (value: number) => {
    const qid = checkupOrder[checkStep];
    if (qid >= 6) { setExtraAnswers((old) => old.map((item, index) => (index === qid - 6 ? value : item))); return; }
    setAnswers((old) => old.map((item, index) => (index === qid ? value : item)));
    setAnsweredSteps((old) => old.map((item, index) => (index === qid ? true : item)));
  };

  const finishStep = () => {
    if (checkStep < checkupOrder.length - 1) setCheckStep((step) => step + 1);
    else {
      setCheckDone(true);
      setHasActivity(true);
      setSavedReport({ score: checkupScore, mood: resultMood, label: resultLabel, title: resultTitle, description: resultDescription, remainder: monthlyRemainder, emergencyMonths, installmentRatio, savingRatio, answers: [...answers], incomeType, areas: areaScores });
      const now = Date.now();
      setCheckupHistory((h) => [...h, { score: checkupScore, at: now }].slice(-12));
      setPlanItems(makePlan(areaScores).map((step, index) => ({ id: `${now}-${index}`, week: step.week, area: step.area ?? "", text: step.text ?? "", due: now + (index + 1) * 7 * 86400000, status: "todo" })));
    }
  };

  const closeOverlay = () => {
    setOverlay(null);
    setCheckDone(false);
    setCheckStep(0);
    setReceiptReady(false);
  };

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, answeredSteps, extraAnswers, planItems, checkupHistory, delayLog, hasActivity, profile, session, accountId, accounts, updatedAt: Date.now() })); } catch { /* storage unavailable */ }
  }, [answers, answeredSteps, extraAnswers, planItems, checkupHistory, delayLog, hasActivity, profile, session, accountId, accounts]);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 960) setMobileMenuOpen(false); };
    window.addEventListener("keydown", onKey); window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [mobileMenuOpen]);
  useEffect(() => { const id = window.setInterval(() => setNowTick(Date.now()), 1000); return () => window.clearInterval(id); }, []);
  const delayTotal = delayDuration * 3600 * 1000;
  const delayLeft = Math.max(0, delayEndsAt - nowTick);
  const delayProgress = Math.min(100, Math.round(((delayTotal - delayLeft) / delayTotal) * 100));
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const delayClock = `${pad2(Math.floor(delayLeft / 3600000))} : ${pad2(Math.floor(delayLeft / 60000) % 60)} : ${pad2(Math.floor(delayLeft / 1000) % 60)}`;
  useEffect(() => { introEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [introMsgs, introStage, quizStep]);
  const quickQuiz: { id: string; q: string; options: string[]; show?: (a: Record<string, number>) => boolean }[] = [
    { id: "income", q: "Penghasilan bulananmu kira-kira berapa?", options: ["< Rp3 jt", "Rp3–7 jt", "Rp7–15 jt", "> Rp15 jt"] },
    { id: "spend", q: "Biasanya berapa bagian yang habis terpakai tiap bulan?", options: ["Hampir semua", "Sekitar setengah", "Masih banyak sisa"] },
    { id: "review", q: "Seberapa sering kamu mengecek pengeluaran?", options: ["Setiap minggu", "Setiap bulan", "Kadang-kadang", "Hampir tidak pernah"] },
    { id: "emergency", q: "Sudah punya dana darurat?", options: ["Sudah", "Sedang mulai", "Belum"] },
    { id: "emergencyWhere", q: "Dana daruratnya disimpan di mana?", options: ["Rekening terpisah", "Campur rekening harian", "Saham / kripto"], show: (a) => a.emergency !== 2 },
    { id: "debt", q: "Ada cicilan rutin tiap bulan? (paylater, kartu kredit, kendaraan)", options: ["Tidak ada", "Sedikit", "Lumayan banyak"] },
    { id: "debtType", q: "Cicilan terbesarnya jenis apa?", options: ["KPR / kendaraan", "Kartu kredit / paylater", "Pinjol / pinjaman pribadi"], show: (a) => a.debt !== 0 },
    { id: "saving", q: "Sudah rutin menabung setiap bulan?", options: ["Rutin", "Kadang-kadang", "Belum"] },
    { id: "dependents", q: "Ada tanggungan finansial? (orang tua, pasangan, anak)", options: ["Tidak ada", "1 orang", "2 orang atau lebih"], show: (a) => Object.keys(a).length < 7 },
  ];
  const nextQuizIndex = (from: number, a: Record<string, number>) => { for (let i = from + 1; i < quickQuiz.length; i++) if (!quickQuiz[i].show || quickQuiz[i].show!(a)) return i; return -1; };
  const quizTotal = Math.min(8, Object.keys(quizAnswers).length + 1 + (() => { let n = 0, i = quizStep; while ((i = nextQuizIndex(i, quizAnswers)) !== -1) n++; return n; })());
  const sendIntro = (text: string) => {
    const value = text.trim(); if (!value || introStage !== "chat") return;
    setIntroIntent(value); setIntroInput("");
    setIntroMsgs((m) => [...m, { from: "user", text: value }]);
    window.setTimeout(() => { setIntroMsgs((m) => [...m, { from: "ai", text: "Siap, aku bantu! Biar ceritamu tersimpan aman, masuk dulu sebentar ya—cuma butuh beberapa detik." }]); setIntroStage("login"); }, 550);
  };
  const sendIntroImage = (file: File) => {
    if (introStage !== "chat") return;
    const reader = new FileReader();
    reader.onload = () => {
      setIntroIntent("Scan struk");
      setIntroMsgs((m) => [...m, { from: "user", text: file.name, image: String(reader.result) }]);
      window.setTimeout(() => { setIntroMsgs((m) => [...m, { from: "ai", text: "Gambarnya sudah kuterima! Aku bisa membaca struk ini jadi transaksi. Masuk dulu sebentar ya, biar hasilnya tersimpan aman." }]); setIntroStage("login"); }, 650);
    };
    reader.readAsDataURL(file);
  };
  const completeLogin = (name?: string, email?: string) => {
    const mail = (email ?? "").trim().toLowerCase();
    const id = mail || "demo";
    const fallback = mail.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    // Reuse edits saved earlier for this same account instead of resetting to defaults.
    const nextProfile = accounts[id] ?? (mail ? { name: (name ?? fallback) || "Kamu", email: mail } : { name: "Tamu", email: "Mode demo" });
    setAccountId(id); setProfile(nextProfile); setProfileDraft(nextProfile); setSession(true);
    setGooglePickerOpen(false); setAuthMode("choices"); setIntroStage("quiz"); setQuizStep(0); setQuizAnswers({});
    setIntroMsgs((m) => [...m, { from: "ai", text: `${(name || email) ? `Halo, ${(accounts[(email ?? "").trim().toLowerCase() || "demo"]?.name ?? name ?? "").split(" ")[0] || "kamu"}! ` : "Akunmu siap! "}Sebelum mulai, maksimal 8 pertanyaan kilat dulu ya—pertanyaannya menyesuaikan jawabanmu. Cukup ketuk jawabannya.` }, { from: "ai", text: quickQuiz[0].q }]);
  };
  const answerQuiz = (index: number) => {
    const current = quickQuiz[quizStep];
    const next = { ...quizAnswers, [current.id]: index }; setQuizAnswers(next);
    setIntroMsgs((m) => [...m, { from: "user", text: current.options[index] }]);
    const upcoming = Object.keys(next).length >= 8 ? -1 : nextQuizIndex(quizStep, next);
    if (upcoming !== -1) { window.setTimeout(() => setIntroMsgs((m) => [...m, { from: "ai", text: quickQuiz[upcoming].q }]), 450); setQuizStep(upcoming); return; }
    const income = [2500000, 5000000, 10000000, 20000000][next.income];
    const expense = Math.round(income * [0.9, 0.55, 0.35][next.spend]);
    const emergency = [expense * 3, expense, 0][next.emergency];
    const debt = [0, Math.round(income * 0.1), Math.round(income * 0.3)][next.debt];
    const saving = [Math.round(income * 0.15), Math.round(income * 0.05), 0][next.saving];
    const dependents = [0, 1, 2][next.dependents ?? 0];
    setAnswers([income, expense, emergency, debt, saving, dependents]);
    setAnsweredSteps([true, true, true, true, true, true]);
    setExtraAnswers((old) => old.map((v, i) => i === 0 ? next.review : i === 1 ? (next.emergency === 2 ? 3 : [0, 1, 2][next.emergencyWhere ?? 0]) : i === 2 ? (next.debt === 0 ? 0 : [1, 2, 3][next.debtType ?? 0]) : v));
    setHasActivity(true); setIntroStage("done");
    const tips = [next.emergency === 2 && "dana darurat", next.debtType === 2 && "pinjaman berbunga tinggi", next.saving === 2 && "kebiasaan menabung"].filter(Boolean);
    window.setTimeout(() => setIntroMsgs((m) => [...m, { from: "ai", text: tips.length ? `Terima kasih sudah jujur. Dari jawabanmu, kita mulai dari ${tips.join(" dan ")}. Pelan-pelan, tapi konsisten.` : "Mantap, fondasimu sudah lumayan! Kita tinggal rapikan supaya sisa uangmu makin terarah." }, { from: "ai", text: "Jawabanmu sudah otomatis mengisi sebagian Check-up. Lengkapi sisanya untuk skor per area dan rencana 30 hari." }]), 450);
  };
  const finishIntro = (target?: string) => {
    setOnboardingOpen(false);
    const intent = introIntent.toLowerCase();
    const dest = target || (intent.includes("catat") || intent.includes("pengeluaran") ? "chat" : intent.includes("beli") ? "waiting" : "home");
    setPage(dest); if (dest === "chat") setChatInput(introIntent);
    showToast("Selamat datang di Fifin.");
  };
  const pageTitle = useMemo(() => page === "profile" ? "Profil" : page === "history" ? "Riwayat" : page === "help" ? "Pusat Bantuan" : page === "highlights" ? "Highlight Keuanganmu" : page === "chat" ? "Chat Fifin" : nav.find((item) => item.id === page)?.label || "Beranda", [page]);
  const navigate = (target: string) => {
    setPage(target);
  };
  const isNavActive = (id: string) => id === "finance" ? page === "finance" : page === id;
  const [income, expenses, emergencyFund, installments, savings] = answers;
  const monthlyRemainder = income - expenses - installments - savings;
  const emergencyMonths = emergencyFund / Math.max(expenses, 1);
  const installmentRatio = installments / Math.max(income, 1);
  const savingRatio = savings / Math.max(income, 1);
  const cashflowPoints = monthlyRemainder >= 0 ? Math.min(25, 15 + (monthlyRemainder / Math.max(income, 1)) * 20) : Math.max(0, 15 + (monthlyRemainder / Math.max(income, 1)) * 30);
  const emergencyPoints = Math.min(30, (emergencyMonths / 6) * 30);
  const installmentPoints = installmentRatio <= .3 ? 25 : Math.max(0, 25 - (installmentRatio - .3) * 50);
  const savingPoints = Math.min(20, (savingRatio / .2) * 20);
  const ex = (i: number) => extraAnswers[i] >= 0 ? Number(extraQuestions[i].options[extraAnswers[i]][1]) : .5;
  const dependentsPenalty = answers[5] > 0 && extraAnswers[6] === 2 ? .6 : 1;
  const areaRaw: Record<string, number> = {
    cashflow: (cashflowPoints / 25) * .8 + ex(0) * .2,
    emergency: (emergencyPoints / 30) * .75 + ex(1) * .25,
    debt: (installmentPoints / 25) * .6 + ex(2) * .2 + ex(3) * .2,
    saving: (savingPoints / 20) * .7 + ex(4) * .3,
    protection: ex(5) * .6 + ex(6) * .4,
    planning: ex(7) * .75 * dependentsPenalty + (answers[5] > 2 ? .1 : .25),
  };
  const areaScores = checkupAreas.map((area) => ({ key: area.key, label: area.label, description: area.description, score: Math.max(0, Math.min(100, Math.round(areaRaw[area.key] * 100))) }));
  const checkupScore = Math.max(0, Math.min(100, Math.round(areaScores.reduce((sum, area) => sum + area.score * areaWeights[area.key], 0))));
  const resultMood: FifinMood = scoreMood(checkupScore);
  const resultLabel = checkupScore >= 80 ? "Kondisi kuat" : checkupScore >= 60 ? "Cukup sehat" : "Perlu perhatian";
  const resultTitle = checkupScore >= 80 ? "Fondasi keuanganmu sudah kuat." : checkupScore >= 60 ? "Fondasi keuanganmu sudah ada." : "Kita sudah menemukan area prioritasmu.";
  const resultDescription = checkupScore >= 80 ? "Arus kas, cicilan, dan kebiasaan menabungmu berada di jalur yang baik. Pertahankan sambil memperkuat perlindungan." : checkupScore >= 60 ? "Beberapa bagian sudah berjalan baik, tetapi masih ada ruang untuk memperkuat dana darurat atau menjaga porsi cicilan." : "Skor ini bukan nilai buruk. Artinya, ada beberapa area yang sebaiknya dibereskan lebih dulu agar keuanganmu terasa lebih lega.";
  const currentQid = checkupOrder[checkStep];
  const currentExtra = currentQid >= 6 ? extraQuestions[currentQid - 6] : null;
  const currentAnswered = currentQid >= 6 ? extraAnswers[currentQid - 6] >= 0 : answeredSteps[currentQid];
  const currentArea = checkupAreas.find((area) => (area.ids as readonly number[]).includes(currentQid))!;
  const currentTitle = currentExtra ? currentExtra.title : questions[currentQid].title;
  const currentHelper = currentExtra ? currentExtra.helper : questions[currentQid].helper;
  const checkupReaction = currentExtra ? (currentAnswered ? (() => { const v = Number(currentExtra.options[extraAnswers[currentQid - 6]][1]); return v >= .7 ? { mood: "happy" as FifinMood, title: "Kebiasaan yang baik", text: "Ini memperkuat skor area " + currentArea.label.toLowerCase() + "." } : v >= .4 ? { mood: "worried" as FifinMood, title: "Sudah ada pondasinya", text: "Masih ada ruang kecil untuk diperkuat bertahap." } : { mood: "alert" as FifinMood, title: "Kita catat sebagai prioritas", text: "Tidak apa-apa, Fifin akan masukkan ke rencana 30 harimu." }; })() : { mood: "neutral" as FifinMood, title: "Pilih yang paling mendekati", text: "Tidak ada jawaban benar atau salah." }) : getCheckupReaction(currentQid, answers, answeredSteps[currentQid]);
  const activeReport = savedReport ?? { score: checkupScore, mood: resultMood, label: resultLabel, title: resultTitle, description: resultDescription, remainder: monthlyRemainder, emergencyMonths, installmentRatio, savingRatio, answers, incomeType, areas: areaScores };
  const weakestAreas = [...activeReport.areas].sort((a, b) => a.score - b.score);
  const makePlan = (areas: { key: string; label: string; score: number }[]) => { const w = [...areas].sort((a, b) => a.score - b.score); return [
    { week: "Minggu 1", area: w[0]?.label, text: areaActions[w[0]?.key]?.[0] },
    { week: "Minggu 2", area: w[0]?.label, text: areaActions[w[0]?.key]?.[1] },
    { week: "Minggu 3", area: w[1]?.label, text: areaActions[w[1]?.key]?.[0] },
    { week: "Minggu 4", area: "Evaluasi", text: "Ulangi Check-up dan bandingkan skor per area dengan rapor ini." },
  ]; };
  const actionPlan = makePlan(activeReport.areas);
  const delayQuestions = ["Aku belum punya barang serupa yang masih berfungsi.", "Aku tetap ingin membelinya meski tanpa diskon.", "Harganya tidak mengganggu dana darurat dan tagihan.", "Aku tahu akan dipakai minimal seminggu sekali.", "Aku sudah membandingkan harga di 2+ tempat.", "Ini bukan pelarian dari rasa stres atau bosan."];
  const delayReadiness = delayChecks.filter(Boolean).length;
  const hourlyIncome = Math.max(income, 1) / 173;
  const delayImpact = {
    emergencyPct: emergencyFund >= 10000 ? Math.round((savedDelay.price / emergencyFund) * 100) : null,
    expenseDays: Math.round(savedDelay.price / Math.max(expenses / 30, 1)),
    workHours: Math.round(savedDelay.price / hourlyIncome),
    incomePct: Math.round((savedDelay.price / Math.max(income, 1)) * 100),
    savingMonths: savings >= 10000 ? Math.ceil(savedDelay.price / savings) : null,
  };
  const recommendDuration = (price: number) => { const ratio = price / Math.max(income, 1); return ratio < .05 ? 24 : ratio < .25 ? 48 : 168; };
  const durationLabel = (h: number) => h >= 168 ? "7 hari" : `${h} jam`;
  const areaTone = (score: number) => score >= 75 ? "good" : score >= 50 ? "watch" : "alert";
  const areaBreakdown = (areas: { key: string; label: string; description: string; score: number }[]) => <section className="area-breakdown"><div className="area-breakdown-head"><span>SKOR PER AREA</span><h2>Di mana kamu kuat, di mana perlu dirawat.</h2></div><div className="area-grid">{areas.map((area) => <article key={area.key} className={areaTone(area.score)}><div><strong>{area.label}</strong><b>{area.score}</b></div><i><em style={{ width: `${area.score}%` }} /></i><small>{area.score >= 75 ? "Sudah kuat" : area.score >= 50 ? "Perlu dijaga" : "Prioritas"} · {area.description}</small><span className="area-weight">Bobot {Math.round(areaWeights[area.key] * 100)}%</span></article>)}</div></section>;
  const RECHECK_LIMIT = 3;
  const recentCheckups = checkupHistory.filter((entry) => entry.at > Date.now() - 30 * 86400000);
  const recheckLeft = Math.max(0, RECHECK_LIMIT - recentCheckups.length);
  const nextRecheckAt = recentCheckups.length ? recentCheckups[0].at + 30 * 86400000 : Date.now();
  const previousScore = checkupHistory.length > 1 ? checkupHistory[checkupHistory.length - 2].score : null;
  const startRecheck = () => {
    if (recheckLeft === 0) { showToast(`Kuota check-up gratis habis. Tersedia lagi ${formatDate(nextRecheckAt)}.`); return; }
    setCheckDone(false); setCheckStep(0); setPage("checkup"); showToast("Jawaban sebelumnya sudah terisi. Ubah yang berubah saja.");
  };
  const recheckCard = <section className="recheck-card"><div><span>CHECK-UP ULANG</span><strong>{recheckLeft > 0 ? `Sisa ${recheckLeft} dari ${RECHECK_LIMIT} check-up bulan ini` : "Kuota check-up bulan ini habis"}</strong><p>{recheckLeft > 0 ? "Paket Gratis bisa check-up 3 kali per 30 hari. Disarankan ulang setelah rencana 30 hari selesai agar perubahannya terlihat." : `Kuota kembali ${formatDate(nextRecheckAt)}. Fifin Pro bisa check-up tanpa batas.`}</p></div><i className="recheck-dots">{Array.from({ length: RECHECK_LIMIT }, (_, n) => <em key={n} className={n < recentCheckups.length ? "used" : ""} />)}</i>{recheckLeft > 0 ? <button className="primary-button" onClick={startRecheck}>Check-up ulang <Icon name="arrow" size={15} /></button> : <button className="primary-button" onClick={() => setOverlay("pro")}>Lihat Fifin Pro <Icon name="arrow" size={15} /></button>}</section>;
  const planList = planItems.length ? planItems : actionPlan.map((step, index) => ({ id: `draft-${index}`, week: step.week, area: step.area ?? "", text: step.text ?? "", due: Date.now() + (index + 1) * 7 * 86400000, status: "todo" as const }));
  const planDoneCount = planList.filter((item) => item.status === "done").length;
  const planDoingCount = planList.filter((item) => item.status === "doing").length;
  const setPlanStatus = (id: string, status: PlanItem["status"]) => {
    setPlanItems((items) => (items.length ? items : planList).map((item) => item.id === id ? { ...item, status } : item));
    if (status === "done") showToast("Mantap! Satu langkah selesai.");
  };
  const actionPlanView = <section className="action-plan"><div className="area-breakdown-head"><span>RENCANA AKSI 30 HARI</span><h2>Action item untuk kamu jalankan.</h2><p>Disusun dari area terlemah: {weakestAreas[0]?.label} dan {weakestAreas[1]?.label}. Ubah status saat kamu mulai atau menyelesaikannya.</p></div>
    <div className="plan-summary"><div><strong>{planDoneCount}/{planList.length}</strong><small>selesai</small></div><div><strong>{planDoingCount}</strong><small>sedang jalan</small></div><div className="plan-bar" role="progressbar" aria-valuenow={planDoneCount} aria-valuemin={0} aria-valuemax={planList.length}><em style={{ width: `${(planDoneCount / planList.length) * 100}%` }} /><b style={{ width: `${((planDoneCount + planDoingCount) / planList.length) * 100}%` }} /></div></div>
    <ol>{planList.map((item) => { const overdue = item.status !== "done" && item.due < Date.now(); return <li key={item.id} className={`plan-item ${item.status}`}><button type="button" className="plan-toggle" aria-label={item.status === "done" ? "Tandai belum selesai" : "Tandai selesai"} onClick={() => setPlanStatus(item.id, item.status === "done" ? "todo" : "done")}>{item.status === "done" && <Icon name="check" size={13} />}</button><div className="plan-body"><small>{item.week} · {item.area}</small><strong>{item.text}</strong><span className={overdue ? "plan-due overdue" : "plan-due"}><Icon name="clock" size={12} /> {overdue ? "Lewat tenggat" : "Tenggat"} {formatDate(item.due)}</span></div><div className="plan-status" role="group" aria-label="Status">{([["todo", "Belum"], ["doing", "Jalan"], ["done", "Selesai"]] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={item.status === value} className={item.status === value ? "active" : ""} onClick={() => setPlanStatus(item.id, value)}>{label}</button>)}</div></li>; })}</ol></section>;
  return (
    <div className={`${darkMode ? "app-shell dark" : "app-shell"}${onboardingOpen ? " onboarding-active" : ""}`}>
      {onboardingOpen && <div className="onboarding-screen">
        <div className="onboarding-utilities"><div className="language-toggle" aria-label="Pilihan bahasa onboarding"><button aria-pressed={language === "ID"} className={language === "ID" ? "active" : ""} onClick={() => setLanguage("ID")}>ID</button><button aria-pressed={language === "EN"} className={language === "EN" ? "active" : ""} onClick={() => setLanguage("EN")}>EN</button></div><button className="theme-icon-button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Gunakan mode terang" : "Gunakan mode gelap"}><Icon name={darkMode ? "moon" : "sun"} size={18} /></button></div>
        <div className="onboarding-hero-outside">
<div className="onboarding-brand"><button type="button" className={`intro-avatar-btn${introInput ? " typing" : ""}${avatarHop ? " hop" : ""}`} aria-label="Sapa Fifin" onClick={() => { setAvatarHop(true); setAvatarMoodIdx((i) => (i + 1) % avatarMoods.length); window.setTimeout(() => setAvatarHop(false), 700); }}><FifinAvatar mood={avatarMoods[avatarMoodIdx]} /></button><span><strong>Fifin</strong></span></div>
<div className="onboarding-copy"><span className="eyebrow">{language === "EN" ? "WELCOME" : "SELAMAT DATANG"}</span><h1><span>{language === "EN" ? <>Let's check your finances<br />with Fifin.</> : <>Yuk, cek keuanganmu<br />bareng Fifin.</>}</span></h1><p>{language === "EN" ? "Start with a short Check-up. Fifin then helps you log transactions, understand your finances, and make calmer purchase decisions." : "Mulai dengan Check-up singkat. Setelah itu Fifin membantu mencatat transaksi, membaca kondisi keuangan, dan menemani keputusan belanjamu."}</p></div>
        </div>
        {introStage === "chat" && <div className="intro-chips intro-chips-outside"><button onClick={() => sendIntro("Cek kondisi keuanganku")}>Cek kondisi keuanganku</button><button onClick={() => sendIntro("Catat pengeluaran hari ini")}>Catat pengeluaran hari ini</button><button onClick={() => sendIntro("Gimana mulai dana darurat?")}>Gimana mulai dana darurat?</button><button onClick={() => sendIntro("Lagi pengen beli sesuatu")}>Lagi pengen beli sesuatu</button><button type="button" className="chip-login" onClick={() => { setAuthMode("choices"); setIntroStage("login"); }}><Icon name="lock" size={14} />{language === "EN" ? "Sign in" : "Masuk"}</button></div>}
        <section className="onboarding-story single-card">

          <div className="intro-chat intro-inline">
          <div className="intro-chat-body">
            <div className="intro-glow" />
            <div className="intro-scroll">
              {introMsgs.length === 0 && <div className="intro-empty"><FifinAvatar mood="happy" /><h2>Mau mulai dari mana hari ini?</h2><p>Pilih salah satu atau ketik bebas. Belum perlu login.</p></div>}
              {introMsgs.map((m, i) => <div key={i} className={`intro-msg ${m.from}`}>{m.from === "ai" && <FifinAvatar small mood="happy" />}<p>{m.image && <img className="intro-msg-image" src={m.image} alt="Gambar yang diunggah" />}{m.text}</p></div>)}
              {introStage === "login" && <div className="intro-login-overlay" role="dialog" aria-modal="true"><div className="intro-auth-card"><div className="intro-auth-avatar"><FifinAvatar mood="happy" /></div><button type="button" className="intro-auth-close" aria-label="Tutup login" onClick={() => { setAuthMode("choices"); setIntroStage("chat"); setIntroMsgs((m) => [...m, { from: "ai", text: "Oke, nggak apa-apa. Kita ngobrol dulu saja—login kapan pun kamu siap." }]); }}><Icon name="close" size={16} /></button>{authMode === "choices" ? <>
            <span className="eyebrow">{language === "EN" ? "START SECURELY" : "MULAI DENGAN AMAN"}</span><h2>{language === "EN" ? "Enter your financial space." : "Masuk ruang finansialmu."}</h2><p>{language === "EN" ? "Your history, reports, and plans will be saved to this account." : "Riwayat, rapor, dan rencanamu akan tersimpan di akun ini."}</p>
            <button className="google-auth" aria-expanded={googlePickerOpen} onClick={() => setGooglePickerOpen((v) => !v)}><GoogleIcon />{language === "EN" ? "Continue with Google" : "Lanjutkan dengan Google"}</button>{googlePickerOpen && <div className="google-dropdown" role="listbox" aria-label={language === "EN" ? "Choose a Google account" : "Pilih akun Google"}>{[["Bulan Pratama","bulan.pratama@gmail.com","B"],["Bulan Finance","bulan.finance@gmail.com","BF"]].map(([name,email,initial]) => <button key={email} role="option" onClick={() => { setGooglePickerOpen(false); completeLogin(name, email); }}><span>{initial}</span><div><strong>{name}</strong><small>{email}</small></div><Icon name="chevron" size={15} /></button>)}<button className="google-dropdown-other" onClick={() => { setGooglePickerOpen(false); setAuthMode("email"); }}><span><Icon name="plus" size={15} /></span><div><strong>{language === "EN" ? "Use another account" : "Gunakan akun lain"}</strong></div></button></div>}
            <div className="auth-divider"><i />{language === "EN" ? "or" : "atau"}<i /></div>
            <button className="email-auth" onClick={() => setAuthMode("email")}><Icon name="send" size={17} />{language === "EN" ? "Continue with email" : "Lanjutkan dengan email"}</button>
            <button className="explore-demo" onClick={() => completeLogin()}>{language === "EN" ? "Explore the demo first" : "Jelajahi demo dulu"}</button>
            <small>{language === "EN" ? "By continuing, you agree to Fifin's Terms of Use and Privacy Policy." : "Dengan melanjutkan, kamu menyetujui Ketentuan Penggunaan dan Kebijakan Privasi Fifin."}</small>
          </> : <form onSubmit={(event) => { event.preventDefault(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(authEmail.trim())) return; completeLogin(undefined, authEmail); }}>
            <button type="button" className="auth-back" onClick={() => setAuthMode("choices")}><Icon name="arrow" size={14} /> {language === "EN" ? "Back" : "Kembali"}</button>
            <span className="eyebrow">{language === "EN" ? "SIGN IN WITH EMAIL" : "MASUK DENGAN EMAIL"}</span><h2>{language === "EN" ? "Where should we send your sign-in link?" : "Ke mana kami mengirim tautan masuk?"}</h2><p>{language === "EN" ? "No password needed. We'll send you a secure link." : "Tidak perlu kata sandi. Kami akan mengirim tautan yang aman."}</p>
            <label><span>{language === "EN" ? "Email address" : "Alamat email"}</span><input type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="nama@email.com" required autoFocus /></label>
            <button className="primary-button wide" type="submit">{language === "EN" ? "Send sign-in link" : "Kirim tautan masuk"} <Icon name="arrow" size={16} /></button>
          </form>}</div></div>}
              {introStage === "quiz" && <div className="intro-options">{quickQuiz[quizStep].options.map((o, i) => <button key={o} onClick={() => answerQuiz(i)}>{o}</button>)}<span className="intro-quiz-progress">{Object.keys(quizAnswers).length + 1}/{quizTotal}</span></div>}
              {introStage === "done" && <div className="intro-options final"><button className="primary-button" onClick={() => finishIntro()}>Lanjut ke Fifin <Icon name="arrow" size={15} /></button><button onClick={() => finishIntro("checkup")}>Lengkapi Check-up</button></div>}
              {introStage === "chat" && introMsgs.length > 0 && <div className="intro-login-cta"><button type="button" className="primary-button" onClick={() => { setAuthMode("choices"); setIntroStage("login"); }}><GoogleIcon />{language === "EN" ? "Sign in now" : "Masuk sekarang"}</button><span>{language === "EN" ? "So your chats and records are saved" : "Biar obrolan dan catatanmu tersimpan"}</span></div>}
              <div ref={introEndRef} />
            </div>
            {introStage === "chat" && <>
              <form className="intro-composer" onSubmit={(e) => { e.preventDefault(); if (introInput.trim()) { sendIntro(introInput); return; } const SR = (window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any }).SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition; if (!SR) { setIntroHint(language === "EN" ? "Voice input isn't supported here. Type instead." : "Input suara belum didukung di browser ini. Ketik saja, ya."); return; } const rec = new SR(); rec.lang = language === "EN" ? "en-US" : "id-ID"; rec.onresult = (ev: any) => { setIntroHint(""); setIntroInput(ev.results[0][0].transcript); }; rec.onerror = () => setIntroHint(language === "EN" ? "Couldn't hear you. Try again or type." : "Suaramu belum terdengar. Coba lagi atau ketik."); setIntroHint(language === "EN" ? "Listening..." : "Mendengarkan..."); rec.start(); }}><input value={introInput} onChange={(e) => { setIntroInput(e.target.value); setIntroHint(""); }} maxLength={500} aria-label={language === "EN" ? "Message Fifin" : "Pesan untuk Fifin"} placeholder={introHint || (language === "EN" ? "Ask anything about your money..." : "Tanya apa saja soal uangmu...")} /><label className="intro-upload" aria-label="Unggah atau scan gambar" title="Unggah / scan gambar"><input type="file" accept="image/*" capture="environment" onChange={(e) => { const file = e.target.files?.[0]; e.target.value = ""; if (file) sendIntroImage(file); }} /><Icon name="scan" size={18} /></label><button type="submit" aria-label="Kirim" className={introInput.trim() ? "ready" : ""}><Icon name={introInput.trim() ? "arrow" : "mic"} size={18} /></button></form>
            </>}
            {introStage === "quiz" && <button className="intro-skip" onClick={() => finishIntro()}>Lewati, isi nanti</button>}
          </div>
        </div>
          <div className="onboarding-benefits"><span><Icon name="chart" size={17} /><b>{language === "EN" ? "A judgment-free Check-up" : "Check-up tanpa menghakimi"}</b></span><span><Icon name="sparkles" size={17} /><b>{language === "EN" ? "Log money in everyday language" : "Catat dengan bahasa sehari-hari"}</b></span><span><Icon name="shield" size={17} /><b>{language === "EN" ? "Private and secure data" : "Data tetap privat dan aman"}</b></span></div>
          
        </section>
        <footer className="onboarding-page-footer"><div className="onboarding-footer"><span>{language === "EN" ? "A more comfortable financial space" : "Ruang finansial yang terasa lebih nyaman"}</span><small>© 2026 Fifin</small></div></footer>
      </div>}
      <aside className="sidebar">
        <nav className="main-nav" aria-label="Navigasi utama">
          <span className="nav-menu-label">MENU UTAMA</span>
          {nav.map((item) => (
            <button key={item.id} className={isNavActive(item.id) ? "nav-item active" : "nav-item"} onClick={() => navigate(item.id)}>
              <Icon name={item.icon} /><span className="nav-copy"><strong>{language === "EN" ? englishNav[item.id] : item.label}</strong><small>{language === "EN" ? englishNavDescriptions[item.id] : item.description}</small></span>
            </button>
          ))}
        </nav>
        <div className="pro-card">
          <span className="pro-icon"><Icon name="sparkles" size={18} /></span>
          <strong>Fifin Pro</strong>
          <p>Insight lebih lengkap, obrolan tanpa batas.</p>
          <button onClick={() => setOverlay("pro")}>Lihat paket <Icon name="arrow" size={15} /></button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-identity">
            <button className="burger-button" onClick={() => setMobileMenuOpen(true)} aria-label={language === "EN" ? "Open menu" : "Buka menu"} aria-expanded={mobileMenuOpen}><Icon name="menu" size={20} /></button>
            <button className="topbar-brand brand" onClick={() => setPage("home")}><FifinAvatar small /><span>Fifin</span></button>
            <span className="desktop-page">{language === "EN" ? `Hi ${profile.name.split(" ")[0] || "there"}, I'm Fifin` : `Hai ${profile.name.split(" ")[0] || "kamu"}, aku Fifin`}</span>
          </div>
          <div className="top-actions">
            <button className={rightRailOpen ? "rewire-toggle active" : "rewire-toggle"} onClick={() => setRightRailOpen((open) => !open)}><Icon name="chart" size={15} /> Rewire <Icon name="chevron" size={13} /></button>
            <div className="language-toggle" aria-label="Pilihan bahasa"><button aria-pressed={language === "ID"} className={language === "ID" ? "active" : ""} onClick={() => { setLanguage("ID"); showToast("Bahasa diubah ke Indonesia."); }}>ID</button><button aria-pressed={language === "EN"} className={language === "EN" ? "active" : ""} onClick={() => { setLanguage("EN"); showToast("Language switched to English."); }}>EN</button></div>
            <button className="theme-icon-button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Gunakan mode terang" : "Gunakan mode gelap"} aria-pressed={darkMode}><Icon name={darkMode ? "moon" : "sun"} size={18} /></button>
            <button className="icon-button notification-button" onClick={() => setNotificationsOpen((open) => !open)} aria-label="Notifikasi"><Icon name="bell" /><i /></button>
            <button className={page === "profile" ? "top-profile active" : "top-profile"} onClick={() => setPage("profile")} aria-label={`Buka profil ${profile.name}`}>
              <span className="top-avatar">{(profile.name.trim()[0] || "F").toUpperCase()}</span><span><strong>{profile.name.split(" ")[0] || "Kamu"}</strong><small>Paket Gratis</small></span><Icon name="chevron" size={14} />
            </button>
          </div>
          {notificationsOpen && <div className="notification-panel"><div><span><strong>Pembaruan penting</strong><small>Tanpa streak, tanpa pengingat yang menghakimi.</small></span><button onClick={() => setNotificationsOpen(false)}><Icon name="close" size={16} /></button></div><article><span className="notice-icon"><Icon name="clock" size={16} /></span><p><strong>Waktu refleksimu masih berjalan</strong><small>Headphone dapat kamu tinjau lagi dalam 31 jam.</small></p></article><article><span className="notice-icon mint"><Icon name="chart" size={16} /></span><p><strong>Draf check-up tersimpan</strong><small>Lanjutkan kapan saja sebelum 7 hari. Jawabanmu tetap aman.</small></p></article><article><span className="notice-icon blue"><Icon name="sparkles" size={16} /></span><p><strong>18 balasan chat tersedia</strong><small>Kuota diperbarui transparan setiap awal bulan.</small></p></article><button className="notification-settings" onClick={() => { setNotificationsOpen(false); setPage("profile"); }}>Atur notifikasi di Profil <Icon name="arrow" size={14} /></button></div>}
        </header>

        {page === "home" && (
          <div className={rightRailOpen ? "advisor-layout" : "advisor-layout rail-collapsed"}>
            <section className="advisor-center">
              <div className="center-menu-bar"><button onClick={() => setPage("history")}><Icon name="clock" size={14} /> Riwayat <Icon name="chevron" size={13} /></button></div>
              <div className="advisor-hero">
                <FifinAvatar />
                <span className="vivin-status"><i /> FIFIN · ASISTEN KEUANGAN</span>
                <h1><span>{language === "EN" ? <>Let's check your finances<br />with Fifin.</> : <>Yuk, cek keuanganmu<br />bareng Fifin.</>}</span></h1>
                <p>Beberapa pertanyaan pendek membantuku memahami angkamu sebelum kita mencatat dan merencanakan keuangan bersama.</p>
                <div className="advisor-hero-actions"><button className="primary-button" onClick={() => setPage("checkup")}>Mulai Check-up <Icon name="arrow" size={16} /></button><button onClick={() => setPage("help")}>Fifin bisa bantu apa?</button></div>
              </div>
              <div className="advisor-bottom">
                <form className="home-composer" onSubmit={(event) => { submitChat(event); setPage("chat"); }}>
                  <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Setelah check-up, ceritakan transaksi atau rencanamu di sini..." aria-label="Ceritakan transaksi kepada Fifin" />
                  <div><span><button type="button" onClick={() => setOverlay("scan")} aria-label="Scan struk"><Icon name="scan" size={18} /></button><button type="button" onClick={() => showToast("Aku siap dengar. Cerita saja, ya.")} aria-label="Rekam suara"><Icon name="mic" size={18} /></button></span><button type="submit" className="home-send" aria-label="Kirim ke Fifin"><Icon name="arrow" size={18} /></button></div>
                </form>
                <div className="advisor-actions">
                  <button onClick={() => setPage("chat")}><span><Icon name="sparkles" /></span><b>Catat Transaksi</b><small>Cerita dengan bahasa sehari-hari</small><Icon name="arrow" size={15} /></button>
                  <button onClick={() => { setPage("finance"); setFinanceTab("overview"); }}><span><Icon name="wallet" /></span><b>Neraca Bulanan</b><small>Lihat uang yang tersisa bulan ini</small><Icon name="arrow" size={15} /></button>
                  <button onClick={() => { setPage("finance"); setFinanceTab("goals"); }}><span><Icon name="chart" /></span><b>Tujuanmu</b><small>Susun target yang ingin dicapai</small><Icon name="arrow" size={15} /></button>
                  <button onClick={() => setPage("waiting")}><span><Icon name="clock" /></span><b>Tunda Beli</b><small>Tunggu 48 jam sebelum memutuskan</small><Icon name="arrow" size={15} /></button>
                </div>
              </div>
            </section>
            <aside className="advisor-rail">
              <div className="rail-heading"><span>Highlight keuanganmu hari ini</span><button onClick={() => setPage("highlights")} aria-label="Buka Highlight Keuanganmu"><Icon name="arrow" size={13} /></button></div>
              <div className="rail-calendar-wrap">
                <button className={calendarOpen ? "rail-calendar rail-card active" : "rail-calendar rail-card"} onClick={() => setCalendarOpen((open) => !open)} aria-expanded={calendarOpen}><Icon name="clock" size={14} /><span>{Number(selectedDate.split("-")[2])} Juni 2026</span><Icon name="chevron" size={13} /></button>
                {calendarOpen && <div className="calendar-popover"><div className="calendar-header"><button onClick={() => showToast("Belum ada data sebelum Juni 2026.")}><Icon name="chevron" size={14} /></button><strong>Juni 2026</strong><button onClick={() => showToast("Belum ada data setelah Juni 2026.")}><Icon name="chevron" size={14} /></button></div><div className="calendar-weekdays">{["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-days">{Array.from({ length: 30 }, (_, index) => index + 1).map((day) => <button key={day} className={Number(selectedDate.split("-")[2]) === day ? "selected" : ""} onClick={() => { setSelectedDate(`2026-06-${String(day).padStart(2,"0")}`); setCalendarOpen(false); showToast(`Highlight diperbarui ke ${day} Juni 2026.`); }}>{day}</button>)}</div><button className="calendar-today" onClick={() => { setSelectedDate("2026-06-12"); setCalendarOpen(false); }}>Kembali ke hari ini</button></div>}
              </div>
              {!hasActivity ? <div className="rail-empty-state"><FifinAvatar small /><span>HIGHLIGHT PERTAMAMU</span><h3>Belum ada data keuangan.</h3><p>Mulai dari Check-up singkat agar Fifin dapat menyiapkan skor dan rekomendasi pertamamu.</p><button onClick={() => setPage("checkup")}>Mulai Check-up <Icon name="arrow" size={14} /></button></div> : <>
                <article className="rail-card score interactive-card" role="button" tabIndex={0} onClick={() => setPage("report")} onKeyDown={(event) => event.key === "Enter" && setPage("report")}><span>Skor kesehatan</span><div><div className="gradient-ring"><i>{activeReport.score}%</i></div><strong>{activeReport.score}<small>/100</small></strong></div><p>Buka rapor untuk melihat arti skor dan prioritasmu.</p></article>
                <article className="rail-card cashflow interactive-card" role="button" tabIndex={0} onClick={() => { setFinanceTab("overview"); setPage("finance"); }} onKeyDown={(event) => { if (event.key === "Enter") { setFinanceTab("overview"); setPage("finance"); } }}><span>Neraca bulan ini</span><strong>+ Rp 1.850.000</strong><div className="rail-trend-bars">{[52,68,44,76,61,83,70].map((height,index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="trend-labels"><small>6 Jun</small><small>12 Jun</small></div><p>Sisa dari seluruh pemasukan setelah pengeluaran Juni.</p></article>
                <article className="rail-card delayed interactive-card" role="button" tabIndex={0} onClick={() => setPage("waiting")} onKeyDown={(event) => event.key === "Enter" && setPage("waiting")}><span>Tunda Beli</span><strong>Headphone</strong><p>Rp 2.450.000 · 31 jam tersisa</p><div className="delay-impact"><span>Dampak ke dana darurat</span><b>18%</b><i><em /></i></div><button onClick={() => setPage("waiting")}>Lihat barang <Icon name="arrow" size={13} /></button></article>
                <button className="rail-checkup" onClick={() => setPage("checkup")}><span>Perbarui check-up</span><small>Agar rekomendasi Fifin mengikuti kondisi terbarumu.</small><Icon name="chevron" size={15} /></button>
              </>}
            </aside>
          </div>
        )}

        {page === "help" && (
          <div className="content feature-page help-page">
            <div className="feature-header"><div><span className="eyebrow">PUSAT BANTUAN FIFIN</span><h1>Ada yang ingin kamu tanyakan?</h1><p>Temukan jawaban singkat tentang pencatatan, Check-up, paket, dan privasi. Kalau belum ketemu, hubungi tim bantuan kami.</p></div><button className="secondary-button" onClick={() => setPage("home")}>Kembali ke Home</button></div>
            <div className="help-layout">
              <section className="help-topics">
                {[["sparkles","Cara mencatat transaksi","Ceritakan transaksi dengan bahasa sehari-hari atau pindai struk."],["chart","Memahami hasil Check-up","Pelajari arti skor, rasio cicilan, dan dana daruratmu."],["wallet","Tentang Fifin Pro","Lihat fitur, token chat, dan pilihan masa akses."],["shield","Privasi & keamanan","Pelajari cara Fifin memproses dan melindungi datamu."]].map(([icon,title,copy]) => <button key={title} onClick={() => title === "Tentang Fifin Pro" ? setOverlay("pro") : showToast(`${title} dibuka.`)}><span><Icon name={icon as IconName} size={18} /></span><div><strong>{title}</strong><small>{copy}</small></div><Icon name="chevron" size={16} /></button>)}
              </section>
              <aside className="help-contact"><FifinAvatar /><span className="eyebrow">MASIH BUTUH BANTUAN?</span><h2>Kami siap mendengarkan.</h2><p>Kirim pertanyaanmu ke tim bantuan. Balasan biasanya diterima dalam satu hari kerja.</p><a className="primary-button" href={`https://wa.me/6281290249743?text=${encodeURIComponent(`Halo Helpdesk Fifin, saya ${profile.name}${profile.email && profile.email !== "Mode demo" ? ` (${profile.email})` : ""}. Saya butuh bantuan tentang: `)}`} target="_blank" rel="noopener noreferrer" onClick={() => showToast("Membuka WhatsApp Helpdesk Fifin.")}>Hubungi Helpdesk <Icon name="arrow" size={15} /></a><small>Senin–Jumat · 09.00–17.00 WIB</small></aside>
            </div>
          </div>
        )}

        {page === "history" && (
          <div className="content feature-page history-page">
            <div className="feature-header"><div><span className="eyebrow">RIWAYAT AKTIVITAS</span><h1>Semua yang pernah kamu catat.</h1><p>Buka kembali transaksi, check-up, foto struk, dan keputusan Tunda Beli tanpa kehilangan konteks.</p></div><button className="secondary-button" onClick={() => setPage("home")}>Kembali ke Chat</button></div>
            {!hasActivity ? <div className="history-empty"><span><Icon name="clock" size={22} /></span><h2>Riwayatmu masih kosong.</h2><p>Transaksi, rapor Check-up, struk, dan keputusan Tunda Beli akan muncul di sini.</p><button className="primary-button" onClick={() => setPage("chat")}>Catat transaksi pertama <Icon name="arrow" size={15} /></button></div> : <div className="history-list">
              {[...(savedReport ? [["chart","Rapor Keuangan Juni",`${savedReport.score}/100 · Tersimpan hari ini`,"report"]] : []),["sparkles","Makan siang hari ini","Catat transaksi · Hari ini, 12:30","chat"],["chart","Draf Check-up Juni","Draf tersimpan · 2 hari lalu","checkup"],["scan","Struk Super Indo","Rp 284.500 · 10 Juni 2026","chat"],["clock","Headphone noise cancelling","Tunda Beli · 31 jam tersisa","waiting"]].map(([icon,title,meta,target]) => <button key={title} onClick={() => setPage(target)}><span><Icon name={icon as IconName} /></span><div><strong>{title}</strong><small>{meta}</small></div><Icon name="chevron" size={17} /></button>)}
            </div>}
          </div>
        )}

        {page === "highlights" && (
          <div className="content feature-page highlights-page">
            <div className="feature-header"><div><span className="eyebrow">HIGHLIGHT KEUANGANMU</span><h1>Ringkasan yang perlu kamu tahu hari ini.</h1><p>Empat angka penting dari transaksi, check-up, dan rencana keuanganmu.</p></div><div className="highlight-calendar-wrap"><button className="highlight-date" onClick={() => setHighlightCalendarOpen((open) => !open)} aria-expanded={highlightCalendarOpen}><Icon name="clock" size={16} /><span>{Number(selectedDate.split("-")[2])} Juni 2026</span><Icon name="chevron" size={13} /></button>{highlightCalendarOpen && <div className="calendar-popover highlight-calendar-popover"><div className="calendar-header"><button onClick={() => showToast("Belum ada ringkasan sebelum Juni 2026.")}><Icon name="chevron" size={14} /></button><strong>Juni 2026</strong><button onClick={() => showToast("Belum ada ringkasan setelah Juni 2026.")}><Icon name="chevron" size={14} /></button></div><div className="calendar-weekdays">{["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-days">{Array.from({ length: 30 }, (_, index) => index + 1).map((day) => <button key={day} className={Number(selectedDate.split("-")[2]) === day ? "selected" : ""} onClick={() => { setSelectedDate(`2026-06-${String(day).padStart(2,"0")}`); setHighlightCalendarOpen(false); showToast(`Ringkasan diperbarui ke ${day} Juni 2026.`); }}>{day}</button>)}</div><button className="calendar-today" onClick={() => { setSelectedDate("2026-06-12"); setHighlightCalendarOpen(false); }}>Kembali ke hari ini</button></div>}</div></div>
            <div className="highlight-grid">
              <article className="highlight-chart-card">
                <div className="chart-heading"><div><small>ARUS KAS JUNI</small><strong>Rp 8.500.000</strong><span>Saldo setelah seluruh transaksi</span></div><div className="chart-legend"><span><i className="income" /> Pemasukan</span><span><i className="expense" /> Pengeluaran</span></div></div>
                <svg className="cashflow-chart" viewBox="0 0 720 210" role="img" aria-label="Grafik pemasukan dan pengeluaran 20 sampai 26 Juni">
                  <defs><linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7566f5" stopOpacity=".22" /><stop offset="1" stopColor="#7566f5" stopOpacity="0" /></linearGradient></defs>
                  {[35,75,115,155].map((y) => <line key={y} x1="35" x2="700" y1={y} y2={y} className="chart-grid-line" />)}
                  <path className="income-area" d="M35 145 C90 110 135 98 185 122 S280 142 330 82 S430 53 485 90 S585 132 700 54 L700 190 L35 190 Z" />
                  <path className="income-line" d="M35 145 C90 110 135 98 185 122 S280 142 330 82 S430 53 485 90 S585 132 700 54" />
                  <path className="expense-line" d="M35 172 C105 154 140 132 195 150 S285 176 342 118 S420 105 480 130 S585 157 700 97" />
                  <circle cx="342" cy="118" r="5" className="chart-point expense" /><circle cx="330" cy="82" r="5" className="chart-point income" />
                  {["20 Jun","21 Jun","22 Jun","23 Jun","24 Jun","25 Jun","26 Jun"].map((label,index) => <text key={label} x={48 + index * 106} y="205">{label}</text>)}
                </svg>
              </article>
              <article><span className="section-3d-icon"><Icon name="chart" /></span><small>SKOR KESEHATAN</small><div className="highlight-score-row"><div className="gradient-ring large"><i>76%</i></div><strong>76 <small>/ 100</small></strong></div><p>Dana darurat cukup baik. Cicilan perlu tetap dijaga.</p><button onClick={() => setPage("checkup")}>Lihat check-up <Icon name="arrow" size={14} /></button></article>
              <article><span className="section-3d-icon"><Icon name="wallet" /></span><small>NERACA JUNI</small><strong>+ Rp 1.850.000</strong><div className="highlight-bars">{[50,66,43,78,60,88,72].map((height,index) => <i key={index} style={{ height: `${height}%` }} />)}</div><p>Pemasukan bulan ini masih lebih besar dari seluruh pengeluaran.</p><button onClick={() => { setFinanceTab("overview"); setPage("finance"); }}>Buka neraca <Icon name="arrow" size={14} /></button></article>
              <article><span className="section-3d-icon"><Icon name="clock" /></span><small>TUNDA BELI</small><strong>1 barang</strong><div className="gradient-meters"><span><b>Harga vs dana darurat</b><em>18%</em></span><i><b style={{ width: "18%" }} /></i><span><b>Waktu refleksi</b><em>65%</em></span><i className="pink"><b style={{ width: "65%" }} /></i></div><p>Headphone dapat kamu pertimbangkan lagi dalam 31 jam.</p><button onClick={() => setPage("waiting")}>Lihat barang <Icon name="arrow" size={14} /></button></article>
              <article><span className="section-3d-icon"><Icon name="sparkles" /></span><small>LANGKAH MINGGU INI</small><strong>Rp 100.000</strong><div className="saving-visual"><i><b style={{ width: "64%" }} /></i><span>64% dari target mingguan</span></div><p>Sisihkan ke dana darurat sebagai satu langkah kecil minggu ini.</p><button onClick={() => showToast("Langkah minggu ini ditambahkan ke pengingat.")}>Jadikan pengingat <Icon name="arrow" size={14} /></button></article>
            </div>
          </div>
        )}

        {page === "chat" && (
          <div className="content feature-page chat-page">
            <div className="chat-intro">
              <FifinAvatar />
              <div>
                <span className="eyebrow">{language === "EN" ? "MONEY LOG · TELL IT NATURALLY" : "CATAT KEUANGAN · CERITA SAJA"}</span>
                <h1>{language === "EN" ? "Log daily money in one message." : "Catat transaksi lewat satu cerita."}</h1>
                <p>{language === "EN" ? "Tell Fifin what happened—from lunch and transport to salary and debt payments. Amounts and categories are prepared for your review before anything is saved." : "Ceritakan pengeluaran harian, pemasukan, cicilan, atau beberapa transaksi sekaligus. Fifin menyiapkan nominal dan kategorinya untuk kamu cek sebelum disimpan."}</p>
                <div className="chat-benefits"><span><i><Icon name="check" size={12} /></i> Catat uang masuk & keluar</span><span><i><Icon name="check" size={12} /></i> Beberapa transaksi dalam satu pesan</span><span><i><Icon name="check" size={12} /></i> Tinjau sebelum disimpan</span></div>
              </div>
              <button className="quota" onClick={() => setOverlay("pro")} aria-label="Kelola token dan lihat paket Fifin Pro">
                <span className="quota-icon"><Icon name="sparkles" size={19} /></span>
                <span className="quota-details"><small>PAKET GRATIS</small><span className="quota-count"><strong>18</strong><span>dari 25</span></span><em>Kelola token & paket</em></span>
                <Icon name="chevron" size={15} />
              </button>
            </div>
            <div className="chat-window">
              <div className="chat-aurora" />
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.from}`}>
                    {message.from === "ai" && <FifinAvatar small />}
                    <div>{message.text}{message.from === "ai" && index > 0 && <span className="recorded"><Icon name="check" size={12} /> Dicatat</span>}</div>
                  </div>
                ))}
              </div>
              <div className="chat-bottom">
                <div className="suggestions">
                  {[["sparkles", "Pengeluaran sehari-hari"], ["wallet", "Catat pemasukan"], ["clock", "Beberapa transaksi"]].map(([icon, text]) => (
                    <button key={text} onClick={() => setChatInput(text)}><span><Icon name={icon as IconName} size={12} /></span>{text}</button>
                  ))}
                </div>
                <form className="composer" onSubmit={submitChat}>
                  <div className="composer-tools">
                    <button type="button" className="composer-icon" onClick={() => setOverlay("scan")} aria-label="Scan struk"><Icon name="scan" size={18} /></button>
                    <button type="button" className="composer-icon" onClick={() => showToast("Mikrofon siap. Ceritakan transaksimu.")} aria-label="Rekam suara"><Icon name="mic" size={18} /></button>
                  </div>
                  <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Contoh: tadi beli kopi 28rb..." aria-label="Pesan transaksi" />
                  <button type="submit" className="send-button" aria-label="Kirim"><Icon name="send" size={18} /></button>
                </form>
                <button className="enough-button" onClick={() => showToast(`${Math.max(0, messages.filter((item) => item.from === "user").length)} transaksi dirangkum. Sampai nanti.`)}>Cukup dulu</button>
              </div>
            </div>
          </div>
        )}

        {page === "checkup" && (
          <div className="content checkup-page">
            {!checkDone ? (
              <div className="checkup-workspace">
                <aside className="checkup-guide">
                  <button className="checkup-back" onClick={() => setPage("home")}><Icon name="arrow" size={16} /> Kembali</button>
                  <div className="checkup-guide-brand"><FifinAvatar mood={checkupReaction.mood} /><div><span className="eyebrow">CHECK-UP KEUANGAN</span><h1><span>Kenali angka dasarmu</span><br />bersama Fifin.</h1><p>14 pertanyaan singkat di 6 area keuangan. Sekitar 4 menit, hasilnya skor per area dan rencana 30 hari.</p></div></div>
                  
                  <div className="checkup-steps">{checkupAreas.map((area) => { const positions = area.ids.map((id) => checkupOrder.indexOf(id)); const first = Math.min(...positions); const last = Math.max(...positions); const doneCount = positions.filter((pos) => pos < checkStep).length; const state = checkStep > last ? "done" : checkStep >= first ? "active" : ""; return <span key={area.key} className={state} role="button" tabIndex={0} onClick={() => setCheckStep(first)} onKeyDown={(event) => event.key === "Enter" && setCheckStep(first)}><i>{state === "done" ? <Icon name="check" size={12} /> : checkupAreas.indexOf(area) + 1}</i><b>{area.label}</b><small>{state === "done" ? `${area.ids.length} jawaban tersimpan` : state === "active" ? `${doneCount + 1} dari ${area.ids.length} pertanyaan` : area.description}</small>{state === "done" && <u className="step-filled-check" aria-label="Sudah terisi"><Icon name="check" size={13} /></u>}</span>; })}</div>
                </aside>
                <section className="checkup-question">
                  <div className="question-top"><span>Pertanyaan {checkStep + 1} dari {checkupOrder.length} · {currentArea.label}</span><strong>{Math.round(((checkStep + 1) / checkupOrder.length) * 100)}% selesai</strong></div>
                  <div className="progress"><i style={{ width: `${((checkStep + 1) / checkupOrder.length) * 100}%` }} /></div>
                  <div className="question-copy">
                    <span className="eyebrow">{currentArea.label.toUpperCase()} · PERTANYAAN {checkStep + 1}</span>
                    <h2>{currentTitle}</h2>
                    <p className="question-helper"><Icon name="info" size={18} />{currentHelper}</p>
                  </div>
                  <div className="checkup-answer-card">
                    <div className="answer-card-heading"><span>Jawabanmu</span><small>{currentExtra || choiceSteps.includes(currentQid) ? "Pilih salah satu" : "Masukkan perkiraan nominal"}</small></div>
                    {currentExtra ? <div className="choice-answers extra-choices">{currentExtra.options.map(([label], index) => { const active = extraAnswers[currentQid - 6] === index; return <button key={label} className={active ? "active" : ""} onClick={() => setAnswer(index)}>{active && <Icon name="check" size={14} />}{label}</button>; })}</div> :                     choiceSteps.includes(currentQid) ? <div className="choice-answers">{[["Sudah", currentQid === 2 ? Math.max(answers[1] * 3, 1) : currentQid === 4 ? Math.max(Math.round(answers[0] * .1), 1) : 1], ["Belum", 0]].map(([label, value]) => { const active = answeredSteps[currentQid] && (label === "Sudah" ? answers[currentQid] > 0 : answers[currentQid] === 0); return <button key={label} className={active ? "active" : ""} onClick={() => setAnswer(value as number)}>{active && <Icon name="check" size={14} />}{label}</button>; })}</div> : <>
                    {currentQid === 0 && <div className="income-toggle"><button className={incomeType === "Tetap" ? "active" : ""} onClick={() => setIncomeType("Tetap")}>Pendapatan tetap</button><button className={incomeType === "Fluktuatif" ? "active" : ""} onClick={() => setIncomeType("Fluktuatif")}>Tidak tetap</button></div>}
                    <div className="amount-input"><span>{currentQid === 5 ? "Orang" : "Rp"}</span><input type="text" inputMode="numeric" placeholder="0" value={answeredSteps[currentQid] ? answers[currentQid].toLocaleString("id-ID") : ""} onChange={(event) => setAnswer(Math.min(1e13, Number(event.target.value.replace(/\D/g, "").slice(0, 14))))} aria-label={`Jawaban untuk ${questions[currentQid].title}`} autoFocus /></div>
                    <div className="preset-heading"><span>Sesuaikan jawaban</span><small>Kurangi atau tambah tanpa mengetik ulang</small></div>
                    <div className="amount-adjustments">
                      <div><span>Tambah</span><div>{(currentQid === 5 ? [1] : [100000,500000,1000000]).map((value) => <button key={value} onClick={() => setAnswer(answers[currentQid] + value)}>+ {currentQid === 5 ? value : value >= 1000000 ? `${value / 1000000}jt` : `${value / 1000}rb`}</button>)}</div></div>
                      <div><span>Kurangi</span><div>{(currentQid === 5 ? [1] : [100000,500000]).map((value) => <button key={value} disabled={!answers[currentQid]} onClick={() => setAnswer(Math.max(0, answers[currentQid] - value))}>− {currentQid === 5 ? value : `${value / 1000}rb`}</button>)}</div></div>
                    </div>
                    <button className={answeredSteps[currentQid] && answers[currentQid] === 0 ? "zero-answer active" : "zero-answer"} onClick={() => setAnswer(0)}><Icon name="check" size={13} />{"Tidak ada / isi Rp0"}</button>
                    </>}
                    {currentQid === 3 && answers[3] > answers[0] * 2 && <div className="gentle-warning">Cek lagi yuk, angkanya benar segini?</div>}
                  </div>
                  <div className="checkup-footer"><span className="autosave-note"><Icon name="check" size={13} /> Jawaban tersimpan otomatis</span><div className="question-actions"><button disabled={checkStep === 0} onClick={() => setCheckStep((step) => step - 1)}>Kembali</button><button className="primary-button" disabled={!currentAnswered} onClick={finishStep}>{checkStep === checkupOrder.length - 1 ? "Lihat hasil" : "Lanjut"} <Icon name="arrow" size={16} /></button></div></div>
                </section>
              </div>
            ) : (
              <div className="checkup-result-page">
                <div className="result-hero">
                  <FifinAvatar mood={resultMood} />
                  <div className={`result-status ${resultMood}`}><i />{resultLabel}</div>
                  <span className="eyebrow">CHECK-UP SELESAI</span>
                  <div className="result-score" style={{ background: `conic-gradient(#6e9bf3 0 ${checkupScore}%,#edf0f3 ${checkupScore}% 100%)` }}><div><strong>{checkupScore}</strong><span>dari 100</span></div></div>
                  <h1>{resultTitle}</h1><p>{resultDescription}</p>
                  <div className="result-hero-meta"><span className={`mood-chip ${areaTone(checkupScore)}`}>{moodCaption[resultMood]}</span>{previousScore !== null && <span className={`delta-chip ${checkupScore >= previousScore ? "up" : "down"}`}>{checkupScore >= previousScore ? "+" : ""}{checkupScore - previousScore} poin dari check-up sebelumnya</span>}</div>
                </div>
                <section className="score-meaning">
                  <div><span>ARTI SKORMU</span><strong>{checkupScore}/100 berarti kondisimu {resultLabel.toLowerCase()}.</strong><p>Skor dirangkum dari 6 area: arus kas, dana darurat, utang, tabungan & investasi, proteksi, serta tujuan. Ini bukan penilaian pribadi dan dapat berubah saat angkamu berubah.</p></div>
                  <div className="score-scale"><span className={checkupScore < 60 ? "active alert" : ""}><i />0–59<small>Perlu perhatian</small></span><span className={checkupScore >= 60 && checkupScore < 80 ? "active worried" : ""}><i />60–79<small>Cukup sehat</small></span><span className={checkupScore >= 80 ? "active happy" : ""}><i />80–100<small>Kondisi kuat</small></span></div>
                </section>
                <div className="result-metrics">
                  <article className={monthlyRemainder >= 0 ? "good" : "alert"}><span><Icon name="wallet" size={17} /></span><small>SISA ARUS KAS</small><strong>{formatRupiah(monthlyRemainder)}</strong><p>{monthlyRemainder >= 0 ? "Masih tersisa setelah pengeluaran, cicilan, dan tabungan." : "Pengeluaran dan alokasi saat ini melebihi pemasukan."}</p></article>
                  <article className={emergencyMonths >= 3 ? "good" : emergencyMonths >= 1 ? "watch" : "alert"}><span><Icon name="shield" size={17} /></span><small>DANA DARURAT</small><strong>{emergencyMonths.toFixed(1)} bulan</strong><p>{emergencyMonths >= 3 ? "Sudah mendekati rentang aman 3–6 bulan." : "Target awal yang disarankan adalah 3 bulan pengeluaran."}</p></article>
                  <article className={installmentRatio <= .3 ? "good" : installmentRatio <= .5 ? "watch" : "alert"}><span><Icon name="chart" size={17} /></span><small>RASIO CICILAN</small><strong>{Math.round(installmentRatio * 100)}%</strong><p>{installmentRatio <= .3 ? "Masih dalam batas nyaman, di bawah 30% pemasukan." : "Porsinya cukup besar dan perlu dijaga agar arus kas tetap lega."}</p></article>
                  <article className={savingRatio >= .1 ? "good" : "watch"}><span><Icon name="sparkles" size={17} /></span><small>RASIO TABUNGAN</small><strong>{Math.round(savingRatio * 100)}%</strong><p>{savingRatio >= .1 ? "Kebiasaan menabungmu sudah mulai terbentuk." : "Mulai dari nominal kecil yang bisa dijaga konsisten."}</p></article>
                </div>
                <div className="result-action"><span><Icon name="sparkles" /></span><div><small>PRIORITAS BERIKUTNYA</small><strong>{emergencyMonths < 3 ? "Bangun dana darurat hingga setara 3 bulan pengeluaran" : installmentRatio > .3 ? "Turunkan porsi cicilan secara bertahap" : "Pertahankan arus kas positif dan tabungan rutin"}</strong></div></div>
                {areaBreakdown(areaScores)}
                {actionPlanView}
                {recheckCard}
                <div className="result-buttons"><button className="secondary-button" onClick={() => { setPage("report"); showToast("Rapor Check-up tersimpan di Riwayat."); }}>Simpan & lihat rapor <Icon name="chart" size={15} /></button><button className="primary-button" onClick={() => { setPage("finance"); setFinanceTab("overview"); setCheckDone(false); setCheckStep(0); }}>Lihat Keuanganmu <Icon name="arrow" size={16} /></button></div>
              </div>
            )}
          </div>
        )}

        {page === "report" && (
          <div className="content feature-page report-page">
            {!savedReport ? <div className="report-empty"><FifinAvatar /><span className="eyebrow">BELUM ADA RAPOR TERSIMPAN</span><h1>Selesaikan Check-up pertamamu.</h1><p>Setelah selesai, skor, indikator, dan langkah berikutnya akan tersimpan di sini.</p><button className="primary-button" onClick={() => setPage("checkup")}>Mulai Check-up <Icon name="arrow" size={15} /></button></div> : <>
              {previewMode && <div className="report-preview-banner"><div><strong>Pratinjau rapor dari {sharedReport?.name || "pengguna Fifin"}</strong><span>Tampilan hanya-baca. Angka bisa berbeda dengan kondisimu.</span></div><button className="primary-button" onClick={exitPreview}>Buat rapormu sendiri <Icon name="arrow" size={14} /></button></div>}
              <div className="feature-header"><div><span className="eyebrow">RAPOR KEUANGAN · {new Date(checkupHistory[checkupHistory.length - 1]?.at ?? Date.now()).toLocaleDateString("id-ID", { month: "long", year: "numeric" }).toUpperCase()}</span><h1>Gambaran kondisi keuanganmu.</h1><p>Snapshot hasil Check-up terakhir, tersimpan agar kamu dapat membandingkan perubahan berikutnya.</p></div><div className="report-actions"><button className="report-share" aria-label="Bagikan rapor" title="Bagikan rapor" onClick={shareReport}><Icon name="send" size={18} /></button><button className="primary-button" onClick={() => { showToast("Membuka dialog cetak / simpan PDF."); window.setTimeout(() => window.print(), 300); }}>Unduh PDF <Icon name="arrow" size={14} /></button></div></div>
              <section className={`report-summary ${activeReport.score >= 75 ? "happy" : activeReport.score >= 50 ? "worried" : "alert"}`}><div className="report-avatar"><FifinAvatar mood={scoreMood(activeReport.score)} /><small>{moodCaption[scoreMood(activeReport.score)]}</small></div><div><span>{activeReport.label}</span><h2>{activeReport.title}</h2><p>{activeReport.description}</p></div><div className="report-score"><div><strong>{activeReport.score}</strong><small>/100</small></div>{previousScore !== null && <em className={activeReport.score >= previousScore ? "up" : "down"}>{activeReport.score >= previousScore ? "▲" : "▼"} {Math.abs(activeReport.score - previousScore)} poin</em>}</div></section>
              <div className="report-metrics"><article><small>SISA ARUS KAS</small><strong>{formatRupiah(activeReport.remainder)}</strong><p>Setelah pengeluaran, cicilan, dan tabungan.</p></article><article><small>DANA DARURAT</small><strong>{activeReport.emergencyMonths.toFixed(1)} bulan</strong><p>Target awal yang disarankan adalah 3 bulan.</p></article><article><small>RASIO CICILAN</small><strong>{Math.round(activeReport.installmentRatio * 100)}%</strong><p>Idealnya tetap di bawah 30% pemasukan.</p></article><article><small>RASIO TABUNGAN</small><strong>{Math.round(activeReport.savingRatio * 100)}%</strong><p>Diukur dari total pemasukan bulanan.</p></article></div>
              {areaBreakdown(activeReport.areas)}
              {!previewMode && actionPlanView}
              {!previewMode && <div className="report-bottom-grid">{recheckCard}<section className="score-history"><div className="area-breakdown-head"><span>RIWAYAT SKOR</span><h2>Perkembanganmu</h2></div>{checkupHistory.length ? <ul>{[...checkupHistory].reverse().slice(0, 5).map((entry, index) => <li key={entry.at}><small>{formatDate(entry.at)}{index === 0 ? " · terbaru" : ""}</small><i><em className={areaTone(entry.score)} style={{ width: `${entry.score}%` }} /></i><b>{entry.score}</b></li>)}</ul> : <p>Belum ada riwayat.</p>}</section></div>}
              <section className="report-details"><div><span>DASAR PERHITUNGAN</span><h2>Angka yang tersimpan di rapor ini</h2><p>Data berikut adalah jawaban saat Check-up diselesaikan, bukan angka yang berubah secara otomatis.</p></div><div className="report-detail-grid">{[["Pendapatan",formatRupiah(activeReport.answers[0])],["Pengeluaran",formatRupiah(activeReport.answers[1])],["Dana darurat",formatRupiah(activeReport.answers[2])],["Cicilan",formatRupiah(activeReport.answers[3])],["Tabungan",formatRupiah(activeReport.answers[4])],["Tanggungan",`${activeReport.answers[5]} orang`]].map(([label,value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div></section>
              <div className="report-history-note"><Icon name="clock" size={18} /><div><strong>Tersimpan di Riwayat</strong><p>Kamu dapat membuka kembali rapor ini kapan saja dari menu Riwayat atau Rapor Keuangan.</p></div></div>
            </>}
          </div>
        )}

        {page === "finance" && (
          <div className="content feature-page">
            <div className="finance-tabs">{[["overview","Neraca"],["plan","Rencanamu"],["worth","Asetmu"],["goals","Tujuanmu"],["protection","Perlindungan"]].map(([id,label]) => <button key={id} className={financeTab === id ? "active" : ""} onClick={() => setFinanceTab(id as typeof financeTab)}>{label}</button>)}</div>
            <div className="feature-header"><div><span className="eyebrow">KEUANGANMU · JUNI 2026</span><h1>{financeTab === "overview" ? "Berapa yang tersisa bulan ini?" : financeTab === "plan" ? "Rencana yang sesuai kemampuanmu." : financeTab === "worth" ? "Lihat posisi aset dan utangmu." : financeTab === "goals" ? "Tujuan besar dimulai dari angka kecil." : "Siapkan perlindungan untuk hal tak terduga."}</h1><p>{financeTab === "overview" ? "Neraca bulanan mengukur seluruh uang masuk dikurangi pengeluaran, cicilan, dan tabungan agar kamu tahu sisa riil bulan ini." : financeTab === "plan" ? "Susun alokasi pengeluaran, tabungan, dan cicilan berdasarkan hasil check-up terakhirmu." : financeTab === "worth" ? "Lihat seluruh aset yang kamu miliki serta utang yang masih berjalan dalam satu tampilan yang mudah dipahami." : financeTab === "goals" ? "Buat target, tentukan waktu, dan lihat setoran bulanan yang realistis untuk mencapainya." : "Petakan dana darurat dan proteksi dasar untuk menjaga rencana keuanganmu tetap berjalan."}</p></div></div>
            <div className="finance-purpose finance-callout"><span><Icon name="sparkles" size={18} /></span><div><strong>{financeTab === "overview" ? "Sisa bulan ini" : "Rekomendasi Fifin"}</strong><p>{financeTab === "overview" ? "Setelah semua catatan Juni dihitung, arus kasmu masih positif Rp 1.850.000." : "Lengkapi check-up agar perhitungan dan langkah berikutnya menyesuaikan kondisi riilmu."}</p></div><button className="finance-callout-button" onClick={() => financeTab === "overview" ? setPage("report") : setPage("checkup")}>{financeTab === "overview" ? "Lihat Rapor" : "Mulai Check-up"} <Icon name="arrow" size={15} /></button></div>
            <article className="finance-preview finance-callout">
              <div className="lock-orb"><Icon name="lock" /></div>
              <div><span>PRATINJAU FIFIN PRO</span><h3>Lihat gambaran asetmu</h3><p>Aset, utang, dan simulasi pelunasan dalam satu tempat.</p></div>
              <button className="finance-callout-button" onClick={() => setOverlay("pro")}>Coba pratinjau <Icon name="arrow" size={14} /></button>
            </article>
            <div className="finance-grid">
              <article className="balance-card">
                <div className="card-top"><span>Arus kas Juni</span><Icon name="wallet" /></div>
                <strong>+ Rp 1.850.000</strong><p>Pemasukan masih lebih besar dari pengeluaran.</p>
                <div className="bars"><span style={{ height: "66%" }} /><span style={{ height: "44%" }} /><span style={{ height: "78%" }} /><span style={{ height: "54%" }} /><span style={{ height: "82%" }} /><span className="current" style={{ height: "68%" }} /></div>
              </article>
              <article className="ratio-card"><span>Rasio QWP</span><div className="ratio-row"><b>Dana darurat</b><span>Aman</span></div><div className="ratio-meter"><i style={{ width: "72%" }} /></div><div className="ratio-row"><b>Cicilan</b><span>Terjaga</span></div><div className="ratio-meter violet"><i style={{ width: "58%" }} /></div><div className="ratio-row"><b>Tabungan</b><span>Mulai tumbuh</span></div><div className="ratio-meter green"><i style={{ width: "46%" }} /></div></article>
              <article className="transactions-card">
                <div className="card-top"><h3>Catatan terbaru</h3><button onClick={() => showToast("Semua transaksi bulan Juni sudah ditampilkan.")}>Lihat semua</button></div>
                {[["Makan siang", "Makanan", "- Rp 35.000"], ["Gaji bulanan", "Pemasukan", "+ Rp 8.500.000"], ["Transportasi", "Perjalanan", "- Rp 100.000"]].map((item, index) => <div className="transaction" key={item[0]}><span className={`transaction-icon t${index}`}><Icon name={index === 1 ? "wallet" : "arrow"} size={17} /></span><span><strong>{item[0]}</strong><small>{item[1]} · Hari ini</small></span><b className={index === 1 ? "positive" : ""}>{item[2]}</b></div>)}
              </article>
            </div>
          </div>
        )}

        {page === "waiting" && (
          <div className="content feature-page tb-page">
            <div className="feature-header"><div><span className="eyebrow">BELANJA DENGAN LEBIH SADAR</span><h1>Masih kepikiran barang itu?</h1><p>Simpan dulu di sini. Setelah jeda selesai, putuskan dengan kepala dingin—Fifin bantu hitung dampaknya.</p></div><button className="primary-button" onClick={() => setOverlay("delay")}><Icon name="plus" size={17} /> Tambah ke daftar</button></div>
            <div className="tb-stats">
              <article><small>SEDANG DITUNGGU</small><strong>{delayDecision ? "—" : formatRupiah(savedDelay.price)}</strong><p>{delayDecision ? "Tidak ada barang aktif" : savedDelay.name}</p></article>
              <article className="good"><small>BERHASIL DITAHAN</small><strong>{formatRupiah(delayLog.filter((e) => e.decision === "skip").reduce((sum, e) => sum + e.price, 0))}</strong><p>Uang yang tetap di kantongmu</p></article>
              <article><small>KEPUTUSAN SADAR</small><strong>{delayLog.length} keputusan</strong><p>{delayLog.filter((e) => e.decision === "skip").length} tidak jadi · {delayLog.filter((e) => e.decision === "buy").length} jadi beli</p></article>
            </div>
            {delayDecision ? <section className={`tb-decided ${delayDecision}`}>
              <FifinAvatar mood={delayDecision === "skip" ? "happy" : "neutral"} />
              <div><span className="eyebrow">{delayDecision === "skip" ? "KEPUTUSAN: TIDAK JADI BELI" : "KEPUTUSAN: JADI BELI"}</span><h2>{delayDecision === "skip" ? `${formatRupiah(savedDelay.price)} tetap aman.` : `Selamat menikmati ${savedDelay.name.toLowerCase()}.`}</h2><p>{delayDecision === "skip" ? "Uangnya bisa langsung kamu arahkan ke dana darurat atau tujuanmu." : "Kamu sudah menunggu dan memikirkannya dengan sadar. Fifin mencatatnya sebagai pengeluaran terencana."}</p>
                <div className="tb-actions"><button className="primary-button" onClick={() => { setDelayDecision(null); setDelayChecks(Array(6).fill(false)); setOverlay("delay"); }}><Icon name="plus" size={15} /> Tunda barang lain</button>{delayDecision === "skip" && <button className="secondary-button" onClick={() => { setFinanceTab("goals"); setPage("finance"); }}>Alihkan ke Tujuanmu</button>}</div></div>
            </section> : <>
              <section className="tb-active">
                <div className="tb-item">
                  <div className="tb-item-head"><span className="tb-icon"><Icon name="clock" size={20} /></span><div><span className="eyebrow">LAGI DITUNGGU</span><h2>{savedDelay.name}</h2></div><span className="tb-tag">{reflection}</span></div>
                  <strong className="tb-price">{formatRupiah(savedDelay.price)}</strong>
                  <div className="tb-impact"><div><span>{delayImpact.emergencyPct === null ? "Belum ada dana darurat—pertimbangkan lebih matang" : `${delayImpact.emergencyPct}% dari dana daruratmu`}</span><b className={(delayImpact.emergencyPct ?? 100) > 50 ? "alert" : (delayImpact.emergencyPct ?? 0) > 20 ? "watch" : "good"}>{(delayImpact.emergencyPct ?? 100) > 50 ? "Dampak besar" : (delayImpact.emergencyPct ?? 0) > 20 ? "Dampak sedang" : "Dampak kecil"}</b></div><i><em style={{ width: `${Math.min(100, delayImpact.emergencyPct ?? 100)}%` }} /></i></div>
                  <div className="tb-impact-grid"><div><small>Setara jam kerja</small><strong>{delayImpact.workHours} jam</strong></div><div><small>Biaya hidup</small><strong>{delayImpact.expenseDays} hari</strong></div><div><small>Dari penghasilan</small><strong>{delayImpact.incomePct}%</strong></div><div><small>Dari tabungan rutin</small><strong>{delayImpact.savingMonths === null ? "—" : `${delayImpact.savingMonths} bulan`}</strong></div></div>
                </div>
                <div className="tb-timer">
                  <span className="eyebrow">WAKTU REFLEKSI</span>
                  <div className="delay-ring" style={{ ["--p" as string]: `${delayProgress}%` }}><strong>{delayClock}</strong></div>
                  <small>{delayLeft > 0 ? `${delayProgress}% dari jeda ${durationLabel(delayDuration)}` : "Jeda selesai—saatnya memutuskan"}</small>
                  <div className="tb-decide"><button className="tb-skip" onClick={() => { setSavedTotal((t) => t + savedDelay.price); setDelayLog((l) => [{ name: savedDelay.name, price: savedDelay.price, decision: "skip", at: Date.now() }, ...l]); setDelayDecision("skip"); showToast(`${formatRupiah(savedDelay.price)} berhasil kamu tahan.`); }}>Tidak jadi beli</button><button className="tb-buy" onClick={() => { if (delayLeft > 0 && delayReadiness < 3) { showToast("Centang minimal 3 pertanyaan refleksi dulu, ya."); return; } setDelayLog((l) => [{ name: savedDelay.name, price: savedDelay.price, decision: "buy", at: Date.now() }, ...l]); setDelayDecision("buy"); showToast("Keputusan tersimpan di Riwayat."); }}>Jadi beli</button></div>
                  <div className="tb-timer-links"><button onClick={() => showToast("Pengingat tenang akan dikirim saat waktunya selesai.")}><Icon name="bell" size={14} /> Ingatkan</button><button onClick={() => { setDelayEndsAt((t) => t + 24 * 3600000); setDelayDuration((d) => d + 24); showToast("Waktu refleksi diperpanjang 24 jam."); }}><Icon name="plus" size={14} /> 24 jam</button></div>
                </div>
              </section>
              <div className="tb-columns">
                <section className="tb-panel">
                  <div className="tb-panel-head"><span className="eyebrow">TANYA DIRIMU DULU</span><h3>Centang yang benar-benar kamu rasakan</h3></div>
                  <div className="tb-checklist">{delayQuestions.map((q, i) => <button key={q} type="button" aria-pressed={delayChecks[i]} className={delayChecks[i] ? "active" : ""} onClick={() => setDelayChecks((c) => c.map((v, j) => j === i ? !v : v))}><span><Icon name="check" size={12} /></span>{q}</button>)}</div>
                  <div className={`tb-readiness ${delayReadiness >= 5 ? "good" : delayReadiness >= 3 ? "watch" : "alert"}`}><div><small>KESIAPAN MEMBELI</small><strong>{delayReadiness >= 5 ? "Terlihat siap" : delayReadiness >= 3 ? "Masih ragu" : "Belum siap"}</strong><b>{delayReadiness}/6</b></div><i>{[0,1,2,3,4,5].map((n) => <em key={n} className={n < delayReadiness ? "on" : ""} />)}</i><p>{delayReadiness >= 5 ? "Alasanmu kuat. Kalau jeda selesai dan masih ingin, beli dengan tenang." : delayReadiness >= 3 ? "Beberapa alasan belum terjawab. Tunggu sampai jeda selesai." : "Banyak alasan belum terpenuhi. Coba alternatif di samping dulu."}</p></div>
                </section>
                <section className="tb-panel">
                  <div className="tb-panel-head"><span className="eyebrow">ALTERNATIF</span><h3>Cara lain mendapatkannya</h3></div>
                  <div className="tb-alts">
                    <article><span><Icon name="wallet" size={17} /></span><div><b>Nabung bertahap</b><small>{formatRupiah(Math.ceil(savedDelay.price / 8 / 1000) * 1000)}/minggu selama 8 minggu, tanpa mengganggu dana darurat.</small></div></article>
                    <article><span><Icon name="sparkles" size={17} /></span><div><b>Cari bekas atau sewa</b><small>Potensi hemat sekitar {formatRupiah(Math.round(savedDelay.price * .35))}.</small></div></article>
                    <article><span><Icon name="clock" size={17} /></span><div><b>Tunggu momen promo</b><small>Pasang pengingat harga. Beli karena butuh, bukan karena FOMO.</small></div></article>
                  </div>
                </section>
              </div>
            </>}
            <section className="tb-panel tb-log"><div className="tb-panel-head"><span className="eyebrow">RIWAYAT KEPUTUSAN</span><h3>Keputusan yang sudah kamu ambil</h3></div>{delayLog.length ? <ul>{delayLog.map((entry) => <li key={entry.at}><span className={`tb-log-dot ${entry.decision}`} /><div><strong>{entry.name}</strong><small>{formatDate(entry.at)}</small></div><b>{formatRupiah(entry.price)}</b><em className={entry.decision}>{entry.decision === "skip" ? "Tidak jadi" : "Jadi beli"}</em></li>)}</ul> : <p className="tb-empty">Belum ada keputusan. Keputusan pertamamu akan muncul di sini.</p>}</section>
          </div>
        )}
        {page === "profile" && (
          <div className="content feature-page profile-page">
            <section className="profile-hero">
              <div className="profile-avatar-large">{profile.name.charAt(0).toUpperCase() || "B"}</div>
              <div><span className="eyebrow">PROFIL FIFIN</span><h1>{profile.name}</h1><p>Anggota sejak Juni 2026 · Paket Gratis</p></div>
              <div className="profile-actions"><button onClick={() => { if (profileEditing) { setProfileEditing(false); } else { setProfileDraft(profile); setProfileEditing(true); } }}>{profileEditing ? "Batal edit" : "Edit profil"}</button><button className="logout-button" onClick={() => { setSession(false); setProfileEditing(false); setOnboardingOpen(true); setIntroStage("chat"); setIntroMsgs([]); setAuthMode("choices"); setPage("home"); }}>Keluar</button></div>
            </section>
            <section className="profile-layout">
              <article className="profile-section account-section">
                <div className="profile-section-head"><span className="section-3d-icon"><Icon name="home" size={18} /></span><div><h2>Informasi pribadi</h2><p>Identitas yang digunakan Fifin saat berbicara denganmu.</p></div></div>
                {profileEditing ? <form className="profile-rows profile-edit" noValidate onSubmit={(e) => { e.preventDefault(); const nextName = profileDraft.name.trim(); const nextEmail = profileDraft.email.trim(); if (!nextName) { showToast("Nama panggilan belum diisi."); return; } if (nextEmail && nextEmail !== "Mode demo" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(nextEmail)) { showToast("Format email belum benar."); return; } const saved = { name: nextName, email: nextEmail || "Mode demo" }; setProfile(saved); setProfileDraft(saved); setAccounts((all) => ({ ...all, [accountId]: saved })); setProfileEditing(false); showToast("Profil berhasil diperbarui."); }}><label><span>Nama panggilan</span><input maxLength={40} required value={profileDraft.name} onChange={(e) => setProfileDraft((d) => ({ ...d, name: e.target.value }))} /></label><label><span>{profile.email === "Mode demo" ? "Email (opsional)" : "Email"}</span><input type="text" inputMode="email" autoComplete="email" placeholder="nama@email.com" required={profile.email !== "Mode demo"} value={profileDraft.email === "Mode demo" ? "" : profileDraft.email} onChange={(e) => setProfileDraft((d) => ({ ...d, email: e.target.value }))} /></label><button type="submit" className="primary-button">Simpan perubahan</button></form> : <div className="profile-rows"><div><span>Nama panggilan</span><strong>{profile.name}</strong></div><div><span>Email</span><strong>{profile.email}</strong></div><div><span>Bahasa</span><div className="language-toggle"><button className={language === "ID" ? "active" : ""} onClick={() => setLanguage("ID")}>ID</button><button className={language === "EN" ? "active" : ""} onClick={() => setLanguage("EN")}>EN</button></div></div><div><span>Tampilan</span><button className="profile-inline-button" onClick={() => setDarkMode((v) => !v)}>{darkMode ? "Mode gelap" : "Mode terang"}</button></div></div>}
              </article>
              <article className="profile-section plan-section">
                <div className="profile-section-head"><span className="section-3d-icon"><Icon name="sparkles" size={18} /></span><div><h2>Kelola paket</h2><p>Paket Gratis tetap menyimpan seluruh riwayatmu.</p></div></div>
                <div className="plan-current"><span><b>Gratis</b><small>18 dari 25 balasan chat tersedia</small></span><strong>Rp 0</strong></div>
                <div className="plan-progress"><i /></div><button className="profile-inline-button" onClick={() => setPage("history")}>Buka Riwayat <Icon name="chevron" size={13} /></button>
                <button className="primary-button" onClick={() => setOverlay("pro")}>Lihat Fifin Pro <Icon name="arrow" size={15} /></button>
              </article>
              <article className="profile-section security-section">
                <div className="profile-section-head"><span className="section-3d-icon"><Icon name="shield" size={18} /></span><div><h2>Privasi & keamanan</h2><p>Kontrol cara data finansialmu diproses.</p></div></div>
                <div className="security-list"><div><span><strong>Zero Photo Storage</strong><small>Foto struk dihapus setelah diproses.</small></span><b>Aktif</b></div><div><span><strong>Masking data sensitif</strong><small>Nomor kartu dan identitas disamarkan.</small></span><b>Aktif</b></div><button onClick={() => setOverlay("privacy")}><span><strong>Lihat semua pengaturan</strong><small>Unduh data dan tinjau kebijakan.</small></span><Icon name="chevron" size={16} /></button></div>
              </article>
              <article className="profile-section notification-preferences">
                <div className="profile-section-head"><span className="section-3d-icon"><Icon name="bell" size={18} /></span><div><h2>Notifikasi yang berguna</h2><p>Hanya pengingat yang membantumu mengambil tindakan—tanpa streak atau rasa bersalah.</p></div></div>
                <label><span><strong>Tunda Beli selesai</strong><small>Saat waktu refleksi 24–48 jam berakhir.</small></span><input type="checkbox" checked={notifPrefs[0]} onChange={() => { setNotifPrefs((p) => p.map((v, j) => j === 0 ? !v : v)); showToast(notifPrefs[0] ? "Tunda Beli selesai dimatikan." : "Tunda Beli selesai diaktifkan."); }} /></label>
                <label><span><strong>Draf check-up</strong><small>Sebelum draf kedaluwarsa setelah 7 hari.</small></span><input type="checkbox" checked={notifPrefs[1]} onChange={() => { setNotifPrefs((p) => p.map((v, j) => j === 1 ? !v : v)); showToast(notifPrefs[1] ? "Draf check-up dimatikan." : "Draf check-up diaktifkan."); }} /></label>
                <label><span><strong>Ringkasan mingguan</strong><small>Satu insight singkat, maksimal sekali seminggu.</small></span><input type="checkbox" checked={notifPrefs[2]} onChange={() => { setNotifPrefs((p) => p.map((v, j) => j === 2 ? !v : v)); showToast(notifPrefs[2] ? "Ringkasan mingguan dimatikan." : "Ringkasan mingguan diaktifkan."); }} /></label>
              </article>
            </section>
          </div>
        )}
      </main>

      {mobileMenuOpen && <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />}
      <nav className={mobileMenuOpen ? "mobile-drawer open" : "mobile-drawer"} aria-label="Navigasi seluler" aria-hidden={!mobileMenuOpen}>
        <div className="mobile-drawer-head"><span className="brand"><FifinAvatar small mood="happy" /><span>Fifin</span></span><button onClick={() => setMobileMenuOpen(false)} aria-label={language === "EN" ? "Close menu" : "Tutup menu"}><Icon name="close" size={18} /></button></div>
        <div className="mobile-drawer-links">{nav.map((item) => <button key={item.id} tabIndex={mobileMenuOpen ? 0 : -1} className={isNavActive(item.id) ? "active" : ""} onClick={() => { navigate(item.id); setMobileMenuOpen(false); }}><i><Icon name={item.icon} size={17} /></i><span><b>{language === "EN" ? englishNav[item.id] : item.label}</b><small>{item.description}</small></span></button>)}</div>
        <div className="mobile-drawer-foot">
          <button tabIndex={mobileMenuOpen ? 0 : -1} className="mobile-drawer-profile" onClick={() => { setPage("profile"); setMobileMenuOpen(false); }}><span className="top-avatar">{(profile.name.trim()[0] || "F").toUpperCase()}</span><span><b>{profile.name || "Kamu"}</b><small>{profile.email}</small></span><Icon name="chevron" size={14} /></button>
          <div className="mobile-drawer-settings"><div className="language-toggle"><button tabIndex={mobileMenuOpen ? 0 : -1} className={language === "ID" ? "active" : ""} aria-pressed={language === "ID"} onClick={() => setLanguage("ID")}>ID</button><button tabIndex={mobileMenuOpen ? 0 : -1} className={language === "EN" ? "active" : ""} aria-pressed={language === "EN"} onClick={() => setLanguage("EN")}>EN</button></div><button tabIndex={mobileMenuOpen ? 0 : -1} className="theme-icon-button" aria-pressed={darkMode} onClick={() => setDarkMode((v) => !v)} aria-label={darkMode ? "Gunakan mode terang" : "Gunakan mode gelap"}><Icon name={darkMode ? "moon" : "sun"} size={18} /></button></div>
        </div>
      </nav>

      <aside className={assistantOpen ? "assistant-panel open" : "assistant-panel"} aria-label="Bantuan Fifin">
        <div className="assistant-head">
          <div><FifinAvatar small /><span><strong>Fifin</strong><small>Asisten finansialmu</small></span></div>
          <button onClick={() => setAssistantOpen(false)} aria-label="Tutup bantuan"><Icon name="close" size={18} /></button>
        </div>
        <div className="assistant-body">
          <div className="assistant-greeting"><FifinAvatar /><h3>Hai, aku Fifin.</h3><p>Gerakkan cursor ke kanan–kiri dengan cepat kapan saja untuk memanggilku.</p></div>
          <div className="assistant-dialog"><span><Icon name="sparkles" size={15} /></span><div><strong>Apa yang ingin kamu lakukan?</strong><small>Pilih salah satu, nanti aku antar ke halaman yang tepat.</small></div></div>
          <div className="assistant-options">
            <button onClick={() => { setAssistantOpen(false); setPage("chat"); setChatInput("Bantu aku mencatat transaksi hari ini"); }}><span><Icon name="sparkles" /></span><b>Catat transaksi</b><Icon name="chevron" size={16} /></button>
            <button onClick={() => { setAssistantOpen(false); setPage("checkup"); }}><span><Icon name="chart" /></span><b>Cek kondisi keuangan</b><Icon name="chevron" size={16} /></button>
            <button onClick={() => { setAssistantOpen(false); setPage("report"); }}><span><Icon name="chart" /></span><b>Lihat rapor terakhir</b><Icon name="chevron" size={16} /></button>
            <button onClick={() => { setAssistantOpen(false); setPage("waiting"); }}><span><Icon name="clock" /></span><b>Pikirkan sebelum beli</b><Icon name="chevron" size={16} /></button>
            <button onClick={() => { setAssistantOpen(false); setPage("help"); }}><span><Icon name="info" /></span><b>Buka pusat bantuan</b><Icon name="chevron" size={16} /></button>
          </div>
          <button className="assistant-chat-cta" onClick={() => { setAssistantOpen(false); setPage("chat"); }}>Mulai ngobrol dengan Fifin <Icon name="arrow" size={16} /></button>
          <small>Fifin memberi edukasi, bukan nasihat keuangan profesional.</small>
        </div>
      </aside>
      <button className={assistantOpen ? "assistant-fab active" : "assistant-fab"} onClick={() => setAssistantOpen((open) => !open)} aria-label="Buka bantuan Fifin">
        <FifinAvatar small />
      </button>

      {overlay && (
        <div className="overlay" role="dialog" aria-modal="true">
          <button className="overlay-backdrop" onClick={closeOverlay} aria-label="Tutup dialog" />
          <div className={overlay === "pro" ? "modal pro-details-modal" : "modal"}>
            <button className="modal-close" onClick={closeOverlay} aria-label="Tutup"><Icon name="close" /></button>
            {overlay === "checkup" && !checkDone && (
              <div className="checkup-modal">
                <div className="modal-orb" />
                <span className="eyebrow">CHECK-UP · LANGKAH {checkStep + 1} DARI 6</span>
                <div className="progress"><i style={{ width: `${((checkStep + 1) / 6) * 100}%` }} /></div>
                {checkStep === 0 && <div className="income-toggle"><button className={incomeType === "Tetap" ? "active" : ""} onClick={() => setIncomeType("Tetap")}>Pendapatan tetap</button><button className={incomeType === "Fluktuatif" ? "active" : ""} onClick={() => setIncomeType("Fluktuatif")}>Tidak tetap</button></div>}
                <h2>{questions[checkStep].title}</h2>
                <p className="modal-helper"><Icon name="info" size={16} /> {questions[checkStep].helper}</p>
                <div className="amount-input">
                  <span>{checkStep === 5 ? "Jumlah" : "Rp"}</span>
                  <input type="number" value={answeredSteps[checkStep] ? answers[checkStep] : ""} onChange={(event) => setAnswer(Math.max(0, Math.min(1e13, Number(event.target.value) || 0)))} min={0} aria-label="Nominal jawaban" autoFocus />
                </div>
                <div className="presets">{questions[checkStep].presets.map((value) => <button key={value} onClick={() => setAnswer(answers[checkStep] + value)}>+{checkStep === 5 ? value : value >= 1000000 ? `${value / 1000000}jt` : `${value / 1000}rb`}</button>)}</div>
                <button className={answeredSteps[checkStep] && answers[checkStep] === 0 ? "zero-answer active" : "zero-answer"} onClick={() => setAnswer(0)}><Icon name="check" size={13} />{checkStep === 5 ? "Tidak ada tanggungan" : "Tidak ada / isi Rp0"}</button>
                {checkStep === 3 && answers[3] > answers[0] * 2 && <div className="gentle-warning">Cek lagi yuk, angkanya benar segini?</div>}
                <div className="modal-actions"><button className="back-button" disabled={checkStep === 0} onClick={() => setCheckStep((step) => step - 1)}>Kembali</button><button className="primary-button" disabled={!answeredSteps[checkStep]} onClick={finishStep}>{checkStep === 5 ? "Lihat hasil" : "Lanjut"} <Icon name="arrow" size={17} /></button></div>
                <small className="legal-note">Jawaban tersimpan otomatis di perangkat ini.</small>
              </div>
            )}
            {overlay === "checkup" && checkDone && (
              <div className="result-modal">
                <div className="result-score"><div><strong>76</strong><span>dari 100</span></div></div>
                <span className="eyebrow">CHECK-UP SELESAI</span><h2>Fondasinya sudah ada.</h2><p>Dana daruratmu cukup baik. Fokus kecil berikutnya: jaga porsi cicilan tetap nyaman.</p>
                <div className="result-action"><span><Icon name="sparkles" /></span><div><small>LANGKAH MINGGU INI</small><strong>Sisihkan Rp 100.000 ke dana darurat</strong></div></div>
                <button className="primary-button wide" onClick={() => { closeOverlay(); showToast("Hasil check-up sudah diperbarui."); }}>Simpan hasil</button>
                <small className="disclaimer">Fifin adalah alat bantu edukasi, bukan penasihat keuangan bersertifikat.</small>
              </div>
            )}
            {overlay === "scan" && (
              <div className="scan-modal">
                {!receiptReady ? <>
                  <div className="scan-visual"><span><Icon name="camera" size={34} /></span><div className="scan-line" /></div>
                  <span className="eyebrow">SCAN STRUK</span><h2>Foto struknya, aku bantu catat.</h2><p>Pastikan struk terlihat jelas. Setelah totalnya terbaca, fotomu langsung dihapus.</p>
                  <button className="primary-button wide" onClick={() => setReceiptReady(true)}><Icon name="camera" size={18} /> Pilih atau ambil foto</button>
                  <div className="privacy-note"><Icon name="shield" size={18} /><span><strong>Zero Photo Storage</strong> Foto tidak pernah disimpan di server.</span></div>
                </> : <>
                  <div className="receipt-success"><Icon name="check" size={26} /></div><span className="eyebrow">HASIL PEMINDAIAN</span><h2>Cek sebentar sebelum dicatat.</h2>
                  <div className="receipt-card"><div><span>Merchant</span><strong>Super Indo</strong></div><div><span>Tanggal</span><strong>12 Juni 2025</strong></div><label><span>Total belanja</span><input defaultValue="284.500" /></label><div><span>Kategori</span><button onClick={() => setReceiptCategory((category) => category === "Kebutuhan harian" ? "Makanan" : category === "Makanan" ? "Belanja rumah" : "Kebutuhan harian")}>{receiptCategory} <Icon name="chevron" size={14} /></button></div></div>
                  <label className="split-toggle"><span><strong>Patungan / Split bill</strong><small>Bagi total dengan teman</small></span><input type="checkbox" /></label>
                  <button className="primary-button wide" onClick={() => { setHasActivity(true); closeOverlay(); showToast("Struk dicatat. Fotonya sudah dihapus permanen."); }}>Catat pengeluaran</button>
                </>}
              </div>
            )}
            {overlay === "delay" && (
              <form className="delay-modal" onSubmit={(event) => { event.preventDefault(); const hours = recommendDuration(Number(delayPrice) || 0); setSavedDelay({ name: delayName || "Barang impian", price: Number(delayPrice) || 0 }); setDelayDuration(hours); setDelayEndsAt(Date.now() + hours * 3600000); setDelayDecision(null); setDelayChecks(Array(6).fill(false)); setHasActivity(true); closeOverlay(); setPage("waiting"); showToast(`Timer ${durationLabel(recommendDuration(Number(delayPrice) || 0))} dimulai dengan tenang.`); }}>
                <div className="modal-orb pink" /><span className="eyebrow">TUNDA BELI</span><h2>Simpan dulu, putuskan nanti.</h2><p>Masukkan barang dan harganya. Aku bantu lihat dampaknya tanpa menghakimi keputusanmu.</p>
                <label><span>Nama barang</span><input value={delayName} onChange={(e) => setDelayName(e.target.value)} placeholder="Contoh: Sepatu lari baru" required /></label>
                <div className="delay-history"><span>Pernah kamu isi</span><div>{[savedDelay.name,"Sepatu lari","Kursi kerja"].map((item) => <button type="button" key={item} onClick={() => setDelayName(item)}>{item}</button>)}</div></div>
                <label><span>Harga</span><div className="currency-field delay-price-field"><span>Rp</span><input type="text" inputMode="numeric" value={delayPrice ? Number(delayPrice).toLocaleString("id-ID") : ""} onChange={(e) => setDelayPrice(e.target.value.replace(/\D/g,""))} placeholder="0" required /></div></label>
                <div className="amount-adjustments delay-price-adjustments">
                  <div><span>Tambah</span><div>{[100000,500000,1000000].map((value) => <button type="button" key={value} onClick={() => setDelayPrice(String((Number(delayPrice) || 0) + value))}>+ {value >= 1000000 ? `${value / 1000000}jt` : `${value / 1000}rb`}</button>)}</div></div>
                  <div><span>Kurangi</span><div>{[100000,500000].map((value) => <button type="button" key={value} disabled={!Number(delayPrice)} onClick={() => setDelayPrice(String(Math.max(0,(Number(delayPrice) || 0) - value)))}>− {value / 1000}rb</button>)}</div></div>
                </div>
                <div className="reflection"><span>Apa yang paling terasa?</span><div>{["Keinginan sesaat", "Reward", "Kebutuhan"].map((item) => <button className={reflection === item ? "active" : ""} onClick={() => setReflection(item)} type="button" key={item}>{item}</button>)}</div></div>
                {Number(delayPrice) > 0 && <div className="delay-preview"><Icon name="info" size={15} /><span>Setara <b>{Math.round(Number(delayPrice) / hourlyIncome)} jam kerja</b> dan <b>{Math.round((Number(delayPrice) / Math.max(income, 1)) * 100)}%</b> penghasilanmu. Fifin sarankan jeda <b>{durationLabel(recommendDuration(Number(delayPrice)))}</b>.</span></div>}
                <button className="primary-button wide" type="submit">Mulai jeda {durationLabel(recommendDuration(Number(delayPrice) || 0))} <Icon name="arrow" size={17} /></button>
              </form>
            )}
            {overlay === "pro" && (
              <div className="pro-modal">
                <header className="pro-details-header">
                  <FifinAvatar />
                  <div><span className="eyebrow">FIFIN PRO</span><h2>Kenali posisi asetmu dengan lebih utuh.</h2><p>Fifin Pro melihat total aset, sisa utang, dan aset yang sedang bertumbuh—bukan hanya cicilan bulanan.</p></div>
                  <div className="pro-token-summary"><span><Icon name="sparkles" size={17} /></span><div><small>SISA TOKEN CHAT</small><strong>18 <i>/ 25</i></strong><p>Diperbarui setiap awal bulan</p></div></div>
                </header>
                <div className="pro-content-grid">
                  <section className="pro-includes">
                    <div className="pro-section-heading"><div><h3>Yang kamu dapatkan</h3><p>Tiga jawaban tambahan, cukup diisi sekali.</p></div><span>PRO</span></div>
                    <div className="pro-benefits">
                      <span><Icon name="check" size={15} /> Nilai asetmu setelah dikurangi seluruh sisa utang.</span>
                      <span><Icon name="check" size={15} /> Perbandingan sisa utang dengan total aset.</span>
                      <span><Icon name="check" size={15} /> Porsi aset yang tersimpan dan yang aktif bertumbuh.</span>
                    </div>
                    <p className="pro-context-note"><Icon name="info" size={16} /> Cicilan bulanan yang terasa aman belum tentu menggambarkan total utang. Fifin melihat sisa pokok agar kondisimu terbaca lebih lengkap.</p>
                  </section>
                </div>
                <section className="pro-pricing">
                  <div className="pro-pricing-heading"><div><h3>Pilih masa akses</h3><p>Sekali bayar sesuai durasi. Tidak diperpanjang otomatis.</p></div><span>Harga transparan</span></div>
                  <div className="pricing-grid">
                    <article className={proPlan === "monthly" ? "selected" : ""}><span>1 bulan</span><div className="plan-price"><strong>Rp45.000</strong><small>/bulan</small></div><p>Akses Pro selama 1 bulan.</p><button onClick={() => { setProPlan("monthly"); openProWhatsApp("1 bulan", "Rp45.000"); }}>Pilih 1 bulan</button></article>
                    <article className={proPlan === "quarterly" ? "selected recommended" : ""}><div className="plan-name"><span>3 bulan</span><b>Rekomendasi</b></div><div className="plan-price"><strong>Rp33.000</strong><small>/bulan</small></div><p>Sekali bayar Rp99.000.</p><em>Hemat Rp36.000</em><button onClick={() => { setProPlan("quarterly"); openProWhatsApp("3 bulan", "Rp99.000"); }}>Pilih 3 bulan</button></article>
                    <article className={proPlan === "annual" ? "selected" : ""}><span>12 bulan</span><div className="plan-price"><strong>Rp27.417</strong><small>/bulan</small></div><p>Sekali bayar Rp329.000.</p><em>Hemat Rp211.000</em><button onClick={() => { setProPlan("annual"); openProWhatsApp("12 bulan", "Rp329.000"); }}>Pilih 12 bulan</button></article>
                  </div>
                </section>
                <small className="disclaimer">Harga sudah termasuk seluruh fitur Pro. Tidak ada auto-debit atau biaya tersembunyi.</small>
              </div>
            )}
            {overlay === "share" && savedReport && (
              <div className="share-modal">
                <span className="eyebrow">KIRIM RAPOR</span>
                <h2>Bagikan rapor keuanganmu.</h2>
                <p>Penerima melihat pratinjau hanya-baca. Mereka tidak bisa mengubah datamu.</p>
                <div className={`share-preview ${areaTone(savedReport.score)}`}><FifinAvatar small mood={scoreMood(savedReport.score)} /><div><small>Rapor Keuangan · {profile.name}</small><strong>{savedReport.label}</strong></div><b>{savedReport.score}<i>/100</i></b></div>
                <label className="share-link"><span>Tautan pratinjau</span><div><input readOnly value={reportShareUrl} onFocus={(e) => e.currentTarget.select()} aria-label="Tautan pratinjau rapor" /><button type="button" onClick={copyShareLink}>Salin</button></div></label>
                <div className="share-actions">
                  <a className="primary-button" href={reportShareUrl} target="_blank" rel="noopener noreferrer" onClick={() => showToast("Pratinjau link rapor dibuka di tab baru.")}><Icon name="send" size={15} /> Buka pratinjau link</a>
                  <button type="button" className="secondary-button" onClick={() => { closeOverlay(); showToast("Membuka pratinjau PDF. Pilih \"Simpan sebagai PDF\"."); window.setTimeout(() => window.print(), 350); }}><Icon name="chart" size={15} /> Pratinjau PDF</button>
                </div>
                {typeof navigator.share === "function" && <button type="button" className="share-native" onClick={() => navigator.share({ title: "Rapor Keuangan Fifin", text: `Rapor keuanganku: ${savedReport.score}/100`, url: reportShareUrl }).catch(() => undefined)}>Kirim lewat aplikasi lain</button>}
              </div>
            )}
            {overlay === "privacy" && (
              <div className="settings-modal privacy-modal">
                <div className="privacy-shield"><Icon name="shield" size={28} /></div>
                <span className="eyebrow">PRIVASI & KEAMANAN</span><h2>Data keuanganmu tetap milikmu.</h2><p>Di sini kamu mengatur bagaimana Fifin memproses dan menyimpan data pencatatan.</p>
                <div className="privacy-options"><div><span><strong>Zero Photo Storage</strong><small>Foto struk langsung dihapus setelah diproses.</small></span><b>Aktif</b></div><div><span><strong>Masking data sensitif</strong><small>Nomor kartu dan identitas disamarkan otomatis.</small></span><b>Aktif</b></div><button onClick={() => { const blob = new Blob([JSON.stringify({ profile, answers, answeredSteps, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "fifin-data.json"; a.click(); URL.revokeObjectURL(a.href); showToast("Data kamu sudah diunduh."); }}><span><strong>Unduh dataku</strong><small>Salinan transaksi dan riwayat percakapan.</small></span><Icon name="chevron" size={16} /></button></div>
                <button className="primary-button wide" onClick={closeOverlay}>Selesai</button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={cursor.visible ? "vivin-cursor visible" : "vivin-cursor"} style={{ transform: `translate3d(${cursor.x + 12}px, ${cursor.y + 12}px, 0)` }}><FifinAvatar small /></div>
      {toast && <div className="toast"><Icon name="check" size={17} />{toast}</div>}
    </div>
  );
}

export default App;
