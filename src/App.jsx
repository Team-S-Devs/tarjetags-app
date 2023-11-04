import { Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Splash from './pages/Splash'
import 'bootstrap/dist/css/bootstrap.min.css';
import TestComponents from './pages/TestComponents'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Splash} />
        <Route path='test-components' Component={TestComponents} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
