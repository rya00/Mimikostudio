import React from "react";
import { Carousel, Image } from "react-bootstrap";

const AboutCarousel = () => {
  return (
    <>
      <Carousel pause="hover" className="about-carousel">
        <Carousel.Item>
          {/* <Image src="https://picsum.photos/200/300" alt="img" fluid /> */}
          <div className="carousel-img-container">
        ss
          {/* <img src="https://picsum.photos/200/300" alt="painting" ></img> */}
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default AboutCarousel;
