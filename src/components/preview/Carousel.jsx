import React, { useState, useEffect } from 'react';
import { TRANSPARENT_SQUARE } from '../../utils/constants';
import { Typography } from '@mui/material';
import ImagesSlider from './ImagesSlider';
import PriceOffer from './PriceOffer';


const Carousel = ({
    elemInfo = {},
    products = [],
    editPreview = false,
    index = 0,
    textColor = "#fff",
    color
    
  }) => {
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const [activeIndex, setActiveIndex] = useState(index);

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
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const getImageFromProduct = () => {
    if (products[activeIndex].imgs.length > 0) return products[activeIndex].imgs[0].url
    else return TRANSPARENT_SQUARE;
  }
  
  useEffect(() => {
      setActiveIndex(0);
  }, [products]);


  const [autoplay, setAutoplay] = useState(true); // Estado para controlar la reproducción automática
  const slideInterval = 5000; // Intervalo de tiempo entre cada cambio de slide (en milisegundos)

  // useEffect(() => {
  //   // Función para avanzar al siguiente slide
  //   const nextSlide = () => {
  //     setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  //   };

  //   // Función para detener la reproducción automática
  //   const stopAutoplay = () => {
  //     setAutoplay(false);
  //   };

  //   // Función para iniciar la reproducción automática
  //   const startAutoplay = () => {
  //     setAutoplay(true);
  //   };

  //   // Si autoplay está activado, iniciar el intervalo para cambiar de slide automáticamente
  //   let slideTimer;
  //   if (autoplay) {
  //     slideTimer = setInterval(() => {
  //       nextSlide();
  //     }, slideInterval);
  //   }

  //   // Limpiar el intervalo cuando el componente se desmonta o cuando se desactiva el autoplay
  //   return () => {
  //     clearInterval(slideTimer);
  //   };
  // }, [activeIndex, autoplay, products.length]);

  return (
    <>
      {(products.length > 0 && products[activeIndex] != null ) &&
        <div
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
         <ImagesSlider editPreview={editPreview} images={products[activeIndex].imgs}></ImagesSlider>

               <Typography color={color} style={{fontWeight:'bolder'}}>
                   {products[activeIndex].name}
               </Typography>
               <Typography color={color}>
                   {products[activeIndex].description}
               </Typography>
               <PriceOffer color={color} products={products} activeIndex={activeIndex}/> 
               <div className='obtain-preview-button' style={{
                   backgroundColor: elemInfo.color,
                   color: textColor
                 }}
               >
                 {products[activeIndex].buttonAction.buttonText}
               </div>
         </div>
         <button
           onClick={nextSlide}
           className="carouselA__btn carouselA__btn--next"
         >
           &gt;
         </button>
         </div>
      }
    </>
  );
};

export default Carousel;
