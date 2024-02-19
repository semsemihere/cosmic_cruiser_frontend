import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddUserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');

  const changeName = (event) => { setName(event.target.value); };
  const changeEmail = (event) => { setEmail(event.target.value); };

  const addUser = () => {
    
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
      <button type="submit" onClick={addUser}>Submit</button>
    </form>
  );

}

function Users() {
  const [error, setError] = useState("");
  const[users, setUsers] = useState([]);

  useEffect(
    () => {
      axios.get(USERS_ENDPOINT)
        // successfully connected
        .then((response) => {
          const usersObject = response.data.Data;
          const keys = Object.keys(usersObject);
          const usersArray = keys.map((key) => usersObject[key]);
          setUsers(usersArray);
        }

        )
        // failed connection
        .catch(() => { setError("Something went wrong"); });
    },
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        All Users
      </h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <AddUserForm />

      {users.map((users) => (
        <div className="users-container">
          <h2>{users.username}</h2>
          <p>Email: {users.email} </p>
        </div>
      ))

      }
      
    </div>
  )

}

export default Users;