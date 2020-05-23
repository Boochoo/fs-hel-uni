import React from 'react'
import { Button } from '@material-ui/core'

const ButtonElement = ({ handler, text, id }) => {
  return (
    <Button
      id={id ? id : ''}
      variant='contained'
      color='primary'
      onClick={handler}
      size='small'
    >
      {text}
    </Button>
  )
}

export default ButtonElement
