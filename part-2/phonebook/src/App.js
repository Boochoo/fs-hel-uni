import React, { useState } from 'react';

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
