import React, { useEffect, useState } from "react";
import StyledCard from "./StyledCard";
import { db } from "../../utils/firebase-config";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import lightPurpleSvg from "../../assets/images/light-purple.svg";
import { Grid } from "@mui/material";
import ThinTitle from "../texts/ThinTitle";
import { useNavigate } from "react-router-dom";
import {
  getDateFromTimestamp,
  getStringDateFromTimestamp,
} from "../../utils/methods";
import MediumPrimaryButton from "../buttons/MediumPrimaryButton";
import { FaStar } from "react-icons/fa";
import useWindowSize from "../../hooks/useWindowsSize";

const InfoCard = ({ cardId, user }) => {
  const [loadingGetting, setLoadingGetting] = useState(true);
  const [elementsInfo, setElementsInfo] = useState({
    title: "",
    description: "",
    profilePhoto: "",
    coverPhoto: "",
  });
  const [license, setLicense] = useState("");
  const [isPro, setIsPro] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      setLoadingGetting(true);
      try {
        const cardDocRef = doc(db, "cards", cardId);
        const cardSnapshot = await getDoc(cardDocRef);

        if (cardSnapshot.exists()) {
          const cardFields = cardSnapshot.data();

          setElementsInfo({
            ...cardFields,
            createdAt: getStringDateFromTimestamp(cardFields.createdAt),
          });
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

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapshot) => {
        const userInfo = snapshot.data();
        setIsPro(getDateFromTimestamp(userInfo.license) >= new Date());
        setLicense(getStringDateFromTimestamp(userInfo.license));
      },
      (error) => {
        navigate("/");
      }
    );

    return () => unsubscribe();
  }, [user]);

  const { width } = useWindowSize();

  return (
    <StyledCard>
      {loadingGetting ? (
        <div className="d-flex align-items-center justify-content-center">
          <div className="mt-4 mb-4 loader"></div>
        </div>
      ) : (
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <img
              src={
                elementsInfo.coverPhoto?.url &&
                elementsInfo.coverPhoto?.url !== ""
                  ? elementsInfo.coverPhoto.url
                  : lightPurpleSvg
              }
              alt={`${elementsInfo.title}`}
              className="portrait-card-img"
            />
            <img
              src={
                elementsInfo.profilePhoto?.url &&
                elementsInfo.profilePhoto?.url !== ""
                  ? elementsInfo.profilePhoto.url
                  : lightPurpleSvg
              }
              alt={`${elementsInfo.title}`}
              className="profile-card-img"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
          >
            <div className="d-flex">
              <ThinTitle color="primary" variant="h6" textAlign="left">
                Titulo:&nbsp;&nbsp;&nbsp;
              </ThinTitle>
              <ThinTitle color="black" variant="h6" textAlign="left">
                {elementsInfo.title}
              </ThinTitle>
            </div>
            <div className="mt-1"></div>
            <div className="d-flex">
              <ThinTitle color="primary" variant="h6" textAlign="left">
                Fecha de creación:&nbsp;&nbsp;&nbsp;
                <span style={{ color: "#000" }}>
                    {elementsInfo.createdAt}
                </span>
              </ThinTitle>
            </div>
            <div className="mt-1"></div>
            <div className="d-flex">
              <ThinTitle color="primary" variant="h6" textAlign="left">
                Licencia:&nbsp;&nbsp;&nbsp;
              </ThinTitle>
              <ThinTitle color="black" variant="h6" textAlign="left">
                {isPro ? `Hasta ${license}` : "Gratuita"}
              </ThinTitle>
            </div>
            {!isPro && (
              <div className="mt-2">
                <MediumPrimaryButton
                  startIcon={<FaStar size={14} />}
                  onClick={() => navigate("/plans")}
                >
                  Adquirir licencia
                </MediumPrimaryButton>
              </div>
            )}
          </Grid>
        </Grid>
      )}
    </StyledCard>
  );
};

export default InfoCard;
