import React from 'react'
import { useDispatch } from 'react-redux'

import { filterByKeyword } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterByKeyword(event.target.value))
  }
  return (
    <div style={{ marginBottom: 10 }}>
      filter: <input onChange={handleChange} />
    </div>
  )
}

export default Filter
