import React from "react";
import { Box, Button } from '@mui/material';
import "../../assets/styles/Prices/ButtonTableCompare.css";
import "../../assets/styles/Prices/CarouselButtons.css";
import ButtonCardPrice from "./ButtonCardPrice";


const ButtonTableComparison = (props) => {
   
    return (
        <>
        <div className='button-carousel'>
               <div className="text-button-table-compare">
                    <h3 className="title-button">{props.title}</h3>
                    <div className='text-container-price'>
                        <h2 className='text-price-table'>{props.currency} {props.amount}</h2>
                    </div>
                </div>
                <div className="button-container-carousel">
                    <ButtonCardPrice width={100} height={35}/>
                </div>
        </div>
        </>
    );
    }

export default ButtonTableComparison;