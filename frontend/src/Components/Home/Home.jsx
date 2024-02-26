import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const HOME_ENDPOINT = `${BACKEND_URL}/home`;

function Home() {
  const [error, setError] = useState("");
  // const[users, setUsers] = useState([]);

  // useEffect(
  //   () => {
  //     axios.get(HOME_ENDPOINT)
  //       // successfully connected
  //       .then((response) => {
  //         const homeObject = response.data.Data;
  //         const keys = Object.keys(homeObject);
  //         const homeArray = keys.map((key) => homeObject[key]);
  //         setUsers(homeArray);
  //       }

  //       )
  //       // failed connection
  //       .catch(() => { setError("Something went wrong"); });
  //   },
  //   [],
  // );

  return (
    <div className="wrapper">
      <h1>
        Welcome to Jack of All Trades!
      </h1>
      <p>
        Jack of a Trades is a learning platform that is dedictated to helping people become more holistic people by expanding thier breadth of knowledge
      </p>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}      
    </div>
  )

}

export default Home;