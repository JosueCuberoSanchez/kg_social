/**
 * CreateForm component.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import './event-form.scss';

class EventForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { update, event } = this.props;
        if(update)
            this.props.initialize({ title: event.title, description: event.description, hashtags: event.hashtags, private: event.private });
    }

    formSubmit = (values) => {
        const {handleSubmit, update, toggleDataModal } = this.props;
        if(update)
            toggleDataModal();
        handleSubmit(values);
    };

    render() {

        const { toggleDataModal, update } = this.props;

        return (
            <form onSubmit={this.formSubmit} className='form'>
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
                    {
                        update
                        ?   <div>
                                <button type='submit' className='form__button mt-4'>Update event!</button>{' '}
                                <button type='button' className='form__button mt-4' onClick={toggleDataModal}>Cancel</button>
                            </div>
                        :   <div>
                                <button type='submit' className='form__button mt-4'>Create event!</button>{' '}
                            </div>
                    }
            </form>
        );
    }
}

EventForm = reduxForm({form: 'eventForm'})(EventForm);
export default EventForm;