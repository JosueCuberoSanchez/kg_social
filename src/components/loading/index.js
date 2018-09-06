import React from 'react';

// Spinner
import { RingLoader } from 'react-spinners';

// Styles
import './loading.scss';

const Loading = () => {
    return (
        <div className='loading text-center mt-5 pt-4'>
            <div className='d-flex justify-content-center mb-3'>
                <RingLoader sizeUnit={"em"} size={19} color={'#00a0b2'} loading={true}/>
            </div>
            <h2>Loading...</h2>
        </div>
)
};

export default Loading;