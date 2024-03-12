import React, { useState } from "react";
import StyledCard from "../components/card/StyledCard";
import { IconButton, Typography } from "@mui/material";
import ThinTitle from "../components/texts/ThinTitle";
import { LiaEditSolid } from "react-icons/lia";
import { GoTrash } from "react-icons/go";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import { GREY_RECTANGLE } from "../utils/constants";
import ExtraButtonModal from "../components/modals/ExtraButtonModal";

const ExtraButtons = ({
  elementsInfo = {
    title: "",
    description: "",
    contactLinks: [],
    products: [],
    extraButtons: [{ id: 0, name: "", url: "", imgUrl: "" }],
  },
  setElementsInfo,
  cardId,
}) => {
  const [buttonIdx, setButtonIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const handleAddProduct = () => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.extraButtons.push({
      id: Date.now(),
      url: "",
      name: "",
      imgUrl: "",
    });
    setElementsInfo(elementsInfoCopy);
    setButtonIdx(elementsInfoCopy.extraButtons.length - 1);
    setOpen(true);
  };

  const deleteProduct = (index) => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.extraButtons.splice(index, 1);
    setElementsInfo(elementsInfoCopy);
  };

  return (
    <StyledCard style={{ padding: 30 }}>
      {elementsInfo.extraButtons.length === 0 ? (
        <>
          <ThinTitle variant="subtitle1" color="secondary" textAlign="center">
            Vincule las cuentas de sus colegas u otros miembros de su misma
            empresa para que puedan ser visibles desde su tarjeta
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Vincular cuenta' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {elementsInfo.extraButtons.map((button, index) => (
            <div
              className="d-flex align-items-center mt-2 mb-3"
              key={button.id}
            >
              <img
                src={button.imgUrl !== "" ? button.imgUrl : GREY_RECTANGLE}
                width={62}
                height={62}
                style={{
                  objectFit: "cover",
                  flex: 20,
                  maxWidth: 62,
                }}
              />

              <div style={{ flex: 100, textAlign: "left" }}>
                <Typography
                  style={{
                    wordWrap: "break-word",
                    width: 120,
                    textAlign: "left",
                  }}
                  marginLeft={5}
                  marginRight={2}
                >
                  {button.name}
                </Typography>
                <Typography
                  style={{
                    wordWrap: "break-word",
                    width: 120,
                    textAlign: "left",
                  }}
                  marginLeft={5}
                  marginRight={2}
                  variant="caption"
                >
                  {button.url}
                </Typography>
              </div>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  setButtonIdx(index);
                }}
              >
                <LiaEditSolid size={30} color="#4C77EA" />
              </IconButton>
              <IconButton color="error" onClick={() => deleteProduct(index)}>
                <GoTrash />
              </IconButton>
            </div>
          ))}
        </>
      )}
      <div className="mt-4"></div>
      <div className="d-flex align-items-center justify-content-center">
        <SmallPrimaryButton onClick={handleAddProduct}>
          Vincular cuenta
        </SmallPrimaryButton>
      </div>

      <ExtraButtonModal
        open={open}
        setOpen={setOpen}
        elementsInfo={elementsInfo}
        setElementsInfo={setElementsInfo}
        index={buttonIdx}
        cardId={cardId}
      />
    </StyledCard>
  );
};

export default ExtraButtons;
