import React from "react";
import "../../assets/styles/Prices/ButtonTableCompare.css";
import "../../assets/styles/Prices/CarouselButtons.css";
import ButtonCardPrice from "./ButtonCardPrice";

const ButtonTableComparison = (props) => {
  return (
    <>
      <div className="button-carousel">
        <div className="text-button-table-compare">
          <h5 className="title-button">{props.title}</h5>
          <div className="text-container-price">
            <p className="text-price-table">
              {props.currency} {props.amount}
            </p>
          </div>
        </div>
        <div className="button-container-carousel">
          {
            props.title !== "Gratis" && <ButtonCardPrice width={100} height={35} />
          }
        </div>
      </div>
    </>
  );
};

export default ButtonTableComparison;
