import express from 'express'

import { BMICalculator, BMIStatus } from './bmi-calculator'

const app = express()

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!!!')
})

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)

    if (!weight || !height) throw new Error('malformatted parameters')

    const bmi = BMICalculator(weight, height)

    res.json({
      weight,
      height,
      bmi: BMIStatus(bmi),
    })
  } catch (err) {
    res.json({
      error: err.message,
    })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
