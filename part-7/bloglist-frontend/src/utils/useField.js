import { useState } from 'react'

export const useField = (label, type) => {
  const [value, setValue] = useState('')

  const onChange = ({ target }) => {
    setValue(target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    type: !type ? 'text' : type,
    label,
    value,
    onChange,
    reset,
  }
}
