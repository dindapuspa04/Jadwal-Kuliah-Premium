#  Mobile Schedule App — Tugas Praktikum Pemrograman Mobile

Aplikasi monitoring jadwal perkuliahan mahasiswa berbasis React Native (Expo) dengan arsitektur data statis terpusat. Proyek ini dibangun untuk memenuhi kriteria penilaian pada modul **Handling Lists & Data Rendering**.

Nama: Dinda Puspa Partiwi
NPM: 233510549
Kelas : 6C
Program Studi: Teknik Informatika
Universitas: Universitas Islam Riau 

##  Fitur Utama & Interaktivitas
* **Halaman 1: Ringkasan Mata Kuliah (`.map()`)** — Menampilkan ringkasan seluruh paket KRS yang diambil semester ini secara terstruktur dengan ekstraksi key unik pada tiap elemen.
* **Halaman 2: Daftar Pertemuan (`FlatList`)** — Log riwayat materi perkuliahan (minimal 10 sesi) dengan implementasi 4 properti wajib: `keyExtractor`, `ItemSeparatorComponent`, `ListHeaderComponent`, dan `ListEmptyComponent`. Dilengkapi dengan fitur *Interactive Live Absence Tracker*.
* **Halaman 3: Jadwal per Hari (`SectionList`)** — Pemetaan lokal ruang kelas yang dikelompokkan berdasarkan hari operasional kuliah, menggunakan penataan gaya visual *Section Header* yang kontras dan adaptif.
* **Premium Dark Mode UI** — Menggunakan tema arsitektur *Midnight Blue & Slate Tech* yang minimalis untuk kenyamanan mata saat membaca durasi panjang.

---

##  Struktur Proyek (Clean Architecture)
```text
JadwalKuliahApp-v2/
├── src/
│   ├── data/
│   │   └── scheduleData.js  <-- Sumber Array Statis (Hardcoded Data)
│   └── screens/
│       ├── SummaryScreen.js <-- Render List menggunakan .map()
│       ├── MeetingsScreen.js <-- Render List menggunakan FlatList (4 Props)
│       └── ScheduleScreen.js <-- Render List menggunakan SectionList
├── App.js                   <-- Root & Bottom Tab Navigation Config
├── app.json
└── package.json
