import React from 'react'
import PropTypes from 'prop-types'

import { TextField } from '@material-ui/core'

const Input = ({ inputName, value, inputHandle }) => (
  <div>
    <TextField
      type='text'
      value={value}
      name={inputName}
      onChange={inputHandle}
      label={inputName}
    />
  </div>
)

Input.propTypes = {
  inputName: PropTypes.string.isRequired,
  value: PropTypes.string,
  inputHandle: PropTypes.func.isRequired,
}

export default Input
