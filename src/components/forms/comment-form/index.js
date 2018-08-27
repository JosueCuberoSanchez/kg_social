/**
 * CommentForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import '../form.scss';

let CommentForm = (props)  => {

    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit} className='mt-3 form'>
            <div className='mb-4'>
                <Label htmlFor='comment'>Comment</Label>
                <Field name='comment' component='textarea' type='text'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter comment'/>
            </div>
            <button type='submit' className='form__button'>Publish your comment!</button>
        </form>
    );

};

CommentForm = reduxForm({form: 'commentForm'})(CommentForm);
export default CommentForm;