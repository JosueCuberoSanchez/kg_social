import React from 'react';

// Styles
import './log-item.scss';

const LogItem = ({log}) => {

    return (
        <li className='mb-4 log'>
            <article>
                { log.action }
            </article>
        </li>
    )
};

export default LogItem;