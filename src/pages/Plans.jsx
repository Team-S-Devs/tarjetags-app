import React, { useEffect } from "react";
import Header from "../sections/Header";
import BoldTitle from "../components/texts/BoldTitle";
import ThinTitle from "../components/texts/ThinTitle";
import { Grid } from "@mui/material";
import StyledCard from "../components/card/StyledCard";
import HorizontalLine from "../components/lines/HorizontalLine";
import { FaRegClock } from "react-icons/fa";
import { GoCheckCircleFill, GoXCircle } from "react-icons/go";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import { Link } from "react-router-dom";

const plansItems = [
  {
    code: 0,
    title: "Licencia Gratuita",
    price: "Bs. 0.00",
    duration: "Permanente",
  },
  {
    code: 1,
    title: "Licencia Semestral",
    price: "Bs. 200.00",
    duration: "6 meses",
  },
  { code: 2, title: "Licencia Anual", price: "Bs. 300.00", duration: "1 año" },
];

const items = [
  {
    title: "Publica tu tarjeta",
    includedIn: [0, 1, 2],
  },
  {
    title: "Personaliza los colores de tu tarjeta",
    includedIn: [0, 1, 2],
  },
  {
    title: "Agrega servicios o productos",
    includedIn: [1, 2],
  },
  {
    title: "Agrega links de redes sociales",
    includedIn: [1, 2],
  },
  {
    title: "Agrega información de contacto",
    includedIn: [1, 2],
  },
  {
    title: "Agrega botones personalizados",
    includedIn: [1, 2],
  },
  {
    title: "Desbloquea todos los íconos",
    includedIn: [1, 2],
  },
];

const Plans = ({ user }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const obtenerSaludo = () => {
    const horaActual = new Date().getHours();

    if (horaActual >= 5 && horaActual < 12) {
      return "Buenos%20días";
    } else if (horaActual >= 12 && horaActual < 18) {
      return "Buenas tardes";
    } else {
      return "Buenas%20noches";
    }
  };

  const getWppLink = (item) => {
    return `https://wa.me/59163073135?text=${obtenerSaludo()}.%20Deseo adquirir la ${
      item.title
    } para mi cuenta cuyo correo es: ${user.email}`;
  };

  return (
    <div className="container">
      <Header />
      <div
        style={{ flex: 100, marginTop: 100, width: "100%" }}
        className="d-flex flex-column"
      >
        <BoldTitle style={{ flex: 1 }} textAlign="center">
          Adquire una licencia
        </BoldTitle>
        <div className="mt-1" style={{ padding: 30 }}>
          <ThinTitle variant="h6" color="primary" textAlign="center">
            Adquiere una licencia y desbloquea un mundo de posibilidades para
            crear tarjetas más personalizadas y completas. Con nuestras
            licencias tendrás acceso a herramientas y funciones adicionales.
          </ThinTitle>
        </div>
        <Grid container spacing={8} display={"flex"} justifyContent={"center"}>
          {plansItems.map((plan) => (
            <Grid item sm={12} md={12} lg={4} key={plan.code}>
              <StyledCard>
                <div className="card-content-container">
                  <ThinTitle variant="h5" color="primary" textAlign="center">
                    {plan.title}
                  </ThinTitle>
                  <div className="mt-2"></div>
                  <ThinTitle variant="h5" textAlign="center">
                    {plan.price}
                  </ThinTitle>
                  <div className="mt-1"></div>
                  <HorizontalLine />
                  {items.map((item) => (
                    <div className="d-flex align-items-center mt-1" key={plan.code + item.title}>
                      {item.includedIn.includes(plan.code) ? (
                        <GoCheckCircleFill color="#561AD9" />
                      ) : (
                        <GoXCircle color="#561AD9" />
                      )}
                      <div className="ml-2"></div>
                      <ThinTitle variant="body1" textAlign="center">
                        {item.title}
                      </ThinTitle>
                    </div>
                  ))}
                  <div className="d-flex align-items-center mt-1">
                    <FaRegClock color="#561AD9" />
                    <div className="ml-2"></div>
                    <ThinTitle variant="body1" textAlign="center">
                      Duración: {plan.duration}
                    </ThinTitle>
                  </div>
                  <div className="mt-4"></div>
                  {plan.code > 0 ? (
                    <Link to={getWppLink(plan)} target="_blank">
                      <SmallPrimaryButton fullWidth>
                        Adquirir Plan
                      </SmallPrimaryButton>
                    </Link>
                  ) : (
                    <div style={{ height: 36 }}></div>
                  )}
                </div>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Plans;
