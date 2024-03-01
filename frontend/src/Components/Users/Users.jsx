import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddUserForm({setError, fetchUsers}) {
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

  // FROM BACKEND:
  // new_user = users.create_user(
  //   email, username,
  //   password, firstname,
  //   lastname, phonenumber
  // )
  // INFO TO CREATE USER: email, username, password, firstname, lastname, phonenumber

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


  // INFO TO CREATE USER: email, username, password, firstname, lastname, phonenumber
  return (
    <form>

      <label htmlFor='email'>
        Email
      </label>
      <input type="text" id="name" value={email} onChange={changeEmail}>
      </input>

      <label htmlFor='username'>
        Username
      </label>
      <input type="text" id="username" value={username} onChange={changeUsername}>
      </input>

      <label htmlFor='password'>
        Password
      </label>
      <input type="text" id="password" value={password} onChange={changePassword}>
      </input>

      <label htmlFor='firstname'>
        First Name
      </label>
      <input type="text" id="firstname" value={firstname} onChange={changeFirstName}>
      </input>

      <label htmlFor='lastname'>
        Last Name
      </label>
      <input type="text" id="lastname" value={lastname} onChange={changeLastName}>
      </input>

      <label htmlFor='phonenumber'>
        Phone Number
      </label>
      <input type="number" id="phonenumber" value={phonenumber} onChange={changePhone}>
      </input>

      <label htmlFor='role'>
        Role
      </label>
      <input type="text" id="role" value={role} onChange={changeRole}>
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