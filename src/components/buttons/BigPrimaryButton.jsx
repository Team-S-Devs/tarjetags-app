import { Button } from '@mui/material'
import React from 'react'

const BigPrimaryButton = ({ children, onClick, type = "submit" }) => (
    <Button style={{ fontSize: 20 }} onClick={onClick} type={type} variant="contained">{children}</Button>
)

export default BigPrimaryButton;