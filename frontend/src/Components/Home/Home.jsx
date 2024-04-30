// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AddCategoryForm from '../Categories/Categories'

// import { BACKEND_URL } from '../../constants';

// const HOME_ENDPOINT = `${BACKEND_URL}`;
import Navbar from '../Navbar';

function Home() {
  // const [error, setError] = useState("");
  
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
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>
          Welcome to Jack of All Trades!
        </h1>
        <p>
          Jack of a Trades is a learning platform that is dedictated to helping people become more holistic people by expanding thier breadth of knowledge
          Our categories range from everything from medical advice to finance tips.<br></br>
          Our goal is to have you the user help us create a community of learning and help broaden our service to topics that you love!
        </p>
          
      </div>

    </div>
    
  )

}

export default Home;