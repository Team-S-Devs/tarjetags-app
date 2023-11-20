import React from 'react'
import StyledCard from '../components/card/StyledCard'
import { FaUser } from 'react-icons/fa'
import ThinTitle from '../components/texts/ThinTitle'
import FieldText from '../components/form/fields/FieldText'

const ElementsCardTab = ({ elementsInfo, setElementsInfo }) => {

    const handleChange = (newVal, key) => {
        const copyEl = {...elementsInfo};
        copyEl[key] = newVal;
        setElementsInfo(copyEl)
    }
    
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
            <FieldText maxLength={30} label='Título' value={elementsInfo.title} setValue={newVal => handleChange(newVal, "title")} />
            <FieldText multiline maxLength={200} label='Descripción' marginTop={2}/>
        </div>
    </StyledCard>
    </>
  )
}

export default ElementsCardTab