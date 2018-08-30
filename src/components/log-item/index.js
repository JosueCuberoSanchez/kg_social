import React from 'react';

// Styles
import './log-item.scss';

// Helpers
import { getLogDate } from "../../helpers/functions";

// Router
import { Link } from 'react-router-dom';

const LogItem = ({log}) => {

    return (
        <li className='mb-3 log-item'>
            <Link to={`${log.link}`}>
                <article className='p-2'>
                    <p className='log-item__text mb-0'>{ log.action }</p>
                    <p className='log-item__text mb-0'>{ getLogDate(log.date) }</p>
                </article>
            </Link>
        </li>
    )
};

export default LogItem;