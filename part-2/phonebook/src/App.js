import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Persons = ({ personsList }) =>
  personsList.map(({ name, number }) => (
    <p key={name}>
      {name} {number}
    </p>
  ));

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/persons`)
      .then(({ data }) => setPersons(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasIndex = persons.findIndex((v) => v.name === newName) > -1;

    if (hasIndex) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return;
    }

    setPersons([
      ...persons,
      {
        name: newName,
        number: newNumber,
      },
    ]);
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = ({ target }) => setNewName(target.value);
  const handleNumberChange = ({ target }) => setNewNumber(target.value);
  const handleSearch = ({ target }) => {
    const currentSearch = target.value;
    setSearchTerm(currentSearch);
  };

  const filterList = (list) =>
    list.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(searchTerm.toLowerCase());
    });

  const personsList = !searchTerm ? persons : filterList(persons);

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons personsList={personsList} />
    </div>
  );
};

export default App;
