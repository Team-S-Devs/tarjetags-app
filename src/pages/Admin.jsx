import React, { useEffect, useState } from "react";
import Header from "../sections/Header";
import BoldTitle from "../components/texts/BoldTitle";
import {
  collection,
  query,
  getDocs,
  limit,
  orderBy,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase-config";
import "../assets/styles/admin.css";
import UserRow from "../components/admin/UserRow";
import useWindowSize from "../hooks/useWindowsSize";
import SearchBar from "../components/admin/SearchBar";

const Admin = () => {
  const [usersArray, setUsersArray] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [lastEmailRef, setLastEmailRef] = useState([]);
  const [searchReq, setSearchReq] = useState("")
  const [loading, setLoading] = useState(true);
  const [notFoundView, setNotFoundView] = useState(false);
  const { width, height } = useWindowSize();

  const setNonRepeatedEmailRef = (usersArray) => {
    for (let i = 0; i < lastEmailRef.length; i++) {
      if (
        lastEmailRef[i] == usersArray[usersArray.length-1].email)
        return;
    }

    if (usersArray.length >= 10)
      setLastEmailRef([
        ...lastEmailRef,
        usersArray[usersArray.length - 1].email,
      ]);
  }

  const getUsersByPartialEmail = async (partialEmail, limitN) => {
    setLoading(true);
  
    const partialMatchQuery = (pageNum !== 0) 
    ? query(
      collection(db, "users"),
      orderBy("email"),
      where("email", ">=", partialEmail),
      where("email", "<=", partialEmail + "\uf8ff"),
      startAfter(lastEmailRef[pageNum - 1]),
      limit(limitN))
    : query(
      collection(db, "users"),
      orderBy("email"),
      where("email", ">=", partialEmail),
      where("email", "<=", partialEmail + "\uf8ff"),
      limit(limitN)
    );
  
    const [partialMatchSnapshot] = await Promise.all([
      getDocs(partialMatchQuery)
    ]);

    const partialMatchUsers = partialMatchSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    if (partialMatchUsers.length > 0) {
      setNotFoundView(false);
      setUsersArray(partialMatchUsers);
      setNonRepeatedEmailRef(partialMatchUsers);
    } else {
      setNotFoundView(true);
    }

    setLoading(false);
  };

  const increasePaginationData = () => {
    setPageNum(pageNum + 1);
  };

  const decreasePaginationData = () => {
    setPageNum(pageNum - 1);
  };
      
  const mountUsersTable = () => (
    <tbody>
      {usersArray.map((userData, index) => (
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

  const cleanLastEmailRef = () => {
    setLastEmailRef([]);
  }

  useEffect(() => {
    if (searchReq != "") {
      cleanLastEmailRef();
    }
    getUsersByPartialEmail(searchReq,10);
  }, [pageNum, searchReq]);

  return (
      <div className='profile-container'>
           <Header/>
          
          <div className="my-5 my-md-0 d-flex flex-column justify-content-center container cont-profile1" style={{ minHeight: "100vh"}}>
              <BoldTitle variant={ width > 500 ? 'h3' : 'h5'} textAlign='center'>ADMINISTRADOR</BoldTitle>

        <div className="search-style">
          <SearchBar setSearchVal={setSearchReq}/>    
        </div>


        <div className="bg-white adminTable">
          {loading || notFoundView ? (
            <div className="d-flex mt-4 mb-2 align-items-center justify-content-center loader_style">
              {loading ? <span className="loader"></span> 
              : <div className="not-found-style"><h4>No se encontró</h4><p>prueba otro email</p></div>}
            </div>
          ) : (
            <div className="table-responsive">
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
            </div>
          )}
        </div>
        <div className="paginationOptions">
          <button onClick={decreasePaginationData} disabled={pageNum < 1}>
            {"<"}
          </button>
          <p>{pageNum}</p>
          <button
            onClick={increasePaginationData}
            disabled={usersArray.length < 10}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
