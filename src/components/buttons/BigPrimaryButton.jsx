import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const BigPrimaryButton = ({ children, onClick, type = "submit", loading = false }) => (
    <Button 
        style={{ fontSize: 22 }} 
        onClick={onClick} 
        type={type} 
        disabled={loading} 
        variant="contained">
            {children} {loading && <CircularProgress style={{ marginLeft: 18 }} size={20} />}
    </Button>
)

export default BigPrimaryButton;