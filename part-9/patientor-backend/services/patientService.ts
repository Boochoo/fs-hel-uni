import patients from '../data/patients';
import { v4 as uuid } from 'uuid';

import {
  Patient,
  // PublicPatient,
  NewPatientEntry,
  NonSensitivePatient,
  Entry,
} from '../types';

let patientsData = [...patients];

/* const patientsWithoutSSN: Array<PublicPatient> = patients as Array<
  PublicPatient
>; */

const findById = (id: string): Patient | undefined => {
  const patient = patientsData.find((p) => p.id === id);

  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  console.log({ patientsData });
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: [] as Entry[],
  };

  patientsData = [...patientsData, newPatient];
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
  findById,
};
