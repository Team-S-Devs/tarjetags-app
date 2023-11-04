import React, { useState } from 'react'
import FieldText from '../components/form/fields/FieldText'
import { Typography } from '@mui/material';
import DropdownField from '../components/form/fields/DropdownField';

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
            <Typography variant='h4' component="h1">Standard Full Width Field Text Component example: </Typography>
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

            <Typography variant='h4' component="h1">Outlined non-full-width Field Text Component example: </Typography>
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

            <Typography variant='h4' component="h1">Outlined Full Width Dropdown Field Component example: </Typography>
            <DropdownField 
                variant='outlined'
                options={departmentsOptions} 
                value={departmentValue} 
                setValue={setDepartmentValue}
                label="Departamento:"
            />
        </div>
    )
}

export default TestComponents