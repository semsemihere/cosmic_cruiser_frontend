import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Categories from './Components/Categories';
import Users from './Components/Users';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;