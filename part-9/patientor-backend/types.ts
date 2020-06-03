export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum EntryType {
  'HealthCheck' = 'HealthCheck',
  'OccupationalHealthCare' = 'OccupationalHealthcare',
  'Hospital' = 'Hospital',
}

interface BaseEntry {
  id: string;
  // type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface DischargeEntries {
  date: string;
  criteria: string;
}
interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: DischargeEntries;
}

interface SickLeaveEntries {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthCare';
  employerName: string;
  sickLeave?: SickLeaveEntries;
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;
