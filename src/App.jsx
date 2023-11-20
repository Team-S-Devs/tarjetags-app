import { Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Splash from './pages/Splash'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import TestComponents from './pages/TestComponents'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import { auth } from './utils/firebase-config';
import { useState } from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Error from './pages/Error';
import SignUp from './pages/SignUp';
import EditCard from './pages/EditCard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#561AD9',
    },
    secondary: {
      main: '#733EE8',
    },
    grey: {
      main: "#727070"
    },
    accent: {
      main: "#9DD91A"
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', 
    h1: {
      fontFamily: 'Mulish, sans-serif',
    },
    h2: {
      fontFamily: 'Mulish, sans-serif',
    },
    h3: {
      fontFamily: 'Mulish, sans-serif',
    },
    h4: {
      fontFamily: 'Mulish, sans-serif',
    },
    h5: {
      fontFamily: 'Mulish, sans-serif',
    },
    h6: {
      fontFamily: 'Mulish, sans-serif',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 0 6px rgba(0, 0, 0, 0.15)',
          background: "#fff"
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: "50px",
          paddingRight: "50px",
          borderRadius: "12px",
          textTransform: 'none', // Set textTransform to capitalize
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Mulish, sans-serif',
          textTransform: 'capitalize',
          letterSpacing: 1.2, 
          fontSize: 18
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 40
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            background: '#561AD9 !important',
            color: '#fff',
          },
        },
      },
    },
  },
});

const App = () => {

  const [user, setUser]  = useState(null)

  onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
          setUser(fireBaseUser)
      } else {
          setUser(null)
      }
  })


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Splash} />
          <Route path='/dashboard' Component={user ? Dashboard : Splash} />
          <Route path='/test-components' Component={TestComponents} />
          <Route path='/editar/:id' Component={EditCard} />
          <Route path='/sign-up' Component={SignUp} />
          <Route path='/login' Component={LogIn} />
          <Route path='/error' Component={Error} />
          <Route path='*' Component={Error} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
