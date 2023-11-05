import { Typography } from '@mui/material';
import React from 'react';

const BoldTitle = ({ children, color="primary", variant='h4', component="h1", textAlign = "left" }) => {
  return (
    <Typography color={color} variant={variant} component={component} style={{ fontWeight: 'bold', textAlign }}>
      {children}
    </Typography>
  );
};

export default BoldTitle;
