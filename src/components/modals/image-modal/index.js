import React, { Fragment } from 'react';

// Drag and drop
import ReactDropzone from "react-dropzone";
import dnd from "../../../assets/img/dnd.png";

// Reactstrap
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Styles
import './image-modal.scss';

const ImageModal = ({isOpen, toggle, className, files, onPreviewDrop}) => {
  return (
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Event photo</ModalHeader>
          <ModalBody className='image-modal__body'>
              <ReactDropzone accept='image/*' onDrop={onPreviewDrop}>
                  <img src={dnd} className='d-block mx-auto w-75'/>
              </ReactDropzone>
              {files.length > 0 &&
              <Fragment>
                  <h3 className='text-center'>Preview</h3>
                  {files.map((file) => (<img alt='Preview' key={file.preview} src={file.preview} className='d-block mx-auto image-modal__preview-img'/>))}
              </Fragment>
              }
          </ModalBody>
          <ModalFooter>
              <button onClick={toggle}>Update</button>
              {' '}
              <button onClick={toggle}>Cancel</button>
          </ModalFooter>
      </Modal>
  )
};

export default ImageModal;