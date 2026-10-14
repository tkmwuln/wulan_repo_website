// Lightweight bilingual layer (Indonesian source -> English).
// The UI is authored in Indonesian; when English is active, visible text nodes and
// a few attributes are translated in place from this dictionary. Originals are kept,
// so switching back to Indonesian restores the exact source text.

export type Lang = 'id' | 'en'

const EN: Record<string, string> = {
  // Navigation & shell
  'Chat': 'Chat', 'Chat baru': 'New chat', 'Mulai chat': 'Start chat', 'Menu': 'Menu', 'Dashboard Gizi': 'Nutrition Dashboard', 'Food Diary': 'Food Diary',
  'Status Kesehatan': 'Health Status', 'Growth Chart': 'Growth Chart', 'Riwayat': 'History', 'Laporan Kesehatan': 'Health Report',
  'Detail GGL': 'SSF Details', 'Profil': 'Profile', 'Pusat Bantuan': 'Help Center', 'Pusat bantuan': 'Help center',
  'Riwayat chat': 'Chat history', 'Semua →': 'All →', 'Cari riwayat': 'Search history', 'Keluar': 'Log out', 'Keluar dari akun': 'Log out of account',
  'Lihat profil': 'View profile', 'Ke beranda': 'Go home', 'Tutup sidebar': 'Close sidebar', 'Buka sidebar': 'Open sidebar', 'Kembali': 'Back',
  'Belum ada percakapan. Mulai chat dengan Nuri, nanti muncul di sini.': 'No conversations yet. Start chatting with Nuri and they will show up here.',
  'Tidak ada hasil untuk "': 'No results for "', 'Hari ini': 'Today', 'Kemarin': 'Yesterday', '7 hari lalu': '7 days ago',
  'Terenkripsi · UU PDP': 'Encrypted · PDP Law', 'Laporan PDF': 'PDF Report', 'Upgrade': 'Upgrade', 'Upgrade sekarang': 'Upgrade now',
  'Mode gelap': 'Dark mode', 'Tampilan': 'Display', 'Mode terang': 'Light mode', 'Ganti bahasa': 'Switch language',
  // Chat
  'th ·': 'yr ·', 'dari': 'of', 'kkal': 'kcal', 'kkal · sisa': 'kcal · left', 'sisa': 'left', 'Halo,': 'Hi,', ', aku Nuri': ", I'm Nuri", 'Mau makan apa hari ini?': 'What are you eating today?', 'Fokus:': 'Focus:',
  'Bayi': 'Infant', 'MPASI': 'Weaning', 'Anak': 'Child', 'Remaja': 'Teen', 'Dewasa': 'Adult', 'Lansia': 'Senior',
  '0–6 bln': '0–6 mo', '6–24 bln': '6–24 mo', '2–12 th': '2–12 yr', '13–18 th': '13–18 yr', '19–59 th': '19–59 yr', '60+ th': '60+ yr',
  'ASI eksklusif & WHO Growth Chart': 'Exclusive breastfeeding & WHO Growth Chart', 'Transisi tekstur & pantau stunting': 'Texture transition & stunting watch',
  'Nutrisi otak & kontrol jajanan GGL': 'Brain nutrition & snack SSF control', 'Zat besi, asam folat & growth spurt': 'Iron, folic acid & growth spurt',
  'TDEE & kontrol penyakit kronis': 'TDEE & chronic disease control', 'Protein 1.2–1.5 g/kgBB & dysphagia': 'Protein 1.2–1.5 g/kg BW & dysphagia',
  'Tanya Nuri soal gizi, atau upload foto makananmu…': 'Ask Nuri about nutrition, or upload a photo of your meal…',
  'Tanya cepat, jawab singkat…': 'Quick question, short answer…', 'Tanya dengan mempertimbangkan kondisi kesehatanmu…': 'Ask with your health conditions in mind…',
  'Tanya Nuri soal gizi…': 'Ask Nuri about nutrition…',
  'Cek GGL': 'Check SSF', 'Cek nutrisi': 'Check nutrition', 'Rencana menu': 'Meal plan', 'Voice chat': 'Voice chat', 'Kirim': 'Send',
  'Cek GGL dari Foto': 'Check SSF from Photo', 'Cek Nutrisi dari Foto': 'Check Nutrition from Photo', 'Rencana Menu': 'Meal Plan', 'Cek Nutrisiku': 'Check My Nutrition',
  'Cek GGL dari foto': 'Check SSF from photo', 'Pelajari fitur ini': 'Learn about this feature',
  '· Bukan pengganti diagnosis dokter': '· Not a substitute for medical diagnosis', '. Darurat: 119': '. Emergency: 119',
  'Nuri sedang menganalisis…': 'Nuri is analyzing…', 'Upload foto': 'Upload photo', 'Sudah dicatat ke Food Diary': 'Logged to Food Diary',
  'Lengkapi status kesehatan →': 'Complete health status →', 'Unduh ringkasan untuk dokter': 'Download summary for doctor',
  'Foto makanan': 'Food photo', 'Butuh bantuan? Tanya Nuri!': 'Need help? Ask Nuri!', 'Semangat ya, aku temani!': "Hang in there, I'm with you!",
  'Bantuan Nuri': 'Nuri help', 'Mode utama. Analisis foto lengkap: urai bahan TKPI, kartu GGL atau nutrisi, dan sumber data.': 'Main mode. Full photo analysis: TKPI ingredient breakdown, SSF or nutrition cards, and data sources.',
  'Jawaban satu-dua kalimat tanpa kartu detail. Cocok untuk cek cepat sambil jalan.': 'One- or two-sentence answers without detail cards. Great for quick checks on the go.',
  'Wajib profil kesehatan lengkap. Setiap analisis menampilkan GGL dan nutrisi sekaligus, batas per makan lebih ketat, plus ringkasan untuk dokter.': 'Requires a complete health profile. Every analysis shows SSF and nutrition together, with stricter per-meal limits and a doctor summary.',
  'Foto & resep Nusantara': 'Photos & Indonesian recipes', 'Kartu analisis lengkap': 'Full analysis cards', 'Respon ±1,5 dtk': 'Response ±1.5 s',
  'Respon ±0,5 dtk': 'Response ±0.5 s', 'Jawaban singkat': 'Short answers', 'Tanpa kartu detail': 'No detail cards',
  'Mode ketat penyakit kronis': 'Strict chronic-disease mode', 'GGL + nutrisi sekaligus': 'SSF + nutrition together', 'Cepat & ringkas': 'Fast & concise',
  'Batas ketat sesuai kondisi': 'Strict limits per condition', 'Pengingat alergi & interaksi obat': 'Allergy & drug interaction reminders',
  'Buatkan rencana menu hari ini': 'Make a meal plan for today', 'Cek kesehatan & nutrisiku, oke nggak?': 'Check my health & nutrition, am I okay?',
  // Highlights & calendar
  'Highlight hari ini': "Today's highlights", 'Highlight': 'Highlights', 'Dashboard →': 'Dashboard →', 'Hari sebelumnya': 'Previous day',
  'Hari berikutnya': 'Next day', 'Kembali ke hari ini': 'Back to today', 'Sesuai': 'On target', 'Kurang': 'Under', 'Lebih': 'Over',
  'Asupan kalori': 'Calorie intake', 'Batas Gula · Garam · Lemak': 'Sugar · Salt · Fat limits', 'Tren kalori 7 hari': '7-day calorie trend',
  'Sesuai target energi harian.': 'On track with your daily energy target.', 'Semua masih di bawah batas harian Permenkes 30/2013.': 'Everything is still below the daily limits (MoH Reg. 30/2013).',
  'Gula': 'Sugar', 'Garam': 'Salt', 'Lemak': 'Fat', 'Status kesehatan →': 'Health status →', 'Lengkapi profil kesehatan': 'Complete health profile',
  // Dashboard / diary / health
  'Hari ini kamu keren banget!': "You're doing great today!", 'Lihat GGL': 'View SSF', '+ Catat dari foto': '+ Log from photo', 'Kalori hari ini': "Today's calories",
  'Detail →': 'Details →', 'Protein': 'Protein', 'Karbo': 'Carbs', 'Serat': 'Fiber', 'Batas GGL harian': 'Daily SSF limits', 'Kalori 7 hari terakhir': 'Calories, last 7 days',
  'Makanan terakhir': 'Recent meals', 'Lihat semua': 'See all', 'Rekomendasi Nuri': "Nuri's recommendations", 'Fase usia': 'Age phase', 'Fase': 'Phase',
  'Min': 'Sun', 'Sen': 'Mon', 'Sel': 'Tue', 'Rab': 'Wed', 'Kam': 'Thu', 'Jum': 'Fri', 'Sab': 'Sat',
  'Dashboard-mu masih kosong': 'Your dashboard is still empty', 'Catat makanan pertama': 'Log your first meal', 'Foto makananmu atau tambah manual': 'Photograph your meal or add it manually',
  'Buat rencana menu': 'Create a meal plan', 'Menu harian sesuai target kalorimu': 'Daily menu matched to your calorie target',
  'Begitu kamu mencatat makanan, kalori, GGL, dan tren mingguanmu akan muncul di sini. Yuk mulai dari 3 langkah ini:': 'Once you log meals, your calories, SSF, and weekly trends will show up here. Start with these 3 steps:',
  'Hari ini ·': 'Today ·', 'Sarapan': 'Breakfast', 'Makan siang': 'Lunch', 'Makan malam': 'Dinner', 'Snack': 'Snack', 'Tambah makanan': 'Add food',
  'Nama makanan (mis. Nasi uduk)': 'Food name (e.g. Nasi uduk)', 'Kalori (kkal)': 'Calories (kcal)', 'Tambah': 'Add', 'Hapus': 'Delete', 'Hapus semua': 'Delete all',
  'Food diary masih kosong': 'Your food diary is empty', 'Belum ada makanan tercatat.': 'No meals logged yet.', 'Entri dihapus': 'Entry deleted',
  'Isi nama makanan dan kalori dulu ya': 'Please fill in the food name and calories', 'Catat makanan pertamamu hari ini. Bisa lewat foto, rencana menu, atau isi manual di form samping.': 'Log your first meal today, via photo, meal plan, or the manual form.',
  'Sudah lewat target, tapi santai. Besok kita mulai lagi!': "You're over target, but relax. We'll start fresh tomorrow!",
  'Berat badan': 'Weight', 'Tinggi badan': 'Height', 'BMI': 'BMI', 'Kebutuhan energi': 'Energy needs', 'Alergi': 'Allergies', 'Riwayat penyakit': 'Medical history',
  'normal': 'normal', 'kurus': 'underweight', 'berlebih': 'overweight', 'obesitas': 'obese', 'kkal/hari': 'kcal/day',
  'Posisi BMI kamu': 'Your BMI position', 'Standar Asia-Pasifik': 'Asia-Pacific standard', 'Kurus <18.5': 'Under <18.5', 'Normal 18.5–22.9': 'Normal 18.5–22.9',
  'Berlebih 23–24.9': 'Over 23–24.9', 'Obesitas ≥25': 'Obese ≥25', 'Data diri': 'Personal data', 'Edit data diri': 'Edit personal data', 'Nama': 'Name',
  'Email': 'Email', 'Jenis kelamin': 'Sex', 'Wanita': 'Female', 'Pria': 'Male', 'Usia': 'Age', 'Usia (th)': 'Age (yr)', 'Berat badan (kg)': 'Weight (kg)',
  'Tinggi badan (cm)': 'Height (cm)', 'Aktivitas': 'Activity', 'Aktivitas harian': 'Daily activity', 'Rendah': 'Low', 'Ringan': 'Light', 'Sedang': 'Moderate', 'Tinggi': 'High',
  'Profil kesehatan': 'Health profile', 'Alergi makanan': 'Food allergies', 'Obat rutin': 'Regular medication', 'Catatan kesehatan lain': 'Other health notes',
  '+ Alergi lain': '+ Other allergy', 'Simpan': 'Save', 'Batal': 'Cancel', 'Tutup': 'Close', 'Reset': 'Reset', 'Lewati': 'Skip', 'Tidak ada': 'None',
  'Hipertensi': 'Hypertension', 'Diabetes': 'Diabetes', 'Kolesterol': 'Cholesterol', 'Asam urat': 'Gout', 'Gagal ginjal': 'Kidney failure', 'Maag/GERD': 'Gastritis/GERD',
  'Anemia': 'Anemia', 'Hamil/Menyusui': 'Pregnant/Breastfeeding', 'Kacang': 'Peanuts', 'Susu': 'Milk', 'Telur': 'Egg', 'Seafood': 'Seafood', 'Gluten': 'Gluten', 'Kedelai': 'Soy',
  'Data diri tersimpan': 'Personal data saved', 'Status kesehatan tersimpan': 'Health status saved', 'Nama tidak boleh kosong': 'Name cannot be empty',
  'Ada perubahan yang belum disimpan': 'You have unsaved changes', 'Status kesehatanmu belum lengkap': 'Your health status is incomplete',
  'Data ini dipakai Nuri untuk mencocokkan setiap makanan dengan alergi dan riwayat kesehatanmu.': 'Nuri uses this to match every meal against your allergies and medical history.',
  'Pilih di atas atau ketik, mis. hipertensi': 'Pick above or type, e.g. hypertension', 'Pilih di atas atau ketik, mis. kacang': 'Pick above or type, e.g. peanuts',
  'mis. Amlodipine 5 mg': 'e.g. Amlodipine 5 mg', 'mis. pernah operasi usus buntu 2022': 'e.g. appendectomy in 2022', 'mis. 55': 'e.g. 55', 'mis. 160': 'e.g. 160',
  'Tanya Nuri: nutrisiku oke?': 'Ask Nuri: is my nutrition okay?', 'Cek nutrisiku sekarang': 'Check my nutrition now', 'Lengkapi data dulu': 'Complete your data first',
  // Growth & history
  'Kurva pertumbuhan WHO ·': 'WHO growth curve ·', 'pengukuran': 'measurements', 'Berat': 'Weight', 'Tambah pengukuran': 'Add measurement', 'Usia (bln)': 'Age (mo)',
  'Berat (kg)': 'Weight (kg)', 'Tinggi (cm)': 'Height (cm)', 'Simpan pengukuran': 'Save measurement', 'Terakhir diukur ·': 'Last measured ·', 'bln': 'mo',
  'Dalam rentang normal WHO': 'Within WHO normal range', 'Di atas rentang normal WHO': 'Above WHO normal range', 'Di bawah rentang normal WHO': 'Below WHO normal range',
  'Pertumbuhan bagus!': 'Healthy growth!', 'Pertumbuhan sesuai kurva WHO. Pertahankan!': 'Growth follows the WHO curve. Keep it up!', 'Riwayat pengukuran': 'Measurement history',
  'Kenaikan berat melambat': 'Weight gain is slowing', 'Pertumbuhan Anak (WHO)': 'Child Growth (WHO)', 'Pantau tumbuh kembang si kecil': "Track your little one's growth",
  'Semua': 'All', 'Belum ada percakapan': 'No conversations yet', 'Mulai ngobrol dengan Nuri': 'Start chatting with Nuri', 'Mulai chat dengan Nuri': 'Start a chat with Nuri',
  'Mulai ngobrol dengan Nuri, kirim foto makanan, atau minta rencana menu. Semua percakapan akan tersimpan di sini.': 'Chat with Nuri, send food photos, or ask for a meal plan. All conversations are saved here.',
  'Tidak ada percakapan di periode ini': 'No conversations in this period', 'Coba pilih filter lain.': 'Try another filter.', 'Percakapan dihapus': 'Conversation deleted', 'Riwayat dihapus': 'History cleared',
  // Help desk & help center
  'Nuri Help Desk': 'Nuri Help Desk', 'Biasanya membalas instan': 'Usually replies instantly', 'Hai! Aku Nuri. Ada yang bisa kubantu hari ini?': "Hi! I'm Nuri. How can I help you today?",
  'Bagaimana cara cek GGL?': 'How do I check SSF?', 'Apakah dataku aman?': 'Is my data safe?', 'Apa itu fase usia?': 'What are age phases?', 'Mood Nuri': "Nuri's mood", 'Pintasan': 'Shortcuts',
  'Cek GGL foto': 'Photo SSF check', 'Ulangi onboarding': 'Redo onboarding', 'Cara pakai': 'How to use', 'Daftar isi': 'Contents', 'Fitur': 'Features',
  'Aman! Semua data kesehatan terenkripsi dan diproses sesuai UU PDP No. 27/2022.': 'Yes! All health data is encrypted and processed under Personal Data Protection Law No. 27/2022.',
  'Target gizimu otomatis menyesuaikan 6 fase: Bayi, MPASI, Anak, Remaja, Dewasa, dan Lansia.': 'Your nutrition targets adapt to 6 phases: Infant, Weaning, Child, Teen, Adult, and Senior.',
  'Tekan "Cek GGL dari foto", upload foto makanan, lalu aku hitung gula, garam, dan lemaknya otomatis.': 'Tap "Check SSF from photo", upload a food photo, and I\'ll calculate the sugar, salt, and fat automatically.',
  'Masih bingung? Klik aku di pojok kanan bawah!': 'Still confused? Click me in the bottom-right corner!',
  'Normal': 'Normal', 'Tenang': 'Calm', 'Senang banget': 'Very happy', 'Sayang': 'Loving', 'Kedinginan': 'Cold', 'Sedih': 'Sad', 'Marah': 'Angry', 'Berpikir': 'Thinking',
  // Report
  'Laporan Status Kesehatan & Gizi': 'Health & Nutrition Status Report', 'NutriChat · dibuat': 'NutriChat · generated', 'Identitas': 'Identity', 'Klaster usia': 'Age cluster',
  'Status Antropometri': 'Anthropometric Status', 'Riwayat Kesehatan': 'Medical History', 'Total energi': 'Total energy', 'Catatan': 'Notes', 'Unduh PDF': 'Download PDF',
  'Status kesehatan terbaru per': 'Latest health status as of', '. Pilih': '. Choose', '"Simpan sebagai PDF"': '"Save as PDF"', 'di jendela cetak.': 'in the print dialog.',
  'Belum ada catatan.': 'No notes yet.', 'belum diisi': 'not filled in', 'Disclaimer:': 'Disclaimer:', 'Kontribusi per makanan': 'Contribution per food',
  'Laporan ini bersifat edukatif dan bukan pengganti diagnosis medis. Konsultasikan dengan dokter atau ahli gizi. Data dilindungi sesuai UU PDP No. 27/2022.': 'This report is educational and not a substitute for medical diagnosis. Consult a doctor or nutritionist. Data is protected under PDP Law No. 27/2022.',
  // Modals & onboarding
  'Yakin mau keluar?': 'Sure you want to log out?', 'Nuri bakal kangen. Datanya tetap aman terenkripsi kok.': "Nuri will miss you. Your data stays safely encrypted.",
  'NutriChat Plus': 'NutriChat Plus', 'Yang kamu dapat': 'What you get', '/bulan': '/month', 'Yay! Kamu sekarang NutriChat Plus': "Yay! You're now on NutriChat Plus",
  'Analisis foto tanpa batas, mode klinis, dan konsultasi ahli gizi.': 'Unlimited photo analysis, clinical mode, and nutritionist consultations.',
  'Hai, aku Nuri, teman gizimu': "Hi, I'm Nuri, your nutrition buddy", 'Yuk mulai analisis nutrisi harianmu': 'Start analyzing your daily nutrition',
  'Masuk': 'Sign in', 'Masuk dengan Google': 'Sign in with Google', 'Masuk untuk lanjut': 'Sign in to continue', 'Gunakan akun Google lain': 'Use another Google account',
  'Menghubungkan…': 'Connecting…', 'Ketik usiamu…': 'Type your age…', 'Lanjut ke jawaban Nuri': "Continue to Nuri's answer", 'Supaya riwayat dan data gizimu tersimpan.': 'So your history and nutrition data are saved.',
  'Cek GGL, nutrisi, dan rencana makan harianmu, mulai dari foto makanan.': 'Check SSF, nutrition, and your daily meal plan, starting from a food photo.',
  'Ketik berat dan tinggi, mis. 55 kg 160 cm': 'Type weight and height, e.g. 55 kg 160 cm',
  'Berapa usiamu sekarang? (mis. 27, atau "8 bulan" untuk bayi)': 'How old are you? (e.g. 27, or "8 months" for a baby)',
  'Oke! Berapa berat dan tinggi badanmu? (mis. "55 kg 160 cm")': 'Okay! What are your weight and height? (e.g. "55 kg 160 cm")',
  'Tulis dua angka ya, berat (kg) dan tinggi (cm). Contoh: 55 160': 'Please enter two numbers, weight (kg) and height (cm). Example: 55 160',
  'Tidak apa-apa, nanti bisa dilengkapi. Apakah kamu punya kondisi kesehatan tertentu?': 'No problem, you can fill this in later. Do you have any health conditions?',
  'Bagus!': 'Great!', 'Terakhir, ada alergi makanan?': 'Lastly, any food allergies?', 'Kirim (': 'Send (',
  // Feature cards & misc
  'Siap! Tekan "Cek GGL" di kolom chat untuk upload foto': 'Ready! Tap "Check SSF" in the chat box to upload a photo', 'Rencana menu disimpan ke Food Diary': 'Meal plan saved to Food Diary',
  'Simpan ke Food Diary': 'Save to Food Diary', '✓ Tersimpan di Food Diary': '✓ Saved to Food Diary', 'Opsi lain': 'Other options', 'Total': 'Total', 'Per porsi': 'Per serving',
  'Sumber data:': 'Data sources:', 'Sumber data ·': 'Data sources ·', 'Skor GGL:': 'SSF score:', 'baik': 'good', 'sedang': 'fair', 'buruk': 'poor', 'Energi': 'Energy',
  'Vitamin & mineral (% AKG)': 'Vitamins & minerals (% RDA)', 'Zat besi': 'Iron', 'Kalsium': 'Calcium', 'Tinggi protein': 'High protein', 'Rendah kalori': 'Low calorie',
  'Vegetarian': 'Vegetarian', 'Tinggi serat': 'High fiber', 'Rendah garam': 'Low salt', 'Estimasi AI': 'AI estimate', 'Label gizi': 'Nutrition label', 'TKPI Kemenkes': 'TKPI (MoH)',
  'Daftar bahan (TKPI)': 'Ingredients (TKPI)', 'Saran pelengkap gizi': 'Nutrition add-on tips', '(lewat batas)': '(over limit)', 'Gula tinggi': 'High sugar', 'Garam tinggi': 'High salt',
  'Perlu perhatian': 'Needs attention', 'Pas dengan target': 'On target', 'Siap dikirim': 'Ready to send', 'Nuri mendengarkan…': 'Nuri is listening…', 'Berhenti': 'Stop',
  'Coba bilang: "Apa sarapan sehat untuk lansia?"': 'Try saying: "What\'s a healthy breakfast for seniors?"', 'Tanpa nama': 'Untitled', 'Pengguna NutriChat': 'NutriChat user',
  'Hasil ini bersifat edukatif, bukan diagnosis. Selalu konsultasikan kondisi medis dengan dokter atau ahli gizi.': 'These results are educational, not a diagnosis. Always consult a doctor or nutritionist about medical conditions.',
  'Hasil otomatis dicatat ke Food Diary dan Dashboard.': 'Results are automatically logged to the Food Diary and Dashboard.', 'Kategori': 'Category', 'Waktu': 'Time', 'Makanan': 'Food', 'Kalori': 'Calories',
}

// Dynamic strings: [pattern, replacement]
const PATTERNS: [RegExp, string | ((...m: string[]) => string)][] = [
  [/^Selamat datang, (.+)!$/, 'Welcome, $1!'],
  [/^Beralih ke (.+)$/, 'Switched to $1'],
  [/^Masih ada (.+) kkal\. Pilih yang bergizi ya!$/, '$1 kcal left. Choose something nutritious!'],
  [/^Masih kurang (.+) kkal dari kebutuhan harian\.$/, '$1 kcal short of your daily needs.'],
  [/^Melebihi target (\d+)%\. Seimbangkan dengan aktivitas ringan\.$/, '$1% over target. Balance it with light activity.'],
  [/^(\d+) batas terlewati\. Batas harian mengikuti Permenkes 30\/2013\.$/, '$1 limit(s) exceeded. Daily limits follow MoH Reg. 30/2013.'],
  [/^Rata-rata (.+) kkal\/hari\. Batang merah berarti melebihi target\.$/, 'Average $1 kcal/day. Red bars mean over target.'],
  [/^Asupanmu sudah (\d+)% dari target dan GGL masih aman\.$/, "You've reached $1% of your target and SSF is still safe."],
  [/^dari (.+) kkal$/, 'of $1 kcal'],
  [/^dari (.+) kkal · sisa (.+)$/, 'of $1 kcal · $2 left'],
  [/^(.+) kkal$/, '$1 kcal'], [/^(.+) kkal\/hari$/, '$1 kcal/day'],
  [/^(\d+) tahun$/, '$1 years'], [/^(\d+) bulan$/, '$1 months'], [/^(\d+) th · Fase (.+)$/, (_, a, b) => `${a} yr · ${tr(b)} phase`],
  [/^Asupan Hari Ini \((.+)\)$/, (_, d) => `Today's Intake (${dates(d)})`],
  [/^Kirim \((\d+)\)$/, 'Send ($1)'],
  [/^(\S+) \((.+) (th|bln)\)$/, (_, a, b, u) => `${tr(a)} (${b} ${u === 'th' ? 'yr' : 'mo'})`],
  [/^(\d+)\/3 terisi$/, '$1/3 filled'],
]

const DAYS: Record<string, string> = {
  Senin: 'Monday', Selasa: 'Tuesday', Rabu: 'Wednesday', Kamis: 'Thursday', Jumat: 'Friday', Sabtu: 'Saturday', Minggu: 'Sunday',
  Sen: 'Mon', Sel: 'Tue', Rab: 'Wed', Kam: 'Thu', Jum: 'Fri', Sab: 'Sat', Min: 'Sun',
  Januari: 'January', Februari: 'February', Maret: 'March', Mei: 'May', Juni: 'June', Juli: 'July', Agustus: 'August', Oktober: 'October', Desember: 'December',
  Agu: 'Aug', Agt: 'Aug', Okt: 'Oct', Des: 'Dec',
}
const DATE_RE = new RegExp(`\\b(${Object.keys(DAYS).join('|')})\\b`, 'g')
function dates(s: string) { return (/\d/.test(s) ? s.replace(DATE_RE, w => DAYS[w]).replace(/pukul /g, 'at ') : s).replace(/\bkkal\b/g, 'kcal') }

let lang: Lang = 'id'

export function tr(s: string): string {
  if (lang === 'id') return s
  const core = s.trim()
  if (!core) return s
  let r: string | undefined = EN[core]
  if (r === undefined) for (const [re, f] of PATTERNS) { if (re.test(core)) { r = core.replace(re, f as string); break } }
  if (r === undefined) r = dates(core)
  return r === core ? s : s.replace(core, r)
}

// --- DOM translator ---
const ATTRS = ['placeholder', 'title', 'aria-label', 'alt']
const srcText = new WeakMap<Text, string>(), outText = new WeakMap<Text, string>()
const srcAttr = new WeakMap<Element, Record<string, string>>(), outAttr = new WeakMap<Element, Record<string, string>>()
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE'])
const noTr = (el: Element | null) => !el || !!el.closest('[data-no-tr]')
const skipped = (el: Element | null) => noTr(el) || SKIP.has(el!.tagName)

function doText(n: Text) {
  if (skipped(n.parentElement)) return
  const v = n.nodeValue ?? ''
  if (outText.get(n) !== v) srcText.set(n, v) // React (or someone) wrote a new value
  const next = tr(srcText.get(n) ?? v)
  if (next !== v) n.nodeValue = next
  outText.set(n, next)
}
function doAttr(el: Element, a: string) {
  const v = el.getAttribute(a); if (v == null || noTr(el)) return
  const src = srcAttr.get(el) ?? {}, out = outAttr.get(el) ?? {}
  if (out[a] !== v) src[a] = v
  const next = tr(src[a] ?? v)
  if (next !== v) el.setAttribute(a, next)
  out[a] = next; srcAttr.set(el, src); outAttr.set(el, out)
}
function walk(root: Node) {
  if (root.nodeType === 3) return doText(root as Text)
  if (root.nodeType !== 1) return
  const el = root as Element
  ATTRS.forEach(a => doAttr(el, a))
  el.querySelectorAll(ATTRS.map(a => `[${a}]`).join(',')).forEach(e => ATTRS.forEach(a => doAttr(e, a)))
  const it = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  for (let t = it.nextNode(); t; t = it.nextNode()) doText(t as Text)
}

let observer: MutationObserver | null = null
export function setLang(next: Lang) {
  lang = next
  document.documentElement.lang = next
  if (!observer) {
    observer = new MutationObserver(list => {
      for (const m of list) {
        if (m.type === 'characterData') doText(m.target as Text)
        else if (m.type === 'attributes' && m.attributeName) doAttr(m.target as Element, m.attributeName)
        else m.addedNodes.forEach(walk)
      }
    })
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS })
  }
  walk(document.body)
}
