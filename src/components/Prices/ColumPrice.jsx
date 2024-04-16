import React from "react";
import "../../assets/styles/Prices/TableCompare.css";
import BoxBenefit from "./BoxBenefit";
import BoxTitle from "./BoxTitle";
import plans from "../../utils/plans.json";

const ColumPrice = ({idPlan }) => {
  const display = true;
  const currentPlan = plans.find((plan) => plan.idPlan == idPlan);
  

  return display ? (
    <div className={`column-price`}>
      <BoxTitle title={currentPlan.namePlan} currency='Bs' amount={currentPlan.pricePlan}/>
      <BoxBenefit text={currentPlan.renovacion}/>
      <BoxBenefit iconType={currentPlan.libreDePublicidad}/>
      <BoxBenefit iconType={currentPlan.nombreDominio}/>
      <BoxBenefit text={currentPlan.servicioTiendaMax}/>
      <BoxBenefit listButtons={currentPlan.botonesAdicionales}/>
      <BoxBenefit iconType={currentPlan.clasificacionDeProductos}/>
      <BoxBenefit text={`${currentPlan.comisionDeVenta} %`} />
      <BoxBenefit text={`${currentPlan.descuentoPases} %`} />
    </div>
  ) : null;
}

export default ColumPrice;