# QR Code Generator — Front Vue + API Express (qr-image)

Ce projet contient :
- Un **front** en Vue 3 (Vite) avec des animations GSAP.
- Une **API Node/Express** qui génère un vrai code QR en PNG via le module `qr-image`.

## Installation

```bash
npm install
```

## Lancer le serveur API (Express)

Dans un premier terminal :

```bash
npm run server
```

Cela démarre l'API sur `http://localhost:3000` avec la route :
- `GET /api/qr?url=...` → renvoie un **PNG** du code QR correspondant à l’URL.

## Lancer le front Vue

Dans un deuxième terminal :

```bash
npm run dev
```

Puis ouvre l’URL indiquée (en général http://localhost:5173).  
Vite est configuré avec un **proxy** vers `http://localhost:3000` pour tout ce qui commence par `/api`.

## Comment ça marche côté front

- Tu entres une URL dans le champ.
- Tu cliques sur **"Lancer le sort"** :
  - si le champ est vide → l’input "shake" légèrement (GSAP),
  - sinon :
    - l’URL est stockée,
    - la source de l’image QR devient `/api/qr?url=ENCODED_URL`,
    - une séquence GSAP joue sur la carte du QR (glow + zoom) et le bloc s’affiche.

L’image affichée est donc bien celle générée **en temps réel** par ton API Express + `qr-image`.
