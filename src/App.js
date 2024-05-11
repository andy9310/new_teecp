import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import UserForm from './components/UserForm';
import Check from './components/Check';
import CheckForm from './components/CheckForm'; 
import Password from './components/Password'; 
import DnD from './components/DnD';
import Admin from './components/Admin';
import './App.css'
import {NextUIProvider} from "@nextui-org/react";


function App() {
  return (
    <NextUIProvider>
      <Router>
        <Routes >
          <Route path="/admin" element={<Admin />} />
          <Route path="/dnd" element={<DnD />} />
          <Route path="/check-form" element={<CheckForm />} />
          <Route path="/check" element={<Check />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<Password />} />
          <Route path="*"element={<Navigate to='/login' />} />
        </Routes>
      </Router>
    </NextUIProvider>
  );
}

export default App;
