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
import EventForm from '../../components/forms/event-form/';
import CommentForm from '../../components/forms/comment-form/';
import CommentItem from "../../components/comment-item";

// Filters
import * as filters from '../../helpers/filters';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Amazon S3
import S3FileUpload from 'react-s3';
import * as s3 from '../../private/aws';
import ReactDropzone from "react-dropzone";

// Ramda
import {map} from "ramda";

const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
};

class EventContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {imageModal: false,dataModal: false, files: [], user: JSON.parse(localStorage.getItem('user'))};
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.getEvent(filters.ID,id);
        this.props.getComments(id);
    }

    toggleImageModal = () => {
        this.setState({
            imageModal: !this.state.imageModal
        });
        if(this.state.imageModal && this.state.files.length > 0) {
            this.submitImage();
        }
    };

    toggleDataModal = () => {
        this.setState({
            dataModal: !this.state.dataModal
        });
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

    submitData = (values) => {

        const { id } = this.props;

        this.props.updateEvent(values,false, id);
    };

    onPreviewDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    };

    getAttendees = () => {

        const { event } = this.props;
        if(event.attendees.length > 0){
            return `${event.attendees.join(', ')} and ${event.owner} are going`;
        } else {
            return `${event.owner} is going`;
        }
    };

    checkEnroll = () => {
        const { event } = this.props;
        return event.attendees.includes(this.state.user.username);
    };

    submitComment = async (values) => {
        const { id } = this.props;
        const author = this.state.user.username;

        await this.props.createComment(values.comment, author, id);
        this.props.getComments(id);
    };

    starCreator = () => {

        const { event } = this.props;

        switch (event.stars) {
            case 5:
                return <ul className='list-unstyled list-inline mb-0'><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
            case 4:
                return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
            case 3:
                return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
            case 2:
                return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
            case 1:
                return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
            case 0:
                return <ul className='list-unstyled list-inline mt-3'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li></ul>;
        }
    };

    commentCreator = comment => <CommentItem key={comment._id} comment={comment} />;

    enrollToEvent = () => {
        const { id } = this.props;
        this.props.enrollToEvent(this.state.user.username,id);
    };

    unenrollToEvent = () => {
        const { id } = this.props;
        this.props.unenrollToEvent(this.state.user.username,id);
    };

    render() {

        const { loggedOut, event, eventLoading, comments, commentsLoading } = this.props;

        if (loggedOut && (this.state.user === null))
            return (<Redirect to='/'/>);

        if(eventLoading || eventLoading===undefined)
            return (<p>Loading...</p>);

        return (
            <main className='event'>
                <Container fluid={true} className='pl-0'>
                    <Container className='pl-4 ml-0'>
                        <Row>
                            <Col xs='12' sm='12' md='3' lg='3'>
                                <Aside />
                            </Col>
                            <Col xs='12' sm='12' md='9' lg='9' className='mt-4'>
                                <article className='ml-5 mt-3 px-4 pt-4 event__info'>
                                    {
                                        event.owner === this.state.user.username
                                        ? <FontAwesomeIcon icon="edit" onClick={this.toggleDataModal} className='event__edit-btn float-right'/>
                                        : null
                                    }
                                    <div className='mb-4 pt-4'>
                                        <h2 className='text-center d-inline-block mb-0'>
                                            {event.title}
                                        </h2>
                                        <div className='float-right d-inline-block'>
                                            {this.starCreator()}
                                        </div>
                                    </div>
                                    <Row className='mb-4'>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <img src={event.image} className='d-block mx-auto w-100' />
                                            {
                                                event.owner === this.state.user.username
                                                    ? <FontAwesomeIcon icon="edit" onClick={this.toggleImageModal} className='event__edit-btn float-left mt-2'/>
                                                    : null
                                            }
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <p className='pr-5'>{event.description}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs='6' sm='6' md='6' lg='6'>
                                            <div>
                                                <p>{event.hashtags}</p>
                                            </div>
                                        </Col>
                                        <Col xs='6' sm='6' md='6' lg='6'>
                                            <div>
                                                {this.getAttendees()}
                                            </div>
                                            {
                                                event.owner === this.state.user.username
                                                    ? null
                                                    : this.checkEnroll()
                                                        ? <Button onClick={this.unenrollToEvent}>Unenroll</Button>
                                                        : <Button onClick={this.enrollToEvent}>Enroll</Button>
                                            }
                                        </Col>
                                    </Row>
                                </article>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='12' sm='12' md='12' lg='12'>
                                {
                                    commentsLoading
                                    ? <p>Loading comments...</p>
                                    :
                                        <article className='event__comment-box mt-4 py-4 px-4'>
                                            <h3>Comments</h3>
                                            {
                                                comments.length === 0
                                                    ? <p>There are no comments yet</p>
                                                    :
                                                    <ul className='list-unstyled'>
                                                        {map(this.commentCreator, comments)}
                                                    </ul>
                                            }
                                        </article>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='12' sm='12' md='12' lg='12'>
                                <div className='event__comment-box mt-4 p-4'>
                                    <h3>Write a comment</h3>
                                    <CommentForm onSubmit={this.submitComment}/>
                                </div>
                            </Col>
                        </Row>
                        <Modal isOpen={this.state.imageModal} toggle={this.toggleImageModal} className={this.props.className}>
                            <ModalHeader toggle={this.toggleImageModal}>Change event photo</ModalHeader>
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
                                <Button color="primary" onClick={this.toggleImageModal}>Update</Button>{' '}
                                <Button color="secondary" onClick={this.toggleImageModal}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.dataModal} toggle={this.toggleDataModal} className={this.props.className}>
                            <ModalHeader toggle={this.toggleDataModal}>Change event photo</ModalHeader>
                            <ModalBody className='event__modal-body'>
                                <EventForm onSubmit={this.submitData} update={true} toggleDataModal={this.toggleDataModal} event={event}/>
                            </ModalBody>
                        </Modal>
                    </Container>
                </Container>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return { event: state.events.currentEvent, eventLoading: state.events.eventLoading,
        comments: state.comments.currentEventComments, commentsLoading: state.comments.commentsLoading };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEventImage: (values,id) => dispatch(actions.updateEventImage(values,id)),
        getEvent: (filter,id) => dispatch(actions.getEvent(filter,id)),
        getComments: (id) => dispatch(actions.getComments(id)),
        createComment: (comment, author, id) => dispatch(actions.createComment(comment, author, id)),
        updateEvent: (values, create, id) => dispatch(actions.updateEvent(values, create, id)),
        enrollToEvent: (username, eventId) => dispatch(actions.enrollToEvent(username, eventId)),
        unenrollToEvent: (username, eventId) => dispatch(actions.unenrollToEvent(username, eventId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);