import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const EMS_ENDPOINT = `${BACKEND_URL}/categories/emergency_medical_services`;

function AddEmsSectionForm({ setError, fetchEmsSections }) {
  const [name, setName] = useState('')
  const [sectionID, setSectionID] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setSectionID(event.target.value); };

  const addEmsSection = (event) => {
    event.preventDefault();
    axios.post(EMS_ENDPOINT, { name: name, sectionID: sectionID })
    .then(fetchEmsSections)  // if successful
    .catch(() => { setError('There was a problem adding an EMS section!'); });
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
      <button type="submit" onClick={addEmsSection}>Add EMS Section</button>
    </form>
  );

}

function EMS() {
  const [error, setError] = useState("");
  const[ems, setEmsSections] = useState([]);

  const fetchEmsSections = () => {
    axios.get(EMS_ENDPOINT)
        // successfully connected
        .then((response) => {
          const emsObject = response.data.Data;
          const keys = Object.keys(emsObject);
          const emsArray = keys.map((key) => emsObject[key]);
          setEmsSections(emsArray);
        })
        // failed connection
        .catch(() => { setError("Something went wrong"); });
  };

  useEffect(
    fetchEmsSections,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        All EMS Sections
      </h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <AddEmsSectionForm setError={setError} />

      {ems.map((ems) => (
        <div className="ems-container">
          <h2>{ems.name}</h2>
          <p>Section ID: {ems.sectionID} </p>
        </div>
      ))

      }
      
    </div>
  )

}

export default EMS;