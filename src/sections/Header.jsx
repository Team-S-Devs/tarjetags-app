import React, { useEffect, useState } from 'react'
import image from '../assets/images/auth/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BiSolidUser } from "react-icons/bi";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase-config';
import { GoFileDirectoryFill } from 'react-icons/go'
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
  

  const navigate = useNavigate()
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth,(fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
        const unsubscribe = onSnapshot(doc(db, 'users', fireBaseUser.uid), (snapshot) => {
            const userData = snapshot.data();
            setFullname(userData.fullname);
        }, (error) => {
            setFullname("Profile")
        });
        return unsubscribe;
      } else {
        setUser("Profile");
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
        <div className="header-link">
          <GoFileDirectoryFill className='icon-header'/>
          <Link to="/"><span className='link'>Ver Tarjetas Creadas</span></Link>
        </div>

        <div className="header-link">
          <BiSolidUser className='icon-header'/>
          <Link to={!user ? "/": "/profile"}><span className='link mainButton'>{fullname}</span></Link>
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