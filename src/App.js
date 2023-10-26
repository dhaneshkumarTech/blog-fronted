import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/AuthScreen/RegisterScreen';
import Login from './components/AuthScreen/LoginScreen';
import Dashborad from './components/dashboard';
import AdminDashboard from './components/AdminScreen/AdminDashboard'

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path='/quickblog/dashboard' element={<Dashborad />}></Route>
        <Route path='/quickblog/register' element={<Register ister />}></Route>
        <Route path='/quickblog/login' element={<Login />}></Route>
        <Route path='/quickblog/admindashboard' element={<AdminDashboard />}></Route>
 
      </Routes>
    </BrowserRouter >
  );
}

export default App;


