import { Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Splash from './pages/Splash'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import TestComponents from './pages/TestComponents'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import LogIn from './pages/LogIn';

const theme = createTheme({
  palette: {
    primary: {
      main: '#561AD9',
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
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='test-components' Component={TestComponents} />
          <Route path='login' Component={LogIn} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
