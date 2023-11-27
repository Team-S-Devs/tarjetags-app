import React, { useEffect, useState } from 'react'
import Header from '../sections/Header'
import BoldTitle from '../components/texts/BoldTitle'
import EditCardTabs from '../sections/EditCardTabs';
import PreviewCardTab from '../sections/PreviewCardTab';
import useWindowSize from '../hooks/useWindowsSize';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import MediumPrimaryButton from '../components/buttons/MediumPrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../utils/firebase-config';
import '../assets/styles/loader.css'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const EditCard = () => {
    const { cardId } = useParams();
    const { width, height } = useWindowSize();
    const [nav, setNav] = useState("edit");
    const navigate = useNavigate();
    
    const handleChange = (event, newValue) => {
        if(newValue == null) return;
        if(newValue != nav) setNav(newValue);
    };

    const [elementsInfo, setElementsInfo] = 
        useState(
            { 
                title: "", 
                description: "",
                profilePhoto: {
                    name: "profilePhoto",
                    file: null,
                    url: "",
                } 
            }
        );
    const [loading, setLoading] = useState(false);
    const [loadingGetting, setLoadingGetting] = useState(true);

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const elCopy = await handleImageUpload();
        const docCard = doc(db, 'cards', cardId);
        await updateDoc(docCard, {...elCopy})
        navigate("/")
        setLoading(false)
    }

    // Function to handle image upload
    const handleImageUpload = async () => {
        const { profilePhoto } = elementsInfo;
      
        if (profilePhoto.file) {
          try {
            const storageRef = ref(storage, `${elementsInfo.userId}/${cardId}/profilePhoto`);
            // Upload the file to Firebase Cloud Storage
            await uploadBytes(storageRef, profilePhoto.file);
      
            // Get the URL of the uploaded image
            const url = await getDownloadURL(storageRef);
      
            // Update the state with the URL
            setElementsInfo((prevElementsInfo) => ({
              ...prevElementsInfo,
              profilePhoto: {
                ...profilePhoto,
                file: "",
                url,
              },
            }));
      
      
            // Optionally, return the updated state or any other data
            return {
              ...elementsInfo,
              profilePhoto: {
                ...profilePhoto,
                file: "",
                url,
              },
            };
          } catch (error) {
            console.error('Error uploading image:', error);
            // Handle the error as needed
          }
        }
    };

    useEffect(() => {
        const fetchCardData = async () => {
            setLoadingGetting(true);
            try {
                const cardDocRef = doc(db, 'cards', cardId);
                const cardSnapshot = await getDoc(cardDocRef);
        
                if (cardSnapshot.exists()) {
                    const cardFields = cardSnapshot.data();
                    if(!cardFields.profilePhoto) cardFields["profilePhoto"] = { name: "profilePhoto", url: "", file: null }
                    setElementsInfo(cardFields);
                } else {
                    navigate("/dashboard")
                }
            } catch (error) {
                navigate("/dashboard")
            }
            setLoadingGetting(false)
        };
    
        fetchCardData();
      }, []);

 

  return (
    <div className='container' style={{ paddingTop: '90px'}}>
        <Header/>
        <BoldTitle textAlign='center'>Editar Tarjeta</BoldTitle>
        <div className="mt-3"></div>
        <>
            {
                loadingGetting ? (
                    <div className="full-container d-flex align-items-center justify-content-center w-100">
                        <span className="loader"></span>
                    </div> 
                ) : (
                    <>
                    {
                width > 986 ? (
                    <div className="d-flex">
                        <EditCardTabs elementsInfo={elementsInfo} setElementsInfo={setElementsInfo}/>
                        <PreviewCardTab  handleSave={handleSave} loading={loading} />
                    </div>
                ) : (
                    <>
                        <ToggleButtonGroup
                            color="primary"
                            value={nav}
                            exclusive
                            onChange={handleChange}
                            fullWidth
                        >
                            <ToggleButton value="edit">Edición</ToggleButton>
                            <ToggleButton value="preview">Vista Previa</ToggleButton>
                        </ToggleButtonGroup>
                        {
                            nav === "edit" ? <EditCardTabs elementsInfo={elementsInfo} setElementsInfo={setElementsInfo}/> : <PreviewCardTab  handleSave={handleSave} loading={loading} />
                        }
                       <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: '10px', boxSizing: 'border-box' }} className='container'>
                            <MediumPrimaryButton
                                loading={loading}
                                onClick={handleSave}
                                fullWidth
                            >Publicar Cambios</MediumPrimaryButton>
                        </div>
                    </>
                )
        }
        </>
                )
            }
        </>
    </div>
  )
}

export default EditCard