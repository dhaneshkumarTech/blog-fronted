import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/HomeScreen';
import Register from './components/AuthScreen/RegisterScreen';
import Login from './components/AuthScreen/LoginScreen';

import ProtectedRoute from './components/ProectedRoute/ProtectedRoute';
import AdminDashboard from './components/AdminScreen/AdminDashboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='' element={<Home />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='admindashboard' element={<ProtectedRoute Component={AdminDashboard} />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;


