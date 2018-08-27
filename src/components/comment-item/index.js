import React from 'react';

// Styles
import './comment-item.scss';

const CommentItem = ({comment}) => {

    return (
        <li className='event__comment px-4 py-2 mb-4'>
            <div className='comment mb-2'>
                <img src={comment.authorImage} className='comment__img' />
                <p className='ml-2 d-inline-block'>{comment.author} commented:</p>
            </div>
            <p className='mb-0'>"{comment.text}"</p>
        </li>
    )
};

export default CommentItem;