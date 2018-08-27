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

        this.state = {modal: false, files: [], user: JSON.parse(localStorage.getItem('user'))};
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.getEvent(filters.ID,id);
        this.props.getComments(id);
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

    getAttendees = (event) => {
        if(event.attendees.length > 0){
            if(event.attendees.length === 1)
                return (<p>{event.attendees[0]} is going.</p>);
            let attendees = event.attendees.join(', ');
            return (<p>{attendees} are going.</p>);
        } else {
            return (<p>{event.owner} is going.</p>);
        }
    };

    submitComment = async (values) => {
        const { id } = this.props;
        const author = this.state.user.username;

        await this.props.createComment(values.comment, author, id);
        this.props.getComments(id);
    };

    commentCreator = comment => <CommentItem key={comment._id} comment={comment} />;

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
                                        ? <FontAwesomeIcon icon="edit" onClick={this.toggle} className='event__edit-btn float-right'/>
                                        : null
                                    }
                                    <h2 className='text-center mb-4 pt-4'>{event.title}</h2>
                                    <Row className='mb-4'>
                                        <Col xs='6' sm='6' md='6' lg='6'>
                                            <img src={event.image} className='d-block mx-auto w-100' />
                                        </Col>
                                        <Col xs='6' sm='6' md='6' lg='6'>
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
                                                {this.getAttendees(event)}
                                            </div>
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
                                <Button color="primary" onClick={this.toggle}>Update</Button>{' '}
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
    return { event: state.events.currentEvent, eventLoading: state.events.eventLoading,
        comments: state.comments.currentEventComments, commentsLoading: state.comments.commentsLoading };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEventImage: (values,id) => dispatch(actions.updateEventImage(values,id)),
        getEvent: (filter,id) => dispatch(actions.getEvent(filter,id)),
        getComments: (id) => dispatch(actions.getComments(id)),
        createComment: (comment, author, id) => dispatch(actions.createComment(comment, author, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);