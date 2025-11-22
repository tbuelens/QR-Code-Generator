<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

const appContainer = ref(null)
const title = ref(null)
const subtitle = ref(null)
const formCard = ref(null)
const qrCard = ref(null)
const generateButton = ref(null)
const helperText = ref(null)
const urlInput = ref(null)
const qrContent = ref(null)

const url = ref('')
const hasGenerated = ref(false)
const generatedFor = ref('')
const qrSrc = ref('')

const animateGenerateSequence = () => {
  const tl = gsap.timeline()

  // Petit feedback visuel sur le bouton
  tl.fromTo(
    generateButton.value,
    { scale: 1 },
    {
      scale: 1.06,
      duration: 0.12,
      ease: 'power1.out'
    }
  ).to(generateButton.value, {
    scale: 1,
    duration: 0.14,
    ease: 'power1.in'
  })

  // "Sort" sur la carte QR
  tl.fromTo(
    qrCard.value,
    { boxShadow: '0 0 0 rgba(168, 85, 247, 0)', scale: 0.96 },
    {
      boxShadow: '0 0 36px rgba(168, 85, 247, 0.9)',
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    },
    '-=0.02'
  ).to(qrCard.value, {
    boxShadow: '0 0 16px rgba(15, 23, 42, 0.95)',
    scale: 1,
    duration: 0.35,
    ease: 'power2.inOut'
  })

  // Apparition du contenu du QR
  if (qrContent.value) {
    tl.from(
      qrContent.value,
      {
        opacity: 0,
        scale: 0.3,
        duration: 0.45,
        ease: 'back.out(1.7)'
      },
      '-=0.25'
    )
  }
}

const onGenerateClick = () => {
  const trimmed = url.value.trim()

  if (!trimmed) {
    // Petit "shake" de l'input si l'URL est vide
    gsap.fromTo(
      urlInput.value,
      { x: -6 },
      {
        x: 6,
        duration: 0.08,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 5
      }
    )
    return
  }

  generatedFor.value = trimmed
  qrSrc.value = '/api/qr?url=' + encodeURIComponent(trimmed)
  hasGenerated.value = true

  // Attendre que le DOM soit à jour avant d'animer le contenu
  nextTick(() => {
    animateGenerateSequence()
  })
}

onMounted(() => {
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: 'power2.out' }
  })

  tl.from(appContainer.value, { opacity: 0, duration: 0.4 })
    .from(
      title.value,
      { y: 40, opacity: 0 },
      '-=0.1'
    )
    .from(
      subtitle.value,
      { y: 30, opacity: 0 },
      '-=0.3'
    )
    .from(
      formCard.value,
      { y: 30, opacity: 0 },
      '-=0.2'
    )
    .from(
      qrCard.value,
      { y: 30, opacity: 0 },
      '-=0.4'
    )
    .from(
      [generateButton.value, helperText.value],
      { opacity: 0, y: 10, stagger: 0.15 },
      '-=0.3'
    )
})
</script>

<template>
  <div class="app-root" ref="appContainer">
    <header class="hero">
      <h1 ref="title" class="hero-title">
        QR Spell Generator
      </h1>
      <p ref="subtitle" class="hero-subtitle">
        Transforme une URL en code QR magique ✨
      </p>
    </header>

    <main class="layout">
      <section ref="formCard" class="card input-card">
        <h2 class="card-title">Entre ton sort (URL)</h2>
        <label class="field-label" for="url-input">URL à enchanter</label>
        <input
          id="url-input"
          ref="urlInput"
          v-model="url"
          type="text"
          class="text-input"
          placeholder="https://exemple.com"
        />

        <button
          ref="generateButton"
          class="btn-primary"
          type="button"
          @click="onGenerateClick"
        >
          Lancer le sort
        </button>

        <p ref="helperText" class="helper-text">
          Ce bouton génère un <strong>QR code PNG</strong> pour l'URL donné.
        </p>
      </section>

      <section ref="qrCard" class="card qr-card">
        <h2 class="card-title">Résultat du sort</h2>

        <div ref="qrContent" class="qr-wrapper">
          <div v-if="!hasGenerated" class="qr-placeholder">
            <span class="qr-placeholder-label">
              Laisse le magicien travailler… clique sur “Lancer le sort” 🧙‍♂️
            </span>
          </div>

          <div v-else class="qr-result">
            <div class="qr-image-wrapper">
              <img
                :src="qrSrc"
                alt="Code QR généré"
                class="qr-image"
              />
            </div>
            <div class="qr-meta">
              <p class="qr-generated-label">QR généré pour :</p>
              <p class="qr-url">{{ generatedFor }}</p>
              <p class="qr-note">
                L’image ci-dessus est le <strong>QR code PNG</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
