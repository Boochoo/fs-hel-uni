import { Gender, NewPatientEntry } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isString = (text: any): text is string => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing text: ${text}`);
  }

  return text;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isGender = (str: any): str is Gender => {
  return Object.values(Gender).includes(str);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

export const toNewPatientEntry = (
  newPatientObject: NewPatientEntry
): NewPatientEntry => {
  const { name, dateOfBirth, gender, occupation, ssn } = newPatientObject;

  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseString(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
  };

  return newEntry;
};

export default {
  isString,
  isGender,
  toNewPatientEntry,
};
