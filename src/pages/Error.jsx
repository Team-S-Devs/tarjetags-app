import React from "react";
import BigPrimaryButton from "../components/buttons/BigPrimaryButton";
import { useNavigate } from "react-router-dom";
import "../assets/styles/404style.css";
import Header from "../sections/Header";
import { MetaTags } from "react-meta-tags";
import { SITE_NAME } from "../utils/constants";

const Error = () => {
  const navigation = useNavigate();

  const goHome = () => {
    navigation("/");
  };
  return (
    <div className="container">
      <MetaTags>
        <title>{`Página no encontrada - ${SITE_NAME}`}</title>
      </MetaTags>
      <Header />
      <div className="general-background">
        <div className="container container-error-page">
          <h1 className="text-center ">404</h1>
          <div className="four_zero_four_bg"></div>
          <h3>¿ Te Perdiste ?</h3>
          <p>La Pagina que buscas no esta disponible!</p>
          <BigPrimaryButton children={"Volver al Inicio"} onClick={goHome} />
        </div>
      </div>
    </div>
  );
};

export default Error;
