import React from "react";

const BoxTitle = (props) => {
    return (
        <div className='box-content-top'>
            <h3>{props.title}</h3>
            <div className='text-container-price'>
                <h2 className='text-price-table'
                ><span className="currency-text">{props.currency}</span> {props.amount}</h2>
            </div>
         </div>
    );
    };

export default BoxTitle;