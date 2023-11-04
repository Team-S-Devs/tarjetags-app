import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react'
import { auth } from '../utils/firebase-config';

const Splash = () => {
    const [isUserLogged, setIsUserLogged] = useState(false);

    useEffect(() => {
        const handleAuthStateChange = () => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setIsUserLogged(true);
            } else {
              setIsUserLogged(false);
            }
          });
        };
    
        handleAuthStateChange();
      }, []);
    
  return (
    <div>Splash</div>
  )
}

export default Splash