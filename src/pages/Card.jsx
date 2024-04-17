import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LICENSE_TYPES, MAIN_COLOR, SITE_NAME } from "../utils/constants";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { verificarLicencia } from "../utils/methods";
import Preview from "../sections/Preview";
import { Helmet } from "react-helmet";
import "../assets/styles/loader.css";
import marca from "../assets/images/auth/Marca.svg";

const Card = () => {
  const { cardId } = useParams();

  const navigate = useNavigate();
  const [idCard, setIdCard] = useState("");
  const [licenseType, setLicenseType] = useState("");

  const [loadingGetting, setLoadingGetting] = useState(true);

  const [elementsInfo, setElementsInfo] = useState({
    title: "Tarjeta",
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
          if (!cardFields.adminCards) cardFields["adminCards"] = [];
          if (!cardFields.theme) cardFields["theme"] = "light";
          if (!cardFields.color) cardFields["color"] = "#561AD9";
          setElementsInfo(cardFields);

          const docSnap = await getDoc(doc(db, "users", cardFields.userId));
          const user = docSnap.data();

          const userLimitDate = user.limitDate;
          setLicenseType(
            userLimitDate.toDate() > new Date()
              ? user.licenseType
              : LICENSE_TYPES.FREE
          );
          if (!verificarLicencia(user.licenseType, userLimitDate))
            navigate("/error");
        } else {
          navigate("/error");
        }
      } catch (error) {
        navigate("/error");
      }
      setLoadingGetting(false);
    };

    fetchCardData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{`${elementsInfo.title} - ${SITE_NAME}`}</title>
        <meta name="description" content={elementsInfo.description} />
        <meta
          property="og:image"
          content={
            elementsInfo.coverPhoto && elementsInfo.coverPhoto.url !== ""
              ? elementsInfo.coverPhoto.url
              : marca
          }
        />
      </Helmet>
      {loadingGetting ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh", background: MAIN_COLOR, width: "100vw" }}
        >
          <span className="loader-white"></span>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: "100vh",
            }}
          >
            <Preview elementsInfo={elementsInfo} licenseType={licenseType} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
