import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition`;
const DELETE_NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition/delete`;


function Nutrition() {
  return <div>Loading...</div>;
}
  
export default Nutrition;