import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '@/components/CarouselImage/CarouselImage';
import { number } from 'zod';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <CarouselImage image={"/slider1.jpeg"} text="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage image='/slider1.jpeg' text=" Second slide" />
        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage image='/slider2.png' text="Third slide" />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;