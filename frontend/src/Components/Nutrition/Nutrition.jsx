// import React, { useEffect, useState } from 'react';
// import propTypes from 'prop-types'
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import { BACKEND_URL } from '../../constants';

// const NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition`;
// const DELETE_NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition/delete`;


// function Nutrition() {
//   return <div>Loading...</div>;
// }
  
// export default Nutrition;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition`;

function AddNutritionSectionForm({ setError, fetchNutritionSections }) {
  const [name, setName] = useState('')
  const [sectionID, setSectionID] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setSectionID(event.target.value); };

  const addNutritionSection = (event) => {
    event.preventDefault();
    axios.post(NUTRITION_ENDPOINT, { name: name, sectionID: sectionID })
    
    .then(() => {  // if successful
      setError('');
      fetchNutritionSections();
    })
    .catch((error) => { setError(error.response.data.message); });
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
      <button type="submit" onClick={addNutritionSection}>Add Nutrition Section</button>
    </form>
  );

}

function Nutrition() {
  const [error, setError] = useState("");
  const[nutrition, setNutritionSections] = useState([]);

  const fetchNutritionSections = () => {
    axios.get(NUTRITION_ENDPOINT)
        // successfully connected
        .then((response) => {
          if (response && response.data && response.data.Data) {
            const nutritionObject = response.data.Data;
            const keys = Object.keys(nutritionObject);
            const nutritionArray = keys.map((key) => nutritionObject[key]);
            setNutritionSections(nutritionArray);
          } else {
            setError("No data received.");
          }
        })
        // failed connection
        .catch((error) => { setError(error.message); });
  };

  useEffect(
    fetchNutritionSections,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        All Nutrition Sections
      </h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <AddNutritionSectionForm setError={setError} />

      {nutrition.map((nutrition) => (
        <div className="nutrition-container">
          <Link to={`/nutrition/${nutrition.sectionID}`}>
            <h2>{nutrition.sectionName}</h2>
          </Link>
          <p>Section ID: {nutrition.sectionID} </p>
        </div>
      ))

      }
      
    </div>
  )

}

export default Nutrition;