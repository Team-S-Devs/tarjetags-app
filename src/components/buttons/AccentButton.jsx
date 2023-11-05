import { Button } from '@mui/material';
import React from 'react'

const AccentButton = ({ children, variant="outlined" }) => {
    const buttonStyle = {
        borderColor: '#9DD91A',
        color: 'black',
    };

    return (
        <Button style={buttonStyle} variant={variant}>
            {children}
        </Button>
    );
}

export default AccentButton