// import React, { useEffect, useState } from 'react';
// import propTypes from 'prop-types'
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import { BACKEND_URL } from '../../constants';

// const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;


// function Finances() {
//     return <div>Loading...</div>;
// }
  
// export default Finances;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

// const FINANCES_ENDPOINT = `${BACKEND_URL}/categories`;
const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;

function AddFinanceSectionForm({ setError, fetchFinanceSections }) {
  const [name, setName] = useState('')
  const [sectionID, setSectionID] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setSectionID(event.target.value); };

  const addFinanceSection = (event) => {
    event.preventDefault();
    axios.post(FINANCES_ENDPOINT, { name: name, sectionID: sectionID })
    .then(fetchFinanceSections)  // if successful
    .catch(() => { setError('There was a problem adding a finance section!'); });
  };


  return (
    <form>

      <label htmlFor='name'>
        Name
      </label>
      <input required type="text" id="name" value={name} onChange={changeName}>
      </input>

      <label htmlFor='number'>
        Section ID
      </label>
      <input required type="number" id="number" value={sectionID} onChange={changeNumber}>
      </input>

      {/* <button type="button" onClick={cancel}>Cancel</button> */}
      <button type="submit" onClick={addFinanceSection}>Add Finance Section</button>
    </form>
  );

}

function Finances() {
  const [error, setError] = useState("");
  const[finances, setFinanceSections] = useState([]);

  const fetchFinanceSections = () => {
    axios.get(FINANCES_ENDPOINT)
        // successfully connected
        .then((response) => {
          const financesObject = response.data.Data;
          const keys = Object.keys(financesObject);
          const financesArray = keys.map((key) => financesObject[key]);
          setFinanceSections(financesArray);
        })
        // failed connection
        .catch(() => { setError("Something went wrong"); });
  };

  useEffect(
    fetchFinanceSections,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        All Finance Sections
      </h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <AddFinanceSectionForm setError={setError} />

      {finances.map((finances) => (
        <div className="finances-container">
          <h2>{finances.name}</h2>
          <p>Section ID: {finances.sectionID} </p>
        </div>
      ))

      }
      
    </div>
  )

}

export default Finances;