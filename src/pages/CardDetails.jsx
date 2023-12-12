import React, { useEffect, useState } from 'react'
import Header from '../sections/Header'
import BoldTitle from '../components/texts/BoldTitle'
import ThinTitle from '../components/texts/ThinTitle'
import { useNavigate, useParams } from 'react-router-dom'
import ShareCard from '../components/card/ShareCard'
import InfoCard from '../components/card/InfoCard'
import BackButton from '../components/buttons/BackButton'

const CardDetails = ({ user }) => {
  const { cardId } = useParams();
  const [urlWithId, setUrlWithId] = useState('');

  useEffect(() => {
    const currentUrl = window.location.origin;
    const urlWithId = `${currentUrl}/${cardId}`;
    setUrlWithId(urlWithId);
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='container d-flex flex-column align-items-end' style={{ height: "100vh", paddingBottom: '60px'}}>
        <Header/>
        <div style={{ flex: 100, marginTop: 100, width: "100%" }} className='d-flex flex-column'>
            <div className="d-flex">
              <div className="d-flex button" onClick={handleBack}>
                <BackButton color='#561AD9' size={20} />
                <div className="ml-2"></div>
                <ThinTitle color='primary' variant='h6' textAlign='left'>Volver</ThinTitle>
              </div>
              <BoldTitle style={{ flex: 1 }} textAlign='center'>Mi Tarjeta Digital</BoldTitle>
            </div>
            <div className="mt-5"></div>
            <ThinTitle color='primary' variant='h5' textAlign='left'>Compartir</ThinTitle>
            <div className="mt-3"></div>
            <ShareCard urlWithId={urlWithId} cardId={cardId} />
            <div className="mt-5"></div>
            <ThinTitle color='primary' variant='h5' textAlign='left'>Información</ThinTitle>
            <div className="mt-3"></div>
            <InfoCard cardId={cardId} user={user} />
        </div>
    </div>
  )
}

export default CardDetails