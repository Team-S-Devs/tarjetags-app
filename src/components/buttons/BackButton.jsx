import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { FaChevronLeft } from 'react-icons/fa';

const BackButton = ({ color="#000" }) => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1); // Navigate back to the previous page
    };

  return (
    <div style={{ marginLeft: -8 }}>
        <IconButton  
            sx={{
                padding: 0
            }} 
            aria-label="back" 
            onClick={handleBack}
        >
            <FaChevronLeft color={color} size={44} />
        </IconButton>
    </div>
  );
};

export default BackButton;
