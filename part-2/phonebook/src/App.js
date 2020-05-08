import React, { useState, useEffect } from 'react';

import personsService from './services/persons';
import './App.css';

const Input = ({ fieldName, name, handler }) => (
  <div>
    {fieldName}: <input value={name} onChange={handler} />
  </div>
);

const Filter = ({ name, handler }) => (
  <Input fieldName='filter shown with' name={name} handler={handler} />
);

const Form = ({
  submitHandler,
  nameValue,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={submitHandler}>
    <Input fieldName='name' name={nameValue} handler={handleNameChange} />
    <Input fieldName='number' name={newNumber} handler={handleNumberChange} />
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

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

const Notification = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`message ${type === 'error' ? 'error' : 'success'}`}>
      {message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorType, setNotificationType] = useState('success');

  useEffect(() => {
    personsService
      .getAll()
      .then(({ data }) => setPersons(data))
      .catch((e) => updateErrorMessage('Server down!'));
  }, []);

  const updateSuccessState = (message, newValues) => {
    setNotificationType('success');
    setNotificationMessage(`${message} ${newName}`);
    setTimeout(() => setNotificationMessage(null), 3000);

    setPersons(newValues);
    setNewName('');
    setNewNumber('');
  };

  const updateErrorMessage = (message) => {
    setNotificationType('error');
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      name: newName,
      number: newNumber,
    };

    const hasIndex = persons.findIndex((v) => v.name === newName) > -1;

    if (hasIndex) {
      const { id } = persons.filter((v) => v.name === newName)[0];

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        personsService
          .update(id, newData)
          .then((response) => {
            const filterPerson = persons.map((person) =>
              person.id !== id ? person : response.data
            );

            updateSuccessState('Updated', filterPerson);
          })
          .catch((error) => {
            updateErrorMessage(
              `Information of ${newName} has already been removed from the server.`
            );
          });
        return;
      }
    }

    personsService
      .create(newData)
      .then((response) => {
        updateSuccessState('Added', [...persons, response.data]);
      })
      .catch((error) => {
        updateErrorMessage(`Error! Can't add!`);
      });
  };

  const handleNameChange = ({ target }) => setNewName(target.value);
  const handleNumberChange = ({ target }) => setNewNumber(target.value);
  const handleSearch = ({ target }) => setSearchTerm(target.value);

  const filterList = (list) =>
    list.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(searchTerm.toLowerCase());
    });

  const deleteHandler = (id) => {
    const { name } = persons.filter((person) => person.id === id)[0];

    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .deleteItem(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          updateErrorMessage(`Deleted ${name}`);
        })
        .catch((error) => {
          updateErrorMessage(`${name} has been already deleted!`);
        });
    }
  };

  const personsList = !searchTerm ? persons : filterList(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={errorType} />
      <Filter name={searchTerm} handler={handleSearch} />

      <h2>Add a new</h2>
      <Form
        submitHandler={handleSubmit}
        nameValue={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsList={personsList} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;
