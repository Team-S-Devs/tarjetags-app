import React, { useState } from "react";
import StyledCard from "../components/card/StyledCard";
import { IconButton, Typography } from "@mui/material";
import ThinTitle from "../components/texts/ThinTitle";
import { LiaEditSolid } from "react-icons/lia";
import { GoTrash } from "react-icons/go";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import { GREY_RECTANGLE } from "../utils/constants";
import ProductModal from "../components/modals/ProductModal";

const ProductsServicesList = ({
  elementsInfo = { title: "", description: "", contactLinks: [], products: [] },
  setElementsInfo,
  cardId,
}) => {
  const [productIdx, setProductIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const handleAddProduct = () => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.products.push({
      name: "",
      show: true,
      id: Date.now(),
      price: {
        currency: "Bs.",
        number: 0,
        show: true,
      },
      offerPrice: {
        currency: "Bs.",
        number: 0,
        show: false,
      },
      description: "",
      category: -1,
      buttonAction: {
        forWpp: true,
        wppMessage: "Hola! Vengo de Tarjetags",
        wppNumber: "",
        buttonText: "Ordenar",
        customUrl: "",
      },
      imgs: [],
    });
    setElementsInfo(elementsInfoCopy);
    setProductIdx(elementsInfoCopy.products.length - 1);
    setOpen(true);
  };

  const deleteProduct = (index) => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.products.splice(index, 1);
    setElementsInfo(elementsInfoCopy);
  };

  return (
    <StyledCard style={{ padding: 30 }}>
      {elementsInfo.products.length === 0 ? (
        <>
          <ThinTitle variant="subtitle1" color="secondary" textAlign="center">
            Gestiona tus productos y servicios! Aquí puedes agregar, editar y
            gestionar tus productos o servicios para su venta.
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Agregar' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {elementsInfo.products.map((product, index) => (
            <div
              className="d-flex align-items-center mt-2 mb-3"
              key={product.id}
            >
              <img
                src={
                  product.imgs.length > 0 ? product.imgs[0].url : GREY_RECTANGLE
                }
                style={{ maxWidth: 100, flex: 20 }}
              />

              <Typography
                style={{
                  flex: 100,
                  wordWrap: "break-word",
                  width: 120,
                  textAlign: "center",
                }}
                marginLeft={2}
                marginRight={2}
              >
                {product.name}
              </Typography>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  setProductIdx(index);
                }}
              >
                <LiaEditSolid size={30} color="#4C77EA" />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deleteProduct(index)}
              >
                <GoTrash />
              </IconButton>
            </div>
          ))}
        </>
      )}
      <div className="mt-4"></div>
      <div className="d-flex align-items-center justify-content-center">
        <SmallPrimaryButton onClick={handleAddProduct}>
          Agregar
        </SmallPrimaryButton>
      </div>

      <ProductModal
        open={open}
        setOpen={setOpen}
        elementsInfo={elementsInfo}
        setElementsInfo={setElementsInfo}
        index={productIdx}
        cardId={cardId}
      />
    </StyledCard>
  );
};

export default ProductsServicesList;
