import React, { useEffect, useState } from "react";
import Header from "../sections/Header";
import BoldTitle from "../components/texts/BoldTitle";
import ThinTitle from "../components/texts/ThinTitle";
import { MetaTags } from "react-meta-tags";
import { SITE_NAME } from "../utils/constants";
import PricesSection from "../components/Prices/PricesSection";
import TableComparePlans from "../components/Prices/TableComparePlans";
import { Box, Container } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "../assets/styles/Prices/Plans.css";

const Plans = ({ user }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [value, setValue] = useState("plans");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <MetaTags>
        <title>{`Planes - ${SITE_NAME}`}</title>
      </MetaTags>
      <Header />
      <div
        style={{ flex: 100, marginTop: 100, width: "100%" }}
        className="d-flex flex-column"
      >
        <BoldTitle style={{ flex: 1 }} textAlign="center">
          Adquire una licencia
        </BoldTitle>
        <div className="mt-1 container" style={{ padding: 30 }}>
          <ThinTitle variant="h6" color="primary" textAlign="center">
            Adquiere una licencia y desbloquea un mundo de posibilidades para
            crear tarjetas más personalizadas y completas. Con nuestras
            licencias tendrás acceso a herramientas y funciones adicionales.
          </ThinTitle>
        </div>
        <br />
        <br />

        <Box className="box-Container">
          <TabContext value={value}>
            <Box className="tab-Container">
              <div
                className="tabList-Container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TabList
                  onChange={handleChange}
                  textColor="black"
                  indicatorColor="none"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tab
                    value="plans"
                    label="Planes Standard"
                    className="tab-Style"
                  />
                  <Tab
                    value="plansPartner"
                    label="Planes de Socios"
                    className="tab-Style"
                  />
                </TabList>
              </div>
              <TabPanel value="plans" className="tabPanel-Style">
                <br />
                <br />
                <Container>
                  <PricesSection user={user} />
                </Container>
                <br />
                <br />
                <TableComparePlans />
              </TabPanel>
              <TabPanel value="plansPartner" className="tabPanel-Style">
                <br />
                <h6
                  className="sub-tittle-section"
                  style={{ textAlign: "center" }}
                >
                  Todos los planes de socios incluyen los beneficios del plan
                  Premium
                </h6>
                <br />
                <Container>
                  <PricesSection user={user} showFirstTree={false} />
                </Container>
                <br />
                <br />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Plans;
