import React from "react";
import ThinTitle from "../components/texts/ThinTitle";
import ProductsServicesCategories from "./ProductsServicesCategories";

const ProductsServicesTab = ({
  elementsInfo = {
    title: "",
    description: "",
    socialLinks: [],
    productCategories: [],
  },
  setElementsInfo,
}) => {
  return (
    <div>
      <div className="mt-4">
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Introduce categorías para tus servicios o productos.
        </ThinTitle>
      </div>
      <div className="mt-3">
        <ProductsServicesCategories
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
        />
      </div>
      <br />
      <div className="mt-4" style={{ marginTop: 400 }}>
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Añade tus servicios y/o productos
        </ThinTitle>
      </div>
      <div className="mt-3">
        {/* <ContactButtons
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
        /> */}
      </div>
      <br />
      <br />
    </div>
  );
};

export default ProductsServicesTab;
