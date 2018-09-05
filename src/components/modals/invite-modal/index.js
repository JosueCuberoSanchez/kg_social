import React from 'react';

// Reactstrap
import { ModalHeader, ModalBody, Modal } from 'reactstrap';

// Components
import InviteForm from '../../forms/invite-form';

// Styles

const InviteModal = ({isOpen, toggle, className, submit }) => {

    return (
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Invite people to event</ModalHeader>
            <ModalBody className='event__modal-body'>
                <InviteForm onSubmit={submit} toggle={toggle} />
            </ModalBody>
        </Modal>
    )
};

export default InviteModal;