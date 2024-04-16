import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { licenseLimits } from "../../utils/constants";
import { contactButtonsOptions } from "../../sections/ContactButtons";
import { LuShare2 } from "react-icons/lu";

const ContactLinks = ({
  elementsInfo = {},
  smallPreview,
  licenseType,
  backgroundColor,
}) => {
  const [urlWithId, setUrlWithId] = useState("");

  useEffect(() => {
    const currentUrl = window.location.origin;
    const urlWithId = `${currentUrl}/${elementsInfo.urlPage}`;
    setUrlWithId(urlWithId);
  }, []);

  const shareURL = () => {
    if (navigator.share) {
      navigator.share({
        title: "Compartir URL",
        text: "Mira mi tarjeta digital",
        url: urlWithId,
      });
    } else {
      alert("No se puede compartir desde este navegador");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center social-links-container"
      style={{
        overflow: "auto",
        paddingLeft: "10px",
        padding: "15px 10px",
        margin: smallPreview ? "22px 0" : "42px 0",
        position: "sticky",
        bottom: 0,
        backgroundColor,
        width: "100%",
        boxShadow: "0px -5px 5px -5px rgba(140,140,140,0.3)"
      }}
    >
      <style>
        {`
          .social-links-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {elementsInfo.contactLinks
        .filter(
          (button) =>
            !licenseLimits[licenseType].excludedButtons.includes(button.name)
        )
        .map((icon, index) => (
          <IconButton
            style={{
              background: "#fff",
              color: contactButtonsOptions.find(
                (option) => option.name === icon.name
              ).color,
              padding: 1,
              borderRadius: "50%",
              marginLeft: index !== 0 ? 16 : 0,
            }}
            href={icon.url}
          >
            <img
              width={smallPreview ? 40 : 60}
              style={{ borderRadius: "50%" }}
              src={
                contactButtonsOptions.find(
                  (option) => option.name === icon.name
                ).img
              }
            />
          </IconButton>
        ))}
      {elementsInfo.showShareButton && (
        <IconButton
          style={{
            background: "#fff",
            color: "#000",
            padding: 8,
            paddingRight: 9,
            borderRadius: "50%",
            marginLeft: elementsInfo.contactLinks.length > 0 ? 16 : 0,
          }}
          onClick={shareURL}
        >
          {/* <img
              width={smallPreview ? 40 : 60}
              style={{ borderRadius: "50%" }}
              src={share}
            /> */}
          <LuShare2 size={smallPreview ? 24 : 44} />
        </IconButton>
      )}
    </div>
  );
};

export default ContactLinks;
