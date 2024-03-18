import { Route, Routes, BrowserRouter } from "react-router-dom";
import Splash from "./pages/Splash";
import "bootstrap/dist/css/bootstrap.min.css";
import TestComponents from "./pages/TestComponents";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import { auth, db } from "./utils/firebase-config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EditCard from "./pages/EditCard";
import RestorePassword from "./pages/RestorePassword";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import CardDetails from "./pages/CardDetails";
import Plans from "./pages/Plans";
import Card from "./pages/Card";
import Admin from "./pages/Admin";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "::selection": {
          color: "#561AD9",
          background: "#fff",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#561AD9",
    },
    secondary: {
      main: "#604F83",
    },
    grey: {
      main: "#727070",
    },
    accent: {
      main: "#9DD91A",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontFamily: "Mulish, sans-serif",
    },
    h2: {
      fontFamily: "Mulish, sans-serif",
    },
    h3: {
      fontFamily: "Mulish, sans-serif",
    },
    h4: {
      fontFamily: "Mulish, sans-serif",
    },
    h5: {
      fontFamily: "Mulish, sans-serif",
    },
    h6: {
      fontFamily: "Mulish, sans-serif",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0 0 6px rgba(0, 0, 0, 0.15)",
          background: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: "50px",
          paddingRight: "50px",
          borderRadius: "12px",
          textTransform: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "Mulish, sans-serif",
          textTransform: "capitalize",
          letterSpacing: 1.2,
          fontSize: 18,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 40,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: "#561AD9 !important",
            color: "#fff",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "15px", // Set your desired font size here
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "17px", // Set your desired font size here
        },
      },
    },
  },
});

const App = () => {

  const [user, setUser]  = useState(null)
  const [isAdmin, setIsAdmin] = useState(false);

  onAuthStateChanged(auth, (fireBaseUser) =>  {
      if (fireBaseUser) {
          setUser(fireBaseUser)
          
          var userStoredEmail = "";
            
          onSnapshot(doc(db, 'users', fireBaseUser.uid), (snapshot) => {
                  const userInfo = snapshot.data();
                  userStoredEmail = userInfo.email
                  setIsAdmin(userInfo.admin)
        
                  const updateStoreEmail = async () => {
                      const userDocRef = doc(db, 'users', auth.currentUser.uid);
                      const data = {
                          email: fireBaseUser.email,
                      };
                  
                      try {
                          await updateDoc(userDocRef, data);                          
                      } catch (error) {
                          console.error('Error updating email in Firestore:', error);
                      }
                  } 
                  
                  if (fireBaseUser.email != userStoredEmail) {
                      updateStoreEmail()
                  }
        
              }
          );

      } else {
          setUser(null)
      }
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Splash} />
            <Route path="/:cardId" Component={Card} />
            <Route path="/dashboard" Component={user ? Dashboard : Splash} />
            <Route path="/test-components" Component={TestComponents} />
            <Route path="/sign-up" Component={SignUp} />
            <Route path="/login" Component={LogIn} />
            <Route path="/error" Component={Error} />
            <Route path='/admin' Component={isAdmin ? Admin : Error}/>
            <Route path="/edit/:cardId" Component={EditCard} />
            <Route path="/restorePassword" Component={RestorePassword} />
            <Route
              path="/profile"
              Component={() =>
                user ? (
                  <Profile user={user} />
                ) : (
                  <Splash loggedNavigateTo="/profile" />
                )
              }
            />
            <Route
              path="/details/:cardId"
              Component={() =>
                user ? (
                  <CardDetails user={user} />
                ) : (
                  <Splash loggedNavigateTo="/dashboard" />
                )
              }
            />
            <Route
              path="/plans"
              Component={() =>
                user ? (
                  <Plans user={user} />
                ) : (
                  <Splash loggedNavigateTo="/plans" />
                )
              }
            />
            <Route path="*" Component={Error} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
