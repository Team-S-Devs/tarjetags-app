import React from 'react'
import { Typography } from '@mui/material';

const ThinTitle = ({ children, color="#000", variant="h4", component="h1", textAlign="left" }) => {
  return (
    <Typography variant={variant} component={component} color={color} style={{ textAlign }}>{children}</Typography>
  )
}

export default ThinTitle