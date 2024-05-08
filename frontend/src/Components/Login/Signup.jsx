import React, { useState} from 'react';
import axios from 'axios';
import propTypes from 'prop-types'
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddUserForm({
  visible,
  cancel,
  setError
}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [phonenumber, setPhone] = useState(0);
  const [role, setRole] = useState('');
  

  const changeEmail = (event) => { setEmail(event.target.value); };
  const changeUsername = (event) => { setUsername(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };
  const changeFirstName = (event) => { setFirstName(event.target.value); };
  const changeLastName = (event) => { setLastName(event.target.value); };
  const changePhone = (event) => { setPhone(event.target.value); };
  const changeRole = (event) => { setRole(event.target.value); };

  const addUser = (event) => {
    event.preventDefault();
    axios.post(USERS_ENDPOINT, { email: email, username: username, password: password, 
      firstname: firstname, lastname: lastname, phonenumber: phonenumber, role: role })
    .then(() => {  // if successful
      setError('');
      alert('Successfully Added!');
      setEmail('');
      setUsername('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setPhone(0); // Assuming phone number should reset to 0 or another suitable default
      setRole('');
    })
    .catch((error) => { 
      setError(error.response.data.message); 
    });
  };

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(USERS_ENDPOINT, { email: email, username: username, password: password, 
        firstname: firstname, lastname: lastname, phonenumber: phonenumber, role: role });
      
      window.location.href = `http://localhost:3000/home`
    } catch (error) {
      alert('Invalid username or password.');
    }
  };
  


  return (
    <form onSubmit={handleSubmit}>
      <div class="column">
        <label htmlFor='email'>
          Email
        </label>
        <input type="email" id="name" value={email} onChange={changeEmail} pattern=".+@example\.com" >
        </input>

        <label htmlFor='firstname'>
          First Name
        </label>
        <input type="text" id="firstname" value={firstname} onChange={changeFirstName}>
        </input>

        <label htmlFor='password'>
          Password
        </label>
        <input type="password" id="password" value={password} onChange={changePassword}>
        </input>

        <label htmlFor='role'>
          Role
        </label>
        <input type="text" id="role" value={role} onChange={changeRole}>
        </input>
      </div>

      <div class="column">
        <label htmlFor='username'>
          Username
        </label>
        <input type="text" id="username" value={username} onChange={changeUsername}>
        </input>

        <label htmlFor='lastname'>
          Last Name
        </label>
        <input type="text" id="lastname" value={lastname} onChange={changeLastName}>
        </input>

        <label htmlFor='phonenumber'>
          Phone Number (Format: 123-456-7890)
        </label>
        <input type="tel" id="phonenumber" value={phonenumber} name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={changePhone} required >
        </input>

        <button type="button" onClick={cancel}>Cancel</button>
        <button type="submit" onClick={addUser}>Sign Up</button>
      </div>
    </form>
  );

}

AddUserForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
}

function ErrorMessage({ message }) {
  return (
    <div className='error-message'>
      {message}
    </div>
  );
}
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

function User ({ user }) {
  const { email, username} = user;
  return (
    <div className='users-container'>
      <h2>{username}</h2>
      {/* <Link to={`/users/${username}`}>
      </Link> */}

      {/* <h2>{username}</h2> */}
      <p>
        email: {email}
      </p>
    </div>
  );
}

User.propTypes = {
  user: propTypes.shape({
    email: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    firstname: propTypes.string.isRequired,
    lastname: propTypes.string.isRequired,
    phonenumber: propTypes.string.isRequired,
  }).isRequired,
};



function Signup() {
  const [error, setError] = useState("");
  const [addingUser, setAddingUser] = useState(false);
  const showAddUserForm = () => {
    setAddingUser(true);
  };

  const hideAddUserForm = () => { setAddingUser(false); };

  return (
    <div>
      <div>
        <button type='button' onClick={showAddUserForm}>
            Sign Up
        </button>


        <AddUserForm
          visible={addingUser}
          cancel={hideAddUserForm}
          setError={setError}
        />
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
      </div>
    </div>
  )

}



export default Signup;