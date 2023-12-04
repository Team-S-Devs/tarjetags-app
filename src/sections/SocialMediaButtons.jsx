import React, { useState } from 'react'
import StyledCard from '../components/card/StyledCard';
import ThinTitle from '../components/texts/ThinTitle';
import { IconButton, Typography } from '@mui/material';
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
    FaTwitch,
    FaSnapchat,
    FaReddit,
    FaDiscord,
    FaSpotify,
    FaBehance,
    FaPinterest,
    FaXing,
    FaFlickr,
    FaVimeo,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'
import { GoTrash } from 'react-icons/go'
import { LiaEditSolid } from 'react-icons/lia'
import SmallPrimaryButton from '../components/buttons/SmallPrimaryButton';
import SocialMediaDialog from '../components/modals/SocialMediaDialog';

export const socialMediaOptions = [
    { name: 'Facebook', icon: <FaFacebook size={40} />, color: '#1877f2', placeholder: 'https://www.facebook.com/tuperfil' },
    { name: 'Instagram', icon: <FaInstagram size={40} />, color: '#e4405f', placeholder: 'https://www.instagram.com/tuperfil' },
    { name: 'Twitter', icon: <FaXTwitter size={40} />, color: '#000', placeholder: 'https://twitter.com/tuperfil' },
    { name: 'LinkedIn', icon: <FaLinkedin size={40} />, color: '#0077b5', placeholder: 'https://www.linkedin.com/in/tuperfil' },
    { name: 'YouTube', icon: <FaYoutube size={40} />, color: '#ff0000', placeholder: 'https://www.youtube.com/c/tucanal' },
    { name: 'TikTok', icon: <FaTiktok size={40} />, color: '#000000', placeholder: 'https://www.tiktok.com/@tunombredeusuario' },
    { name: 'Behance', icon: <FaBehance size={40} />, color: '#1769ff', placeholder: 'https://www.behance.net/tuperfil' },
    { name: 'Pinterest', icon: <FaPinterest size={40} />, color: '#bd081c', placeholder: 'https://www.pinterest.com/tuperfil' },
    { name: 'Reddit', icon: <FaReddit size={40} />, color: '#ff4500', placeholder: 'https://www.reddit.com/user/tunombredeusuario' },
    { name: 'Snapchat', icon: <FaSnapchat size={40} />, color: '#fffc00', placeholder: 'https://www.snapchat.com/add/tunombredeusuario' },
    { name: 'Twitch', icon: <FaTwitch size={40} />, color: '#6441a5', placeholder: 'https://www.twitch.tv/tucanal' },
    { name: 'Discord', icon: <FaDiscord size={40} />, color: '#5865f2', placeholder: 'https://discord.gg/yourserver' },
    { name: 'Spotify', icon: <FaSpotify size={40} />, color: '#1db954', placeholder: 'https://open.spotify.com/user/tunombredeusuario' },
    { name: 'Flickr', icon: <FaFlickr size={40} />, color: '#ff0084', placeholder: 'https://www.flickr.com/photos/tunombredeusuario' },
    { name: 'Vimeo', icon: <FaVimeo size={40} />, color: '#1ab7ea', placeholder: 'https://vimeo.com/tunombredeusuario' },
    { name: 'Xing', icon: <FaXing size={40} />, color: '#006567', placeholder: 'https://www.xing.com/profile/tuperfil' },
];

const SocialMediaButtons = ({ elementsInfo = {title: "", description: "", socialLinks: [] }, setElementsInfo }) => {
    const [openSocialModal, setOpenSocialModal] = useState(false)

    const [indexEditSocialLink, setIndexEditSocialLink] = useState(-1)

    const deletedSocialLinkByIndex = (index) => {
        let socialLinksCopy = [...elementsInfo.socialLinks];
        socialLinksCopy.splice(index, 1);
        setElementsInfo({...elementsInfo, socialLinks: socialLinksCopy })
    }

    const editSocialLink = (index) => {
        setIndexEditSocialLink(index)
        setOpenSocialModal(true)
    }

    return (
        <StyledCard style={{ padding: 30 }}>
            {
                elementsInfo.socialLinks.length === 0 ? (
                    <>
                        <ThinTitle variant='subtitle1' color='primary' textAlign='center'>
                            Conecta tus perfiles de redes sociales a tu tarjeta de presentación digital para que las personas puedan encontrarte fácilmente en línea.
                        </ThinTitle>
                        <div className="mt-4"></div>
                        <ThinTitle variant='subtitle1' color='gray' textAlign='center'>
                            Haz clic en 'Agregar Red Social' para empezar
                        </ThinTitle>
                    </>
                ) : (
                    <>
                        {
                            elementsInfo.socialLinks.map((icon, index) => (
                                <div className="d-flex align-items-center mt-2 mb-3" key={icon.name}>
                                    <div className='d-flex align-items-center flex-column'>
                                        <IconButton style={{ color: socialMediaOptions.find((option) => option.name === icon.name).color }}>
                                            {socialMediaOptions.find((option) => option.name === icon.name).icon}
                                        </IconButton>
                                        <Typography variant='caption'>{icon.name}</Typography>
                                    </div>

                                    <Typography style={{ flex: 100, wordWrap: "break-word", width: 120 }} key={icon.url + index} marginLeft={2} marginRight={2}>{icon.url}</Typography>
                                    <IconButton onClick={() => editSocialLink(index)}>
                                        <LiaEditSolid size={30} color='#4C77EA'/>
                                    </IconButton>
                                    <IconButton color='error' onClick={() => deletedSocialLinkByIndex(index)}>
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
                <SmallPrimaryButton onClick={() => setOpenSocialModal(true)}>Agregar Red Social</SmallPrimaryButton>
            </div>
            <SocialMediaDialog 
                open={openSocialModal} 
                onClose={() => {
                    setOpenSocialModal(false);
                    setIndexEditSocialLink(-1)
                }}
                setElementsInfo={setElementsInfo}
                elementsInfo={elementsInfo}
                indexEditSocialLink={indexEditSocialLink}
                isEditing={indexEditSocialLink !== -1}
            />
        </StyledCard>
    )
}

export default SocialMediaButtons