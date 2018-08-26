import React, { Component, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators';

// Styles
import './event.scss';
import dnd from '../../assets/img/dnd.png';

// Router
import { Redirect } from 'react-router-dom';

// Reactstrap
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';

// Components
import Aside from '../../components/aside';

// Filters
import * as filters from '../../helpers/filters';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Amazon S3
import S3FileUpload from 'react-s3';
import * as s3 from '../../private/aws';
import ReactDropzone from "react-dropzone";

const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
};

class EventContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {modal: false,files: []};
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.getEvent(filters.ID,id);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        if(this.state.modal && this.state.files.length > 0) {
            this.submitImage();
        }
    };

    submitImage = async () => {
        const { id } = this.props;
        const file = this.state.files[0];
        S3FileUpload
            .uploadFile(file, s3.config)
            .then(data => {
                this.props.updateEventImage(data,id);
                this.setState({files:[]})
            })
            .catch(err => console.error(err))
    };

    onPreviewDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    };

    render() {

        const { loggedOut, event, isLoading } = this.props;

        if (loggedOut && (localStorage.getItem('user') === null))
            return (<Redirect to='/'/>);

        if(isLoading)
            return (<p>Loading...</p>);

        /*if(event.owner)
            console.log('Owner');*/

        return (
            <main className='event'>
                <Container fluid={true} className='pl-0'>
                    <Container className='pl-4 ml-0'>
                        <Row>
                            <Col xs='12' sm='12' md='3' lg='3'>
                                <Aside />
                            </Col>
                            <Col xs='12' sm='12' md='9' lg='9' className='mt-4'>
                                <div className='ml-5 mt-3 event__info'>
                                    <h2 className='text-center mb-4 pt-4'>{event.title}</h2>
                                    <Row>
                                        <Col xs='6' sm='6' md='6' lg='6'>
                                            <div className='pl-4'>
                                                <img src={event.image} className='d-block mx-auto w-100' />
                                                <FontAwesomeIcon icon="edit" onClick={this.toggle} className='event__edit-image'/>
                                            </div>
                                        </Col>
                                        <Col xs='6' sm='6' md='6' lg='6'>
                                            <p className='pr-5'>{event.description}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Change event photo</ModalHeader>
                            <ModalBody className='event__modal-body'>
                                <ReactDropzone accept="image/*" onDrop={this.onPreviewDrop}>
                                    <img src={dnd} className='d-block mx-auto w-75' />
                                </ReactDropzone>
                                {this.state.files.length > 0 &&
                                <Fragment>
                                    <h3 className='text-center'>Preview</h3>
                                    {this.state.files.map((file) => (
                                        <img alt="Preview" key={file.preview} src={file.preview}
                                             style={previewStyle} className='d-block mx-auto'/>
                                    ))}
                                </Fragment>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Upload</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </Container>
                </Container>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return { event: state.events.newEvent, isLoading: state.events.newEvent.isLoading };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEventImage: (values,id) => dispatch(actions.updateEventImage(values,id)),
        getEvent: (filter,id) => dispatch(actions.getEvent(filter,id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);