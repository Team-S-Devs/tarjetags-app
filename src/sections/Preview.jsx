import React from "react";
import { GREY_RECTANGLE, licenseLimits } from "../utils/constants";
import { Typography } from "@mui/material";

const Preview = ({ elementsInfo = {}, borderRadius = 0, licenseType }) => {
  const color = elementsInfo.theme === "dark" ? "#FFF" : "#000";
  const backgroundColor = elementsInfo.theme === "dark" ? "#25242B" : "#FFF";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        borderWidth: 2,
        borderColor: "red",
        borderRadius,
        overflow: "hidden",
      }}
    >
      <img
        src={
          elementsInfo.coverPhoto && elementsInfo.coverPhoto.url !== ""
            ? elementsInfo.coverPhoto.url
            : GREY_RECTANGLE
        }
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100px",
          objectFit: "cover",
        }}
        alt="Foto de portada"
      />
      Preview
      {elementsInfo.products
        .slice(0, licenseLimits[licenseType].maxProducts)
        .map((prod) => (
          <Typography color={color} key={prod.id + "product-view"}>
            {prod.name}
          </Typography>
        ))}
      {licenseLimits[licenseType].admin &&
        elementsInfo.adminCards.map((card, index) => (
          <Typography color={color} key={"admin-card-view" + index}>
            {card}
          </Typography>
        ))}
      {elementsInfo.contactLinks
        .filter(
          (button) =>
            !licenseLimits[licenseType].excludedButtons.includes(button.name)
        )
        .map((button) => (
          <Typography color={color} key={"contact-view" + button}>
            {button.name}
          </Typography>
        ))}
      {licenseLimits[licenseType].productsDivision &&
        elementsInfo.productCategories.map((cat) => (
          <Typography color={color} key={"cat-view" + cat.id}>
            {cat.title}
          </Typography>
        ))}
    </div>
  );
};

export default Preview;
