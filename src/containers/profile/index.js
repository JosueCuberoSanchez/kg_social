/**
 * LoginContainer page.
 * @author Josué David Cubero Sánchez.
 */

import React, {Component, Fragment} from 'react';

// Reactstrap
import {Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators/index';

// Styles
import './profile.scss';

// Router
import Redirect from 'react-router-dom/es/Redirect';

// Components
import Aside from '../aside';
import UpdateProfileForm from '../../components/forms/update-profile-form';
import Error from "../../components/error";
import Loading from "../../components/loading";

// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Amazon S3
import S3FileUpload from 'react-s3';
import * as s3 from '../../private/aws';
import ReactDropzone from 'react-dropzone';
import dnd from '../../assets/img/dnd.png';

class ProfileContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {user: JSON.parse(localStorage.getItem('user')), imageModal: false, dataModal: false, files: []}
    }

    componentDidMount() {
        document.title = 'KGS | Profile';
        const { user } = this.props;
        if(this.state.user.username !== user) // if I am the user, I don't want to query the server again
            this.props.getUser(user);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.user !== nextProps.user) { // if it's a different link
            if (nextProps.user !== this.state.user.user) { // if it's a different user than me
                this.props.getUser(nextProps.user);
            }
        }
        this.setState({user: JSON.parse(localStorage.getItem('user'))});
    }

    toggleImageModal = () => {
        this.setState({imageModal: !this.state.imageModal});
        if (this.state.imageModal && this.state.files.length > 0)
            this.submitImage();
    };

    toggleDataModal = () => {
        this.setState({dataModal: !this.state.dataModal});
    };

    submitImage = () => {
        const file = this.state.files[0];
        S3FileUpload.uploadFile(file, s3.config).then(data => {
            const body = {image: data.location};
            this.props.updateUser(body, this.state.user.id);
            this.setState({files: []});
        }).catch(err => console.error(err));
    };

    submitData = (values) => {
        this.props.updateUser(values, this.state.user.id);
        this.toggleDataModal();
    };

    onPreviewDrop = (files) => {
        this.setState({files: this.state.files.concat(files)});
    };

    render() {

        const { userLoading, error, authenticated } = this.props;

        if (localStorage.getItem('user') === null || !authenticated)
            return <Redirect to='/'/>;

        if(error)
            return <Error />;

        let user;
        if(this.props.user === this.state.user.username) {
            user = this.state.user;
        } else {
            if(userLoading)
                return (<Loading />);
            user = {
                username: this.props.username, firstName: this.props.firstName, lastName: this.props.lastName, email: this.props.email,
                points: this.props.points, facebook: this.props.facebook, twitter: this.props.twitter, instagram: this.props.instagram,
                image: this.props.image, phone: this.props.phone
            };
        }

        return (
            <main className='profile'>
                <h1 className='sr-only'>Profile page</h1>
                <Container fluid={true}>
                    <Container>
                        <Row>
                            <Col xs='12' sm='12' md='9' lg='9'>
                                <Row>
                                    <Col xs='12' sm='12' md='5' lg='5' className='text-center'>
                                        <img src={user.image} alt={`${user.username} profile picture`} className='d-block mx-auto w-100 mt-5 mb-3 rounded-circle'/>
                                        {
                                            this.state.user.username === user.username
                                            ? <button onClick={this.toggleImageModal}>Edit</button>
                                            : null
                                        }
                                    </Col>
                                    <Col xs='12' sm='12' md='7' lg='7'>
                                        <h2 className='mt-5'>{user.username}</h2>
                                        <div className='profile__info mt-3 p-3'>
                                            <p><strong>Name: </strong>{user.firstName+' '+user.lastName}</p>
                                            <p><strong>Email: </strong>{user.email}</p>
                                            <p><strong>Phone number: </strong>{user.phone}</p>
                                            <p><strong>Points earned: </strong>{user.points}</p>
                                            <div className='d-flex justify-content-between pt-2'>
                                                {
                                                    user.facebook !== ''
                                                        ? <a href={user.facebook} aria-label='Facebook profile link'><FontAwesomeIcon icon={['fab', 'facebook']} className='mr-2 profile__social-media-link' alt='Facebook profile link'/></a>
                                                        : null
                                                }
                                                {
                                                    user.twitter !== ''
                                                        ? <a href={user.twitter} aria-label='Twitter profile link'><FontAwesomeIcon icon={['fab', 'twitter']} className='mr-2 profile__social-media-link' alt='Facebook profile link'/></a>
                                                        : null
                                                }
                                                {
                                                    user.instagram !== ''
                                                        ? <a href={user.instagram} aria-label=' profile link'><FontAwesomeIcon icon={['fab', 'instagram']} className='mr-2 profile__social-media-link' alt='Facebook profile link'/></a>
                                                        : null
                                                }
                                            </div>
                                            {
                                                this.state.user.username === user.username
                                                    ? <button onClick={this.toggleDataModal} className='mt-4'>Edit</button>
                                                    : null
                                            }
                                        </div>


                                        <Modal isOpen={this.state.dataModal} toggle={this.toggleDataModal} className={this.props.className}>
                                            <ModalHeader toggle={this.toggleDataModal}>Change event photo</ModalHeader>
                                            <ModalBody>
                                                <UpdateProfileForm onSubmit={this.submitData} toggleDataModal={this.toggleDataModal} user={user}/>
                                            </ModalBody>
                                        </Modal>

                                        <Modal isOpen={this.state.imageModal} toggle={this.toggleImageModal}
                                               className={this.props.className}>
                                            <ModalHeader toggle={this.toggleImageModal}>Change event photo</ModalHeader>
                                            <ModalBody className='profile__modal-body'>
                                                <ReactDropzone accept='image/*' onDrop={this.onPreviewDrop}>
                                                    <img src={dnd} className='d-block mx-auto w-75'/>
                                                </ReactDropzone>
                                                {this.state.files.length > 0 &&
                                                <Fragment>
                                                    <h3 className='text-center'>Preview</h3>
                                                    {this.state.files.map((file) => (
                                                        <img alt='Preview' key={file.preview} src={file.preview}
                                                             className='d-block mx-auto profile__preview-img'/>
                                                    ))}
                                                </Fragment>
                                                }
                                            </ModalBody>
                                            <ModalFooter>
                                                <button onClick={this.toggleImageModal}>Update</button>{' '}
                                                <button onClick={this.toggleImageModal}>Cancel</button>
                                            </ModalFooter>
                                        </Modal>


                                    </Col>
                                </Row>
                            </Col>
                            <Col xs='12' sm='12' md='3' lg='3'>
                                <Aside />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </main>
        );

    }
}

const mapStateToProps = state => {
    return { username: state.user.username, firstName: state.user.firstName, lastName: state.user.lastName, email: state.user.email,
        points: state.user.points, facebook: state.user.facebook, twitter: state.user.twitter, instagram: state.user.instagram,
        image: state.user.image, phone: state.user.phone, error: state.user.error, userLoading: state.user.userLoading, authenticated: state.user.authenticated };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: (username) => dispatch(actions.getUser(username)),
        updateUser: (values, id) => dispatch(actions.updateUser(values, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);