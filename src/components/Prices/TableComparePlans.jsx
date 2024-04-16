import React from 'react'
import '../../assets/styles/Prices/TableCompare.css';
import ColumPrice from './ColumPrice';
import ColumnTextBenefit from './ColumnTextBenefit';
import Flickity from 'flickity';
import { useRef, useEffect, useState} from 'react';
import 'flickity/css/flickity.css';
import ButtonTableComparison from './ButtonTableComparison';
import '../../assets/styles/Prices/CarouselButtons.css';
import plans from "../../utils/plans.json";


function TableComparePlans() {
    const carouselRef = useRef(null);
    const flickityInstance = useRef(null);
    const [displayCells, setDisplayCells] = useState([false, false, true, false, false, false]);
    let cellsReseted = false;

  useEffect(() => {
   
    flickityInstance.current = new Flickity(carouselRef.current, {
      
      wrapAround: true,
      autoplay: true,
      prevNextButtons: false,
      initialIndex: 2,
      pageDots: true,
    });
    flickityInstance.current.resize();

    const handleResize = () => {
      if (window.innerWidth > 958) {
        setDisplayCells(Array(6).fill(true));
        cellsReseted = false;
      } else {
        if(!cellsReseted){
          setDisplayCells([false, false, true, false, false, false]);
          flickityInstance.current.select(2);
          cellsReseted = true;
        }
      }
    };

    const handleSlideChange = (index) => {
     
      handleCellClick(index);
    };

    flickityInstance.current.on('change', handleSlideChange);
    
    

    window.addEventListener('resize', handleResize);
    
    if(window.innerWidth > 958){
      setDisplayCells(Array(6).fill(true));
    }

    return () => {
      flickityInstance.current.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  
  const handleCellClick = (index) => {
    
    flickityInstance.current.select(index);
    setDisplayCells(
      (prevCells) => {
        const newCells = Array(prevCells.length).fill(false);
        newCells[index] = true; 
        return newCells;}
     );

  };

  const getTitlePlanById = (idPlan) => {
    const currentPlan = plans.find((plan) => plan.idPlan == idPlan);
    return currentPlan.namePlan;
  }

  const getAmountById = (idPlan) => {
    const currentPlan = plans.find((plan) => plan.idPlan == idPlan);
    return currentPlan.pricePlan;
  }

  return (
    <div className='TableCompare-container'>
        <h2 className='tittle-text-table'>ELIGE EL PLAN QUE MAS SE ADAPTE A TUS NECESIDADES</h2>
        <div className='carousel' ref={carouselRef}>
            <div className='carousel-cell' onClick={()=> handleCellClick(0)}>
                <ButtonTableComparison title={getTitlePlanById(1)} currency='Bs' amount={getAmountById(1)}/>
            </div>
            <div className='carousel-cell' onClick={()=> handleCellClick(1)}>
                <ButtonTableComparison title={getTitlePlanById(2)} currency='Bs' amount={getAmountById(2)}/>
            </div>
            <div className='carousel-cell' onClick={()=> handleCellClick(2)}>
                <ButtonTableComparison title={getTitlePlanById(3)} currency='Bs' amount={getAmountById(3)}/>
            </div>
            <div className='carousel-cell' onClick={()=> handleCellClick(3)}>
                <ButtonTableComparison title={getTitlePlanById(4)} currency='Bs' amount={getAmountById(4)}/>
            </div>
            <div className='carousel-cell' onClick={()=> handleCellClick(4)}>
                <ButtonTableComparison title={getTitlePlanById(5)} currency='Bs' amount={getAmountById(5)}/>
            </div>
            <div className='carousel-cell' onClick={()=> handleCellClick(5)}>
                <ButtonTableComparison title={getTitlePlanById(6)} currency='Bs' amount={getAmountById(6)}/>
            </div>
        </div>
        <div className='table-container'>
          <ColumnTextBenefit/>
          {displayCells[0]? (<ColumPrice idPlan='1'/>) : null}
          {displayCells[1]? (<ColumPrice idPlan='2'/>) : null}
          {displayCells[2]? (<ColumPrice idPlan='3'/>) : null}
          {displayCells[3]? (<ColumPrice idPlan='4'/>) : null}
          {displayCells[4]? (<ColumPrice idPlan='5'/>) : null}
          {displayCells[5]? (<ColumPrice idPlan='6'/>) : null}
        </div>
    </div>
  )
}

export default TableComparePlans;