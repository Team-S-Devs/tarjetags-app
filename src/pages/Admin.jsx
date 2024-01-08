import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../sections/Header';
import BoldTitle from '../components/texts/BoldTitle';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from '../utils/firebase-config';
import '../assets/styles/admin.css'
import UserRow from '../components/admin/UserRow';
import UserDataManager from '../components/admin/UserDataManager';


const Admin = () => {

    const [usersArray, setUsersArray] = useState([]);

    const getUsers = async () => {
        const q = query(collection(db, "users"), limit(14));
        const querySnapshot = await getDocs(q);
        setUsersArray(querySnapshot.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getUsers();
    }, []);

    const mountUsersTable = () => (
        <tbody>
            {usersArray.map((userData, index) => (
                <UserRow key={index} 
                name={userData.fullname} 
                email={userData.email} 
                phone={userData.phone} 
                registerDate={userData.createdAt} 
                limitDate={userData.license}
                discountCode={userData.discountCode} />
            ))}
        </tbody>
    );


    return (
        <div className='profile-container'>
             <Header/>
            
            <div className="my-5 my-md-0 d-flex flex-column justify-content-center container cont-profile1" style={{ minHeight: "100vh"}}>
                <BoldTitle variant='h3' textAlign='center'>ADMINISTRADOR</BoldTitle>

                <div className='bg-white adminTable'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Fecha de Registro</th>
                                <th>Fecha limite de licencia</th>
                                <th>Tipo de Licencia</th>
                                <th>Codigo de descuento</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        {mountUsersTable()}
                        </table>
                </div>
            </div>

        </div>
    );
};

export default Admin;