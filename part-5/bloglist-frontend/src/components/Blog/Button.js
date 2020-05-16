import React from 'react'

const Button = ({ handler }) => {
  return (
    <button className='like-button' onClick={handler}>
      like
    </button>
  )
}

export default Button
