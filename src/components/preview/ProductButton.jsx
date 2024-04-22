import React from 'react';
import { Link } from 'react-router-dom';

const ProductButton = ({
    products = [],
    activeIndex = 0,
    textColor,
    elemInfo
}) => {
  const wppMessage = encodeURIComponent(products[activeIndex].buttonAction.wppMessage);

  return (
    <>
    {(products[activeIndex].buttonAction.forWpp) ?
        <Link to={`https://wa.me/${products[activeIndex].buttonAction.wppNumber}?text=${wppMessage}`} target="_blank" className='obtain-preview-button' 
        style={{
           backgroundColor: elemInfo.color,
           color: textColor
         }}>
        {products[activeIndex].buttonAction.buttonText}
        </Link>
        : <Link to={products[activeIndex].buttonAction.customUrl} target="_blank" className='obtain-preview-button' 
        style={{
           backgroundColor: elemInfo.color,
           color: textColor
         }}>
        {products[activeIndex].buttonAction.buttonText}
        </Link>
    }
    </>
  );
}

export default ProductButton;
