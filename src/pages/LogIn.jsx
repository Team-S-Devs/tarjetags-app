import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Box } from '@mui/system';
import { FaEye, FaLock, FaEnvelope } from 'react-icons/fa';
import FieldText from '../components/form/fields/FieldText';
import {app} from '../utils/firebase-config'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import image from '../assets/images/loginImage.png'
import BoldTitleWithBackButton from '../components/texts/BoldTitleWithBackButton';
import GreySubtitleWithLink from '../components/texts/GreySubtitleWithLink';
import BigPrimaryButton from '../components/buttons/BigPrimaryButton';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';



const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false)

        const functAutentiaction = async(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            console.log(email);
            console.log(password);
            
                try {
                    await signInWithEmailAndPassword(auth, email, password)
                } catch (error) {
                    alert("User or password is incorrect")
                }
        }

    const auth = getAuth(app)

    const sumbitForm = () => {
        document.getElementById("logForm").submit();
    }
    

        /**
     * State to manage the email value in the sign up
     * @type {string}
     */
        const [emailValue, setEmailValue] = useState("");
        const [emailError, setEmailError] = useState(false);
        const [emailErrorMessage, setEmailErrorMessage] = useState("Not valid email");
        const [disabledEmail, setDisabledEmail] = useState(false)
    
        const validateEmail = () => {
            // Regular expression pattern for validating email addresses
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(!emailPattern.test(emailValue));
        }

            /**
     * State to manage the password value in the log in
     * @type {string}
     */
            const [passwordValue, setPasswordValue] = useState("");
            const [passwordError, setPasswordError] = useState(false);
            const [passwordErrorMessage, setPasswordErrorMessage] = useState("Not valid password");
            const [disabledPassword, setDisabledPassword] = useState(false)
        
            const validatePassword = () => {
                // Regular expression pattern for validating password addresses
                const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                setPasswordError(!passwordPattern.test(passwordValue));
            }
        


    return (
        <div className='login-background'>
            <div className='d-flex justify-content-center flex-column login-container '> 

            <BoldTitleWithBackButton children="Inicio de Sesión"/>
            <GreySubtitleWithLink subtitleText='¿Aún no tienes una cuenta?' linkText='Registrate' />
                
                <div className='login-secondary-container'>
                        <form id='logForm' className='form-login' onSubmit={functAutentiaction}>
                            <p className='form-subtitle'>Correo Electronico *</p>
                            <Box className="field-container">
                            <FaEnvelope 
                                color={"#555"} size={26} className="iconButton"  style={{marginRight: '5px'}}
                            />

                            <FieldText 
                                variant='outlined'
                                value={emailValue}
                                setValue={setEmailValue}
                                name={"email"}
                                label={"Email"} 
                                placeholder='nombre@ejemplo.com' 
                                error={emailError}
                                setError={setEmailError}
                                errorMessage={emailErrorMessage}
                                disabled={disabledEmail}
                                fullWidth={false}
                                required={true}
                                onFocus={() => console.log("Email Field Focused")}
                                onBlur={() => console.log("Email Field lost focus")}
                                validateMethod={validateEmail}
                             />

                            </Box>

                            <div className="d-flex align-items-center pswd-container">
                                <div>
                                    Contraseña *
                                </div>
                                <div className='link-login'>
                                <Link to="/">
                                    <Typography  style={{ fontSize: 17 }} color={"primary"} >¿Ha olvidado su contraseña?</Typography>
                                </Link>
                                </div>
                            </div>

                            <Box className="field-container">
                            <FaLock 
                                color={"#555"} size={26} className="iconButton"  style={{marginRight: '5px'}}
                            />
                            <FieldText 
                                variant='outlined'
                                type={showPassword ? "text" : "password"}
                                value={passwordValue}
                                setValue={setPasswordValue}
                                name='password'
                                label={"Contraseña*"} 
                                error={passwordError}
                                setError={setPasswordError}
                                errorMessage={passwordErrorMessage}
                                disabled={disabledPassword}
                                fullWidth={false}
                                required={false}
                                multiline={false}
                                onFocus={() => console.log("Password Field Focused")}
                                onBlur={() => console.log("Password Field lost focus")}
                                validateMethod={validatePassword}
                             />
                            <FaEye 
                                color={"#555"} size={26} className="iconButton"  style={{marginLeft: '10px', cursor: "pointer"}} onClick={() => setShowPassword(!showPassword)}
                            />
                            </Box>
                            <div className='button-log-container'>
                            <BigPrimaryButton children={"Iniciar Sesión"} />
                            </div>

                        </form>    


                </div>
            </div>

            <div className='image-log-container'>
                <img src={image} alt="" />
            </div>

        </div>
    );
};

export default LogIn;