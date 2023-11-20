import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const BigPrimaryButton = ({ children, display = 'initial',onClick, type = "submit", loading = false, fullWidth }) => (
    <Button 
        style={{ fontSize: 22, display:display }} 
        onClick={onClick} 
        type={type} 
        disabled={loading} 
        fullWidth={fullWidth}
        variant="contained">
            {children} {loading && <CircularProgress style={{ marginLeft: 18 }} size={20} />}
    </Button>
)

export default BigPrimaryButton;