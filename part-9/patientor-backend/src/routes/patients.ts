import express from 'express';

import patientService from '../../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatientsData());
});

patientRouter.post('/', (_req, res) => {
  res.json('Saving a patient');
});

export default patientRouter;
