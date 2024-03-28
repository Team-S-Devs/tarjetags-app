import React, { useEffect, useState } from "react";
import Header from "../sections/Header";
import BoldTitle from "../components/texts/BoldTitle";
import ThinTitle from "../components/texts/ThinTitle";
import { useNavigate, useParams } from "react-router-dom";
import ShareCard from "../components/card/ShareCard";
import InfoCard from "../components/card/InfoCard";
import { Button } from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";
import { SITE_NAME } from "../utils/constants";
import { MetaTags } from "react-meta-tags";

const CardDetails = ({ user }) => {
  const { cardId } = useParams();
  const [urlWithId, setUrlWithId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = window.location.origin;
    const urlWithId = `${currentUrl}/${cardId}`;
    setUrlWithId(urlWithId);
  }, []);

  return (
    <div
      className="container d-flex flex-column align-items-end"
      style={{ height: "100vh", paddingBottom: "60px" }}
    >
      <MetaTags>
        <title>{`Detalles ${cardId} - ${SITE_NAME}`}</title>
      </MetaTags>
      <Header />
      <div
        style={{ flex: 100, marginTop: 100, width: "100%" }}
        className="d-flex flex-column"
      >
        <div className="d-flex flex-column align-items-start">
          <Button
            startIcon={<FaChevronLeft />}
            style={{ fontSize: 18, padding: 0 }}
            onClick={() => navigate("/dashboard")}
          >
            Volver
          </Button>
          <BoldTitle
            style={{ marginTop: 10, width: "100%" }}
            textAlign="center"
          >
            Mi Tarjeta Digital
          </BoldTitle>
        </div>
        <div className="mt-5"></div>
        <ThinTitle color="primary" variant="h5" textAlign="left">
          Compartir
        </ThinTitle>
        <div className="mt-3"></div>
        <ShareCard urlWithId={urlWithId} cardId={cardId} />
        <div className="mt-5"></div>
        <ThinTitle color="primary" variant="h5" textAlign="left">
          Información
        </ThinTitle>
        <div className="mt-3"></div>
        <InfoCard cardId={cardId} user={user} />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default CardDetails;
