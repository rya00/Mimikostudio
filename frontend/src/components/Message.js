import React from 'react'
import { Alert } from 'react-bootstrap'

// Variant is taken as prop
function Message({variant, children}) {
  return (
    <Alert variant={variant}>
        {children}
      
    </Alert>
  )
}

export default Message
