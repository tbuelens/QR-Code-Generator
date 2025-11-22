# QR Code Generator 🧙‍♂️✨

Petit projet full-stack qui génère un **code QR** à partir d’une URL, avec une interface animée.

- **Front** : Vue 3 + Vite + GSAP  
- **Back** : Node.js + Express + `qr-image`  
- **Fonctionnalité principale** : on tape une URL, on clique sur “Lancer le sort” et un **QR code PNG** est généré côté serveur puis affiché dans l’interface.

---

## 🚀 Stack technique

- **Vue 3** (Vite) pour le front
- **GSAP** pour les animations (apparition de la page, feedback bouton, carte QR)
- **Node.js / Express** pour l’API
- **qr-image** pour générer les codes QR (format PNG)

---

## 🧩 Fonctionnalités

- Saisie d’une URL dans un formulaire.
- Validation :
  - champ vide → petit “shake” de l’input (animation GSAP).
- Bouton **“Lancer le sort”** :
  - animation de rebond sur le bouton,
  - effet de glow + zoom sur la carte du résultat.
- Appel backend :
  - `GET /api/qr?url=...` génère et renvoie une image PNG du QR.
- Affichage du **QR code réel** dans l’interface, avec l’URL utilisée.

---

## 📦 Installation

Cloner le repo puis installer les dépendances :

```bash
git clone https://github.com/tbuelens/QR-Code-Generator.git
cd QR-Code-Generator
npm install
