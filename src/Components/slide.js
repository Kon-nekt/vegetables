import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import '../css/carousel.css';
import '../css/slide.css'
import img from './1.jpg'


const DemoCarousel = () =>
    {
        return (
            <Carousel showThumbs = {false} autoPlay={true} infiniteLoop={true} dynamicHeight={false} showStatus={false}> showIndicators={false} interval={10000}
                <div>
                    <img alt="" src={img} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img alt="" src={img} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img alt="" src={img} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    };
export default DemoCarousel;
