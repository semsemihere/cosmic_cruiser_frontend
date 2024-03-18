import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PAGES = [
  { label: 'Home', destination: '/home' },
  { label: 'Categories', destination: '/categories' },
  { label: 'Users', destination: '/users' },
  { label: 'Suggestions', destination: '/suggestions' },
  { label: 'Nutrition', destination: '/categories/nutrition' },
  { label: 'EMS', destination: '/categories/emergency_medical_services' },
  { label: 'Finances', destination: '/categories/finances' }
];

function NavLink({ page }) {
  const { label, destination } = page;
  return (
    <li>
      <Link to={destination}>{label}</Link>
    </li>
  );
}
NavLink.propTypes = {
  page: propTypes.shape({
    label: propTypes.string.isRequired,
    destination: propTypes.string.isRequired,
  }).isRequired,
};

function Navbar() {
  return (
    <nav>
      <ul className="wrapper">
        {PAGES.map((page) => <NavLink key={page.destination} page={page} />)}
      </ul>
    </nav>
  );
}

export default Navbar;