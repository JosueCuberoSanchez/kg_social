/**
 * SignUpForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import '../form.scss';

let ResetPasswordForm = (props)  => {

    const { handleSubmit, passwordsMatch, validPassword } = props;

    return (
        <form onSubmit={handleSubmit} className='mt-3 form'>
            {
                passwordsMatch
                ? validPassword
                    ? <div className='mt-3'>
                        <Label htmlFor='password'>Enter password</Label>
                        <Field name='password' id='password' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field' placeholder='Enter password'/>
                    </div>
                    : <div className='mt-3'>
                        <Label htmlFor='password'>Enter password</Label>
                        <Field name='password' id='password' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Enter password'/>
                    </div>
                : <div className='mt-3'>
                        <Label htmlFor='password'>Enter password</Label>
                        <Field name='password' id='password' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Enter password'/>
                    </div>
            }
            {
                passwordsMatch
                    ? validPassword
                        ? <div className='mt-3'>
                                <Label htmlFor='repassword'>Re enter password</Label>
                                <Field name='repassword' id='repassword' component='input' type='password'
                                       required={true} className='w-100 pl-2 form__field' placeholder='Re enter password'/>
                            </div>
                        : <div className='mt-3'>
                        <Label htmlFor='repassword'>Re enter password</Label>
                        <Field name='repassword' id='repassword' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Re enter password'/>
                        </div>
                : <div className='mt-3'>
                        <Label htmlFor='repassword'>Re enter password</Label>
                        <Field name='repassword' id='repassword' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Re enter password'/>
                    </div>
            }
            {
                !passwordsMatch
                    ? <p className='form__warning mt-3'>Passwords don't match!</p>
                    : null
            }
            {
                !validPassword
                    ? <p className='form__warning mt-3'>Password is invalid, it should include at least 8 characters, one letter and one number.</p>
                    : null
            }
            <button type='submit' className='form__button my-4'>Reset password</button>
        </form>
    );
};

ResetPasswordForm = reduxForm({form: 'resetPasswordForm'})(ResetPasswordForm);
export default ResetPasswordForm;