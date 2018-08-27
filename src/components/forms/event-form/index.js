/**
 * CreateForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import './event-form.scss';

let EventForm = (props)  => {

    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit} className='mt-5 form create-event'>
            <div className='mb-4'>
                <Label htmlFor='title'>Event title</Label>
                <Field name='title' component='input' type='text'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter event title'/>
            </div>
            <div className='mb-4'>
                <Label htmlFor='description'>Event description</Label>
                <Field name='description' component='textarea' type='text'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter event description'/>
            </div>
            <div className='mb-4'>
                <Label htmlFor='hashtags'>Hashtags</Label>
                <Field name='hashtags' component='input' type='text'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter hashtags'/>
            </div>
            <div className='mb-4'>
                <Label htmlFor='private'>Private</Label>
                <div className='ml-2 d-inline-block'>
                    <Field name="private" id="private" component='input' type="checkbox"/>
                </div>
            </div>
            <button type='submit' className='form__button mt-4'>Create event!</button>
        </form>
    );

};

EventForm = reduxForm({form: 'eventForm'})(EventForm);
export default EventForm;