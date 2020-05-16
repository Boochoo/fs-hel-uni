import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ inputName, value, inputHandle }) => (
  <div>
    <label htmlFor={inputName}>{inputName}</label>
    {'  '}
    <input type='text' value={value} name={inputName} onChange={inputHandle} />
  </div>
)

Input.propTypes = {
  inputName: PropTypes.string.isRequired,
  value: PropTypes.string,
  inputHandle: PropTypes.func.isRequired,
}

export default Input
