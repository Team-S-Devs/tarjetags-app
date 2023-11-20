import React from 'react'
import StyledCard from '../components/card/StyledCard'
import { FaUser } from 'react-icons/fa'
import ThinTitle from '../components/texts/ThinTitle'
import FieldText from '../components/form/fields/FieldText'

const ElementsCardTab = () => {
  return (
    <>
    <div className="mt-4"></div>
    <StyledCard>
        <div
            style={{ paddingLeft: 32, paddingRight: 32, paddingTop: 20, paddingBottom: 16 }}
        >
            <div 
                className="d-flex align-items-center" 
            >
                <FaUser color='#561AD9' size={20} style={{ marginRight: 8 }}/>
                <ThinTitle color='primary' variant='h6'>Información de usuario</ThinTitle>
            </div>
            <div className="mt-3"></div>
            <FieldText label='Título'/>
            <FieldText label='Descripción' marginTop={2}/>
        </div>
    </StyledCard>
    </>
  )
}

export default ElementsCardTab