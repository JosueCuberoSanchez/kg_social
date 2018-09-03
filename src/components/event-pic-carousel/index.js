import React from 'react';

// Components
import { Carousel } from 'react-responsive-carousel';

// Ramda
import { map } from 'ramda';

// Styles
import './event-pic-carousel.scss';

const imageCreator = image => <div key={image}><img src={image} alt='Event image' className='carousel__image'/></div>;

const EventPicCarousel = ({images}) => {

    return (
        <Carousel>
            {map(imageCreator, images)}
        </Carousel>
    )
};

export default EventPicCarousel;