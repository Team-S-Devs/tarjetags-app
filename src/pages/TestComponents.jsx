import React, { useState } from 'react'
import FieldText from '../components/form/fields/FieldText'
import DropdownField from '../components/form/fields/DropdownField';
import BigPrimaryButton from '../components/buttons/BigPrimaryButton';
import MediumPrimaryButton from '../components/buttons/MediumPrimaryButton';
import MediumSecondaryButton from '../components/buttons/MediumSecondaryButton';
import ThinTitle from '../components/texts/ThinTitle';
import BoldTitle from '../components/texts/BoldTitle';
import BackButton from '../components/buttons/BackButton';
import BoldTitleWithBackButton from '../components/texts/BoldTitleWithBackButton';
import GreySubtitleWithLink from '../components/texts/GreySubtitleWithLink';
import GreySubtitle from '../components/texts/GreySubtitle';
import StyledCard from '../components/card/StyledCard';
import AccentButton from '../components/buttons/AccentButton';
import HorizontalLine from '../components/lines/HorizontalLine';
import SmallPrimaryButton from '../components/buttons/SmallPrimaryButton';

const TestComponents = () => {
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


    const [departmentValue, setDepartmentValue] = useState("");
    const departmentsOptions = 
        ["La Paz", "Cochabamba", "Santa Cruz", "Beni", "Chuquisaca", "Oruro", "Pando", "Potosí", "Tarija"]

    return (
        <div className="container">
            <BoldTitle>EDITAR TARJETA</BoldTitle>

            <ThinTitle>Standard Full Width Field Text Component example: </ThinTitle>
            <FieldText 
                value={emailValue}
                setValue={setEmailValue}
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

            <br />
            <br />
            <br />

            <ThinTitle>Outlined non-full-width Field Text Component example: </ThinTitle>
            <FieldText 
                variant='outlined'
                value={emailValue}
                setValue={setEmailValue}
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

            <br />
            <br />
            <br />

            <ThinTitle>Outlined Full Width Dropdown Field Component example: </ThinTitle>
            <DropdownField 
                variant='outlined'
                options={departmentsOptions} 
                value={departmentValue} 
                setValue={setDepartmentValue}
                label="Departamento:"
            />

            <br />
            <br />
            <br />

            <ThinTitle>Big Primary Button Component example: </ThinTitle>
            <BigPrimaryButton onClick={() => console.log("Click en big button")}>Registrarse</BigPrimaryButton>

            <br />
            <br />
            <br />

            <ThinTitle>Medium Primary Button Component example: </ThinTitle>
            <MediumPrimaryButton onClick={() => console.log("Click en medium button")}>Registrarse</MediumPrimaryButton>

            <br />
            <br />
            <br />

            <ThinTitle>Medium Secondary Button Component example: </ThinTitle>
            <MediumSecondaryButton onClick={() => console.log("Click en secondary button")}>Registrarse</MediumSecondaryButton>

            <br />
            <br />
            <br />

            <ThinTitle variant='h4'>Back Button and Medium Thin Title: </ThinTitle>
            <BackButton/>

            <br />
            <br />
            <br />

            <ThinTitle variant='h5'>Bold Title with Back Button and Medium Small Title: </ThinTitle>
            <BoldTitleWithBackButton>Registro</BoldTitleWithBackButton>
            <div className="mt-2"></div>
            <GreySubtitleWithLink subtitleText='¿Ya tienes una cuenta?' linkText='Inicia Sesión' />

            <br />
            <br />
            <br />
            <BoldTitleWithBackButton centered>Restablecer contraseña</BoldTitleWithBackButton>
            <br/>
            <GreySubtitle variant='h6' textAlign={"center"} paddingHorizontal={40}>Introduce el email con el que te registraste y se te enviará un enlace a tu correo electrónico para  cambiar tu contraseña</GreySubtitle>

            <br />
            <br />
            <br />
            <ThinTitle color='primary' variant='h5' textAlign='center'>Mi tarjeta</ThinTitle>
            <HorizontalLine/>
            <div className="mt-2"></div>
            <StyledCard>
                <div className="d-flex flex-column align-items-center">
                    <ThinTitle variant='h4'>Título 1</ThinTitle>
                    <AccentButton>https://tarjetag.com/example</AccentButton>
                </div>
            </StyledCard>
            <br />

            <ThinTitle variant='h4'>Small Primary Button</ThinTitle>
            <SmallPrimaryButton>Guardar</SmallPrimaryButton>
            <SmallPrimaryButton variant='outlined'>Cancelar</SmallPrimaryButton>
        </div>
    )
}

export default TestComponents