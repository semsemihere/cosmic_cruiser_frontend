import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;

function AddFinancesForm({
  visible,
  cancel,
  fetchFinances,
  setError,
}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setNumber(event.target.value); };

  const addFinances = (event) => {
    event.preventDefault();
    axios.post(FINANCES_ENDPOINT, { name, numPlayers: number })
      .then(fetchFinances)
      .catch(() => { setError('There was a problem adding the section.'); });
  };

  if (!visible) return null;
  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input required type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="number-of-players">
        Number of players
      </label>
      <input required type="number" id="number-of-players" onChange={changeNumber} />
      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addFinances}>Submit</button>
    </form>
  );
}
AddFinancesForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchFinances: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

function Finances({ finances }) {
  const { name, numPlayers } = finances;
  return (
    <div className="game-container">
      <h2>{name}</h2>
      <p>
        Players: {numPlayers}
      </p>
    </div>
  );
}
Finances.propTypes = {
  finances: propTypes.shape({
    name: propTypes.string.isRequired,
    numPlayers: propTypes.number.isRequired,
  }).isRequired,
};

function financesObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const finances = keys.map((key) => Data[key]);
  return finances;
}

function Financess() {
  const [error, setError] = useState('');
  const [finances, setFinancess] = useState([]);
  const [addingFinances, setAddingFinances] = useState(false);

  const fetchFinances = () => {
    axios.get(FINANCES_ENDPOINT)
      .then(({ data }) => setFinancess(financesObjectToArray(data)))
      .catch(() => setError('There was a problem retrieving the list of finances.'));
  };

  const showAddFinancesForm = () => { setAddingFinances(true); };
  const hideAddFinancesForm = () => { setAddingFinances(false); };

  useEffect(fetchFinances, []);

  return (
    <div className="wrapper">
      <header>
        <h1>
          View All Financess
        </h1>
        <button type="button" onClick={showAddFinancesForm}>
          Add a Finances
        </button>
      </header>
      <AddFinancesForm
        visible={addingFinances}
        cancel={hideAddFinancesForm}
        fetchFinances={fetchFinances}
        setError={setError}
      />
      {error && <ErrorMessage message={error} />}
      {finances.map((finances) => <Finances key={finances.name} finances={finances} />)}
    </div>
  );
}

export default Finances;