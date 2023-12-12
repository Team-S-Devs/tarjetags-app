import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const AccentButton = ({ children, variant="outlined", fullWidth, style, fontSize = 15, href }) => {
    const buttonStyle = {
        borderColor: '#9DD91A',
        color: 'black',
        fontSize,
        ...style
    };

    return (
        <Button style={buttonStyle} variant={variant} fullWidth={fullWidth}>
            <Link to={href} style={{ color: "black", textDecoration: "none" }} target='_blank'>
                {children}
            </Link>
        </Button>
    );
}

export default AccentButton