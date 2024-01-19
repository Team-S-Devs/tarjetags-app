import React, { useEffect, useState } from 'react';
import Header from '../sections/Header';
import BoldTitle from '../components/texts/BoldTitle';
import { collection, query, getDocs, limit, orderBy, startAfter} from "firebase/firestore";
import { db } from '../utils/firebase-config';
import '../assets/styles/admin.css'
import UserRow from '../components/admin/UserRow';


const Admin = () => {

    const [usersArray, setUsersArray] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [firstDocRefArray, setDocRefArray] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsersInRange = async (documentId = 0, limitN) => {
        setLoading(true);
        const q = documentId != 0 ? query(
            collection(db, "users"),
            orderBy('__name__'),
            startAfter("lJhgNLL3ikYGrJSpQuhFLpYA0NU2"),
            limit(limitN)
        ) : query(
            collection(db, "users"),
            orderBy('__name__'),
            limit(limitN)
            );
    
        const querySnapshot = await getDocs(q);

        // Update the users array to include both data and document IDs
        setUsersArray(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })));

        setLoading(false)

        const setNonRepeatedDocRef = () => {
            for (let i = 0; i < firstDocRefArray.length; i++) {
                if (firstDocRefArray[i] == querySnapshot.docs[0].id) return;
            } setDocRefArray([...firstDocRefArray, querySnapshot.docs[0].id])
        }

        setNonRepeatedDocRef();
    };

    const increasePaginationData = () => {
        setPageNum(pageNum+1)
    }

    const decreasePaginationData = () => {
        setPageNum(pageNum-1)
    }
    
    const mountUsersTable = () => (
        <tbody>{
            usersArray.map((userData, index) => (
                <UserRow 
                    key={index}
                    userId={userData.id}
                    name={userData.fullname} 
                    email={userData.email}
                    phone={userData.phone} 
                    registerDate={userData.createdAt} 
                    limitDate={userData.license}
                    licenseType={userData.licenseType}
                    discountCode={userData.discountCode}
                    city={userData.department}
                    company={userData.company}
                    companySector={userData.companySector}
                />
                ))}
        </tbody>
    );
    
    useEffect(() => {
        getUsersInRange(pageNum != 0 ? firstDocRefArray[pageNum-1] : 0, 10);
    }, [pageNum]);


    return (
        <div className='profile-container'>
             <Header/>
            
            <div className="my-5 my-md-0 d-flex flex-column justify-content-center container cont-profile1" style={{ minHeight: "100vh"}}>
                <BoldTitle variant='h3' textAlign='center'>ADMINISTRADOR</BoldTitle>

                <div className='bg-white adminTable'>
                    {loading ? 
                        <div className="d-flex mt-4 mb-2 align-items-center justify-content-center loader_style">
                            <span className="loader"></span>
                        </div> 
                        :

                        <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th>Email</th>
                                <th>Fecha de Registro</th>
                                <th>Fecha limite de licencia</th>
                                <th>Tipo de Licencia</th>
                                <th>Codigo de descuento</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        {mountUsersTable()}
                        </table>
                }
                </div>
                <div className='paginationOptions'>
                    <button onClick={decreasePaginationData} disabled={pageNum < 1} >{"<"}</button>
                    <p>{pageNum}</p>
                    <button onClick={increasePaginationData} disabled= {usersArray.length < 10} >{">"}</button>
                </div>
            </div>

        </div>
    );
};

export default Admin;