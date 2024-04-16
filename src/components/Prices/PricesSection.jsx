
import "../../assets/styles/Prices/PricesSection.css";
import CardPrice from "./CardPrice";
const PricesSection = () => {

    return(
    <div className="price-container">
        <h2 className="tittle-section">DESCUBRE NUESTRAS OPCIONES DE SERVICIO</h2>
        <div className="cards-container">
            <CardPrice idPlan={1}/>
            <CardPrice idPlan={2}/>
            <CardPrice idPlan={3}/>
            <CardPrice idPlan={4}/>
            <CardPrice idPlan={5}/>
            <CardPrice idPlan={6}/>
        </div>
    </div>
    );
}

export default PricesSection;