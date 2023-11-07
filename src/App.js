import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/HomeScreen';
import Register from './components/auth/RegisterScreen';
import Login from './components/auth/LoginScreen';

import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminDashboard from './components/admin/Dashboard'
import CreaterDashboard from './components/creater/Dashboard';
import ConsumerDashboard from './components/consumer/Dashboard';


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
          <Route path='users' >
            <Route path='creater' element={<CreaterDashboard />}></Route>
            <Route path='consumer' element={<ConsumerDashboard />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;


