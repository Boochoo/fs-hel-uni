import React from 'react';

const Input = ({ fieldName, name, handler }) => (
  <div>
    {fieldName}: <input value={name} onChange={handler} />
  </div>
);

export default Input;
