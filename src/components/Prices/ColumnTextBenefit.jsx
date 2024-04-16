import React from "react";
import benefitList from "../../utils/BenefitList.json";


const ColumnTextBenefit = () => {

    const blockBenefit = () => {
        
        return benefitList.benefits.map((benefit, index) => (
          <div key={index} className="box-content text-benefit">
            <div className="divisor-line"></div>
            <h4>{benefit}</h4>
          </div>
        ));
      };
    return (
        <div className="column-price ">
            <div className="box-content-top ">
                <h3>Beneficios</h3>
            </div>
            {blockBenefit()}
        </div >
        );
}

export default ColumnTextBenefit;