# ROADMAP — petualangan-pancaindra
> Draf 12 Nov 2026. App edukasi IPAS SD 5 indra (React 19 + Vite + Tailwind v4). Repo publik, 1 commit, push 23 Sep 2026. Tanpa CI.

## 1. Posisi kini
- 5 modul indra (`mata/telinga/lidah/hidung/kulit`) di `src/data/sensesData.ts`: anatomi, alur, tips, fakta + myth-buster.
- Bank 25 soal (`src/data/questionsBank.ts`): 5 per indra; ujian master acak lintas indra.
- `TasteMapWidget`, `LessonViewer`, onboarding + profil siswa, `localStorage` berversi.
- `vercel.json` headers produksi; OG ada; `sitemap.xml` + `robots.txt` ada; belum PWA. 3 file test (~4.800 LOC src).

## 2. Fase 1 — Kualitas rilis (v1.1)
- [ ] Tambah workflow CI: `test + typecheck + build` (contoh: `english-do-does/.github/workflows/ci.yml`).
- [ ] Verifikasi akurasi materi 5 indra oleh guru IPAS (anatomi telinga dalam, lapisan kulit).
- [ ] Bank 25 → 50 soal (10 per indra, campur `single` / `organ-role` / `true-false`).
- [ ] Timer + batas waktu ujian master; skor tersimpan defensif seperti pola CBT tka-sd-mastery.
- [ ] Audit a11y mobile: `MobileBottomNav`, target sentuh ≥ 44px, kontras tema gelap.

## 3. Fase 2 — Kedalaman belajar (v1.2)
- [ ] Widget eksperimen per indra (tes bisik 60/60 telinga, aturan 20-20-20 mata sebagai aktivitas tercatat).
- [ ] Narasi audio materi (TTS) + mute global; konsisten dengan `src/lib/sound.ts`.
- [ ] Diagram SVG organ per indra (tanpa hotlink; inline seperti pola audio repo ini).
- [ ] Rapor kelulusan + sertifikat cetak (nama siswa opsional, tanpa NISN).
- [ ] Lembar rekap guru: ekspor CSV progres `localStorage`.

## 4. Fase 3 — Jangkauan (v2.0)
- [ ] PWA offline penuh (materi + bank soal ter-cache).
- [ ] Seri lanjutan IPAS (rangka, fotosintesis) sebagai repo/modul terpisah — jangan campur ke repo ini.
- [ ] Paket cetak PDF per indra untuk kelas tanpa perangkat.

## 5. Definisi selesai
- Fase 1: CI hijau + 50 soal lolos `learning.test.ts` (id unik, `correctIndex` valid).
- Fase 2: 1 guru IPAS uji di kelas; perbaikan materi tercatat.
- Fase 3: PWA terinstal + skor Lighthouse ≥ 90.
