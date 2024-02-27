import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const CATEGORIES_ENDPOINT = `${BACKEND_URL}/categories`;

function AddCategoryForm({ 
  visible,
  cancel,
  fetchCategories,
  setError
}) {
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

  if (!visible) return null;


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

      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addCategory}>Add Category</button>
    </form>
  );

}
AddCategoryForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchCategories: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
}

function ErrorMessage({ message }) {
  return (
    <div className='error-message'>
      {message}
    </div>
  );
}
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

function Category ({ category }) {
  const { name, categoryID, numSections} = category;
  return (
    <div className='categories-container'>
      <h2>{name}</h2>
      <p>
        ID: {categoryID}
        <br></br>
        Sections: {numSections}
      </p>
    </div>
  );
}
Category.propTypes = {
  category: propTypes.shape({
    name: propTypes.string.isRequired,
    categoryID: propTypes.string.isRequired,
    numSections: propTypes.number.isRequired,
  }).isRequired,
};

function categoriesObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const categories = keys.map((key) => Data[key]);
  return categories;
}

function Categories() {
  const [error, setError] = useState("");
  const[categories, setCategories] = useState([]);
  const [addingCategory, setAddingCategory] = useState(false);

  const fetchCategories = () => {
    axios.get(CATEGORIES_ENDPOINT)
        // successfully connected
        .then(({ data }) => setCategories(categoriesObjectToArray(data)))
        .catch(() => setError('There was a problem getting the list of categories'));
        // .then((response) => {
        //   const categoriesObject = response.data.Data;
        //   const keys = Object.keys(categoriesObject);
        //   const categoriesArray = keys.map((key) => categoriesObject[key]);
        //   setCategories(categoriesArray);
        // })
        // // failed connection
        // .catch(() => { setError("Something went wrong"); });
  };

  const showAddCategoryForm = () => { setAddingCategory(true); };
  const hideAddCategoryForm = () => { setAddingCategory(false); };


  useEffect(fetchCategories,[]);

  return (
    <div className="wrapper">
      <header>
        <h1>
          Add Category
        </h1>
        <button type='button' onClick={showAddCategoryForm}>
          Add a Category
        </button>
      </header>
      <AddCategoryForm
        visible={addingCategory}
        cancel={hideAddCategoryForm}
        fetchCategories={fetchCategories}
        setError={setError}
      />
      {error && <ErrorMessage message={error} /> }
      {/* (
        <div className="error-message">
          {error}
        </div>
      )} */}
      {categories.map((category) => <Category key={category.name} category={category} />)}

      {/* <AddCategoryForm setError={setError} fetchCategories={fetchCategories}/> */}

      {/* {categories.map((category) => (
        <div key={category.name} className="categories-container">
          <h2>{category.name}</h2>
          <p>ID: {category.categoryID} <br></br> Sections: {category.numSections} </p>
        </div>
      ))

      } */}
      
    </div>
  );

}

export default Categories;