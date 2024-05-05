import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  // useLocation
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Categories from './Components/Categories';
import Users from './Components/Users';
import Login from './Components/Login';
import Home from './Components/Home';
import Nutrition from './Components/Nutrition';
import EMS from './Components/EMS';
import Finances from './Components/Finances';
import Articles from './Components/Articles';


function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="" element={<Login />} /> 
        <Route path="home" element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="categories/nutrition" element={<Nutrition />} />
        <Route path="categories/emergency_medical_services" element={<EMS />} />
        <Route path="categories/finances" element={<Finances />} />
        <Route path="login" element={<Login />} />

        {/* <Route path="categories/finances/articles" element={<Articles />} /> */}
        <Route path="categories/nutrition/:topicName/:topicID" element={<Articles />} />
        {/* <Route path="categories/finances/:topicId" element={<Articles />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;