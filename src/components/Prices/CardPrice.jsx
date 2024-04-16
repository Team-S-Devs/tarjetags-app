import React from "react";
import "../../assets/styles/Prices/CardPrice.css"
import { BsCheckCircleFill } from "react-icons/bs";
import ButtonCardPrice from "./ButtonCardPrice";
import plans from "../../utils/plans.json";

const CardPrice = (idPlan) => {
  const currentPlan = plans.find((plan) => plan.idPlan === idPlan.idPlan);
  
  const blockDescription = () => {
    if (currentPlan.descripcion.length > 0) {
      return(
        <div className="benefits-price">
          {currentPlan.descripcion.map((benefit, index) => {
            return(
              <div key={index} className="benefit-price">
                <BsCheckCircleFill className="icon"/>
                <h6 className="text-benefit">{benefit}</h6>
              </div>
            );
          })}
        </div>
      );
    }
  }

    return(
      <div className="card-price-container">
         
         <h2 className="card-tittle">
            {currentPlan.namePlan.toUpperCase()}
         </h2>
          <div className="card-price">
            <div className="ribbon left">
              <div className="price-content-text">
                <span>{currentPlan.pricePlan} {currentPlan.currency}</span>
              </div>
            </div>
          </div>

         {blockDescription()}
          <div className="button-container">
            {/*<button className="btn-price">
              <span className="text-button-price">
                 Adquirir
              </span>
            </button>*/}
            <ButtonCardPrice/>
          </div>
      </div>
    );
}

export default CardPrice;