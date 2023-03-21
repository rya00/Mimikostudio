import React from 'react'
import { Carousel } from 'react-bootstrap'

const AboutCarousel = () => {
  return (
    <>
        <Carousel pause='hover' className='about-carousel'>
        <Carousel.Item>brodor</Carousel.Item>
        <Carousel.Item>sister</Carousel.Item>
        </Carousel>
    </>
  )
}

export default AboutCarousel