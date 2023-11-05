import { Button } from '@mui/material'
import React from 'react'

const MediumSecondaryButton = ({ children, onClick, type = "submit" }) => (
    <Button style={{ fontSize: 16 }} onClick={onClick} type={type} variant="outlined">{children}</Button>
)

export default MediumSecondaryButton;