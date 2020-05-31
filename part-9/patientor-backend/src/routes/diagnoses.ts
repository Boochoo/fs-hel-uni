import express from 'express';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  res.json('Fetching dianoses');
});

diagnoseRouter.post('/', (_req, res) => {
  res.json('Saving a dianoses');
});

export default diagnoseRouter;
