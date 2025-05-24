## Struktur Project (Preview)

Struktur masa depan project dari aidomx:

```
my-project/
├── app/
│   └── index.ai         ← logic entry
├── res/             ← resource
│   └── index.ai     ← entry resource
├── .env.local       ← konfigurasi runtime (WEB_ENGINE, PORT, dsb)
├── package.json
├── tsconfig.json
├── index.ai ← file utama yang akan dimuat pertama kali.
```

Struktur ini memungkinkan isolasi logika, styling, dan konfigurasi secara bersih dan scalable.

---

## Instalasi

```bash
npm install aidomx --global
```
