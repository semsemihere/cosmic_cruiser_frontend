import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const CATEGORIES_ENDPOINT = `${BACKEND_URL}/categories`;

function Categories() {
  const [error, setError] = useState("");
  const[categories, setCategories] = useState([]);

  useEffect(
    () => {
      axios.get(CATEGORIES_ENDPOINT)
        // successfully connected
        .then((response) => {
          const categoriesObject = response.data.Data;
          const keys = Object.keys(categoriesObject);
          const categoriesArray = keys.map((key) => categoriesObject[key]);
          setCategories(categoriesArray);
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
        All Categories
      </h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      {categories.map((categories) => (
        <div className="categories-container">
          <h2>{categories.name}</h2>
          <p>Sections: {categories.numSections} </p>
        </div>
      ))

      }
      
    </div>
  )

}

export default Categories;