import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const SmallPrimaryButton = ({ children, onClick, type = "submit", variant="contained", loading = false }) => (
    <Button 
        style={{ fontSize: 16, paddingLeft: 20, paddingRight: 20 }} 
        onClick={onClick} 
        type={type} 
        variant={variant}
        disabled={loading}
    >
        {children} {loading && <CircularProgress style={{ marginLeft: 18 }} size={20} />}
    </Button>
)

export default SmallPrimaryButton