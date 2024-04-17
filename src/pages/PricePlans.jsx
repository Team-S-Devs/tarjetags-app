import { Container } from "@mui/material";
import BannerTittle from "../components/Prices/BannerTittle";
import PricesSection from "../components/Prices/PricesSection";
import TableComparePlans from "../components/Prices/TableComparePlans";
import Header from "../sections/Header";

const PricePlans = () => {
  return (
    <>
      <Header/>
      <PricesSection/>
      <TableComparePlans/>
    </>
  );
}

export default PricePlans