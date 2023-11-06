import { Button } from '@mui/material'
import React from 'react'

const MediumPrimaryButton = ({ children, onClick, type = "submit", loading = false }) => (
    <Button style={{ fontSize: 16 }} onClick={onClick} type={type} variant="contained" disabled={loading}>
        {children} {loading && <CircularProgress style={{ marginLeft: 18 }} size={20} />}
    </Button>
)

export default MediumPrimaryButton;