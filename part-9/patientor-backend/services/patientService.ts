import patientsData from '../data/patients.json';

import { Patient, NonSensitivePatientEntry } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getNonSensitivePatientsData = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (): [] => {
  return [];
};

export default {
  getNonSensitivePatientsData,
  addPatient,
};
