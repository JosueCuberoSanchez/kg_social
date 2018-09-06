import React from 'react';

// Styles
import './comment-item.scss';

const CommentItem = ({comment}) => {

    return (
        <li className='event-comment px-4 py-2 mb-4'>
            <article>
                <div className='event-comment__content mb-2'>
                    <img src={comment.author.image} className='event-comment__img rounded-circle' alt={`${comment.author.username} profile picture`}/>
                    <p className='ml-2 d-inline-block'>{comment.author.username} commented:</p>
                </div>
                <p className='mb-0'>"{comment.text}"</p>
            </article>
        </li>
    )
};

export default CommentItem;