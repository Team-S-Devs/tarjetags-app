import React from "react";
import { licenseLimits } from "../utils/constants";
import { Typography } from "@mui/material";
import PhotosHeader from "../components/preview/PhotosHeader";
import useWindowSize from "../hooks/useWindowsSize";
import TitleDescription from "../components/preview/TitleDescription";
import SocialLinks from "../components/preview/SocialLinks";
import ContactLinks from "../components/preview/ContactLinks";
import ExtraButtons from "../components/preview/ExtraButtons";
import { contrast } from "chroma-js";
import AdminPreview from "../components/preview/AdminPreview";
import '../assets/styles/dashboard.css'
import Carousel from "../components/preview/Carousel";


const Preview = ({
  elementsInfo = {},
  borderRadius = 0,
  licenseType,
  editPreview = false,
  
}) => {

  const color = elementsInfo.theme === "dark" ? "#FFF" : "#000";
  const backgroundColor = elementsInfo.theme === "dark" ? "#25242B" : "#FFF";
  const { width } = useWindowSize();

  const smallPreview = width < 986 || editPreview;

  // COLOR DE FONDO ESCOGIDO POR EL USUARIO
  const bgColor = elementsInfo.color;

  const contrastWithWhite = contrast(bgColor, "white");
  const contrastWithBlack = contrast(bgColor, "black");

  const customContrastThreshold = 3;

  // COLOR DEL TEXTO USANDO EL FONDO ESCOGIDO POR EL USUARIO
  const textColor =
    contrastWithWhite > customContrastThreshold
      ? "#fff"
      : contrastWithBlack > customContrastThreshold
      ? "#000"
      : "#fff";

  const images = [
        'https://via.placeholder.com/800x400/ff5733/fff',
        'https://via.placeholder.com/800x400/33ff57/fff',
        'https://via.placeholder.com/800x400/5733ff/fff',
      ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        borderWidth: 2,
        borderRadius,
        overflow: "scroll",
        overflowX: "hidden",
        position: "relative",
        paddingLeft: smallPreview ? 0 : "28%",
        paddingRight: smallPreview ? 0 : "28%",
      }}
      className="preview-container"
    >
      <style>
        {`
          .preview-container::-webkit-scrollbar {
            width: ${smallPreview ? "5px" : "10px"};
            display: ${smallPreview && "none"}
          }
          .preview-container::-webkit-scrollbar-thumb {
            background: ${elementsInfo.color}
          }
          .preview-container::-webkit-scrollbar-track{
            background: ${backgroundColor}
          }
        `}
      </style>
      <PhotosHeader elementsInfo={elementsInfo} smallPreview={smallPreview} />
      <TitleDescription
        elementsInfo={elementsInfo}
        smallPreview={smallPreview}
        textColor={textColor}
      />
      <SocialLinks elementsInfo={elementsInfo} smallPreview={smallPreview} />

      {/* START PRODUCTOS O SERVICIOS, PON PADDING DE 28PX horizontal xd */}

      <div className="products-preview-container">
          <Typography style={{fontWeight: 'bolder'}} color={color} variant="h6" key={"product-view"}>
            Productos o Servicios
          </Typography>

      <div className="categories-options">
        {licenseLimits[licenseType].productsDivision &&
          elementsInfo.productCategories.map((cat) => (
            <Typography color={color} key={"cat-view" + cat.id}>
              {cat.title}
            </Typography>
                    ))}
      </div>
          

          <div className="carrousel-products">
            <Carousel licType={licenseType} elemInfo={elementsInfo} color={color} images={images}></Carousel>
          </div>

      </div>

      {/* {licenseLimits[licenseType].productsDivision &&
        elementsInfo.productCategories.map((cat) => (
          <Typography color={color} key={"cat-view" + cat.id}>
            {cat.title}
          </Typography>
        ))}
      {elementsInfo.products
        .slice(0, licenseLimits[licenseType].maxProducts)
        .map((prod) => (
          <Typography color={color} key={prod.id + "product-view"}>
            {prod.name}
          </Typography>
        ))} */}

      {/* END PRODUCTOS O SERVICIOS */}

      <ExtraButtons
        elementsInfo={elementsInfo}
        smallPreview={smallPreview}
        textColor={textColor}
      />

      <AdminPreview
        elementsInfo={elementsInfo}
        smallPreview={smallPreview}
        licenseType={licenseType}
      />

      <ContactLinks
        elementsInfo={elementsInfo}
        smallPreview={smallPreview}
        licenseType={licenseType}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export default Preview;
