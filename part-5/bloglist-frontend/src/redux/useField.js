import { useState } from 'react'

export const useField = () => {
  const [value, setValue] = useState('')

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  return {
    value,
    onChange,
  }
}
