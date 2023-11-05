import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const StyledCard = ({ children }) => {
  return (
    <Card>
        <CardContent>
            {children}
        </CardContent>
    </Card>
  );
};

export default StyledCard;
