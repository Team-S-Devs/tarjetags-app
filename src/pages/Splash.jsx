import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react'
import { auth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/loader.css'

const Splash = ({ navigateTo = "/login"}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthStateChange = () => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              navigate("/dashboard")
            } else {
              navigate(navigateTo)
            }
          });
        };
    
        handleAuthStateChange();
      }, []);
    
  return (
    <div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
      <span className="loader"></span>
    </div>
  )
}

export default Splash