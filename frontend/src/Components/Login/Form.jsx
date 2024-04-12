import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const LOGIN_ENDPOINT = `${BACKEND_URL}/login`;

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
        username: answers['username'],
        password: answers['password']
      });
      alert('Registered successfully!');
    } catch (error) {
      alert('An error occurred while registering.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div key={field.fld_nm}>
          {field.instructions ? (
            <p>{field.question}</p>
          ) : (
            <>
              <label htmlFor={field.fld_nm}>{field.question}</label>
              {field.param_type === 'date' ? (
                <input
                  id={field.fld_nm}
                  type="date"
                  value={answers[field.fld_nm]}
                  onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                />
              ) : field.param_type === 'password' ? (
                <input
                  id={field.fld_nm}
                  type="password"
                  value={answers[field.fld_nm]}
                  onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                />
              ) : (
                <input
                  id={field.fld_nm}
                  type="text"
                  value={answers[field.fld_nm]}
                  onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                />
              )}
            </>
          )}
        </div>
      ))}
      <button type="submit">Sign Up</button>
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