import React, { useEffect, useState } from "react";
import Header from "../sections/Header";
import BoldTitle from "../components/texts/BoldTitle";
import EditCardTabs from "../sections/EditCardTabs";
import PreviewCardTab from "../sections/PreviewCardTab";
import useWindowSize from "../hooks/useWindowsSize";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import MediumPrimaryButton from "../components/buttons/MediumPrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../utils/firebase-config";
import "../assets/styles/loader.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditCard = () => {
  const { cardId } = useParams();
  const { width, height } = useWindowSize();
  const [nav, setNav] = useState("edit");
  const navigate = useNavigate();
  const [idCard, setIdCard] = useState("");

  const handleChange = (event, newValue) => {
    if (newValue == null) return;
    if (newValue != nav) setNav(newValue);
  };

  const [elementsInfo, setElementsInfo] = useState({
    title: "",
    description: "",
    profilePhoto: {
      name: "profilePhoto",
      file: null,
      url: "",
    },
    coverPhoto: {
      name: "coverPhoto",
      file: null,
      url: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [loadingGetting, setLoadingGetting] = useState(true);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    let elCopy = { ...elementsInfo };
    if (elCopy.profilePhoto.file != null && elCopy.coverPhoto != null) {
      elCopy = await handleImageUpload();
    } else if (elCopy.profilePhoto.file == null) {
      delete elCopy.profilePhoto;
    } else {
      delete elCopy.coverPhoto;
    }
    const docCard = doc(db, "cards", cardId);

    try {
      await updateDoc(docCard, { ...elCopy });
      navigate(`/details/${cardId}`);
    } catch (error) {
      alert("Hubo un error, por favor inténtalo de nuevo");
    }

    setLoading(false);
  };

  // Function to handle image upload
  const handleImageUpload = async () => {
    const { profilePhoto, coverPhoto } = elementsInfo;

    const returnOBject = {
      ...elementsInfo,
    };

    if (profilePhoto.file) {
      try {
        const storageRef = ref(
          storage,
          `${elementsInfo.userId}/${cardId}/profilePhoto`
        );
        // Upload the file to Firebase Cloud Storage
        await uploadBytes(storageRef, profilePhoto.file);

        // Get the URL of the uploaded image
        const url = await getDownloadURL(storageRef);

        returnOBject["profilePhoto"] = {
          ...profilePhoto,
          file: "",
          url,
        };
      } catch (error) {
        alert("Error subiendo imagen: " + error);
        // Handle the error as needed
      }
    }

    if (coverPhoto.file) {
      try {
        const storageRef = ref(
          storage,
          `${elementsInfo.userId}/${cardId}/coverPhoto`
        );
        // Upload the file to Firebase Cloud Storage
        await uploadBytes(storageRef, coverPhoto.file);

        // Get the URL of the uploaded image
        const url = await getDownloadURL(storageRef);

        // Optionally, return the updated state or any other data
        returnOBject["coverPhoto"] = {
          ...coverPhoto,
          file: "",
          url,
        };
      } catch (error) {
        alert("Error subiendo imagen: " + error);
      }
    }

    setElementsInfo(returnOBject);

    return returnOBject;
  };

  useEffect(() => {
    const fetchCardData = async () => {
      setLoadingGetting(true);
      try {
        const cardDocRef = doc(db, "cards", cardId);
        const cardSnapshot = await getDoc(cardDocRef);
        setIdCard(cardDocRef.id);

        if (cardSnapshot.exists()) {
          const cardFields = cardSnapshot.data();
          if (!cardFields.profilePhoto)
            cardFields["profilePhoto"] = {
              name: "profilePhoto",
              url: "",
              file: null,
            };
          if (!cardFields.coverPhoto)
            cardFields["coverPhoto"] = {
              name: "coverPhoto",
              url: "",
              file: null,
            };
          if (!cardFields.socialLinks) cardFields["socialLinks"] = [];
          if (!cardFields.contactLinks) cardFields["contactLinks"] = [];
          if (!cardFields.productCategories)
            cardFields["productCategories"] = [];
          if (!cardFields.products) cardFields["products"] = [];
          if (!cardFields.extraButtons) cardFields["extraButtons"] = [];
          if (!cardFields.theme) cardFields["theme"] = "light";
          if (!cardFields.color) cardFields["color"] = "#561AD9";
          setElementsInfo(cardFields);
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        navigate("/dashboard");
      }
      setLoadingGetting(false);
    };

    fetchCardData();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "90px" }}>
      <Header />
      <BoldTitle textAlign="center">Editar Tarjeta</BoldTitle>
      <div className="mt-3"></div>
      <>
        {loadingGetting ? (
          <div className="full-container d-flex align-items-center justify-content-center w-100">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            {width > 986 ? (
              <div className="d-flex">
                <EditCardTabs
                  elementsInfo={elementsInfo}
                  setElementsInfo={setElementsInfo}
                  cardId={idCard}
                />
                <PreviewCardTab handleSave={handleSave} loading={loading} />
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
                {nav === "edit" ? (
                  <EditCardTabs
                    elementsInfo={elementsInfo}
                    setElementsInfo={setElementsInfo}
                    cardId={idCard}
                  />
                ) : (
                  <PreviewCardTab handleSave={handleSave} loading={loading} />
                )}
                <div
                  style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                  className="container"
                >
                  <MediumPrimaryButton
                    loading={loading}
                    onClick={handleSave}
                    fullWidth
                  >
                    Publicar Cambios
                  </MediumPrimaryButton>
                </div>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default EditCard;
