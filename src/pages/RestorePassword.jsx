import React, { useState } from 'react'
import Header from '../sections/Header'
import BoldTitleWithBackButton from '../components/texts/BoldTitleWithBackButton'
import GreySubtitle from '../components/texts/GreySubtitle'
import FieldText from '../components/form/fields/FieldText'
import BigPrimaryButton from '../components/buttons/BigPrimaryButton'
import { sendPasswordResetEmail } from 'firebase/auth'
import { db, auth } from '../utils/firebase-config'
import useWindowSize from '../hooks/useWindowsSize'

const RestorePassword = () => {

  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('Introduce un correo electrónico válido');
 
  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailPattern.test(emailValue.trim()));
    return emailPattern.test(emailValue.trim());
  };

  const [restoreLoader, setRestoreLoader] = useState(false);

  const sendEmailRequest = async (e) => {
    e.preventDefault;
  
    setRestoreLoader(true);
  
    validateEmail();
    if (!validateEmail()) {
      setRestoreLoader(false);
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth,emailValue);
      setRestoreLoader(false);
    } catch (error) {
      console.error("Error sending email:", error);
      setRestoreLoader(false);
    }
  };
  
  const {width, height} = useWindowSize();

  return (
    <div className='profile-background'>
      <Header/>
      <div className='container prof-2-cont'>
      <BoldTitleWithBackButton variant={ width < 400 ? 'h4':'h3'} centered={false}>Restablecer contraseña</BoldTitleWithBackButton>
            <br/>
            <GreySubtitle variant='h6' textAlign={"center"} paddingHorizontal={40}>Introduce el email con el que te registraste y se te enviará un enlace a tu correo electrónico para  cambiar tu contraseña</GreySubtitle>

            <div className='mt-4 mb-3'>
            <FieldText
                label='Correo electrónico'
                value={emailValue}
                setValue={setEmailValue}
                variant='outlined'
                placeholder='Ej: nombre@ejemplo.com'
                fullWidth={false}
                required
                error={emailError}
                setError={setEmailError}
                errorMessage={emailErrorMessage}
                validateMethod={validateEmail}
            />
      </div>

      <div className='mt-4'>
      <BigPrimaryButton type='button' onClick={sendEmailRequest} loading={restoreLoader} children={"Restablecer Contraseña"} />
      </div>
      </div>
    </div>
  )
}

export default RestorePassword