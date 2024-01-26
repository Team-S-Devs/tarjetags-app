import React from "react";
import ThinTitle from "../components/texts/ThinTitle";
import SocialMediaButtons from "./SocialMediaButtons";
import ContactButtons from "./ContactButtons";
import ExtraButtons from "./ExtraButtons";
import ShareButtonSwitch from "./ShareButtonSwitch";

const ButtonsCardTab = ({
  elementsInfo = { title: "", description: "", socialLinks: [] },
  setElementsInfo,
  cardId,
}) => {
  return (
    <div>
        <br />
        <br />
      <ShareButtonSwitch
        elementsInfo={elementsInfo}
        setElementsInfo={setElementsInfo}
      />
      <br />
      <div className="mt-4">
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Enlaza tus redes sociales
        </ThinTitle>
      </div>
      <div className="mt-3">
        <SocialMediaButtons
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
        />
      </div>
      <br />
      <div className="mt-4" style={{ marginTop: 400 }}>
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Añade formas de contacto
        </ThinTitle>
      </div>
      <div className="mt-3">
        <ContactButtons
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
        />
      </div>
      <br />
      <div className="mt-4" style={{ marginTop: 400 }}>
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Agrega botones extra
        </ThinTitle>
      </div>
      <div className="mt-3">
        <ExtraButtons
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
          cardId={cardId}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ButtonsCardTab;
