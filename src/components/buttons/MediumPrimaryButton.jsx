import { Button } from '@mui/material'
import React from 'react'

const MediumPrimaryButton = ({ children, onClick, type = "submit" }) => (
    <Button style={{ fontSize: 15 }} onClick={onClick} type={type} variant="contained">{children}</Button>
)

export default MediumPrimaryButton;