import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import UserForm from './components/UserForm';
import Check from './components/Check';
import CheckForm from './components/CheckForm'; 
import './App.css'

function App() {
  return (
      <Router>
        <Routes >
          <Route path="/check-form" element={<CheckForm />} />
          <Route path="/check" element={<Check />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*"element={<Navigate to='/login' />} />
        </Routes>
      </Router>
  );
}

export default App;
