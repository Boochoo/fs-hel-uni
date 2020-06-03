import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Button, Icon, Card } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { generate as generateId } from 'shortid';

import {
  Patient,
  Entry,
  HospitalEntry as HospitalDetails,
  OccupationalHealthcareEntry as OccupationalHealthcareDetails,
  HealthCheckEntry as HealthCheckDetails,
  EntryType,
} from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';

// import DiagnosisList from './DiagnosisList';
import assertNever from '../utils';

const healthCheckIcons = {
  0: { name: 'heart' as 'heart', color: 'green' as 'green' },
  1: { name: 'heart' as 'heart', color: 'orange' as 'orange' },
  2: { name: 'heart' as 'heart', color: 'purple' as 'purple' },
  3: { name: 'heart' as 'heart', color: 'red' as 'red' },
};

const HospitalEntry: React.FC<{ entry: HospitalDetails }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon color='black' name='stethoscope' /> {entry.specialist}
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>

        {/* entry.diagnosisCodes && (
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        ) */}
      </Card.Content>
    </Card>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckDetails }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon color='black' name='user doctor' />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Icon
          name={healthCheckIcons[entry.healthCheckRating].name}
          color={healthCheckIcons[entry.healthCheckRating].color}
        />
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthCare: React.FC<{
  entry: OccupationalHealthcareDetails;
}> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon color='black' name='stethoscope' />
          {entry.employerName}
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;

    case EntryType.HealthCheck:
      return <HealthCheck entry={entry} />;

    case EntryType.OccupationalHealthCare:
      return <OccupationalHealthCare entry={entry} />;

    default:
      return assertNever(entry);
  }
};

const iconProps = {
  male: { name: 'mars' as 'mars' },
  female: { name: 'venus' as 'venus' },
  other: { name: 'other gender' as 'other gender' },
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();

  const currentPatient =
    JSON.stringify(patients) !== '{}' ? patients[id] : null;

  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(updatePatient(patientDetails));
      } catch (e) {
        console.error(e);
      }
    };

    getPatient();
  }, []);

  return (
    currentPatient && (
      <Container>
        <Header as='h2'>
          {currentPatient.name}{' '}
          <Icon {...iconProps[currentPatient.gender]} size='mini' />
        </Header>
        <p>ssn: {currentPatient.ssn}</p>
        <p>occupation: {currentPatient.occupation}</p>

        <Header as='h3'>entries</Header>
        {currentPatient.entries.map((entry) => {
          return entry && <EntryDetails key={generateId()} entry={entry} />;
        })}
      </Container>
    )
  );
};

export default PatientPage;
