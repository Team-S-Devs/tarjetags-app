import React, { useState } from 'react'
import Header from '../sections/Header'
import BoldTitle from '../components/texts/BoldTitle'
import EditCardTabs from '../sections/EditCardTabs';
import PreviewCardTab from '../sections/PreviewCardTab';
import useWindowSize from '../hooks/useWindowsSize';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import MediumPrimaryButton from '../components/buttons/MediumPrimaryButton';
import { useNavigate } from 'react-router-dom';

const EditCard = () => {
    const { width, height } = useWindowSize();
    const [nav, setNav] = useState("edit");
    const navigate = useNavigate();
    
    const handleChange = (event, newValue) => {
        if(newValue == null) return;
        if(newValue != nav) setNav(newValue);
    };

  return (
    <div className='container' style={{ paddingTop: '90px'}}>
        <Header/>
        <BoldTitle textAlign='center'>Editar Tarjeta</BoldTitle>
        <div className="mt-3"></div>
        {
                width > 986 ? (
                    <div className="d-flex">
                        <EditCardTabs/>
                        <PreviewCardTab/>
                    </div>
                ) : (
                    <>
                        <ToggleButtonGroup
                            color="primary"
                            value={nav}
                            exclusive
                            onChange={handleChange}
                            fullWidth
                        >
                            <ToggleButton value="edit">Edición</ToggleButton>
                            <ToggleButton value="preview">Vista Previa</ToggleButton>
                        </ToggleButtonGroup>
                        {
                            nav === "edit" ? <EditCardTabs/> : <PreviewCardTab/>
                        }
                       <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: '10px', boxSizing: 'border-box' }} className='container'>
                            <MediumPrimaryButton
                                onClick={() => navigate("/")}
                                disabled={true}
                                fullWidth
                            >Publicar Cambios</MediumPrimaryButton>
                        </div>
                    </>
                )
        }
    </div>
  )
}

export default EditCard