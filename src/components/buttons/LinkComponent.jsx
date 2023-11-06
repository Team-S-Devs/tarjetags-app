import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LinkComponent = ({ children, size=22, to, color = "primary" }) => {

  return (
    <Link style={{
      textDecorationColor: 'var(--prim-purple)',
    
    }} to={to}>
      <Typography className='general-link' style={{ fontSize: size }} color={color} >{children}</Typography>
    </Link>
  )
}

export default LinkComponent