import React, { useState } from 'react'
import StyledCard from '../components/card/StyledCard';
import ThinTitle from '../components/texts/ThinTitle';
import { IconButton, Typography } from '@mui/material';
import {
    FaPhone,
    FaFacebookMessenger,
    FaTelegram,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'
import { GoTrash } from 'react-icons/go'
import { LiaEditSolid } from 'react-icons/lia'
import SmallPrimaryButton from '../components/buttons/SmallPrimaryButton';
import ContactMethodsDialog from '../components/modals/ContactMethodsDialog';
import { IoLogoWhatsapp, IoMail } from 'react-icons/io5';

export const contactButtonsOptions = [
    { 
        name: 'Teléfono', icon: <FaPhone size={40} />, 
        color: '#2E60E7', placeholder: '76543218', type: "tel"
    },
    { name: 'E-mail', icon: <IoMail size={40} />, color: '#E42300', placeholder: 'usuario@ejemplo.com', type: "mail" },
    { name: 'WhatsApp', icon: <IoLogoWhatsapp size={40} />, 
        color: '#25D366', placeholder: 'https://twitter.com/tuperfil', type: "tel" },
    { name: 'Messenger', icon: <FaFacebookMessenger size={40} />, 
        color: '#0078ff', placeholder: 'https://www.linkedin.com/in/tuperfil', type: "text" },
    { name: 'Telegram', 
        icon: <FaTelegram size={40} />, 
        color: '#0088cc', placeholder: 'https://www.youtube.com/c/tucanal', type: "tel" },
];

const ContactButtons = ({ elementsInfo = {title: "", description: "", contactLinks: [] }, setElementsInfo }) => {
    const [openContactModal, setOpenContactModal] = useState(false)

    const [indexEditContactLink, setIndexEditContactLink] = useState(-1)

    const deletedContactLinkByIndex = (index) => {
        let contactLinksCopy = [...elementsInfo.ContactLinks];
        contactLinksCopy.splice(index, 1);
        setElementsInfo({...elementsInfo, contactLinks: contactLinksCopy })
    }

    const editContactLink = (index) => {
        setIndexEditContactLink(index)
        setOpenContactModal(true)
    }

    return (
        <StyledCard style={{ padding: 30 }}>
            {
                elementsInfo.socialLinks.length === 0 ? (
                    <>
                        <ThinTitle variant='subtitle1' color='primary' textAlign='center'>
                            Agrega números de teléfono, direcciones de correo electrónico y otros métodos de contacto para que las personas puedan comunicarse contigo en diversas situaciones.
                        </ThinTitle>
                        <div className="mt-4"></div>
                        <ThinTitle variant='subtitle1' color='gray' textAlign='center'>
                            Haz clic en 'Agregar Contacto' para empezar
                        </ThinTitle>
                    </>
                ) : (
                    <>
                        {
                            elementsInfo.contactLinks.map((icon, index) => (
                                <div className="d-flex align-items-center mt-2 mb-3" key={icon.name}>
                                    <div className='d-flex align-items-center flex-column'>
                                        <IconButton style={{ color: contactButtonsOptions.find((option) => option.name === icon.name).color }}>
                                            {contactButtonsOptions.find((option) => option.name === icon.name).icon}
                                        </IconButton>
                                        <Typography variant='caption'>{icon.name}</Typography>
                                    </div>

                                    <Typography style={{ flex: 100, wordWrap: "break-word", width: 120 }} key={icon.url + index} marginLeft={2} marginRight={2}>{icon.url}</Typography>
                                    <IconButton onClick={() => editContactLink(index)}>
                                        <LiaEditSolid size={30} color='#4C77EA'/>
                                    </IconButton>
                                    <IconButton color='error' onClick={() => deletedContactLinkByIndex(index)}>
                                        <GoTrash/>
                                    </IconButton>
                                </div>
                            ))
                        }
                    </>
                )
            }
            <div className="mt-4"></div>
            <div className="d-flex align-items-center justify-content-center">
                <SmallPrimaryButton onClick={() => setOpenContactModal(true)}>Agregar Contacto</SmallPrimaryButton>
            </div>
            <ContactMethodsDialog 
                open={openContactModal} 
                onClose={() => {
                    setOpenContactModal(false);
                    setIndexEditContactLink(-1)
                }}
                setElementsInfo={setElementsInfo}
                elementsInfo={elementsInfo}
                indexEditContactLink={indexEditContactLink}
                isEditing={indexEditContactLink !== -1}
            />
        </StyledCard>
    )
}

export default ContactButtons