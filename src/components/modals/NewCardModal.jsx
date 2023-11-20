import { Card, Dialog } from '@mui/material'
import React, { useState } from 'react'
import BoldTitle from '../texts/BoldTitle'
import ThinTitle from '../texts/ThinTitle'
import FieldText from '../form/fields/FieldText'
import useWindowSize from '../../hooks/useWindowsSize'
import SmallPrimaryButton from '../buttons/SmallPrimaryButton'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase-config'
import { useNavigate } from 'react-router-dom'

const NewCardModal = ({ open, setOpen, userId }) => {
  const navigate = useNavigate();
    const { width, height } = useWindowSize();

    const [newCardValue, setNewCardValue] = useState("");
    const [errorNewVal, setErrorNewVal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (newVal) => {
        if(errorNewVal) setErrorNewVal(false);
        let inputValue = newVal;
        inputValue = inputValue.replace(/\s/g, '_');
        setNewCardValue(inputValue);
        handleValidateVal(inputValue)
    };

    const handleValidateVal = (value) => {
        if (!/^[a-zA-Z0-9-_\u00f1\u00d1]*$/.test(value)) {
            setErrorNewVal(true);
            setErrorMsg('Sólo se aceptan letras sin acentos, números, - y _')
        }
    }

    const saveNewCard = async () => {
      setLoading(true);
        try {
            const cardsCollection = doc(db, 'cards', newCardValue);
        
            const cardDoc = await getDoc(cardsCollection);
            if (cardDoc.exists()) {
                setErrorNewVal(true);
                setErrorMsg("Enlace no disponible, por favor introduce otro.")
                setLoading(false)
                return;
            }
        
            const newCard = {
                title: "",
                userId: userId,
                urlPage: newCardValue,
            };
        
            await setDoc(cardsCollection, newCard);
            navigate(`/editar/${newCardValue}`)
        } catch (error) {
            setError(true);
            setErrorMsg("Hubo un error al crear la tarjeta, por favor inténtalo de nuevo.")
        }
        setLoading(false);
    };

  return (
    <Dialog
     open={open} onClose={() => setOpen(false)}
     sx={{
        // 👇 Another option to style Paper
        "& .MuiDialog-paper": {
          borderRadius: "16px",
        },
      }}
     >
        <Card 
            style={{
                padding: width > 768 ? 60 : 20
            }
        }>
            <BoldTitle textAlign='center' variant='h4'>Crear tarjeta</BoldTitle>
            <div className="mt-3"></div>
            
            <ThinTitle textAlign={width > 768 ? 'left' : 'center'} variant="h6">Introduce el nombre de tu tarjeta</ThinTitle>
            <div className="mt-1"></div>
          
            <div className="d-flex align-items-center justify-content-center">
                <ThinTitle variant="h6" color='primary'>tarjetags.com/</ThinTitle>
                <div style={{ width: width > 768 ? 30 : 15 }}></div>
                <FieldText 
                    color="success" 
                    variant='standard' 
                    label='Nombre único' 
                    value={newCardValue} 
                    setValue={handleInputChange} 
                    error={errorNewVal}
                    setError={setErrorNewVal}
                    errorMessage={errorMsg}
                    validateMethod={handleValidateVal}
                    maxLength={45}
                    multiline={false}
                />
            </div>
            <div className="mt-2"></div>
            <ThinTitle color='#444' textAlign="center" variant="subtitle1">Tu título se convertirá en tu enlace personalizado. Escoge uno que te represente.</ThinTitle>
            <div className="mt-4"></div>

            <div className="d-flex">
              <div className="flex-5" style={{ flex: 100 }}></div>
              <SmallPrimaryButton onClick={() => setOpen(false)} variant='outlined'>Cancelar</SmallPrimaryButton>
              <div style={{ width: 8 }}></div>
              <SmallPrimaryButton
                disabled={errorNewVal || newCardValue.length === 0}
                onClick={saveNewCard}
                loading={loading}
              >Crear</SmallPrimaryButton>
            </div>
        </Card>
    </Dialog>
  )
}

export default NewCardModal