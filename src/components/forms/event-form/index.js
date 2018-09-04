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
import 'react-datepicker/dist/react-datepicker.css';

// Date picker
import DatePicker from 'react-datepicker';
import moment from 'moment';

class EventForm extends Component {

    constructor(props) { super(props); }

    componentDidMount() {
        const { update, event } = this.props;
        if(update) { // if it's an event update initialize the input with the event data values
            const date = new Date(event.date);
            const finalDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
            this.props.initialize({
                title: event.title, description: event.description,
                hashtags: event.hashtags, private: event.private, date: finalDate, location: event.location
            });
        }
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
                    <Field name='title' id='title' component='input' type='text'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter event title'/>
                </div>
                <div className='mb-4'>
                    <Label htmlFor='description'>Event description</Label>
                    <Field name='description' id='description' component='textarea' type='text'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter event description'/>
                </div>
                <div className='mb-4'>
                    <Label htmlFor='location'>Event location</Label>
                    <Field name='location' id='location' component='input' type='text'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter event location'/>
                </div>
                <div className='mb-4'>
                    <Label htmlFor='date'>Date</Label>
                    <Field name='date' id='date' component={renderDatePicker} />
                </div>
                <div className='mb-4'>
                    <Label htmlFor='hashtags'>Hashtags</Label>
                    <Field name='hashtags' id='hashtags' component='input' type='text'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter hashtags'/>
                </div>
                <div className='mb-4'>
                    <Label htmlFor='private'>Private</Label>
                    <div className='ml-2 d-inline-block'>
                        <Field name='private' id='private' component='input' type='checkbox'/>
                    </div>
                </div>
                    {
                        update
                        ?   <div className='mt-4'>
                                <button type='submit'>Update event!</button>{' '}
                                <button type='button' onClick={toggleDataModal}>Cancel</button>
                            </div>
                        :   <div className='mt-4'>
                                <button type='submit'>Create event!</button>{' '}
                            </div>
                    }
            </form>
        );
    }
}

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
    <div>
        <DatePicker {...input} dateForm='MM-DD-YYYY' selected={input.value ? moment(input.value) : null} className='form__date-picker' placeholderText='Enter event date' id='date'/>
        {touched && error && <span>{error}</span>}
    </div>
);

EventForm = reduxForm({form: 'eventForm'})(EventForm);
export default EventForm;