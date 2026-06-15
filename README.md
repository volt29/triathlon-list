# Triathlony w Europie 2026

Statyczna strona HTML z tabelą zawodów triathlonowych w Europie w okresie czerwiec-październik 2026.

Zakres tabeli:

- pełny dystans,
- dystans 1/2,
- data i miejsce zawodów,
- link do strony zawodów,
- cena pakietu, jeśli była publicznie dostępna,
- dystans autem z Warszawy do miejsca startu.

Strona wejściowa to `index.html`. Dane zawodów są podzielone na pliki `events-01.js` - `events-07.js`, a interakcje tabeli obsługuje `app.js`.

## Deploy na Vercel

Repo jest gotowe jako statyczna strona bez kroku budowania. Przy imporcie w Vercel wybierz:

- Framework Preset: `Other`
- Build Command: puste
- Output Directory: puste albo `.`

Szybki import: https://vercel.com/new/clone?repository-url=https://github.com/volt29/triathlon-list
