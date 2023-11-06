import React, { useState } from 'react'
import BoldTitleWithBackButton from '../components/texts/BoldTitleWithBackButton'
import GreySubtitleWithLink from '../components/texts/GreySubtitleWithLink'
import FieldText from '../components/form/fields/FieldText'
import PasswordField from '../components/form/fields/PasswordField'
import { LiaLaptopCodeSolid, LiaChalkboardTeacherSolid, LiaMoneyBillWaveSolid, LiaLeafSolid, LiaBroadcastTowerSolid, LiaHospitalSolid, LiaUmbrellaBeachSolid, LiaPlusSolid } from 'react-icons/lia';
import { LuUtensilsCrossed } from 'react-icons/lu';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsPalette, BsBriefcase } from 'react-icons/bs';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import DropdownIconField from '../components/form/fields/DropdownIconField'
import DropdownField from '../components/form/fields/DropdownField'
import BigPrimaryButton from '../components/buttons/BigPrimaryButton'
import useWindowSize from '../hooks/useWindowsSize'
import SignUpSVG from '../components/svg/SignUpSVG'

const SignUp = () => {
    const [fullname, setFullname] = useState("")
    const [fullnameError, setFullnameError] = useState(false);

    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("Introduce un correo electrónico válido");

    const [phoneValue, setPhoneValue] = useState("");
    const [phoneError, setPhoneError] = useState(false);

    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("Introduce una contraseña de al menos 6 caracteres");

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailPattern.test(emailValue.trim()));
    }

    const validatePhone = () => {
        const phonePattern = /^(?:\+\d{1,3})?\s?\(?(\d{1,})\)?[-.\s]?(\d{1,})[-.\s]?(\d{1,})$/;
        setPhoneError(!phonePattern.test(phoneValue.trim()));
    }


    const [companyValue, setCompanyValue] = useState("");

    const [companySectorValue, setCompanySectorValue] = useState("");
    const [customOption, setCustomOption] = useState("Otro");

    const [companiesSector, setCompaniesSectors] = useState([
        { id: 0, icon: <LuUtensilsCrossed />, title: 'Alimentación y Bebidas' },
        { id: 1, icon: <BsPalette />, title: 'Arte y Entretenimiento' },
        { id: 2, icon: <AiOutlineShoppingCart />, title: 'Comercio Electrónico' },
        { id: 3, icon: <HiOutlineBuildingOffice />, title: 'Construcción y Arquitectura' },
        { id: 4, icon: <BsBriefcase />, title: 'Consultoría Empresarial' },
        { id: 5, icon: <LiaChalkboardTeacherSolid />, title: 'Educación y Enseñanza' },
        { id: 6, icon: <LiaMoneyBillWaveSolid />, title: 'Finanzas y Banca' },
        { id: 7, icon: <LiaLeafSolid />, title: 'Medio Ambiente y Energías Renovables' },
        { id: 8, icon: <LiaBroadcastTowerSolid />, title: 'Medios y Comunicaciones' },
        { id: 9, icon: <LiaHospitalSolid />, title: 'Salud y Cuidado Médico' },
        { id: 10, icon: <LiaLaptopCodeSolid />, title: 'Tecnología de la Información (IT)' },
        { id: 11, icon: <LiaUmbrellaBeachSolid />, title: 'Turismo y Hospitalidad' },
        { id: 12, icon: <LiaPlusSolid/>, title: 'Otro' }
      ]);

    const [departmentValue, setDepartmentValue] = useState("");
    const departmentsOptions = 
      ["La Paz", "Cochabamba", "Santa Cruz", "Beni", "Chuquisaca", "Oruro", "Pando", "Potosí", "Tarija"];

    const [discountCodeValue, setDiscountCodeValue] = useState("");

  return (
    <div className="container my-5 my-md-0 d-flex flex-column justify-content-center" style={{ minHeight: "100vh"}}>
        <BoldTitleWithBackButton>Registro</BoldTitleWithBackButton>
        <div className="mt-2"></div>
        <GreySubtitleWithLink subtitleText='&nbsp;¿Ya tienes una cuenta?' linkText='Inicia Sesión' />
        <div className="mt-2"></div>
        <div className="row">
            <div className="row col-lg-8 col-md-12">
                <div className="col-md-6 col-lg-6">
                    <div className="mt-3"></div>
                    <FieldText
                        label='Nombre completo'
                        value={fullname}
                        setValue={setFullname}
                        variant='outlined'
                        placeholder='Ej: Andŕes Pérez Ríos'
                        fullWidth
                        required
                        validateMethod={() => setFullnameError(fullname.trim().length < 4)}
                        error={fullnameError}
                        setError={setFullnameError}
                        errorMessage='Introduce un nombre de al menos 4 letras.'
                    />

                    <div className="mt-md-3 mt-sm-0"></div>
                    <FieldText
                        label='Correo electrónico'
                        value={emailValue}
                        setValue={setEmailValue}
                        variant='outlined'
                        placeholder='Ej: nombre@ejemplo.com'
                        fullWidth
                        required
                        error={emailError}
                        setError={setEmailError}
                        errorMessage={emailErrorMessage}
                        validateMethod={validateEmail}
                    />

                    <div className="mt-md-3 mt-sm-0"></div>
                    <FieldText
                        label='Teléfono celular'
                        value={phoneValue}
                        setValue={setPhoneValue}
                        variant='outlined'
                        placeholder='Ej: 76543218'
                        fullWidth
                        required
                        error={phoneError}
                        setError={setPhoneError}
                        errorMessage='Introduce un número de celular válido'
                        validateMethod={validatePhone}
                    />

                    <div className="mt-md-3 mt-sm-0"></div>
                    <PasswordField
                        label='Contraseña'
                        value={passwordValue}
                        setValue={setPasswordValue}
                        variant='outlined'
                        placeholder='Introduce una contraseña'
                        fullWidth
                        required
                        error={passwordError}
                        setError={setPasswordError}
                        errorMessage={passwordErrorMessage}
                        validateMethod={() => setPasswordError(passwordValue.length < 6)}
                    />
                </div>

                {/* <!-- Segunda Columna --> */}
                <div className="col-md-6 col-lg-6">
                    <div className="mt-md-3 mt-sm-0"></div>
                    <FieldText
                        label='Empresa (Opcional)'
                        value={companyValue}
                        setValue={setCompanyValue}
                        variant='outlined'
                        placeholder='Ej: Epic Games'
                        fullWidth
                    />

                    <div className="mt-md-3 mt-sm-0"></div>
                    <DropdownIconField
                        options={companiesSector}
                        setOptions={setCompaniesSectors}
                        variant='outlined'
                        label='Rubro de empresa (Opcional)'
                        placeholder='Ej: Alimentación y Bebidas'
                        forNew
                        customOption={customOption}
                        setCustomOption={setCustomOption}
                        value={companySectorValue}
                        setValue={setCompanySectorValue}
                    />

                    <div className="mt-md-3 mt-sm-0"></div>
                    <DropdownField 
                        variant='outlined'
                        options={departmentsOptions} 
                        value={departmentValue} 
                        setValue={setDepartmentValue}
                        label="Departamento"
                    />

                    <div className="mt-md-3 mt-sm-0"></div>
                    <FieldText
                        label='Código de descuento (Opcional)'
                        value={discountCodeValue}
                        setValue={setDiscountCodeValue}
                        variant='outlined'
                        placeholder='Ej: swd789'
                        fullWidth
                    />
                </div>

                <div className="mt-4"></div>
                <div className="pl-md-6 pr-md-6 pl-sm-1 pr-sm-1">
                <div className="pl-md-2 pr-md-2 d-flex align-items-center justify-content-center">
                    <BigPrimaryButton fullWidth={useWindowSize().width < 769}>Registrarse</BigPrimaryButton>
                </div>
                </div>
            </div>

            {/* <!-- Tercera Columna (Solo en pantallas grandes) --> */}
            {
                useWindowSize().width > 1516 && (
                    <div className="col-lg-4 d-none d-xl-block">
                        <SignUpSVG/>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default SignUp