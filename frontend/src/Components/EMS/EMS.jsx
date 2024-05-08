import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

import { BACKEND_URL } from '../../constants';

const EMS_EP = `${BACKEND_URL}/categories/emergency_medical_services`;
const DELETE_EMS_ENDPOINT = `${EMS_EP}/delete`;

function AddSectionForm({
  visible, 
  cancel, 
  fetchEMSSections,
  setError
}){
  const [name, setName] = useState('')
  const [sectionID, setSectionID] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setSectionID(event.target.value); };

  const addEMSSection = (event) => {
    event.preventDefault();
    axios.post(EMS_EP, { name: name, sectionID: sectionID })
    .then(fetchEMSSections)  // if successful
    .catch((error) => { setError(error.response.data.message); });
  };

  if (!visible) return null;

  return(
    <form onSubmit={addEMSSection}>
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
        <button type="submit" onClick={addEMSSection}>Add Section</button>
      </div>
    </form>
  )

}

function DeleteSectionForm({
  visible,
  cancel,
  fetchEMSSections,
  setError,
}){
  const [sectionID, setID] = useState('');
  const changeID = (event) => { setID(event.target.value);};

  const deleteSection = () => {
    if(!sectionID){
      setError('Section ID is required!');
      return;
    }

    axios.delete(`${DELETE_EMS_ENDPOINT}/${sectionID}`)
    .then(() => {
      setError('');
      fetchEMSSections();
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
  fetchEMSSections: propTypes.func.isRequired,
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
  const EMS = keys.map((key) => Data[key]);
  return EMS;
}

function EMS(){
  const [error, setError] = useState("");
  const [sections, setSections] = useState([]);
  const [addSections, setAddingSections] = useState(false);
  const [deleteSections, setDeletingSections] = useState(false);

  const fetchEMSSections = () => {
    axios.get(EMS_EP)
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

  useEffect(fetchEMSSections, []);

  return (
    
    <div>
      <Navbar />
      <div className='wrapper'>
        <header>
          <h1>
            EMS Sections
          </h1>

          <button type='button' onClick={showAddSectionForm}>Add Section</button>
          <button type='button' onClick={showDeleteSectionForm}>Delete Section</button>

        </header>

        <AddSectionForm
          visible={addSections}
          cancel={hideAddSectionForm}
          fetchEMSSections={fetchEMSSections}
          setError={setError}
        />

        <DeleteSectionForm
          visible={deleteSections}
          cancel={hideDeleteSectionForm}
          fetchEMSSections={fetchEMSSections}
          setError={setError}
        />

        {error && <ErrorMessage message={error} /> }

        {/* console.log("Sections"+ sections); */}

        {sections.map((emergency_medical_services) => (
          <div className="ems-container">
            {/* <Link to={`/categories/EMS/${EMS.sectionID}`}> */}
            <Link to={`/categories/emergency_medical_services/${emergency_medical_services.name}/${emergency_medical_services.sectionID}`}>
              <h2>{emergency_medical_services.name}</h2>
            </Link>
            <p>Section ID: {emergency_medical_services.sectionID} </p>
          </div>
        ))
        }
      </div>

    </div>
  );


}

export default EMS;