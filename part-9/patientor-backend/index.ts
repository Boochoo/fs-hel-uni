import express from 'express';
import cors from 'cors';
const app = express();

const router = express.Router();
const API_URL = 'http://localhost:3000';

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: API_URL,
  preflightContinue: false,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));
app.use(express.json());

console.log('object');

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');

  res.send('pong');
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
router.options('*', cors(options));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
