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
    const [emailError, setEmailError] = useState({
        isError: false,
        errorMessage: "Not valid email"
    });
    const [disabledEmail, setDisabledEmail] = useState(false)


    const [departmentValue, setDepartmentValue] = useState("Selecciona ");

    const departmentsOptions = 
        ["La Paz", "Cochabamba", "Santa Cruz", "Beni", "Chuquisaca", "Oruro", "Pando", "Potosí", "Tarija"]

        console.log(departmentValue)
    return (
        <div className="container">
            <Typography variant='h4' component="h1">Standard Full Width Field Text Component example: </Typography>
            <FieldText 
                value={emailValue}
                setValue={setEmailValue}
                label={"Email"} 
                placeholder='nombre@ejemplo.com' 
                errorObject={emailError}
                disabled={disabledEmail}
                fullWidth={true}
                required={true}
                onFocus={() => console.log("Email Field Focused")}
                onBlur={() => console.log("Email Field lost focus")}
            />

            <br />
            <br />
            <br />

            <Typography variant='h4' component="h1">Outlined non-full-width Field Text Component example: </Typography>
            <FieldText 
                value={emailValue}
                setValue={setEmailValue}
                variant='outlined'
                label={"Email"} 
                placeholder='nombre@ejemplo.com' 
                errorObject={emailError}
                disabled={disabledEmail}
                fullWidth={false}
                required={true}
                onFocus={() => console.log("Email Field Focused")}
                onBlur={() => console.log("Email Field lost focus")}
            />

            <br />
            <br />
            <br />

            <Typography variant='h4' component="h1">Dropdown Field Component example: </Typography>
            <DropdownField 
                options={departmentsOptions} 
                value={departmentValue} 
                setValue={setDepartmentValue}
                label="Departamento:"
            />
        </div>
    )
}

export default TestComponents