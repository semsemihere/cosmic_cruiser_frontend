import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;
const DELETE_FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances/delete`;


function Finances() {
    return <div>Loading...</div>;
}
  
export default Finances;