import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const CATEGORIES_ENDPOINT = `${BACKEND_URL}/categories`;

function AddCategoryForm({ setError, fetchCategories }) {
  const [name, setName] = useState('');
  const [categoryID, setID] = useState('');
  const [numSections, setNumberOfSections] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeID = (event) => { setID(event.target.value); };
  const changeNumberOfSections = (event) => { setNumberOfSections(event.target.value); };

  const addCategory = (event) => {
    event.preventDefault();
    axios.post(CATEGORIES_ENDPOINT, { name: name, categoryID: categoryID, numSections: numSections })
    .then(() => {  // if successful
      setError('');
      fetchCategories();
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

      <label htmlFor='categoryID'>
        Category ID
      </label>
      <input required type="text" id="categoryID" value={categoryID} onChange={changeID}>
      </input>

      <label htmlFor='numSections'>
        Number of Sections
      </label>
      <input required type="number" id="numSections" value={numSections} onChange={changeNumberOfSections}>
      </input>

      {/* <button type="button" onClick={cancel}>Cancel</button> */}
      <button type="submit" onClick={addCategory}>Add Category</button>
    </form>
  );

}

function Categories() {
  const [error, setError] = useState("");
  const[categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios.get(CATEGORIES_ENDPOINT)
        // successfully connected
        .then((response) => {
          const categoriesObject = response.data.Data;
          const keys = Object.keys(categoriesObject);
          const categoriesArray = keys.map((key) => categoriesObject[key]);
          setCategories(categoriesArray);
        })
        // failed connection
        .catch(() => { setError("Something went wrong"); });
  };

  useEffect(
    fetchCategories,
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

      <AddCategoryForm setError={setError} fetchCategories={fetchCategories}/>

      {categories.map((category) => (
        <div key={category.name} className="categories-container">
          <h2>{category.name}</h2>
          <p>ID: {category.categoryID} <br></br> Sections: {category.numSections} </p>
        </div>
      ))

      }
      
    </div>
  )

}

export default Categories;