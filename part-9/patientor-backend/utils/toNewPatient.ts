import { NewPatientEntry } from '../types';

const toNewPatientEntry = (
  newPatientObject: NewPatientEntry
): NewPatientEntry => {
  const { name, dateOfBirth, gender, occupation, ssn } = newPatientObject;

  const newEntry: NewPatientEntry = {
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  };

  return newEntry;
};

export default toNewPatientEntry;
