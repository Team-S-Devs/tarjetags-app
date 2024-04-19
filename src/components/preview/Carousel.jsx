import React, { useState, useRef } from 'react';
import { TRANSPARENT_SQUARE, licenseLimits } from '../../utils/constants';
import { Typography } from '@mui/material';

const Carousel = ({
    elemInfo = {},
    editPreview = false,
    licType,
    textColor = "#fff",
    color
    
  }) => {
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [productsAct, setProducts] = useState(elemInfo.products.slice(0, licenseLimits[licType].maxProducts));

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX && endX) {
      const difference = startX - endX;
      const threshold = Math.abs(difference) / 2;
      if (difference > threshold) {
        nextSlide();
      } else if (difference < -threshold) {
        prevSlide();
      }
    }
    setStartX(null);
    setEndX(null);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % productsAct.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? productsAct.length - 1 : prevIndex - 1
    );
  };

  const getImageFromProduct = () => {
    if (productsAct[activeIndex].imgs.length > 0) return productsAct[activeIndex].imgs[0].url
    else return TRANSPARENT_SQUARE;
  }

  return (
    <div
      ref={carouselRef}
      className="carouselA"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={prevSlide}
        className="carouselA__btn carouselA__btn--prev"
      >
        &lt;
      </button>
      {/* {licenseLimits[licType].productsDivision &&
        elemInfo.productCategories.map((cat) => (
          <Typography color={color} key={"cat-view" + cat.id}>
            {cat.title}
          </Typography>
        ))}
      {elemInfo.products
        .slice(0, licenseLimits[licType].maxProducts)
        .map((prod) => (
          <Typography color={color} key={prod.id + "product-view"}>
            {prod.name}
          </Typography>
        ))} */}

      <div className='card-container'>
        <img
            src={getImageFromProduct()}
            alt={`Slide ${activeIndex}`}
            className="carouselA__img"
            style={
              {maxWidth: editPreview ? '200px' : 'inherital',
               maxHeight: editPreview ? '200px' : 'inherital'}}
        />
            <Typography color={color} style={{fontWeight:'bolder'}}>
                {productsAct[activeIndex].name}
            </Typography>
            <Typography color={color}>
                {productsAct[activeIndex].description}
            </Typography>
            <Typography color={color} style={productsAct[activeIndex].description ? {paddingTop: '1rem'}: {}} className='price-carousel'>
                {productsAct[activeIndex].price.number+" "+productsAct[activeIndex].price.currency}
            </Typography>
            <div className='obtain-preview-button' style={{
                backgroundColor: elemInfo.color,
                color: textColor
              }}
            >
              {productsAct[activeIndex].buttonAction.buttonText}
            </div>
      </div>
      <button
        onClick={nextSlide}
        className="carouselA__btn carouselA__btn--next"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
