import React, { useEffect, useState } from 'react';
import FieldText from '../components/form/fields/FieldText';
import { LiaLaptopCodeSolid, LiaChalkboardTeacherSolid, LiaMoneyBillWaveSolid, LiaLeafSolid, LiaBroadcastTowerSolid, LiaHospitalSolid, LiaUmbrellaBeachSolid, LiaPlusSolid } from 'react-icons/lia';
import { LuUtensilsCrossed } from 'react-icons/lu';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsPalette, BsBriefcase } from 'react-icons/bs';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import DropdownIconField from '../components/form/fields/DropdownIconField';
import DropdownField from '../components/form/fields/DropdownField';
import useWindowSize from '../hooks/useWindowsSize';
import '../assets/styles/sign-up.css';
import { signUpWithEmailAndPassword } from '../utils/sign-up-methods';
import { Container, Typography } from '@mui/material';
import Form from '../components/form/Form';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebase-config';
import { signOut } from 'firebase/auth';
import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore'
import BoldTitle from '../components/texts/BoldTitle';
import SmallPrimaryButton from '../components/buttons/SmallPrimaryButton';

const Profile = ({user}) => {
    console.log(user.email)
    console.log(user.fullname)

 // State for user registration form
 const [fullname, setFullname] = useState(user.email);
 const [fullnameError, setFullnameError] = useState(false);

 const [emailValue, setEmailValue] = useState(user.email);
 const [emailError, setEmailError] = useState(false);
 const [emailErrorMessage, setEmailErrorMessage] = useState('Introduce un correo electrónico válido');

 const [phoneValue, setPhoneValue] = useState(user.phone);
 const [phoneError, setPhoneError] = useState(false);

 const validateEmail = () => {
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   setEmailError(!emailPattern.test(emailValue.trim()));
 };

 const validatePhone = () => {
   const phonePattern = /^(?:\+\d{1,3})?\s?\(?(\d{1,})\)?[-.\s]?(\d{1,})[-.\s]?(\d{1,})$/;
   setPhoneError(!phonePattern.test(phoneValue.trim()));
 };

 // State for optional company details
 const [companyValue, setCompanyValue] = useState('');
 const [companySectorValue, setCompanySectorValue] = useState('');
 const [customOption, setCustomOption] = useState('Otro');

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

 const [departmentValue, setDepartmentValue] = useState('');
 const departmentsOptions = ["La Paz", "Cochabamba", "Santa Cruz", "Beni", "Chuquisaca", "Oruro", "Pando", "Potosí", "Tarija"];

 const [edit, setEdit] = useState(false);
 const [discountCodeValue, setDiscountCodeValue] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(false);

 const navigate = useNavigate();

 // Handle sign-up button click
 const handleSignUp = async () => {
    try {
        setLoading(false)
        console.log("SUBMITTT")
    } catch (error) {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          setEmailError(true);
          setEmailErrorMessage("Ya existe una cuenta registrada con este email, por favor inicia sesión o introduce un email diferente");
        } else {
          setError(true);
        }
    }
//    // Validate form fields
//    setFullnameError(fullname.trim().length < 4);
//    validateEmail();
//    validatePhone();
//    setPasswordError(passwordValue.length < 6);

//    // If any error, return
//    if (fullnameError || emailError || phoneError || passwordError) {
//      return;
//    }

//    try {
//    // Create user data in Firestore
//      const userData = {
//        fullname,
//        email: emailValue,
//        phone: phoneValue,
//        company: companyValue,
//        companySector: companiesSector.filter(c => c.id === companySectorValue)[0].title,
//        department: departmentValue,
//        discountCode: discountCodeValue,
//        license: Timestamp.fromMillis(0),
//        createdAt: Timestamp.now(),
//      };
//      setLoading(true);

//      // Perform Firebase sign-up
//      const userCredential = await signUpWithEmailAndPassword(emailValue, passwordValue, userData);
//      navigate("/dashboard")
//      setLoading(false)
//      // Handle successful sign-up, e.g., redirect or show a success message
//    } catch (error) {
//        setLoading(false);
//        if(error.code === 'auth/email-already-in-use') {
//            setEmailError(true);
//            setEmailErrorMessage("Ya existe una cuenta registrada con este email, por favor inicia sesión o introduce un email diferente")
//        } else setError(true)
//    }
 };
 
 const [userData, setUserData ] = useState(null);

 useEffect(() => {
    if (!user) {
        navigate("/login")
    }

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
    const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    setUserData(userData);
}, (error) => {
    setError(true);
});

return () => unsubscribe();
}, [user]);


  const logOut = () => {
    signOut(auth);
  }

  const saveEditChanges = () => {
    console.log("saved")
    setEdit(false);
  }

  const editProfile = () => {
    setEdit(true);
    console.log("edit profile")
  }


    return (
        <div className='profile-container'>
            
        <Container style={{background:'var(--back-ligh)'}}>
            <div className="my-5 my-md-0 d-flex flex-column justify-content-center" style={{ minHeight: "100vh"}}>
            <BoldTitle variant='h3' textAlign='center'>Perfil De Usuario</BoldTitle>
            <button style={{marginBottom:'1rem'}} onClick={logOut}>
                SIGN OUT
            </button>
            
                <div className='profile-cont-2'>

                     <Form onFocus={() => setError(false)} submit={handleSignUp}>
                        <div className="row" >
                            <div className="row col-lg-12 col-md-12 fixed-container-sign-up">
                                <div className="col-md-6 col-lg-6 col-sm-12 fixed-container-sign-up">
                                    <div className="mt-3"></div>
                                    <FieldText
                                        label='Nombre completo'
                                        value={fullname}
                                        setValue={setFullname}
                                        
                                        readOnly={edit ? false : true}
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
                                        
                                        readOnly={edit ? false : true}
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
                                        
                                        readOnly={edit ? false : true}
                                        placeholder='Ej: 76543218'
                                        fullWidth
                                        required
                                        error={phoneError}
                                        setError={setPhoneError}
                                        errorMessage='Introduce un número de celular válido'
                                        validateMethod={validatePhone}
                                    />


                                </div>

                                {/* <!-- Segunda Columna --> */}
                                <div className="col-md-6 col-lg-6 fixed-container-sign-up">
                                    <div className="mt-md-3 mt-sm-0"></div>
                                    <FieldText
                                        label='Empresa (Opcional)'
                                        value={companyValue}
                                        setValue={setCompanyValue}
                                        
                                        readOnly={edit ? false : true}
                                        placeholder='Ej: Epic Games'
                                        fullWidth
                                    />

                                    <div className="mt-md-3 mt-sm-0"></div>
                                    <DropdownIconField
                                        options={companiesSector}
                                        setOptions={setCompaniesSectors}
                                        
                                        label='Rubro de empresa (Opcional)'
                                        readOnly={edit ? false : true}
                                        placeholder='Ej: Alimentación y Bebidas'
                                        forNew
                                        customOption={customOption}
                                        setCustomOption={setCustomOption}
                                        value={companySectorValue}
                                        setValue={setCompanySectorValue}
                                    />

                                    <div className="mt-md-3 mt-sm-0"></div>
                                    <DropdownField 
                                        
                                        options={departmentsOptions} 
                                        value={departmentValue} 
                                        setValue={setDepartmentValue}
                                        label="Departamento (Opcional)"
                                    />

                                    <div className="mt-md-3 mt-sm-0"></div>
                                    <FieldText
                                        label='Código de descuento (Opcional)'
                                        value={discountCodeValue}
                                        setValue={setDiscountCodeValue}
                                        
                                        readOnly={edit ? false : true}
                                        placeholder='Ej: swd789'
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                        </Form>

                        <div className="mt-4"></div>
                                <div className="d-flex flex-column align-items-center justify-content-center fixed-container-sign-up">
                                    {error &&
                                        <Typography marginBottom={2} color="error">Hubo un problema, por favor inténtelo de nuevo.</Typography>
                                    }
                                    <div className='d-flex align-items-center justify-content-center'>
                                            <SmallPrimaryButton loading={loading} type='button' onClick={edit ? saveEditChanges : editProfile } fullWidth={useWindowSize().width < 769}>{edit ? 'Save Changes' : 'Edit'}</SmallPrimaryButton>
                                            <div style={{ width: 12 }}></div>
                                            <SmallPrimaryButton
                                            variant='outlined'
                                            loading={loading}
                                            display={ edit ? 'initial': 'none'}
                                            type='button'
                                            onClick={saveEditChanges}
                                            fullWidth={useWindowSize().width < 769}
                                            >
                                            Cancel
                                            </SmallPrimaryButton>
                                    </div>
                                </div>
                </div>
            </div>
        </Container>

        </div>
    );
};

export default Profile;