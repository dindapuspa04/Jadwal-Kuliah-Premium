// src/data/scheduleData.js

export const COLORS = {
  bgLight: '#f6f8fd',     // Latar belakang kebiruan soft sesuai gambar
  white: '#ffffff',
  primary: '#4d5bf7',    // Royal Blue
  emerald: '#009688',    // Hijau Teal
  crimson: '#dc2626',    // Merah
  sky: '#0284c7',        // Biru Muda
  navy: '#1e293b',       // Hitam Slate
  textDark: '#1e2538',   // Judul pekat
  textSub: '#64748b',    // Subtitle abu-abu
};

// Data Ringkasan Mata Kuliah Berdasarkan Foto KRS (Total 20 SKS)
export const MATA_KULIAH = [
  { id: 'm1', nama: 'Pemrograman Mobile', kode: 'KELAS C', sks: 3, dosen: 'Panji Rachmat Setiawan, S.Kom., MMSI', warna: '#4d5bf7' },
  { id: 'm2', nama: 'Pembelajaran Mesin', kode: 'KELAS C', sks: 3, dosen: 'Anggi Hanafiah, S.Kom., M.Kom', warna: '#dc2626' },
  { id: 'm3', nama: 'Implementasi dan Pengujian PL', kode: 'KELAS E', sks: 3, dosen: 'Panji Rachmat Setiawan, S.Kom., MMSI', warna: '#009688' },
  { id: 'm4', nama: 'Sensor Jaringan Nirkabel', kode: 'KELAS B', sks: 3, dosen: 'Dr. Evizal, ST., M.Eng', warna: '#0284c7' },
  { id: 'm5', nama: 'Switching Routing & Jar. Nirkabel', kode: 'KELAS C', sks: 3, dosen: 'Yudhi Arta, ST., M.Kom', warna: '#1e293b' },
  { id: 'm6', nama: 'Big Data', kode: 'KELAS F', sks: 3, dosen: 'Mulyanto, S.T., M.Cs., Ph.D', warna: '#8b5cf6' },
  { id: 'm7', nama: 'Kerja Praktek', kode: 'KELAS A', sks: 2, dosen: 'Team Teaching', warna: '#f59e0b' },
];

// Data Jurnal Pertemuan Kuliah (Disimulasikan dari Mata Kuliah Anda) — minimal 10 item sesuai ketentuan tugas
export const DAFTAR_PERTEMUAN = [
  { id: 'p1', kategori: 'Pemrograman Mobile', tagPertemuan: 'Pertemuan 01', topik: 'Pengenalan React Native & Environment Setup', tanggal: '20 Okt', jam: '10:30 WIB', warna: '#4d5bf7' },
  { id: 'p2', kategori: 'Pemrograman Mobile', tagPertemuan: 'Pertemuan 02', topik: 'Component, Props, dan State pada React Native', tanggal: '27 Okt', jam: '10:30 WIB', warna: '#4d5bf7' },
  { id: 'p3', kategori: 'Big Data', tagPertemuan: 'Pertemuan 01', topik: 'Pengenalan Ekosistem Hadoop & MapReduce', tanggal: '20 Okt', jam: '07:00 WIB', warna: '#8b5cf6' },
  { id: 'p4', kategori: 'Big Data', tagPertemuan: 'Pertemuan 02', topik: 'Arsitektur Apache Spark & Resilient Distributed Dataset', tanggal: '27 Okt', jam: '07:00 WIB', warna: '#8b5cf6' },
  { id: 'p5', kategori: 'Pembelajaran Mesin', tagPertemuan: 'Pertemuan 01', topik: 'Review Linear Algebra & Regresi Linear', tanggal: '23 Okt', jam: '13:30 WIB', warna: '#dc2626' },
  { id: 'p6', kategori: 'Pembelajaran Mesin', tagPertemuan: 'Pertemuan 02', topik: 'Klasifikasi dengan Decision Tree & Random Forest', tanggal: '30 Okt', jam: '13:30 WIB', warna: '#dc2626' },
  { id: 'p7', kategori: 'Implementasi & Pengujian PL', tagPertemuan: 'Pertemuan 01', topik: 'Software Quality Assurance & Testing Fundamentals', tanggal: '24 Okt', jam: '08:45 WIB', warna: '#009688' },
  { id: 'p8', kategori: 'Implementasi & Pengujian PL', tagPertemuan: 'Pertemuan 02', topik: 'Perancangan Test Case & Black Box Testing', tanggal: '31 Okt', jam: '08:45 WIB', warna: '#009688' },
  { id: 'p9', kategori: 'Switching Routing & Jaringan', tagPertemuan: 'Pertemuan 01', topik: 'Konfigurasi VLAN & Inter-VLAN Routing', tanggal: '24 Okt', jam: '08:45 WIB', warna: '#1e293b' },
  { id: 'p10', kategori: 'Switching Routing & Jaringan', tagPertemuan: 'Pertemuan 02', topik: 'Trunking, Access Port, dan Troubleshooting VLAN', tanggal: '31 Okt', jam: '08:45 WIB', warna: '#1e293b' },
  { id: 'p11', kategori: 'Sensor Jaringan Nirkabel', tagPertemuan: 'Pertemuan 01', topik: 'Arsitektur Sensor Node & Protokol IEEE 802.15.4', tanggal: '25 Okt', jam: '15:15 WIB', warna: '#0284c7' },
  { id: 'p12', kategori: 'Sensor Jaringan Nirkabel', tagPertemuan: 'Pertemuan 02', topik: 'Topologi Jaringan Sensor Nirkabel & Routing Protocol', tanggal: '01 Nov', jam: '15:15 WIB', warna: '#0284c7' },
  { id: 'p13', kategori: 'Kerja Praktek', tagPertemuan: 'Pertemuan 01', topik: 'Pembekalan & Penentuan Lokasi Kerja Praktek', tanggal: '26 Okt', jam: '09:00 WIB', warna: '#f59e0b' },
  { id: 'p14', kategori: 'Kerja Praktek', tagPertemuan: 'Pertemuan 02', topik: 'Bimbingan Progres Laporan Kerja Praktek', tanggal: '02 Nov', jam: '09:00 WIB', warna: '#f59e0b' },
];

// Data Awal Daftar Tugas (seed) — akan disimpan & disinkronkan dengan AsyncStorage
export const TUGAS_AWAL = [
  { id: 't1', matkul: 'Pembelajaran Mesin', judul: 'Laporan Klasifikasi Status Obesitas (Decision Tree, RF, KNN, NB)', deadline: '15 Jul', selesai: false, prioritas: 'tinggi' },
  { id: 't2', matkul: 'Big Data', judul: 'UAS PySpark — Query di atas YARN/HDFS', deadline: '18 Jul', selesai: true, prioritas: 'tinggi' },
  { id: 't3', matkul: 'Switching Routing & Jar. Nirkabel', judul: 'Laporan VLAN, Trunking & Inter-VLAN Routing', deadline: '10 Jul', selesai: true, prioritas: 'sedang' },
  { id: 't4', matkul: 'Pemrograman Mobile', judul: 'Revisi & Finalisasi Aplikasi Jadwal Kuliah', deadline: '20 Jul', selesai: false, prioritas: 'tinggi' },
  { id: 't5', matkul: 'Sensor Jaringan Nirkabel', judul: 'UAS Praktikum Troubleshooting Trunk & Interface', deadline: '12 Jul', selesai: true, prioritas: 'rendah' },
  { id: 't6', matkul: 'Implementasi dan Pengujian PL', judul: 'Dokumentasi Skenario Pengujian & Test Case', deadline: '22 Jul', selesai: false, prioritas: 'sedang' },
];

// Data Jadwal Kuliah Mingguan Sesuai Hari, Jam, dan Ruangan di Foto KRS
export const JADWAL_SECTIONS = [
  {
    title: 'Selasa',
    warnaHari: COLORS.primary,
    data: [
      { id: 'j1', nama: 'Pemrograman Mobile (C)', ruangan: 'Ruang 3C.2.07', jam: '10:30 - Selesai', sks: 3 }
    ],
  },
  {
    title: 'Rabu',
    warnaHari: COLORS.emerald,
    data: [
      { id: 'j2', nama: 'Implementasi & Pengujian PL (E)', ruangan: 'Ruang 3C.2.07', jam: '08:45 - Selesai', sks: 3 },
      { id: 'j3', nama: 'Switching Routing & Jaringan (C)', ruangan: 'Ruang 3C.2.08', jam: '08:45 - Selesai', sks: 3 }
    ],
  },
  {
    title: 'Jumat',
    warnaHari: COLORS.sky,
    data: [
      { id: 'j4', nama: 'Big Data (F)', ruangan: 'Ruang 3A.1.08', jam: '07:00 - Selesai', sks: 3 },
      { id: 'j5', nama: 'Pembelajaran Mesin (C)', ruangan: 'Ruang 3C.1.04', jam: '13:30 - Selesai', sks: 3 },
      { id: 'j6', nama: 'Sensor Jaringan Nirkabel (B)', ruangan: 'Ruang 3C.2.06', jam: '15:15 - Selesai', sks: 3 }
    ],
  }
];