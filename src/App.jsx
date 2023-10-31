import { Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Splash from './page/Splash'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' Component={Splash} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
