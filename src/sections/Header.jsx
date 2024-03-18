import React, { useEffect, useState } from 'react'
import image from '../assets/images/auth/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { BiSolidUser } from "react-icons/bi";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../utils/firebase-config';
import { GoFileDirectoryFill } from 'react-icons/go'
import { FaUsersCog } from "react-icons/fa";

import useWindowSize from '../hooks/useWindowsSize';
import '../assets/styles/header.css'
import { doc, onSnapshot } from 'firebase/firestore';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const {width} = useWindowSize();
  const [user, setUser]  = useState(null);

  useEffect(() => {
    setIsOpen(false)
  }, [location]);
  
  const [fullname, setFullname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth,(fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
        const unsubscribe = onSnapshot(doc(db, 'users', fireBaseUser.uid), (snapshot) => {
            const userData = snapshot.data();
            setFullname(userData.fullname);
            setIsAdmin(userData.admin);
        }, (error) => {
            setFullname("Perfil")
        });
        return unsubscribe;
      } else {
        setUser("Perfil");
      }
    });
  }, [user])

  const onClickHeader = () => {
    setIsOpen(!isOpen)
  }

  const isResponsive = (width <= 1268) ? true : false;
  const conditional = (isOpen && isResponsive) ? 'navigationResponsive' :''

  return (
    <header>
      <div className='headerContainer container'>
      <div className='logo_img'>
        <Link to='/'>
          <div className='logoHeader'>
            <img src={image} alt="vetsoft logo"/>
          </div>
        </Link>
      </div>
      <nav className={'navigation ' +(conditional)}>

        <div className={`${conditional !== "navigationResponsive" && "d-flex"}`}>
        { isAdmin ? 
          <div className="header-link">
            <FaUsersCog className='icon-header'/>
            <Link to="/admin"><span className='link ml-1'>Admin Panel</span></Link>
          </div> : <></>
        }

        <div className="header-link">
          <GoFileDirectoryFill className='icon-header'/>
          <Link to="/"><span className='link ml-1'>Ver Mi Tarjeta</span></Link>
        </div>

        <div className="header-link">
          <BiSolidUser className='icon-header'/>
          <Link to={!user ? "/": "/profile"}><span className='link mainButton ml-1'>{user ? fullname : 'Iniciar Sesion'}</span></Link>
        </div>
        </div>
      </nav>
      <div className='menuButton' onClick={onClickHeader}>
        <button className={isOpen && isResponsive ? "cancelButton-header" : "headerButton"}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      </div>
    </header>
  )
}

export default Header