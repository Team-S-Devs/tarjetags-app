import React, { useEffect, useState } from 'react'
import image from '../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { BiSolidUser } from "react-icons/bi";
import { LiaIdCardSolid } from "react-icons/lia";
import LinkComponent from '../components/buttons/LinkComponent'

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
          </div>
        </Link>
      </div>
      <nav className={'navigation ' +(conditional)}>

      <LiaIdCardSolid className='icon-header'/>
        <Link to="/"><span className='link'>Ver Tarjetas Creadas</span></Link>

        <BiSolidUser className='icon-header'/>
        <Link to="/"><span className='link'>Ver Perfil</span></Link>
        <Link to="" target='_blank'><span className='link mainButton'>Chapo Guzman</span></Link>
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