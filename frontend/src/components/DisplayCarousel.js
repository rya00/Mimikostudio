import React from "react";
import { Carousel, Image } from "react-bootstrap";

const DisplayCarousel = () => {
  return (
    <>
      <Carousel pause="hover" className="about-carousel">
        <Carousel.Item className="carousel-pics">
        </Carousel.Item>

        <Carousel.Item className="carousel-pics-1">
        </Carousel.Item>

        <Carousel.Item className="carousel-pics-2">
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default DisplayCarousel;
