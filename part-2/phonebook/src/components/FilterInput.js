import React from 'react';
import Input from './Input';

const FilterInput = ({ name, handler }) => (
  <Input fieldName='filter shown with' name={name} handler={handler} />
);

export default FilterInput;
