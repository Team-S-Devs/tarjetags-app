import React, { useEffect, useState } from 'react'
import image from '../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [location]);

  const onClickHeader = () => {
    setIsOpen(!isOpen)
  }

  const conditional = (isOpen) ? 'navigationResponsive' :''

  return (
    <header>
      <div className='logo_img'>
        <Link to='/#home'>
          <div className='logoHeader'>
            <img src={image} alt="vetsoft logo"/>
            <p><span className='primary-purple'>Vet</span><span className='primary-319c'>Soft</span></p>
          </div>
        </Link>
      </div>
      <nav className={'navigation ' +(conditional)}>
        <Link to="/clinica"><span className='link'>CLÍNICA</span></Link>
        <Link to="/peluqueria"><span className='link'>PELUQUERÍA</span></Link>
        <Link to="/petshop" className='link'><span className='link'>PETSHOP</span></Link>
        <Link to="/precios" className='link'><span className='link'>PRECIOS</span></Link>
        <Link to="https://wa.me/message/WP4EUCZXJR3XL1" target='_blank'><span className='link mainButton'>SOLICITA TU DEMO</span></Link>
      </nav>
      <div className='menuButton' onClick={onClickHeader}>
        <button className="headerButton">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header