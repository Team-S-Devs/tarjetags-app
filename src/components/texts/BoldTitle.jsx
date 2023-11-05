import { Typography } from '@mui/material';
import React from 'react';

const BoldTitle = ({ children, color="#561AD9", variant='h4', component="h1" }) => {
  return (
    <Typography variant={variant} component={component} style={{ color, fontWeight: 'bold' }}>
      {children}
    </Typography>
  );
};

export default BoldTitle;
