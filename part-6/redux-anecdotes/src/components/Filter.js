import React from 'react'
import { connect } from 'react-redux'

import { filterByKeyword } from '../reducers/filterReducer'

const Filter = ({ filterByKeyword }) => {
  const handleChange = (event) => {
    filterByKeyword(event.target.value)
  }
  return (
    <div style={{ marginBottom: 10 }}>
      filter: <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filterByKeyword })(Filter)
