import React from "react";
import ThinTitle from "../components/texts/ThinTitle";
import ProductsServicesCategories from "./ProductsServicesCategories";
import ProductsServicesList from "./ProductsServicesList";

const ProductsServicesTab = ({
  elementsInfo = {
    title: "",
    description: "",
    socialLinks: [],
    productCategories: [],
    products: [],
  },
  setElementsInfo,
  cardId
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
        <ProductsServicesList
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
          cardId={cardId}
        />
      </div>
      <br />
      <br />
    </div>
  );
};

export default ProductsServicesTab;
