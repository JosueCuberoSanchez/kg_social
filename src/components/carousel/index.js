import React, { Component } from 'react';

// Components
import Slider from "react-slick";

// Ramda
import { map } from 'ramda';

// Styles
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './carousel.scss'

// Helpers
import { CAROUSEL_SETTINGS } from "../../helpers/constants";

class Carousel extends Component {

    constructor (props) {super(props);}

    imageCreator = image =>  <div key={image}><img src={image} alt='Event pic' className='w-100 '/></div>;

    render () {

        const  { images } = this.props;

        return (
            <Slider {...CAROUSEL_SETTINGS}>
                {map(this.imageCreator, images)}
            </Slider>
        );
    }
}

export default Carousel;