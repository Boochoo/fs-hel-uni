import React from 'react';

const Persons = ({ personsList, deleteHandler }) =>
  personsList.map(({ name, number, id }) => (
    <div key={id}>
      {name} {number}
      <button
        style={{ backgroundColor: 'red', marginLeft: '1rem' }}
        onClick={() => deleteHandler(id)}
      >
        delete
      </button>
    </div>
  ));

export default Persons;
