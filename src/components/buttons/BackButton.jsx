import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { FaChevronLeft } from 'react-icons/fa';

const BackButton = ({ color="black", disabled, size = 44 }) => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };

  return (
    <div style={{ marginLeft: -8 }}>
        <IconButton  
            sx={{
                padding: 0
            }} 
            aria-label="back" 
            disabled={disabled}
            onClick={handleBack}
        >
            <FaChevronLeft color={color} size={size} />
        </IconButton>
    </div>
  );
};

export default BackButton;
