import React from 'react';

// Reactstrap
import { ModalHeader, ModalBody, Modal } from 'reactstrap';

// Components
import EventForm from '../../forms/event-form';

// Styles

const EditEventModal = ({isOpen, toggle, className, submitData, event}) => {

    return (
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Change event photo</ModalHeader>
            <ModalBody className='event__modal-body'>
                <EventForm onSubmit={submitData} update={true} toggleDataModal={toggle} event={event}/>
            </ModalBody>
        </Modal>
    )
};

export default EditEventModal;