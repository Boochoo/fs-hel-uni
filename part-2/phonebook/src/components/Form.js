import React from 'react';
import Input from './Input';

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

export default Form;
