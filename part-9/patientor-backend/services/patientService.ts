import patientsData from '../data/patients.json';
import { v4 as uuid } from 'uuid';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

let patients: Array<Patient> = patientsData as Array<Patient>;

const patientsWithoutSSN: Array<NonSensitivePatientEntry> = patientsData as Array<
  NonSensitivePatientEntry
>;

const getNonSensitivePatientsData = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
  };

  patients = [...patients, newPatient];
  return newPatient;
};

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const patient = patientsWithoutSSN.find((p) => p.id === id);

  return patient;
};

export default {
  getNonSensitivePatientsData,
  addPatient,
  findById,
};
