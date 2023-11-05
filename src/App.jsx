import { Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Splash from './page/Splash'
import Home from './page/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' Component={Home} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
