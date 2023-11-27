import React from 'react'
import StyledCard from '../components/card/StyledCard'
import { FaUser } from 'react-icons/fa'
import ThinTitle from '../components/texts/ThinTitle'
import FieldText from '../components/form/fields/FieldText'
import useWindowSize from '../hooks/useWindowsSize'
import ImageUploader from '../components/form/fields/ImageUploader'

const ElementsCardTab = ({ elementsInfo = { 
    title: "", 
    description: "",
    profilePhoto: {
        name: "",
        url: "",
        file: null
    } 
}, setElementsInfo }) => {

    const handleChange = (newVal, key) => {
        const copyEl = {...elementsInfo};
        copyEl[key] = newVal;
        setElementsInfo(copyEl)
    }

    const handleTwoChange = (newVal, key, newKey) => {
        const copyEl = {...elementsInfo};
        copyEl[key][newKey] = newVal;
        setElementsInfo(copyEl)
    }

    const { width } = useWindowSize();
    
    return (
        <>
        <div className="mt-4"></div>
        <StyledCard>
            <div
                style={{ paddingLeft: width > 768 ? 32 : 16, paddingRight: width > 768 ? 32 : 16, paddingTop: 20, paddingBottom: 16 }}
            >
                <div 
                    className="d-flex align-items-center" 
                >
                    <FaUser color='#561AD9' size={20} style={{ marginRight: 8 }}/>
                    <ThinTitle color='primary' variant='h6'>Información de usuario</ThinTitle>
                </div>
                <div className="mt-3"></div>
                <FieldText 
                    maxLength={80} label='Título' value={elementsInfo.title} setValue={newVal => handleChange(newVal, "title")} 
                />
                <FieldText 
                    multiline maxLength={200} value={elementsInfo.description} label='Descripción' marginTop={2} minRows={3}
                    setValue={newVal => handleChange(newVal, "description")}
                />
                <ImageUploader 
                    file={elementsInfo.profilePhoto?.file} 
                    setFile={newVal => handleTwoChange(newVal, "profilePhoto", "file")} 
                    imageUrl={elementsInfo.profilePhoto?.url} 
                    setImageUrl={newVal => handleTwoChange(newVal, "profilePhoto", "url")} 
                    handleErrorMsg={() => {}}
                    productData={elementsInfo.profilePhoto}
                    label="Foto de perfil o logotipo: "
                />
            </div>
        </StyledCard>
        </>
    )
}

export default ElementsCardTab