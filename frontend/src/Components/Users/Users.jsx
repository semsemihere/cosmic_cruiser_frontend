import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddUserForm({setError, fetchUsers}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeName = (event) => { setName(event.target.value); };
  const changeEmail = (event) => { setEmail(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };

  const addUser = (event) => {
    event.preventDefault();
    axios.post(USERS_ENDPOINT, { name: name, email: email, password: password })
    .then(() => {  // if successful
      setError('');
      fetchUsers();
    })
    .catch((error) => { setError(error.response.data.message); });
  };


  return (
    <form>

      <label htmlFor='name'>
        Name
      </label>
      <input type="text" id="name" value={name} onChange={changeName}>
      </input>

      <label htmlFor='email'>
        Email
      </label>
      <input type="text" id="name" value={email} onChange={changeEmail}>
      </input>

      <label htmlFor='email'>
        Password
      </label>
      <input type="text" id="name" value={password} onChange={changePassword}>
      </input>
      <button type="submit" onClick={addUser}>Submit</button>
    </form>
  );

}

function Users() {
  const [error, setError] = useState("");
  const[users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get(USERS_ENDPOINT)
        // successfully connected
        .then((response) => {
          const usersObject = response.data.Data;
          const keys = Object.keys(usersObject);
          const usersArray = keys.map((key) => usersObject[key]);
          setUsers(usersArray);
        })
        // failed connection
        .catch(() => { setError("Something went wrong"); });
  };

  useEffect(
    fetchUsers,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        Add User
      </h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <AddUserForm setError={setError} fetchCategories={fetchUsers}/>

      {users.map((users) => (
        <div key={users.username} className="users-container">
          <h2>{users.username}</h2>
          <p>Email: {users.email} </p>
        </div>
      ))

      }
      
    </div>
  )

}

export default Users;