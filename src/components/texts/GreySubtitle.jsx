import { Typography } from '@mui/material'
import React from 'react'

const GreySubtitle = ({ variant = "h5", component="p", color = "#727070", children }) => {
  return (
    <Typography variant={variant} component={component} style={{ color, fontWeight: '200' }}>
      {children}
    </Typography>
  )
}

export default GreySubtitle