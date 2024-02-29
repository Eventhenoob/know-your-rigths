import React from 'react';
import PropTypes from 'prop-types';

const CarouselImage = ({ text, image } : {text: string, image: string}) => {
  return (
    
        <img
        className=""
        src={image}
        alt={text}
      />
        
    
    
  );
};


export default CarouselImage;
