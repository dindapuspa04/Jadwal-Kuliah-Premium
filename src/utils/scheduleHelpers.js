// src/utils/scheduleHelpers.js

export const HARI_ORDER = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export function getHariIni() {
  return HARI_ORDER[new Date().getDay()];
}

export function getSapaan() {
  const jam = new Date().getHours();
  if (jam < 10) return 'Selamat Pagi';
  if (jam < 15) return 'Selamat Siang';
  if (jam < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

function parseJamMulai(jamString) {
  const match = jamString && jamString.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  return { h: parseInt(match[1], 10), m: parseInt(match[2], 10) };
}

// Menentukan kelas berikutnya dari sekarang berdasarkan hari & jam mulai
export function getNextClass(sections) {
  const now = new Date();
  const todayIdx = now.getDay();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const flat = [];
  sections.forEach((sec) => {
    const dayIdx = HARI_ORDER.indexOf(sec.title);
    sec.data.forEach((item) => {
      const t = parseJamMulai(item.jam);
      if (!t) return;
      flat.push({
        ...item,
        dayIdx,
        hari: sec.title,
        warnaHari: sec.warnaHari,
        startMinutes: t.h * 60 + t.m,
      });
    });
  });

  if (flat.length === 0) return null;

  const withOffset = flat.map((c) => {
    let diff = c.dayIdx - todayIdx;
    if (diff < 0) diff += 7;
    const isToday = diff === 0;
    const isPast = isToday && c.startMinutes < nowMinutes;
    const effectiveDiff = isPast ? diff + 7 : diff;
    return { ...c, effectiveDiff, isToday: effectiveDiff === 0 };
  });

  withOffset.sort((a, b) => a.effectiveDiff - b.effectiveDiff || a.startMinutes - b.startMinutes);
  return withOffset[0];
}

export function formatCountdown(cls) {
  if (!cls) return '';
  const now = new Date();
  const target = new Date(now);
  target.setDate(now.getDate() + cls.effectiveDiff);
  target.setHours(Math.floor(cls.startMinutes / 60), cls.startMinutes % 60, 0, 0);
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return 'Sedang berlangsung sekarang';

  const diffMin = Math.floor(diffMs / 60000);
  const days = Math.floor(diffMin / 1440);
  const hours = Math.floor((diffMin % 1440) / 60);
  const mins = diffMin % 60;

  if (days > 0) return `${days} hari ${hours} jam lagi`;
  if (hours > 0) return `${hours} jam ${mins} menit lagi`;
  return `${mins} menit lagi`;
}

export function getTotalSKS(mataKuliah) {
  return mataKuliah.reduce((total, m) => total + m.sks, 0);
}
