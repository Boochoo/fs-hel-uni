import React from 'react'
import { Button } from '@material-ui/core'

const ButtonElement = ({ handler }) => {
  return (
    <Button variant='contained' color='primary' onClick={handler}>
      like
    </Button>
  )
}

export default ButtonElement
