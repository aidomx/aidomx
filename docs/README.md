## Struktur Project (Preview)

Struktur masa depan project dari aidomx:

```
my-project/
├── app/
│   └── index.ai         ← logic entry
├── res/             ← resource
│   └── index.ai     ← menentukan style/theme yang aktif
├── .env.local       ← konfigurasi runtime (WEB_SCHEMA, PORT, dsb)
├── package.json
├── tsconfig.json
```

Struktur ini memungkinkan isolasi logika, styling, dan konfigurasi secara bersih dan scalable.

---

## Instalasi

```bash
npm install aidomx --global
```
