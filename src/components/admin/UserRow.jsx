import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import DropdownField from '../form/fields/DropdownField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { Timestamp, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase-config';

const UserRow = ({userId="", name="", email="", phone=0, registerDate={}, limitDate={}, discountCode="", licenseType=1, city="", company="", companySector=""}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const licenseOptions = ["Free", "Basic", "Standard", "Premium", "Partner", "Master"]
    const [licenseNumberType, setLicenseTypeNumber] = useState(licenseType);
    const [licenseValue, setLicenseType] = useState(licenseOptions[licenseType-1]);
    const [editUser, setEditUser] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));
    const [saveLoader, setSaveLoader] = useState(false);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
      };

      const getModifiedDate = (date) => {
        if (date) {
          const fireBaseTime = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
          const formattedDate = dayjs(fireBaseTime).format('YYYY-MM-DD');
          return formattedDate;
        }
        return "";
      };

      const getGeneralDateFromat = (date) => {
        if (date) {
            const fireBaseTime = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);        
            setSelectedDate(dayjs(fireBaseTime));
          }
      }

    const handleEditOption = () => {
        setEditUser(!editUser)
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        border:'none',
        width: '90%',
        maxWidth: 500, 
        boxShadow: 24,
        borderRadius: '15px',
        p: 4,
      };


    useEffect(() => {
        getGeneralDateFromat(limitDate);
    }, [])
      

    const saveChangesToFirestore = () => {
        setSaveLoader(true);
        // Assuming you have a 'users' collection in Firestore and each user has a document with an 'id'
        const userRef = doc(db, 'users', userId);
    
        // Convert the date to a Firestore Timestamp
        const timestamp = selectedDate.toDate(); // Convert from dayjs to JavaScript Date
        const timestampObject = Timestamp.fromDate(timestamp);

        const newData = {
            limitDate: timestampObject,
            licenseType: licenseOptions.indexOf(licenseValue) + 1, // Convert license type back to numerical index
          };

        // Use updateDoc to update the document with the new data
        updateDoc(userRef, newData)
        .then(() => {
            setLicenseTypeNumber(licenseOptions.indexOf(licenseValue)+1)
            setSaveLoader(false);
        })
        .catch((error) => {
            console.error('Error saving changes to Firestore: ', error);
        });
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
                    {editUser ? 
                        <MobileDatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        />
                        :
                        selectedDate.format('YYYY-MM-DD')

                    }
                </td>
                <td >
                    {editUser ? 
                            <DropdownField 
                            options={licenseOptions}
                            value={licenseValue}
                            focused={false}
                            setValue={setLicenseType}
                            />
                            :
                            licenseOptions[licenseNumberType-1]
                        }
                </td>
                <td onClick={handleOpen}>{discountCode}</td>
                <td >
                    <div className='optionsAdmin'>
                        <div onClick={editUser ? saveChangesToFirestore : handleEditOption}>{editUser ? "Guardar":"Editar"}
                        {
                            saveLoader && 
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        }
                        </div>
                        {editUser && 
                        <div onClick={handleEditOption}>x</div>
                    }
                    </div>
                </td>
            </tr>
            <Modal
                readOnly
                disableAutoFocus
                open={open}
                onClose={handleClose}
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                sx={{
                    borderRadius:'25px',
                    border:'none', display:'flex', 
                    justifyContent:'center', 
                    alignContent:'center'}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                <Typography id="modal-modal-title" color='primary' variant="h5" sx={{fontWeight:'900', textAlign:'center'}} component="h2">
                    Información Personal
                </Typography>
                    <div className='personal-info-style'>
                        <table className="table table-active">
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
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default UserRow;