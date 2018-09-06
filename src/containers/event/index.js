import React, { Component } from 'react';

// Redux
import {connect} from 'react-redux';
import * as actions from '../../redux/actionCreators';

// Styles
import './event.scss';

// Router
import {Redirect} from 'react-router-dom';

// Reactstrap
import {Container, Row, Col } from 'reactstrap';

// Components
import Aside from '../aside';
import CommentForm from '../../components/forms/comment-form/';
import CommentsContainer from '../../containers/comments/';
import EventImages from '../../components/event-images/';
import EventHeader from '../../components/event-header/';
import EventBody from '../../components/event-body/';
import EventFooter from '../../components/event-footer/';
import Error from "../../components/error";
import Loading from "../../components/loading";

// Modals
import ImageModal from '../../components/modals/image-modal';
import EditEventModal from '../../components/modals/edit-event-modal';
import AttendeesModal from '../../components/modals/attendees-modal';
import VoteEventModal from '../../components/modals/vote-event-modal';
import InviteModal from '../../components/modals/invite-modal';

// Amazon S3
import S3FileUpload from 'react-s3';
import * as s3 from '../../private/aws';

class EventContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {imageModal: false, dataModal: false, attendeesModal: false, voteModal: false, inviteModal: false,
            files: [], user: JSON.parse(localStorage.getItem('user'))};
    }

    async componentDidMount() {
        document.title = 'KGS | Event';
        const {id} = this.props;
        const vote = await actions.checkVote(id, this.state.user.id);
        if(!vote)
            this.setState({voteModal: true});
        this.props.getEvent('id', id); // Get event info
    }

    componentWillReceiveProps(nextProps) {
        const { id } = this.props;
        if(nextProps.id !== id)
            this.props.getEvent('id', nextProps.id); // Get event info
    }

    toggleImageModal = () => {
        this.setState({imageModal: !this.state.imageModal});
        if (this.state.imageModal && this.state.files.length > 0)
            this.submitImage();
    };

    toggleDataModal = () => {
        this.setState({dataModal: !this.state.dataModal});
    };

    toggleAttendeesModal = () => {
        this.setState({attendeesModal: !this.state.attendeesModal});
    };

    toggleVoteModal = () => {
        this.setState({voteModal: !this.state.voteModal});
    };

    submitVoteStars = (e) => {
        const { id } = this.props;
        this.toggleVoteModal();
        this.props.submitVote(e, id, this.state.user.id);
    };

    onPreviewDrop = (files) => {
        this.setState({files: this.state.files.concat(files)});
    };

    submitImage = () => {
        const file = this.state.files[0];
        S3FileUpload.uploadFile(file, s3.config).then(data => {
            const body = {image: data.location};
            this.props.updateEventImage(body, this.props.id);
            this.setState({files: []});
        }).catch(err => console.error(err));
    };

    submitEventPic = (file) => {
        S3FileUpload.uploadFile(file, s3.config).then(data => {
            this.props.updateEventPics(data, this.props.id);
        }).catch(err => console.error(err));
    };

    submitData = (values) => {
        this.props.updateEvent(values, this.props.id);
    };

    checkEnroll = (attendees) => {
        return attendees.filter(attendee => attendee.user === this.state.user.id).length !== 0;
    };

    enrollToEvent = () => {
        this.props.enrollToEvent(this.state.user.username, this.props.id);
    };

    unenrollToEvent = () => {
        this.props.unenrollToEvent(this.state.user.username, this.props.id);
    };

    submitInvites = (values) => {
        const { id } = this.props;
        actions.inviteUsers(values.invites, id);
    };

    toggleInviteModal = () => {
        this.setState({inviteModal: !this.state.inviteModal});
    };

    submitComment = async (values) => {
        const {id} = this.props;
        await this.props.createComment(values.comment, this.state.user.id, id);
    };

    render() {

        const {event, eventLoading, attendees, usernames, eventCanceled, error} = this.props;

        if (localStorage.getItem('user') === null || eventCanceled)
            return (<Redirect to='/'/>);

        if (eventLoading || eventLoading === undefined)
            return <Loading />;

        if(error)
            return <Error />;

        return (
            <main className='event'>
                <h1 className='sr-only'>{event.title} page</h1>
                <Container fluid={true}>
                    <Row>
                        <Col xs='12' sm='12' md='9' lg='9' className='mt-5'>
                            <article className='p-3 event__info'>
                                <EventHeader owner={event.owner} userId={this.state.user.id} toggle={this.toggleDataModal}
                                    title={event.title} stars={event.stars} votes={event.votes} />
                                <EventBody date={event.date} location={event.location} description={event.description} image={event.image} />
                                <EventFooter owner={event.owner} userId={this.state.user.id} toggleImageModal={this.toggleImageModal}
                                             hashtags={event.hashtags} attendees={attendees} toggleAttendeesModal={this.toggleAttendeesModal}
                                             enroll={this.enrollToEvent} unenrroll={this.unenrollToEvent} checkEnroll={this.checkEnroll}
                                             toggleInviteModal={this.toggleInviteModal}/>
                            </article>
                        </Col>
                        <Col xs='12' sm='12' md='3' lg='3'>
                            <Aside/>
                        </Col>
                    </Row>
                    <Row className='mt-4 py-4'>
                        <Col xs='12' sm='7' md='7' lg='7'>
                            <EventImages images={event.images} upload={this.submitEventPic}/>
                        </Col>
                        <Col xs='12' sm='5' md='5' lg='5'>
                            <Row>
                                <Col xs='12' sm='12' md='12' lg='12'>
                                    <CommentsContainer id={this.props.id}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs='12' sm='12' md='12' lg='12'>
                                    <div className='event__comment-box mt-4 p-4'>
                                        <h4>Write a comment</h4>
                                        <CommentForm onSubmit={this.submitComment}/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12' className='text-center'>
                            <button className='event__warning-btn' onClick={() => this.props.cancelEvent(event._id)}>Cancel Event</button>
                        </Col>
                    </Row>
                </Container>

                <ImageModal isOpen={this.state.imageModal} toggle={this.toggleImageModal} className={this.props.className} files={this.state.files} onPreviewDrop={this.onPreviewDrop}/>
                <EditEventModal isOpen={this.state.dataModal} toggle={this.toggleDataModal} className={this.props.className} submitData={this.submitData} event={event} />
                <AttendeesModal isOpen={this.state.attendeesModal} toggle={this.toggleAttendeesModal} className={this.props.className} attendees={attendees} />
                <VoteEventModal isOpen={this.state.voteModal} toggle={this.toggleVoteModal} className={this.props.className} submit={this.submitVoteStars} />
                <InviteModal isOpen={this.state.inviteModal} toggle={this.toggleInviteModal} className={this.props.className} submit={this.submitInvites} usernames={usernames}/>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        event: state.events.currentEvent, eventLoading: state.events.eventLoading, attendees: state.events.attendees, eventCanceled: state.events.canceled, error: state.events.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEventImage: (values, id) => dispatch(actions.updateEventImage(values, id)),
        updateEventPics: (values, id) => dispatch(actions.updateEventPics(values, id)),
        getEvent: (filter, id) => dispatch(actions.getEvent(filter, id)),
        createComment: (comment, authorId, eventId) => dispatch(actions.createComment(comment, authorId, eventId)),
        updateEvent: (values, id) => dispatch(actions.updateEvent(values, id)),
        enrollToEvent: (username, eventId) => dispatch(actions.enrollToEvent(username, eventId)),
        unenrollToEvent: (username, eventId) => dispatch(actions.unenrollToEvent(username, eventId)),
        submitVote: (stars, eventId, userId) => dispatch(actions.submitVote(stars, eventId, userId)),
        cancelEvent: (id) => dispatch(actions.cancelEvent(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);