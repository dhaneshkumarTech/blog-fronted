import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/register';
import Login from './components/login';
import Dashborad from './components/dashboard';
import AdminDashboard from './components/admin/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashborad />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admindashboard' element={<AdminDashboard />}></Route>

      </Routes>
    </BrowserRouter >
  );
}

export default App;


