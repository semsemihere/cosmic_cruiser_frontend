import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

import { BACKEND_URL } from '../../constants';

const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;
const DELETE_FINANCES_ENDPOINT = `${FINANCES_ENDPOINT}/delete`;

function AddSectionForm({
  visible, 
  cancel, 
  fetchFinanceSections,
  setError
}){
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

  if (!visible) return null;

  return(
    <form onSubmit={addFinanceSection}>
      <div className='column'>
        <label htmlFor='name'>
          Title
        </label>
        <input required type="text" id="name" value={name} onChange={changeName} />

        <label htmlFor='categoryID'>
          Category ID
        </label>
        
        <input required type="text" id="number" value={sectionID} onChange={changeNumber} />

        <button type="button" onClick={cancel}>Cancel</button>
        <button type="submit" onClick={addFinanceSection}>Add Category</button>
      </div>
    </form>
  )

}

function DeleteSectionForm({
  visible,
  cancel,
  fetchFinanceSections,
  setError,
}){
  const [sectionID, setID] = useState('');
  const changeID = (event) => { setID(event.target.value);};

  const deleteSection = () => {
    if(!sectionID){
      setError('Section ID is required!');
      return;
    }

    axios.delete(`${DELETE_FINANCES_ENDPOINT}/${sectionID}`)
    .then(() => {
      setError('');
      fetchFinanceSections();
    })
    .catch((error) => { setError(error.response.data.message);});
  }

  if(!visible) return null;

  return(
    <form onSubmit={deleteSection}>
      <div class='column'>
        <label htmlFor='sectionID'>
          Section ID
        </label>

        <input required type="text" id="number" value={sectionID} onChange={changeID} />

        <button type="button" onClick={cancel}>Cancel</button>
        <button type="submit" onClick={deleteSection}>Delete</button>

      </div>
    </form>
  );
}

AddSectionForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchFinanceSections: propTypes.func.isRequired,
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

function sectionObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const finances = keys.map((key) => Data[key]);
  return finances;
}

function Finances(){
  const [error, setError] = useState("");
  const [sections, setSections] = useState([]);
  const [addSections, setAddingSections] = useState(false);
  const [deleteSections, setDeletingSections] = useState(false);

  const fetchFinanceSections = () => {
    axios.get(FINANCES_ENDPOINT)
    .then(({ data }) => setSections(sectionObjectToArray(data)))
    .catch(() => setError('There was a problem getting the list of sections'));
  };


  const showAddSectionForm = () => {
    setAddingSections(true);
    setDeletingSections(false);
  };

  const showDeleteSectionForm = () => {
    setAddingSections(false);
    setDeletingSections(true);
  };

  const hideAddSectionForm = () => { setAddingSections(false); };
  const hideDeleteSectionForm = () => { setDeletingSections(false); }

  useEffect(fetchFinanceSections, []);

  return (
    
    <div>
      <Navbar />
      <div className='wrapper'>
        <header>
          <h1>
            Finance Sections
          </h1>

          <button type='button' onClick={showAddSectionForm}>Add Section</button>
          <button type='button' onClick={showDeleteSectionForm}>Delete Section</button>

        </header>

        <AddSectionForm
          visible={addSections}
          cancel={hideAddSectionForm}
          fetchFinanceSections={fetchFinanceSections}
          setError={setError}
        />

        <DeleteSectionForm
          visible={deleteSections}
          cancel={hideDeleteSectionForm}
          fetchFinanceSections={fetchFinanceSections}
          setError={setError}
        />

        {error && <ErrorMessage message={error} /> }

        {/* console.log("Sections"+ sections); */}

        {sections.map((finances) => (
          <div className="finances-container">
            {/* <Link to={`/categories/finances/${finances.sectionID}`}> */}
            <Link to={`/categories/finances/${finances.name}${finances.sectionID}`}>
              <h2>{finances.name}</h2>
            </Link>
            <p>Section ID: {finances.sectionID} </p>
          </div>
        ))
        }
      </div>

    </div>
  );


}

export default Finances;