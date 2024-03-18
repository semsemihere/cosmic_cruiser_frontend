import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const EMS_ENDPOINT = `${BACKEND_URL}/categories/emergency_medical_services`;
const DELETE_EMS_ENDPOINT = `${BACKEND_URL}/categories/emergency_medical_services/delete`;


function EMS() {
    return <div>Loading...</div>;
}
  
export default EMS;