import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';
import * as actions from '../../redux/actionCreators';

// Styles
import './event.scss';
import dnd from '../../assets/img/dnd.png';

// Router
import {Redirect} from 'react-router-dom';

// Reactstrap
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';

// Components
import Aside from '../aside';
import EventForm from '../../components/forms/event-form/';
import CommentForm from '../../components/forms/comment-form/';
import CommentItem from "../../components/comment-item";

// Filters
import * as filters from '../../helpers/filters';

// Amazon S3
import S3FileUpload from 'react-s3';
import * as s3 from '../../private/aws';
import ReactDropzone from "react-dropzone";

// Ramda
import { map } from "ramda";

// Helpers
import { starCreator, getAttendees, getEventDay, getEventDate, getEventYear, getEventMonth } from "../../helpers/functions";

class EventContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {imageModal: false, dataModal: false, files: [], user: JSON.parse(localStorage.getItem('user'))};
    }

    componentDidMount() {
        const {id} = this.props;
        this.props.getEvent(filters.ID, id); // Get event info
        this.props.getComments(id); // Get event comments
    }

    toggleImageModal = () => {
        this.setState({imageModal: !this.state.imageModal});
        if (this.state.imageModal && this.state.files.length > 0)
            this.submitImage();
    };

    toggleDataModal = () => {
        this.setState({dataModal: !this.state.dataModal});
    };

    onPreviewDrop = (files) => {
        this.setState({files: this.state.files.concat(files)});
    };

    submitImage = async () => {
        const file = this.state.files[0];
        S3FileUpload.uploadFile(file, s3.config).then(data => {
            this.props.updateEventImage(data, this.props.id);
            this.setState({files: []});
        }).catch(err => console.error(err));
    };

    submitData = (values) => {
        this.props.updateEvent(values, false, this.props.id);
    };

    checkEnroll = () => {
        return this.props.event.attendees.includes(this.state.user.username);
    };

    enrollToEvent = () => {
        this.props.enrollToEvent(this.state.user.username, this.props.id);
    };

    unenrollToEvent = () => {
        this.props.unenrollToEvent(this.state.user.username, this.props.id);
    };

    submitComment = async (values) => {
        const {id} = this.props;
        await this.props.createComment(values.comment, this.state.user.username, id);
        this.props.getComments(id);
    };

    commentCreator = comment => <CommentItem key={comment._id} comment={comment}/>;

    render() {

        const {loggedOut, event, eventLoading, comments, commentsLoading} = this.props;

        if (localStorage.getItem('user') === null)
            return (<Redirect to='/'/>);

        if (eventLoading || eventLoading === undefined)
            return (<p>Loading...</p>);

        return (
            <main className='event'>
                <h1 className='sr-only'>{event.title} page</h1>
                <Container fluid={true}>
                        <Row>
                            <Col xs='12' sm='12' md='10' lg='10' className='mt-5'>
                                <article className='p-3 event__info'>
                                    {
                                        event.owner === this.state.user.username
                                            ? <div className='d-flex justify-content-between'>
                                                <div/>
                                                <button onClick={this.toggleDataModal}>Edit event info</button>
                                            </div>
                                            : null
                                    }
                                    <Row className='mb-4 mt-2 pt-4'>
                                        <Col xs='12' sm='12' md='7' lg='7'>
                                            <h2 className='event__title'><strong>{event.title}</strong></h2>
                                        </Col>
                                        <Col xs='12' sm='12' md='5' lg='5'>
                                            <div className='float-right'>{starCreator(event)}</div>
                                        </Col>
                                    </Row>
                                    <Row className='event__main-content'>
                                        <Col xs='12' sm='4' md='4' lg='4' className='mb-4'>
                                            <div className='event__date h-100 p-2'>
                                                <p className='event__date--date mb-0'>{getEventDate(event)}</p>
                                                <p className='event__date--day mb-0npo'>{getEventDay(event)}</p>
                                                <p className='event__date--month'>{getEventMonth(event)}</p>
                                                <p className='event__location mt-4'>{event.location}</p>
                                            </div>
                                        </Col>
                                        <Col xs='12' sm='8' md='8' lg='8' className='mb-4'>
                                            <img src={event.image} className='d-block mx-auto w-100 h-100' alt={`${event.title} main photo`}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs='12' sm='12' md='12' lg='12'>
                                            <Row>
                                                <Col xs='12' sm='4' md='4' lg='4' className='order-sm-2 order-1'>
                                                    <div className='float-right event__edit-img-container mb-4'>
                                                        {
                                                            event.owner === this.state.user.username
                                                                ? <button onClick={this.toggleImageModal}>Edit event
                                                                    photo</button>
                                                                : null
                                                        }
                                                    </div>
                                                </Col>
                                                <Col xs='12' sm='8' md='8' lg='8' className='order-sm-1 order-2'>
                                                    <p className='mb-4'>{event.hashtags}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs='12' sm='12' md='12' lg='12'>
                                            <Row>
                                                <Col xs='12' sm='8' md='8' lg='8' className='mb-3'>
                                                    <p className='my-auto'>{getAttendees(event)}</p>
                                                </Col>
                                                <Col xs='12' sm='4' md='4' lg='4' className='mb-3'>
                                                    <div className='float-right'>
                                                        {
                                                            event.owner === this.state.user.username
                                                                ? null
                                                                : this.checkEnroll()
                                                                ? <button onClick={this.unenrollToEvent}>Unenroll!</button>
                                                                : <button onClick={this.enrollToEvent}>Enroll!</button>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </article>
                                <Row>
                                    <Col xs='12' sm='12' md='12' lg='12'>
                                        {
                                            commentsLoading
                                                ? <p>Loading comments...</p>
                                                :
                                                <div className='mt-4 py-4 px-4'>
                                                    <h3>Comments</h3>
                                                    {
                                                        comments.length === 0
                                                            ? <p>There are no comments yet</p>
                                                            :
                                                            <ul className='list-unstyled'>
                                                                {map(this.commentCreator, comments)}
                                                            </ul>
                                                    }
                                                </div>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs='12' sm='12' md='2' lg='2'>
                                <Aside/>
                            </Col>
                        </Row>
                </Container>
                <Container fluid={true}>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <div className='event__comment-box mt-4 p-4'>
                                <h4>Write a comment</h4>
                                <CommentForm onSubmit={this.submitComment}/>
                            </div>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.imageModal} toggle={this.toggleImageModal}
                           className={this.props.className}>
                        <ModalHeader toggle={this.toggleImageModal}>Change event photo</ModalHeader>
                        <ModalBody className='event__modal-body'>
                            <ReactDropzone accept="image/*" onDrop={this.onPreviewDrop}>
                                <img src={dnd} className='d-block mx-auto w-75'/>
                            </ReactDropzone>
                            {this.state.files.length > 0 &&
                            <Fragment>
                                <h3 className='text-center'>Preview</h3>
                                {this.state.files.map((file) => (
                                    <img alt="Preview" key={file.preview} src={file.preview}
                                         className='d-block mx-auto event__preview-img'/>
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
                            <EventForm onSubmit={this.submitData} update={true} toggleDataModal={this.toggleDataModal}
                                       event={event}/>
                        </ModalBody>
                    </Modal>
                </Container>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        event: state.events.currentEvent, eventLoading: state.events.eventLoading,
        comments: state.comments.currentEventComments, commentsLoading: state.comments.commentsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEventImage: (values, id) => dispatch(actions.updateEventImage(values, id)),
        getEvent: (filter, id) => dispatch(actions.getEvent(filter, id)),
        getComments: (id) => dispatch(actions.getComments(id)),
        createComment: (comment, author, id) => dispatch(actions.createComment(comment, author, id)),
        updateEvent: (values, create, id) => dispatch(actions.updateEvent(values, create, id)),
        enrollToEvent: (username, eventId) => dispatch(actions.enrollToEvent(username, eventId)),
        unenrollToEvent: (username, eventId) => dispatch(actions.unenrollToEvent(username, eventId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);