import React from 'react';
import { generate as generateId } from 'shortid';

import { Diagnosis } from '../types';
import { useStateValue } from '../state';

interface DiagnosisProps {
  diagnosisCodes?: Array<Diagnosis['code']>;
}

const DiagnosisList: React.FC<DiagnosisProps> = ({ diagnosisCodes }) => {
  const [{ diagnosis }] = useStateValue();

  const hasDiagnosis = diagnosis && JSON.stringify(diagnosis) !== '{}';

  return (
    <div>
      <ul>
        {hasDiagnosis &&
          diagnosisCodes &&
          diagnosisCodes.map((dC) => {
            return (
              <li key={generateId()}>
                {dC} - {diagnosis[dC].name}{' '}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DiagnosisList;
