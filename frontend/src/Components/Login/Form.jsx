import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const LOGIN_ENDPOINT = `${BACKEND_URL}/login`;

// const FORM = [
//   { fieldName: 'role', question: 'Role', param_type: 'text', placeholder: 'Role'},
//   { fieldName: 'username', question: 'Username', param_type: 'text', placeholder: 'Username'},
//   { fieldName: 'password', question: 'Password', param_type: 'password', placeholder: 'Password'}
// ]

const FORM = []

function fieldsToAnswers(fields) {
  const answers = {};
  fields.forEach(({ fieldName }) => { answers[fieldName] = ''; });
  console.log(answers);
  return answers;
}

// function Form({ fields }) {
const Form =({ fields }) => {
  const [answers, setAnswers] = useState(fieldsToAnswers(fields));
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    async function fetchForm() {
      try {
        const response = await axios.get(LOGIN_ENDPOINT);
        console.log(response);
        setFormFields(response.data.login_form);
        setAnswers(response.data.login_form.reduce((acc, curr) => {
          acc[curr.fld_nm] = '';
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    }
    fetchForm();
  }, []);

  const answerQuestion = (fieldName, value) => {
    answers[fieldName] = value;
    setAnswers({ ...answers });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(answers);
    try {
      await axios.post(LOGIN_ENDPOINT, {
        role: answers['role'],
        username: answers['username'],
        password: answers['password']
      });
      // alert('Login successful!');
      window.location.href = `http://localhost:3000/home`
    } catch (error) {
      alert('Invalid username or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {formFields.map((field) => (
        <div key={field.fld_nm} className="form-field">
          {field.instructions ? (
            <p className='form-instruction'>{field.question}</p>
          ) : (
            <>
              <label className='form_label' htmlFor={field.fld_nm}>{field.question}</label>
              {field.param_type === 'dropdown' ? (
                <select className='form_input'
                id={field.fld_nm}
                value={answers[field.fld_nm]}
                onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                >
                  {field.choices.map((option) =>(
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.param_type === 'password' ? (
                <input className='form_input'
                  id={field.fld_nm}
                  type="password"
                  value={answers[field.fld_nm]}
                  onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                  placeholder={field.placeholder}
                />
              ) : (
                <input className='form_input'
                  id={field.fld_nm}
                  type="text"
                  value={answers[field.fld_nm]}
                  onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                  placeholder={field.placeholder}
                />
              )}
            </>
          )}
        </div>
      ))}
      <button type="submit">Log In</button>
    </form>
  );
}

Form.propTypes = {
  fields: propTypes.arrayOf(propTypes.shape({
    fld_nm: propTypes.string,
    question: propTypes.string,
    param_type: propTypes.string,
    instructions: propTypes.bool
  })).isRequired,
};

export default function FormWrapper() {
  return <Form fields={FORM} />;
}
