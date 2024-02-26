import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const HOME_ENDPOINT = `${BACKEND_URL}/home`;

function Home() {
  const [error, setError] = useState("");
  const[users, setUsers] = useState([]);

  useEffect(
    () => {
      axios.get(HOME_ENDPOINT)
        // successfully connected
        .then((response) => {
          const homeObject = response.data.Data;
          const keys = Object.keys(homeObject);
          const homeArray = keys.map((key) => homeObject[key]);
          setUsers(homeArray);
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
        Welcome to Jack of All Trades!
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

export default Home;