import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import classes from './Carousel.module.css'
import imgOne from '../../../assets/images/1.jpg'
import imgTwo from '../../../assets/images/2.jpg'
import imgThree from '../../../assets/images/3.jpg'
import imgFour from '../../../assets/images/4.jpg'
import imgFive from '../../../assets/images/5.jpg'



const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Show 3 slides at once (one main and two side ones)
        centerMode: true,
        autoplay: true,
        centerPadding: '18rem',
        slidesToScroll: 1,
        beforeChange: (current, next) => setActiveIndex(next), // Update the active slide index
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              centerPadding: '20px'
            }
          }
        ]
    };

    const slides = [
        { id: 1, content: 'Item 1', image: imgOne },
        { id: 2, content: 'Item 2', image: imgTwo },
        { id: 3, content: 'Item 3', image: imgThree },
        { id: 4, content: 'Item 4', image: imgFour },
        { id: 5, content: 'Item 5', image: imgFive }
    ];
    

  return (
    <div className={classes.carouselContainer}>
     <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
          key={slide.id}
          className={`${classes.sliderItem} ${
            index === activeIndex ? classes.main : classes.side
          }`}
        >
            <div className={`${classes.sliderContent}`}>
              <img
                src={slide.image}
                alt={slide.content}
                className={`${classes.carouselImage} ${
                  index === activeIndex ? `${classes.activeImage}` : `${classes.inactiveImage}`
                }`}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
