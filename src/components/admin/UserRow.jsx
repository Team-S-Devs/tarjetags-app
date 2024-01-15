import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import DropdownField from '../form/fields/DropdownField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

const UserRow = ({name="", email="", phone=0, registerDate={}, limitDate={}, discountCode="", licenseType=1, city="", company="", companySector=""}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const licenseOptions = ["Free", "Basic", "Standard", "Premium", "Partner", "Master"]
    const [licenseValue, settLicenseType] = useState(licenseOptions[licenseType-1]);

    const getModifiedDate = (date) => {
        if (date) {
            const fireBaseTime = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
            const formattedDate = fireBaseTime.toLocaleDateString("en-GB");
            return formattedDate;
        }
        return "";
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border:'none',
        width: '90%',
        maxWidth: 400, 
        boxShadow: 24,
        borderRadius: '15px',
        p: 4,
      };

    return (
        <>
            <tr>
                <td onClick={handleOpen} scope="row">{name}</td>
                <td onClick={handleOpen}>{email}</td>
                <td onClick={handleOpen}>
                    {getModifiedDate(registerDate)}
                </td>
                <td >
                    <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
                </td>
                <td >
                    <DropdownField 
                        options={licenseOptions}
                        value={licenseValue}
                        focused={false}
                        setValue={settLicenseType}
                    />
                </td>
                <td onClick={handleOpen}>{discountCode}</td>
                <td >
                    <div className='optionsAdmin'>
                        <div>Extender</div>
                        <div>Desactivar</div>
                    </div>
                </td>
            </tr>
            <Modal
                readOnly
                disableAutoFocus
                open={open}
                onClose={handleClose}
                sx={{borderRadius:'25px', border:'none'}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                <Typography id="modal-modal-title" color='primary' variant="h5" sx={{fontWeight:'900', textAlign:'center'}} component="h2">
                    Información Personal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb:1, textAlign:'center' }}>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <td>Nombre:</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>Teléfono:</td>
                                <td>{phone}</td>
                            </tr>
                            <tr>
                                <td>Ciudad:</td>
                                <td>{city}</td>
                            </tr>
                            <tr>
                                <td>Rubro:</td>
                                <td>{companySector}</td>
                            </tr>
                            <tr>
                                <td>Compañia:</td>
                                <td>{company}</td>
                            </tr>

                        </tbody>
                    </table>
                </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default UserRow;