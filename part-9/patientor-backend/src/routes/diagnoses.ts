import express from 'express';

import diagnoseService from '../../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  res.json(diagnoseService.getDiagnoses());
});

diagnoseRouter.post('/', (_req, res) => {
  res.json('Saving a dianoses');
});

export default diagnoseRouter;
