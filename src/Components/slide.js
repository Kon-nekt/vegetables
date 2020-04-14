import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import '../css/carousel.css';
import '../css/slide.css'
import first from './1.jpg'
import second from './slide2.jpg'

const DemoCarousel = () =>
    {
        return (
            <Carousel showThumbs = {false} autoPlay={true} infiniteLoop={true} dynamicHeight={false} showStatus={false} showIndicators={false} interval={10000}>
                <div>
                    <img alt="" src={first} />
                </div>
                <div>
                    <img alt="" src={second} />
                </div>
            </Carousel>
        );
    };
export default DemoCarousel;
