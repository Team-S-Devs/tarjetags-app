import React from 'react'
import { Typography } from '@mui/material';

const ThinTitle = ({ children, color="#000", variant="h4", component="h1" }) => {
  return (
    <Typography variant={variant} component={component} style={{ color }}>{children}</Typography>
  )
}

export default ThinTitle