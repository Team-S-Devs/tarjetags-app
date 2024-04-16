import React from "react";
import { GREY_RECTANGLE } from "../../utils/constants";
import lightPurpleSvg from "../../assets/images/light-purple.svg";

const PhotosHeader = ({ elementsInfo = {}, smallPreview = false }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
          maxHeight: !smallPreview ? "210px" : "150px",
          objectFit: "cover",
        }}
        alt="Foto de portada"
      />
      <br />
      <img
        src={
          elementsInfo.profilePhoto?.url &&
          elementsInfo.profilePhoto?.url !== ""
            ? elementsInfo.profilePhoto.url
            : lightPurpleSvg
        }
        style={{
            height: !smallPreview ? "180px" : "120px",
            width: !smallPreview ? "180px" : "120px",
            borderRadius: "50%",
            margin: "12px",
            marginBottom: "0px",
            objectFit: "cover",
            border: "4px solid white",
            marginTop: "-90px",
            zIndex: 1,
        }}
        alt={`Foto de perfil`}
      />
    </div>
  );
};

export default PhotosHeader;
