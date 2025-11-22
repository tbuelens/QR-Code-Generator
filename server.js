const express = require('express')
const cors = require('cors')
const qr = require('qr-image')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.get('/api/qr', (req, res) => {
  const url = req.query.url

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Paramètre "url" manquant.' })
  }

  try {
    const qrPng = qr.image(url, {
      type: 'png',
      ec_level: 'M',
      size: 6,
      margin: 1,
    })

    res.type('png')
    qrPng.pipe(res)
  } catch (err) {
    console.error('Erreur QR:', err)
    res.status(500).json({ error: 'Erreur lors de la génération du QR code.' })
  }
})

app.listen(PORT, () => {
  console.log(`API QR en écoute sur http://localhost:${PORT}`)
})
