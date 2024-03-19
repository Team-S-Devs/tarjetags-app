import React from "react";
import Header from "../sections/Header";
import BoldTitle from "../components/texts/BoldTitle";

const Store = () => {
  return (
    <div className="container">
      <Header />
      <div
        style={{ flex: 100, marginTop: 100, width: "100%" }}
        className="d-flex flex-column"
      >
        <BoldTitle style={{ flex: 1 }} textAlign="center">
          Tienda
        </BoldTitle>
      </div>
    </div>
  );
};

export default Store;
