import React from 'react';

// Reactstrap
import { ModalHeader, ModalBody, Modal } from "reactstrap";

// Components
import EventAttendees from "../../event-attendees";

const AttendeesModal = ({isOpen, toggle, className, attendees}) => {
    return(
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Event attendees</ModalHeader>
            <ModalBody>
                <EventAttendees attendees={attendees}/>
            </ModalBody>
        </Modal>
    )
};

export default AttendeesModal;