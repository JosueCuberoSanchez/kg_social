import React, { Component } from 'react';

// Ramda
import {map} from "ramda";

// Components
import CommentItem from "../../components/comment-item";
import * as actions from "../../redux/actionCreators";

// Redux
import { connect } from 'react-redux';

class CommentsContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getComments(this.props.id); // Get event comments
    }

    commentCreator = comment => <CommentItem key={comment._id} comment={comment}/>;

    render() {

        const { commentsLoading, comments } = this.props;

        return (
            <div>
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
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        comments: state.comments.currentEventComments, commentsLoading: state.comments.commentsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getComments: (id) => dispatch(actions.getComments(id))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CommentsContainer);