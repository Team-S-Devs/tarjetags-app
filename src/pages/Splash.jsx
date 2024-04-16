import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import { auth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/loader.css'
import {Helmet} from "react-helmet";
import { SITE_NAME } from '../utils/constants';

const Splash = ({ navigateTo = "/login", loggedNavigateTo  = "/dashboard" }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthStateChange = () => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              navigate(loggedNavigateTo)
            } else {
              navigate(navigateTo)
            }
          });
        };
    
        handleAuthStateChange();
      }, []);
    
  return (
    <div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
      <Helmet>
        <title>{`${SITE_NAME}`}</title>
      </Helmet>
      <span className="loader"></span>
    </div>
  )
}

export default Splash