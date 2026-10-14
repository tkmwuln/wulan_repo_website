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
  | "globe";

const paths: Record<IconName, React.ReactNode> = {
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

type FifinMood = "neutral" | "happy" | "worried" | "alert";

function FifinAvatar({ small = false, mood = "neutral" }: { small?: boolean; mood?: FifinMood }) {
  return (
    <span className={`${small ? "fifi-avatar small" : "fifi-avatar"} mood-${mood}`} aria-hidden="true">
      <span className="bird-tail"><i /><i /><i /></span>
      <span className="bird-wing left" />
      <span className="bird-wing right" />
      <span className="fifi-antenna" />
      <span className="fifi-face">
        <i /><i /><b />
      </span>
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
};

const indonesianCopy = Object.fromEntries(Object.entries(bilingualCopy).map(([id, en]) => [en, id]));

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

function App() {
  const [onboardingOpen, setOnboardingOpen] = useState(true);
  const [googlePickerOpen, setGooglePickerOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"choices" | "email">("choices");
  const [authEmail, setAuthEmail] = useState("");
  const [hasActivity, setHasActivity] = useState(false);
  const [page, setPage] = useState("home");
  const [overlay, setOverlay] = useState<"checkup" | "scan" | "delay" | "pro" | "privacy" | null>(null);
  const [checkStep, setCheckStep] = useState(0);
  const [checkDone, setCheckDone] = useState(false);
  const [answers, setAnswers] = useState<number[]>([1500000, 0, 0, 0, 0, 1]);
  const [answeredSteps, setAnsweredSteps] = useState<boolean[]>([true, false, false, false, false, false]);
  const [savedReport, setSavedReport] = useState<null | { score: number; mood: FifinMood; label: string; title: string; description: string; remainder: number; emergencyMonths: number; installmentRatio: number; savingRatio: number; answers: number[]; incomeType: string }>(null);
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
  const [delayEndsAt, setDelayEndsAt] = useState(() => Date.now() + (31 * 3600 + 24 * 60 + 18) * 1000);
  const [nowTick, setNowTick] = useState(() => Date.now());
  const [delayDecision, setDelayDecision] = useState<null | "buy" | "skip">(null);
  const [delayChecks, setDelayChecks] = useState<boolean[]>([false, false, false]);
  const [savedTotal, setSavedTotal] = useState(0);
  const [profileEditing, setProfileEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "Bulan", email: "bulan@example.com" });
  const [profileDraft, setProfileDraft] = useState({ name: "Bulan", email: "bulan@example.com" });
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
    const dictionary = language === "EN" ? bilingualCopy : indonesianCopy;
    const translateValue = (value: string) => dictionary[value.trim()] ? value.replace(value.trim(), dictionary[value.trim()]) : value;
    // Remember what we wrote so our own writes never re-trigger translation (prevents observer loops).
    const written = new WeakMap<Node, string>();
    const translateTree = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim() && written.get(node) !== node.nodeValue) {
        const next = translateValue(node.nodeValue);
        if (next !== node.nodeValue) node.nodeValue = next;
        written.set(node, next);
      }
      if (node instanceof HTMLElement) {
        ["placeholder","title","aria-label"].forEach((attribute) => {
          const value = node.getAttribute(attribute);
          if (!value) return;
          const next = translateValue(value);
          if (next !== value) node.setAttribute(attribute, next);
        });
      }
      node.childNodes.forEach(translateTree);
    };
    translateTree(root);
    const observer = new MutationObserver((records) => records.forEach((record) => {
      if (record.type === "characterData") translateTree(record.target);
      record.addedNodes.forEach(translateTree);
    }));
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);

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
    setAnswers((old) => old.map((item, index) => (index === checkStep ? value : item)));
    setAnsweredSteps((old) => old.map((item, index) => (index === checkStep ? true : item)));
  };

  const finishStep = () => {
    if (checkStep < 5) setCheckStep((step) => step + 1);
    else {
      setCheckDone(true);
      setHasActivity(true);
      setSavedReport({ score: checkupScore, mood: resultMood, label: resultLabel, title: resultTitle, description: resultDescription, remainder: monthlyRemainder, emergencyMonths, installmentRatio, savingRatio, answers: [...answers], incomeType });
    }
  };

  const closeOverlay = () => {
    setOverlay(null);
    setCheckDone(false);
    setCheckStep(0);
    setReceiptReady(false);
  };

  useEffect(() => { const id = window.setInterval(() => setNowTick(Date.now()), 1000); return () => window.clearInterval(id); }, []);
  const delayTotal = 48 * 3600 * 1000;
  const delayLeft = Math.max(0, delayEndsAt - nowTick);
  const delayProgress = Math.min(100, Math.round(((delayTotal - delayLeft) / delayTotal) * 100));
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const delayClock = `${pad2(Math.floor(delayLeft / 3600000))} : ${pad2(Math.floor(delayLeft / 60000) % 60)} : ${pad2(Math.floor(delayLeft / 1000) % 60)}`;
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
  const checkupScore = Math.max(0, Math.min(100, Math.round(cashflowPoints + emergencyPoints + installmentPoints + savingPoints)));
  const resultMood: FifinMood = checkupScore >= 80 ? "happy" : checkupScore >= 60 ? "worried" : "alert";
  const resultLabel = checkupScore >= 80 ? "Kondisi kuat" : checkupScore >= 60 ? "Cukup sehat" : "Perlu perhatian";
  const resultTitle = checkupScore >= 80 ? "Fondasi keuanganmu sudah kuat." : checkupScore >= 60 ? "Fondasi keuanganmu sudah ada." : "Kita sudah menemukan area prioritasmu.";
  const resultDescription = checkupScore >= 80 ? "Arus kas, cicilan, dan kebiasaan menabungmu berada di jalur yang baik. Pertahankan sambil memperkuat perlindungan." : checkupScore >= 60 ? "Beberapa bagian sudah berjalan baik, tetapi masih ada ruang untuk memperkuat dana darurat atau menjaga porsi cicilan." : "Skor ini bukan nilai buruk. Artinya, ada beberapa area yang sebaiknya dibereskan lebih dulu agar keuanganmu terasa lebih lega.";
  const checkupReaction = getCheckupReaction(checkStep, answers, answeredSteps[checkStep]);
  const activeReport = savedReport ?? { score: checkupScore, mood: resultMood, label: resultLabel, title: resultTitle, description: resultDescription, remainder: monthlyRemainder, emergencyMonths, installmentRatio, savingRatio, answers, incomeType };
  return (
    <div className={`${darkMode ? "app-shell dark" : "app-shell"}${onboardingOpen ? " onboarding-active" : ""}`}>
      {onboardingOpen && <div className="onboarding-screen">
        <div className="onboarding-utilities"><div className="language-toggle" aria-label="Pilihan bahasa onboarding"><button aria-pressed={language === "ID"} className={language === "ID" ? "active" : ""} onClick={() => setLanguage("ID")}>ID</button><button aria-pressed={language === "EN"} className={language === "EN" ? "active" : ""} onClick={() => setLanguage("EN")}>EN</button></div><button className="theme-icon-button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Gunakan mode terang" : "Gunakan mode gelap"}><Icon name={darkMode ? "moon" : "sun"} size={18} /></button></div>
        <section className="onboarding-story">
          <div className="onboarding-brand"><FifinAvatar /><span><strong>Fifin</strong></span></div>
          <div className="onboarding-copy"><span className="eyebrow">{language === "EN" ? "WELCOME" : "SELAMAT DATANG"}</span><h1><span>{language === "EN" ? <>Let's check your finances<br />with Fifin.</> : <>Yuk, cek keuanganmu<br />bareng Fifin.</>}</span></h1><p>{language === "EN" ? "Start with a short Check-up. Fifin then helps you log transactions, understand your finances, and make calmer purchase decisions." : "Mulai dengan Check-up singkat. Setelah itu Fifin membantu mencatat transaksi, membaca kondisi keuangan, dan menemani keputusan belanjamu."}</p></div>
          <div className="onboarding-benefits"><span><Icon name="chart" size={17} /><b>{language === "EN" ? "A judgment-free Check-up" : "Check-up tanpa menghakimi"}</b></span><span><Icon name="sparkles" size={17} /><b>{language === "EN" ? "Log money in everyday language" : "Catat dengan bahasa sehari-hari"}</b></span><span><Icon name="shield" size={17} /><b>{language === "EN" ? "Private and secure data" : "Data tetap privat dan aman"}</b></span></div>
          <div className="onboarding-footer"><span>{language === "EN" ? "A more comfortable financial space" : "Ruang finansial yang terasa lebih nyaman"}</span><small>© 2026 Fifin</small></div>
        </section>
        <section className="onboarding-auth">
          {authMode === "choices" ? <>
            <span className="eyebrow">{language === "EN" ? "START SECURELY" : "MULAI DENGAN AMAN"}</span><h2>{language === "EN" ? "Enter your financial space." : "Masuk ruang finansialmu."}</h2><p>{language === "EN" ? "Your history, reports, and plans will be saved to this account." : "Riwayat, rapor, dan rencanamu akan tersimpan di akun ini."}</p>
            <button className="google-auth" onClick={() => setGooglePickerOpen(true)}><GoogleIcon />{language === "EN" ? "Continue with Google" : "Lanjutkan dengan Google"}</button>
            <div className="auth-divider"><i />{language === "EN" ? "or" : "atau"}<i /></div>
            <button className="email-auth" onClick={() => setAuthMode("email")}><Icon name="send" size={17} />{language === "EN" ? "Continue with email" : "Lanjutkan dengan email"}</button>
            <button className="explore-demo" onClick={() => { setOnboardingOpen(false); showToast(language === "EN" ? "You're exploring the Fifin demo." : "Kamu masuk ke demo Fifin."); }}>{language === "EN" ? "Explore the demo first" : "Jelajahi demo dulu"}</button>
            <small>{language === "EN" ? "By continuing, you agree to Fifin's Terms of Use and Privacy Policy." : "Dengan melanjutkan, kamu menyetujui Ketentuan Penggunaan dan Kebijakan Privasi Fifin."}</small>
          </> : <form onSubmit={(event) => { event.preventDefault(); setOnboardingOpen(false); showToast("Akunmu siap. Selamat datang di Fifin."); }}>
            <button type="button" className="auth-back" onClick={() => setAuthMode("choices")}><Icon name="arrow" size={14} /> {language === "EN" ? "Back" : "Kembali"}</button>
            <span className="eyebrow">{language === "EN" ? "SIGN IN WITH EMAIL" : "MASUK DENGAN EMAIL"}</span><h2>{language === "EN" ? "Where should we send your sign-in link?" : "Ke mana kami mengirim tautan masuk?"}</h2><p>{language === "EN" ? "No password needed. We'll send you a secure link." : "Tidak perlu kata sandi. Kami akan mengirim tautan yang aman."}</p>
            <label><span>{language === "EN" ? "Email address" : "Alamat email"}</span><input type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="nama@email.com" required autoFocus /></label>
            <button className="primary-button wide" type="submit">{language === "EN" ? "Send sign-in link" : "Kirim tautan masuk"} <Icon name="arrow" size={16} /></button>
          </form>}
        </section>
        {googlePickerOpen && <div className="google-picker-backdrop" role="dialog" aria-modal="true" aria-label={language === "EN" ? "Choose a Google account" : "Pilih akun Google"}><button className="google-picker-dismiss" onClick={() => setGooglePickerOpen(false)} aria-label={language === "EN" ? "Close account picker" : "Tutup pilihan akun"} /><div className="google-picker"><div className="google-picker-head"><GoogleIcon /><div><strong>{language === "EN" ? "Choose an account" : "Pilih akun"}</strong><small>{language === "EN" ? "to continue to Fifin" : "untuk melanjutkan ke Fifin"}</small></div><button onClick={() => setGooglePickerOpen(false)} aria-label="Tutup"><Icon name="close" size={17} /></button></div><div className="google-accounts">{[["Bulan Pratama","bulan.pratama@gmail.com","B"],["Bulan Finance","bulan.finance@gmail.com","BF"]].map(([name,email,initial]) => <button key={email} onClick={() => { setGooglePickerOpen(false); setOnboardingOpen(false); showToast(language === "EN" ? `Signed in as ${name}.` : `Berhasil masuk sebagai ${name}.`); }}><span>{initial}</span><div><strong>{name}</strong><small>{email}</small></div><Icon name="chevron" size={15} /></button>)}</div><button className="google-other-account" onClick={() => { setGooglePickerOpen(false); setAuthMode("email"); }}><span><Icon name="plus" size={17} /></span>{language === "EN" ? "Use another account" : "Gunakan akun lain"}</button><p>{language === "EN" ? "Google will share your name, email address, and profile photo with Fifin." : "Google akan membagikan nama, alamat email, dan foto profilmu kepada Fifin."}</p></div></div>}
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
            <button className="topbar-brand brand" onClick={() => setPage("home")}><FifinAvatar small /><span>Fifin</span></button>
            <span className="desktop-page">{language === "EN" ? "Hi Bulan, I'm Fifin" : "Hai Bulan, aku Fifin"}</span>
          </div>
          <div className="top-actions">
            <button className={rightRailOpen ? "rewire-toggle active" : "rewire-toggle"} onClick={() => setRightRailOpen((open) => !open)}><Icon name="chart" size={15} /> Rewire <Icon name="chevron" size={13} /></button>
            <div className="language-toggle" aria-label="Pilihan bahasa"><button aria-pressed={language === "ID"} className={language === "ID" ? "active" : ""} onClick={() => { setLanguage("ID"); showToast("Bahasa diubah ke Indonesia."); }}>ID</button><button aria-pressed={language === "EN"} className={language === "EN" ? "active" : ""} onClick={() => { setLanguage("EN"); showToast("Language switched to English."); }}>EN</button></div>
            <button className="theme-icon-button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Gunakan mode terang" : "Gunakan mode gelap"} aria-pressed={darkMode}><Icon name={darkMode ? "moon" : "sun"} size={18} /></button>
            <button className="icon-button notification-button" onClick={() => setNotificationsOpen((open) => !open)} aria-label="Notifikasi"><Icon name="bell" /><i /></button>
            <button className={page === "profile" ? "top-profile active" : "top-profile"} onClick={() => setPage("profile")} aria-label="Buka profil Bulan">
              <span className="top-avatar">B</span><span><strong>Bulan</strong><small>Paket Gratis</small></span><Icon name="chevron" size={14} />
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
              <aside className="help-contact"><FifinAvatar /><span className="eyebrow">MASIH BUTUH BANTUAN?</span><h2>Kami siap mendengarkan.</h2><p>Kirim pertanyaanmu ke tim bantuan. Balasan biasanya diterima dalam satu hari kerja.</p><button className="primary-button" onClick={() => showToast("Form bantuan sudah disiapkan.")}>Hubungi Helpdesk <Icon name="arrow" size={15} /></button><small>Senin–Jumat · 09.00–17.00 WIB</small></aside>
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
                  <div className="checkup-guide-brand"><FifinAvatar mood={checkupReaction.mood} /><div><span className="eyebrow">CHECK-UP KEUANGAN</span><h1><span>Kenali angka dasarmu</span><br />bersama Fifin.</h1><p>Enam jawaban singkat untuk membuat rekomendasi yang sesuai dengan kondisimu.</p></div></div>
                  
                  <div className="checkup-steps">{questions.map((question, index) => <span key={question.title} className={index === checkStep ? "active" : index < checkStep ? "done" : ""}><i>{index < checkStep ? <Icon name="check" size={12} /> : index + 1}</i><b>{checkStepLabels[index]}</b><small>{index < checkStep ? choiceSteps.includes(index) ? (answers[index] > 0 ? "Sudah" : "Belum") : `${formatRupiah(answers[index])}${index === 0 ? ` · ${incomeType}` : ""}` : checkStepDescriptions[index]}</small>{index < checkStep && <u className="step-filled-check" aria-label="Sudah terisi"><Icon name="check" size={13} /></u>}</span>)}</div>
                </aside>
                <section className="checkup-question">
                  <div className="question-top"><span>Progres Check-up {checkStep + 1} dari 6 · {checkStepLabels[checkStep]}</span><strong>{Math.round(((checkStep + 1) / 6) * 100)}% selesai</strong></div>
                  <div className="progress"><i style={{ width: `${((checkStep + 1) / 6) * 100}%` }} /></div>
                  <div className="question-copy">
                    <span className="eyebrow">PERTANYAAN {checkStep + 1}</span>
                    <h2>{questions[checkStep].title}</h2>
                    <p className="question-helper"><Icon name="info" size={18} />{questions[checkStep].helper}</p>
                  </div>
                  <div className="checkup-answer-card">
                    <div className="answer-card-heading"><span>Jawabanmu</span><small>{choiceSteps.includes(checkStep) ? "Pilih salah satu" : "Masukkan perkiraan nominal"}</small></div>
                    {choiceSteps.includes(checkStep) ? <div className="choice-answers">{[["Sudah", checkStep === 2 ? Math.max(answers[1] * 3, 1) : checkStep === 4 ? Math.max(Math.round(answers[0] * .1), 1) : 1], ["Belum", 0]].map(([label, value]) => { const active = answeredSteps[checkStep] && (label === "Sudah" ? answers[checkStep] > 0 : answers[checkStep] === 0); return <button key={label} className={active ? "active" : ""} onClick={() => setAnswer(value as number)}>{active && <Icon name="check" size={14} />}{label}</button>; })}</div> : <>
                    {checkStep === 0 && <div className="income-toggle"><button className={incomeType === "Tetap" ? "active" : ""} onClick={() => setIncomeType("Tetap")}>Pendapatan tetap</button><button className={incomeType === "Fluktuatif" ? "active" : ""} onClick={() => setIncomeType("Fluktuatif")}>Tidak tetap</button></div>}
                    <div className="amount-input"><span>{checkStep === 5 ? "Orang" : "Rp"}</span><input type="text" inputMode="numeric" placeholder="0" value={answeredSteps[checkStep] ? answers[checkStep].toLocaleString("id-ID") : ""} onChange={(event) => setAnswer(Number(event.target.value.replace(/\D/g, "")))} aria-label={`Jawaban untuk ${questions[checkStep].title}`} autoFocus /></div>
                    <div className="preset-heading"><span>Sesuaikan jawaban</span><small>Kurangi atau tambah tanpa mengetik ulang</small></div>
                    <div className="amount-adjustments">
                      <div><span>Tambah</span><div>{(checkStep === 5 ? [1] : [100000,500000,1000000]).map((value) => <button key={value} onClick={() => setAnswer(answers[checkStep] + value)}>+ {checkStep === 5 ? value : value >= 1000000 ? `${value / 1000000}jt` : `${value / 1000}rb`}</button>)}</div></div>
                      <div><span>Kurangi</span><div>{(checkStep === 5 ? [1] : [100000,500000]).map((value) => <button key={value} disabled={!answers[checkStep]} onClick={() => setAnswer(Math.max(0, answers[checkStep] - value))}>− {checkStep === 5 ? value : `${value / 1000}rb`}</button>)}</div></div>
                    </div>
                    <button className={answeredSteps[checkStep] && answers[checkStep] === 0 ? "zero-answer active" : "zero-answer"} onClick={() => setAnswer(0)}><Icon name="check" size={13} />{"Tidak ada / isi Rp0"}</button>
                    </>}
                    {checkStep === 3 && answers[3] > answers[0] * 2 && <div className="gentle-warning">Cek lagi yuk, angkanya benar segini?</div>}
                  </div>
                  <div className="checkup-footer"><span className="autosave-note"><Icon name="check" size={13} /> Jawaban tersimpan otomatis</span><div className="question-actions"><button disabled={checkStep === 0} onClick={() => setCheckStep((step) => step - 1)}>Kembali</button><button className="primary-button" disabled={!answeredSteps[checkStep]} onClick={finishStep}>{checkStep === 5 ? "Lihat hasil" : "Lanjut"} <Icon name="arrow" size={16} /></button></div></div>
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
                </div>
                <section className="score-meaning">
                  <div><span>ARTI SKORMU</span><strong>{checkupScore}/100 berarti kondisimu {resultLabel.toLowerCase()}.</strong><p>Skor dirangkum dari arus kas, dana darurat, cicilan, dan kebiasaan menabung. Ini bukan penilaian pribadi dan dapat berubah saat angkamu berubah.</p></div>
                  <div className="score-scale"><span className={checkupScore < 60 ? "active alert" : ""}><i />0–59<small>Perlu perhatian</small></span><span className={checkupScore >= 60 && checkupScore < 80 ? "active worried" : ""}><i />60–79<small>Cukup sehat</small></span><span className={checkupScore >= 80 ? "active happy" : ""}><i />80–100<small>Kondisi kuat</small></span></div>
                </section>
                <div className="result-metrics">
                  <article className={monthlyRemainder >= 0 ? "good" : "alert"}><span><Icon name="wallet" size={17} /></span><small>SISA ARUS KAS</small><strong>{formatRupiah(monthlyRemainder)}</strong><p>{monthlyRemainder >= 0 ? "Masih tersisa setelah pengeluaran, cicilan, dan tabungan." : "Pengeluaran dan alokasi saat ini melebihi pemasukan."}</p></article>
                  <article className={emergencyMonths >= 3 ? "good" : emergencyMonths >= 1 ? "watch" : "alert"}><span><Icon name="shield" size={17} /></span><small>DANA DARURAT</small><strong>{emergencyMonths.toFixed(1)} bulan</strong><p>{emergencyMonths >= 3 ? "Sudah mendekati rentang aman 3–6 bulan." : "Target awal yang disarankan adalah 3 bulan pengeluaran."}</p></article>
                  <article className={installmentRatio <= .3 ? "good" : installmentRatio <= .5 ? "watch" : "alert"}><span><Icon name="chart" size={17} /></span><small>RASIO CICILAN</small><strong>{Math.round(installmentRatio * 100)}%</strong><p>{installmentRatio <= .3 ? "Masih dalam batas nyaman, di bawah 30% pemasukan." : "Porsinya cukup besar dan perlu dijaga agar arus kas tetap lega."}</p></article>
                  <article className={savingRatio >= .1 ? "good" : "watch"}><span><Icon name="sparkles" size={17} /></span><small>RASIO TABUNGAN</small><strong>{Math.round(savingRatio * 100)}%</strong><p>{savingRatio >= .1 ? "Kebiasaan menabungmu sudah mulai terbentuk." : "Mulai dari nominal kecil yang bisa dijaga konsisten."}</p></article>
                </div>
                <div className="result-action"><span><Icon name="sparkles" /></span><div><small>PRIORITAS BERIKUTNYA</small><strong>{emergencyMonths < 3 ? "Bangun dana darurat hingga setara 3 bulan pengeluaran" : installmentRatio > .3 ? "Turunkan porsi cicilan secara bertahap" : "Pertahankan arus kas positif dan tabungan rutin"}</strong></div></div>
                <section className="result-next-steps"><div><span>01</span><strong>Minggu ini</strong><p>{emergencyMonths < 3 ? "Sisihkan nominal kecil khusus untuk dana darurat." : "Pertahankan tabungan rutin yang sudah berjalan."}</p></div><div><span>02</span><strong>Bulan ini</strong><p>{installmentRatio > .3 ? "Tinjau satu cicilan dengan bunga atau biaya tertinggi." : "Pastikan cicilan tetap di bawah 30% pemasukan."}</p></div><div><span>03</span><strong>30 hari lagi</strong><p>Ulangi Check-up untuk melihat perubahan skormu.</p></div></section>
                <div className="result-buttons"><button className="secondary-button" onClick={() => { setPage("report"); showToast("Rapor Check-up tersimpan di Riwayat."); }}>Simpan & lihat rapor <Icon name="chart" size={15} /></button><button className="primary-button" onClick={() => { setPage("finance"); setFinanceTab("overview"); setCheckDone(false); setCheckStep(0); }}>Lihat Keuanganmu <Icon name="arrow" size={16} /></button></div>
              </div>
            )}
          </div>
        )}

        {page === "report" && (
          <div className="content feature-page report-page">
            {!savedReport ? <div className="report-empty"><FifinAvatar /><span className="eyebrow">BELUM ADA RAPOR TERSIMPAN</span><h1>Selesaikan Check-up pertamamu.</h1><p>Setelah selesai, skor, indikator, dan langkah berikutnya akan tersimpan di sini.</p><button className="primary-button" onClick={() => setPage("checkup")}>Mulai Check-up <Icon name="arrow" size={15} /></button></div> : <>
              <div className="feature-header"><div><span className="eyebrow">RAPOR KEUANGAN · JUNI 2026</span><h1>Gambaran kondisi keuanganmu.</h1><p>Snapshot hasil Check-up terakhir, tersimpan agar kamu dapat membandingkan perubahan berikutnya.</p></div><div className="report-actions"><button className="report-share" aria-label="Bagikan rapor" title="Bagikan rapor" onClick={() => showToast("Tautan rapor siap dibagikan.")}><Icon name="send" size={18} /></button><button className="primary-button" onClick={() => showToast("Rapor PDF sedang disiapkan.")}>Unduh PDF <Icon name="arrow" size={14} /></button></div></div>
              <section className={`report-summary ${activeReport.mood}`}><FifinAvatar mood={activeReport.mood} /><div><span>{activeReport.label}</span><h2>{activeReport.title}</h2><p>{activeReport.description}</p></div><div className="report-score"><strong>{activeReport.score}</strong><small>/100</small></div></section>
              <div className="report-metrics"><article><small>SISA ARUS KAS</small><strong>{formatRupiah(activeReport.remainder)}</strong><p>Setelah pengeluaran, cicilan, dan tabungan.</p></article><article><small>DANA DARURAT</small><strong>{activeReport.emergencyMonths.toFixed(1)} bulan</strong><p>Target awal yang disarankan adalah 3 bulan.</p></article><article><small>RASIO CICILAN</small><strong>{Math.round(activeReport.installmentRatio * 100)}%</strong><p>Idealnya tetap di bawah 30% pemasukan.</p></article><article><small>RASIO TABUNGAN</small><strong>{Math.round(activeReport.savingRatio * 100)}%</strong><p>Diukur dari total pemasukan bulanan.</p></article></div>
              <section className="report-details"><div><span>DASAR PERHITUNGAN</span><h2>Angka yang tersimpan di rapor ini</h2><p>Data berikut adalah jawaban saat Check-up diselesaikan, bukan angka yang berubah secara otomatis.</p></div><div className="report-detail-grid">{[["Pendapatan",formatRupiah(activeReport.answers[0])],["Pengeluaran",formatRupiah(activeReport.answers[1])],["Dana darurat",formatRupiah(activeReport.answers[2])],["Cicilan",formatRupiah(activeReport.answers[3])],["Tabungan",formatRupiah(activeReport.answers[4])],["Tanggungan",`${activeReport.answers[5]} orang`]].map(([label,value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div></section>
              <div className="report-history-note"><Icon name="clock" size={18} /><div><strong>Tersimpan di Riwayat</strong><p>Kamu dapat membuka kembali rapor Juni 2026 kapan saja dari menu Riwayat atau Rapor Keuangan.</p></div></div>
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
          <div className="content feature-page">
            <div className="feature-header"><div><span className="eyebrow">BELANJA DENGAN LEBIH SADAR</span><h1>Masih kepikiran barang itu?</h1><p>Simpan dulu di sini. Kalau 48 jam lagi masih terasa penting, kamu bisa memutuskan dengan lebih tenang.</p></div><button className="primary-button" onClick={() => setOverlay("delay")}><Icon name="plus" size={17} /> Tambah ke daftar</button></div>
            <div className="delay-summary"><div className="big-orb delay-orb" /><div><span>POTENSI DANA TETAP TERSIMPAN</span><strong>{formatRupiah(savedDelay.price + savedTotal)}</strong><p>{savedTotal > 0 ? `Termasuk ${formatRupiah(savedTotal)} yang sudah berhasil kamu tahan. Hebat!` : "Setara 14 hari anggaran makanmu. Tak ada keputusan yang salah—yang penting kamu memilih dengan sadar."}</p></div></div>
            {delayDecision ? <article className="delay-item-large delay-decided"><FifinAvatar mood={delayDecision === "skip" ? "happy" : "neutral"} /><div className="delay-info"><span>{delayDecision === "skip" ? "KEPUTUSAN: TIDAK JADI BELI" : "KEPUTUSAN: JADI BELI"}</span><h2>{delayDecision === "skip" ? `${formatRupiah(savedDelay.price)} tetap aman.` : "Selamat menikmati barangmu."}</h2><p>{delayDecision === "skip" ? "Uangnya bisa langsung kamu arahkan ke dana darurat atau tujuanmu." : "Kamu sudah menunggu dan memikirkannya dengan sadar. Fifin akan mencatatnya sebagai pengeluaran terencana."}</p></div><div className="countdown"><button onClick={() => { setDelayDecision(null); setDelayChecks([false,false,false]); setOverlay("delay"); }}>Tunda barang lain</button>{delayDecision === "skip" && <button onClick={() => { setFinanceTab("goals"); setPage("finance"); }}>Alihkan ke Tujuanmu</button>}</div></article> : <article className="delay-item-large">
              <div className="product-visual"><div /></div>
              <div className="delay-info"><span>LAGI DITUNGGU</span><h2>{savedDelay.name}</h2><strong>{formatRupiah(savedDelay.price)}</strong><p>Kamu menandainya sebagai {reflection.toLowerCase()}.</p><div className="impact"><span><Icon name="info" size={16} /> 18% dari dana darurat saat ini</span><div><i /></div></div>
                <div className="delay-checklist"><span>Tanya dirimu dulu</span>{["Aku sudah punya barang serupa?", "Masih ingin kalau tanpa diskon?", "Tidak mengganggu dana darurat?"].map((q, i) => <button key={q} className={delayChecks[i] ? "active" : ""} onClick={() => setDelayChecks((c) => c.map((v, j) => j === i ? !v : v))}><Icon name="check" size={12} />{q}</button>)}</div>
              </div>
              <div className="countdown"><span>WAKTU REFLEKSI</span><div className="delay-ring" style={{ ["--p" as string]: `${delayProgress}%` }}><strong>{delayClock}</strong></div><small>jam &nbsp; menit &nbsp; detik · {delayProgress}% berjalan</small><button onClick={() => showToast("Pengingat tenang akan dikirim saat waktunya selesai.")}>Ingatkan nanti</button><div className="delay-decide"><button onClick={() => { setSavedTotal((t) => t + savedDelay.price); setDelayDecision("skip"); showToast(`${formatRupiah(savedDelay.price)} berhasil kamu tahan.`); }}>Tidak jadi</button><button onClick={() => { if (delayLeft > 0 && delayChecks.filter(Boolean).length < 2) { showToast("Jawab minimal 2 pertanyaan refleksi dulu, ya."); return; } setDelayDecision("buy"); showToast("Keputusan tersimpan di Riwayat."); }}>Jadi beli</button></div><button className="delay-extend" onClick={() => { setDelayEndsAt((t) => t + 24 * 3600000); showToast("Waktu refleksi diperpanjang 24 jam."); }}>+24 jam lagi</button></div>
            </article>}
          </div>
        )}
        {page === "profile" && (
          <div className="content feature-page profile-page">
            <section className="profile-hero">
              <div className="profile-avatar-large">{profile.name.charAt(0).toUpperCase() || "B"}</div>
              <div><span className="eyebrow">PROFIL FIFIN</span><h1>{profile.name}</h1><p>Anggota sejak Juni 2026 · Paket Gratis</p></div>
              <div className="profile-actions"><button onClick={() => { if (profileEditing) { setProfileEditing(false); } else { setProfileDraft(profile); setProfileEditing(true); } }}>{profileEditing ? "Batal edit" : "Edit profil"}</button><button className="logout-button" onClick={() => { setOnboardingOpen(true); setAuthMode("choices"); setPage("home"); }}>Keluar</button></div>
            </section>
            <section className="profile-layout">
              <article className="profile-section account-section">
                <div className="profile-section-head"><span className="section-3d-icon"><Icon name="home" size={18} /></span><div><h2>Informasi pribadi</h2><p>Identitas yang digunakan Fifin saat berbicara denganmu.</p></div></div>
                {profileEditing ? <form className="profile-rows profile-edit" onSubmit={(e) => { e.preventDefault(); if (!profileDraft.name.trim()) { showToast("Nama panggilan belum diisi."); return; } setProfile({ name: profileDraft.name.trim(), email: profileDraft.email.trim() }); setProfileEditing(false); showToast("Profil berhasil diperbarui."); }}><label><span>Nama panggilan</span><input value={profileDraft.name} onChange={(e) => setProfileDraft((d) => ({ ...d, name: e.target.value }))} /></label><label><span>Email</span><input type="email" value={profileDraft.email} onChange={(e) => setProfileDraft((d) => ({ ...d, email: e.target.value }))} /></label><button type="submit" className="primary-button">Simpan perubahan</button></form> : <div className="profile-rows"><div><span>Nama panggilan</span><strong>{profile.name}</strong></div><div><span>Email</span><strong>{profile.email}</strong></div><div><span>Bahasa</span><div className="language-toggle"><button className={language === "ID" ? "active" : ""} onClick={() => setLanguage("ID")}>ID</button><button className={language === "EN" ? "active" : ""} onClick={() => setLanguage("EN")}>EN</button></div></div><div><span>Tampilan</span><button className="profile-inline-button" onClick={() => setDarkMode((v) => !v)}>{darkMode ? "Mode gelap" : "Mode terang"}</button></div></div>}
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

      <nav className="mobile-nav" aria-label="Navigasi seluler">
        {nav.map((item) => <button key={item.id} className={isNavActive(item.id) ? "active" : ""} onClick={() => navigate(item.id)}><i className="nav-3d-icon"><Icon name={item.icon} size={17} /></i><span>{language === "EN" ? englishNav[item.id] : item.label}</span></button>)}
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
                  <input type="number" value={answeredSteps[checkStep] ? answers[checkStep] : ""} onChange={(event) => setAnswer(Number(event.target.value))} aria-label="Nominal jawaban" autoFocus />
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
              <form className="delay-modal" onSubmit={(event) => { event.preventDefault(); setSavedDelay({ name: delayName || "Barang impian", price: Number(delayPrice) || 0 }); setDelayEndsAt(Date.now() + 48 * 3600000); setDelayDecision(null); setDelayChecks([false,false,false]); setHasActivity(true); closeOverlay(); setPage("waiting"); showToast("Timer 48 jam dimulai dengan tenang."); }}>
                <div className="modal-orb pink" /><span className="eyebrow">TUNDA BELI</span><h2>Simpan dulu, putuskan nanti.</h2><p>Masukkan barang dan harganya. Aku bantu lihat dampaknya tanpa menghakimi keputusanmu.</p>
                <label><span>Nama barang</span><input value={delayName} onChange={(e) => setDelayName(e.target.value)} placeholder="Contoh: Sepatu lari baru" required /></label>
                <div className="delay-history"><span>Pernah kamu isi</span><div>{[savedDelay.name,"Sepatu lari","Kursi kerja"].map((item) => <button type="button" key={item} onClick={() => setDelayName(item)}>{item}</button>)}</div></div>
                <label><span>Harga</span><div className="currency-field delay-price-field"><span>Rp</span><input type="text" inputMode="numeric" value={delayPrice ? Number(delayPrice).toLocaleString("id-ID") : ""} onChange={(e) => setDelayPrice(e.target.value.replace(/\D/g,""))} placeholder="0" required /></div></label>
                <div className="amount-adjustments delay-price-adjustments">
                  <div><span>Tambah</span><div>{[100000,500000,1000000].map((value) => <button type="button" key={value} onClick={() => setDelayPrice(String((Number(delayPrice) || 0) + value))}>+ {value >= 1000000 ? `${value / 1000000}jt` : `${value / 1000}rb`}</button>)}</div></div>
                  <div><span>Kurangi</span><div>{[100000,500000].map((value) => <button type="button" key={value} disabled={!Number(delayPrice)} onClick={() => setDelayPrice(String(Math.max(0,(Number(delayPrice) || 0) - value)))}>− {value / 1000}rb</button>)}</div></div>
                </div>
                <div className="reflection"><span>Apa yang paling terasa?</span><div>{["Keinginan sesaat", "Reward", "Kebutuhan"].map((item) => <button className={reflection === item ? "active" : ""} onClick={() => setReflection(item)} type="button" key={item}>{item}</button>)}</div></div>
                <button className="primary-button wide" type="submit">Mulai jeda 48 jam <Icon name="arrow" size={17} /></button>
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
                    <article className={proPlan === "monthly" ? "selected" : ""}><span>1 bulan</span><div className="plan-price"><strong>Rp45.000</strong><small>/bulan</small></div><p>Akses Pro selama 1 bulan.</p><button onClick={() => { setProPlan("monthly"); showToast("Akses 1 bulan dipilih."); }}>Pilih 1 bulan</button></article>
                    <article className={proPlan === "quarterly" ? "selected recommended" : ""}><div className="plan-name"><span>3 bulan</span><b>Rekomendasi</b></div><div className="plan-price"><strong>Rp33.000</strong><small>/bulan</small></div><p>Sekali bayar Rp99.000.</p><em>Hemat Rp36.000</em><button onClick={() => { setProPlan("quarterly"); showToast("Akses 3 bulan dipilih."); }}>Pilih 3 bulan</button></article>
                    <article className={proPlan === "annual" ? "selected" : ""}><span>12 bulan</span><div className="plan-price"><strong>Rp27.417</strong><small>/bulan</small></div><p>Sekali bayar Rp329.000.</p><em>Hemat Rp211.000</em><button onClick={() => { setProPlan("annual"); showToast("Akses 12 bulan dipilih."); }}>Pilih 12 bulan</button></article>
                  </div>
                </section>
                <small className="disclaimer">Harga sudah termasuk seluruh fitur Pro. Tidak ada auto-debit atau biaya tersembunyi.</small>
              </div>
            )}
            {overlay === "privacy" && (
              <div className="settings-modal privacy-modal">
                <div className="privacy-shield"><Icon name="shield" size={28} /></div>
                <span className="eyebrow">PRIVASI & KEAMANAN</span><h2>Data keuanganmu tetap milikmu.</h2><p>Di sini kamu mengatur bagaimana Fifin memproses dan menyimpan data pencatatan.</p>
                <div className="privacy-options"><div><span><strong>Zero Photo Storage</strong><small>Foto struk langsung dihapus setelah diproses.</small></span><b>Aktif</b></div><div><span><strong>Masking data sensitif</strong><small>Nomor kartu dan identitas disamarkan otomatis.</small></span><b>Aktif</b></div><button onClick={() => showToast("Unduhan data sedang disiapkan.")}><span><strong>Unduh dataku</strong><small>Salinan transaksi dan riwayat percakapan.</small></span><Icon name="chevron" size={16} /></button></div>
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
