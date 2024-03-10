import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition`;
const DELETE_NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition/delete`;


function AddNutritionForm({ 
    visible,
    cancel,
    fetchNutritionSections,
    setError
}) {
    const [name, setName] = useState('');
    const [sectionID, setSectionID] = useState('');
    const [nutritionContent, setNutritionContent] = useState('');

    const changeName = (event) => { setName(event.target.value); };
    const changeSectionID = (event) => { setSectionID(event.target.value); };
    const changeNutritionContent = (event) => { setNutritionContent(event.target.value); };

    const addNutrition = (event) => {
        event.preventDefault();
        axios.post(NUTRITION_ENDPOINT, { name: name, sectionID: sectionID, nutritionContent: nutritionContent })
        .then(() => {  // if successful
          setError('');
          fetchNutritionSections();
        })
        .catch((error) => { setError(error.response.data.message); });
    };

    if (!visible) return null;

    return (
        <form>
    
          <label htmlFor='name'>
            Name
          </label>
          <input required type="text" id="name" value={name} onChange={changeName} />
    
          <label htmlFor='sectionID'>
            Section ID
          </label>
          <input required type="text" id="sectionID" value={sectionID} onChange={changeSectionID} />
    
          <label htmlFor='nutritionContent'>
            Nutrition Content
          </label>
          <input required type="text" id="nutritionContent" value={nutritionContent} onChange={changeNutritionContent} />
    
          <button type="button" onClick={cancel}>Cancel</button>
          <button type="submit" onClick={addNutrition}>Add Nutrition</button>
        </form>
      );
}

function DeleteNutritionForm({
    visible,
    cancel,
    fetchNutritionSections,
    setError,
  }) {

    const [sectionID, setSectionID] = useState('');
    const changeID = (event) => { setSectionID(event.target.value); };

    const deleteNutrition = () => {
        axios.delete(`${DELETE_NUTRITION_ENDPOINTs}/${sectionID}`)
        .then(() => {  // if successful
            setError('');
            fetchNutritionSections();
        })
        .catch((error) => { setError(error.response.data.message);});
    }

    if (!visible) return null;
    
    return (
        <form>
    
          <label htmlFor='sectionID'>
            Section ID
          </label>
          <input required type="text" id="sectionID" value={sectionID} onChange={changeSectionID} />
    
          <button type="button" onClick={cancel}>Cancel</button>
          <button type="submit" onClick={deleteNutrition}>Delete Nutrition Section</button>
        </form>
    );

}

AddNutritionForm.propTypes = {
    visible: propTypes.bool.isRequired,
    cancel: propTypes.func.isRequired,
    fetchNutritionSections: propTypes.func.isRequired,
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
  

function Nutrition ({ nutrition }) {
    const { name, sectionID, nutritionContent} = nutrition;
    return (
      <div className='nutrition-container'>
  
        <Link to={`/categories/nutrition/${name}`}>
          <h2>{name}</h2>
        </Link>
              
        <p>
          ID: {sectionID}
          <br></br>
          Content: {nutritionContent}
        </p>
  
      </div>
    );
  
}


Nutrition.propTypes = {
    nutrition: propTypes.shape({
      name: propTypes.string.isRequired,
      sectionID: propTypes.string.isRequired,
      nutritionContent: propTypes.string.isRequired,
    }).isRequired,
};

function nutritionsObjectToArray({ Data }) {
    const keys = Object.keys(Data);
    const nutritions = keys.map((key) => Data[key]);
    return nutritions;
}
  

function Nutritions() {
    const [error, setError] = useState("");
    const[nutritions, setNutritions] = useState([]);
    const [addingNutrition, setAddingNutrition] = useState(false);
    const [deletingNutrition, setDeletingNutrition] = useState(false);

    const fetchNutritionSections = () => {
      axios.get(NUTRITION_ENDPOINT)
          // successfully connected
          .then(({ data }) => setNutritions(nutritionsObjectToArray(data)))
          .catch(() => setError('There was a problem getting the list of nutritions'));

    };
  
    const showAddNutritionForm = () => { setAddingNutrition(true); };
    const hideAddNutritionForm = () => { setAddingNutrition(false); };
    const showDeleteNutritionForm = () => { setDeletingNutrition(true); };
    const hideDeleteNutritionForm = () => { setDeletingNutrition(false); };
  
    useEffect(fetchNutritionSections,[]);
  
    return (
      <div className="wrapper">
        <header>
  
          <h1>
            Nutrition Sections
          </h1>
  
          <button type='button' onClick={showAddNutritionForm}>
            Add Nutrition Section
          </button>
          
          <button type='button' onClick={showDeleteNutritionForm}>
            Delete Nutrition Section
          </button>
  
        </header>
  
        <AddNutritionForm
          visible={addingNutrition}
          cancel={hideAddNutritionForm}
          fetchNutritionSections={fetchNutritionSections}
          setError={setError}
        />
  
        <DeleteNutritionForm
          visible={deletingNutrition}
          cancel={hideDeleteNutritionForm}
          fetchNutritionSections={fetchNutritionSections}
          setError={setError}
        />
  
        {error && <ErrorMessage message={error} /> }

  
        {nutritions.map((nutrition) => <Nutrition key={nutrition.name} nutrition={nutrition} />)}

        
      </div>
    );
  
  }
  
  export default Nutrition;