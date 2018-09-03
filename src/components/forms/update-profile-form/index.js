/**
 * UpdateProfileForm component.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import '../form.scss';

class UpdateProfileForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const { user } = this.props;

        this.props.initialize({
            username: user.username, firstName: user.firstName, lastName: user.lastName, phone: user.phone, facebook: user.facebook,
            twitter: user.twitter, instagram: user.instagram, email: user.email
        });
    }

    render() {

        const { handleSubmit, toggleDataModal } = this.props;

        return (
            <form onSubmit={handleSubmit} className='mt-3 form'>
                <div>
                    <Label htmlFor='email'>Enter email</Label>
                    <Field name='email' id='email' component='input' type='email'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter email'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='username'>Enter username</Label>
                    <Field name='username' id='username' component='input' type='text'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter username'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='firstName'>Enter first name</Label>
                    <Field name='firstName' id='firstName' component='input' type='text'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter first name'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='lastName'>Enter last name</Label>
                    <Field name='lastName' id='lastName' component='input' type='text'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter last name'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='phone'>Enter phone number</Label>
                    <Field name='phone' id='phone' component='input' type='text'
                           className='w-100 pl-2 form__field' placeholder='Enter phone number'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='facebook'>Enter Facebook profile link</Label>
                    <Field name='facebook' id='facebook' component='input' type='text'
                           className='w-100 pl-2 form__field' placeholder='Enter Facebook profile link'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='twitter'>Enter Twitter profile link</Label>
                    <Field name='twitter' id='twitter' component='input' type='text'
                           className='w-100 pl-2 form__field' placeholder='Enter Twitter profile link'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='instagram'>Enter Instagram profile link</Label>
                    <Field name='instagram' id='instagram' component='input' type='text'
                           className='w-100 pl-2 form__field' placeholder='Enter Instagram profile link'/>
                </div>
                <button type='submit' className='form__button my-4'>Update</button>{' '}
                <button type='button' onClick={toggleDataModal}>Cancel</button>
            </form>
        )
    }
}

UpdateProfileForm = reduxForm({form: 'updateProfileForm'})(UpdateProfileForm);
export default UpdateProfileForm;