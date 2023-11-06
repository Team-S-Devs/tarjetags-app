import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Box } from '@mui/system';
import { FaEye, FaLock, FaEnvelope } from 'react-icons/fa';
import FieldText from '../components/form/fields/FieldText';
import {app} from '../utils/firebase-config'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import image from '../assets/images/auth/loginImage.png'
import image3 from '../assets/images/auth/person.png'
import image2 from '../assets/svg/login1.svg'
import BoldTitleWithBackButton from '../components/texts/BoldTitleWithBackButton';
import GreySubtitleWithLink from '../components/texts/GreySubtitleWithLink';
import BigPrimaryButton from '../components/buttons/BigPrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import PasswordField from '../components/form/fields/PasswordField';



const LogIn = () => {

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
        

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        const auth = getAuth(app)
        onAuthStateChanged(auth, (user) => {
        if (user) navigate("/dashboard")
        })
    }, [])
    

    const change = e => {
        e.preventDefault()
        setErrorMessage("")
      }
    

    const submit = e => {
        setLoading(true)
        const auth = getAuth(app)
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email)
        console.log(password)
        
        signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {

        const user = userCredential.user;
        navigate("/dashboard")
        setLoading(false)

        })
        .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
            case 'auth/user-not-found':
            setErrorMessage("No existe un usuario con ese email. Por favor Registrate");
            break;
            case 'auth/invalid-password':
            setErrorMessage("Contraseña Incorrecta");
            break;
            case 'auth/invalid-email':
            setErrorMessage("Introduce un email valido porfavor.");
            break;
            case 'auth/invalid-login-credentials':
                setErrorMessage("Contraseña Incorrecta")
                break;
            default:
            setErrorMessage(error.message);
        }
        setLoading(false)
        });
    }

    return (
        <div className='general-background'>
            
            <div className='d-flex justify-content-center flex-column login-container '> 

            <BoldTitleWithBackButton children="Inicio de Sesión"/>
            <GreySubtitleWithLink linkSize={22} subtitleText='¿Aún no tienes una cuenta?' linkText='Registrate'/>
                
                <div className='login-secondary-container'>
                        <form id='logForm' className='form-login' onSubmit={submit} onChange={change}>
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
                                fullWidth={true}
                                required={true}
                                onFocus={() => console.log("Email Field Focused")}
                                onBlur={() => console.log("Email Field lost focus")}
                                validateMethod={validateEmail}
                             />

                            </Box>

                            <Box className="field-container">
                            <FaLock 
                                color={"#555"} size={26} className="iconButton"  style={{marginRight: '5px'}}
                            />

                            <PasswordField 
                                variant='outlined'
                                value={passwordValue}
                                name='password'
                                setValue={setPasswordValue}
                                label={"Contraseña"} 
                                placeholder='' 
                                error={passwordError}
                                setError={setPasswordError}
                                errorMessage={passwordErrorMessage}
                                disabled={disabledPassword}
                                fullWidth={false}
                                required={true}
                                onFocus={() => console.log("Password Field Focused")}
                                onBlur={() => console.log("Password Field lost focus")}
                                        />
                            </Box>

                            <div className='link-login'>
                                <Link style={{textDecorationColor:'var(--prim-purple)'}} to="/">
                                    <Typography className='general-link'  style={{ fontSize: 17 }} color={"primary"} >¿Ha olvidado su contraseña?</Typography>
                                </Link>
                                </div>
                           { errorMessage.length > 0 && (
                                <div className='error'>
                                <p>{errorMessage}</p>
                                </div>
                            )
                            }

                            <div className='button-log-container'>
                            <BigPrimaryButton children={"Iniciar Sesión"} />
                            </div>

                        </form>    

                </div>
            </div>

            <div className='image-log-container'>
                <img src={image3} alt="" />
            </div>

        </div>
    );
};

export default LogIn;