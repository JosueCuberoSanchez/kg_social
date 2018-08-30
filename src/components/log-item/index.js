import React from 'react';

// Styles
import './log-item.scss';

// Helpers
import { getLogDate } from "../../helpers/functions";

// Router
import { Link } from 'react-router-dom';

// Reactstrap
import { Row, Col } from 'reactstrap';

const LogItem = ({log}) => {

    return (
        <li className='mb-3 log-item'>
            <Link to={`${log.link}`}>
                <article className='p-2'>
                    <Row>
                        <Col xs='3' sm='3' md='3' lg='3' className='pr-0'>
                            <img src={log.author} alt={`${log.author} profile picture`} className='w-100'/>
                        </Col>
                        <Col xs='9' sm='9' md='9' lg='9' className='d-flex'>
                             <p className='log-item__text mb-0 justify-content-center align-self-center'>{ log.action }</p>
                        </Col>
                    </Row>
                    <p className='log-item__text mb-0 mt-1'>{ getLogDate(log.date) }</p>
                </article>
            </Link>
        </li>
    )
};

export default LogItem;