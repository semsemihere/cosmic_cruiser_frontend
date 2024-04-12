import React from 'react';
import FormWrapper from './Form'; 

function Login() {
  // Define a function to handle form submission
  const handleLogin = (formData) => {
    // You can handle form submission
    // sending the form data to the backend for authentication
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <FormWrapper handleSubmit={handleLogin} />
    </div>
  );
}

export default Login;
