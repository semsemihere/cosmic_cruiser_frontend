import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';
import Nutrition from '.';

const NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition`;
const DELETE_NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition/delete`;

function AddNutritionForm({ 
  visible,
  cancel,
  fetchSections,
  setError
}) {
  const [name, setName] = useState('');
  const [sectionID, setID] = useState('');
  const [nutritionContent, setContent] = useState('');

  const changeName = (event) => { setName(event.target.value); };
  const changeID = (event) => { setID(event.target.value); };
  const changeContent = (event) => { setContent(event.target.value); };

  const addSection = (event) => {
    event.preventDefault();
    axios.post(NUTRITION_ENDPOINT, { name: name, sectionID: sectionID, nutritionContent: nutritionContent })
    .then(() => {  // if successful
      setError('');
      fetchSections();
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
      
      <input required type="text" id="sectionID" value={sectionID} onChange={changeID} />

      <label htmlFor='nutritionContent'>
        Content
      </label>

      <input required type="text" id="nutritionContent" value={nutritionContent} onChange={changeContent} />

      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addSection}>Add Section</button>
    </form>
  );

}

function DeleteNutritionForm({
  visible,
  cancel,
  fetchSections,
  setError,
}) {
  const [sectionID, setID] = useState('');

  const changeID = (event) => { setID(event.target.value); };

  const deleteSection = () => {
    // event.preventDefault();
    axios.delete(`${DELETE_NUTRITION_ENDPOINT}/${sectionID}`)
    .then(() => {  // if successful
      setError('');
      fetchSections();
    })
    .catch((error) => { setError(error.response.data.message);});
  }

  if (!visible) return null;

  return (
    <form>

      <label htmlFor='sectionID'>
        Section ID
      </label>
      
      <input required type="text" id="sectionID" value={sectionID} onChange={changeID} />

      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={deleteSection}>Delete Section</button>
    </form>
  );
}

AddNutritionForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchSections: propTypes.func.isRequired,
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

function Section ({ section }) {
  const { name, sectionID, nutritionContent} = section;
  
  return (
    <div className='sections-container'>

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
Section.propTypes = {
  section: propTypes.shape({
    name: propTypes.string.isRequired,
    sectionID: propTypes.string.isRequired,
    nutritionContent: propTypes.string.isRequired,
  }).isRequired,
};

function sectionsObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const sections = keys.map((key) => Data[key]);
  return sections;
}

function Sections() {
  const [error, setError] = useState("");
  const[sections, setSections] = useState([]);
  const [addingSection, setAddingSection] = useState(false);
  const [deletingSection, setDeletingSections] = useState(false);

  const fetchSections = () => {
    axios.get(NUTRITION_ENDPOINT)
        // successfully connected
        .then(({ data }) => setSections(sectionsObjectToArray(data)))
        .catch(() => setError('There was a problem getting the list of sections'));
  };

  const showAddNutritionForm = () => { setAddingSection(true); };
  const hideAddNutritionForm = () => { setAddingSection(false); };
  const showDeleteNutritionForm = () => { setDeletingSections(true); };
  const hideDeleteNutritionForm = () => { setDeletingSections(false); };

  useEffect(fetchSections,[]);

  return (
    <div className="wrapper">
      <header>

        <h1>
          Sections
        </h1>

        <button type='button' onClick={showAddSectionForm}>
          Add Section
        </button>
        
        <button type='button' onClick={showDeleteNutritionForm}>
          Delete Section
        </button>

      </header>

      <AddSectionForm
        visible={addingSection}
        cancel={hideAddSectionForm}
        fetchSections={fetchSections}
        setError={setError}
      />

      <DeleteNutritionForm
        visible={deletingSection}
        cancel={hideDeleteNutritionForm}
        fetchSections={fetchSections}
        setError={setError}
      />

      {error && <ErrorMessage message={error} /> }

      {sections.map((section) => <Section key={section.name} section={section} />)}
      
    </div>
  );

}

export default Nutrition;