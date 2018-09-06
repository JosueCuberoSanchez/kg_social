/**
 * InviteForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label, Input } from 'reactstrap';

//Redux
import { Field, FieldArray, reduxForm } from 'redux-form'

// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import '../form.scss';

let InviteForm = (props)  => {

    const { handleSubmit, toggle } = props;

    const renderInvites = ({ fields, meta: { error, submitFailed } }) => (
        <ul className='list-unstyled'>
            {fields.map((member, index) => (
                <li key={index}>
                    <div className='d-flex justify-content-between'>
                        <p className='mb-2'>Invite #{index + 1}</p>
                        <FontAwesomeIcon icon='minus' alt='Add one invite field' title="Remove Invite" className='form__icon'
                                         onClick={() => fields.remove(index)}>Remove invite</FontAwesomeIcon>
                    </div>
                    <Field name={`${member}.email`} type="text" component={renderField} label="Email" />
                </li>
            ))}
            <li>
                <FontAwesomeIcon icon='plus' alt='Add one invite field' className='form__icon'
                                 onClick={() => fields.push({})}>Add invite</FontAwesomeIcon>
                {submitFailed && error && <span>{error}</span>}
            </li>
        </ul>
    );

    const renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <Label>{label}</Label>
            <div>
                <Input {...input} type={type} placeholder={label} className='mb-3'/>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className='mt-3 form'>
            <div className='mb-4'>
                <FieldArray name="invites" component={renderInvites} />
            </div>
            <button type='submit' className='form__button' onClick={toggle}>Invite people!</button>{' '}
            <button type='button' className='form__button' onClick={toggle}>Cancel</button>
        </form>
    );

};

InviteForm = reduxForm({form: 'inviteForm'})(InviteForm);
export default InviteForm;