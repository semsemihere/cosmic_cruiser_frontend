import React, { useEffect, useState} from 'react';
import axios from 'axios';
import propTypes from 'prop-types'
import Navbar from '../Navbar';
import { BACKEND_URL } from '../../constants';
// import { Link } from 'react-router-dom';


const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddUserForm({
  visible,
  cancel,
  fetchUsers,
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
      fetchUsers();
    })
    .catch((error) => { setError(error.response.data.message); });
  };

  if (!visible) return null;


  // INFO TO CREATE USER: email, username, password, firstname, lastname, phonenumber
  
  return (
    <form>
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
        <input type="text" id="password" value={password} onChange={changePassword}>
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
  fetchUsers: propTypes.func.isRequired,
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

function usersObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const users = keys.map((key) => Data[key]);
  // console.log("USERS: ", users)
  return users;
}

// Email and Password is used to log in 
function LoginUserForm({
  visible,
  cancel,
  fetchUsers,
  setError
})
{
  const [email, getEmail] = useState('');
  const [password, getPassword] = useState('');

  const checkEmail = (event) => { getEmail(event.target.value);};
  const checkPassword = (event) => { getPassword(event.target.value);};


  const checkUser = (event) => {
    event.preventDefault();
    axios.post(USERS_ENDPOINT, { email: email, password: password })
    .then(() => {  // if successful
      setError('');
      fetchUsers();
    })
    .catch((error) => { setError(error.response.data.message); });
  };

  if (!visible) return null;
  
  return (
    <form>
      <div class="column">
        <label htmlFor='email'>
          Email
        </label>
        <input type="email" id="name" value={email} onChange={checkEmail} pattern=".+@example\.com" >
        </input>

        <label htmlFor='password'>
          Password
        </label>
        <input type="text" id="password" value={password} onChange={checkPassword}>
        </input>

        <button type="button" onClick={cancel}>Cancel</button>
        <button type="submit" onClick={checkUser}>Sign In</button>
      </div>
    </form>
  )
}


LoginUserForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchUsers: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
}


function Users() {
  const [error, setError] = useState("");
  const[users, setUsers] = useState([]);
  const [addingUser, setAddingUser] = useState(false);
  const [loginUser, setLoginUser] = useState(false);

  const fetchUsers = () => {
    axios.get(USERS_ENDPOINT)
        .then(({ data }) => setUsers(usersObjectToArray(data)))
        .catch(() => setError('There was a problem getting the list of users'));
  };

  const showAddUserForm = () => {
    setAddingUser(true);
    setLoginUser(false);
  };
  const showLoginUserForm = () => {
    setLoginUser(true);
    setAddingUser(false);
  }

  const hideAddUserForm = () => { setAddingUser(false); };
  const hideLoginUserForm = () => { setLoginUser(false); }

  useEffect(fetchUsers,[]);

  return (
    <div>
      <Navbar/>
      <div className="wrapper">
        <header>
          <h1>
            Users
          </h1>
          <button type='button' onClick={showAddUserForm}>
              Sign Up
          </button>
          {/* <button type='button' onClick={showLoginUserForm}>
              Sign In
          </button> */}
        </header>

        <AddUserForm
          visible={addingUser}
          cancel={hideAddUserForm}
          fetchUsers={fetchUsers}
          setError={setError}
        />

        <LoginUserForm
          visible={loginUser}
          cancel={hideLoginUserForm}
          fetchUsers={fetchUsers}
          setError={setError}
        />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {users.map((user) => <User key={user.username} user={user} />)}
        
      </div>
    </div>
  )

}



export default Users;