import React from 'react';

// Reactstrap
import { ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';

// Rating
import Rating from 'react-rating';

const VoteEventModal = ({isOpen, toggle, className, submit}) => {

    const starFull = require('../../../assets/img/star-full.png');
    const starEmpty = require('../../../assets/img/star-empty.png');

    return(
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Please rate this event</ModalHeader>
            <ModalBody className='d-flex justify-content-center'>
                <Rating initialRating={0} onChange={submit}
                        emptySymbol={<img src={starEmpty} className='icon event__vote-stars' />}
                        fullSymbol={<img src={starFull} className='icon event__vote-stars' />}/>
            </ModalBody>
            <ModalFooter>
                <button onClick={toggle}>Cancel</button>
            </ModalFooter>
        </Modal>
    )
};

export default VoteEventModal;