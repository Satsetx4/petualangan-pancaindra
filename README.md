# Petualangan Pancaindra

Aplikasi edukasi IPAS SD tentang lima indra, kuis per modul, dan ujian master.

## Requirements

- Node.js 22.12 or newer
- npm

## Install

```bash
npm ci
```

## Development

```bash
npm run dev
```

## Typecheck

```bash
npm run typecheck
```

## Test

```bash
npm run test
npm run test:run
```

## Build

```bash
npm run build
```

## Project Structure

- `src/data`: lesson content and question bank
- `src/components`: lesson, quiz, exam, profile, and shared interface
- `src/lib`: progress storage, scoring, shuffling, sound, and effects

## Progress Storage

Progress is stored in browser `localStorage`. Lesson completion, quiz completion, quiz best scores, mastery, exam completion and best score, stars, theme, and sound preference are separate values. Older quiz scores are retained; older `completedLessons` values are reset during migration because they mixed quiz and lesson completion. Use **Reset Data** in Profil or the footer to start over.

## Educational Content Notes

Materi lidah mengajarkan lima rasa dasar: manis, asin, asam, pahit, dan umami (gurih). Kuncup pengecap di berbagai bagian lidah dapat mengenali berbagai rasa; tidak ada zona lidah khusus untuk satu rasa.

## Deployment

The app is a static Vite site configured for Vercel. Production response headers are set in `vercel.json`.
