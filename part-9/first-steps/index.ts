import express from 'express';

import { BMICalculator, BMIStatus } from './bmi-calculator';

import calculate from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!!!');
});

app.post('/exorcism', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing',
    });
  }

  if (!Array.isArray(daily_exercises) || !Number(target)) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  res.json(calculate(daily_exercises, target));
});

app.get('/bmi', (req, res) => {
  try {
    const { weight, height } = req.query;

    if (!weight || !height) throw new Error('malformatted parameters');

    const bmi = BMICalculator(Number(weight), Number(height));

    res.json({
      weight,
      height,
      bmi: BMIStatus(bmi),
    });
  } catch ({ message }) {
    res.status(400).json({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error: message,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
