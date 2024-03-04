import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const CATEGORIES_ENDPOINT = `${BACKEND_URL}/suggestions`;
const DELETE_CATEGORIES_ENDPOINT = `${BACKEND_URL}/suggestions/delete`;

function AddSuggestionForm({ 
  visible,
  cancel,
  fetchSuggestions,
  setError
}) {
  const [name, setName] = useState('');
  const [suggestionID, setID] = useState('');
  const [numSections, setNumberOfSections] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeID = (event) => { setID(event.target.value); };
  const changeNumberOfSections = (event) => { setNumberOfSections(event.target.value); };

  const addSuggestion = (event) => {
    event.preventDefault();
    axios.post(CATEGORIES_ENDPOINT, { name: name, suggestionID: suggestionID, numSections: numSections })
    .then(() => {  // if successful
      setError('');
      fetchSuggestions();
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

      <label htmlFor='suggestionID'>
        Suggestion ID
      </label>
      <input required type="text" id="suggestionID" value={suggestionID} onChange={changeID}>
      </input>

      <label htmlFor='numSections'>
        Number of Sections
      </label>
      <input required type="number" id="numSections" value={numSections} onChange={changeNumberOfSections}>
      </input>

      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addSuggestion}>Add Suggestion</button>
    </form>
  );

}
AddSuggestionForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchSuggestions: propTypes.func.isRequired,
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

function Suggestion ({ suggestion }) {
  const { name, suggestionID, numSections} = suggestion;
  return (
    <div className='suggestions-container'>
      <h2>{name}</h2>
      <p>
        ID: {suggestionID}
        <br></br>
        Sections: {numSections}
      </p>
    </div>
  );
}
Suggestion.propTypes = {
  suggestion: propTypes.shape({
    name: propTypes.string.isRequired,
    suggestionID: propTypes.string.isRequired,
    numSections: propTypes.number.isRequired,
  }).isRequired,
};

function suggestionsObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const suggestions = keys.map((key) => Data[key]);
  return suggestions;
}

function Suggestions() {
  const [error, setError] = useState("");
  const[suggestions, setSuggestions] = useState([]);
  const [addingSuggestion, setAddingSuggestion] = useState(false);
  const [deletingSuggestion, setDeletingSuggestion] = useState(false);

  const fetchSuggestions = () => {
    axios.get(CATEGORIES_ENDPOINT)
        // successfully connected
        .then(({ data }) => setSuggestions(suggestionsObjectToArray(data)))
        .catch(() => setError('There was a problem getting the list of suggestions'));
        // .then((response) => {
        //   const suggestionsObject = response.data.Data;
        //   const keys = Object.keys(suggestionsObject);
        //   const suggestionsArray = keys.map((key) => suggestionsObject[key]);
        //   setSuggestions(suggestionsArray);
        // })
        // // failed connection
        // .catch(() => { setError("Something went wrong"); });
  };

  function DeleteSuggestionForm({
    visible,
    cancel,
    fetchSuggestions,
    setError,
  }) {
    const [suggestionID, setID] = useState('');
    const changeID = (event) => { setID(event.target.value); };

    // const deleteSuggestion = (event) => {
      // event.preventDefault();
      // axios.delete(DELETE_CATEGORIES_ENDPOINT/suggestionID, { suggestionID: suggestionIDs })
      // .then(() => {  // if successful
      //   setError('');
      //   fetchSuggestions();
      // })
      // .catch((error) => { setError(error.response.data.message); });

  };

  const showAddSuggestionForm = () => { setAddingSuggestion(true); };
  const hideAddSuggestionForm = () => { setAddingSuggestion(false); };
  const showDeleteSuggestionForm = () => { setDeletingSuggestion(true); };
  const hideDeleteSuggestionForm = () => { setDeletingSuggestion(false); };

  useEffect(fetchSuggestions,[]);

  return (
    <div className="wrapper">
      <header>
        <h1>
          Suggestions
        </h1>
        <button type='button' onClick={showAddSuggestionForm}>
          Add Suggestion
        </button>
        <button type='button' onClick={showDeleteSuggestionForm}>
          Delete Suggestion
        </button>
      </header>
      <AddSuggestionForm
        visible={addingSuggestion}
        cancel={hideAddSuggestionForm}
        fetchSuggestions={fetchSuggestions}
        setError={setError}
      />
      <DeleteSuggestionForm
        visible={deletingSuggestion}
        cancel={hideDeleteSuggestionForm}
        fetchSuggestions={fetchSuggestions}
        setError={setError}
      />
      {error && <ErrorMessage message={error} /> }
      {/* (
        <div className="error-message">
          {error}
        </div>
      )} */}
      {suggestions.map((suggestion) => <Suggestion key={suggestion.name} suggestion={suggestion} />)}

      {/* <AddSuggestionForm setError={setError} fetchSuggestions={fetchSuggestions}/> */}

      {/* {suggestions.map((suggestion) => (
        <div key={suggestion.name} className="suggestions-container">
          <h2>{suggestion.name}</h2>
          <p>ID: {suggestion.suggestionID} <br></br> Sections: {suggestion.numSections} </p>
        </div>
      ))

      } */}
      
    </div>
  );

}

export default Suggestions;