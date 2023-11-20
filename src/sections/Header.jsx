import React, { useEffect, useState } from 'react'
import image from '../assets/images/auth/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { BiSolidUser } from "react-icons/bi";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase-config';
import { GoFileDirectoryFill } from 'react-icons/go'
import useWindowSize from '../hooks/useWindowsSize';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const {width} = useWindowSize();
  const [user, setUser]  = useState(null);
  const [perfilView, setPerfilView] = useState("ala");

  useEffect(() => {
    setIsOpen(false)
  }, [location]);
  
  console.log(user+" hoal")

  useEffect(() => {
    onAuthStateChanged(auth,(fireBaseUser) => {
      if (fireBaseUser) {
        console.log("vamosss")
        setUser(fireBaseUser);
      } else {
        setUser(null);
      }
    });

    setPerfilView(!user ?"Iniciar Sesión": user.email)
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
        <Link to='/#home'>
          <div className='logoHeader'>
            <img src={image} alt="vetsoft logo"/>
          </div>
        </Link>
      </div>
      <nav className={'navigation ' +(conditional)}>

      <GoFileDirectoryFill className='icon-header'/>
        <Link to="/"><span className='link'>Ver Tarjetas Creadas</span></Link>

        <BiSolidUser className='icon-header'/>
        <Link to={!user ? "/": "/profile"}><span className='link mainButton'>{perfilView}</span></Link>
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