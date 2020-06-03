import express from 'express';

import patientService from '../../services/patientService';
import { toNewPatientEntry } from '../../utils/utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

patientRouter.post('/', (req, res) => {
  const newPatientObject = toNewPatientEntry(req.body);

  const newPatient = patientService.addPatient(newPatientObject);

  res.json(newPatient);
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  console.log(patient);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default patientRouter;
