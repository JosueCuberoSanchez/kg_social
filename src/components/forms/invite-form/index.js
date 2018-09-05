/**
 * InviteForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label, Input } from 'reactstrap';

//Redux
import { Field, FieldArray, reduxForm } from 'redux-form'

// Styles
import '../form.scss';

let InviteForm = (props)  => {

    const { handleSubmit, toggle } = props;

    const renderInvites = ({ fields, meta: { error, submitFailed } }) => (
        <ul className='list-unstyled'>
            <li>
                <button type="button" onClick={() => fields.push({})}>Add invite</button>
                {submitFailed && error && <span>{error}</span>}
            </li>
            {fields.map((member, index) => (
                <li key={index}>
                    <div className='d-flex justify-content-between mt-3'>
                        <p>Invite #{index + 1}</p>
                        <button type="button" title="Remove Invite" onClick={() => fields.remove(index)}>Remove invite</button>
                    </div>
                    <Field name={`${member}.email`} type="text" component={renderField} label="Email" />
                </li>
            ))}
        </ul>
    );

    const renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <Label>{label}</Label>
            <div>
                <Input {...input} type={type} placeholder={label} />
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