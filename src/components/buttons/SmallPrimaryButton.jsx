import { Button } from '@mui/material'
import React from 'react'

const SmallPrimaryButton = ({ children, onClick, type = "submit", variant="contained" }) => (
    <Button 
        style={{ fontSize: 16, paddingLeft: 20, paddingRight: 20 }} 
        onClick={onClick} 
        type={type} 
        variant={variant}
    >
        {children}
    </Button>
)

export default SmallPrimaryButton