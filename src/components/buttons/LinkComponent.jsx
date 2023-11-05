import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LinkComponent = ({ children, to, color = "primary" }) => {
  return (
    <Link to={to}>
      <Typography  style={{ fontSize: 22 }} color={color} >{children}</Typography>
    </Link>
  )
}

export default LinkComponent