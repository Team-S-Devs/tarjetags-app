import React from 'react'
import { Link } from 'react-router-dom'

const LinkComponent = ({ children, to }) => {
  return (
    <Link to={to} style={{ fontSize: 22 }}>{children}</Link>
  )
}

export default LinkComponent